# 作成手順書 ―『セバスチャン ―真夜中の薔薇館―』を一から組み上げる

このドキュメントは、本リポジトリと同じ構造のブラウザ製ビジュアルノベルを **ゼロから組み立てる** ための手順書です。完成済みのコードを「なぜそうなっているか」順に追体験できるよう、依存関係のない順序で記述しています。

---

## 0. 設計思想 (先に把握しておくこと)

このプロジェクトは以下の制約をすべて同時に満たすために、あえて「素朴な作り」を選択しています。

| 制約 | 帰結 |
|------|------|
| GitHub Pages で `main` ブランチ直下から配信したい | ビルドステップなし。`index.html` がそのままエントリ |
| 依存ライブラリを増やしたくない | フレームワーク・バンドラ・テストランナーすべて未使用 |
| 効果音ファイルを管理したくない | UI 効果音は Web Audio API で **合成** (ファイル不要) |
| 章をまたいで同じ BGM を流し続けたい | シーンデータには「**切り替えたい時だけ**」`bgm` を書く |
| サブパス配下 (`/<repo>/`) でも動かしたい | アセット参照はすべて相対パス |

この前提が崩れる変更 (例: ビルドツール導入、絶対パス化) は本ガイドの対象外です。

---

## 1. ディレクトリ構成を作る

```
sebastian-game/
├── index.html      ← エントリ
├── style.css       ← Gothic/Victorian テーマ
├── script.js       ← ゲームエンジン
├── scenes.js       ← シナリオデータ
├── images/         ← 立ち絵・背景 (PNG 推奨)
├── movie/          ← オープニング動画 (MP4)
└── bgm/            ← BGM 6 トラック (MP3, シームレスループ前提)
```

> **ポイント:** ファイルは全部リポジトリ直下。`src/` などのネストはしません。GitHub Pages で配信したときの URL を短く保つためです。

---

## 2. アセットを用意する

| 種類 | ファイル数 | 用途 |
|------|------|------|
| 背景・立ち絵 | 5 枚程度 | `images/image1.webp` 〜 `image5.png` |
| オープニング動画 | 1 本 | `movie/movie.mp4` (音声付き) |
| BGM (本編) | 4 曲 | `bgm/セバスチャンの日常.mp3` (日常) / `bgm/セバスチャンの影.mp3` (不穏) / `bgm/真実のくちづけ.mp3` (愛) / `bgm/黒薔薇の墓標.mp3` (悲劇) |
| BGM (画面) | 2 曲 | `bgm/執事セバスチャンのテーマ（オーケストラ）.mp3` (タイトル) / `bgm/執事セバスチャンのテーマ（ピアノ）.mp3` (クレジット) |

BGM はループ再生されます。**ファイル両端の無音を 0 に詰めて** ください。詰めないとループ点でクリックノイズが鳴ります。

> 本作の現行構成 (本編4 + 画面2 = 6 トラック) と各曲の使用シーンは [`BGM_PLAN.md`](./BGM_PLAN.md) に集約しています。

動画 `<video>` には後の工程で意図的に `autoplay`/`muted` を **付けません**。ブラウザの autoplay ポリシーは「無音動画」しか自動再生を許可しないので、付けてしまうと「音付き再生」のフローが壊れます。

---

## 3. `index.html` ― 5 つの画面を 1 ファイルに

SPA として 5 つの `<section class="screen">` を全部書いておき、JS で `.active` を付け替えて切り替えます。

```html
<section id="opening" class="screen active"> ... </section>
<section id="title"   class="screen"> ... </section>
<section id="game"    class="screen"> ... </section>
<section id="ending"  class="screen"> ... </section>
<section id="credits" class="screen"> ... </section>
```

各画面の中身は最低限こうします (詳細は実ファイル参照):

- **opening** — `<video id="openingVideo" playsinline preload="metadata">` と「▶ オープニングを再生」ボタン、SKIP ボタン
- **title** — タイトルロゴ + 「物語を始める / 続きから / クレジット」
- **game** — 背景・立ち絵レイヤ、HUD (章 + 好感度バー + ミュート + メニュー)、台詞ボックス、選択肢コンテナ、heartbeat/flash オーバーレイ、メニューモーダル
- **ending** — エンディング背景・タイトル・本文・最終好感度・「もう一度 / タイトルへ」
- **credits** — クレジット行 + 戻るボタン

