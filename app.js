/* global HOTSPOTS, DEFAULT_QUESTION, FINAL_MESSAGE */

const img = document.getElementById('mapImage');
const svg = document.getElementById('overlay');
const tooltip = document.getElementById('tooltip');
const fxCanvas = document.getElementById('fx');
const progressEl = document.getElementById('progress');
const mapWrap = document.getElementById('mapWrap');
const mapInner = document.getElementById('mapInner');

// Gesamtabschluss
let gameCompleted = false;


// Modal
const modalBackdrop = document.getElementById('modalBackdrop');
const quizModal = document.getElementById('quizModal');
const modalHeader = document.getElementById('modalHeader');
const modalTitle = document.getElementById('modalTitle');
const modalQuestion = document.getElementById('modalQuestion');

const singleAnswer = document.getElementById('singleAnswer');
const answerInput = document.getElementById('answerInput');

const multiAnswer = document.getElementById('multiAnswer');
const multiGrid = document.getElementById('multiGrid');

const hintBox = document.getElementById('hintBox');
const resultBox = document.getElementById('resultBox');
const btnCloseX = document.getElementById('btnCloseX');
const btnHint = document.getElementById('btnHint');
const btnReveal = document.getElementById('btnReveal');
const btnCancel = document.getElementById('btnCancel');
const btnCheck = document.getElementById('btnCheck');
const btnMute = document.getElementById('btnMute');


// --- Finale Audio (nur für Endnachricht) ---
const finalMessageAudio = new Audio();
finalMessageAudio.loop = true;
let finalMessageOpen = false;

function stopFinalMessageAudio() {
 try {
  finalMessageAudio.pause();
  finalMessageAudio.currentTime = 0;
 } catch {}
}

let finalAudioBlocked = false;

function playFinalMessageAudio() {
  // Sicherheitsgurt: NUR abspielen, wenn Enddialog wirklich offen ist
  if (!finalMessageOpen) return;

  const src = (typeof FINAL_AUDIO_SRC !== 'undefined' && FINAL_AUDIO_SRC)
    ? String(FINAL_AUDIO_SRC).trim()
    : '';

  if (!src) { stopFinalMessageAudio(); return; }

  finalMessageAudio.src = src;
  finalMessageAudio.muted = audioMuted;
  finalMessageAudio.currentTime = 0;

  finalAudioBlocked = false;

  finalMessageAudio.play().catch(() => {
    // Browser blockt Autoplay → wir zeigen im Enddialog einen Start-Button
    finalAudioBlocked = true;
    const btn = document.getElementById('btnFinalMusicStart');
    if (btn) btn.hidden = false;
  });
}
``

// --- Playlist Player (Header) ---
// Spielt AUDIO_PLAYLIST aus data.js (oder baut automatisch eine Liste aus HOTSPOTS[audioSrc]).
const playlistAudio = new Audio();
playlistAudio.loop = false;
let playlistIndex = 0;
let playlistRunning = false;
let playlistTracks = [];

// ✅ ADD: Pause-State + Helper für Button-Text
let playlistPaused = false;

function updatePauseButton() {
  const btn = document.getElementById('btnPlaylistPause');
  if (!btn) return;
  btn.textContent = playlistPaused ? '▶ Weiter' : '⏸ Pause';
  btn.setAttribute('aria-pressed', playlistPaused ? 'true' : 'false');
}

function buildPlaylistTracks() {
 // Wenn AUDIO_PLAYLIST gepflegt ist, verwende diese.
 const fromData = (typeof AUDIO_PLAYLIST !== 'undefined' && Array.isArray(AUDIO_PLAYLIST)) ? AUDIO_PLAYLIST : [];
 const cleanedFromData = fromData.map(x => String(x || '').trim()).filter(Boolean);
 if (cleanedFromData.length) return cleanedFromData;

 // Fallback: automatisch aus HOTSPOTS
 const hs = (typeof HOTSPOTS !== 'undefined' && Array.isArray(HOTSPOTS)) ? HOTSPOTS : [];
 const auto = hs.map(s => (s && s.audioSrc) ? String(s.audioSrc).trim() : '').filter(Boolean);
 // Optional: FINAL_AUDIO_SRC ans Ende hängen
 const fin = (typeof FINAL_AUDIO_SRC !== 'undefined' && FINAL_AUDIO_SRC) ? String(FINAL_AUDIO_SRC).trim() : '';
 if (fin) auto.push(fin);
 // Duplikate entfernen, Reihenfolge beibehalten
 const seen = new Set();
 const unique = [];
 for (const a of auto) { if (!seen.has(a)) { seen.add(a); unique.push(a); } }
 return unique;
}

function stopPlaylist() {
 playlistRunning = false;
 try {
  playlistAudio.pause();
  playlistAudio.currentTime = 0;
 } catch {}
}

// ✅ ADD: Pause/Weiter umschalten (ohne Reset der Position)
function togglePlaylistPause() {
  // Wenn noch nichts geladen wurde: starte wie "Play"
  if (!playlistAudio.src) {
    startOrResumePlaylist();
    playlistPaused = false;
    updatePauseButton();
    return;
  }

  if (playlistAudio.paused) {
    // Weiterlaufen lassen
    playlistPaused = false;
    playlistRunning = true;            // wichtig: damit "ended" wieder weiter schalten darf
    playlistAudio.muted = audioMuted;
    playlistAudio.play().catch(() => {});
  } else {
    // Pausieren (ohne currentTime zurückzusetzen!)
    playlistPaused = true;
    playlistRunning = false;           // wichtig: verhindert nextTrack bei 'ended'
    playlistAudio.pause();
  }

  updatePauseButton();
}

function playPlaylistAt(index) {
 if (!playlistTracks.length) playlistTracks = buildPlaylistTracks();
 if (!playlistTracks.length) return;

 // Bereich clampen
 playlistIndex = Math.max(0, Math.min(index, playlistTracks.length - 1));
  playlistRunning = true;

 const src = playlistTracks[playlistIndex];
 playlistAudio.src = src;
 playlistAudio.muted = audioMuted;
 playlistAudio.currentTime = 0;
 playlistAudio.play().catch(() => {
  // Autoplay wird hier i.d.R. nicht blockiert, weil Start per Button.
 });
}

