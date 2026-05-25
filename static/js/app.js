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
  qsa('.tab-pane').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
  const pane = $(`tab-${tab}`);
  if (pane) { pane.classList.add('active'); pane.style.display = (tab === 'codelab' ? 'flex' : 'block'); }
  if (tab === 'notebook') switchNbTool(currentNbTool);
  if (tab === 'codelab' && typeof initCodeLab === 'function') initCodeLab();
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

var _updatePollTimer = null;

function downloadUpdate() {
  var dlBtn = $('btn-download-update');
  var status = $('update-status');
  var result = $('update-result');
  if (dlBtn) dlBtn.disabled = true;
  if (dlBtn) dlBtn.textContent = 'Installing...';
  if (status) status.textContent = 'Starting download...';
  if (result) result.innerHTML = '';

  fetch('/api/update/install', {method: 'POST'})
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.success) {
        if (status) status.textContent = 'Downloading update...';
        // Poll for status
        if (_updatePollTimer) clearInterval(_updatePollTimer);
        _updatePollTimer = setInterval(function() {
          fetch('/api/update/status')
            .then(function(r) { return r.json(); })
            .then(function(s) {
              if (result) result.innerHTML = '<div style="color:var(--teal);font-size:11px">' + escapeHtml(s.message || s.state) + '</div>';
              if (s.state === 'installed') {
                if (status) status.textContent = s.message || 'Update complete!';
                clearInterval(_updatePollTimer);
                _updatePollTimer = null;
                if (dlBtn) dlBtn.style.display = 'none';
              } else if (s.state === 'error') {
                if (status) status.textContent = 'Update failed';
                if (result) result.innerHTML = '<div style="color:var(--red);font-size:11px">' + escapeHtml(s.message) + '</div>';
                clearInterval(_updatePollTimer);
                _updatePollTimer = null;
                if (dlBtn) dlBtn.disabled = false;
                if (dlBtn) dlBtn.textContent = 'Retry Update';
              }
            })
            .catch(function() {});
        }, 1500);
      } else {
        if (status) status.textContent = 'Update failed: ' + (data.error || 'unknown');
        if (dlBtn) dlBtn.disabled = false;
        if (dlBtn) dlBtn.textContent = 'Download Update';
      }
    })
    .catch(function(e) {
      if (status) status.textContent = 'Update failed: ' + e.message;
      if (dlBtn) dlBtn.disabled = false;
      if (dlBtn) dlBtn.textContent = 'Download Update';
    });
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

// Weekly content check — runs once per session
var _contentChecked = false;
function checkWeeklyContent() {
  if (_contentChecked) return;
  _contentChecked = true;
  var lastCheck = localStorage.getItem('nexcampus-content-check');
  var now = Date.now();
  // Check at most once per day
  if (lastCheck && now - parseInt(lastCheck) < 86400000) return;

  fetch('/api/content/check')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.has_new_content) {
        var count = (data.new_guides || 0) + (data.new_projects || 0) + (data.new_challenges || 0) + (data.new_themes || 0);
        var msg = '📦 Weekly update ' + data.weekly_batch + ' available! ' + count + ' new items. Click to apply.';
        showNotification(msg, 10000, 'info');
        localStorage.setItem('nexcampus-content-update', JSON.stringify(data));
        localStorage.setItem('nexcampus-content-check', String(now));
      }
    })
    .catch(function() {});
}

function applyWeeklyContent() {
  var saved = localStorage.getItem('nexcampus-content-update');
  if (!saved) return;
  var data = JSON.parse(saved);
  if (!data.content) return;

  fetch('/api/content/apply', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({content: data.content})
  })
    .then(function(r) { return r.json(); })
    .then(function(resp) {
      if (resp.success) {
        showNotification('✅ Weekly content applied! (' + resp.batch + ')', 5000, 'success');
        localStorage.removeItem('nexcampus-content-update');
        // Reload content into memory
        if (resp.guides && resp.guides.length > 0) {
          resp.guides.forEach(function(g) { CODEGUIDES.push(g); });
          if (typeof initCodeLab === 'function') initCodeLab();
        }
        if (resp.challenges && resp.challenges.length > 0) {
          resp.challenges.forEach(function(c) { CODECHALLENGES.push(c); });
        }
        if (resp.projects && resp.projects.length > 0) {
          resp.projects.forEach(function(p) { CODEPROJECTS.push(p); });
        }
        if (resp.themes && resp.themes.length > 0) {
          resp.themes.forEach(function(t) {
            var style = document.createElement('style');
            style.textContent = t.css;
            document.head.appendChild(style);
            // Add theme button to about page
            var btnContainer = document.querySelector('[data-theme-btn="tokyo"]');
            if (btnContainer && btnContainer.parentNode) {
              var btn = document.createElement('button');
              btn.className = 'theme-btn';
              btn.setAttribute('data-theme-btn', t.id);
              btn.setAttribute('onclick', "setTheme('" + t.id + "')");
              btn.style.cssText = t.button_style || '';
              btn.textContent = t.name;
              btnContainer.parentNode.appendChild(btn);
            }
          });
        }
      }
    })
    .catch(function() {});
}

// Run content check on startup
setTimeout(function() {
  checkWeeklyContent();
  // If there's a pending update, apply it
  var saved = localStorage.getItem('nexcampus-content-update');
  if (saved) {
    var data = JSON.parse(saved);
    if (data.has_new_content) {
      showNotification('📦 Weekly update available! Restart or wait for auto-apply.', 8000, 'info');
    }
  }
}, 3000);
