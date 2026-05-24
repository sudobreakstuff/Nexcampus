// STUDY LAB — Summarize, Q&A, Quiz, Flashcards

var currentNbTool = 'summarize';

function initNotebook() {
  loadDocuments();
  const input = $('nb-qa-input');
  if (input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        askNotebook();
      }
    });
  }
}

function switchNbTool(tool) {
  currentNbTool = tool;
  document.querySelectorAll('#tab-notebook .nb-tab-btn').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('#tab-notebook .nb-tool-content').forEach(function(c) { c.classList.remove('active'); });
  var btn = document.querySelector('#tab-notebook .nb-tab-btn[data-nb-tool="' + tool + '"]');
  var content = document.getElementById('nb-tool-' + tool);
  if (btn) btn.classList.add('active');
  if (content) {
    content.classList.add('active');
    if (content.dataset.hideSources) {
      qs('.nb-side').style.display = 'none';
    } else {
      qs('.nb-side').style.display = '';
    }
  }
  if (typeof initTool === 'function') initTool(tool);
}

// --- Modal ---
function showModal(title, html) {
  const modal = $('tool-modal');
  const titleEl = $('modal-title');
  const body = $('modal-body');
  if (!modal || !body) return;
  titleEl.textContent = title;
  body.innerHTML = html;
  modal.style.display = 'flex';
  body.scrollTop = 0;
}

function closeModal(e) {
  if (e && e.target !== e.currentTarget) return;
  const modal = $('tool-modal');
  if (modal) modal.style.display = 'none';
}

// --- Sources ---
async function loadDocuments() {
  const list = $('nb-doc-list');
  if (!list) return;
  try {
    const resp = await fetch('/api/notebook/documents');
    const data = await resp.json();
    if (data.success && data.documents) {
      if (data.documents.length === 0) {
        list.innerHTML = '<div style="color:var(--fg-dim);font-size:10px">No documents yet.</div>';
      } else {
        list.innerHTML = data.documents.map(d => `
          <div class="nb-doc-item">
            <div style="flex:1;min-width:0">
              <div class="nb-doc-name">${escapeHtml(d.name)}</div>
            </div>
            <button class="nb-doc-del" onclick="deleteDocument('${d.id}')">×</button>
          </div>
        `).join('');
      }
    }
    const count = $('nb-doc-count');
    if (count) count.textContent = (data.documents ? data.documents.length : 0) + ' document' + (data.documents && data.documents.length !== 1 ? 's' : '');
  } catch(e) {
    list.innerHTML = '<div style="color:var(--fg-dim);font-size:10px">Failed to load documents.</div>';
  }
}

async function uploadDocument() {
  const input = $('nb-file-input');
  const status = $('nb-upload-status');
  if (!input || !input.files || !input.files.length) {
    if (status) status.textContent = 'Select a file first.';
    return;
  }
  const file = input.files[0];
  const ext = file.name.split('.').pop().toLowerCase();
  if (ext !== 'txt' && ext !== 'md' && ext !== 'pdf') {
    if (status) status.textContent = 'Only .txt, .md, .pdf files.';
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    if (status) status.textContent = 'File too large (max 10 MB).';
    return;
  }
  if (status) status.textContent = 'Uploading...';
  try {
    const b64 = await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result.split(',')[1]);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
    const resp = await fetch('/api/notebook/upload', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: file.name, content: b64})
    });
    const data = await resp.json();
    if (data.success) {
      if (status) status.textContent = 'Uploaded.';
      input.value = '';
      loadDocuments();
    } else {
      if (status) status.textContent = data.error || 'Upload failed.';
    }
  } catch(e) {
    if (status) status.textContent = 'Upload error: ' + e.message;
  }
}

