// Study Lab Tools — Citation, Timer, Readability, Merge, GPA, Vocab, Outline, Diff, Bibliography, Periodic Table
// All tools render inline in their content divs (no modals for main UI)

var _timerInterval = null;
var _timerSeconds = 25 * 60;
var _timerMode = 'focus';
var _gpaRows = 0;
var _bibRefs = [];

// Offline dictionary (~500 words)
var DICT = {
  'abrogate':'to abolish or annul by formal means','abscond':'to leave hurriedly and secretly','acumen':'the ability to make good judgments','admonish':'to warn or reprimand firmly','adroit':'clever or skillful',
  'adulation':'excessive praise or flattery','aesthetic':'concerned with beauty or the appreciation of beauty','alacrity':'brisk and cheerful readiness','ambiguous':'open to more than one interpretation','ameliorate':'to make something bad become better',
  'anachronism':'something belonging to a period other than the one in which it exists','anomaly':'something that deviates from the norm','antipathy':'a deep-seated feeling of dislike','apathetic':'showing or feeling no emotion',
  'arduous':'involving great effort; difficult','articulate':'having or showing the ability to speak fluently','assuage':'to make an unpleasant feeling less intense','audacious':'showing willingness to take bold risks',
  'benevolent':'well-meaning and kindly','belligerent':'hostile and aggressive','brevity':'concise and exact use of words','candor':'the quality of being open and honest','capricious':'given to sudden changes of mood',
  'catalyst':'a person or thing that causes change','caustic':'sarcastic in a scathing way','circumspect':'wary and unwilling to take risks','coalesce':'to come together to form one mass',
  'cogent':'clear, logical, and convincing','complacent':'showing smug satisfaction with oneself','conciliatory':'intended to gain goodwill','conspicuous':'standing out so as to be clearly visible',
  'copious':'abundant in supply','corroborate':'to confirm or give support','credulous':'too ready to believe things','cryptic':'mysterious or obscure','cursory':'hasty and therefore not thorough',
  'daunting':'seeming difficult to deal with','deferential':'showing deference; respectful','delineate':'to describe or portray precisely','denigrate':'to criticize unfairly',
  'despondent':'in low spirits from loss of hope','didactic':'intended to teach or instruct','diffident':'modest or shy','diligent':'having careful and persistent effort',
  'discern':'to perceive or recognize','disparate':'essentially different in kind','disseminate':'to spread widely','dissonance':'lack of harmony','dogmatic':'inclined to lay down principles as incontrovertibly true',
  'ebullient':'cheerful and full of energy','eclectic':'deriving ideas from a broad range of sources','efficacious':'successful in producing a desired result','elucidate':'to make clear; explain',
  'emulate':'to match or surpass by imitation','engender':'to cause or give rise to','ephemeral':'lasting for a very short time','equanimity':'mental calmness in difficult situations',
  'erudite':'having great knowledge','esoteric':'intended for a small knowledgeable group','euphemism':'a mild expression substituted for a harsh one','exacerbate':'to make a problem worse',
  'exemplify':'to be a typical example of','expedite':'to make happen sooner','explicit':'stated clearly in detail','extol':'to praise enthusiastically','extraneous':'irrelevant or unrelated',
  'facilitate':'to make an action easy','fallacious':'based on a mistaken belief','fastidious':'very attentive to detail','fathom':'to understand after much thought','feasible':'possible and practical',
  'fervent':'having intense passion','fiasco':'a thing that is a failure','flippant':'not showing proper seriousness','fortuitous':'happening by chance','frugal':'sparing or economical',
  'futile':'incapable of producing results','garrulous':'excessively talkative','gratuitous':'uncalled for; unnecessary','gregarious':'fond of company; sociable','hackneyed':'lacking originality through overuse',
  'hapless':'unfortunate','heresy':'opinion contrary to orthodox belief','hypothetical':'supposed but not necessarily real','iconoclast':'a person who attacks cherished beliefs',
  'idiosyncratic':'peculiar to the individual','ignominious':'deserving disgrace','illicit':'forbidden by law','immutable':'unchanging over time','impartial':'treating all rivals equally',
  'impetuous':'acting quickly without thought','implacable':'unable to be appeased','implicit':'implied though not directly expressed','imprudent':'not showing care for consequences',
  'incisive':'intelligently analytical','indifferent':'having no particular interest','indigenous':'originating in a particular place','indolent':'wanting to avoid activity',
  'ineffable':'too great to be expressed in words','inevitable':'certain to happen','infamous':'well known for something bad','inherent':'existing as a permanent quality',
  'innovative':'featuring new methods','insidious':'proceeding in a harmful way','insipid':'lacking flavor or interest','intrepid':'fearless and adventurous',
  'irascible':'easily irritated','irrevocable':'not able to be changed','judicious':'having good judgment','juxtapose':'to place close together for comparison','laconic':'using very few words',
  'laudable':'deserving praise','loquacious':'tending to talk a lot','lucid':'expressed clearly; easy to understand','magnanimous':'very generous or forgiving',
  'malevolent':'having a wish to harm others','malleable':'easily influenced or shaped','melancholy':'a deep sadness','meticulous':'showing great attention to detail',
  'mitigate':'to make less severe','morose':'sullen and ill-tempered','mundane':'lacking interest or excitement','nefarious':'wicked or criminal',
  'nonchalant':'feeling calm and relaxed','notoriety':'famous for something bad','novel':'new and original','nuance':'a subtle difference','obfuscate':'to make unclear',
  'obsolete':'no longer produced or used','obstinate':'stubbornly refusing to change','ominous':'giving the impression that something bad will happen','omniscient':'knowing everything',
  'onerous':'involving great effort','opaque':'not able to be seen through','ostentatious':'designed to impress','palatable':'pleasant to taste or acceptable',
  'panacea':'a solution for all problems','paradigm':'a typical example or pattern','paradox':'a seemingly contradictory statement','parochial':'having a limited outlook',
  'pedantic':'excessively concerned with minor details','penchant':'a strong liking','perfunctory':'carried out with minimum effort','perseverance':'continued effort despite difficulties',
  'pertinent':'relevant to a matter','phenomenon':'a fact or event of interest','philanthropy':'the desire to promote the welfare of others','pivotal':'of crucial importance',
  'placate':'to make someone less angry','plausible':'seeming reasonable or probable','pragmatic':'dealing with things practically','precarious':'not securely held in position',
  'preclude':'to prevent from happening','precocious':'having developed abilities earlier than usual','predominant':'present as the strongest element','prevalent':'widespread',
  'profound':'very great or intense','prolific':'producing much fruit or many works','propensity':'a natural tendency','prosaic':'commonplace; unromantic',
  'prudent':'acting with care for the future','quandary':'a state of perplexity','rancorous':'characterized by bitterness','rationalize':'to attempt to explain logically',
  'recalcitrant':'having an obstinately uncooperative attitude','recondite':'little known; obscure','redoubtable':'formidable as an opponent',
  'refute':'to prove wrong','relegate':'to consign to an inferior position','relentless':'oppressively constant','relinquish':'to voluntarily give up',
  'reprehensible':'deserving condemnation','repudiate':'to refuse to accept','resilient':'able to recover quickly','resolute':'determined and unwavering',
  'reticent':'not revealing thoughts readily','rhetoric':'effective or persuasive language','robust':'strong and healthy','ruminate':'to think deeply about something',
  'sagacious':'having keen mental discernment','salient':'most noticeable or important','sanctimonious':'making a show of being morally superior','sanguine':'optimistic or positive',
  'sardonic':'grimly mocking','scrupulous':'diligent and thorough','scrutinize':'to examine closely','sedulous':'showing dedication and diligence',
  'solicitous':'showing concern','solitude':'the state of being alone','somber':'dark and gloomy','sporadic':'occurring at irregular intervals',
  'spurious':'not genuine; false','stagnant':'having no current or flow','stringent':'strict and precise','subjective':'based on personal feelings',
  'sublime':'of outstanding artistic worth','substantiate':'to provide evidence','succinct':'briefly and clearly expressed','superfluous':'unnecessary; more than needed',
  'surreptitious':'kept secret because it would not be approved','sycophant':'a person who acts obsequiously','taciturn':'reserved or uncommunicative',
  'tenacious':'holding firmly to something','tentative':'not certain or fixed','terse':'using few words; abrupt','transient':'lasting only a short time',
  'trepidation':'a feeling of fear or agitation','ubiquitous':'present everywhere','unanimous':'fully in agreement','unprecedented':'never done or known before',
  'vacillate':'to alternate between different opinions','vehement':'showing strong feeling','venerable':'accorded great respect','verbose':'using more words than needed',
  'vicarious':'experienced through another','vigilant':'keeping careful watch','vindicate':'to clear of blame','virtuoso':'a person highly skilled',
  'virulent':'extremely severe or harmful','vivacious':'attractively lively','vociferous':'loud and forceful','volatile':'liable to change rapidly',
  'voracious':'wanting great amounts','zealous':'having great energy'
};

// ====== TOOL INITIALIZATION ======
var TOOL_INIT = {};

function initTool(tool) {
  if (TOOL_INIT[tool]) TOOL_INIT[tool]();
}

// ====== 1. CITATION GENERATOR ======
TOOL_INIT.citation = function() {
  updateCitFields();
};

function updateCitFields() {
  var t = $('cit-type') ? $('cit-type').value : 'book';
  var extra = '';
  if (t === 'article') {
    extra = '<label style="display:block;font-size:11px;color:var(--fg-dim);margin-bottom:4px">Journal: <input type="text" id="cit-journal" class="tools-input"></label>'
      + '<label style="display:block;font-size:11px;color:var(--fg-dim);margin-bottom:4px">Volume: <input type="text" id="cit-volume" class="tools-input" style="width:70px"></label>'
      + '<label style="display:block;font-size:11px;color:var(--fg-dim);margin-bottom:4px">Pages: <input type="text" id="cit-pages" class="tools-input" style="width:100px" placeholder="123-145"></label>';
  } else if (t === 'website') {
    extra = '<label style="display:block;font-size:11px;color:var(--fg-dim);margin-bottom:4px">Site name: <input type="text" id="cit-site" class="tools-input"></label>'
      + '<label style="display:block;font-size:11px;color:var(--fg-dim);margin-bottom:4px">URL: <input type="text" id="cit-url" class="tools-input"></label>'
      + '<label style="display:block;font-size:11px;color:var(--fg-dim);margin-bottom:4px">Access date: <input type="text" id="cit-access" class="tools-input" value="' + new Date().toLocaleDateString('en-US') + '"></label>';
  } else {
    extra = '<label style="display:block;font-size:11px;color:var(--fg-dim);margin-bottom:4px">Publisher: <input type="text" id="cit-publisher" class="tools-input"></label>';
  }
  var fields = $('cit-fields');
  if (!fields) return;
  var author = $('cit-author'), title = $('cit-title'), year = $('cit-year');
  fields.innerHTML = ''
    + '<label style="display:block;font-size:11px;color:var(--fg-dim);margin-bottom:4px">Author: <input type="text" id="cit-author" class="tools-input" value="' + (author ? author.value : '') + '" placeholder="Last, First"></label>'
    + '<label style="display:block;font-size:11px;color:var(--fg-dim);margin-bottom:4px">Title: <input type="text" id="cit-title" class="tools-input" value="' + (title ? title.value : '') + '"></label>'
    + extra
    + '<label style="display:block;font-size:11px;color:var(--fg-dim);margin-bottom:4px">Year: <input type="text" id="cit-year" class="tools-input" style="width:80px" value="' + (year ? year.value : '') + '"></label>';
}

function genCitation() {
  var type = $('cit-type') ? $('cit-type').value : 'book';
  var style = $('cit-style') ? $('cit-style').value : 'mla';
  var author = $('cit-author') ? $('cit-author').value.trim() : '';
  var title = $('cit-title') ? $('cit-title').value.trim() : '';
  var year = $('cit-year') ? $('cit-year').value.trim() : '';
  if (!title) { alert('Title is required.'); return; }
  function fmtAuthor(s, fallback) {
    if (!author) return fallback;
    var parts = author.replace(/,?\s*(jr|sr|ii|iii|iv)\.?$/i, '').split(',');
    if (parts.length >= 2) {
      var last = parts[0].trim(), first = parts.slice(1).join(' ').trim();
      if (s === 'apa') return last + ', ' + first.charAt(0) + '.';
      return last + ', ' + first;
    }
    return author;
  }
  var citation = '', result = $('cit-result');
  if (style === 'mla') {
    if (type === 'book') {
      citation = fmtAuthor('mla') + '. <i>' + title + '</i>. ' + ($('cit-publisher') ? $('cit-publisher').value.trim() : '') + ', ' + year + '.';
    } else if (type === 'article') {
      citation = fmtAuthor('mla') + '. "' + title + '." <i>' + ($('cit-journal') ? $('cit-journal').value.trim() : '') + '</i> ' + ($('cit-volume') ? $('cit-volume').value.trim() : '') + ' (' + year + '): ' + ($('cit-pages') ? $('cit-pages').value.trim() : '') + '.';
    } else {
      citation = fmtAuthor('mla') + '. "' + title + '." <i>' + ($('cit-site') ? $('cit-site').value.trim() : '') + '</i>, ' + year + ', ' + ($('cit-url') ? $('cit-url').value.trim() : '') + '. Accessed ' + ($('cit-access') ? $('cit-access').value.trim() : '') + '.';
    }
  } else if (style === 'apa') {
    if (type === 'book') {
      citation = fmtAuthor('apa') + ' (' + year + '). <i>' + title + '</i>. ' + ($('cit-publisher') ? $('cit-publisher').value.trim() : '') + '.';
    } else if (type === 'article') {
      citation = fmtAuthor('apa') + ' (' + year + '). ' + title + '. <i>' + ($('cit-journal') ? $('cit-journal').value.trim() : '') + '</i>, <i>' + ($('cit-volume') ? $('cit-volume').value.trim() : '') + '</i>, ' + ($('cit-pages') ? $('cit-pages').value.trim() : '') + '.';
    } else {
      citation = fmtAuthor('apa') + ' (' + year + '). ' + title + '. ' + ($('cit-site') ? $('cit-site').value.trim() : '') + '. ' + ($('cit-url') ? $('cit-url').value.trim() : '');
    }
  } else {
    if (type === 'book') {
      citation = fmtAuthor('chicago') + '. <i>' + title + '</i>. ' + ($('cit-publisher') ? $('cit-publisher').value.trim() : '') + ', ' + year + '.';
    } else if (type === 'article') {
      citation = fmtAuthor('chicago') + '. "' + title + '." <i>' + ($('cit-journal') ? $('cit-journal').value.trim() : '') + '</i> ' + ($('cit-volume') ? $('cit-volume').value.trim() : '') + ' (' + year + '): ' + ($('cit-pages') ? $('cit-pages').value.trim() : '') + '.';
    } else {
      citation = fmtAuthor('chicago') + '. "' + title + '." ' + ($('cit-site') ? $('cit-site').value.trim() : '') + '. Accessed ' + ($('cit-access') ? $('cit-access').value.trim() : '') + '. ' + ($('cit-url') ? $('cit-url').value.trim() : '') + '.';
    }
  }
  if (result) { result.innerHTML = citation || 'Could not generate citation.'; result.classList.add('visible'); }
}

