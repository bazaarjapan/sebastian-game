/* ============================================================
   SEBASTIAN — 真夜中の薔薇館
   Game Engine
   ============================================================ */

const State = {
  current: 'start',
  affection: 0,
  chapter: 1,
  typing: false,
  awaiting: false,
  fullText: '',
};

const SAVE_KEY = 'sebastian_save_v1';

const ENDINGS = {
  // affection >= 8 → true
  // affection >= 4 → normal
  // affection >= 0 → bittersweet
  // affection <  0 → bad
  true:{
    title:'TRUE END',
    sub:'― 永遠の薔薇 ―',
    bg:IMG.end_true_roses,
    bgm:'bgm3',
    text:`月光の中、二人の唇が触れた瞬間――茨は薔薇となり、塔を覆い尽くした。<br><br>
"お嬢様。いえ……愛しい人よ。<br>
この生涯、私の手袋は、あなたのためだけに白くあり続けます。"<br><br>
呪いは解かれた。<br>
ヴァルディア家には、新しい伝説が生まれた――真実の愛で蘇った執事と、彼を救った娘の物語が。`,
  },
  normal:{
    title:'NORMAL END',
    sub:'― 半身の絆 ―',
    bg:IMG.end_normal_bell,
    bgm:'bgm1',
    text:`呪いは半分だけ解け、セバスチャンは「半身」のまま、館に留まることを選んだ。<br><br>
"私と共に、この館で生きてくださいますか。<br>
不完全な男ではございますが――。"<br><br>
あなたは黙って、彼の胸に額を寄せた。<br>
完全ではない愛もまた、愛である。<br>
館の鐘は、二人だけのために鳴り続けた。`,
  },
  bitter:{
    title:'BITTERSWEET END',
    sub:'― 別離の手袋 ―',
    bg:IMG.end_bitter_carriage_glove,
    bgm:'bgm4',
    text:`あなたは口づけることができなかった。<br>
セバスチャンは静かに微笑み、白手袋を差し出した。<br><br>
"これは、私の心の代わりにございます。<br>
忘れた頃、夢の中ででも、思い出してくださいませ。"<br><br>
翌朝、馬車に揺られながら、あなたは膝の上の手袋を握りしめた。<br>
霧に消える館を、もう、振り返らなかった。`,
  },
  bad:{
    title:'BAD END',
    sub:'― 鏡の中の薔薇 ―',
    bg:IMG.end_bad_black_rose_ash,
    bgm:'bgm4',
    text:`塔の扉が、音もなく閉じた。<br>
振り返ったとき、そこにはもう、誰もいなかった。<br><br>
ただ一輪――黒い薔薇が、床に落ちていた。<br>
拾い上げた瞬間、薔薇は灰となって崩れた。<br><br>
あなたは生涯、夢の中で、知らない男の声を聞き続けることになる。<br>
"……お嬢様。あなたを、お待ちしておりました――"`,
  },
};

/* ============================================================
   Music Manager — crossfading BGM
   ============================================================ */