function startOrResumePlaylist() {
 // Wenn der Enddialog offen ist, Endmusik stoppen (nicht parallel)
 try { stopFinalMessageAudio(); finalMessageOpen = false; } catch {}
 // Wenn Hotspot-Musik läuft, stoppen (nicht parallel)
 try { stopHotspotAudio(); } catch {}

 if (!playlistTracks.length) playlistTracks = buildPlaylistTracks();
 if (!playlistTracks.length) {
  alert('Playlist ist leer. Bitte AUDIO_PLAYLIST in data.js füllen oder audioSrc in HOTSPOTS verwenden.');
  return;
 }

 // Wenn bereits pausiert: weiterlaufen lassen
 playlistRunning = true;
 playlistAudio.muted = audioMuted;
 if (playlistAudio.src) {
  playlistAudio.play().catch(() => {});
 } else {
  playPlaylistAt(playlistIndex);
 }
}

function nextTrack() {
 if (!playlistTracks.length) playlistTracks = buildPlaylistTracks();
 if (!playlistTracks.length) return;
 const next = (playlistIndex + 1) % playlistTracks.length;
 playPlaylistAt(next);
}

function prevTrack() {
 if (!playlistTracks.length) playlistTracks = buildPlaylistTracks();
 if (!playlistTracks.length) return;
 const prev = (playlistIndex - 1 + playlistTracks.length) % playlistTracks.length;
 playPlaylistAt(prev);
}

// Automatisch nächsten Track spielen
playlistAudio.addEventListener('ended', () => {
 if (!playlistRunning) return;
 nextTrack();
});

// Buttons (existieren in index.html)
document.getElementById('btnPlaylist')?.addEventListener('click', startOrResumePlaylist);
document.getElementById('btnPlaylistStop')?.addEventListener('click', stopPlaylist);
document.getElementById('btnPlaylistNext')?.addEventListener('click', nextTrack);
document.getElementById('btnPlaylistPrev')?.addEventListener('click', prevTrack);

// --- Audio (global) ---
const hotspotAudio = new Audio();
hotspotAudio.loop = true;

let audioMuted = false;      // globaler Mute-Schalter
let currentAudioSpotId = null;

function stopHotspotAudio() {
  hotspotAudio.pause();
  hotspotAudio.currentTime = 0;
  currentAudioSpotId = null;
}

function playHotspotAudio(spot) {
 // Playlist stoppen, sobald das Spiel startet
 if (typeof stopPlaylist === 'function') stopPlaylist();
 // Endmusik darf nicht parallel laufen
 stopFinalMessageAudio();
 finalMessageOpen = false;
  const src = spot && spot.audioSrc ? String(spot.audioSrc) : '';
  if (!src) {
    stopHotspotAudio();
 // Endmusik stoppen (falls aktiv)
 stopFinalMessageAudio();
 finalMessageOpen = false;
    return;
  }

  // Wenn erneut dasselbe Haus geöffnet wird: immer von vorn starten
  currentAudioSpotId = spot.id;
  hotspotAudio.src = src;
  hotspotAudio.muted = audioMuted;
  hotspotAudio.currentTime = 0;

  // play() kann im Browser rejecten, wenn keine User-Interaction vorlag –
  // hier ist es aber ein Click auf den Hotspot, daher normalerweise ok.
  hotspotAudio.play().catch(() => {
    // falls der Browser es trotzdem blockt: nichts crashen
  });
}

function updateMuteButton() {
  if (!btnMute) return;
  btnMute.textContent = audioMuted ? '🔇 Ton aus' : '🔊 Ton an';
  btnMute.setAttribute('aria-pressed', audioMuted ? 'true' : 'false');
}

if (btnMute) {
  btnMute.addEventListener('click', () => {
    audioMuted = !audioMuted;
    hotspotAudio.muted = audioMuted;
    try { finalMessageAudio.muted = audioMuted; } catch {}
    try { playlistAudio.muted = audioMuted; } catch {}
    updateMuteButton();
  });
  updateMuteButton();
}







// Touch-Erkennung (für Mobile UX)
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

modalBackdrop.hidden = true;

const solved = new Set();
let active = null;

// Animation erst nach Schließen
let pendingCelebration = null; // {x,y}

// Mehrparteien: welche Felder sind richtig
const multiSolved = Object.create(null); // id -> boolean[]

// Merkt sich das zuletzt fokussierte Mehrparteien-Feld
let lastMultiIndex = 0;
// Merkt sich das Feld, für das zuletzt ein Tipp angezeigt wurde
let lastHintIndex = null;

function normalize(s) {
  return (s || '')
    .trim()
    .toLowerCase()
    .replaceAll('ß', 'ss')
    .replaceAll('ä', 'ae')
    .replaceAll('ö', 'oe')
    .replaceAll('ü', 'ue')
    .replace(/[^\p{L}\p{N}]+/gu, '');
}

function isCorrect(ans, arr) {
  const a = normalize(ans);
  return (arr || []).some(ok => normalize(ok) === a);
}

function tooltipFor(spot) {
  const isHouse = /^\d+$/.test(spot.id);
  const isSecret = ['x', 'y', 'z'].includes(spot.id);
  const isField = ['Feld 1', 'Feld 2'].includes(spot.id);
  const isStreet = spot.id === 'Strasse' || spot.id === 'Straße';

  if (isSecret || isField) return '?';
  if (isHouse) return `Nr.${spot.id}`;
  if (isStreet) return 'Straße';
  return spot.name || spot.id;
}





function getImageSize() {
  const w = img.naturalWidth || img.width || img.clientWidth || 1;
  const h = img.naturalHeight || img.height || img.clientHeight || 1;
  return { w, h };
}

function setSvgViewBox() {
  const s = getImageSize();
  svg.setAttribute('viewBox', `0 0 ${s.w} ${s.h}`);
}

function normToPx(poly) {
  const s = getImageSize();
  return poly.map(([x, y]) => [x * s.w, y * s.h]);
}