async function addPastedText() {
  const input = $('nb-paste-input');
  const status = $('nb-upload-status');
  if (!input) return;
  const text = input.value;
  if (!text.trim()) {
    if (status) status.textContent = 'Paste some text first.';
    return;
  }
  const nonprintable = text.split('').filter(c => c.charCodeAt(0) < 32 && c.charCodeAt(0) !== 9 && c.charCodeAt(0) !== 10 && c.charCodeAt(0) !== 13).length;
  if (nonprintable > text.length * 0.05 || text.indexOf('\x00') !== -1) {
    if (status) status.textContent = 'Pasted content looks like binary data.';
    return;
  }
  if (status) status.textContent = 'Adding text...';
  try {
    const resp = await fetch('/api/notebook/addtext', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({text: text})
    });
    const data = await resp.json();
    if (data.success) {
      if (status) status.textContent = 'Text added.';
      input.value = '';
      loadDocuments();
    } else {
      if (status) status.textContent = data.error || 'Failed.';
    }
  } catch(e) {
    if (status) status.textContent = 'Error: ' + e.message;
  }
}

async function deleteDocument(id) {
  await fetch('/api/notebook/delete', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: id})
  });
  loadDocuments();
}

async function clearAllDocuments() {
  const status = $('nb-upload-status');
  await fetch('/api/notebook/deleteall', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: '{}'});
  if (status) status.textContent = 'All documents cleared.';
  loadDocuments();
}

// --- Summarize ---
async function summarizeDocs() {
  const sents = $('nb-summary-sents');
  const words = $('nb-summary-words');
  const num_sentences = sents ? parseInt(sents.value, 10) || 5 : 5;
  const max_words = words ? parseInt(words.value, 10) || 0 : 0;
  showModal('Summarize', '<div style="color:var(--fg-dim)">Summarizing...</div>');
  try {
    const resp = await fetch('/api/notebook/summarize', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({num_sentences: num_sentences, max_words: max_words})
    });
    const data = await resp.json();
    if (data.success && data.response) {
      let html = '<div style="font-size:12px;line-height:1.8;color:var(--fg-dim)">' + escapeHtml(data.response).replace(/\n/g, '<br>') + '</div>';
      if (data.sources && data.sources.length) {
        html += '<div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border);font-size:9px;color:var(--fg-dim)">Based on: ' + data.sources.join(', ') + '</div>';
      }
      showModal('Summary', html);
    } else {
      showModal('Summary', '<div style="color:var(--fg-dim)">' + escapeHtml(data.response || 'No content to summarize.') + '</div>');
    }
  } catch(e) {
    showModal('Summary', '<div style="color:var(--fg-dim)">Error: ' + escapeHtml(e.message) + '</div>');
  }
}

// --- Q&A ---
async function askNotebook() {
  const input = $('nb-qa-input');
  const box = $('nb-qa-messages');
  const status = $('nb-qa-status');
  if (!input || !box) return;
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  box.innerHTML += '<div class="nb-msg nb-msg-user"><div class="nb-msg-text">' + escapeHtml(msg) + '</div></div>';
  box.innerHTML += '<div class="nb-msg nb-msg-ai" id="nb-thinking"><div class="nb-msg-text" style="color:var(--fg-dim)">Searching...</div></div>';
  box.scrollTop = box.scrollHeight;
  if (status) status.textContent = '';
  try {
    const resp = await fetch('/api/notebook/query', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({message: msg})
    });
    const data = await resp.json();
    const el = $('nb-thinking');
    if (el) el.remove();
    if (data.success) {
      let html = '<div class="nb-msg nb-msg-ai"><div class="nb-msg-text">' + escapeHtml(data.response).replace(/\n/g, '<br>') + '</div>';
      if (data.sources && data.sources.length) {
        html += '<div class="nb-sources">' + data.sources.map(s => '<span class="nb-source-tag">' + escapeHtml(s) + '</span>').join('') + '</div>';
      }
      html += '</div>';
      box.innerHTML += html;
    } else {
      box.innerHTML += '<div class="nb-msg nb-msg-ai"><div class="nb-msg-text">' + escapeHtml(data.error || 'No answer found.') + '</div></div>';
    }
    box.scrollTop = box.scrollHeight;
  } catch(e) {
    const el = $('nb-thinking');
    if (el) el.remove();
    box.innerHTML += '<div class="nb-msg nb-msg-ai"><div class="nb-msg-text">Error: ' + escapeHtml(e.message) + '</div></div>';
  }
}

