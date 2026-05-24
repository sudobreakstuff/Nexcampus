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
  initTheme();
  log('Ready');
}

function initMouseGlow() {
  const root = document.documentElement;
  var frameId = null;
  document.addEventListener('mousemove', function(e) {
    if (frameId) return;
    frameId = requestAnimationFrame(function() {
      frameId = null;
      root.style.setProperty('--gx', ((e.clientX / window.innerWidth) * 100) + '%');
      root.style.setProperty('--gy', ((e.clientY / window.innerHeight) * 100) + '%');
    });
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
  const els = ['about-version','sidebar-version','greeting-version','home-version','statusbar-version','about-current-ver'];
  const ids = {};
  els.forEach(function(id) { var el = $(id); if (el) ids[id] = el; });
  try {
    const resp = await fetch('/api/version');
    const data = await resp.json();
    if (data && data.version) {
      var v = 'v' + data.version;
      if (ids['about-version']) ids['about-version'].textContent = v;
      if (ids['sidebar-version']) ids['sidebar-version'].textContent = v;
      if (ids['greeting-version']) ids['greeting-version'].textContent = 'NexCampus ' + v;
      if (ids['home-version']) ids['home-version'].textContent = v;
      if (ids['statusbar-version']) ids['statusbar-version'].textContent = 'NexCampus ' + v + ' · Made by Shahid Singh · NexCore™ Systems and Technologies · 2026';
      if (ids['about-current-ver']) ids['about-current-ver'].textContent = v + ' (' + (data.name || '') + ')';
    }
  } catch(e) {
    if (ids['about-current-ver']) ids['about-current-ver'].textContent = 'unknown';
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

function initTheme() {
  var saved = localStorage.getItem('nexcampus-theme') || 'retro';
  setTheme(saved, true);
}

function setTheme(name, silent) {
  document.documentElement.setAttribute('data-theme', name);
  localStorage.setItem('nexcampus-theme', name);
  if (!silent) {
    var logEl = document.getElementById('mem-status');
    if (logEl) logEl.textContent = 'Theme: ' + name;
  }
  qsa('.theme-btn').forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-theme-btn') === name);
  });
}