function pointsAttr(pts) {
  return pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

function render() {
  svg.innerHTML = '';

  for (const s of HOTSPOTS) {
    if (!s.polygon || s.polygon.length < 3) continue;

    const pts = normToPx(s.polygon);
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.classList.add('area');
    poly.dataset.id = s.id;
    poly.setAttribute('points', pointsAttr(pts));

    poly.addEventListener('mousemove', (e) => showTooltip(e, tooltipFor(s)));
    poly.addEventListener('mouseleave', hideTooltip);
    poly.addEventListener('click', () => openQuiz(s));

    svg.appendChild(poly);
  }

  updateSolvedStyles();
  updateProgress();
}

function updateSolvedStyles() {
  svg.querySelectorAll('.area').forEach(el => {
    el.classList.toggle('solved', solved.has(el.dataset.id));
  });
}

function updateProgress() {
  const total = HOTSPOTS.filter(s => s.polygon && s.polygon.length >= 3).length;
  progressEl.textContent = `${solved.size} / ${total} gelöst`;
  checkGameComplete(total);
}


function showTooltip(e, text) {
  tooltip.textContent = text;
  tooltip.style.opacity = '1';
  const r = document.getElementById('mapWrap').getBoundingClientRect();
  tooltip.style.left = `${e.clientX - r.left}px`;
  tooltip.style.top = `${e.clientY - r.top}px`;
}

function hideTooltip() { tooltip.style.opacity = '0'; }

function isMultiSpot(spot) {
  return Array.isArray(spot.multiRows) && spot.multiRows.length > 0;
}

function canonicalKey(k) {
  return (k || '')
    .replace('1.OG', '1OG')
    .replace('2.OG', '2OG')
    .replace(/\s+/g, '')
    .toUpperCase();
}


// --- Reveal-Bilder (konfigurierbar über data.js: revealImage) ---
function resolveRevealImageSrc(val) {
  const v = (val ?? '').toString().trim();
  if (!v) return '';
  // Wenn bereits ein Pfad angegeben ist, so lassen. Sonst automatisch in /pics ablegen.
  return v.includes('/') ? v : `pics/${v}`;
}

function maybeShowRevealImage(imageValue, altText) {
  const src = resolveRevealImageSrc(imageValue);
  if (!src) return;
  showImageOverlay(src, altText || 'Bild');
}

function renderMultiRows(spot) {
  multiGrid.innerHTML = '';

  const rows = spot.multiRows;
  if (!multiSolved[spot.id]) multiSolved[spot.id] = new Array(rows.length).fill(false);

  const idxByKey = Object.create(null);
  for (let i = 0; i < rows.length; i++) idxByKey[canonicalKey(rows[i].key)] = i;

  const addCell = (rowIndex, labelText, span2=false) => {
    const cell = document.createElement('div');
    cell.className = 'multi-cell' + (span2 ? ' multi-span-2' : '');

    const lab = document.createElement('div');
    lab.className = 'multi-cell-label';
    lab.textContent = labelText;

    const inp = document.createElement('input');
    inp.type = 'text';
    inp.autocomplete = 'off';
    inp.dataset.rowIndex = String(rowIndex);
    inp.placeholder = 'Name eingeben';
    if (multiSolved[spot.id][rowIndex]) inp.classList.add('correct');

    const hint = document.createElement('div');
    hint.className = 'multi-hint';
    hint.dataset.hintIndex = String(rowIndex);
    hint.hidden = true;

    cell.appendChild(lab);
    cell.appendChild(inp);
    cell.appendChild(hint);
    multiGrid.appendChild(cell);
  };

  // Layout: floors1 (Haus 16) => DG/2.OG/1.OG/EG je volle Breite
  if (spot.multiLayout === 'floors1') {
    addCell(idxByKey['DG'] ?? 0, 'DG', true);
    addCell(idxByKey['2OG'] ?? 0, '2. OG', true);
    addCell(idxByKey['1OG'] ?? 0, '1. OG', true);
    addCell(idxByKey['EG'] ?? 0, 'EG', true);
    return;
  }

  
  // Layout: floors3 (Haus 9/11) => DG/1.OG/EG je volle Breite
  if (spot.multiLayout === 'floors3') {
    addCell(idxByKey['DG'] ?? 0, 'DG', true);
    addCell(idxByKey['1OG'] ?? 0, '1. OG', true);
    addCell(idxByKey['EG'] ?? 0, 'EG', true);
    return;
  }
// Layout: stack2floors (Haus 5) => OG über EG, je volle Breite
  if (spot.multiLayout === 'stack2floors') {
    const iOG = idxByKey['OG'] ?? 0;
    const iEG = idxByKey['EG'] ?? 1;
    addCell(iOG, 'Obergeschoss', true);
    addCell(iEG, 'Erdgeschoss', true);
    return;
  }

  // Layout: stack2 (Haus 7) => 1. Partei / 2. Partei, je volle Breite
  if (spot.multiLayout === 'stack2') {
    addCell(0, (rows[0] && rows[0].label) ? rows[0].label : '1. Partei', true);
    addCell(1, (rows[1] && rows[1].label) ? rows[1].label : '2. Partei', true);
    return;
  }

  // Default: floors (7 Parteien)
  addCell(idxByKey['DG'] ?? 0, 'DG', true);
  addCell(idxByKey['2OG_L'] ?? 0, '2. OG links');
  addCell(idxByKey['2OG_R'] ?? 0, '2. OG rechts');
  addCell(idxByKey['1OG_L'] ?? 0, '1. OG links');
  addCell(idxByKey['1OG_R'] ?? 0, '1. OG rechts');
  addCell(idxByKey['EG_L'] ?? 0, 'EG links');
  addCell(idxByKey['EG_R'] ?? 0, 'EG rechts');
}

function openQuiz(spot) {
  // Audio starten (falls spot.audioSrc gesetzt ist)
  playHotspotAudio(spot);
  active = spot;
  pendingCelebration = null;
  lastHintIndex = null;

  modalTitle.textContent = tooltipFor(spot);
  modalQuestion.textContent = spot.question || DEFAULT_QUESTION;

  hintBox.hidden = true;
  hintBox.textContent = '';
  resultBox.hidden = true;
  resultBox.className = 'result';

  if (isMultiSpot(spot)) {
    singleAnswer.hidden = true;
    multiAnswer.hidden = false;
    renderMultiRows(spot);

    const first = multiGrid.querySelector('input[data-row-index]');
    if (first) {
      lastMultiIndex = Number(first.dataset.rowIndex || 0);
      first.focus();
    } else {
      lastMultiIndex = 0;
    }
  } else {
    singleAnswer.hidden = false;
    multiAnswer.hidden = true;
    answerInput.value = '';
  answerInput.classList.remove('revealed');
  answerInput.classList.remove('correct');
  answerInput.classList.remove('wrong');
  answerInput.focus();
  }

  modalBackdrop.hidden = false;
  resetModalIfOffscreen();
 repositionImageOverlay();
}

function closeQuiz() {
  modalBackdrop.hidden = true;
  active = null;
 // Bild-Overlay schließen
 hideImageOverlay();

  // Audio stoppen, sobald das Fenster geschlossen wird
  stopHotspotAudio();
 // Endmusik stoppen (falls aktiv)
 stopFinalMessageAudio();
 finalMessageOpen = false;

  if (pendingCelebration) {
    const c = pendingCelebration;
    pendingCelebration = null;
    setTimeout(() => runCelebration(c.x, c.y), 120);
  }
}


btnCancel.addEventListener('click', closeQuiz);
btnCloseX.addEventListener('pointerdown', (e) => { e.stopPropagation(); });
btnCloseX.addEventListener('click', closeQuiz);
modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeQuiz(); });