const Music = (()=>{
  const tracks = {};
  let current = null;       // 'bgm1'...'bgm6' | null
  let muted   = localStorage.getItem('sebastian_muted') === '1';
  const TARGET_VOLUME = 0.55;
  const FADE_MS = 1200;

  function init(){
    ['bgm1','bgm2','bgm3','bgm4','bgm5','bgm6'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) tracks[id] = el;
    });
    Object.values(tracks).forEach(t=>{
      t.volume = 0;
      t.loop = true;
    });
    updateButton();
  }

  function fadeTo(audioEl, targetVol, durMs){
    if(!audioEl) return;
    if(audioEl._fadeTimer) clearInterval(audioEl._fadeTimer);
    const startVol = audioEl.volume;
    const startTime = performance.now();
    audioEl._fadeTimer = setInterval(()=>{
      const t = Math.min(1, (performance.now()-startTime)/durMs);
      audioEl.volume = startVol + (targetVol-startVol)*t;
      if(t>=1){
        clearInterval(audioEl._fadeTimer);
        audioEl._fadeTimer = null;
        if(targetVol === 0){
          try{ audioEl.pause(); audioEl.currentTime = 0; }catch(e){}
        }
      }
    }, 40);
  }

  function play(trackName){
    if(!tracks[trackName]) return;
    if(current === trackName){
      // already playing — ensure volume is right
      if(!muted) fadeTo(tracks[trackName], TARGET_VOLUME, 600);
      return;
    }
    // fade out current
    if(current && tracks[current]){
      fadeTo(tracks[current], 0, FADE_MS);
    }
    // fade in new
    const next = tracks[trackName];
    next.volume = 0;
    if(!muted){
      const p = next.play();
      if(p && p.catch) p.catch(()=>{ /* autoplay blocked — will retry on user gesture */ });
      fadeTo(next, TARGET_VOLUME, FADE_MS);
    }
    current = trackName;
  }

  function stop(){
    if(current && tracks[current]) fadeTo(tracks[current], 0, 600);
    current = null;
  }

  function toggleMute(){
    muted = !muted;
    localStorage.setItem('sebastian_muted', muted ? '1' : '0');
    if(muted){
      Object.values(tracks).forEach(t=>{
        if(t._fadeTimer){ clearInterval(t._fadeTimer); t._fadeTimer = null; }
        t.volume = 0;
        try{ t.pause(); }catch(e){}
      });
    }else if(current){
      const t = tracks[current];
      const p = t.play();
      if(p && p.catch) p.catch(()=>{});
      fadeTo(t, TARGET_VOLUME, 800);
    }
    updateButton();
  }

  function updateButton(){
    document.querySelectorAll('#muteBtn, #muteBtnInline').forEach(btn=>{
      btn.classList.toggle('muted', muted);
      btn.title = muted ? 'BGM OFF (クリックでON)' : 'BGM ON (クリックでOFF)';
    });
  }

  function isMuted(){ return muted; }

  function getCurrent(){ return current; }

  return { init, play, stop, toggleMute, isMuted, getCurrent };
})();

/* ============================================================
   SFX — synthesized via Web Audio API (no audio files needed)
   Shares mute state with BGM.
   ============================================================ */
const Sfx = (()=>{
  let ctx = null;
  let lastTick = 0;
  const TICK_MIN_MS = 38;        // throttle: max ~26 ticks/sec
  const TICK_VOLUME = 0.045;     // subtle
  const CHOICE_VOLUME = 0.08;

  function ensure(){
    if(!ctx){
      try{
        ctx = new (window.AudioContext || window.webkitAudioContext)();
      }catch(e){ return null; }
    }
    if(ctx.state === 'suspended'){ ctx.resume().catch(()=>{}); }
    return ctx;
  }

  function tick(){
    if(Music.isMuted()) return;
    const c = ensure(); if(!c) return;
    const now = performance.now();
    if(now - lastTick < TICK_MIN_MS) return;
    lastTick = now;

    // Soft "quill on parchment" tick — triangle wave, short decay
    const osc = c.createOscillator();
    const gain = c.createGain();
    const t = c.currentTime;
    osc.type = 'triangle';
    const baseFreq = 720 + Math.random()*240;
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(baseFreq*0.55, t + 0.05);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(TICK_VOLUME, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);

    osc.connect(gain).connect(c.destination);
    osc.start(t);
    osc.stop(t + 0.09);
  }

  function choose(){
    if(Music.isMuted()) return;
    const c = ensure(); if(!c) return;
    // Soft rising chime — sine wave with pitch glide
    const osc = c.createOscillator();
    const gain = c.createGain();
    const t = c.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(660, t);
    osc.frequency.exponentialRampToValueAtTime(990, t + 0.12);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(CHOICE_VOLUME, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
    osc.connect(gain).connect(c.destination);
    osc.start(t);
    osc.stop(t + 0.34);
  }

  function heart(){
    if(Music.isMuted()) return;
    const c = ensure(); if(!c) return;
    // Two-note heart chime for affection gain
    [880, 1320].forEach((freq, i)=>{
      const osc = c.createOscillator();
      const gain = c.createGain();
      const t = c.currentTime + i*0.08;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      osc.connect(gain).connect(c.destination);
      osc.start(t);
      osc.stop(t + 0.42);
    });
  }

  return { ensure, tick, choose, heart };
})();

/* ============================================================
   Screen Switching
   ============================================================ */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const el = document.getElementById(id);
  el.classList.add('active');
  applyDeferredBackgrounds(el);
  el.classList.remove('fade-in');
  void el.offsetWidth; // restart animation
  el.classList.add('fade-in');

  // Floating mute button: visible everywhere EXCEPT on game screen
  // (the game screen has its own inline mute button in the HUD pill)
  const floatBtn = document.getElementById('muteBtn');
  if(floatBtn){
    if(id === 'game') floatBtn.classList.remove('show');
    else floatBtn.classList.add('show');
  }
}