// ====== 2. STUDY TIMER ======
TOOL_INIT.timer = function() {
  _timerSeconds = 25 * 60;
  _timerMode = 'focus';
  _timerInterval = null;
  updateTimerDisplay();
};

function updateTimerDisplay() {
  var d = $('timer-display');
  var modeLabel = $('timer-mode-label');
  var btn = $('timer-toggle-btn');
  if (!d) return;
  var m = Math.floor(_timerSeconds / 60);
  var s = _timerSeconds % 60;
  d.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  if (modeLabel) modeLabel.textContent = (_timerMode === 'focus' ? 'Focus' : 'Break') + ' session';
  if (btn) btn.textContent = _timerInterval ? 'Pause' : 'Start';
  if (_timerSeconds <= 0) { d.className = 'timer-display'; d.textContent = '00:00'; }
}

function timerToggle() {
  if (_timerInterval) {
    clearInterval(_timerInterval); _timerInterval = null;
  } else {
    _timerInterval = setInterval(function() {
      _timerSeconds--;
      if (_timerSeconds <= 0) {
        clearInterval(_timerInterval); _timerInterval = null;
        var prevMode = _timerMode;
        if (_timerMode === 'focus') {
          _timerMode = 'break';
          _timerSeconds = (parseInt($('timer-break-min') ? $('timer-break-min').value : '5') || 5) * 60;
        } else {
          _timerMode = 'focus';
          _timerSeconds = (parseInt($('timer-focus-min') ? $('timer-focus-min').value : '25') || 25) * 60;
        }
        updateTimerDisplay();
        alert(prevMode === 'focus' ? 'Focus complete! Time for a break.' : 'Break over! Time to focus.');
        updateTimerDisplay();
        return;
      }
      updateTimerDisplay();
    }, 1000);
  }
  updateTimerDisplay();
}

function timerReset() {
  if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
  _timerSeconds = (parseInt($('timer-focus-min') ? $('timer-focus-min').value : '25') || 25) * 60;
  _timerMode = 'focus';
  updateTimerDisplay();
}

function timerApply() {
  if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
  _timerSeconds = (parseInt($('timer-focus-min') ? $('timer-focus-min').value : '25') || 25) * 60;
  _timerMode = 'focus';
  updateTimerDisplay();
}

// ====== 3. READING LEVEL ANALYZER ======
TOOL_INIT.readability = function() {
  var editor = $('notes-editor');
  var ta = $('rd-text');
  if (editor && ta && !ta.value) ta.value = editor.textContent || '';
};

function calcReadability() {
  var text = $('rd-text') ? $('rd-text').value.trim() : '';
  if (!text) { alert('Enter or paste some text.'); return; }
  var sentences = text.split(/[.!?]+/).filter(function(s) { return s.trim().length > 0; }).length || 1;
  var words = text.trim().split(/\s+/).length || 1;
  var chars = text.replace(/\s/g, '').length;
  var syllables = 0;
  text.toLowerCase().split(/\s+/).forEach(function(w) {
    if (w.length <= 3) { syllables++; return; }
    w = w.replace(/e$/, '').replace(/[aeiouy]{2,}/g, 'a');
    syllables += Math.max(1, (w.match(/[aeiouy]/g) || []).length);
  });
  var asl = words / sentences;
  var asw = syllables / words;
  var flesch = 206.835 - 1.015 * asl - 84.6 * asw;
  var fkGrade = 0.39 * asl + 11.8 * asw - 15.59;
  var coleman = 0.0588 * (chars / words * 100) - 0.296 * (sentences / words * 100) - 15.8;
  var smog = 1.043 * Math.sqrt(syllables * 30 / sentences) + 3.1291;
  function gL(s, t) {
    if (t === 'flesch') {
      if (s >= 90) return 'Very Easy (5th grade)';
      if (s >= 80) return 'Easy (6th grade)';
      if (s >= 70) return 'Fairly Easy (7th grade)';
      if (s >= 60) return 'Standard (8th-9th grade)';
      if (s >= 50) return 'Fairly Difficult (10th-12th grade)';
      if (s >= 30) return 'Difficult (college)';
      return 'Very Difficult (college grad)';
    }
    if (s <= 5) return 'Elementary';
    if (s <= 8) return 'Middle School';
    if (s <= 12) return 'High School';
    if (s <= 14) return 'College';
    return 'Advanced';
  }
  var html = '<table style="width:100%;font-size:11px;border-collapse:collapse">'
    + '<tr><td style="padding:4px 8px;border:1px solid var(--border);color:var(--fg-dim)">Words</td><td style="padding:4px 8px;border:1px solid var(--border)">' + words + '</td></tr>'
    + '<tr><td style="padding:4px 8px;border:1px solid var(--border);color:var(--fg-dim)">Sentences</td><td style="padding:4px 8px;border:1px solid var(--border)">' + sentences + '</td></tr>'
    + '<tr><td style="padding:4px 8px;border:1px solid var(--border);color:var(--fg-dim)">Syllables</td><td style="padding:4px 8px;border:1px solid var(--border)">' + syllables + '</td></tr>'
    + '<tr><td style="padding:4px 8px;border:1px solid var(--border);color:var(--fg-dim)">Avg words/sentence</td><td style="padding:4px 8px;border:1px solid var(--border)">' + asl.toFixed(1) + '</td></tr>'
    + '<tr><td style="padding:4px 8px;border:1px solid var(--border);color:var(--fg-dim)">Avg syllables/word</td><td style="padding:4px 8px;border:1px solid var(--border)">' + asw.toFixed(2) + '</td></tr>'
    + '<tr><td style="padding:4px 8px;border:1px solid var(--border);color:var(--teal)">Flesch Reading Ease</td><td style="padding:4px 8px;border:1px solid var(--border)">' + flesch.toFixed(1) + ' — ' + gL(flesch, 'flesch') + '</td></tr>'
    + '<tr><td style="padding:4px 8px;border:1px solid var(--border);color:var(--teal)">Flesch-Kincaid Grade</td><td style="padding:4px 8px;border:1px solid var(--border)">' + Math.max(0, fkGrade).toFixed(1) + ' (' + gL(fkGrade, 'grade') + ')</td></tr>'
    + '<tr><td style="padding:4px 8px;border:1px solid var(--border);color:var(--teal)">Coleman-Liau Index</td><td style="padding:4px 8px;border:1px solid var(--border)">' + Math.max(0, coleman).toFixed(1) + ' (' + gL(coleman, 'grade') + ')</td></tr>'
    + '<tr><td style="padding:4px 8px;border:1px solid var(--border);color:var(--teal)">SMOG Index</td><td style="padding:4px 8px;border:1px solid var(--border)">' + Math.max(0, smog).toFixed(1) + ' (' + gL(smog, 'grade') + ')</td></tr>'
    + '</table>';
  var result = $('rd-result');
  if (result) { result.innerHTML = html; result.classList.add('visible'); }
}

// ====== 4. DOCUMENT MERGER ======
TOOL_INIT.merge = function() {
  loadMergeDocs();
};

function loadMergeDocs() {
  var list = $('merge-list');
  if (!list) return;
  list.innerHTML = '<div style="color:var(--fg-dim);font-size:10px">Loading documents...</div>';
  fetch('/api/notebook/documents')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var docs = data.documents || [];
      if (!docs.length) {
        list.innerHTML = '<div style="color:var(--fg-dim);font-size:10px">No documents uploaded. Use the Sources panel to add some.</div>';
        return;
      }
      list.innerHTML = docs.map(function(d) {
        return '<label style="display:flex;align-items:center;gap:6px;font-size:11px;padding:3px 0"><input type="checkbox" class="merge-cb" value="' + escapeHtml(d.name) + '" checked> ' + escapeHtml(d.name) + '</label>';
      }).join('');
    })
    .catch(function() { list.innerHTML = '<div style="color:var(--fg-dim);font-size:10px">Failed to load documents.</div>'; });
}

function doMerge() {
  var cbs = document.querySelectorAll('.merge-cb:checked');
  var names = [];
  cbs.forEach(function(cb) { names.push(cb.value); });
  if (!names.length) { alert('Select at least one document.'); return; }
  var result = $('merge-result');
  if (result) { result.innerHTML = '<div style="color:var(--fg-dim)">Merging...</div>'; result.classList.add('visible'); }
  fetch('/api/notebook/merge', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({documents: names})
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success && data.text) {
      var blob = new Blob([data.text], {type: 'text/plain'});
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'merged_documents.txt';
      a.click();
      URL.revokeObjectURL(a.href);
      if (result) { result.innerHTML = 'Downloaded <strong>merged_documents.txt</strong> (' + data.text.length + ' chars).'; }
    } else {
      if (result) { result.innerHTML = '<div style="color:var(--red)">Merge failed: ' + (data.error || 'unknown') + '</div>'; }
    }
  })
  .catch(function(err) { if (result) { result.innerHTML = '<div style="color:var(--red)">Error: ' + err.message + '</div>'; } });
}

// ====== 5. GPA CALCULATOR ======
TOOL_INIT.gpa = function() {
  _gpaRows = 0;
  var container = $('gpa-rows');
  if (container) { container.innerHTML = ''; }
  addGpaRow(); addGpaRow(); addGpaRow();
};

function addGpaRow() {
  var grades = [
    {g:'A+',p:4.0},{g:'A',p:4.0},{g:'A-',p:3.7},
    {g:'B+',p:3.3},{g:'B',p:3.0},{g:'B-',p:2.7},
    {g:'C+',p:2.3},{g:'C',p:2.0},{g:'C-',p:1.7},
    {g:'D+',p:1.3},{g:'D',p:1.0},{g:'F',p:0.0}
  ];
  var opts = grades.map(function(g) { return '<option value="' + g.p + '">' + g.g + '</option>'; }).join('');
  var container = $('gpa-rows');
  if (!container) return;
  var row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:6px;align-items:center;margin-bottom:4px';
  row.className = 'gpa-row';
  row.innerHTML = '<input type="text" class="tools-input" placeholder="Course" style="flex:1;font-size:10px" value="Course ' + (++_gpaRows) + '">'
    + '<select class="tools-input gpa-grade" style="width:70px;font-size:10px">' + opts + '</select>'
    + '<input type="number" class="tools-input gpa-credits" placeholder="Credits" style="width:60px;font-size:10px" value="3" min="0.5" max="20" step="0.5">'
    + '<button onclick="this.parentNode.remove();calcGPA()" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:14px;padding:0 4px">×</button>';
  container.appendChild(row);
  calcGPA();
}

function calcGPA() {
  var totalPoints = 0, totalCredits = 0;
  document.querySelectorAll('#gpa-rows .gpa-row').forEach(function(r) {
    var g = parseFloat(r.querySelector('.gpa-grade').value) || 0;
    var c = parseFloat(r.querySelector('.gpa-credits').value) || 0;
    totalPoints += g * c; totalCredits += c;
  });
  var gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
  var result = $('gpa-result');
  if (result) {
    result.innerHTML = '<strong>GPA: ' + gpa.toFixed(2) + '</strong> &middot; ' + totalCredits + ' total credits &middot; ' + totalPoints.toFixed(1) + ' grade points';
    result.classList.add('visible');
  }
}

// ====== 6. VOCABULARY BUILDER ======
TOOL_INIT.vocab = function() {
  var result = $('vocab-result');
  if (result) { result.classList.remove('visible'); result.innerHTML = ''; }
};

function genVocab() {
  var result = $('vocab-result');
  if (result) { result.innerHTML = '<div style="color:var(--fg-dim)">Analyzing documents...</div>'; result.classList.add('visible'); }
  fetch('/api/notebook/vocabulary', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text: ''})
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success && data.words && data.words.length) {
      var html = '<div style="font-size:10px;color:var(--fg-dim);margin-bottom:6px">' + data.total_words + ' total words, ' + data.unique_words + ' unique. Showing ' + data.words.length + ' vocabulary words:</div>';
      data.words.forEach(function(w) {
        html += '<span class="vocab-word" style="display:inline-block;padding:4px 8px;margin:3px;background:var(--bg-light);border:1px solid var(--border);border-radius:4px;font-size:11px;cursor:pointer" onclick="lookupWord(this.textContent)">' + escapeHtml(w) + '</span>';
      });
      if (result) { result.innerHTML = html; }
    } else {
      if (result) { result.innerHTML = '<div style="color:var(--fg-dim)">' + (data.error || 'No vocabulary words found. Upload more documents.') + '</div>'; }
    }
  })
  .catch(function(err) {
    if (result) { result.innerHTML = '<div style="color:var(--red)">Error: ' + escapeHtml(err.message) + '</div>'; }
  });
}

