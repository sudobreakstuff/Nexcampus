// Notes — Rich Text Word Processor

let _notesDirty = false;
let _notesFilename = 'Untitled';
let _notesAutoTimer = null;

function execCmd(command, value) {
  const editor = $('notes-editor');
  if (!editor) return;
  editor.focus();
  if (command === 'formatBlock' && value) {
    document.execCommand('formatBlock', false, '<' + value + '>');
  } else if (command === 'insertHTML') {
    document.execCommand('insertHTML', false, value);
  } else if (value !== undefined) {
    document.execCommand(command, false, value);
  } else {
    document.execCommand(command, false, null);
  }
  editor.focus();
  markNotesDirty();
}

function setFontSize(size) {
  const editor = $('notes-editor');
  if (!editor) return;
  editor.focus();
  const sel = window.getSelection();
  if (!sel.rangeCount || sel.isCollapsed) {
    const span = document.createElement('span');
    span.style.fontSize = size + 'px';
    span.appendChild(document.createTextNode('\u200B'));
    sel.getRangeAt(0).insertNode(span);
    const r = document.createRange();
    r.selectNodeContents(span);
    sel.removeAllRanges();
    sel.addRange(r);
  } else {
    document.execCommand('fontSize', false, '7');
    const spans = editor.querySelectorAll('font[size="7"]');
    spans.forEach(s => {
      const sp = document.createElement('span');
      sp.style.fontSize = size + 'px';
      sp.innerHTML = s.innerHTML;
      s.parentNode.replaceChild(sp, s);
    });
  }
  editor.focus();
  markNotesDirty();
}

function setFontFamily(family) {
  const editor = $('notes-editor');
  if (!editor) return;
  editor.focus();
  document.execCommand('fontName', false, family);
  markNotesDirty();
}

function setLineHeight(value) {
  const editor = $('notes-editor');
  if (!editor) return;
  editor.focus();
  const sel = window.getSelection();
  if (sel.rangeCount) {
    const range = sel.getRangeAt(0);
    let parent = range.commonAncestorContainer;
    if (parent.nodeType === 3) parent = parent.parentNode;
    const block = parent.closest ? parent.closest('p,h1,h2,h3,li,div') : parent;
    if (block) {
      block.style.lineHeight = value;
    } else {
      document.execCommand('insertHTML', false, '<span style="line-height:' + value + '">\u200B</span>');
    }
  }
  markNotesDirty();
}

function setListStyle(value) {
  if (!value) return;
  const editor = $('notes-editor');
  if (!editor) return;
  editor.focus();
  const sel = window.getSelection();
  if (sel.rangeCount) {
    let parent = sel.getRangeAt(0).commonAncestorContainer;
    if (parent.nodeType === 3) parent = parent.parentNode;
    const list = parent.closest ? parent.closest('ul,ol') : null;
    if (list) {
      if (list.tagName === 'UL') {
        list.style.listStyleType = value;
      } else {
        list.style.listStyleType = value;
      }
      markNotesDirty();
    }
  }
}

function insertLink() {
  const url = prompt('Enter URL:', 'https://');
  if (url && url.trim()) {
    execCmd('createLink', url.trim());
  }
}

function markNotesDirty() {
  _notesDirty = true;
  const el = $('notes-saved');
  if (el) { el.textContent = 'Unsaved'; el.style.color = 'var(--amber)'; }
  updateNoteStats();
}

function updateNoteStats() {
  const editor = $('notes-editor');
  if (!editor) return;
  const text = editor.textContent || '';
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const paras = text.trim() ? text.split(/\n\s*\n/).filter(function(b) { return b.trim(); }).length : 0;
  const readTime = Math.max(1, Math.round(words / 200));

  const sel = window.getSelection();
  let selWords = 0, selChars = 0;
  if (sel && !sel.isCollapsed) {
    const t = sel.toString();
    selWords = t.trim() ? t.trim().split(/\s+/).length : 0;
    selChars = t.length;
  }

  const wEl = $('notes-words');
  const cEl = $('notes-chars');
  const pEl = $('notes-paras');
  const rEl = $('notes-readtime');
  const sEl = $('notes-sel');

  if (wEl) wEl.textContent = words + ' word' + (words !== 1 ? 's' : '');
  if (cEl) cEl.textContent = chars + ' char' + (chars !== 1 ? 's' : '');
  if (pEl) pEl.textContent = paras + ' para' + (paras !== 1 ? 's' : '');
  if (rEl) rEl.textContent = '~' + readTime + ' min read';
  if (sEl) {
    if (selChars > 0) {
      sEl.textContent = selWords + 'w / ' + selChars + 'c selected';
    } else {
      sEl.textContent = '';
    }
  }
}

function notesNew() {
  if (_notesDirty && !confirm('Discard unsaved changes?')) return;
  const editor = $('notes-editor');
  if (!editor) return;
  editor.innerHTML = '<div style="color:var(--fg-dim);font-family:sans-serif">Start typing your notes here...</div>';
  _notesFilename = 'Untitled';
  _notesDirty = false;
  const el = $('notes-saved');
  if (el) { el.textContent = 'Saved'; el.style.color = 'var(--teal)'; }
  const fn = $('notes-filename');
  if (fn) fn.textContent = _notesFilename;
  updateNoteStats();
}