function applyDeferredBackgrounds(root){
  root.querySelectorAll('[data-bg]').forEach(el=>{
    if(el.dataset.loadedBg === el.dataset.bg) return;
    el.style.backgroundImage = `url('${el.dataset.bg}')`;
    el.dataset.loadedBg = el.dataset.bg;
  });
}

/* ============================================================
   Auto-fade HUD on idle (mouse inactivity)
   ============================================================ */
const HUD_IDLE_MS = 2500;
let hudIdleTimer = null;
function bumpHud(){
  const hud = document.getElementById('hud');
  if(!hud) return;
  hud.classList.remove('idle');
  if(hudIdleTimer) clearTimeout(hudIdleTimer);
  hudIdleTimer = setTimeout(()=>{
    // only fade when game screen is active
    if(document.getElementById('game').classList.contains('active')){
      hud.classList.add('idle');
    }
  }, HUD_IDLE_MS);
}
['mousemove','mousedown','touchstart','keydown'].forEach(ev=>{
  document.addEventListener(ev, bumpHud, {passive:true});
});

/* ============================================================
   Opening
   ============================================================ */
const openingVideo = document.getElementById('openingVideo');
const startVideoBtn = document.getElementById('startVideoBtn');
const skipBtn = document.getElementById('skipBtn');

startVideoBtn.addEventListener('click', ()=>{
  Sfx.ensure();
  startVideoBtn.classList.add('hidden');
  openingVideo.muted = false;
  openingVideo.volume = 1.0;
  openingVideo.currentTime = 0;
  const p = openingVideo.play();
  if(p && p.catch){
    p.catch(()=>{
      // sound playback rejected → fall back to muted
      openingVideo.muted = true;
      openingVideo.play();
    });
  }
});

openingVideo.addEventListener('ended', ()=>goToTitle());
skipBtn.addEventListener('click', ()=>{
  Sfx.ensure();
  try{ openingVideo.pause(); }catch(e){}
  goToTitle();
});

function goToTitle(){
  showScreen('title');
  spawnPetals('title', 6);
  Music.play('bgm5');
}

/* ============================================================
   Title Menu
   ============================================================ */
document.querySelectorAll('.title-btn[data-action]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    Sfx.ensure();
    Sfx.choose();
    const action = btn.dataset.action;
    if(action==='start') startNewGame();
    else if(action==='continue') loadGame();
    else if(action==='credits'){
      showScreen('credits');
      Music.play('bgm6');
    }
  });
});

document.getElementById('creditBack').addEventListener('click', ()=>{
  showScreen('title');
  Music.play('bgm5');
});

function startNewGame(){
  State.current = 'start';
  State.affection = 0;
  State.chapter = 1;
  showScreen('game');
  updateHUD();
  renderScene(State.current);
  spawnPetals('game', 4);
  Music.play('bgm1');
}

/* ============================================================
   Save / Load
   ============================================================ */
function saveGame(){
  try{
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      current:State.current,
      affection:State.affection,
      chapter:State.chapter,
      bgm:Music.getCurrent(),
    }));
    flashMessage('セーブしました');
  }catch(e){alert('セーブに失敗しました');}
}
function loadGame(){
  try{
    const data = JSON.parse(localStorage.getItem(SAVE_KEY));
    if(!data){alert('セーブデータが見つかりません');return;}
    State.current = data.current;
    State.affection = data.affection;
    State.chapter = data.chapter;
    showScreen('game');
    updateHUD();
    // Restore BGM before rendering so the track is already playing as the
    // scene fades in (renderScene only switches BGM if the scene declares one).
    Music.play(data.bgm || 'bgm1');
    renderScene(State.current);
  }catch(e){alert('ロードに失敗しました');}
}