function lookupWord(word) {
  var modalHtml = '<div style="font-size:12px;color:var(--fg-dim)">Looking up...</div>';
  showModal('Vocabulary: ' + word, modalHtml);
  fetch('/api/dictionary/lookup?word=' + encodeURIComponent(word.toLowerCase()))
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var def = data.found && data.definition ? data.definition : (DICT[word.toLowerCase()] || null);
      if (def) {
        var html = '<div style="font-size:12px;color:var(--fg);line-height:1.7">' + escapeHtml(def) + '</div>'
          + '<div style="font-size:9px;color:var(--fg-dim);margin-top:8px">Source: Wiktionary (CC BY-SA 3.0)</div>';
        $('modal-body').innerHTML = html;
      } else {
        var html = '<div style="color:var(--amber);font-size:11px">Word not found in dictionary.</div>';
        if (data.suggestions && data.suggestions.length) {
          html += '<div style="margin-top:8px;font-size:10px;color:var(--fg-dim)">Did you mean:</div>'
            + '<div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap">'
            + data.suggestions.slice(0, 12).map(function(s) {
              return '<span class="dict-word" onclick="closeModal();lookupWord(\'' + s.replace(/'/g, "\\'") + '\')">' + escapeHtml(s) + '</span>';
            }).join('')
            + '</div>';
        }
        $('modal-body').innerHTML = html;
      }
    })
    .catch(function() {
      var def = DICT[word.toLowerCase()];
      var html = def
        ? '<div style="font-size:12px;color:var(--fg);line-height:1.7">' + escapeHtml(def) + '</div><div style="font-size:9px;color:var(--fg-dim);margin-top:8px">(offline fallback)</div>'
        : '<div style="color:var(--red);font-size:11px">Word not found.</div>';
      $('modal-body').innerHTML = html;
    });
}

// ====== 7. OUTLINE GENERATOR ======
TOOL_INIT.outline = function() {
  var result = $('outline-result');
  if (result) { result.classList.remove('visible'); result.innerHTML = ''; }
};

function genOutline() {
  var result = $('outline-result');
  if (result) { result.innerHTML = '<div style="color:var(--fg-dim)">Analyzing documents...</div>'; result.classList.add('visible'); }
  fetch('/api/notebook/outline', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text: ''})
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      var html = '';
      if (data.headings && data.headings.length) {
        html += '<div class="tool-section-title" style="margin:0 0 6px">Headings</div>';
        data.headings.forEach(function(h) {
          html += '<div style="padding-left:' + ((h.level - 1) * 16) + 'px;font-size:11px;padding:2px 0;color:var(--cyan)">' + new Array(h.level + 1).join('#') + ' ' + escapeHtml(h.text) + '</div>';
        });
      }
      if (data.key_sentences && data.key_sentences.length) {
        html += '<div class="tool-section-title" style="margin:0 0 6px;margin-top:10px">Key Sentences</div>';
        html += '<ul style="padding-left:20px;font-size:10px;line-height:1.6;color:var(--fg-dim)">';
        data.key_sentences.forEach(function(s) { html += '<li style="margin-bottom:4px">' + escapeHtml(s) + '</li>'; });
        html += '</ul>';
      }
      if (!html) html = '<div style="color:var(--fg-dim)">No headings or key sentences found. Upload documents with clear headings.</div>';
      if (result) { result.innerHTML = html; }
    } else {
      if (result) { result.innerHTML = '<div style="color:var(--fg-dim)">' + (data.error || 'Failed to generate outline.') + '</div>'; }
    }
  })
  .catch(function(err) { if (result) { result.innerHTML = '<div style="color:var(--red)">Error: ' + escapeHtml(err.message) + '</div>'; } });
}

// ====== 8. DOCUMENT DIFF ======
TOOL_INIT.diff = function() {
  var r = $('diff-result');
  if (r) { r.classList.remove('visible'); r.innerHTML = ''; }
  var t1 = $('diff-text1'), t2 = $('diff-text2');
  if (t1) t1.value = ''; if (t2) t2.value = '';
};

function doDiff() {
  var text1 = $('diff-text1') ? $('diff-text1').value : '';
  var text2 = $('diff-text2') ? $('diff-text2').value : '';
  if (!text1 || !text2) { alert('Enter text in both fields.'); return; }
  var result = $('diff-result');
  if (result) { result.innerHTML = '<div style="color:var(--fg-dim)">Comparing...</div>'; result.classList.add('visible'); }
  fetch('/api/notebook/diff', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text1: text1, text2: text2})
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      var html = '';
      if (data.diff) {
        html += '<div class="tool-section-title" style="margin:0 0 6px">Unified Diff</div>'
          + '<pre style="background:var(--bg-light);border:1px solid var(--border);border-radius:4px;padding:8px;font-size:10px;overflow-x:auto;max-height:200px;color:var(--fg-dim)">' + escapeHtml(data.diff) + '</pre>';
      }
      if (data.html_diff) {
        html += '<div class="tool-section-title" style="margin:0 0 6px;margin-top:10px">Side-by-Side View</div>'
          + '<div style="font-size:10px;overflow-x:auto;background:var(--bg-light);border:1px solid var(--border);border-radius:4px;padding:4px">' + data.html_diff + '</div>';
      }
      if (result) { result.innerHTML = html; }
    } else {
      if (result) { result.innerHTML = '<div style="color:var(--red)">' + (data.error || 'Diff failed.') + '</div>'; }
    }
  })
  .catch(function(err) { if (result) { result.innerHTML = '<div style="color:var(--red)">Error: ' + escapeHtml(err.message) + '</div>'; } });
}

// ====== 9. BIBLIOGRAPHY MANAGER ======
TOOL_INIT.bib = function() {
  loadBibList();
};

function loadBibList() {
  var container = $('bib-list');
  if (!container) return;
  container.innerHTML = '<div style="color:var(--fg-dim);font-size:10px">Loading...</div>';
  apiPost('/bibliography/load', {}).then(function(data) {
    _bibRefs = data.references || [];
    if (!_bibRefs.length) {
      container.innerHTML = '<div style="color:var(--fg-dim);font-size:10px">No references saved yet. Click "+ Add Reference" to add one.</div>';
      return;
    }
    var html = '';
    _bibRefs.forEach(function(r, i) {
      html += '<div class="bib-item" style="padding:8px;margin-bottom:4px;background:var(--bg-light);border:1px solid var(--border);border-radius:4px;font-size:10px;line-height:1.5">'
        + '<div style="display:flex;justify-content:space-between;align-items:start">'
        + '<div style="flex:1"><strong>' + escapeHtml(r.title || 'Untitled') + '</strong>' + (r.author ? ' by ' + escapeHtml(r.author) : '') + (r.year ? ' (' + escapeHtml(r.year) + ')' : '') + '</div>'
        + '<div style="display:flex;gap:4px">'
        + '<button class="nb-doc-del" onclick="editBibEntry(' + i + ')" title="Edit" style="font-size:10px;padding:0 4px">✎</button>'
        + '<button class="nb-doc-del" onclick="deleteBibEntry(' + i + ')" title="Delete">×</button>'
        + '</div></div>'
        + '<div style="font-size:9px;color:var(--fg-dim);margin-top:2px">' + (r.type || 'book') + (r.publisher ? ' — ' + escapeHtml(r.publisher) : '') + '</div>'
        + '</div>';
    });
    html += '<button class="nb-gen-btn" onclick="exportBib()" style="margin-top:8px">Export as MLA</button>';
    container.innerHTML = html;
  }).catch(function(err) {
    _bibRefs = [];
    container.innerHTML = '<div style="color:var(--fg-dim);font-size:10px">No references saved yet. Click "+ Add Reference" to add one.</div>';
  });
}

function addBibEntry() { editBibEntry(-1); }

function editBibEntry(idx) {
  var r = idx >= 0 && idx < _bibRefs.length ? _bibRefs[idx] : {type:'book',author:'',title:'',publisher:'',year:''};
  var html = '<div style="font-size:10px;color:var(--fg-dim);margin-bottom:8px">' + (idx >= 0 ? 'Edit' : 'Add') + ' Reference</div>'
    + '<label style="display:block;font-size:10px;margin-bottom:4px">Type: <select id="bib-type" style="font-size:10px;padding:3px">'
    + '<option value="book"' + (r.type==='book'?' selected':'') + '>Book</option>'
    + '<option value="article"' + (r.type==='article'?' selected':'') + '>Article</option>'
    + '<option value="website"' + (r.type==='website'?' selected':'') + '>Website</option>'
    + '</select></label>'
    + '<label style="display:block;font-size:10px;margin-bottom:4px">Author: <input type="text" id="bib-author" class="tools-input" value="' + escapeHtml(r.author||'') + '"></label>'
    + '<label style="display:block;font-size:10px;margin-bottom:4px">Title: <input type="text" id="bib-title" class="tools-input" value="' + escapeHtml(r.title||'') + '"></label>'
    + '<label style="display:block;font-size:10px;margin-bottom:4px">Publisher/Journal: <input type="text" id="bib-publisher" class="tools-input" value="' + escapeHtml(r.publisher||'') + '"></label>'
    + '<label style="display:block;font-size:10px;margin-bottom:4px">Year: <input type="text" id="bib-year" class="tools-input" style="width:80px" value="' + escapeHtml(r.year||'') + '"></label>'
    + '<button class="nb-gen-btn" onclick="saveBibEntry(' + idx + ')" style="margin-top:6px">Save</button>';
  showModal((idx >= 0 ? 'Edit' : 'Add') + ' Reference', html);
}

function saveBibEntry(idx) {
  try {
    var eType = document.getElementById('bib-type');
    var eAuthor = document.getElementById('bib-author');
    var eTitle = document.getElementById('bib-title');
    var ePublisher = document.getElementById('bib-publisher');
    var eYear = document.getElementById('bib-year');
    if (!eType || !eAuthor || !eTitle || !ePublisher || !eYear) {
      alert('Form elements not found. Make sure the modal is open.');
      return;
    }
    var entry = {
      type: eType.value || 'book',
      author: eAuthor.value.trim() || '',
      title: eTitle.value.trim() || '',
      publisher: ePublisher.value.trim() || '',
      year: eYear.value.trim() || ''
    };
    if (!entry.title) { alert('Title is required.'); return; }
    if (idx >= 0 && idx < _bibRefs.length) { _bibRefs[idx] = entry; }
    else { _bibRefs.push(entry); }
    apiPost('/bibliography/save', {references: _bibRefs}).then(function() {
      loadBibList();
      closeModal();
    }).catch(function(err) {
      alert('Error saving reference: ' + (err.message || err));
    });
  } catch(e) {
    alert('Error saving reference: ' + e.message);
  }
}

function deleteBibEntry(idx) {
  if (!confirm('Delete this reference?')) return;
  _bibRefs.splice(idx, 1);
  apiPost('/bibliography/save', {references: _bibRefs}).then(function() {
    loadBibList();
  });
}

function exportBib() {
  if (!_bibRefs.length) { alert('No references to export.'); return; }
  var lines = _bibRefs.map(function(r) {
    var a = r.author || '', t = r.title || '', p = r.publisher || '', y = r.year || '';
    return (a ? a + '. ' : '') + '<i>' + t + '</i>. ' + p + (y ? ', ' + y : '') + '.';
  });
  var html = '<pre style="background:var(--bg-light);border:1px solid var(--border);border-radius:4px;padding:8px;font-size:10px;line-height:1.8;overflow-x:auto">'
    + lines.join('\n') + '</pre>'
    + '<button class="nb-gen-btn" onclick="copyBib()" style="margin-top:6px">Copy to Clipboard</button>';
  showModal('Bibliography (MLA)', html);
}

function copyBib() {
  var el = document.querySelector('#modal-body pre');
  if (el) {
    var text = el.textContent || el.innerText || '';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        alert('Bibliography copied to clipboard!');
      }).catch(function() {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }
}

function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); alert('Bibliography copied to clipboard!'); }
  catch(e) { alert('Press Ctrl+C to copy from the pre block.'); }
  document.body.removeChild(ta);
}