document.addEventListener('keydown', (e) => {
 // Hotkey immer erlauben (auch wenn kein Modal offen ist)
 // Hinweis: Browser reservieren manchmal Ctrl+Shift+F (Suche) – falls das kollidiert,
 // kann man alternativ Ctrl+Shift+G oder Alt+Shift+F nehmen.
 if (e.ctrlKey && e.shiftKey && (e.key === 'F' || e.key === 'f')) {
   e.preventDefault();
   e.stopPropagation();
   triggerFinalMessageHotkey();
   return;
 }

 if (!modalBackdrop.hidden && e.key === 'Escape') closeQuiz();
 if (!modalBackdrop.hidden && e.key === 'Enter') checkAnswer();
});

btnCheck.addEventListener('click', checkAnswer);
btnHint.addEventListener('click', showHint);
btnReveal.addEventListener('click', revealNow);

// Merke letztes fokussiertes Mehrparteien-Feld
multiGrid.addEventListener('focusin', (e) => {
  const t = e.target;
  if (t && t.matches('input[data-row-index]')) {
    lastMultiIndex = Number(t.dataset.rowIndex || 0);
  }
});

function showHint() {
  if (!active) return;

  if (isMultiSpot(active)) {
    const rows = active.multiRows;
    const i = Math.max(0, Math.min(rows.length - 1, lastMultiIndex));
    lastHintIndex = i;

    // alle verstecken
    multiGrid.querySelectorAll('.multi-hint').forEach(h => { h.hidden = true; h.innerHTML = ''; });

    const el = multiGrid.querySelector(`[data-hint-index="${i}"]`);
    if (!el) return;

    const t = (rows[i].hint || '').trim();
    el.hidden = false;
    el.innerHTML = t ? `<strong>Tipp:</strong> ${escapeHtml(t)}` : '<strong>Tipp:</strong> (Kein Tipp hinterlegt)';
    return;
  }

  const text = (active.hint || '').trim();
  hintBox.hidden = false;
  hintBox.textContent = text ? `Tipp: ${text}` : 'Tipp: (Kein Tipp hinterlegt)';
}

// Auflösen: im Multi-Mode nur das zuletzt angeforderte Tipp-Feld (oder aktuelles Feld)
function revealNow() {
  if (!active) return;

  if (isMultiSpot(active)) {
    const rows = active.multiRows;
    const i = (lastHintIndex !== null) ? lastHintIndex : Math.max(0, Math.min(rows.length - 1, lastMultiIndex));

    const row = rows[i];
    const name = (Array.isArray(row.answers) && row.answers[0]) ? String(row.answers[0]) : '';
    const text = (row.solution || '').trim();
    const comment = (row.revealComment || '').trim();

    const inp = multiGrid.querySelector(`input[data-row-index="${i}"]`);
    if (inp) {
      if (name) inp.value = name;
      inp.classList.remove('wrong');
      inp.classList.add('correct');
      inp.classList.add('revealed');
    }

    if (!multiSolved[active.id]) multiSolved[active.id] = new Array(rows.length).fill(false);
    multiSolved[active.id][i] = true;
 // Optionales Bild zur Lösung (konfigurierbar in data.js: multiRows[].revealImage)
 const imgVal = row.revealImage || '';
 maybeShowRevealImage(imgVal, `${tooltipFor(active)} ${row.label || row.key}`);
    resultBox.hidden = false;
    resultBox.className = 'result';
    resultBox.innerHTML = `🔎 <strong>Aufgelöst:</strong> ${escapeHtml(row.label || '')}<br><br>` +
      (text ? escapeHtml(text) : (name ? escapeHtml(name) : '(kein Name hinterlegt)')) +
      (comment ? `<br><br><em>${escapeHtml(comment)}</em>` : '');

    const correctCount = multiSolved[active.id].filter(Boolean).length;
    if (correctCount === rows.length) {
      solved.add(active.id);
      updateSolvedStyles();
      updateProgress();
      const c = polygonCenterPx(active.polygon);
      pendingCelebration = { x: c.x, y: c.y };
  // Optionales Bild zur Lösung (konfigurierbar in data.js: revealImage)
  maybeShowRevealImage(active.revealImage, tooltipFor(active));
    } else {
      updateSolvedStyles();
      updateProgress();
    }

    return;
  }

  // Single
  // Musterlösung ins Feld schreiben und rot markieren
  const model = (Array.isArray(active.answers) && active.answers[0]) ? String(active.answers[0]) : '';
  if (model) {
    answerInput.value = model;
    answerInput.classList.add('revealed');
  }

  solved.add(active.id);
  updateSolvedStyles();
  updateProgress();

  const reveal = (active.reveal || 'Auflösung: (noch kein Text hinterlegt)').trim();
  const comment = (active.revealComment || '').trim();

  resultBox.hidden = false;
  resultBox.className = 'result';
  resultBox.innerHTML = `${escapeHtml(reveal)}` + (comment ? `<br><br><em>${escapeHtml(comment)}</em>` : '');
 // Optionales Bild zur Lösung (konfigurierbar in data.js: revealImage)
 maybeShowRevealImage(active.revealImage, tooltipFor(active));
}

