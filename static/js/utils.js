// NexCampus Utilities
function $(id) { return document.getElementById(id); }

function qs(sel) { return document.querySelector(sel); }

function qsa(sel) { return document.querySelectorAll(sel); }

function show(id) { const el = $(id); if (el) el.style.display = 'block'; return el; }

function hide(id) { const el = $(id); if (el) el.style.display = 'none'; return el; }

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(function() {});
  }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function saveJSON(key, data) {
  try { localStorage.setItem('nexcampus_' + key, JSON.stringify(data)); } catch(e) {}
}

function loadJSON(key, def) {
  try {
    const d = localStorage.getItem('nexcampus_' + key);
    return d ? JSON.parse(d) : def;
  } catch(e) { return def; }
}

const NEXCAMPUS_API = '/api';

async function apiPost(endpoint, data) {
  try {
    const resp = await fetch(NEXCAMPUS_API + endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return await resp.json();
  } catch(e) {
    return {error: e.message, success: false};
  }
}

function log(msg) {
  const ts = new Date().toLocaleTimeString();
  console.log(`[NexCampus ${ts}] ${msg}`);
  const sb = $('mem-status');
  if (sb) sb.textContent = msg;
}

function showNotification(msg, duration, type) {
  type = type || 'info';
  duration = duration || 4000;
  var existing = $('nex-notification');
  if (existing) existing.remove();
  var borderColor = 'var(--cyan)';
  var bgColor = 'rgba(79,195,247,0.08)';
  if (type === 'error') { borderColor = 'var(--amber)'; bgColor = 'rgba(255,183,77,0.08)'; duration = 6000; }
  if (type === 'success') { borderColor = 'var(--teal)'; bgColor = 'rgba(38,198,218,0.08)'; duration = 3000; }
  var el = document.createElement('div');
  el.id = 'nex-notification';
  el.textContent = msg;
  el.style.cssText = 'position:fixed;bottom:40px;left:50%;transform:translateX(-50%);background:' + bgColor + ';border:1px solid ' + borderColor + ';color:var(--fg);padding:10px 24px;border-radius:6px;font-size:12px;z-index:9999;box-shadow:0 0 20px rgba(79,195,247,0.15);animation:fadeIn 0.3s ease;max-width:80vw;text-align:center';
  document.body.appendChild(el);
  setTimeout(function() {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.5s ease';
    setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 500);
  }, duration);
}

document.addEventListener('DOMContentLoaded', function() {
  var search = $('sidebar-search');
  if (!search) return;

  // Build tool map: label -> {tab, tool}
  var toolMap = [];
  qsa('.nb-tab-btn').forEach(function(btn) {
    var tool = btn.getAttribute('data-nb-tool');
    if (tool) toolMap.push({ label: btn.textContent.trim(), tab: 'notebook', tool: tool, el: btn });
  });
  qsa('[data-tt-tool]').forEach(function(btn) {
    var tool = btn.getAttribute('data-tt-tool');
    if (tool) toolMap.push({ label: btn.textContent.trim(), tab: 'texttools', tool: tool, el: btn });
  });
  qsa('.nav-btn[data-tab]').forEach(function(btn) {
    var tab = btn.getAttribute('data-tab');
    if (tab) toolMap.push({ label: btn.textContent.trim(), tab: tab, tool: null, el: btn });
  });

  search.addEventListener('input', function() {
    var q = this.value.toLowerCase();
    qsa('.nav-btn, .nb-tab-btn, .cl-sb-btn').forEach(function(btn) {
      var text = (btn.textContent || '').toLowerCase();
      var match = !q || text.indexOf(q) !== -1;
      btn.style.opacity = match ? '' : '0.3';
    });
  });

  search.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { this.value = ''; this.dispatchEvent(new Event('input')); this.blur(); }
    if (e.key === 'Enter') {
      var q = this.value.toLowerCase().trim();
      if (!q) return;
      // Find best match
      var best = null;
      for (var i = 0; i < toolMap.length; i++) {
        if (toolMap[i].label.toLowerCase().indexOf(q) !== -1) {
          best = toolMap[i]; break;
        }
      }
      if (!best) {
        for (var i = 0; i < toolMap.length; i++) {
          if (toolMap[i].label.toLowerCase().indexOf(q.charAt(0)) !== -1) {
            best = toolMap[i]; break;
          }
        }
      }
      if (best) {
        // Switch to the correct tab
        switchTab(best.tab);
        // Then switch to the specific tool if applicable
        if (best.tool) {
          if (best.tab === 'notebook') setTimeout(function() { switchNbTool(best.tool); }, 100);
          else if (best.tab === 'texttools') setTimeout(function() { switchTtTool(best.tool); }, 100);
        }
        this.blur();
        showNotification('Navigated to: ' + best.label, 1500, 'info');
      }
    }
  });
});