function clearNbChat() {
  const box = $('nb-qa-messages');
  if (box) box.innerHTML = '<div style="color:var(--fg-dim);font-size:12px;padding:12px">Ask a question about your documents.</div>';
}

// --- Quiz ---
async function generateQuiz() {
  const countEl = $('nb-quiz-count');
  const count = countEl ? parseInt(countEl.value, 10) || 8 : 8;
  showModal('Quiz', '<div style="color:var(--fg-dim)">Generating quiz...</div>');
  try {
    const resp = await fetch('/api/notebook/quiz', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({count: count})
    });
    const data = await resp.json();
    if (data.success && data.response && data.response.length) {
      let html = '<div style="font-size:10px;color:var(--fg-dim);margin-bottom:8px">Click an option to check your answer:</div>';
      data.response.forEach((q, i) => {
        html += '<div class="nb-question" data-answer="' + q.correct_index + '">';
        html += '<div class="nb-q-text">' + (i+1) + '. ' + escapeHtml(q.question) + '</div>';
        if (q.options) {
          q.options.forEach((opt, oi) => {
            html += '<div class="nb-q-opt" data-opt="' + oi + '" onclick="selectQuizOpt(this)">' + escapeHtml(opt) + '</div>';
          });
        } else {
          html += '<div style="font-size:10px;color:var(--teal);margin-top:4px">Answer: <span style="color:var(--fg-dim)">' + escapeHtml(q.answer) + '</span></div>';
        }
        html += '</div>';
      });
      showModal('Quiz (' + data.response.length + ' questions)', html);
    } else {
      showModal('Quiz', '<div style="color:var(--fg-dim)">Not enough content to generate a quiz.</div>');
    }
  } catch(e) {
    showModal('Quiz', '<div style="color:var(--fg-dim)">Error: ' + escapeHtml(e.message) + '</div>');
  }
}

function selectQuizOpt(el) {
  const parent = el.closest('.nb-question');
  if (!parent) return;
  const correct = parseInt(parent.dataset.answer, 10);
  parent.querySelectorAll('.nb-q-opt').forEach(o => {
    o.onclick = null;
    o.style.cursor = 'default';
  });
  const chosen = parseInt(el.dataset.opt, 10);
  if (chosen === correct) {
    el.classList.add('correct');
  } else {
    el.classList.add('wrong');
    const correctEl = parent.querySelector('.nb-q-opt[data-opt="' + correct + '"]');
    if (correctEl) correctEl.classList.add('correct');
  }
}

// --- Flashcards ---
async function generateCards() {
  const countEl = $('nb-cards-count');
  const count = countEl ? parseInt(countEl.value, 10) || 10 : 10;
  showModal('Flashcards', '<div style="color:var(--fg-dim)">Generating flashcards...</div>');
  try {
    const resp = await fetch('/api/notebook/flashcards', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({count: count})
    });
    const data = await resp.json();
    if (data.success && data.response && data.response.length) {
      let html = '<div style="font-size:10px;color:var(--fg-dim);margin-bottom:8px">Click a card to flip it:</div>';
      data.response.forEach((c, i) => {
        html += '<div class="nb-card" onclick="flipCard(this)">';
        html += '<div class="nb-card-side front">' + escapeHtml(c.front) + '</div>';
        html += '<div class="nb-card-side back" style="display:none">' + escapeHtml(c.back) + '</div>';
        html += '</div>';
      });
      showModal('Flashcards (' + data.response.length + ' cards)', html);
    } else {
      showModal('Flashcards', '<div style="color:var(--fg-dim)">Not enough content for flashcards.</div>');
    }
  } catch(e) {
    showModal('Flashcards', '<div style="color:var(--fg-dim)">Error: ' + escapeHtml(e.message) + '</div>');
  }
}

function flipCard(el) {
  const front = el.querySelector('.front');
  const back = el.querySelector('.back');
  if (!front || !back) return;
  if (front.style.display === 'none') {
    front.style.display = '';
    back.style.display = 'none';
  } else {
    front.style.display = 'none';
    back.style.display = '';
  }
}