function notesSave() {
  const editor = $('notes-editor');
  if (!editor) return;
  const name = prompt('Note name:', _notesFilename);
  if (!name || !name.trim()) return;
  _notesFilename = name.trim();
  const html = editor.innerHTML;

  fetch('/api/notes/save', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: _notesFilename, content: html})
  })
  .then(r => r.json())
  .then(data => {
    if (data.success) {
      try {
        localStorage.setItem('nexcampus_note_' + _notesFilename, html);
        let list = JSON.parse(localStorage.getItem('nexcampus_notes_list') || '[]');
        if (!list.includes(_notesFilename)) {
          list.unshift(_notesFilename);
          localStorage.setItem('nexcampus_notes_list', JSON.stringify(list));
        }
      } catch(e) {}
      _notesDirty = false;
      const el = $('notes-saved');
      if (el) { el.textContent = 'Saved'; el.style.color = 'var(--teal)'; }
      const fn = $('notes-filename');
      if (fn) fn.textContent = _notesFilename;
    } else {
      showNotification('Failed to save: ' + (data.error || 'unknown error'));
    }
  })
  .catch(function(err) {
    showNotification('Failed to save: ' + err.message);
  });
}

function notesLoad() {
  const input = $('notes-file-input');
  if (input) input.click();
}

function notesOpenFile(file) {
  const editor = $('notes-editor');
  if (!editor || !file) return;

  const ext = file.name.split('.').pop().toLowerCase();
  if (ext !== 'txt' && ext !== 'md' && ext !== 'pdf') {
    showNotification('Only .txt, .md, and .pdf files are supported.', 4000, 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const b64 = e.target.result.split(',')[1];
    _notesFilename = file.name.replace(/\.[^.]+$/, '');
    const fnEl = $('notes-filename');
    if (fnEl) fnEl.textContent = _notesFilename;

    if (ext === 'pdf') {
      fetch('/api/notes/import', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: file.name, content: b64})
      })
      .then(r => r.json())
      .then(data => {
        if (data.success && data.content) {
          const lines = escapeHtml(data.content).split('\n');
          editor.innerHTML = lines.map(l => l.trim() ? '<p>' + l + '</p>' : '<p><br></p>').join('\n');
          markNotesDirty();
        } else {
          showNotification('Failed: ' + (data.error || 'unknown error'));
        }
      })
      .catch(function(err) {
        showNotification('Error: ' + err.message);
      });
    } else {
      try {
        const text = atob(b64);
        const lines = escapeHtml(text).split('\n');
        editor.innerHTML = lines.map(l => l.trim() ? '<p>' + l + '</p>' : '<p><br></p>').join('\n');
        markNotesDirty();
      } catch(err) {
        showNotification('Error reading file: ' + err.message);
      }
    }
  };
  reader.readAsDataURL(file);
}

function notesManager() {
  fetch('/api/notes/list')
    .then(r => r.json())
    .then(function(data) {
      let notes = [];
      if (data.success && data.notes) {
        notes = data.notes;
      }
      // Also try localStorage
      try {
        const localList = JSON.parse(localStorage.getItem('nexcampus_notes_list') || '[]');
        localList.forEach(function(n) {
          if (!notes.some(function(x) { return x.name === n; })) {
            notes.push({name: n});
          }
        });
      } catch(e) {}

      if (!notes.length) {
        showModal('My Notes', '<div style="color:var(--fg-dim);font-size:11px">No saved notes yet. Type something and click Save.</div>');
        return;
      }

      let html = '<div style="font-size:10px;color:var(--fg-dim);margin-bottom:8px">Click a note to open it:</div>';
      html += '<div id="notes-mgr-list">';

      notes.forEach(function(note) {
        const safe = escapeHtml(note.name);
        html += '<div class="nb-doc-item" data-note="' + safe + '" style="cursor:pointer">'
          + '<div style="flex:1;font-size:11px;color:var(--fg)">' + safe + '</div>'
          + '<div style="display:flex;gap:4px">'
          + '<button class="nb-doc-del" data-action="rename" title="Rename" style="font-size:10px;padding:0 4px">✎</button>'
          + '<button class="nb-doc-del" data-action="delete" title="Delete" style="font-size:13px">×</button>'
          + '</div>'
          + '</div>';
      });

      html += '</div>';
      showModal('My Notes', html);

      const mgrList = $('notes-mgr-list');
      if (mgrList) {
        mgrList.addEventListener('click', function(e) {
          const item = e.target.closest('.nb-doc-item');
          if (!item) return;
          const name = item.dataset.note;
          if (!name) return;
          const action = e.target.dataset.action;
          if (action === 'delete') {
            notesDelete(name);
          } else if (action === 'rename') {
            notesRename(name);
          } else {
            notesOpenSaved(name);
            closeModal();
          }
        });
      }
    })
    .catch(function() {
      showModal('My Notes', '<div style="color:var(--fg-dim);font-size:11px">Failed to load notes from server.</div>');
    });
}

function notesOpenSaved(name) {
  const editor = $('notes-editor');
  if (!editor) return;

  fetch('/api/notes/load?name=' + encodeURIComponent(name))
    .then(r => r.json())
    .then(function(data) {
      if (data.success && data.content) {
        editor.innerHTML = data.content;
        _notesFilename = name;
        _notesDirty = false;
        const el = $('notes-saved');
        if (el) { el.textContent = 'Saved'; el.style.color = 'var(--teal)'; }
        const fn = $('notes-filename');
        if (fn) fn.textContent = name;
        updateNoteStats();
      } else {
        // Fallback to localStorage
        try {
          const html = localStorage.getItem('nexcampus_note_' + name);
          if (html) {
            editor.innerHTML = html;
            _notesFilename = name;
            _notesDirty = false;
            const el = $('notes-saved');
            if (el) { el.textContent = 'Saved'; el.style.color = 'var(--teal)'; }
            const fn = $('notes-filename');
            if (fn) fn.textContent = name;
            updateNoteStats();
          } else {
            showNotification('Could not load note.', 3000, 'error');
          }
        } catch(e) {
          showNotification('Could not load note.', 3000, 'error');
        }
      }
    })
    .catch(function() {
      // Fallback to localStorage
      try {
        const html = localStorage.getItem('nexcampus_note_' + name);
        if (html) {
          editor.innerHTML = html;
          _notesFilename = name;
          _notesDirty = false;
          const el = $('notes-saved');
          if (el) { el.textContent = 'Saved'; el.style.color = 'var(--teal)'; }
          const fn = $('notes-filename');
          if (fn) fn.textContent = name;
          updateNoteStats();
        } else {
          showNotification('Could not load note.', 3000, 'error');
        }
      } catch(e) {
        showNotification('Could not load note.', 3000, 'error');
      }
    });
}

