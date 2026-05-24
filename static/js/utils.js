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
