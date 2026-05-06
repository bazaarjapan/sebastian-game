# BGM 設計

最終構成は 6 トラック (本編用 4 + 画面用 2)。本ドキュメントは Issue #3 で決定した楽曲設計の覚書であり、Suno AI で制作する際の Style と各曲の使用箇所を集約している。

## トラック一覧

| ID | タイトル | ファイル | 役割 | レイヤ |
|---|---|---|---|---|
| bgm1 | セバスチャンの日常 | `bgm/セバスチャンの日常.mp3` | 日常・希望 | 本編 |
| bgm2 | セバスチャンの影 | `bgm/セバスチャンの影.mp3` | 不穏・誘惑 | 本編 |
| bgm3 | 真実のくちづけ | `bgm/真実のくちづけ.mp3` | 愛・告白・救済 | 本編 |
| bgm4 | 黒薔薇の墓標 | `bgm/黒薔薇の墓標.mp3` | 終焉・悲劇 | 本編 |
| bgm5 | 執事セバスチャンのテーマ（オーケストラ） | `bgm/執事セバスチャンのテーマ（オーケストラ）.mp3` | タイトル画面 | 画面 |
| bgm6 | 執事セバスチャンのテーマ（ピアノ） | `bgm/執事セバスチャンのテーマ（ピアノ）.mp3` | クレジット画面 | 画面 |

> 内部 ID (`bgm1`〜`bgm6`) は論理識別子であり、ファイル名と独立。既存 bgm1 / bgm2 はセーブデータ互換性のため据え置き。

**設計上の分離:** 本編 BGM (bgm1〜bgm4) はシーン進行に応じてエンジンが切替、画面 BGM (bgm5/bgm6) はタイトル/クレジット画面の表示に応じて専用切替。両者は独立しており、本編シーン内で bgm5/6 が鳴ることはない。

---

## 新規制作トラックの仕様

### bgm3 真実のくちづけ

**意図:** 彼の愛と主人公の決意が交わるクライマックスに鳴る楽曲。第4章の呪い真実告白から第5章の最終決断までの感情の高揚を支える。Gothic Victorian なロマンティック・ワルツ。

**Suno AI Style** (Style 欄にそのまま貼る):

```
gothic romantic waltz, victorian, solo piano lead, lush strings, female choir wordless harmony, 3/4 time slow, minor opening modulating to major, candlelit, longing, tender, swelling crescendo, instrumental, no vocals, cinematic score
```

**使用予定シーン:**

- 第3章 薔薇園散策 (`s3_garden1` 〜 `s3_garden6`)
- 第4章 呪い告白以降 (`s4_4` 周辺) と `s4_b1` (跪いて手の甲に唇を寄せる)
- 第5章 全体 (現状 bgm2 から差し替え)
- TRUE END (現状 bgm1 から差し替え)

---

### bgm4 黒薔薇の墓標

**意図:** BAD END 本文「黒い薔薇が、灰となって崩れた」と直結する終焉のモチーフ。BITTERSWEET END の喪失感も支える。Baroque な葬送行進曲。

**Suno AI Style** (Style 欄にそのまま貼る):

```
gothic requiem, baroque funeral march, sparse harpsichord, low cello drone, distant tolling church bell, slow andante, minor key, dissonant intervals, mourning, ashen decay, instrumental, no vocals, cinematic dirge
```

**使用予定シーン:**

- BAD END (現状 bgm2 から差し替え)
- BITTERSWEET END (現状 bgm2 から差し替え)
- 第5章 拒絶選択 (`s5_aft4`)

---

### bgm5 執事セバスチャンのテーマ（オーケストラ）

**意図:** タイトル画面で流す本作のテーマ曲。プレイヤーが起動した瞬間に「これはセバスチャンの物語だ」と伝える主題。Gothic Victorian なオーケストラ・スコア。Suno AI で制作済み (Style 設定は記録されていないが、本曲は既に成果物として存在)。

**使用シーン:**

- タイトル画面 (現状 `Music.play('bgm1')` から差し替え)
- ゲーム開始でフェードアウト、本編 BGM (bgm1) にバトンタッチ

---

### bgm6 執事セバスチャンのテーマ（ピアノ）

**意図:** どのエンディングを迎えたあとでも流れる、クレジット画面の余韻楽曲。ソロ・ピアノの親密さで「物語が終わった」感情の冷却を支える。bgm5 と同じ主題のピアノ独奏アレンジで、起動時の壮大さと終幕時の親密さを対比させる構造。

**使用シーン:**

- クレジット画面 (タイトル → クレジットの遷移時)
- エンディング後のクレジット遷移 (将来検討)

---

## 役割分担マトリクス

| レイヤ | 感情ゾーン | トラック |
|---|---|---|
| 画面 | タイトル画面 (起動時の世界観提示) | 執事セバスチャンのテーマ（オーケストラ） (bgm5) |
| 画面 | クレジット画面 (物語終幕の余韻) | 執事セバスチャンのテーマ（ピアノ） (bgm6) |
| 本編 | 日常・出会い・希望 | セバスチャンの日常 (bgm1) |
| 本編 | 不安・誘惑・ミステリー | セバスチャンの影 (bgm2) |
| 本編 | 愛・告白・救済 | 真実のくちづけ (bgm3) |
| 本編 | 終焉・悲劇 | 黒薔薇の墓標 (bgm4) |

これで「タイトルで世界観を立ち上げる → 本編で 4 ゾーンの感情を運ぶ → クレジットで余韻を残す」という起承転結が音楽で構築される。

---

## 実装に必要な変更 (本 Issue ではなく後続 Issue で扱う)

音源 6 曲が揃ったので、以下を別 Issue として実装する:

1. `index.html` に `<audio id="bgm3">` / `<audio id="bgm4">` / `<audio id="bgm5">` / `<audio id="bgm6">` を追加 (4 つ追加)
2. `script.js` の `Music` モジュールで `tracks` 登録を 6 つに拡張 (`init()` 内)
3. `scenes.js` の該当シーン (使用予定シーン参照) の `bgm` タグを `bgm3` / `bgm4` に書き換え
4. `script.js` の `ENDINGS` で TRUE → bgm3、BITTERSWEET → bgm4、BAD → bgm4 に差し替え
5. `goToTitle()` を `Music.play('bgm5')` に変更
6. クレジット画面の表示時に `Music.play('bgm6')` を呼ぶ処理を追加 (`title-btn[data-action="credits"]` のハンドラ内)
7. クレジットからタイトルへ戻るとき (`#creditBack` クリック時) `Music.play('bgm5')` でタイトル曲に戻す
8. ゲーム開始 (`startNewGame()`) で `Music.play('bgm1')` してタイトル曲をフェードアウト
9. `BUILD_GUIDE.md` のアセット表 (BGM 行) を 6 トラック構成に追従

セーブデータは `Music.getCurrent()` を JSON に格納しているため、新規 ID も自動で永続化される (スキーマ変更不要)。ただし bgm5/bgm6 は本編で鳴らないので、ロード復帰時にこれらが現在トラックになっていることは想定外 — `loadGame()` の `Music.play(data.bgm || 'bgm1')` フォールバックは現状のままで安全。