function notesDelete(name) {
  if (!confirm('Delete "' + name + '"?')) return;
  fetch('/api/notes/delete', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: name})
  }).then(function() {
    try { localStorage.removeItem('nexcampus_note_' + name); } catch(e) {}
    try {
      let list = JSON.parse(localStorage.getItem('nexcampus_notes_list') || '[]');
      list = list.filter(function(n) { return n !== name; });
      localStorage.setItem('nexcampus_notes_list', JSON.stringify(list));
    } catch(e) {}
    notesManager();
  }).catch(function() { notesManager(); });
}

function notesRename(name) {
  const newName = prompt('New name:', name);
  if (!newName || newName === name || !newName.trim()) return;
  fetch('/api/notes/rename', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({old_name: name, new_name: newName.trim()})
  })
  .then(r => r.json())
  .then(function(data) {
    if (data.success) {
      try {
        const html = localStorage.getItem('nexcampus_note_' + name);
        if (html) {
          localStorage.removeItem('nexcampus_note_' + name);
          localStorage.setItem('nexcampus_note_' + newName.trim(), html);
          let list = JSON.parse(localStorage.getItem('nexcampus_notes_list') || '[]');
          list = list.filter(function(n) { return n !== name; });
          list.unshift(newName.trim());
          localStorage.setItem('nexcampus_notes_list', JSON.stringify(list));
        }
      } catch(e) {}
      if (_notesFilename === name) {
        _notesFilename = newName.trim();
        const fn = $('notes-filename');
        if (fn) fn.textContent = _notesFilename;
      }
    } else {
      showNotification('Rename failed: ' + (data.error || 'unknown error'));
    }
    notesManager();
  })
  .catch(function() { notesManager(); });
}

function notesInsertImage() {
  const input = $('notes-image-input');
  if (input) input.click();
}

function notesInsertImageFile(file) {
  const editor = $('notes-editor');
  if (!editor || !file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    editor.focus();
    const img = '<img src="' + e.target.result + '" style="max-width:100%;margin:8px 0;border-radius:4px" alt="' + escapeHtml(file.name) + '">';
    document.execCommand('insertHTML', false, img);
    markNotesDirty();
  };
  reader.readAsDataURL(file);
}

function notesPrint() {
  const editor = $('notes-editor');
  if (!editor) return;
  try {
    const w = window.open('', '_blank');
    if (!w) throw new Error('popup-blocked');
    const content = editor.innerHTML;
    w.document.write('<!DOCTYPE html><html><head><title>Print</title>'
      + '<style>'
      + '@page { margin: 0.5in; }'
      + '* { margin: 0; padding: 0; box-sizing: border-box; }'
      + 'body { font-family: serif; font-size: 12pt; line-height: 1.8; color: #000; padding: 0.5in; }'
      + 'h1 { font-size: 28pt; margin: 16pt 0 8pt; }'
      + 'h2 { font-size: 22pt; margin: 14pt 0 6pt; }'
      + 'h3 { font-size: 18pt; margin: 12pt 0 4pt; }'
      + 'p { margin: 4pt 0; }'
      + 'ul, ol { margin: 4pt 0; padding-left: 28pt; }'
      + 'img { max-width: 100%; }'
      + 'table { border-collapse: collapse; width: 100%; }'
      + 'td, th { border: 1px solid #ccc; padding: 6pt 10pt; }'
      + '</style></head><body>' + content + '</body></html>');
    w.document.close();
    w.focus();
    setTimeout(function() { w.print(); setTimeout(function() { w.close(); }, 500); }, 300);
  } catch(e) {
    window.print();
  }
}

function notesExportPDF() {
  notesPrint();
}

var _findBarActive = false;
var _findBarMatches = [];
var _findBarIndex = -1;

function toggleFindBar() {
  const bar = $('notes-findbar');
  if (!bar) return;
  _findBarActive = !_findBarActive;
  bar.style.display = _findBarActive ? 'flex' : 'none';
  if (_findBarActive) {
    const input = $('notes-find-input');
    if (input) { input.focus(); input.select(); }
    findBarHighlight();
  } else {
    clearFindHighlights();
    _findBarMatches = [];
    _findBarIndex = -1;
    updateFindCount();
  }
}

function findBarHighlight() {
  const editor = $('notes-editor');
  const input = $('notes-find-input');
  if (!editor || !input) return;
  const query = input.value;
  clearFindHighlights();
  _findBarMatches = [];
  _findBarIndex = -1;
  if (!query) { updateFindCount(); return; }

  const flags = $('notes-find-case').checked ? 'g' : 'gi';
  const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null, false);
  var node;
  while (node = walker.nextNode()) {
    if (!node.textContent || !node.parentNode) continue;
    var match;
    while ((match = regex.exec(node.textContent)) !== null) {
      _findBarMatches.push({node: node, start: match.index, end: match.index + match[0].length});
      if (_findBarMatches.length >= 500) break;
    }
    if (_findBarMatches.length >= 500) break;
  }
  if (_findBarMatches.length) _findBarIndex = 0;
  applyFindHighlights();
  scrollToMatch(0);
  updateFindCount();
}