function checkAnswer() {
  if (!active) return;

  if (isMultiSpot(active)) {
    const rows = active.multiRows;
    if (!multiSolved[active.id]) multiSolved[active.id] = new Array(rows.length).fill(false);

    multiGrid.querySelectorAll('input').forEach(inp => {
      const i = Number(inp.dataset.rowIndex);
      const val = inp.value;

      if (multiSolved[active.id][i]) {
        inp.classList.add('correct');
        inp.classList.remove('revealed');
        inp.classList.remove('wrong');
        return;
      }

      if (!val || !val.trim()) {
        inp.classList.remove('wrong');
        inp.classList.remove('correct');
        return;
      }

      const ok = isCorrect(val, rows[i].answers);
      if (ok) {
        multiSolved[active.id][i] = true;
     // Optionales Bild zur Lösung (konfigurierbar in data.js: multiRows[].revealImage)
     const imgVal = rows[i].revealImage || '';
     maybeShowRevealImage(imgVal, `${tooltipFor(active)} ${rows[i].label || rows[i].key}`);
        inp.classList.add('correct');
        inp.classList.remove('revealed');
        inp.classList.remove('wrong');
      } else {
        inp.classList.add('wrong');
        inp.classList.remove('correct');
      }
    });

    const correctCount = multiSolved[active.id].filter(Boolean).length;
    const allOk = correctCount === rows.length;

    resultBox.hidden = false;

    if (allOk) {
      solved.add(active.id);
      updateSolvedStyles();
      updateProgress();

      const reveal = (active.reveal || 'Auflösung: (noch kein Text hinterlegt)').trim();
      const comment = (active.revealComment || '').trim();

      answerInput.classList.remove('revealed');
    resultBox.className = 'result ok';
      resultBox.innerHTML = `✅ <strong>Richtig!</strong><br><br>${escapeHtml(reveal)}` +
                            (comment ? `<br><br><em>${escapeHtml(comment)}</em>` : '');

      const c = polygonCenterPx(active.polygon);
      pendingCelebration = { x: c.x, y: c.y };
  // Optionales Bild zur Lösung (konfigurierbar in data.js: revealImage)
  maybeShowRevealImage(active.revealImage, tooltipFor(active));
    } else {
      resultBox.className = 'result bad';
      resultBox.innerHTML = `❌ <strong>Noch nicht ganz.</strong><br><br>${correctCount} von ${rows.length} richtig. Nutze <strong>Tipp</strong> oder <strong>Auflösen</strong>.`;
    }

    return;
  }

  const ok = isCorrect(answerInput.value, active.answers);
  resultBox.hidden = false;

  if (ok) {
    solved.add(active.id);
    updateSolvedStyles();
    updateProgress();

    const reveal = (active.reveal || 'Auflösung: (noch kein Text hinterlegt)').trim();
    const comment = (active.revealComment || '').trim();

    resultBox.className = 'result ok';
    resultBox.innerHTML = `✅ <strong>Richtig!</strong><br><br>${escapeHtml(reveal)}` +
                          (comment ? `<br><br><em>${escapeHtml(comment)}</em>` : '');

    const c = polygonCenterPx(active.polygon);
    pendingCelebration = { x: c.x, y: c.y };
  // Optionales Bild zur Lösung (konfigurierbar in data.js: revealImage)
  maybeShowRevealImage(active.revealImage, tooltipFor(active));
  } else {
    resultBox.className = 'result bad';
    resultBox.innerHTML = '❌ <strong>Leider nicht.</strong><br><br>Nutze <strong>Tipp</strong> oder <strong>Auflösen</strong>.';
  }
}




// Hotkey: Direkter Sprung zur Abschluss-Nachricht (ohne Rätsel zu lösen)
// Standard: Strg+Umschalt+F (Windows/Linux) bzw. Ctrl+Shift+F (macOS ebenfalls)
function triggerFinalMessageHotkey() {
 // ggf. offene Dialoge schließen, damit nichts überlagert
 try { if (modalBackdrop && !modalBackdrop.hidden) closeQuiz(); } catch {}
 try { hideImageOverlay(); } catch {}
 // Finale als "erledigt" markieren, damit es nicht mehrfach automatisch startet
 gameCompleted = true;
 showFinalMessage();
}
function checkGameComplete(total) {
  if (gameCompleted) return;
  if (total > 0 && solved.size === total) {
    gameCompleted = true;
    runFinale();
  }
}

function runFinale() {
  // 4 Sekunden Feuerwerk
  const start = performance.now();
  const durationMs = 4000;

  const maxX = img.naturalWidth || 1;
  const maxY = img.naturalHeight || 1;

  const interval = setInterval(() => {
    const now = performance.now();
    const t = now - start;
    if (t >= durationMs) {
      clearInterval(interval);
      showFinalMessage();
      return;
    }

    // zufällige Positionen auf der Karte
    const rx = Math.random() * maxX;
    const ry = Math.random() * maxY;

    // etwas kleinere, schnellere Bursts
    starBurst(rx, ry, { maxFrames: 70, baseLife: 55 });
  }, 260);
}