ページ末尾に音声と外部スクリプトを置きます。**`scenes.js` を `script.js` より先に読み込むこと** (script.js は SCENES と IMG にトップレベルで依存)。

```html
<audio id="bgm1" src="bgm/セバスチャンの日常.mp3" loop preload="metadata"></audio>
<audio id="bgm2" src="bgm/セバスチャンの影.mp3" loop preload="metadata"></audio>
<audio id="bgm3" src="bgm/真実のくちづけ.mp3" loop preload="metadata"></audio>
<audio id="bgm4" src="bgm/黒薔薇の墓標.mp3" loop preload="metadata"></audio>
<audio id="bgm5" src="bgm/執事セバスチャンのテーマ（オーケストラ）.mp3" loop preload="metadata"></audio>
<audio id="bgm6" src="bgm/執事セバスチャンのテーマ（ピアノ）.mp3" loop preload="metadata"></audio>

<script src="scenes.js"></script>
<script src="script.js"></script>
```

---

## 4. `style.css` ― テーマと画面切り替え

最低限必要な CSS の骨格は次の 4 ブロックです。

### 4-1. CSS 変数とフォント

Gothic / Victorian の世界観は **配色とフォント** でほぼ決まります。

```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,500&family=Shippori+Mincho:wght@400;600;800&display=swap');

:root{
  --gold:#c9a861;
  --gold-soft:#e9d6a8;
  --wine:#5a1a22;
  --ink:#0d0a08;
  --paper:#f6ecd6;
  --rose:#c4516b;
}
```

### 4-2. スクリーン切り替え

```css
.screen{ position:fixed; inset:0; display:none; opacity:0; transition:opacity .8s ease; }
.screen.active{ display:block; opacity:1; }
.screen.fade-in{ opacity:0; animation:fadeIn 1s forwards; }
@keyframes fadeIn{ to{opacity:1} }
```

### 4-3. HUD (auto-fade)

```css
.hud{ transition:opacity .6s ease; }
.hud.idle{ opacity:.18; }   /* 2.5秒間操作がなければ薄くする */
```

### 4-4. ガラス調 UI (glassmorphism)

`backdrop-filter: blur()` で背景アートを邪魔しない透過パネルを作ります。古いブラウザでは効かず単色になりますが、機能は壊れないので無視して OK。

---

## 5. `scenes.js` ― シナリオを「有向グラフ」として書く

シナリオは **物語の流れではなく、グラフ構造** として書きます。これが本エンジンの心臓部です。

### 5-1. アセットマップ

ファイルパスを直書きせず、シンボルに集約します。これで画像差し替えが 1 行修正で済みます。

```js
const IMG = {
  hall:    'images/image3.webp',
  corridor:'images/image1.webp',
  closeup: 'images/image2.webp',
  gloves:  'images/image4.webp',
  bowing:  'images/image5.webp',
};
```

### 5-2. ノード型

`SCENES` は id をキーとするフラットなオブジェクト。ノードは 3 種類です。

| 種類 | 必須フィールド | 例 |
|------|----------|------|
| **Linear** (台詞) | `next` | `{text, next:'s1_2'}` |
| **Branching** (選択肢) | `choices: [{text, affection, next}]` | 下記参照 |
| **Router** (ID `ending_branch`) | なし (エンジンが横取り) | `s5_final.next: 'ending_branch'` |

```js
const SCENES = {
  start:{
    chapter:1, bg:IMG.hall, bgm:'bgm1',
    text:'<span class="narration">―― 一八九X年、霧深き秋の夜……</span>',
    next:'s1_2'
  },
  s1_choice1:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……何か?',
    choices:[
      {text:'「素敵な瞳をされていると思って」', affection:+2, next:'s1_a1'},
      {text:'「冷たい人ね」',                   affection:-1, next:'s1_a2'},
      {text:'「よろしくお願いします」',         affection:+1, next:'s1_a3'},
    ]
  },
  // ...
};
```

### 5-3. ノードのフィールド