function applyFindHighlights() {
  const editor = $('notes-editor');
  if (!editor) return;
  _findBarMatches.forEach(function(m, i) {
    try {
      var r = document.createRange();
      r.setStart(m.node, m.start);
      r.setEnd(m.node, m.end);
      var span = document.createElement('span');
      span.className = 'find-highlight';
      span.setAttribute('data-find-idx', i);
      r.surroundContents(span);
    } catch(e) {}
  });
  if (_findBarIndex >= 0) {
    var active = editor.querySelector('.find-highlight[data-find-idx="' + _findBarIndex + '"]');
    if (active) active.style.background = 'var(--amber)';
  }
}

function clearFindHighlights() {
  const editor = $('notes-editor');
  if (!editor) return;
  var spans = editor.querySelectorAll('.find-highlight');
  spans.forEach(function(span) {
    var parent = span.parentNode;
    if (!parent) return;
    while (span.firstChild) parent.insertBefore(span.firstChild, span);
    parent.removeChild(span);
    parent.normalize();
  });
}

function scrollToMatch(idx) {
  const editor = $('notes-editor');
  if (!editor || idx < 0 || idx >= _findBarMatches.length) return;
  var el = editor.querySelector('.find-highlight[data-find-idx="' + idx + '"]');
  if (el) el.scrollIntoView({block: 'nearest', behavior: 'smooth'});
}

function updateFindCount() {
  var el = $('notes-find-count');
  if (!el) return;
  if (!_findBarMatches.length) { el.textContent = ''; return; }
  el.textContent = (_findBarIndex + 1) + '/' + _findBarMatches.length;
}

function findBarNext() {
  if (!_findBarMatches.length) return;
  clearFindHighlights();
  _findBarIndex = (_findBarIndex + 1) % _findBarMatches.length;
  applyFindHighlights();
  scrollToMatch(_findBarIndex);
  updateFindCount();
}

function findBarPrev() {
  if (!_findBarMatches.length) return;
  clearFindHighlights();
  _findBarIndex = (_findBarIndex - 1 + _findBarMatches.length) % _findBarMatches.length;
  applyFindHighlights();
  scrollToMatch(_findBarIndex);
  updateFindCount();
}

function findBarReplace() {
  if (_findBarIndex < 0 || _findBarIndex >= _findBarMatches.length) return;
  var m = _findBarMatches[_findBarIndex];
  var replaceInput = $('notes-replace-input');
  if (!replaceInput) return;
  var replacement = replaceInput.value;

  clearFindHighlights();
  var range = document.createRange();
  range.setStart(m.node, m.start);
  range.setEnd(m.node, m.end);
  range.deleteContents();
  range.insertNode(document.createTextNode(replacement));
  m.node = range.startContainer;

  _findBarMatches.splice(_findBarIndex, 1);
  _findBarIndex = Math.min(_findBarIndex, _findBarMatches.length - 1);
  if (_findBarMatches.length) {
    applyFindHighlights();
    scrollToMatch(_findBarIndex);
  }
  updateFindCount();
  markNotesDirty();
}

function findBarReplaceAll() {
  var replaceInput = $('notes-replace-input');
  if (!replaceInput) return;
  var replacement = replaceInput.value;
  if (!_findBarMatches.length) return;

  clearFindHighlights();
  var editor = $('notes-editor');
  if (!editor) return;
  var query = $('notes-find-input').value;
  if (!query) return;
  var flags = $('notes-find-case').checked ? 'g' : 'gi';
  var regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);

  var total = 0;
  var walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null, false);
  var node;
  while (node = walker.nextNode()) {
    if (!node.textContent) continue;
    if (regex.test(node.textContent)) {
      node.textContent = node.textContent.replace(regex, replacement);
      total++;
    }
  }

  _findBarMatches = [];
  _findBarIndex = -1;
  updateFindCount();
  markNotesDirty();
  showNotification('Replaced ' + total + ' occurrence' + (total !== 1 ? 's' : ''), 2000, 'success');
}

function notesInsertTable() {
  const cols = parseInt(prompt('Columns:', '3'), 10) || 3;
  const rows = parseInt(prompt('Rows:', '3'), 10) || 3;
  if (cols < 1 || rows < 1) return;
  let ht = '<table style="border-collapse:collapse;width:100%;margin:8px 0">';
  for (let r = 0; r < rows; r++) {
    ht += '<tr>';
    for (let c = 0; c < cols; c++) {
      ht += '<' + (r === 0 ? 'th' : 'td') + ' style="border:1px solid var(--border);padding:6px 10px"> </' + (r === 0 ? 'th' : 'td') + '>';
    }
    ht += '</tr>';
  }
  ht += '</table><br>';
  execCmd('insertHTML', ht);
}