// ====== 10. PERIODIC TABLE ======
var ELEMENTS = [
  {s:'H',n:'Hydrogen',z:1,m:1.008,c:'nonmetal',g:'1',p:'1s¹'},
  {s:'He',n:'Helium',z:2,m:4.003,c:'noble',g:'18',p:'1s²'},
  {s:'Li',n:'Lithium',z:3,m:6.941,c:'alkali',g:'1',p:'[He] 2s¹'},
  {s:'Be',n:'Beryllium',z:4,m:9.012,c:'alkaline',g:'2',p:'[He] 2s²'},
  {s:'B',n:'Boron',z:5,m:10.81,c:'metalloid',g:'13',p:'[He] 2s² 2p¹'},
  {s:'C',n:'Carbon',z:6,m:12.011,c:'nonmetal',g:'14',p:'[He] 2s² 2p²'},
  {s:'N',n:'Nitrogen',z:7,m:14.007,c:'nonmetal',g:'15',p:'[He] 2s² 2p³'},
  {s:'O',n:'Oxygen',z:8,m:15.999,c:'nonmetal',g:'16',p:'[He] 2s² 2p⁴'},
  {s:'F',n:'Fluorine',z:9,m:18.998,c:'nonmetal',g:'17',p:'[He] 2s² 2p⁵'},
  {s:'Ne',n:'Neon',z:10,m:20.180,c:'noble',g:'18',p:'[He] 2s² 2p⁶'},
  {s:'Na',n:'Sodium',z:11,m:22.990,c:'alkali',g:'1',p:'[Ne] 3s¹'},
  {s:'Mg',n:'Magnesium',z:12,m:24.305,c:'alkaline',g:'2',p:'[Ne] 3s²'},
  {s:'Al',n:'Aluminium',z:13,m:26.982,c:'metal',g:'13',p:'[Ne] 3s² 3p¹'},
  {s:'Si',n:'Silicon',z:14,m:28.086,c:'metalloid',g:'14',p:'[Ne] 3s² 3p²'},
  {s:'P',n:'Phosphorus',z:15,m:30.974,c:'nonmetal',g:'15',p:'[Ne] 3s² 3p³'},
  {s:'S',n:'Sulfur',z:16,m:32.065,c:'nonmetal',g:'16',p:'[Ne] 3s² 3p⁴'},
  {s:'Cl',n:'Chlorine',z:17,m:35.453,c:'nonmetal',g:'17',p:'[Ne] 3s² 3p⁵'},
  {s:'Ar',n:'Argon',z:18,m:39.948,c:'noble',g:'18',p:'[Ne] 3s² 3p⁶'},
  {s:'K',n:'Potassium',z:19,m:39.098,c:'alkali',g:'1',p:'[Ar] 4s¹'},
  {s:'Ca',n:'Calcium',z:20,m:40.078,c:'alkaline',g:'2',p:'[Ar] 4s²'},
  {s:'Sc',n:'Scandium',z:21,m:44.956,c:'transition',g:'3',p:'[Ar] 3d¹ 4s²'},
  {s:'Ti',n:'Titanium',z:22,m:47.867,c:'transition',g:'4',p:'[Ar] 3d² 4s²'},
  {s:'V',n:'Vanadium',z:23,m:50.942,c:'transition',g:'5',p:'[Ar] 3d³ 4s²'},
  {s:'Cr',n:'Chromium',z:24,m:51.996,c:'transition',g:'6',p:'[Ar] 3d⁵ 4s¹'},
  {s:'Mn',n:'Manganese',z:25,m:54.938,c:'transition',g:'7',p:'[Ar] 3d⁵ 4s²'},
  {s:'Fe',n:'Iron',z:26,m:55.845,c:'transition',g:'8',p:'[Ar] 3d⁶ 4s²'},
  {s:'Co',n:'Cobalt',z:27,m:58.933,c:'transition',g:'9',p:'[Ar] 3d⁷ 4s²'},
  {s:'Ni',n:'Nickel',z:28,m:58.693,c:'transition',g:'10',p:'[Ar] 3d⁸ 4s²'},
  {s:'Cu',n:'Copper',z:29,m:63.546,c:'transition',g:'11',p:'[Ar] 3d¹⁰ 4s¹'},
  {s:'Zn',n:'Zinc',z:30,m:65.380,c:'transition',g:'12',p:'[Ar] 3d¹⁰ 4s²'},
  {s:'Ga',n:'Gallium',z:31,m:69.723,c:'metal',g:'13',p:'[Ar] 3d¹⁰ 4s² 4p¹'},
  {s:'Ge',n:'Germanium',z:32,m:72.630,c:'metalloid',g:'14',p:'[Ar] 3d¹⁰ 4s² 4p²'},
  {s:'As',n:'Arsenic',z:33,m:74.922,c:'metalloid',g:'15',p:'[Ar] 3d¹⁰ 4s² 4p³'},
  {s:'Se',n:'Selenium',z:34,m:78.971,c:'nonmetal',g:'16',p:'[Ar] 3d¹⁰ 4s² 4p⁴'},
  {s:'Br',n:'Bromine',z:35,m:79.904,c:'nonmetal',g:'17',p:'[Ar] 3d¹⁰ 4s² 4p⁵'},
  {s:'Kr',n:'Krypton',z:36,m:83.798,c:'noble',g:'18',p:'[Ar] 3d¹⁰ 4s² 4p⁶'},
  {s:'Rb',n:'Rubidium',z:37,m:85.468,c:'alkali',g:'1',p:'[Kr] 5s¹'},
  {s:'Sr',n:'Strontium',z:38,m:87.620,c:'alkaline',g:'2',p:'[Kr] 5s²'},
  {s:'Y',n:'Yttrium',z:39,m:88.906,c:'transition',g:'3',p:'[Kr] 4d¹ 5s²'},
  {s:'Zr',n:'Zirconium',z:40,m:91.224,c:'transition',g:'4',p:'[Kr] 4d² 5s²'},
  {s:'Nb',n:'Niobium',z:41,m:92.906,c:'transition',g:'5',p:'[Kr] 4d⁴ 5s¹'},
  {s:'Mo',n:'Molybdenum',z:42,m:95.950,c:'transition',g:'6',p:'[Kr] 4d⁵ 5s¹'},
  {s:'Tc',n:'Technetium',z:43,m:98.000,c:'transition',g:'7',p:'[Kr] 4d⁵ 5s²'},
  {s:'Ru',n:'Ruthenium',z:44,m:101.070,c:'transition',g:'8',p:'[Kr] 4d⁷ 5s¹'},
  {s:'Rh',n:'Rhodium',z:45,m:102.906,c:'transition',g:'9',p:'[Kr] 4d⁸ 5s¹'},
  {s:'Pd',n:'Palladium',z:46,m:106.420,c:'transition',g:'10',p:'[Kr] 4d¹⁰'},
  {s:'Ag',n:'Silver',z:47,m:107.868,c:'transition',g:'11',p:'[Kr] 4d¹⁰ 5s¹'},
  {s:'Cd',n:'Cadmium',z:48,m:112.414,c:'transition',g:'12',p:'[Kr] 4d¹⁰ 5s²'},
  {s:'In',n:'Indium',z:49,m:114.818,c:'metal',g:'13',p:'[Kr] 4d¹⁰ 5s² 5p¹'},
  {s:'Sn',n:'Tin',z:50,m:118.710,c:'metal',g:'14',p:'[Kr] 4d¹⁰ 5s² 5p²'},
  {s:'Sb',n:'Antimony',z:51,m:121.760,c:'metalloid',g:'15',p:'[Kr] 4d¹⁰ 5s² 5p³'},
  {s:'Te',n:'Tellurium',z:52,m:127.600,c:'metalloid',g:'16',p:'[Kr] 4d¹⁰ 5s² 5p⁴'},
  {s:'I',n:'Iodine',z:53,m:126.904,c:'nonmetal',g:'17',p:'[Kr] 4d¹⁰ 5s² 5p⁵'},
  {s:'Xe',n:'Xenon',z:54,m:131.294,c:'noble',g:'18',p:'[Kr] 4d¹⁰ 5s² 5p⁶'},
  {s:'Cs',n:'Caesium',z:55,m:132.905,c:'alkali',g:'1',p:'[Xe] 6s¹'},
  {s:'Ba',n:'Barium',z:56,m:137.328,c:'alkaline',g:'2',p:'[Xe] 6s²'},
  {s:'La',n:'Lanthanum',z:57,m:138.905,c:'lanthanide',g:'3',p:'[Xe] 5d¹ 6s²'},
  {s:'Ce',n:'Cerium',z:58,m:140.116,c:'lanthanide',g:'',p:'[Xe] 4f¹ 5d¹ 6s²'},
  {s:'Pr',n:'Praseodymium',z:59,m:140.908,c:'lanthanide',g:'',p:'[Xe] 4f³ 6s²'},
  {s:'Nd',n:'Neodymium',z:60,m:144.243,c:'lanthanide',g:'',p:'[Xe] 4f⁴ 6s²'},
  {s:'Pm',n:'Promethium',z:61,m:145.000,c:'lanthanide',g:'',p:'[Xe] 4f⁵ 6s²'},
  {s:'Sm',n:'Samarium',z:62,m:150.362,c:'lanthanide',g:'',p:'[Xe] 4f⁶ 6s²'},
  {s:'Eu',n:'Europium',z:63,m:151.964,c:'lanthanide',g:'',p:'[Xe] 4f⁷ 6s²'},
  {s:'Gd',n:'Gadolinium',z:64,m:157.250,c:'lanthanide',g:'',p:'[Xe] 4f⁷ 5d¹ 6s²'},
  {s:'Tb',n:'Terbium',z:65,m:158.925,c:'lanthanide',g:'',p:'[Xe] 4f⁹ 6s²'},
  {s:'Dy',n:'Dysprosium',z:66,m:162.500,c:'lanthanide',g:'',p:'[Xe] 4f¹⁰ 6s²'},
  {s:'Ho',n:'Holmium',z:67,m:164.930,c:'lanthanide',g:'',p:'[Xe] 4f¹¹ 6s²'},
  {s:'Er',n:'Erbium',z:68,m:167.259,c:'lanthanide',g:'',p:'[Xe] 4f¹² 6s²'},
  {s:'Tm',n:'Thulium',z:69,m:168.934,c:'lanthanide',g:'',p:'[Xe] 4f¹³ 6s²'},
  {s:'Yb',n:'Ytterbium',z:70,m:173.045,c:'lanthanide',g:'',p:'[Xe] 4f¹⁴ 6s²'},
  {s:'Lu',n:'Lutetium',z:71,m:174.967,c:'lanthanide',g:'3',p:'[Xe] 4f¹⁴ 5d¹ 6s²'},
  {s:'Hf',n:'Hafnium',z:72,m:178.490,c:'transition',g:'4',p:'[Xe] 4f¹⁴ 5d² 6s²'},
  {s:'Ta',n:'Tantalum',z:73,m:180.948,c:'transition',g:'5',p:'[Xe] 4f¹⁴ 5d³ 6s²'},
  {s:'W',n:'Tungsten',z:74,m:183.840,c:'transition',g:'6',p:'[Xe] 4f¹⁴ 5d⁴ 6s²'},
  {s:'Re',n:'Rhenium',z:75,m:186.207,c:'transition',g:'7',p:'[Xe] 4f¹⁴ 5d⁵ 6s²'},
  {s:'Os',n:'Osmium',z:76,m:190.230,c:'transition',g:'8',p:'[Xe] 4f¹⁴ 5d⁶ 6s²'},
  {s:'Ir',n:'Iridium',z:77,m:192.217,c:'transition',g:'9',p:'[Xe] 4f¹⁴ 5d⁷ 6s²'},
  {s:'Pt',n:'Platinum',z:78,m:195.085,c:'transition',g:'10',p:'[Xe] 4f¹⁴ 5d⁹ 6s¹'},
  {s:'Au',n:'Gold',z:79,m:196.967,c:'transition',g:'11',p:'[Xe] 4f¹⁴ 5d¹⁰ 6s¹'},
  {s:'Hg',n:'Mercury',z:80,m:200.592,c:'transition',g:'12',p:'[Xe] 4f¹⁴ 5d¹⁰ 6s²'},
  {s:'Tl',n:'Thallium',z:81,m:204.380,c:'metal',g:'13',p:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹'},
  {s:'Pb',n:'Lead',z:82,m:207.200,c:'metal',g:'14',p:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²'},
  {s:'Bi',n:'Bismuth',z:83,m:208.980,c:'metal',g:'15',p:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³'},
  {s:'Po',n:'Polonium',z:84,m:209.000,c:'metalloid',g:'16',p:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴'},
  {s:'At',n:'Astatine',z:85,m:210.000,c:'nonmetal',g:'17',p:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵'},
  {s:'Rn',n:'Radon',z:86,m:222.000,c:'noble',g:'18',p:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶'},
  {s:'Fr',n:'Francium',z:87,m:223.000,c:'alkali',g:'1',p:'[Rn] 7s¹'},
  {s:'Ra',n:'Radium',z:88,m:226.000,c:'alkaline',g:'2',p:'[Rn] 7s²'},
  {s:'Ac',n:'Actinium',z:89,m:227.000,c:'actinide',g:'3',p:'[Rn] 6d¹ 7s²'},
  {s:'Th',n:'Thorium',z:90,m:232.038,c:'actinide',g:'',p:'[Rn] 6d² 7s²'},
  {s:'Pa',n:'Protactinium',z:91,m:231.036,c:'actinide',g:'',p:'[Rn] 5f² 6d¹ 7s²'},
  {s:'U',n:'Uranium',z:92,m:238.029,c:'actinide',g:'',p:'[Rn] 5f³ 6d¹ 7s²'},
  {s:'Np',n:'Neptunium',z:93,m:237.000,c:'actinide',g:'',p:'[Rn] 5f⁴ 6d¹ 7s²'},
  {s:'Pu',n:'Plutonium',z:94,m:244.000,c:'actinide',g:'',p:'[Rn] 5f⁶ 7s²'},
  {s:'Am',n:'Americium',z:95,m:243.000,c:'actinide',g:'',p:'[Rn] 5f⁷ 7s²'},
  {s:'Cm',n:'Curium',z:96,m:247.000,c:'actinide',g:'',p:'[Rn] 5f⁷ 6d¹ 7s²'},
  {s:'Bk',n:'Berkelium',z:97,m:247.000,c:'actinide',g:'',p:'[Rn] 5f⁹ 7s²'},
  {s:'Cf',n:'Californium',z:98,m:251.000,c:'actinide',g:'',p:'[Rn] 5f¹⁰ 7s²'},
  {s:'Es',n:'Einsteinium',z:99,m:252.000,c:'actinide',g:'',p:'[Rn] 5f¹¹ 7s²'},
  {s:'Fm',n:'Fermium',z:100,m:257.000,c:'actinide',g:'',p:'[Rn] 5f¹² 7s²'},
  {s:'Md',n:'Mendelevium',z:101,m:258.000,c:'actinide',g:'',p:'[Rn] 5f¹³ 7s²'},
  {s:'No',n:'Nobelium',z:102,m:259.000,c:'actinide',g:'',p:'[Rn] 5f¹⁴ 7s²'},
  {s:'Lr',n:'Lawrencium',z:103,m:262.000,c:'actinide',g:'3',p:'[Rn] 5f¹⁴ 7s² 7p¹'},
  {s:'Rf',n:'Rutherfordium',z:104,m:267.000,c:'transition',g:'4',p:'[Rn] 5f¹⁴ 6d² 7s²'},
  {s:'Db',n:'Dubnium',z:105,m:268.000,c:'transition',g:'5',p:'[Rn] 5f¹⁴ 6d³ 7s²'},
  {s:'Sg',n:'Seaborgium',z:106,m:269.000,c:'transition',g:'6',p:'[Rn] 5f¹⁴ 6d⁴ 7s²'},
  {s:'Bh',n:'Bohrium',z:107,m:270.000,c:'transition',g:'7',p:'[Rn] 5f¹⁴ 6d⁵ 7s²'},
  {s:'Hs',n:'Hassium',z:108,m:269.000,c:'transition',g:'8',p:'[Rn] 5f¹⁴ 6d⁶ 7s²'},
  {s:'Mt',n:'Meitnerium',z:109,m:278.000,c:'transition',g:'9',p:'[Rn] 5f¹⁴ 6d⁷ 7s²'},
  {s:'Ds',n:'Darmstadtium',z:110,m:281.000,c:'transition',g:'10',p:'[Rn] 5f¹⁴ 6d⁸ 7s²'},
  {s:'Rg',n:'Roentgenium',z:111,m:282.000,c:'transition',g:'11',p:'[Rn] 5f¹⁴ 6d⁹ 7s²'},
  {s:'Cn',n:'Copernicium',z:112,m:285.000,c:'transition',g:'12',p:'[Rn] 5f¹⁴ 6d¹⁰ 7s²'},
  {s:'Nh',n:'Nihonium',z:113,m:286.000,c:'metal',g:'13',p:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹'},
  {s:'Fl',n:'Flerovium',z:114,m:289.000,c:'metal',g:'14',p:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²'},
  {s:'Mc',n:'Moscovium',z:115,m:290.000,c:'metal',g:'15',p:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³'},
  {s:'Lv',n:'Livermorium',z:116,m:293.000,c:'metal',g:'16',p:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴'},
  {s:'Ts',n:'Tennessine',z:117,m:294.000,c:'nonmetal',g:'17',p:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵'},
  {s:'Og',n:'Oganesson',z:118,m:294.000,c:'noble',g:'18',p:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶'}
];

var CAT_COLORS = {
  'nonmetal':'#2d7a27','noble':'#1a4a7a','alkali':'#7a2d2d','alkaline':'#5a4a1a',
  'metalloid':'#2d6a4a','metal':'#2d2d7a','transition':'#4a2d6a','lanthanide':'#2d5a5a','actinide':'#5a2d5a'
};

var PT_QUIZ_MODE = false;
var PT_QUIZ_SCORE = 0;
var PT_QUIZ_TOTAL = 0;

// Fun facts for common/interesting elements
var ELEMENT_FACTS = {
  'H':'The lightest element. Makes up 75% of the universe\'s mass. Powers the Sun through nuclear fusion.',
  'He':'Named after the Sun (Helios). Used in balloons and as a cooling gas for MRI machines. Makes your voice squeaky!',
  'Li':'Used in rechargeable batteries for phones and laptops. The lightest metal, can float on water.',
  'Be':'One of the lightest metals. Used in X-ray windows and spacecraft. Very strong for its weight.',
  'B':'Essential for plant growth. Used in borax for cleaning and as a neutron absorber in nuclear reactors.',
  'C':'The basis of all known life! Found in every living thing. Diamonds are just carbon arranged differently than graphite.',
  'N':'Makes up 78% of the air we breathe. Essential for plant fertilizer and DNA.',
  'O':'We breathe it! Makes up 21% of air and 65% of the human body. Essential for fire and respiration.',
  'F':'The most reactive element. Used in toothpaste to prevent cavities and in Teflon non-stick coatings.',
  'Ne':'Used in bright neon signs. Produces a reddish-orange glow when electrified.',
  'Na':'Table salt is made of sodium and chlorine. Reacts explosively with water!',
  'Mg':'Burns with a brilliant white light. Used in fireworks, flares, and for making lightweight alloys.',
  'Al':'The most abundant metal in Earth\'s crust. Used in cans, foil, airplanes, and bicycles.',
  'Si':'The second most abundant element in Earth\'s crust. Used in computer chips, solar panels, and glass.',
  'P':'Essential for DNA and bones. The white form glows in the dark and can spontaneously ignite in air.',
  'S':'Yellow and smelly (rotten eggs!). Used in matches, gunpowder, and vulcanizing rubber.',
  'Cl':'Used to disinfect drinking water and swimming pools. A greenish-yellow gas with a strong smell.',
  'Ar':'The third most abundant gas in the atmosphere. Used in light bulbs to protect the filament.',
  'K':'Essential for your nerves and muscles. Bananas are rich in potassium! Reacts explosively with water.',
  'Ca':'Essential for strong bones and teeth. Found in milk, cheese, and in seashells and coral.',
  'Ti':'Strong and lightweight, used in airplanes, bicycles, and medical implants like hip replacements.',
  'Cr':'Used to make stainless steel. Gives rubies their red color and emeralds their green color.',
  'Mn':'Essential for life. Used in steel production to make it stronger. Gives amethysts their purple color.',
  'Fe':'The most common element on Earth by mass (makes up most of the core!). Essential for blood (hemoglobin).',
  'Co':'Used to make blue pigments (cobalt blue) for glass and ceramics. Essential for vitamin B12.',
  'Ni':'Used in coins, batteries, and stainless steel. Named after a German word for "false copper."',
  'Cu':'Used for electrical wiring because it conducts electricity so well. Statue of Liberty is made of copper!',
  'Zn':'Essential for your immune system. Used to galvanize steel to prevent rust and in batteries.',
  'Br':'One of only two liquid elements (the other is mercury). A reddish-brown liquid that produces toxic fumes.',
  'Kr':'Named after the Greek word for "hidden." Used in some flashbulbs and lasers.',
  'Ag':'The best conductor of electricity. Used in jewelry, coins, photography, and antibacterial bandages.',
  'Sn':'Used to coat other metals to prevent corrosion. "Tin cans" are actually steel coated with tin.',
  'I':'Essential for thyroid function. Used as an antiseptic (iodine solution).',
  'Xe':'Used in powerful flash lamps for photography and in some car headlights.',
  'Au':'Gold! Does not tarnish or rust. All the gold ever mined would fit in about 3 Olympic swimming pools.',
  'Hg':'The only liquid metal at room temperature. Used in thermometers. Also called quicksilver.',
  'Pb':'Used in car batteries and radiation shielding. Was once used in paint and pipes (lead poisoning risk).',
  'U':'Used as fuel for nuclear power plants and in nuclear weapons. Naturally radioactive.',
  'Pu':'Man-made element used in nuclear weapons and as power source for spacecraft (like Mars rovers).',
  'W':'Has the highest melting point of any metal. Used in light bulb filaments.',
  'Pt':'More valuable than gold. Used in catalytic converters, jewelry, and as a catalyst in chemistry.'
};

var ELEMENT_DISCOVERY = {
  'H':1766,'He':1868,'Li':1817,'Be':1798,'B':1808,'C':'Ancient','N':1772,'O':1774,'F':1886,
  'Ne':1898,'Na':1807,'Mg':1808,'Al':1825,'Si':1824,'P':1669,'S':'Ancient','Cl':1774,'Ar':1894,
  'K':1807,'Ca':1808,'Sc':1879,'Ti':1791,'V':1801,'Cr':1797,'Mn':1774,'Fe':'Ancient','Co':1735,
  'Ni':1751,'Cu':'Ancient','Zn':1746,'Ga':1875,'Ge':1886,'As':'Ancient','Se':1817,'Br':1826,
  'Kr':1898,'Rb':1861,'Sr':1808,'Y':1794,'Zr':1789,'Nb':1801,'Mo':1781,'Tc':1937,'Ru':1844,
  'Rh':1803,'Pd':1803,'Ag':'Ancient','Cd':1817,'In':1863,'Sn':'Ancient','Sb':'Ancient',
  'Te':1782,'I':1811,'Xe':1898,'Cs':1860,'Ba':1808,'La':1839,'Ce':1803,'Pr':1885,'Nd':1885,
  'Pm':1945,'Sm':1879,'Eu':1901,'Gd':1880,'Tb':1843,'Dy':1886,'Ho':1878,'Er':1843,'Tm':1879,
  'Yb':1878,'Lu':1907,'Hf':1923,'Ta':1802,'W':1781,'Re':1925,'Os':1803,'Ir':1803,'Pt':'Ancient',
  'Au':'Ancient','Hg':'Ancient','Tl':1861,'Pb':'Ancient','Bi':'Ancient','Po':1898,'At':1940,
  'Rn':1900,'Fr':1939,'Ra':1898,'Ac':1899,'Th':1829,'Pa':1913,'U':1789,'Np':1940,'Pu':1940,
  'Am':1944,'Cm':1944,'Bk':1949,'Cf':1950,'Es':1952,'Fm':1952,'Md':1955,'No':1958,'Lr':1961,
  'Rf':1964,'Db':1967,'Sg':1974,'Bh':1981,'Hs':1984,'Mt':1982,'Ds':1994,'Rg':1994,'Cn':1996,
  'Nh':2003,'Fl':1999,'Mc':2003,'Lv':2000,'Ts':2010,'Og':2002
};

TOOL_INIT.periodic = function() {
  PT_QUIZ_MODE = false;
  PT_QUIZ_SCORE = 0;
  PT_QUIZ_TOTAL = 0;
  renderPeriodicTable();
  renderPeriodicLegend();
  renderPeriodicQuizBar();
};

function renderPeriodicTable() {
  var grid = $('pt-grid');
  if (!grid) return;
  var pos = {};
  var rowElements = [[1,2],[3,4,5,6,7,8,9,10],[11,12,13,14,15,16,17,18],[19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],[37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54],[55,56,57,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86],[87,88,89,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118]];
  var lanthanides = [58,59,60,61,62,63,64,65,66,67,68,69,70,71];
  var actinides = [90,91,92,93,94,95,96,97,98,99,100,101,102,103];
  var elMap = {};
  ELEMENTS.forEach(function(el) { elMap[el.z] = el; });
  
  ELEMENTS.forEach(function(el) {
    if (lanthanides.indexOf(el.z) !== -1 || actinides.indexOf(el.z) !== -1) return;
    for (var pr = 0; pr < rowElements.length; pr++) {
      var idx = rowElements[pr].indexOf(el.z);
      if (idx !== -1) { pos[el.z] = {row: pr + 1, col: idx + 1}; break; }
    }
  });

  var html = '';
  for (var r = 1; r <= 9; r++) {
    for (var c = 1; c <= 18; c++) {
      var found = null;
      for (var z in pos) { if (pos[z].row === r && pos[z].col === c) { found = parseInt(z); break; } }
      if (found && elMap[found]) {
        var el = elMap[found];
        var bg = CAT_COLORS[el.c] || '#2a2a2a';
        html += '<div class="pt-element" data-z="' + el.z + '" data-cat="' + el.c + '" style="background:' + bg + ';border:1px solid var(--border);border-radius:3px;padding:2px;text-align:center;cursor:pointer" onclick="showElementDetail(' + el.z + ')">'
          + '<div class="pt-symbol">' + el.s + '</div>'
          + '<div class="pt-number">' + el.z + '</div>'
          + '</div>';
      } else {
        html += '<div style="border:1px solid transparent"></div>';
      }
    }
  }
  
  // Lanthanides row
  html += '<div style="grid-column:1/-1;height:6px"></div>';
  html += '<div style="grid-column:1/4;font-size:8px;color:var(--fg-dim);display:flex;align-items:center">Lanthanides</div>';
  lanthanides.forEach(function(z) {
    var el = elMap[z];
    if (!el) return;
    var bg = CAT_COLORS[el.c] || '#2a4a4a';
    html += '<div class="pt-element" data-z="' + el.z + '" data-cat="' + el.c + '" style="background:' + bg + ';border:1px solid var(--border);border-radius:3px;padding:2px;text-align:center;cursor:pointer" onclick="showElementDetail(' + el.z + ')">'
      + '<div class="pt-symbol">' + el.s + '</div>'
      + '<div class="pt-number">' + el.z + '</div></div>';
  });
  for (var i = lanthanides.length + 4; i <= 18; i++) { html += '<div style="border:1px solid transparent"></div>'; }
  
  // Actinides row
  html += '<div style="grid-column:1/4;font-size:8px;color:var(--fg-dim);display:flex;align-items:center">Actinides</div>';
  actinides.forEach(function(z) {
    var el = elMap[z];
    if (!el) return;
    var bg = CAT_COLORS[el.c] || '#4a2d4a';
    html += '<div class="pt-element" data-z="' + el.z + '" data-cat="' + el.c + '" style="background:' + bg + ';border:1px solid var(--border);border-radius:3px;padding:2px;text-align:center;cursor:pointer" onclick="showElementDetail(' + el.z + ')">'
      + '<div class="pt-symbol">' + el.s + '</div>'
      + '<div class="pt-number">' + el.z + '</div></div>';
  });
  for (var i = actinides.length + 4; i <= 18; i++) { html += '<div style="border:1px solid transparent"></div>'; }
  
  grid.innerHTML = html;
}

function renderPeriodicLegend() {
  var legend = $('pt-legend');
  if (!legend) return;
  var html = '';
  for (var cat in CAT_COLORS) {
    html += '<span class="pt-cat-btn" data-cat="' + cat + '" onclick="filterByCategory(\'' + cat + '\')" style="background:' + CAT_COLORS[cat] + ';padding:2px 6px;border-radius:3px;cursor:pointer">' + cat + '</span>';
  }
  html += '<span class="pt-cat-btn active" data-cat="all" onclick="filterByCategory(\'all\')" style="padding:2px 6px;border-radius:3px;cursor:pointer">All</span>';
  legend.innerHTML = html;
}

function filterPeriodic() {
  if (PT_QUIZ_MODE) return;
  var query = $('pt-search') ? $('pt-search').value.toLowerCase().trim() : '';
  var elements = document.querySelectorAll('.pt-element');
  if (!query) {
    elements.forEach(function(el) { el.classList.remove('highlight','fade'); });
    document.querySelectorAll('.pt-cat-btn').forEach(function(b) {
      if (b.dataset.cat === 'all') { b.classList.add('active'); } else { b.classList.remove('active'); }
    });
    return;
  }
  var found = false;
  elements.forEach(function(el) {
    var z = parseInt(el.dataset.z);
    var data = ELEMENTS.find(function(e) { return e.z === z; });
    if (!data) return;
    var match = data.s.toLowerCase().indexOf(query) !== -1
      || data.n.toLowerCase().indexOf(query) !== -1
      || data.z.toString() === query;
    if (match) {
      el.classList.add('highlight'); el.classList.remove('fade');
      found = true;
    } else {
      el.classList.remove('highlight'); el.classList.add('fade');
    }
  });
  // Reset category buttons
  document.querySelectorAll('.pt-cat-btn').forEach(function(b) { b.classList.remove('active'); });
  if (!found && query) {
    // Show a quick message in the detail panel
    var detail = $('pt-detail');
    if (detail) { detail.innerHTML = '<div style="color:var(--fg-dim)">No element found matching "' + escapeHtml(query) + '"</div>'; detail.classList.add('visible'); }
  } else {
    var detail = $('pt-detail');
    if (detail && !detail.dataset.active) { detail.classList.remove('visible'); detail.innerHTML = ''; }
  }
}

function filterByCategory(cat) {
  document.querySelectorAll('.pt-cat-btn').forEach(function(b) { b.classList.remove('active'); });
  var btn = document.querySelector('.pt-cat-btn[data-cat="' + cat + '"]');
  if (btn) btn.classList.add('active');
  
  var elements = document.querySelectorAll('.pt-element');
  if (cat === 'all') {
    elements.forEach(function(el) { el.classList.remove('highlight','fade'); });
    var search = $('pt-search');
    if (search) search.value = '';
  } else {
    elements.forEach(function(el) {
      if (el.dataset.cat === cat) { el.classList.add('highlight'); el.classList.remove('fade'); }
      else { el.classList.remove('highlight'); el.classList.add('fade'); }
    });
  }
}

function copyResult(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var text = el.textContent || el.innerText;
  if (!text) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(function() { fallbackCopy(text); });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch(e) {}
  document.body.removeChild(ta);
}

function levenshtein(a, b) {
  var m = a.length, n = b.length;
  var dp = [];
  for (var i = 0; i <= m; i++) { dp[i] = [i]; }
  for (var j = 0; j <= n; j++) { dp[0][j] = j; }
  for (var i = 1; i <= m; i++) {
    for (var j = 1; j <= n; j++) {
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1;
    }
  }
  return dp[m][n];
}

function ttSpell() {
  var input = document.getElementById('tt-spell-input');
  var out = document.getElementById('tt-spell-output');
  if (!input || !out) return;
  var text = input.value;
  if (!text.trim()) { out.innerHTML = '<div style="color:var(--fg-dim)">Enter some text first.</div>'; return; }
  var words = text.toLowerCase().replace(/[^a-z\s'-]/g, '').split(/\s+/).filter(function(w) { return w.length > 0 && w.length < 40; });
  var unique = []; var seen = {};
  words.forEach(function(w) {
    if (!seen[w]) { seen[w] = true; unique.push(w); }
  });
  var keys = Object.keys(DICT);
  var misspelled = [];
  unique.forEach(function(w) {
    if (w.length <= 2) return;
    if (DICT[w]) return;
    var suggestions = keys
      .map(function(k) { return { word: k, dist: levenshtein(w, k) }; })
      .filter(function(s) { return s.dist <= 2 && s.dist > 0; })
      .sort(function(a, b) { return a.dist - b.dist; })
      .slice(0, 5)
      .map(function(s) { return s.word; });
    misspelled.push({ word: w, suggestions: suggestions });
  });
  var total = words.length;
  var correct = words.filter(function(w) { return DICT[w] || w.length <= 2; }).length;
  if (misspelled.length === 0) {
    out.innerHTML = '<div style="color:var(--green);font-size:12px"><strong>&#10003; No spelling issues found!</strong> (' + total + ' words checked)</div>';
    return;
  }
  var html = '<div style="font-size:11px;margin-bottom:6px"><strong>' + misspelled.length + '</strong> possible issues found (out of ' + total + ' words)</div>';
  html += '<div style="font-size:10px;color:var(--fg-dim);margin-bottom:6px">Click a suggestion to apply the fix</div>';
  misspelled.forEach(function(m) {
    html += '<div style="margin-bottom:6px;padding:4px 6px;background:var(--bg);border-left:2px solid var(--red);border-radius:2px">';
    html += '<span style="color:var(--red);font-weight:bold">' + escapeHtml(m.word) + '</span>';
    if (m.suggestions.length) {
      html += ' &rarr; ';
      m.suggestions.forEach(function(s) {
        var escapedWord = m.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var escapedS = s.replace(/'/g, "\\'");
        html += '<span style="color:var(--green);cursor:pointer;margin-right:4px" onclick="var inp=document.getElementById(\'tt-spell-input\');inp.value=inp.value.replace(new RegExp(\'\\\\b' + escapedWord + '\\\\b\',\'gi\'),\'' + escapedS + '\');ttSpell()">' + escapeHtml(s) + '</span>';
      });
    } else {
      html += ' <span style="color:var(--fg-dim)">(no suggestions)</span>';
    }
    html += '</div>';
  });
  out.innerHTML = html;
}

function ttReplace() {
  var input = document.getElementById('tt-replace-input');
  var out = document.getElementById('tt-replace-output');
  var findEl = document.getElementById('tt-replace-find');
  var withEl = document.getElementById('tt-replace-with');
  var regexCb = document.getElementById('tt-replace-regex');
  var ciCb = document.getElementById('tt-replace-ci');
  if (!input || !out || !findEl) return;
  var text = input.value;
  var find = findEl.value;
  var replace = withEl ? withEl.value : '';
  if (!text) { out.innerHTML = '<div style="color:var(--fg-dim)">Enter some text first.</div>'; return; }
  if (!find) { out.innerHTML = '<div style="color:var(--fg-dim)">Enter a search term.</div>'; return; }
  try {
    var flags = 'g' + (ciCb && ciCb.checked ? 'i' : '');
    var pattern = regexCb && regexCb.checked ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
    var result = text.replace(pattern, replace);
    var count = (text.match(pattern) || []).length;
    out.innerHTML = '<div style="margin-bottom:4px;color:var(--fg-dim);font-size:10px">' + count + ' replacement' + (count !== 1 ? 's' : '') + ' made.</div>'
      + '<textarea readonly class="tt-output-ta">' + escapeHtml(result) + '</textarea>';
  } catch(e) {
    out.innerHTML = '<div style="color:var(--red);font-size:11px">Invalid regex: ' + escapeHtml(e.message) + '</div>';
  }
}

function renderTextOutput(el, text) {
  el.innerHTML = '<textarea readonly class="tt-output-ta">' + escapeHtml(text) + '</textarea>';
}

// ====== TEXT TOOLS ======
TOOL_INIT.texttools = function() {
  var sel = document.getElementById('tt-cipher-type');
  if (sel) {
    sel.onchange = function() {
      var key = document.getElementById('tt-cipher-key');
      if (!key) return;
      key.style.display = (this.value === 'caesar' || this.value === 'vigenere') ? '' : 'none';
    };
    sel.onchange();
  }
};

function switchTtTool(tool) {
  document.querySelectorAll('#tab-texttools .nb-tab-btn').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('#tab-texttools .nb-tool-content').forEach(function(c) { c.classList.remove('active'); });
  var btn = document.querySelector('#tab-texttools .nb-tab-btn[data-tt-tool="' + tool + '"]');
  var pane = document.getElementById('tt-pane-' + tool);
  if (btn) btn.classList.add('active');
  if (pane) pane.classList.add('active');
}

function ttConv(type) {
  var input = document.getElementById('tt-case-input');
  var out = document.getElementById('tt-case-output');
  if (!input || !out) return;
  var text = input.value;
  if (!text) { out.innerHTML = '<div style="color:var(--fg-dim)">Enter some text first.</div>'; return; }
  var result;
  switch (type) {
    case 'upper': result = text.toUpperCase(); break;
    case 'lower': result = text.toLowerCase(); break;
    case 'title': result = text.replace(/\w\S*/g, function(w) { return w[0].toUpperCase() + w.slice(1).toLowerCase(); }); break;
    case 'sentence': result = text.replace(/(^\s*\w|[.!?]\s*\w)/g, function(c) { return c.toUpperCase(); }); break;
    case 'camel': result = text.replace(/[^a-zA-Z0-9]+(.)/g, function(_, c) { return c.toUpperCase(); }).replace(/^[A-Z]/, function(c) { return c.toLowerCase(); }); break;
    case 'snake': result = text.replace(/[^a-zA-Z0-9]+/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '').toLowerCase(); break;
    case 'kebab': result = text.replace(/[^a-zA-Z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase(); break;
    case 'toggle': result = text.split('').map(function(c) { return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase(); }).join(''); break;
    default: result = text;
  }
  out.innerHTML = '<textarea readonly class="tt-output-ta">' + escapeHtml(result) + '</textarea>';
}

function ttCipher(mode) {
  var sel = document.getElementById('tt-cipher-type');
  var input = document.getElementById('tt-cipher-input');
  var out = document.getElementById('tt-cipher-output');
  var keyInput = document.getElementById('tt-cipher-key');
  if (!sel || !input || !out) return;
  var text = input.value;
  if (!text) { out.innerHTML = '<div style="color:var(--fg-dim)">Enter some text first.</div>'; return; }
  var type = sel.value;
  var key = keyInput ? keyInput.value : '';
  var result = '';

  if (mode === 'bruteforce') {
    if (type !== 'caesar') { out.innerHTML = '<div style="color:var(--fg-dim)">Brute force only available for Caesar cipher.</div>'; return; }
    var lines = [];
    for (var shift = 1; shift <= 25; shift++) {
      var decrypted = ttCaesar(text, -shift);
      lines.push('<div style="margin-bottom:2px"><span style="color:var(--fg-dim);display:inline-block;width:40px">Shift ' + shift + ':</span> ' + escapeHtml(decrypted.slice(0, 60)) + '</div>');
    }
    out.innerHTML = '<div style="font-size:11px;line-height:1.6">' + lines.join('') + '</div>';
    return;
  }

  switch (type) {
    case 'rot13': result = ttRot13(text, mode); break;
    case 'atbash': result = ttAtbash(text); break;
    case 'caesar': {
      var shift = parseInt(key) || 0;
      if (!shift) { out.innerHTML = '<div style="color:var(--fg-dim)">Enter a shift number for Caesar cipher.</div>'; return; }
      result = ttCaesar(text, mode === 'encode' ? shift : -shift);
      break;
    }
    case 'vigenere': {
      if (!key) { out.innerHTML = '<div style="color:var(--fg-dim)">Enter a key word for Vigenere cipher.</div>'; return; }
      result = ttVigenere(text, key, mode);
      break;
    }
  }
  out.innerHTML = '<textarea readonly class="tt-output-ta">' + escapeHtml(result) + '</textarea>';
}

function ttRot13(text) { return text.replace(/[a-zA-Z]/g, function(c) { var base = c <= 'Z' ? 65 : 97; return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base); }); }

function ttAtbash(text) { return text.replace(/[a-zA-Z]/g, function(c) { var base = c <= 'Z' ? 65 : 97; return String.fromCharCode(25 - (c.charCodeAt(0) - base) + base); }); }

function ttCaesar(text, shift) { shift = ((shift % 26) + 26) % 26; return text.replace(/[a-zA-Z]/g, function(c) { var base = c <= 'Z' ? 65 : 97; return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base); }); }

function ttVigenere(text, key, mode) {
  var result = '';
  var ki = 0;
  key = key.toLowerCase().replace(/[^a-z]/g, '');
  if (!key) return text;
  for (var i = 0; i < text.length; i++) {
    var c = text[i];
    if (/[a-zA-Z]/.test(c)) {
      var base = c <= 'Z' ? 65 : 97;
      var shift = key[ki % key.length].charCodeAt(0) - 97;
      if (mode === 'decode') shift = 26 - shift;
      result += String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
      ki++;
    } else {
      result += c;
    }
  }
  return result;
}

function ttLines(cmd) {
  var input = document.getElementById('tt-lines-input');
  var out = document.getElementById('tt-lines-output');
  if (!input || !out) return;
  var text = input.value;
  if (!text) { out.innerHTML = '<div style="color:var(--fg-dim)">Enter some text first.</div>'; return; }
  var lines = text.split('\n');
  switch (cmd) {
    case 'sort': lines.sort(function(a,b) { return a.localeCompare(b); }); break;
    case 'sortr': lines.sort(function(a,b) { return b.localeCompare(a); }); break;
    case 'reverse': lines.reverse(); break;
    case 'shuffle': for (var i = lines.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = lines[i]; lines[i] = lines[j]; lines[j] = tmp; } break;
    case 'unique': { var seen = {}; lines = lines.filter(function(l) { if (seen[l]) return false; seen[l] = true; return true; }); } break;
    case 'nonempty': lines = lines.filter(function(l) { return l.trim() !== ''; }); break;
    case 'trim': lines = lines.map(function(l) { return l.trim(); }); break;
    case 'number': lines = lines.map(function(l, i) { return (i + 1) + '. ' + l; }); break;
    case 'dedent': { var min = Infinity; lines.forEach(function(l) { if (l.trim()) { var sp = l.match(/^ */); if (sp) min = Math.min(min, sp[0].length); } }); if (min > 0 && min < Infinity) lines = lines.map(function(l) { return l.slice(min); }); } break;
  }
  out.innerHTML = '<textarea readonly class="tt-output-ta">' + escapeHtml(lines.join('\n')) + '</textarea>';
}

function ttDiff() {
  var a = document.getElementById('tt-diff-a');
  var b = document.getElementById('tt-diff-b');
  var out = document.getElementById('tt-diff-output');
  if (!a || !b || !out) return;
  if (!a.value && !b.value) { out.innerHTML = '<div style="color:var(--fg-dim)">Enter text in both fields.</div>'; return; }
  fetch('/api/notebook/diff', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text_a: a.value, text_b: b.value })
  }).then(function(r) { return r.json(); }).then(function(data) {
    if (data.html) {
      out.innerHTML = '<div style="font-size:10px;line-height:1.6">' + data.html + '</div>';
    } else {
      out.innerHTML = '<div style="color:var(--fg-dim)">No differences found.</div>';
    }
  }).catch(function() {
    out.innerHTML = '<div style="color:var(--red)">Diff server error.</div>';
  });
}

function ttAiScan() {
  var input = document.getElementById('tt-ai-input');
  var out = document.getElementById('tt-ai-output');
  if (!input || !out) return;
  var text = input.value;
  if (!text) { out.innerHTML = '<div style="color:var(--fg-dim)">Paste some text first.</div>'; return; }

  var patterns = [
    { label: 'Leveraging / optimizing', regex: /\b(leverage|optimize|streamline|enhance|facilitate|holistic|paradigm|synergy|robust|impactful)\b/gi },
    { label: 'Overly formal transitions', regex: /\b(moreover|furthermore|nevertheless|consequently|accordingly|henceforth|hereby|therein)\b/gi },
    { label: 'Generic filler phrases', regex: /(it is important to note that|it should be noted that|in order to|due to the fact that|as a result of|in the realm of|when it comes to)/gi },
    { label: 'AI hedging language', regex: /\b(can be considered|can be seen as|may indicate|may suggest|has the potential to|could potentially|in many ways|to a certain extent)\b/gi },
    { label: 'Repeated sentence structure', regex: /(^(this|that|these|those|it|there|here)\s+\w+)/gim },
    { label: 'Excessive adverb use', regex: /\b(very|really|quite|highly|significantly|substantially|remarkably|notably|particularly|extremely)\b/gi },
    { label: 'List-heavy writing', regex: /^\s*[-*]\s|\d+\.\s/gm },
    { label: 'Overuse of "crucial/essential/vital"', regex: /\b(crucial|essential|vital|paramount|imperative|indispensable)\b/gi },
    { label: 'Generic "In conclusion"', regex: /\b(in conclusion|to summarize|in summary|to conclude|in closing)\b/gi },
    { label: 'Repetitive sentence starts', regex: /^One\s+\w+/gim },
  ];

  var totalScore = 0;
  var results = [];
  patterns.forEach(function(p) {
    var matches = text.match(p.regex);
    if (matches && matches.length) {
      totalScore += matches.length;
      results.push('<div style="margin-bottom:4px"><span style="color:var(--amber);font-weight:bold">' + p.label + ':</span> <span style="color:var(--fg-dim)">' + matches.length + ' match' + (matches.length > 1 ? 'es' : '') + '</span></div>');
    }
  });

  var wordCount = text.split(/\s+/).filter(function(w) { return w.length > 0; }).length;
  var score = wordCount > 0 ? Math.round((totalScore / wordCount) * 100) : 0;

  var verdict = '';
  if (score > 15) verdict = '<span style="color:var(--red);font-weight:bold">High AI-ism score — text shows many AI-like patterns.</span>';
  else if (score > 8) verdict = '<span style="color:var(--amber);font-weight:bold">Moderate AI-ism score — some AI-like patterns detected.</span>';
  else if (score > 3) verdict = '<span style="color:var(--teal)">Low AI-ism score — text appears mostly natural.</span>';
  else verdict = '<span style="color:var(--teal)">Minimal AI patterns detected — text appears natural.</span>';

  out.innerHTML = '<div style="margin-bottom:8px">' + verdict + ' <span style="color:var(--fg-dim);font-size:10px">(' + totalScore + ' patterns in ' + wordCount + ' words)</span></div>'
    + (results.length ? '<div style="border-top:1px solid var(--border);padding-top:6px;font-size:10px">' + results.join('') + '</div>' : '');
}

function ttStats() {
  var input = document.getElementById('tt-stats-input');
  var out = document.getElementById('tt-stats-output');
  if (!input || !out) return;
  var text = input.value;
  if (!text) { out.innerHTML = '<div style="color:var(--fg-dim)">Paste some text first.</div>'; return; }

  var chars = text.length;
  var charsNoSpace = text.replace(/\s/g, '').length;
  var words = text.split(/\s+/).filter(function(w) { return w.length > 0; }).length;
  var lines = text.split('\n').length;
  var sentences = text.split(/[.!?]+/).filter(function(s) { return s.trim().length > 0; }).length;
  var paras = text.split(/\n\s*\n/).filter(function(p) { return p.trim().length > 0; }).length;
  var avgWordLen = words > 0 ? (charsNoSpace / words).toFixed(1) : 0;
  var avgSentLen = sentences > 0 ? (words / sentences).toFixed(1) : 0;
  var longWords = text.split(/\s+/).filter(function(w) { return w.length >= 7; }).length;

  out.innerHTML = '<table style="font-size:10px;border-collapse:collapse;width:100%">'
    + '<tr><td style="padding:3px 8px;color:var(--fg-dim)">Characters (with spaces)</td><td style="padding:3px 8px;color:var(--teal);text-align:right;font-weight:bold">' + chars + '</td></tr>'
    + '<tr><td style="padding:3px 8px;color:var(--fg-dim)">Characters (no spaces)</td><td style="padding:3px 8px;color:var(--teal);text-align:right;font-weight:bold">' + charsNoSpace + '</td></tr>'
    + '<tr><td style="padding:3px 8px;color:var(--fg-dim)">Words</td><td style="padding:3px 8px;color:var(--teal);text-align:right;font-weight:bold">' + words + '</td></tr>'
    + '<tr><td style="padding:3px 8px;color:var(--fg-dim)">Lines</td><td style="padding:3px 8px;color:var(--teal);text-align:right;font-weight:bold">' + lines + '</td></tr>'
    + '<tr><td style="padding:3px 8px;color:var(--fg-dim)">Sentences</td><td style="padding:3px 8px;color:var(--teal);text-align:right;font-weight:bold">' + sentences + '</td></tr>'
    + '<tr><td style="padding:3px 8px;color:var(--fg-dim)">Paragraphs</td><td style="padding:3px 8px;color:var(--teal);text-align:right;font-weight:bold">' + paras + '</td></tr>'
    + '<tr><td style="padding:3px 8px;color:var(--fg-dim)">Avg word length</td><td style="padding:3px 8px;color:var(--teal);text-align:right;font-weight:bold">' + avgWordLen + ' chars</td></tr>'
    + '<tr><td style="padding:3px 8px;color:var(--fg-dim)">Avg sentence length</td><td style="padding:3px 8px;color:var(--teal);text-align:right;font-weight:bold">' + avgSentLen + ' words</td></tr>'
    + '<tr><td style="padding:3px 8px;color:var(--fg-dim)">Long words (≥7 chars)</td><td style="padding:3px 8px;color:var(--teal);text-align:right;font-weight:bold">' + longWords + '</td></tr>'
    + '</table>';
}

function ttFreq() {
  var input = document.getElementById('tt-freq-input');
  var limit = document.getElementById('tt-freq-limit');
  var skipCommon = document.getElementById('tt-freq-common');
  var out = document.getElementById('tt-freq-output');
  if (!input || !out) return;
  var text = input.value;
  if (!text) { out.innerHTML = '<div style="color:var(--fg-dim)">Paste some text first.</div>'; return; }

  var commonWords = ['the','be','to','of','and','a','in','that','have','i','it','for','not','on','with','he','as','you','do','at','this','but','his','by','from','they','we','her','she','or','an','will','my','one','all','would','there','their','what','so','up','out','if','about','who','get','which','go','me','when','make','can','like','time','no','just','him','know','take','people','into','year','your','good','some','could','them','see','other','than','then','now','look','only','come','its','over','think','also','back','after','use','two','how','our','work','first','well','way','even','new','want','because','any','these','give','day','most','us'];

  var words = text.toLowerCase().split(/[^a-zA-Z']+/).filter(function(w) { return w.length > 0 && w !== "'"; });
  var freq = {};
  words.forEach(function(w) { freq[w] = (freq[w] || 0) + 1; });

  var limitVal = parseInt(limit ? limit.value : 20) || 20;
  var skip = skipCommon ? skipCommon.checked : true;

  var sorted = Object.keys(freq).sort(function(a, b) { return freq[b] - freq[a]; });
  var top = [];
  sorted.forEach(function(w) {
    if (top.length >= limitVal) return;
    if (skip && commonWords.indexOf(w) !== -1) return;
    top.push({ word: w, count: freq[w] });
  });

  var total = words.length;
  var maxCount = top.length > 0 ? top[0].count : 1;
  var html = '<div style="margin-bottom:4px;font-size:10px;color:var(--fg-dim)">' + total + ' total words, ' + Object.keys(freq).length + ' unique' + (skip ? ' (common words excluded)' : '') + '</div>'
    + '<table style="font-size:10px;border-collapse:collapse;width:100%">';
  top.forEach(function(item) {
    var pct = ((item.count / total) * 100).toFixed(1);
    var barW = Math.round((item.count / maxCount) * 100);
    html += '<tr><td style="padding:2px 6px;color:var(--fg)">' + escapeHtml(item.word) + '</td>'
      + '<td style="padding:2px 6px;color:var(--teal);text-align:right;width:40px">' + item.count + '</td>'
      + '<td style="padding:2px 6px;color:var(--fg-dim);width:40px">' + pct + '%</td>'
      + '<td style="padding:2px 6px"><div style="height:10px;background:rgba(79,195,247,0.15);border-radius:2px;overflow:hidden"><div style="height:100%;width:' + barW + '%;background:var(--cyan);border-radius:2px"></div></div></td></tr>';
  });
  html += '</table>';
  out.innerHTML = html;
}

function ttEntities() {
  var input = document.getElementById('tt-entity-input');
  var out = document.getElementById('tt-entity-output');
  if (!input || !out) return;
  var text = input.value;
  if (!text) { out.innerHTML = '<div style="color:var(--fg-dim)">Paste some text first.</div>'; return; }

  var patterns = [
    { label: 'Emails', regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g },
    { label: 'URLs', regex: /https?:\/\/[^\s<>"']+|www\.[^\s<>"']+/g },
    { label: 'Phone Numbers', regex: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{2,4}[-.\s]?\d{2,9}/g },
    { label: 'IPv4 Addresses', regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g },
    { label: 'Dates (ISO/MM-DD/DD-MM)', regex: /\b\d{4}[-/]\d{1,2}[-/]\d{1,2}\b|\b\d{1,2}[-/]\d{1,2}[-/]\d{2,4}\b/g },
    { label: 'Credit Card Numbers', regex: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g },
    { label: 'Hashtags', regex: /#[a-zA-Z0-9_]+\b/g },
    { label: 'Mentions', regex: /@[a-zA-Z0-9_]+\b/g },
    { label: 'Currency Amounts', regex: /[\$€£¥]\s?\d+(?:,\d{3})*(?:\.\d{2})?/g },
    { label: 'Hex Colors', regex: /#[0-9a-fA-F]{3,8}\b/g },
  ];

  var total = 0;
  var lines = [];
  patterns.forEach(function(p) {
    var matches = text.match(p.regex);
    if (matches && matches.length) {
      total += matches.length;
      lines.push('<div style="margin-bottom:6px"><div style="font-size:10px;color:var(--amber);font-weight:bold">' + p.label + ' (' + matches.length + ')</div>'
        + '<div style="font-size:10px;display:flex;flex-wrap:wrap;gap:4px;margin-top:2px">'
        + matches.map(function(m) { return '<span style="padding:1px 5px;background:rgba(79,195,247,0.08);border:1px solid var(--border);border-radius:2px;color:var(--teal)">' + escapeHtml(m) + '</span>'; }).join('')
        + '</div></div>');
    }
  });

  if (total === 0) {
    out.innerHTML = '<div style="color:var(--fg-dim)">No entities found.</div>';
  } else {
    out.innerHTML = '<div style="margin-bottom:6px;font-size:10px;color:var(--fg-dim)">Found ' + total + ' entit' + (total === 1 ? 'y' : 'ies') + ':</div>' + lines.join('');
  }
}

function ttHash() {
  var type = document.getElementById('tt-hash-type');
  var input = document.getElementById('tt-hash-input');
  var out = document.getElementById('tt-hash-output');
  if (!type || !input || !out) return;
  var text = input.value;
  if (!text) { out.innerHTML = '<div style="color:var(--fg-dim)">Enter some text first.</div>'; return; }
  var algo = type.value;

  if (algo === 'base64enc') {
    out.innerHTML = '<textarea readonly class="tt-output-ta">' + escapeHtml(btoa(text)) + '</textarea>';
  } else if (algo === 'base64dec') {
    try { out.innerHTML = '<textarea readonly class="tt-output-ta">' + escapeHtml(atob(text)) + '</textarea>'; }
    catch(e) { out.innerHTML = '<div style="color:var(--red)">Invalid Base64 input.</div>'; }
  } else {
    var hash = ttHashRaw(text, algo);
    out.innerHTML = '<textarea readonly class="tt-output-ta">' + hash + '</textarea>'
      + '<div style="font-size:9px;color:var(--fg-dim);margin-top:4px">' + algo.toUpperCase() + '</div>';
  }
}

function ttHashRaw(text, algo) {
  // Simple non-cryptographic hashes for client-side use
  var val = 0;
  for (var i = 0; i < text.length; i++) {
    var c = text.charCodeAt(i);
    if (algo === 'md5') { val = ((val << 5) - val + c) & 0xFFFFFFFF; }
    else if (algo === 'sha1') { val = ((val << 7) - val + c) & 0xFFFFFFFF; }
    else { val = ((val << 11) - val + c) & 0xFFFFFFFF; }
  }
  var hex = (val >>> 0).toString(16);
  while (hex.length < 8) hex = '0' + hex;
  return hex;
}

function ttPassword() {
  var pwd = ttPasswordGenerate();
  var len = parseInt(document.getElementById('tt-pass-length') ? document.getElementById('tt-pass-length').value : 16) || 16;
  var out = document.getElementById('tt-pass-output');
  if (!out) return;
  if (!pwd) { out.innerHTML = '<div style="color:var(--red)">Select at least one character type.</div>'; return; }
  var chars = '';
  if (document.getElementById('tt-pass-upper') && document.getElementById('tt-pass-upper').checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (document.getElementById('tt-pass-lower') && document.getElementById('tt-pass-lower').checked) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (document.getElementById('tt-pass-digits') && document.getElementById('tt-pass-digits').checked) chars += '0123456789';
  if (document.getElementById('tt-pass-symbols') && document.getElementById('tt-pass-symbols').checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  out.innerHTML = '<textarea readonly class="tt-output-ta" style="font-size:14px;color:var(--cyan);font-weight:bold">' + escapeHtml(pwd) + '</textarea>'
    + '<div style="font-size:9px;color:var(--fg-dim);margin-top:4px">' + len + ' characters | ' + chars.length + ' possible chars per position</div>';
}

function ttPasswordMulti() {
  var out = document.getElementById('tt-pass-output');
  if (!out) return;
  var lines = [];
  for (var i = 0; i < 10; i++) {
    var pwd = ttPasswordGenerate();
    lines.push('<textarea readonly class="tt-output-ta" style="font-size:13px;color:var(--cyan);margin:2px 0">' + escapeHtml(pwd) + '</textarea>');
  }
  out.innerHTML = lines.join('');
}

function ttPasswordGenerate() {
  var len = parseInt(document.getElementById('tt-pass-length') ? document.getElementById('tt-pass-length').value : 16) || 16;
  var upper = document.getElementById('tt-pass-upper') ? document.getElementById('tt-pass-upper').checked : true;
  var lower = document.getElementById('tt-pass-lower') ? document.getElementById('tt-pass-lower').checked : true;
  var digits = document.getElementById('tt-pass-digits') ? document.getElementById('tt-pass-digits').checked : true;
  var symbols = document.getElementById('tt-pass-symbols') ? document.getElementById('tt-pass-symbols').checked : true;
  var chars = '';
  if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (digits) chars += '0123456789';
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) return '';
  var pwd = '';
  for (var i = 0; i < len; i++) { pwd += chars[Math.floor(Math.random() * chars.length)]; }
  return pwd;
}

function resetPeriodic() {
  if (PT_QUIZ_MODE) toggleQuizMode();
  var search = $('pt-search');
  if (search) search.value = '';
  document.querySelectorAll('.pt-cat-btn').forEach(function(b) { b.classList.remove('active'); });
  var allBtn = document.querySelector('.pt-cat-btn[data-cat="all"]');
  if (allBtn) allBtn.classList.add('active');
  document.querySelectorAll('.pt-element').forEach(function(el) { el.classList.remove('highlight','fade'); });
  var detail = $('pt-detail');
  if (detail) { detail.classList.remove('visible'); detail.innerHTML = ''; }
}

function showElementDetail(z) {
  var el = ELEMENTS.find(function(e) { return e.z === z; });
  if (!el) return;
  var detail = $('pt-detail');
  if (!detail) return;
  var bg = CAT_COLORS[el.c] || '#2a2a2a';
  var fact = ELEMENT_FACTS[el.s] || '';
  var disc = ELEMENT_DISCOVERY[el.s];
  var discStr = disc ? (typeof disc === 'number' ? disc : disc) : '—';
  detail.innerHTML = '<div class="pt-detail-icon" style="background:' + bg + '"><div class="pt-di-symbol">' + el.s + '</div><div class="pt-di-number">' + el.z + '</div></div>'
    + '<div class="pt-detail-info">'
    + '<div class="pt-di-name">' + el.n + '</div>'
    + '<div class="pt-di-sub">' + el.c + ' &middot; Group ' + (el.g || '—') + '</div>'
    + '<div style="margin-top:8px"><span class="pt-di-prop">Atomic Mass:</span> <span class="pt-di-val">' + el.m + '</span></div>'
    + '<div><span class="pt-di-prop">Electron Config:</span> <code class="pt-di-val" style="background:transparent;border:none;padding:0">' + el.p + '</code></div>'
    + '<div style="margin-top:8px"><span class="pt-di-prop">Discovered:</span> <span class="pt-di-val">' + discStr + '</span></div>'
    + (fact ? '<div class="pt-fact-box"><span class="pt-di-prop">Did You Know?</span><br><span class="pt-di-val" style="font-size:10px;line-height:1.5">' + fact + '</span></div>' : '')
    + '</div>';
  detail.classList.add('visible');
  detail.dataset.active = '1';
  
  // Highlight this element, clear search
  document.querySelectorAll('.pt-element').forEach(function(e) {
    e.classList.remove('highlight','fade');
    if (parseInt(e.dataset.z) === z) e.classList.add('highlight');
  });
  var search = $('pt-search');
  if (search) search.value = '';
}

function renderPeriodicQuizBar() {
  var bar = $('pt-quiz-bar');
  if (!bar) return;
  var mode = PT_QUIZ_MODE;
  bar.innerHTML = '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">'
    + '<button class="nb-gen-btn" onclick="toggleQuizMode()" style="font-size:10px">' + (mode ? 'Exit Quiz' : 'Quiz Mode') + '</button>'
    + (mode ? '<button class="nb-gen-btn" onclick="nextQuizElement()" style="font-size:10px">Random Element</button>'
    + '<span style="font-size:9px;color:var(--fg-dim)">Score: ' + PT_QUIZ_SCORE + '/' + PT_QUIZ_TOTAL + '</span>'
    + '<span id="pt-quiz-prompt" style="font-size:9px;color:var(--fg-dim)"></span>' : '')
    + '<button class="nb-gen-btn" onclick="randomElementFact()" style="font-size:10px"> Random Fact</button>'
    + '</div>';
}

function toggleQuizMode() {
  PT_QUIZ_MODE = !PT_QUIZ_MODE;
  PT_QUIZ_SCORE = 0;
  PT_QUIZ_TOTAL = 0;
  if (!PT_QUIZ_MODE) {
    document.querySelectorAll('.pt-element').forEach(function(el) { el.classList.remove('quiz-hidden-name'); });
    $('pt-quiz-prompt').innerHTML = '';
  }
  renderPeriodicQuizBar();
}

function nextQuizElement() {
  if (!PT_QUIZ_MODE) return;
  var candidates = ELEMENTS.filter(function(e) { return e.z >= 1 && e.z <= 118; });
  var el = candidates[Math.floor(Math.random() * candidates.length)];
  var prompt = $('pt-quiz-prompt');
  if (!prompt) return;
  
  // Highlight this element
  document.querySelectorAll('.pt-element').forEach(function(e) {
    e.classList.remove('highlight');
    if (parseInt(e.dataset.z) === el.z) {
      e.classList.add('highlight');
      e.classList.add('quiz-flash');
      setTimeout(function() { e.classList.remove('quiz-flash'); }, 2000);
    }
  });
  
  prompt.innerHTML = 'What element is <strong>' + el.s + '</strong>? (Type your answer in the search box, then press Enter)';
  prompt.dataset.quizSymbol = el.s;
  prompt.dataset.quizName = el.n;
  prompt.dataset.quizZ = el.z;
  $('pt-search').focus();
}

function checkQuizAnswer() {
  if (!PT_QUIZ_MODE) return;
  var search = $('pt-search');
  var prompt = $('pt-quiz-prompt');
  if (!search || !prompt || !prompt.dataset.quizName) return;
  var answer = search.value.trim().toLowerCase();
  var correct = prompt.dataset.quizName.toLowerCase();
  PT_QUIZ_TOTAL++;
  if (answer === correct) {
    PT_QUIZ_SCORE++;
    prompt.innerHTML = ' Correct! It\'s <strong>' + prompt.dataset.quizName + '</strong> (' + prompt.dataset.quizSymbol + ') &mdash; Score: ' + PT_QUIZ_SCORE + '/' + PT_QUIZ_TOTAL;
  } else {
    prompt.innerHTML = ' Not quite. The answer was <strong>' + prompt.dataset.quizName + '</strong> (' + prompt.dataset.quizSymbol + ') &mdash; Score: ' + PT_QUIZ_SCORE + '/' + PT_QUIZ_TOTAL;
  }
  search.value = '';
  prompt.dataset.quizName = '';
  renderPeriodicQuizBar();
}

function randomElementFact() {
  var keys = Object.keys(ELEMENT_FACTS);
  var sym = keys[Math.floor(Math.random() * keys.length)];
  var el = ELEMENTS.find(function(e) { return e.s === sym; });
  if (!el) return;
  showElementDetail(el.z);
}

// ====== 11. DICTIONARY (server-side, 262k+ words from Wiktionary) ======
TOOL_INIT.dictionary = function() {
  var result = $('dict-result');
  if (result) { result.classList.remove('visible'); result.innerHTML = ''; }
  var input = $('dict-input');
  if (input) input.value = '';
};

function lookupDictionary() {
  var input = $('dict-input');
  if (!input) return;
  var word = input.value.trim().toLowerCase();
  if (!word) { alert('Enter a word to look up.'); return; }
  fetchDictDefinition(word);
}

function fetchDictDefinition(word) {
  var result = $('dict-result');
  if (!result) return;
  result.innerHTML = '<div style="color:var(--fg-dim);font-size:10px">Looking up...</div>';
  result.classList.add('visible');

  fetch('/api/dictionary/lookup?word=' + encodeURIComponent(word))
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.found && data.definition) {
        var html = '<div style="display:flex;align-items:baseline;gap:8px;margin-bottom:4px">'
          + '<strong style="font-size:16px;color:var(--fg-bright)">' + escapeHtml(data.word) + '</strong>'
          + '<span style="font-size:10px;color:var(--fg-dim)">/' + escapeHtml(data.word) + '/</span>'
          + '</div>'
          + '<div style="font-size:12px;color:var(--fg);line-height:1.7">' + escapeHtml(data.definition) + '</div>'
          + '<div style="font-size:9px;color:var(--fg-dim);margin-top:8px">Source: Wiktionary (CC BY-SA 3.0)</div>';
        result.innerHTML = html;
        // Highlight the word in any existing browse list
        document.querySelectorAll('.dict-word').forEach(function(w) {
          w.classList.toggle('highlight', w.textContent === word);
        });
      } else {
        var html = '<div style="color:var(--amber);font-size:11px">Word not found in dictionary.</div>';
        if (data.suggestions && data.suggestions.length) {
          html += '<div style="margin-top:8px;font-size:10px;color:var(--fg-dim)">Did you mean:</div>'
            + '<div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap">'
            + data.suggestions.slice(0, 15).map(function(s) {
              return '<span class="dict-word" onclick="fetchDictDefinition(\'' + s.replace(/'/g, "\\'") + '\')">' + escapeHtml(s) + '</span>';
            }).join('')
            + '</div>';
        }
        result.innerHTML = html;
      }
    })
    .catch(function() {
      // Fallback to local DICT
      var def = DICT[word];
      if (def) {
        result.innerHTML = '<div style="display:flex;align-items:baseline;gap:8px;margin-bottom:4px">'
          + '<strong style="font-size:16px;color:var(--fg-bright)">' + escapeHtml(word) + '</strong>'
          + '</div>'
          + '<div style="font-size:12px;color:var(--fg);line-height:1.7">' + escapeHtml(def) + '</div>'
          + '<div style="font-size:9px;color:var(--fg-dim);margin-top:8px">(offline fallback)</div>';
      } else {
        result.innerHTML = '<div style="color:var(--red);font-size:11px">Server unavailable and word not in local cache.</div>';
      }
    });
}

function clearOcrImage() {
  var fileInput = document.getElementById('tt-ocr-file');
  var preview = document.getElementById('tt-ocr-preview');
  var status = document.getElementById('tt-ocr-status');
  var output = document.getElementById('tt-ocr-output');
  if (fileInput) fileInput.value = '';
  if (preview) preview.innerHTML = '';
  if (status) status.textContent = 'Upload an image to get started';
  if (output) { output.value = ''; output.style.display = 'none'; }
}

function previewOcrImage() {
  var fileInput = document.getElementById('tt-ocr-file');
  var preview = document.getElementById('tt-ocr-preview');
  var status = document.getElementById('tt-ocr-status');
  var output = document.getElementById('tt-ocr-output');
  if (!fileInput || !preview) return;
  var file = fileInput.files[0];
  if (!file) { preview.innerHTML = ''; status.textContent = 'No file selected'; return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    preview.innerHTML = '<img src="' + e.target.result + '" style="max-height:200px;max-width:100%;border:1px solid var(--border);border-radius:4px">';
    status.textContent = file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB) ready';
  };
  reader.readAsDataURL(file);
  if (output) output.style.display = 'none';
}

function ttOcr() {
  var fileInput = document.getElementById('tt-ocr-file');
  var status = document.getElementById('tt-ocr-status');
  var output = document.getElementById('tt-ocr-output');
  var btn = document.getElementById('tt-ocr-btn');
  if (!fileInput || !status || !output) return;
  var file = fileInput.files[0];
  if (!file) { status.textContent = 'Select an image file first.'; return; }
  if (file.size > 10 * 1024 * 1024) { status.textContent = 'File too large (max 10 MB).'; return; }
  status.textContent = 'Running OCR...';
  output.style.display = 'none';
  if (btn) btn.disabled = true;

  var reader = new FileReader();
  reader.onload = function(e) {
    var imageData = e.target.result;

    if (typeof Tesseract !== 'undefined') {
      // Use Tesseract.js in-browser (works on Android/PWA)
      var TESS_PATH = '/js/tesseract/';
      Tesseract.createWorker({
        workerPath: TESS_PATH + 'worker.min.js',
        corePath: TESS_PATH + 'tesseract-core.wasm.js',
        langPath: TESS_PATH,
        logger: function(m) {
          if (m.status === 'recognizing text') {
            status.textContent = 'OCR: ' + Math.round(m.progress * 100) + '%';
          }
        }
      }).then(function(worker) {
        worker.loadLanguage('eng').then(function() {
          worker.initialize('eng').then(function() {
            worker.recognize(imageData).then(function(result) {
              worker.terminate();
              if (btn) btn.disabled = false;
              var text = result.data.text || '';
              if (text.trim()) {
                var words = text.split(/\s+/).filter(function(w) { return w.length > 0; }).length;
                status.textContent = 'Extracted ' + words + ' words (browser)';
              } else {
                status.textContent = 'No text found';
              }
              output.value = text;
              output.style.display = '';
            }).catch(function() { fallbackOcr(imageData, status, output, btn); });
          }).catch(function() { fallbackOcr(imageData, status, output, btn); });
        }).catch(function() { fallbackOcr(imageData, status, output, btn); });
      }).catch(function() {
        fallbackOcr(imageData, status, output, btn);
      });
    } else {
      fallbackOcr(imageData, status, output, btn);
    }
  };
  reader.readAsDataURL(file);
}

function fallbackOcr(imageData, status, output, btn) {
  fetch('/api/ocr', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: imageData })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (btn) btn.disabled = false;
    if (data.error) {
      status.textContent = 'OCR failed';
      output.value = 'Error: ' + data.error;
    } else {
      var text = data.text || '';
      if (text.trim()) {
        var words = text.split(/\s+/).filter(function(w) { return w.length > 0; }).length;
        status.textContent = 'Extracted ' + words + ' words';
      } else {
        status.textContent = 'No text found';
      }
      output.value = text;
    }
    output.style.display = '';
  })
  .catch(function(err) {
    if (btn) btn.disabled = false;
    status.textContent = 'Server error';
    output.value = 'Request failed: ' + err.message;
    output.style.display = '';
  });
}
