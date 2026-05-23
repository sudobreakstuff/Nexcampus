// Main App Shell - Navigation, Clock, Boot Screen
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  setTimeout(() => {
    const boot = $('boot-screen');
    const app = $('app');
    if (boot) boot.style.display = 'none';
    if (app) app.style.display = 'flex';
    log('NexCampus initialized');
  }, 1800);

  updateClock();
  setInterval(updateClock, 1000);
  initNav();
  loadVersion();
  initNotebook();
  initNotes();
  initMouseGlow();
  log('Ready');
}

function initMouseGlow() {
  const root = document.documentElement;
  document.addEventListener('mousemove', e => {
    const gx = (e.clientX / window.innerWidth) * 100;
    const gy = (e.clientY / window.innerHeight) * 100;
    root.style.setProperty('--gx', gx + '%');
    root.style.setProperty('--gy', gy + '%');
  });
}

function updateClock() {
  const now = new Date();
  const c = $('clock');
  const d = $('date');
  if (c) c.textContent = now.toLocaleTimeString();
  if (d) d.textContent = now.toLocaleDateString(undefined, {weekday:'long', year:'numeric', month:'long', day:'numeric'});
}

function initNav() {
  qsa('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => { if (btn.dataset.tab) switchTab(btn.dataset.tab); });
  });
}

function switchTab(tab) {
  qsa('.nav-btn').forEach(b => b.classList.remove('active'));
  const navBtn = qs(`.nav-btn[data-tab="${tab}"]`);
  if (navBtn) navBtn.classList.add('active');
  qsa('.tab-pane').forEach(p => p.classList.remove('active'));
  const pane = $(`tab-${tab}`);
  if (pane) pane.classList.add('active');
  // Reset notebook sidebar and tool if switching to/from notebook
  if (tab === 'notebook') switchNbTool(currentNbTool);
  log(`Switched to ${tab}`);
}

async function loadVersion() {
  const ver = $('about-version');
  const cur = $('about-current-ver');
  try {
    const resp = await fetch('/api/version');
    const data = await resp.json();
    if (data && data.version) {
      if (ver) ver.textContent = 'v' + data.version;
      if (cur) cur.textContent = 'v' + data.version + ' (' + data.name + ')';
    }
  } catch(e) {
    if (cur) cur.textContent = 'unknown';
  }
}

let _updateData = null;

async function checkForUpdates() {
  const status = $('update-status');
  const result = $('update-result');
  const dlBtn = $('btn-download-update');
  if (status) status.textContent = 'Checking for updates...';
  if (result) result.innerHTML = '';
  if (dlBtn) dlBtn.style.display = 'none';
  try {
    const resp = await fetch('/api/update/check');
    const data = await resp.json();
    _updateData = data;
    if (data.success) {
      if (data.has_update) {
        if (status) status.textContent = 'Update available!';
        if (result) result.innerHTML = '<span style="color:var(--accent)">Version ' + data.remote_version + ' is available. You have ' + data.current_version + '.</span>';
        if (dlBtn) {
          dlBtn.style.display = 'inline-block';
          if (data.changelog && data.changelog.length) {
            let log = '<div style="margin-top:6px;font-size:10px;color:var(--fg-dim)">What\'s new:<ul style="margin:4px 0;padding-left:16px">';
            data.changelog.forEach(item => { log += '<li>' + escapeHtml(item) + '</li>'; });
            log += '</ul></div>';
            result.innerHTML += log;
          }
        }
      } else {
        if (status) status.textContent = 'You have the latest version (' + data.current_version + ').';
        if (result) result.innerHTML = '';
      }
    } else {
      if (status) status.textContent = 'Could not check for updates: ' + (data.error || 'unknown error');
    }
  } catch(e) {
    if (status) status.textContent = 'Failed to check for updates. Are you connected to the internet?';
    if (result) result.innerHTML = '<span style="color:var(--accent)">Error: ' + escapeHtml(e.message) + '</span>';
  }
}

function downloadUpdate() {
  if (_updateData && _updateData.download_url) {
    window.open(_updateData.download_url, '_blank');
  }
}