function notesFontManager() {
  fetch('/api/fonts/list')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      let fonts = data.success && data.fonts ? data.fonts : [];
      let html = '<div class="nb-section-title" style="margin:0 0 8px">Custom Fonts</div>';
      html += '<button class="nt-btn" onclick="notesFontImport()" style="font-size:11px;margin-bottom:12px">+ Import Font</button>';

      if (fonts.length) {
        html += '<div id="notes-fonts-list">';
        fonts.forEach(function(f) {
          const safe = escapeHtml(f.name);
          html += '<div class="nb-doc-item" data-font="' + safe + '">'
            + '<div style="flex:1;font-size:11px;color:var(--fg)">' + safe + ' <span style="color:var(--fg-dim);font-size:9px">(' + Math.round(f.size/1024) + ' KB)</span></div>'
            + '<button class="nb-doc-del" data-action="delete" title="Delete">×</button>'
            + '</div>';
        });
        html += '</div>';

        html += '<div style="margin-top:12px;font-size:10px;color:var(--fg-dim)">Preview: ';
        fonts.forEach(function(f) {
          var name = f.name.replace(/\.[^.]+$/, '');
          var safeName = name.replace(/[^a-zA-Z0-9\s-]/g, '');
          html += '<span style="font-family:\'' + safeName + '\';margin-right:10px;font-size:14px">' + escapeHtml(name) + '</span> ';
        });
        html += '</div>';
      } else {
        html += '<div style="color:var(--fg-dim);font-size:10px;margin-bottom:8px">No custom fonts imported yet. Supported: .ttf, .otf, .woff, .woff2</div>';
      }

      showModal('Font Manager', html);

      const listEl = $('notes-fonts-list');
      if (listEl) {
        listEl.addEventListener('click', function(e) {
          const item = e.target.closest('.nb-doc-item');
          if (!item) return;
          const name = item.dataset.font;
          if (!name) return;
          if (e.target.dataset.action === 'delete') {
            if (!confirm('Delete font "' + name + '"?')) return;
            fetch('/api/fonts/delete', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({name: name})
            }).then(function() {
              removeFontFace(name);
              notesFontManager();
            });
          }
        });
      }
    })
    .catch(function() {
      showModal('Font Manager', '<div style="color:var(--fg-dim);font-size:11px">Failed to load fonts.</div>');
    });
}

function notesFontImport() {
  const input = $('notes-font-input');
  if (input) input.click();
}

function notesFontImportFile(file) {
  if (!file) return;
  const ext = file.name.split('.').pop().toLowerCase();
  if (!['ttf', 'otf', 'woff', 'woff2'].includes(ext)) {
    showNotification('Unsupported font format. Use .ttf, .otf, .woff, or .woff2', 4000, 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const b64 = e.target.result.split(',')[1];
    fetch('/api/fonts/upload', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: file.name, content: b64})
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.success) {
        addFontFace(file.name);
        notesFontManager();
      } else {
        showNotification('Failed to import font: ' + (data.error || 'unknown error'));
      }
    })
    .catch(function(err) {
      showNotification('Error: ' + err.message);
    });
  };
  reader.readAsDataURL(file);
}

function addFontFace(filename) {
  const name = filename.replace(/\.[^.]+$/, '');
  const ext = filename.split('.').pop();
  const formatMap = {ttf: 'truetype', otf: 'opentype', woff: 'woff', woff2: 'woff2'};
  const format = formatMap[ext] || 'truetype';
  const url = '/api/fonts/download?name=' + encodeURIComponent(filename);

  const safeName = name.replace(/[^a-zA-Z0-9\s-]/g, '');
  const style = document.createElement('style');
  style.id = 'fontface-' + safeName.replace(/\s+/g, '-');
  style.textContent = '@font-face { font-family: "' + safeName + '"; src: url("' + url + '") format("' + format + '"); font-display: swap; }';
  document.head.appendChild(style);

  const select = $('nt-font-family');
  if (select) {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  }
}

function removeFontFace(filename) {
  const name = filename.replace(/\.[^.]+$/, '');
  const el = document.getElementById('fontface-' + name.replace(/[^a-zA-Z0-9]/g, '-'));
  if (el) el.remove();
  const select = $('nt-font-family');
  if (select) {
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value === name) {
        select.remove(i);
        break;
      }
    }
  }
}

function loadCustomFonts() {
  fetch('/api/fonts/list')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.success && data.fonts) {
        data.fonts.forEach(function(f) {
          if (!document.getElementById('fontface-' + f.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9]/g, '-'))) {
            addFontFace(f.name);
          }
        });
      }
    })
    .catch(function() {});
}

function notesTempSave() {
  const editor = $('notes-editor');
  if (!editor) return;
  const name = prompt('Template name:', _notesFilename + ' Template');
  if (!name || !name.trim()) return;
  fetch('/api/templates/save', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: name.trim(), content: editor.innerHTML})
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      showNotification('Template "' + name.trim() + '" saved!', 2000, 'success');
    } else {
      showNotification('Failed to save template: ' + (data.error || 'unknown error'));
    }
  })
  .catch(function(err) {
    showNotification('Error: ' + err.message);
  });
}

function notesTempLoad() {
  fetch('/api/templates/list')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      let templates = data.success && data.templates ? data.templates : [];
      if (!templates.length) {
        showModal('Load Template', '<div style="color:var(--fg-dim);font-size:11px">No saved templates yet. Edit a document and click Tpl+ to save as template.</div>');
        return;
      }
      let html = '<div style="font-size:10px;color:var(--fg-dim);margin-bottom:8px">Select a template to apply:</div>';
      html += '<div id="notes-temp-list">';
      templates.forEach(function(t) {
        const safe = escapeHtml(t.name);
        html += '<div class="nb-doc-item" data-temp="' + safe + '" style="cursor:pointer">'
          + '<div style="flex:1;font-size:11px;color:var(--fg)">' + safe + '</div>'
          + '<button class="nb-doc-del" data-action="delete" title="Delete">×</button>'
          + '</div>';
      });
      html += '</div>';
      showModal('Load Template', html);

      const listEl = $('notes-temp-list');
      if (listEl) {
        listEl.addEventListener('click', function(e) {
          const item = e.target.closest('.nb-doc-item');
          if (!item) return;
          const name = item.dataset.temp;
          if (!name) return;
          if (e.target.dataset.action === 'delete') {
            if (!confirm('Delete template "' + name + '"?')) return;
            fetch('/api/templates/delete', {
              method: 'POST', headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({name: name})
            }).then(function() { notesTempLoad(); });
          } else {
            loadTemplateContent(name);
            closeModal();
          }
        });
      }
    })
    .catch(function() {
      showModal('Load Template', '<div style="color:var(--fg-dim);font-size:11px">Failed to load templates.</div>');
    });
}