function showFinalMessage() {
 finalMessageOpen = true;
 // Playlist stoppen (damit nichts parallel läuft)
 if (typeof stopPlaylist === "function") stopPlaylist();
 // Hotspot-Musik beenden
 stopHotspotAudio();

 const text = (typeof FINAL_MESSAGE !== 'undefined' && FINAL_MESSAGE)
  ? String(FINAL_MESSAGE)
  : 'Herzlichen Glückwunsch!';

 // vorhandenes Overlay entfernen
 const old = document.getElementById('finalMessage');
 if (old) old.remove();

 const box = document.createElement('div');
 box.id = 'finalMessage';
 box.setAttribute('role', 'status');
 box.setAttribute('aria-live', 'polite');
 box.style.position = 'fixed';
 box.style.inset = '0';
 box.style.display = 'flex';
 box.style.alignItems = 'center';
 box.style.justifyContent = 'center';
 box.style.background = 'rgba(0,0,0,.55)';
 box.style.zIndex = '10000';
 box.style.padding = '18px';

 const inner = document.createElement('div');
 inner.style.maxWidth = '720px';
 inner.style.width = 'min(720px, 100%)';
 inner.style.background = '#fff';
 inner.style.borderRadius = '14px';
 inner.style.boxShadow = '0 20px 60px rgba(0,0,0,.35)';
 inner.style.padding = '18px 16px';

 const h = document.createElement('h2');
 h.style.margin = '0 0 8px';
 h.textContent = '🎆 Geschafft!';

 const p = document.createElement('p');
 p.style.margin = '0 0 14px';
 p.style.fontSize = '16px';
 p.style.lineHeight = '1.35';
 p.textContent = text;

 const actions = document.createElement('div');
 actions.style.display = 'flex';
 actions.style.gap = '10px';
 actions.style.justifyContent = 'flex-end';
 actions.style.flexWrap = 'wrap';

 // Fallback-Button: wird nur eingeblendet, wenn der Browser Audio blockt
 const btnMusic = document.createElement('button');
 btnMusic.id = 'btnFinalMusicStart';
 btnMusic.type = 'button';
 btnMusic.textContent = '▶ Musik starten';
 btnMusic.className = 'btn secondary';
 btnMusic.hidden = true;
 btnMusic.addEventListener('click', () => {
  finalMessageAudio.muted = audioMuted;
  finalMessageAudio.play().catch(() => {});
  btnMusic.hidden = true;
 });

 const btnClose = document.createElement('button');
 btnClose.type = 'button';
 btnClose.textContent = 'Schließen';
 btnClose.className = 'btn';
 btnClose.addEventListener('click', () => {
  stopFinalMessageAudio();
  finalMessageOpen = false;
  box.remove();
 });

 box.addEventListener('click', (e) => {
  if (e.target === box) {
   stopFinalMessageAudio();
   finalMessageOpen = false;
   box.remove();
  }
 });

 actions.appendChild(btnMusic);
 actions.appendChild(btnClose);

 inner.appendChild(h);
 inner.appendChild(p);
 inner.appendChild(actions);
 box.appendChild(inner);
 document.body.appendChild(box);

 // Musik starten (wenn erlaubt). Bei Block → btnFinalMusicStart wird in playFinalMessageAudio() eingeblendet.
 playFinalMessageAudio();
}
function polygonCenterPx(poly) {
  const pts = normToPx(poly);
  let x = 0, y = 0;
  for (const p of pts) { x += p[0]; y += p[1]; }
  return { x: x / pts.length, y: y / pts.length };
}

function resizeFx() {
  const rect = img.getBoundingClientRect();
  fxCanvas.width = Math.floor(rect.width * devicePixelRatio);
  fxCanvas.height = Math.floor(rect.height * devicePixelRatio);
}

window.addEventListener('resize', resizeFx);

function runCelebration(pxX, pxY) {
  starBurst(pxX, pxY, { maxFrames: 110, baseLife: 70 });
  setTimeout(() => starBurst(pxX, pxY, { maxFrames: 110, baseLife: 70 }), 450);
}

function starBurst(pxX, pxY, opts = {}) {
  const rect = img.getBoundingClientRect();
  const scaleX = (rect.width * devicePixelRatio) / (img.naturalWidth || 1);
  const scaleY = (rect.height * devicePixelRatio) / (img.naturalHeight || 1);

  const x = pxX * scaleX;
  const y = pxY * scaleY;

  const ctx = fxCanvas.getContext('2d');
  const parts = [];
  const n = 40;

  const maxFrames = opts.maxFrames ?? 110;
  const baseLife = opts.baseLife ?? 70;

  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n;
    const sp = 2.2 + Math.random() * 3.8;
    parts.push({
      x, y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,
      life: (baseLife - 10) + Math.random() * 25,
      size: 4 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.2
    });
  }

  let frame = 0;
  function tick() {
    frame++;
    ctx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);

    for (const p of parts) {
      p.life--;
      p.vy += 0.055;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      const alpha = Math.max(0, Math.min(1, p.life / baseLife));
      drawStar(ctx, p.x, p.y, p.size, p.rot, alpha);
    }

    if (parts.some(p => p.life > 0) && frame < maxFrames) {
      requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
    }
  }
  tick();
}