| フィールド | 効果 | 注意 |
|------|------|------|
| `bg` | 背景画像を切り替え | 同じ URL なら再描画しない (フリッカー防止) |
| `character` | 立ち絵を切り替え。`null` で非表示 | 省略すると現状維持 |
| `speaker` | 名前プレート | 地の文ノードでは `''` にする |
| `text` | 台詞 HTML | `<span class="narration">` で地の文 (斜体) |
| `effect` | スペース区切りトークン | `shake` / `flash` / `heartbeat-start` / `heartbeat-stop` / `character-show` |
| `bgm` | `'bgm1'`〜`'bgm6'` | **トラックを切り替えたい時だけ書く**。書かなければ前のトラック継続。本編は `bgm1`〜`bgm4`、画面用は `bgm5`/`bgm6` |
| `chapter` | 章番号 (HUD 表示) | 章の最初のノードだけに書く |

### 5-4. 命名規約

- 通常ノード: `s<章>_<連番>` (例 `s1_4`)
- 分岐ノード: `s<章>_choice<n>` (例 `s1_choice1`)
- 章タイトル: `chapter<n>_intro`
- 章末: `s<章>_end`
- エンディング分岐: 必ず `ending_branch` (エンジンがハードコードで横取りする)

---

## 6. `script.js` ― エンジン

依存順に上から書きます。**State はモジュール化せずグローバル定数 1 個** が前提です。

### 6-1. グローバル状態と保存キー

```js
const State = { current:'start', affection:0, chapter:1, typing:false, awaiting:false, fullText:'' };
const SAVE_KEY = 'sebastian_save_v1';
```

> **なぜ `_v1`?** セーブのスキーマを破壊的に変更したくなったときは、旧キーを移行せずにサフィックスを上げて「**古いセーブが綺麗に消える**」状態にします。

### 6-2. `Music` モジュール (IIFE)

責務: 6 つの `<audio>` をクロスフェード切替する。

```js
const Music = (()=>{
  const tracks = {};
  let current = null;
  let muted = localStorage.getItem('sebastian_muted') === '1';
  const TARGET_VOLUME = 0.55;
  const FADE_MS = 1200;

  function fadeTo(audioEl, targetVol, durMs){ /* setInterval で線形補間 */ }
  function play(trackName){ /* 同じトラックなら何もしない / 別なら現行を fade out + 新規を fade in */ }
  function toggleMute(){ /* localStorage に永続化、UI 更新 */ }
  // ...
  return { init, play, stop, toggleMute, isMuted, getCurrent };
})();
```

> **コツ:** `play()` を「**同じトラックなら no-op**」にしておくと、各シーンで毎フレーム `Music.play(scene.bgm)` を呼んでも頭出しが起きません。

### 6-3. `Sfx` モジュール (IIFE) ― ファイル不要の効果音

`AudioContext` で正弦波/三角波 + ゲインエンベロープを合成します。3 種類:

| 関数 | 音色 | 使われる場所 |
|------|------|------|
| `tick()` | 三角波・短い減衰 (羊皮紙ペン音風) | タイプライター 1 文字ごと |
| `choose()` | 正弦波・660→990Hz グライド | 選択肢クリック |
| `heart()` | 880Hz + 1320Hz 二重和音 | 好感度プラスの瞬間 |

```js
function tick(){
  if(Music.isMuted()) return;
  const c = ensure(); if(!c) return;
  // throttle: 38ms 以内の連発は捨てる
  // ...
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(720 + Math.random()*240, t);
  osc.frequency.exponentialRampToValueAtTime(baseFreq*0.55, t + 0.05);
  gain.gain.linearRampToValueAtTime(0.045, t + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
  osc.connect(gain).connect(c.destination);
  osc.start(t); osc.stop(t + 0.09);
}
```

> **重大な落とし穴:** `AudioContext` は**ユーザジェスチャ内**で `new` または `resume()` しないと無音になります。そのため OP 再生・SKIP・タイトルボタン・ミュート操作など、最初に発生しそうなクリック全部に `Sfx.ensure()` を仕込みます。

### 6-4. タイプライター (`typeText`)

「文字単位アニメーション」と「インラインタグ (`<span class="narration">`, `<br>`) 保持」を両立させる必要があります。素朴に `innerHTML` を 1 文字ずつ追加すると壊れるので、**先に DOM 骨格だけ作って、テキストノードを空 `<span>` に置換し、それを 1 文字ずつ埋める** という二段構えにします。