function loadTemplateContent(name) {
  const editor = $('notes-editor');
  if (!editor) return;
  fetch('/api/templates/load?name=' + encodeURIComponent(name))
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.success && data.content) {
        editor.innerHTML = data.content;
        markNotesDirty();
      } else {
        showNotification('Failed to load template.', 3000, 'error');
      }
    })
    .catch(function() { showNotification('Failed to load template.', 3000, 'error'); });
}

function notesInsertBlockquote() {
  execCmd('formatBlock', 'blockquote');
}

function notesInsertCode() {
  const editor = $('notes-editor');
  if (!editor) return;
  editor.focus();
  const sel = window.getSelection();
  if (sel.rangeCount && !sel.isCollapsed) {
    const html = '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;font-family:monospace;font-size:13px;overflow-x:auto;margin:8px 0"><code>' + escapeHtml(sel.toString()) + '</code></pre>';
    document.execCommand('insertHTML', false, html);
  } else {
    const html = '<pre style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:8px 12px;font-family:monospace;font-size:13px;overflow-x:auto;margin:8px 0"><code>code</code></pre>';
    document.execCommand('insertHTML', false, html);
  }
  markNotesDirty();
}

function notesInsertEmoji() {
  const emojis = [
    '😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰','😜','🤪','😝','🤑','🤗',
    '🤔','🤐','😐','😑','😶','😏','😒','🙄','😬','😮','😯','😲','😳','🥺','😢','😭','😤','😠','😡','🤬',
    '👍','👎','👊','✊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','✌️','🤞','💪','✍️','👀','👁️','🧠','🗣️',
    '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💗','💖','💘','💝','💟','♥️','💯',
    '🔥','⭐','🌟','✨','💥','💫','⚡','🌈','☀️','🌙','⭐','🌟','🌍','🌎','🌏','🌋','🌈','☁️','❄️','🔥',
    '🎉','🎊','🎈','🎁','🎀','🎄','🎃','🎆','🎇','🎓','🏆','🥇','🥈','🥉','🏅','🎵','🎶','🎸','🎹','🎤',
    '✅','❌','❓','❔','❕','❗','➕','➖','➗','✖️','💲','©️','®️','™️','🔒','🔓','🔑','🔔','🔕','🚀',
    '📝','📄','📃','📑','📊','📈','📉','📋','📌','📍','✂️','🔗','📎','🖇️','📁','📂','🗂️','📅','📆','📚',
    '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐔','🐧',
    '🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥝','🍅','🍆','🥑','🥦'
  ];

  let html = '<div style="font-size:10px;color:var(--fg-dim);margin-bottom:6px">Click an emoji to insert:</div>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:2px;max-height:260px;overflow-y:auto;padding:4px">';
  emojis.forEach(function(e) {
    html += '<span class="emoji-picker-item" data-emoji="' + e + '" style="cursor:pointer;font-size:22px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:4px;color:var(--fg)">' + e + '</span>';
  });
  html += '</div>';
  showModal('Insert Emoji', html);

  var picker = document.querySelector('.emoji-picker-item');
  if (picker && picker.parentNode) {
    picker.parentNode.addEventListener('click', function(e) {
      var item = e.target.closest('.emoji-picker-item');
      if (!item) return;
      var emoji = item.dataset.emoji;
      if (emoji) {
        document.execCommand('insertText', false, emoji);
        markNotesDirty();
        closeModal();
      }
    });
  }
}

function notesAddTableRow(dir) {
  var ed = $('notes-editor');
  if (!ed) return;
  var sel = window.getSelection();
  if (!sel.rangeCount) return;
  var node = sel.getRangeAt(0).commonAncestorContainer;
  if (node.nodeType === 3) node = node.parentNode;
  var td = node.closest ? node.closest('td,th') : null;
  if (!td) return;
  var tr = td.parentNode;
  var table = tr ? tr.parentNode : null;
  if (!table || table.tagName !== 'TABLE') return;
  var newRow = document.createElement('tr');
  var cells = tr.querySelectorAll('td,th');
  cells.forEach(function(c) {
    var cell = document.createElement(c.tagName === 'TH' ? 'th' : 'td');
    cell.innerHTML = ' ';
    cell.style.cssText = c.style.cssText;
    newRow.appendChild(cell);
  });
  if (dir === 'above') {
    tr.parentNode.insertBefore(newRow, tr);
  } else {
    if (tr.nextSibling) {
      tr.parentNode.insertBefore(newRow, tr.nextSibling);
    } else {
      tr.parentNode.appendChild(newRow);
    }
  }
  markNotesDirty();
}

function notesAddTableCol(dir) {
  var ed = $('notes-editor');
  if (!ed) return;
  var sel = window.getSelection();
  if (!sel.rangeCount) return;
  var node = sel.getRangeAt(0).commonAncestorContainer;
  if (node.nodeType === 3) node = node.parentNode;
  var td = node.closest ? node.closest('td,th') : null;
  if (!td) return;
  var tr = td.parentNode;
  var table = tr ? tr.parentNode : null;
  if (!table || table.tagName !== 'TABLE') return;
  var idx = Array.prototype.indexOf.call(tr.children, td);
  var rows = table.querySelectorAll('tr');
  rows.forEach(function(r) {
    var cell = document.createElement('td');
    cell.innerHTML = ' ';
    cell.style.cssText = td.style.cssText;
    if (dir === 'left') {
      r.insertBefore(cell, r.children[idx]);
    } else {
      var next = r.children[idx + 1];
      if (next) { r.insertBefore(cell, next); } else { r.appendChild(cell); }
    }
  });
  markNotesDirty();
}