function drawStar(ctx, x, y, r, rot, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = 'rgba(245,158,11,1)';

  ctx.beginPath();
  const spikes = 5;
  const outer = r;
  const inner = r * 0.45;

  for (let i = 0; i < spikes * 2; i++) {
    const ang = (Math.PI / spikes) * i;
    const rad = (i % 2 === 0) ? outer : inner;
    ctx.lineTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
  }

  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Drag & Drop
let dragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

function getModalRect() { return quizModal.getBoundingClientRect(); }

function startDrag(e) {
  if (modalBackdrop.hidden) return;
  dragging = true;

  const r = getModalRect();
  dragOffsetX = e.clientX - r.left;
  dragOffsetY = e.clientY - r.top;

  quizModal.style.transform = 'none';
  quizModal.style.left = `${r.left}px`;
  quizModal.style.top = `${r.top}px`;

  modalHeader.setPointerCapture?.(e.pointerId);
}

function moveDrag(e) {
  if (!dragging) return;

  const maxLeft = window.innerWidth - 40;
  const maxTop = window.innerHeight - 40;

  const left = Math.min(maxLeft, Math.max(0, e.clientX - dragOffsetX));
  const top = Math.min(maxTop, Math.max(0, e.clientY - dragOffsetY));

  quizModal.style.left = `${left}px`;
  quizModal.style.top = `${top}px`;
 repositionImageOverlay();
}

function endDrag() { dragging = false; }

modalHeader.addEventListener('pointerdown', (e) => {
  // Klick auf Buttons (z.B. X) soll NICHT das Draggen starten
  if (e.target.closest('button')) return;
  startDrag(e);
});
window.addEventListener('pointermove', moveDrag);
window.addEventListener('pointerup', endDrag);

function resetModalIfOffscreen() {
  const r = getModalRect();
  const off = (r.right < 50) || (r.left > window.innerWidth - 50) || (r.bottom < 50) || (r.top > window.innerHeight - 50);
  if (off) {
    quizModal.style.left = '50%';
    quizModal.style.top = '12%';
    quizModal.style.transform = 'translateX(-50%)';
  }
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}








// --- Bild-Overlay (z.B. Haus 11 / EG) ---
function hideImageOverlay() {
  const el = document.getElementById('imgOverlay');
  if (el) el.remove();
}

function repositionImageOverlay() {
 const overlay = document.getElementById('imgOverlay');
 if (!overlay || overlay.dataset.followModal !== '1' || !quizModal) return;
 const r = quizModal.getBoundingClientRect();
 const ow = overlay.offsetWidth || 360;
 const oh = overlay.offsetHeight || 240;
 const gap = 12;

 const preferBelow = (Number(overlay.dataset.aspect || 0) >= 1.6) || overlay.dataset.prefer === "below";
 let left = r.right + gap;
 let top = r.top;

 // sehr breite Bilder lieber unter dem Modal anzeigen (damit sie größer wirken)
 if (preferBelow) {
  left = Math.max(8, Math.min(window.innerWidth - ow - 8, r.left + (r.width - ow) / 2));
  top = r.bottom + gap;
 }
 if (left + ow > window.innerWidth - 8) {
   left = r.left - gap - ow;
 }
 if (left < 8) {
   left = Math.max(8, Math.min(window.innerWidth - ow - 8, r.left + (r.width - ow) / 2));
   top = r.bottom + gap;
 }
 top = Math.max(8, Math.min(window.innerHeight - oh - 8, top));
 overlay.style.left = `${left}px`;
 overlay.style.top = `${top}px`;
}

function showImageOverlay(src, altText = 'Bild') {
 hideImageOverlay();

 // Bild-Popup neben oder unter dem Fragedialog.
 const overlay = document.createElement('div');
 overlay.id = 'imgOverlay';
 overlay.setAttribute('role', 'dialog');
 overlay.setAttribute('aria-modal', 'false');
 overlay.dataset.followModal = '1';

 // Inline-Styles (keine CSS-Datei nötig)
 overlay.style.position = 'fixed';
 overlay.style.zIndex = '10001';
 overlay.style.background = 'rgba(17,24,39,.92)';
 overlay.style.padding = '10px';
 overlay.style.borderRadius = '14px';
 overlay.style.boxShadow = '0 20px 60px rgba(0,0,0,.35)';
 overlay.style.maxWidth = 'min(520px, 46vw)';
 overlay.style.maxHeight = 'min(82vh, 640px)';
 overlay.style.display = 'flex';
 overlay.style.flexDirection = 'column';
 overlay.style.gap = '8px';

 const topRow = document.createElement('div');
 topRow.style.display = 'flex';
 topRow.style.justifyContent = 'flex-end';

 const btn = document.createElement('button');
 btn.type = 'button';
 btn.setAttribute('aria-label', 'Schließen');
 btn.textContent = '×';
 btn.style.border = '0';
 btn.style.background = '#fff';
 btn.style.color = '#111827';
 btn.style.width = '34px';
 btn.style.height = '34px';
 btn.style.borderRadius = '999px';
 btn.style.fontSize = '20px';
 btn.style.cursor = 'pointer';
 btn.style.boxShadow = '0 10px 25px rgba(0,0,0,.25)';
 btn.addEventListener('click', hideImageOverlay);

 const imgEl = document.createElement('img');
 imgEl.src = src;
 imgEl.alt = altText;
 imgEl.style.display = 'block';
 imgEl.style.width = '100%';
 imgEl.style.height = 'auto';
 imgEl.style.maxHeight = 'calc(82vh - 70px)';
 imgEl.style.borderRadius = '10px';
 imgEl.style.background = '#000';
 imgEl.style.objectFit = 'contain';

 // Bildverhältnis merken (für Positionierung/Layout)
 imgEl.addEventListener('load', () => {
   const a = (imgEl.naturalHeight ? (imgEl.naturalWidth / imgEl.naturalHeight) : 0);
   overlay.dataset.aspect = String(a);
   // Sehr breite Bilder: lieber unter dem Modal und größer anzeigen
   if (a >= 1.6) {
     overlay.dataset.prefer = 'below';
     overlay.style.maxWidth = 'min(920px, 80vw)';
     overlay.style.maxHeight = 'min(72vh, 680px)';
     imgEl.style.maxHeight = 'calc(72vh - 70px)';
   }
   repositionImageOverlay();
 });

 topRow.appendChild(btn);
 overlay.appendChild(topRow);
 overlay.appendChild(imgEl);
 document.body.appendChild(overlay);

 // initial position
 repositionImageOverlay();

 // Reposition bei Resize
 window.addEventListener('resize', repositionImageOverlay, { passive: true });

 // Schließen mit ESC
 const onKey = (e) => {
   if (e.key === 'Escape') {
     hideImageOverlay();
     document.removeEventListener('keydown', onKey);
     window.removeEventListener('resize', repositionImageOverlay);
   }
 };
 document.addEventListener('keydown', onKey);
}



// --- Mobile: Pinch-Zoom & Verschieben der Karte (Bild + Hotspots bleiben synchron) ---
let panZoomState = { scale: 1, tx: 0, ty: 0 };

function applyPanZoom() {
 if (!mapInner) return;
 mapInner.style.transform = `translate(${panZoomState.tx}px, ${panZoomState.ty}px) scale(${panZoomState.scale})`;
}

function clampPanZoom() {
 if (!mapWrap || !img) return;
 const wrapRect = mapWrap.getBoundingClientRect();
 const imgRect = img.getBoundingClientRect();
 // imgRect ist bereits transformiert. Basisgröße = aktuelle Größe / scale
 const baseW = imgRect.width / (panZoomState.scale || 1);
 const baseH = imgRect.height / (panZoomState.scale || 1);
 const scaledW = baseW * panZoomState.scale;
 const scaledH = baseH * panZoomState.scale;

 // X clamp
 if (scaledW <= wrapRect.width) {
  panZoomState.tx = (wrapRect.width - scaledW) / 2;
 } else {
  const minTx = wrapRect.width - scaledW;
  const maxTx = 0;
  panZoomState.tx = Math.min(maxTx, Math.max(minTx, panZoomState.tx));
 }
 // Y clamp
 if (scaledH <= wrapRect.height) {
  panZoomState.ty = (wrapRect.height - scaledH) / 2;
 } else {
  const minTy = wrapRect.height - scaledH;
  const maxTy = 0;
  panZoomState.ty = Math.min(maxTy, Math.max(minTy, panZoomState.ty));
 }
}

function initPanZoom() {
 if (!isTouchDevice || !mapWrap || !mapInner) return;

 // Startzustand zentrieren
 panZoomState = { scale: 1, tx: 0, ty: 0 };
 clampPanZoom();
 applyPanZoom();

 const pointers = new Map();
 let mode = 'none'; // 'pan' | 'pinch'
 let start = null;
 let lastTap = 0;

 const getLocal = (clientX, clientY) => {
  const r = mapWrap.getBoundingClientRect();
  return { x: clientX - r.left, y: clientY - r.top };
 };

 const startPan = (p) => {
  mode = 'pan';
  start = { x: p.x, y: p.y, tx: panZoomState.tx, ty: panZoomState.ty };
 };

 const startPinch = () => {
  mode = 'pinch';
  const pts = Array.from(pointers.values());
  const a = pts[0], b = pts[1];
  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  // Punkt im Kartenkoordinatensystem unter dem Midpoint merken
  const mapX = (mid.x - panZoomState.tx) / panZoomState.scale;
  const mapY = (mid.y - panZoomState.ty) / panZoomState.scale;
  start = { mid, dist, scale: panZoomState.scale, mapX, mapY };
 };

 const onPointerDown = (e) => {
  if (e.pointerType !== 'touch') return;
  // Doppeltipp zum Zoomen (optional, sehr praktisch)
  const now = Date.now();
  if (pointers.size === 0 && (now - lastTap) < 280) {
   const p = getLocal(e.clientX, e.clientY);
   const nextScale = (panZoomState.scale < 1.4) ? 2 : 1;
   // Zoom um Tap-Punkt
   const mapX = (p.x - panZoomState.tx) / panZoomState.scale;
   const mapY = (p.y - panZoomState.ty) / panZoomState.scale;
   panZoomState.scale = nextScale;
   panZoomState.tx = p.x - mapX * nextScale;
   panZoomState.ty = p.y - mapY * nextScale;
   clampPanZoom();
   applyPanZoom();
   lastTap = 0;
   return;
  }
  lastTap = now;

  mapWrap.setPointerCapture?.(e.pointerId);
  pointers.set(e.pointerId, getLocal(e.clientX, e.clientY));
  if (pointers.size === 1) {
   startPan(pointers.get(e.pointerId));
  } else if (pointers.size === 2) {
   startPinch();
  }
 };

 const onPointerMove = (e) => {
  if (e.pointerType !== 'touch') return;
  if (!pointers.has(e.pointerId)) return;
  pointers.set(e.pointerId, getLocal(e.clientX, e.clientY));

  if (pointers.size === 1 && mode === 'pan' && start) {
   const p = pointers.get(e.pointerId);
   const dx = p.x - start.x;
   const dy = p.y - start.y;
   panZoomState.tx = start.tx + dx;
   panZoomState.ty = start.ty + dy;
   clampPanZoom();
   applyPanZoom();
   return;
  }

  if (pointers.size === 2) {
   if (mode !== 'pinch' || !start) startPinch();
   const pts = Array.from(pointers.values());
   const a = pts[0], b = pts[1];
   const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
   const dx = b.x - a.x;
   const dy = b.y - a.y;
   const dist = Math.hypot(dx, dy) || 1;
   let newScale = start.scale * (dist / start.dist);
   newScale = Math.max(1, Math.min(4, newScale));
   panZoomState.scale = newScale;
   panZoomState.tx = mid.x - start.mapX * newScale;
   panZoomState.ty = mid.y - start.mapY * newScale;
   clampPanZoom();
   applyPanZoom();
  }
 };

 const onPointerUp = (e) => {
  if (e.pointerType !== 'touch') return;
  pointers.delete(e.pointerId);
  if (pointers.size === 1) {
   // zurück zu Pan
   const remaining = Array.from(pointers.values())[0];
   startPan(remaining);
  } else if (pointers.size === 0) {
   mode = 'none';
   start = null;
  }
 };

 mapWrap.addEventListener('pointerdown', onPointerDown, { passive: true });
 mapWrap.addEventListener('pointermove', onPointerMove, { passive: true });
 mapWrap.addEventListener('pointerup', onPointerUp, { passive: true });
 mapWrap.addEventListener('pointercancel', onPointerUp, { passive: true });

 // bei Resize neu clampen
 window.addEventListener('resize', () => { clampPanZoom(); applyPanZoom(); }, { passive: true });
}
function init() {
  closeQuiz();
  setSvgViewBox();
  resizeFx();
  render();
 initPanZoom();
  closeQuiz();
}

document.addEventListener('DOMContentLoaded', () => init());
img.addEventListener('load', () => init());
img.addEventListener('error', () => init());