```js
function buildSkeleton(srcNode, dstParent){
  srcNode.childNodes.forEach(child=>{
    if(child.nodeType === Node.TEXT_NODE){
      const span = document.createElement('span');
      dstParent.appendChild(span);
      textTargets.push({el:span, text:child.textContent});  // ←ここに埋めていく
    }else if(child.nodeType === Node.ELEMENT_NODE){
      const clone = child.cloneNode(false);  // 属性だけコピー、子は再帰
      dstParent.appendChild(clone);
      buildSkeleton(child, clone);
    }
  });
}
```

句読点では `delay` を伸ばし (220ms)、空白では縮める (60ms) と、ぐっと自然になります。クリックすると `State.typing = false` を立てて全文を即時表示する分岐を忘れずに。

### 6-5. シーン描画 (`renderScene`)

```js
function renderScene(id){
  if(id === 'ending_branch'){ routeToEnding(); return; }   // Router を横取り
  const scene = SCENES[id];
  if(!scene){ console.warn('Scene not found:', id); return; }

  if(scene.chapter) State.chapter = scene.chapter;
  State.current = id;

  if(scene.bgm) Music.play(scene.bgm);                     // ← 宣言時のみ切替
  if(scene.bg && $bg.dataset.src !== scene.bg){ /* 背景差し替え */ }
  if(scene.character === null){ /* 隠す */ }
  else if(scene.character){ /* 切替or表示 */ }

  applyEffects(scene.effect || '');
  $speaker.textContent = scene.speaker || '';
  typeText(scene.text || '', ()=>{
    if(scene.choices) showChoices(scene.choices);
    else { $continue.classList.add('show'); State.awaiting = true; }
  });
  updateHUD();
}
```

「BGM は scene が宣言したときだけ切り替える」のがこのエンジンの最重要ルールです。これを守らないと章をまたぐたびにブツ切れます。

### 6-6. 選択肢と好感度

```js
function showChoices(choices){
  choices.forEach((c,i)=>{
    const btn = document.createElement('button');
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
      renderScene(c.next);
    });
    $choices.appendChild(btn);
  });
}
```

`affection` の値域は **`-5..+4` 程度**、累積を **`[-10, +10]` にクランプ** します。1 個の選択肢で `+10` を渡せるようにすると、それまでのマイナス選択を全部リセットできてしまうので、**1 アクションあたりの絶対値が小さいことが分岐ゲームとして本質**です。

### 6-7. エンディング・ルータ

エンディングはシーングラフの一部にしません。`ENDINGS` という別オブジェクトで保持し、`State.affection` の閾値で振り分けます。

```js
function routeToEnding(){
  let ending;
  const a = State.affection;
  if(a >= 8)      ending = ENDINGS.true;
  else if(a >= 4) ending = ENDINGS.normal;
  else if(a >= 0) ending = ENDINGS.bitter;
  else            ending = ENDINGS.bad;

  if(ending.bgm) Music.play(ending.bgm);
  // 背景・タイトル・本文を ending 画面の要素にセットして showScreen('ending')
}
```

### 6-8. セーブ/ロード

```js
function saveGame(){
  localStorage.setItem(SAVE_KEY, JSON.stringify({
    current:State.current, affection:State.affection,
    chapter:State.chapter, bgm:Music.getCurrent(),
  }));
}
function loadGame(){
  const data = JSON.parse(localStorage.getItem(SAVE_KEY));
  if(!data){ alert('セーブデータが見つかりません'); return; }
  Object.assign(State, { current:data.current, affection:data.affection, chapter:data.chapter });
  showScreen('game');
  updateHUD();
  Music.play(data.bgm || 'bgm1');   // ← renderScene の前に鳴らす
  renderScene(State.current);
}
```

ロード時 BGM を **renderScene の前に再生** するのがコツ。renderScene は scene が宣言した場合のみ BGM を切り替えるので、復元先のシーンに `bgm` がないと無音で復帰してしまいます。

### 6-9. HUD オートフェード

```js
const HUD_IDLE_MS = 2500;
let hudIdleTimer = null;
function bumpHud(){
  document.getElementById('hud').classList.remove('idle');
  clearTimeout(hudIdleTimer);
  hudIdleTimer = setTimeout(()=>{
    if(document.getElementById('game').classList.contains('active')){
      document.getElementById('hud').classList.add('idle');
    }
  }, HUD_IDLE_MS);
}
['mousemove','mousedown','touchstart','keydown'].forEach(ev=>
  document.addEventListener(ev, bumpHud, {passive:true})
);
```