function notesDeleteTableRow() {
  var ed = $('notes-editor');
  if (!ed) return;
  var sel = window.getSelection();
  if (!sel.rangeCount) return;
  var node = sel.getRangeAt(0).commonAncestorContainer;
  if (node.nodeType === 3) node = node.parentNode;
  var tr = node.closest ? node.closest('tr') : null;
  if (!tr) return;
  tr.parentNode.removeChild(tr);
  markNotesDirty();
}

function notesDeleteTableCol() {
  var ed = $('notes-editor');
  if (!ed) return;
  var sel = window.getSelection();
  if (!sel.rangeCount) return;
  var node = sel.getRangeAt(0).commonAncestorContainer;
  if (node.nodeType === 3) node = node.parentNode;
  var td = node.closest ? node.closest('td,th') : null;
  if (!td) return;
  var tr = td.parentNode;
  var table = tr ? tr.parentNode : null;
  if (!table || table.tagName !== 'TABLE') return;
  var idx = Array.prototype.indexOf.call(tr.children, td);
  var rows = table.querySelectorAll('tr');
  rows.forEach(function(r) {
    if (r.children[idx]) r.removeChild(r.children[idx]);
  });
  markNotesDirty();
}

function notesTableMenu() {
  var ed = $('notes-editor');
  if (!ed) return;
  var sel = window.getSelection();
  if (!sel.rangeCount) return;
  var node = sel.getRangeAt(0).commonAncestorContainer;
  if (node.nodeType === 3) node = node.parentNode;
  var td = node.closest ? node.closest('td,th') : null;
  if (!td) {
    showModal('Table', '<div style="font-size:11px;color:var(--fg-dim)">Place cursor inside a table first.</div>');
    return;
  }
  var html = '<div style="display:flex;flex-wrap:wrap;gap:4px;font-size:10px">';
  html += '<button class="nt-btn" onclick="closeModal();notesAddTableRow(\'above\')" style="font-size:10px">Row ↑</button>';
  html += '<button class="nt-btn" onclick="closeModal();notesAddTableRow(\'below\')" style="font-size:10px">Row ↓</button>';
  html += '<button class="nt-btn" onclick="closeModal();notesAddTableCol(\'left\')" style="font-size:10px">Col ←</button>';
  html += '<button class="nt-btn" onclick="closeModal();notesAddTableCol(\'right\')" style="font-size:10px">Col →</button>';
  html += '<button class="nt-btn" onclick="closeModal();notesDeleteTableRow()" style="font-size:10px;color:var(--red)">Del Row</button>';
  html += '<button class="nt-btn" onclick="closeModal();notesDeleteTableCol()" style="font-size:10px;color:var(--red)">Del Col</button>';
  html += '</div>';
  showModal('Edit Table', html);
}

function notesHelp() {
  var html = '<div style="font-size:10px;line-height:1.6;color:var(--fg)">'
    + '<div class="nb-section-title" style="margin:0 0 6px">Formatting</div>'
    + '<p style="margin:0 0 8px">Bold, Italic, Underline, Strikethrough, Headings (H1-H3), Font size, Font family, Text color, Highlight, Align (L/C/R/J), Ordered/Unordered lists, Indent/Outdent, Line spacing, List style, Superscript, Subscript, Clear formatting.</p>'

    + '<div class="nb-section-title" style="margin:0 0 6px">Insert</div>'
    + '<p style="margin:0 0 8px">Link (Ctrl+K), Image, Table, Edit Table (add/delete rows & cols), Blockquote, Code block, Emoji picker, Horizontal rule, Find & Replace (Ctrl+F).</p>'

    + '<div class="nb-section-title" style="margin:0 0 6px">Document</div>'
    + '<p style="margin:0 0 8px">New, Open (.txt, .md, .pdf — drag & drop supported), Save (Ctrl+S), Notes Manager (list/rename/delete), Print, PDF export, Templates (save & load), Font Manager (import .ttf/.otf/.woff/.woff2).</p>'

    + '<div class="nb-section-title" style="margin:0 0 6px">Keyboard Shortcuts</div>'
    + '<table style="width:100%;font-size:10px;border-collapse:collapse;margin-bottom:8px">'
    + '<tr><td style="padding:2px 6px;border:1px solid var(--border)"><kbd>Ctrl+S</kbd></td><td style="padding:2px 6px;border:1px solid var(--border)">Save</td></tr>'
    + '<tr><td style="padding:2px 6px;border:1px solid var(--border)"><kbd>Ctrl+B</kbd></td><td style="padding:2px 6px;border:1px solid var(--border)">Bold</td></tr>'
    + '<tr><td style="padding:2px 6px;border:1px solid var(--border)"><kbd>Ctrl+I</kbd></td><td style="padding:2px 6px;border:1px solid var(--border)">Italic</td></tr>'
    + '<tr><td style="padding:2px 6px;border:1px solid var(--border)"><kbd>Ctrl+U</kbd></td><td style="padding:2px 6px;border:1px solid var(--border)">Underline</td></tr>'
    + '<tr><td style="padding:2px 6px;border:1px solid var(--border)"><kbd>Ctrl+Z</kbd></td><td style="padding:2px 6px;border:1px solid var(--border)">Undo</td></tr>'
    + '<tr><td style="padding:2px 6px;border:1px solid var(--border)"><kbd>Ctrl+Y</kbd></td><td style="padding:2px 6px;border:1px solid var(--border)">Redo</td></tr>'
    + '<tr><td style="padding:2px 6px;border:1px solid var(--border)"><kbd>Ctrl+K</kbd></td><td style="padding:2px 6px;border:1px solid var(--border)">Insert link</td></tr>'
    + '<tr><td style="padding:2px 6px;border:1px solid var(--border)"><kbd>Ctrl+F</kbd></td><td style="padding:2px 6px;border:1px solid var(--border)">Find & Replace</td></tr>'
    + '<tr><td style="padding:2px 6px;border:1px solid var(--border)"><kbd>Tab</kbd></td><td style="padding:2px 6px;border:1px solid var(--border)">Indent list / insert spaces</td></tr>'
    + '</table>'

    + '<div class="nb-section-title" style="margin:0 0 6px">Auto-Save</div>'
    + '<p style="margin:0">The editor auto-saves every 30 seconds to the server. Unsaved changes are marked <span style="color:var(--amber)">Unsaved</span> in the status bar; a saved document shows <span style="color:var(--teal)">Saved</span> or <span style="color:var(--teal)">Auto-saved</span>.</p>'
    + '</div>';
  showModal('Notes Help', html);
}