function flashMessage(msg){
  const m = document.createElement('div');
  m.textContent = msg;
  m.style.cssText = `
    position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
    z-index:200;padding:18px 40px;
    background:rgba(0,0,0,.85);border:1px solid var(--gold);
    color:var(--gold);font-family:'Cinzel',serif;letter-spacing:.3em;
    pointer-events:none;animation:fadeIn .3s,fadeOut .5s 1s forwards;
  `;
  document.getElementById('game').appendChild(m);
  setTimeout(()=>m.remove(), 1800);
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes fadeOut{to{opacity:0;}}`;
document.head.appendChild(styleSheet);

/* ============================================================
   HUD
   ============================================================ */
function updateHUD(){
  document.getElementById('chapterNum').textContent = State.chapter;
  document.getElementById('affectionVal').textContent = State.affection;
  // affection bar fill — display range -5..+10 → 0..100%
  const pct = Math.max(0, Math.min(100, ((State.affection + 5) / 15) * 100));
  document.getElementById('affectionFill').style.width = pct + '%';
}

/* ============================================================
   Scene Renderer
   ============================================================ */
const $bg = document.getElementById('bg');
const $character = document.getElementById('character');
const $speaker = document.getElementById('speakerName');
const $text = document.getElementById('dialogueText');
const $choices = document.getElementById('choices');
const $continue = document.getElementById('continueIndicator');
const $heartbeat = document.getElementById('heartbeat');
const $flash = document.getElementById('flash');

function renderScene(id){
  // Special handling for ending_branch
  if(id === 'ending_branch'){
    routeToEnding();
    return;
  }
  const scene = SCENES[id];
  if(!scene){ console.warn('Scene not found:', id); return; }

  if(scene.chapter){
    State.chapter = scene.chapter;
  }
  State.current = id;

  // BGM switch (only when scene declares it)
  if(scene.bgm){
    Music.play(scene.bgm);
  }

  // background
  if(scene.bg){
    if($bg.dataset.src !== scene.bg){
      $bg.style.backgroundImage = `url('${scene.bg}')`;
      $bg.dataset.src = scene.bg;
      $bg.classList.remove('zoom-in');
      void $bg.offsetWidth;
      $bg.classList.add('zoom-in');
    }
  }

  // character
  if(scene.character === null){
    $character.classList.remove('show');
  }else if(scene.character){
    if($character.dataset.src !== scene.character){
      $character.style.backgroundImage = `url('${scene.character}')`;
      $character.dataset.src = scene.character;
      $character.classList.remove('show');
      void $character.offsetWidth;
      $character.classList.add('show');
    }else{
      $character.classList.add('show');
    }
  }

  // effects
  applyEffects(scene.effect || '');

  // dialogue
  $speaker.textContent = scene.speaker || '';
  $continue.classList.remove('show');
  $choices.classList.remove('show');
  $choices.innerHTML = '';

  typeText(scene.text || '', ()=>{
    if(scene.choices){
      showChoices(scene.choices);
    }else{
      $continue.classList.add('show');
      State.awaiting = true;
    }
  });

  updateHUD();
}

/* ============================================================
   Typewriter Effect
   ============================================================ */
function typeText(html, onDone){
  State.typing = true;
  State.fullText = html;
  $text.innerHTML = '';

  // We render html safely by parsing into a fragment and walking nodes.
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  // Build flat list of {parent, text, isHTML} segments
  // Simpler approach: animate characters of plain text, instantly insert tags.
  const fragments = [];
  function walk(node, parent){
    if(node.nodeType === Node.TEXT_NODE){
      fragments.push({type:'text', text:node.textContent, parent});
    }else if(node.nodeType === Node.ELEMENT_NODE){
      const clone = node.cloneNode(false);
      parent.appendChild(clone);
      node.childNodes.forEach(c=>walk(c, clone));
    }
  }
  // Pre-build skeleton (so opening tags appear), but with empty texts; we'll fill in.
  // For each text node we'll progressively reveal characters.

  // Simpler: replace all text nodes with empty spans, then animate.
  const liveContainer = document.createElement('div');
  liveContainer.style.display = 'inline';
  $text.appendChild(liveContainer);

  // Build a structure mapping
  const textTargets = [];
  function buildSkeleton(srcNode, dstParent){
    srcNode.childNodes.forEach(child=>{
      if(child.nodeType === Node.TEXT_NODE){
        const span = document.createElement('span');
        dstParent.appendChild(span);
        textTargets.push({el:span, text:child.textContent});
      }else if(child.nodeType === Node.ELEMENT_NODE){
        const clone = child.cloneNode(false);
        dstParent.appendChild(clone);
        buildSkeleton(child, clone);
      }
    });
  }
  buildSkeleton(tmp, liveContainer);

  let targetIdx = 0;
  let charIdx = 0;
  const speed = 28; // ms per char

  function step(){
    if(!State.typing){
      // skipped — show full text
      textTargets.forEach(t=>t.el.textContent = t.text);
      State.typing = false;
      onDone && onDone();
      return;
    }
    if(targetIdx >= textTargets.length){
      State.typing = false;
      onDone && onDone();
      return;
    }
    const t = textTargets[targetIdx];
    if(charIdx < t.text.length){
      const ch = t.text[charIdx];
      t.el.textContent += ch;
      charIdx++;
      // play tick on visible characters (skip whitespace and ellipsis)
      if(!/[\s　…・「」『』()()【】]/.test(ch)) Sfx.tick();
      // small delay variations on punctuation
      let delay = speed;
      if(/[、。!?…]/.test(ch)) delay = 220;
      else if(/[　\s]/.test(ch)) delay = 60;
      setTimeout(step, delay);
    }else{
      targetIdx++;
      charIdx = 0;
      step();
    }
  }
  step();
}

function skipTyping(){
  if(State.typing){
    State.typing = false;
  }
}

/* ============================================================
   Choices
   ============================================================ */
function showChoices(choices){
  $choices.innerHTML = '';
  choices.forEach((c,i)=>{
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = c.text;
    btn.style.animationDelay = (i*0.1)+'s';
    btn.addEventListener('click', ()=>{
      Sfx.choose();
      if(c.affection){
        State.affection = Math.max(-10, Math.min(10, State.affection + c.affection));
        updateHUD();
        showAffectionFloat(c.affection);
        if(c.affection > 0) setTimeout(()=>Sfx.heart(), 120);
      }
      $choices.classList.remove('show');
      renderScene(c.next);
    });
    $choices.appendChild(btn);
  });
  $choices.classList.add('show');
}

function showAffectionFloat(delta){
  const el = document.createElement('div');
  el.textContent = (delta>0?'♥ +':'♥ ') + delta;
  el.style.cssText = `
    position:absolute;top:60px;left:50%;transform:translateX(-50%);
    color:${delta>0?'#ff8fa3':'#888'};
    font-family:'Cinzel',serif;font-size:22px;font-weight:600;
    letter-spacing:.2em;
    text-shadow:0 0 12px ${delta>0?'rgba(255,143,163,.7)':'rgba(120,120,120,.5)'};
    z-index:30;pointer-events:none;
    animation:floatUp 1.6s ease-out forwards;
  `;
  document.getElementById('game').appendChild(el);
  setTimeout(()=>el.remove(), 1600);
}
const floatStyle = document.createElement('style');
floatStyle.textContent = `
@keyframes floatUp{
  0%{opacity:0;transform:translate(-50%,20px) scale(.8);}
  20%{opacity:1;transform:translate(-50%,0) scale(1.1);}
  80%{opacity:1;}
  100%{opacity:0;transform:translate(-50%,-40px) scale(1);}
}`;
document.head.appendChild(floatStyle);

/* ============================================================
   Effects
   ============================================================ */
function applyEffects(effect){
  // shake
  if(/shake/.test(effect)){
    $character.classList.remove('shake');
    void $character.offsetWidth;
    $character.classList.add('shake');
  }
  // flash
  if(/flash/.test(effect)){
    $flash.classList.remove('flash');
    void $flash.offsetWidth;
    $flash.classList.add('flash');
  }
  // heartbeat
  if(/heartbeat-start/.test(effect)){
    $heartbeat.classList.add('show');
  }
  if(/heartbeat-stop/.test(effect)){
    $heartbeat.classList.remove('show');
  }
}

/* ============================================================
   Click / Input Handling
   ============================================================ */
document.getElementById('dialogueBox').addEventListener('click', advance);
document.addEventListener('keydown', (e)=>{
  if(document.getElementById('game').classList.contains('active')){
    if(e.code === 'Space' || e.code === 'Enter'){
      e.preventDefault();
      advance();
    }
  }
});

function advance(){
  if(State.typing){
    skipTyping();
    return;
  }
  if(!State.awaiting) return;
  const scene = SCENES[State.current];
  if(scene && scene.next){
    State.awaiting = false;
    renderScene(scene.next);
  }
}

/* ============================================================
   Menu
   ============================================================ */
document.getElementById('menuBtn').addEventListener('click', ()=>{
  document.getElementById('menuModal').classList.add('show');
});
document.querySelectorAll('.modal-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const action = btn.dataset.menu;
    document.getElementById('menuModal').classList.remove('show');
    if(action==='resume') return;
    if(action==='save') saveGame();
    if(action==='load') loadGame();
    if(action==='title'){
      if(confirm('タイトル画面に戻りますか? 未セーブの進行は失われます。')){
        showScreen('title');
        Music.play('bgm5');
      }
    }
  });
});

/* ============================================================
   Endings
   ============================================================ */
function routeToEnding(){
  let ending;
  const a = State.affection;
  if(a >= 8) ending = ENDINGS.true;
  else if(a >= 4) ending = ENDINGS.normal;
  else if(a >= 0) ending = ENDINGS.bitter;
  else ending = ENDINGS.bad;

  if(ending.bgm) Music.play(ending.bgm);
  document.getElementById('endingBg').style.backgroundImage = `url('${ending.bg}')`;
  document.getElementById('endingTitle').innerHTML =
    `${ending.title}<br><span style="font-size:.5em;font-family:'Shippori Mincho',serif;letter-spacing:.4em;color:var(--gold-soft);">${ending.sub}</span>`;
  document.getElementById('endingText').innerHTML = ending.text;
  document.getElementById('finalAffection').textContent = State.affection;

  // stop heartbeat
  $heartbeat.classList.remove('show');

  showScreen('ending');
  spawnPetals('ending', 8);
}

document.getElementById('restartBtn').addEventListener('click', startNewGame);
document.getElementById('toTitleBtn').addEventListener('click', ()=>{
  showScreen('title');
  Music.play('bgm5');
});

/* ============================================================
   Floating petals
   ============================================================ */
function spawnPetals(parentId, count){
  const parent = document.getElementById(parentId);
  if(!parent) return;
  const PETALS = ['❀','❁','✿','❀'];
  // continuous spawning
  if(parent._petalTimer) clearInterval(parent._petalTimer);
  parent._petalTimer = setInterval(()=>{
    if(!parent.classList.contains('active')){
      clearInterval(parent._petalTimer);
      parent._petalTimer = null;
      return;
    }
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = PETALS[Math.floor(Math.random()*PETALS.length)];
    p.style.left = Math.random()*100 + 'vw';
    p.style.fontSize = (12 + Math.random()*16) + 'px';
    p.style.animationDuration = (6 + Math.random()*5) + 's';
    p.style.color = Math.random()>.5 ? 'var(--rose)' : 'var(--gold-soft)';
    parent.appendChild(p);
    setTimeout(()=>p.remove(), 12000);
  }, 1400);
}

/* ============================================================
   Init
   ============================================================ */
// Mute buttons (floating + inline in HUD)
['muteBtn','muteBtnInline'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('click', (e)=>{
    e.stopPropagation();
    Music.toggleMute();
  });
});

// Always require a user click to play the opening video with sound.
// Browser autoplay policy blocks audio without a user gesture, so we never
// auto-start the video — we keep the "▶ オープニングを再生" button visible
// and start playback (with sound) only on click.
window.addEventListener('load', ()=>{
  Music.init();
  openingVideo.muted = false;
  openingVideo.volume = 1.0;
  startVideoBtn.classList.remove('hidden');
});
