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