function initNotes() {
  const editor = $('notes-editor');
  if (!editor) return;

  updateNoteStats();

  editor.addEventListener('input', markNotesDirty);
  editor.addEventListener('mouseup', updateNoteStats);
  editor.addEventListener('keyup', updateNoteStats);
  editor.addEventListener('keydown', function(e) {
    const isCtrl = e.ctrlKey || e.metaKey;
    if (isCtrl && e.key === 's') {
      e.preventDefault();
      notesSave();
      return;
    }
    if (isCtrl && e.key === 'b') { e.preventDefault(); execCmd('bold'); return; }
    if (isCtrl && e.key === 'i') { e.preventDefault(); execCmd('italic'); return; }
    if (isCtrl && e.key === 'u') { e.preventDefault(); execCmd('underline'); return; }
    if (isCtrl && e.key === 'z') { e.preventDefault(); execCmd('undo'); return; }
    if (isCtrl && e.key === 'y') { e.preventDefault(); execCmd('redo'); return; }
    if (isCtrl && e.key === 'k') { e.preventDefault(); insertLink(); return; }
    if (isCtrl && e.key === 'f') { e.preventDefault(); toggleFindBar(); return; }

    if (e.key === 'Tab') {
      e.preventDefault();
      const sel = window.getSelection();
      if (!sel.rangeCount) return;
      let node = sel.getRangeAt(0).commonAncestorContainer;
      if (node.nodeType === 3) node = node.parentNode;
      const li = node.closest ? node.closest('li') : null;
      if (li && li.parentNode) {
        execCmd(e.shiftKey ? 'outdent' : 'indent');
      } else {
        document.execCommand('insertHTML', false, '  ');
      }
      markNotesDirty();
      return;
    }

    if (e.key === 'Enter') {
      const sel = window.getSelection();
      if (!sel.rangeCount) return;
      let node = sel.getRangeAt(0).commonAncestorContainer;
      if (node.nodeType === 3) node = node.parentNode;
      const li = node.closest ? node.closest('li') : null;
      if (li && li.textContent.trim() === '' && !e.shiftKey) {
        e.preventDefault();
        execCmd('outdent');
        return;
      }
    }
  });

  const fileInput = $('notes-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      if (e.target.files && e.target.files.length) {
        notesOpenFile(e.target.files[0]);
      }
      e.target.value = '';
    });
  }

  const imgInput = $('notes-image-input');
  if (imgInput) {
    imgInput.addEventListener('change', function(e) {
      if (e.target.files && e.target.files.length) {
        notesInsertImageFile(e.target.files[0]);
      }
      e.target.value = '';
    });
  }

  editor.addEventListener('dragover', function(e) { e.preventDefault(); });
  editor.addEventListener('drop', function(e) {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      const ext = file.name.split('.').pop().toLowerCase();
      if (['png','jpg','jpeg','gif','svg','webp'].includes(ext)) {
        notesInsertImageFile(file);
      } else if (['txt','md','pdf'].includes(ext)) {
        notesOpenFile(file);
      } else {
        showNotification('Unsupported file type.', 3000, 'error');
      }
    } else if (e.dataTransfer.types.indexOf('text/html') !== -1 || e.dataTransfer.types.indexOf('text/plain') !== -1) {
      const html = e.dataTransfer.getData('text/html') || e.dataTransfer.getData('text/plain');
      if (html) {
        document.execCommand('insertHTML', false, html);
        markNotesDirty();
      }
    }
  });

  if (_notesAutoTimer) clearInterval(_notesAutoTimer);
  _notesAutoTimer = setInterval(function() {
    if (_notesDirty) {
      const editor = $('notes-editor');
      if (editor && _notesFilename !== 'Untitled') {
        const html = editor.innerHTML;
        // Try server first
        fetch('/api/notes/save', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name: _notesFilename, content: html})
        }).then(function(r) { return r.json(); }).then(function(d) {
          if (d.success) {
            try { localStorage.setItem('nexcampus_note_' + _notesFilename, html); } catch(e) {}
            const el = $('notes-saved');
            if (el) { el.textContent = 'Auto-saved'; el.style.color = 'var(--teal)'; }
          }
        }).catch(function() {
          // Fallback to localStorage
          try {
            const saved = localStorage.getItem('nexcampus_note_' + _notesFilename);
            if (saved !== html) {
              localStorage.setItem('nexcampus_note_' + _notesFilename, html);
              const el = $('notes-saved');
              if (el) { el.textContent = 'Auto-saved'; el.style.color = 'var(--teal)'; }
            }
          } catch(e) {}
        });
      }
      updateNoteStats();
    }
  }, 30000);

  _notesDirty = false;

  window.addEventListener('beforeunload', function() {
    if (_notesAutoTimer) { clearInterval(_notesAutoTimer); _notesAutoTimer = null; }
  });

  const fontInput = $('notes-font-input');
  if (fontInput) {
    fontInput.addEventListener('change', function(e) {
      if (e.target.files && e.target.files.length) {
        notesFontImportFile(e.target.files[0]);
      }
      e.target.value = '';
    });
  }

  loadCustomFonts();
}