### 6-10. オープニング動画の起動

ここが **唯一の罠** です。

```js
window.addEventListener('load', ()=>{
  Music.init();
  openingVideo.muted = false;     // ← muted を立てない
  openingVideo.volume = 1.0;
  startVideoBtn.classList.remove('hidden');   // ▶ ボタンを出して待つ
});

startVideoBtn.addEventListener('click', ()=>{
  Sfx.ensure();
  openingVideo.muted = false;
  const p = openingVideo.play();
  if(p && p.catch){
    p.catch(()=>{ openingVideo.muted = true; openingVideo.play(); }); // 最後の保険
  }
});
```

**`autoplay`/`muted` を `<video>` に書かない**。書くと無音動画として再生されます。「音付きでオープニングを流す」ためにはユーザのクリックイベントが絶対に必要なので、▶ ボタンを必ず挟みます。

---

## 7. ローカル動作確認

```sh
py -m http.server 8765
# http://localhost:8765/ を開く
```

`file://` で開くと **動画と BGM が一切再生されません** (autoplay/CORS で弾かれる)。必ず HTTP サーバ経由で確認してください。Windows で `python` が Microsoft Store スタブの場合は `py` (launcher) を使います。

最低限のチェックリスト:

- [ ] OP の ▶ ボタンを押すと音付きで動画が再生される
- [ ] OP 終了またはスキップでタイトルに遷移、BGM5 (オーケストラ) が薄くフェードイン
- [ ] 物語を始める → s1_1 が描画され、タイプライターと tick 音が鳴る
- [ ] 選択肢クリックで chime 音、+選択で heart 音、好感度バーが動く
- [ ] 章をまたいで `bgm` 未指定のシーンを通っても BGM が途切れない
- [ ] メニュー → セーブ → タイトル戻り → ロードで復帰できる
- [ ] HUD が 2.5 秒で薄くなり、マウスを動かすと戻る
- [ ] 5 章最終選択後、好感度に応じて 4 種類のエンディングに分岐する

シナリオ整合性 (どこかの `next` がタイポしている等) を機械で検出する仕組みは入っていません。**全分岐を実プレイで踏む**必要があります。

構文チェックだけは Node で簡易にできます:

```sh
node --check script.js
node --check scenes.js
```

---

## 8. GitHub Pages へのデプロイ

1. リポジトリ直下のファイル一式をそのまま push
2. **Settings → Pages** で Source を `main` ブランチのルートに指定
3. 数分後 `https://<user>.github.io/<repo>/` で公開

ビルドステップなし。アセット参照はすべて相対なので、サブパス配下でも動きます。

---

## 9. 拡張するときの指針

| やりたいこと | 触るべき場所 | 注意 |
|------|------|------|
| シーンを追加 | `scenes.js` の `SCENES` に新ノード | 元ノードの `next` (or 選択肢の `next`) を新 id に向ける |
| 章を追加 | 新章の頭ノードに `chapter:N` | HUD 上の「/ 5」も合わせて変える |
| 立ち絵を追加 | `images/` に置く + `IMG` マップに登録 | パスは直書きしない |
| 効果音を追加 | `Sfx` IIFE 内に新メソッド | 新規ファイルは置かない (合成で済ませる) |
| エンディングを追加 | `ENDINGS` に新キー + `routeToEnding` の閾値分岐を更新 | 閾値同士が衝突しないこと |
| BGM を増やす | `index.html` に `<audio id="bgmN">` を追加し、`Music.init` の `tracks` に登録 | 既存トラックとの音量バランスを取り直す |

---

## 10. やってはいけない変更

- `<video>` に `autoplay` または `muted` 属性を加える → 音が永久に出なくなる
- `Music.play` を「同じトラックでも再生し直す」よう変える → シーン切替のたびに頭出しが起きる
- セーブのスキーマを破壊しつつ `SAVE_KEY` を据え置く → 古いセーブが壊れた状態で復元される
- 各シーンに無条件で `bgm` を書く → クロスフェードが連発して常に無音 〜 80% を行き来する
- アセットを絶対パスで参照する (`/images/...`) → サブディレクトリ配下に置いたとき全部 404
- ビルドツールを導入する → 「push したら即配信」というデプロイ体験が壊れる

---

完成形は本リポジトリのソースそのものです。詰まったら同じ場所のコードを照合してください。
