# BGM 設計

最終構成は 4 トラック (既存 2 + 新規 2)。本ドキュメントは Issue #3 で決定した楽曲設計の覚書であり、新規 2 曲を Suno AI で制作するときに必要な情報を集約している。

## トラック一覧

| ID | タイトル | ファイル | 役割 | ステータス |
|---|---|---|---|---|
| bgm1 | セバスチャンの日常 | `bgm/セバスチャンの日常.mp3` | 日常・希望 | 既存 |
| bgm2 | セバスチャンの影 | `bgm/セバスチャンの影.mp3` | 不穏・誘惑 | 既存 |
| bgm3 | 真実のくちづけ | `bgm/真実のくちづけ.mp3` | 愛・告白・救済 | **未制作** |
| bgm4 | 黒薔薇の墓標 | `bgm/黒薔薇の墓標.mp3` | 終焉・悲劇 | **未制作** |

> 内部 ID (`bgm1`〜`bgm4`) は論理識別子であり、ファイル名と独立。既存 bgm1 / bgm2 はセーブデータ互換性のため変更しない。

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

## 役割分担マトリクス

| 感情ゾーン | トラック |
|---|---|
| 日常・出会い・希望 | セバスチャンの日常 (bgm1) |
| 不安・誘惑・ミステリー | セバスチャンの影 (bgm2) |
| 愛・告白・救済 | 真実のくちづけ (bgm3) |
| 終焉・悲劇 | 黒薔薇の墓標 (bgm4) |

これで「不穏な進行」「愛のクライマックス」「悲劇エンディング」が音楽的に分離される。

---

## 実装に必要な変更 (本 Issue ではなく後続 Issue で扱う)

新規 2 曲のファイルが揃ったあと、以下を別 Issue として実装する:

1. `index.html` に `<audio id="bgm3">` / `<audio id="bgm4">` を追加
2. `script.js` の `Music` モジュールで `tracks` 登録を 4 つに拡張 (`init()` 内)
3. `scenes.js` の該当シーン (上記の使用予定シーン) の `bgm` タグを `bgm3` / `bgm4` に書き換え
4. `script.js` の `ENDINGS` で TRUE / BITTERSWEET / BAD の `bgm` を差し替え
5. `BUILD_GUIDE.md` のアセット表 (BGM 行) を 4 トラック構成に追従

セーブデータは `Music.getCurrent()` を JSON に格納しているため、`bgm3` / `bgm4` も自動で永続化される (スキーマ変更不要)。
