# 画像設計

最終構成は **約 50 枚** (本編 46 + エンディング 4)。本ドキュメントは Issue #7 で確定する画像設計の覚書であり、gpt-image-2 で制作する際の共通 Style・キャラクタ仕様・各画像の Prompt と使用箇所を集約している。

## 0. 基本方針

- すべての画像で **同一スタイル** (Japanese visual novel × Gothic Victorian × ペインタリー) を維持
- セバスチャンと主人公のキャラクタ仕様を固定し、生成のばらつきを抑える
- 主人公はプレイヤー投影を温存するため、**正面顔は描かない** (後ろ姿/プロフィール/部分シルエット)
- アスペクトは **16:9 横長** (CSS の `background-size:cover` に最適)
- gpt-image-2 系は同一キャラの完全一致が苦手なので、セバスチャンが顔を出すカットでも陰影・距離・構図を変えて多様化する

---

## 1. 共通スタイル・プレフィックス

各 Prompt の先頭に下記をそのまま貼り付ける (本ドキュメントでは `[STYLE]` と表記して省略)。

```
Japanese visual novel illustration, gothic Victorian setting, painterly digital art with soft anime-CG hybrid brushwork, dramatic candlelight and deep chiaroscuro shadows, warm gold and deep crimson color palette with cool moonlight accents, fog and atmospheric depth, romantic mystery mood, cinematic 16:9 horizontal composition, high detail, no text, no watermark
```

---

## 2. キャラクタ仕様

### 2.1 セバスチャン (執事)

- **参照画像:** `images/sebastian_reference_sheet.webp` を以後の主要見本とする。漫画カットと設定資料集を兼ねた基準画像で、顔立ち・髪型・衣装・白手袋・画風の固定参照に使う。
- **容姿:** 細身長身、外見年齢 20 代後半。漆黒のセミロング (一部を黒のシルクリボンで結ぶ)。深いインディゴブルーの瞳。極めて白い肌
- **服装:** 黒のテイルコート (高い襟)、白のシャツ、黒のシルク・クラヴァット、白手袋、黒のトラウザーズ、磨かれた革靴
- **所作:** 姿勢は常に完璧。穏やかだが憂いを帯びた表情

各 Prompt 内では、`images/sebastian_reference_sheet.webp` を参照したうえで `same Sebastian as the reference sheet: tall slender young Victorian butler in embroidered black tailcoat with immaculate white gloves, wavy medium-length raven-black hair, pale refined skin, sharp calm light gray-hazel to deep indigo eyes, white silk cravat` のように描写する。

### 2.2 主人公 (お嬢様)

- **参照画像:** `images/heroine_reference_sheet.webp` を以後の主要見本とする。主人公はプレイヤー投影を優先するため、髪型・服装・後ろ姿・横顔・手元を固定し、正面顔や目元の詳細は固定しない。
- **容姿:** 10 代後半〜20 代前半の女性。ミディアムレングスの髪
- **服装:** ヴィクトリアン様式の旅装 (ディープブルーまたはバーガンディのベルベット、レース襟)
- **構図ルール:** **常に後ろ姿、プロフィール、または顔を部分的に隠した構図** で描く。**正面顔・目元の細部は描かない**

各 Prompt 内では `young woman seen from behind / in profile, mid-length hair, victorian travel dress in deep blue or burgundy velvet with lace collar, face not shown directly` のように描写する。

---

## 3. プロンプト書式と運用

各画像エントリは:

- **キー** (`carriage_window` のような短い識別子) — `images/<key>.webp` として保存
- **役割** (一行説明)
- **使用予定シーン** (scenes.js の ID リスト)
- **Prompt** (`[STYLE]. <scene description>` 形式、生成時は `[STYLE]` を § 1 のブロックに置き換え)

---

## 4. 第1章 嵐の夜の到着 (9 枚)

### 4.1 `carriage_window`
**役割:** 馬車内の主人公・銀の懐中時計  
**使用シーン:** `start`, `s1_pre1`, `s1_pre2`, `s1_pre3`
**Prompt:**
> [STYLE]. Interior of a Victorian horse carriage at deep night, viewpoint from inside looking past a young woman seen only as a silhouette of mid-length hair and travel cloak from behind, gloved hands cradling an antique silver pocket watch with worn engraved crest, rain streaking the carriage window beyond which a fog-shrouded forest of twisted bare trees is intermittently revealed by lightning flashes, oil-lamp interior glow on velvet upholstery, mood of solitary apprehension.

### 4.2 `manor_storm`
**役割:** 雷光に浮かぶ館の遠景  
**使用シーン:** `s1_3`
**Prompt:**
> [STYLE]. Wide cinematic establishing shot of a Gothic Victorian manor on a fog-shrouded clifftop at midnight, multiple sharp spires and turrets silhouetted against a violent stormy sky, brilliant lightning fork illuminating the ivy-covered stone facade and tall narrow gothic windows, autumn rain falling in sheets, ancient wrought-iron gate at the foot of the cliff path in foreground, no people visible, ominous beauty.

### 4.3 `gate_butler`
**役割:** 傘なしで燭台ひとつの執事  
**使用シーン:** `s1_3b`, `s1_4`
**Prompt:**
> [STYLE]. Medium long shot of an imposing wrought-iron Gothic gate at a manor entrance at night, a tall slender butler in immaculate black tailcoat with white gloves standing perfectly still beside the gate holding a single small brass candelabra with one flickering flame, his raven shoulder-length hair partly tied back with a black silk ribbon, hair and tailcoat soaked by heavy rain but his posture unmoved, deep indigo eyes downcast, fair skin, fog rolling in from behind.

### 4.4 `first_bow`
**役割:** 雨の中で深く礼  
**使用シーン:** `s1_4`, `s1_4b`, `s1_5`, `s1_5b`
**Prompt:**
> [STYLE]. Three-quarter view of the tall butler in black tailcoat bowing deeply at a manor entrance, his face hidden by his bowed head, raindrops cascading from his black hair past the candle flame held in his white-gloved hand, the candelabra casting warm orange light against cold blue rain, behind him the great oak doors of the manor stand half-open showing a glimpse of marble floor and dim chandeliers within.

### 4.5 `first_eye_lift`
**役割:** 蝋燭の灯に浮かぶ深い瞳  
**使用シーン:** `s1_6`, `s1_choice1`
**Prompt:**
> [STYLE]. Extreme close-up of the butler's face as he raises his head from a bow, half in shadow half illuminated by warm candlelight from below, deep midnight-indigo eyes meeting the viewer with quiet unfathomable intensity, raven hair damp from rain, single droplet on his pale cheek, faint shadow of a smile not yet formed, background blurred to a haze of warm gold candle glow, painfully beautiful.

### 4.6 `hall_long_shot`
**役割:** 大広間の広さと半分消えた燭台  
**使用シーン:** `s1_7b`, `s1_7c`
**Prompt:**
> [STYLE]. Vast Gothic Victorian manor hall at night, polished marble floor reflecting scattered points of flame, towering vaulted ceiling with massive iron-and-crystal chandeliers more than half extinguished, ornate gold-framed portraits lining tall walls, a grand sweeping double staircase ascending into deeper shadow, single distant figure walking far in the depth of the hall, atmosphere of immense quiet, dust motes floating in the warm candle-light shafts.

### 4.7 `portraits_blindfold`
**役割:** 目元を布で隠した歴代当主  
**使用シーン:** `s1_7c`
**Prompt:**
> [STYLE]. Close-up of three ornate gold-framed Victorian oil portraits hung on dark wood-paneled wall, each painting depicting a noble lord in different-era Victorian aristocratic attire, but disturbingly **all of them have their eyes covered by aged white linen blindfolds, the cloth tied behind the painted heads, the blindfolds appearing real and three-dimensional protruding from the canvas surface**, single candelabra flame casting flickering shadows.

### 4.8 `bedchamber_fire`
**役割:** 暖炉と天蓋の絹  
**使用シーン:** `s1_post3`
**Prompt:**
> [STYLE]. Atmospheric interior of a Victorian guest bedchamber at night, ornate carved four-poster bed with faded indigo silk canopy and burgundy embroidered drapes, large stone fireplace with crackling fire as the only light source, warm orange glow on rich tapestries and on a vase of dark crimson roses on a side table, antique writing desk with unlit candle, no people, melancholic intimate atmosphere.

### 4.9 `bed_heartbeat`
**役割:** 横になり心臓の音を聴く主人公  
**使用シーン:** `s1_post4`, `s1_end`
**Prompt:**
> [STYLE]. Overhead view of a young woman lying on a Victorian four-poster bed seen partially through gauzy silk canopy drapes, only her shoulder-length hair fanned on the pillow and one delicate hand pressed to her chest visible, eyes closed (no facial details shown), faint blush on cheeks, fireplace glow casting warm shadows of bedposts across the embroidered coverlet, single candle nearby, intimate vulnerable mood.

---

## 5. 第2章 真夜中の物音 (7 枚)

### 5.1 `distant_piano`
**役割:** 雨の中の調律ずれピアノ  
**使用シーン:** `chapter2_intro`, `s2_1`, `s2_1b`
**Prompt:**
> [STYLE]. Atmospheric interior shot of the Victorian bedchamber at deep night, viewpoint from beside an ornate carved bed where a young woman sits up amid disheveled silk sheets with her back to viewer, listening intently to something distant, golden lamplight beside her, beyond the bedroom door which stands slightly ajar a long shadowy corridor stretches into darkness from which faint warped piano notes seem to drift on the rain.

### 5.2 `corridor_alone_candle`
**役割:** 蝋燭ひとつの闇の廊下  
**使用シーン:** `s2_1c`, `s2_2`, `s2_2b`, `s2_2c`
**Prompt:**
> [STYLE]. Long shot down a vast Gothic Victorian corridor at midnight, the heroine seen from behind walking slowly down the centerline holding a small brass candelabra with one trembling flame, her own long shadow stretching grotesquely behind her on the marble floor, all wall sconces extinguished, ornate ceiling vaults disappearing into total blackness above, faint fog seeming to seep through closed doorways.

### 5.3 `voice_behind`
**役割:** 振り向けない一瞬・背後の気配  
**使用シーン:** `s2_3`, `s2_3b`
**Prompt:**
> [STYLE]. Tight medium shot of the heroine from behind, her shoulder-length hair illuminated by the candlelight she holds in front, body frozen mid-step, the candle flame leaning subtly as if from a sudden draft, her shoulders tensed, in the deep darkness behind her a barely perceptible darker silhouette stands motionless arm's-length away, no face visible just a suggestion of black tailcoat collar and a pale gloved hand.

### 5.4 `shadow_butler`
**役割:** 闇に縁取られた執事  
**使用シーン:** `s2_4`, `s2_4b`, `s2_5`
**Prompt:**
> [STYLE]. Atmospheric portrait of the butler standing in a pitch-dark Gothic corridor with no visible light source yet his form somehow defined as if night itself outlines him, his pale face emerging from total shadow with deep indigo eyes catching impossible glints of light, raven hair, black tailcoat blending into the darkness so the eye reads only the white gloves, the white collar, and the hollow-cheeked face, supernatural stillness.

### 5.5 `white_glove_offered`
**役割:** 一輪の白百合のような白手袋  
**使用シーン:** `s2_6`, `s2_6b`, `s2_choice2`
**Prompt:**
> [STYLE]. Close-up of a single black-cuffed gloved hand extended palm-up into total darkness, the immaculate white glove glowing as if it were a single white lily blooming in the night, every stitch and seam visible in the candlelight that comes from off-frame, the rest of the figure dissolving into pure black, dramatic chiaroscuro, an intimate gesture frozen in time.

### 5.6 `walking_pair_corridor`
**役割:** 並んで歩く二人、足音が揃わない  
**使用シーン:** `s2_b_join`, `s2_b1`, `s2_b2`, `s2_b3`
**Prompt:**
> [STYLE]. Wide shot down a long Gothic Victorian corridor seen from behind, two figures walking side by side away from camera, the butler in black tailcoat and the heroine in a pale nightdress, their long shadows stretched across the marble floor with one curious detail—**only the heroine's shadow shows footstep marks of her body**, the butler's shadow gliding silently as if disconnected from the floor, single candelabra glow.

### 5.7 `mother_question_dim`
**役割:** お母様を覚えておいでですか  
**使用シーン:** `s2_b_join2`, `s2_b_join3`, `s2_b_join4`, `s2_7`, `s2_7b`, `s2_end`
**Prompt:**
> [STYLE]. Three-quarter medium shot of the butler in profile against a Victorian wallpapered corridor at night, his composed face turned away with profound melancholy in his half-lidded indigo eyes, his white-gloved hand raised slightly as if to gesture but stopped mid-motion, candlelight making his hair gleam blue-black, a question hanging unspoken in the air, intimate quiet sorrow.

---

## 6. 第3章 紅茶と告白 (10 枚)

### 6.1 `morning_rosewindow`
**役割:** 薔薇窓から朝の陽光  
**使用シーン:** `chapter3_intro`, `s3_1`
**Prompt:**
> [STYLE]. Wide interior shot of the great hall in early morning, brilliant golden sunlight pouring through a magnificent stained-glass rose window high above the staircase, scattering jewel-toned reflections of crimson, sapphire, and amber across pale marble floors, dust motes spiraling in the warm beams, the chandeliers and gloomy atmosphere of night transformed into a hopeful sunlit cathedral-like space, no people.

### 6.2 `rosegarden_view`
**役割:** 季節外れの薔薇園を窓から  
**使用シーン:** `s3_1b`
**Prompt:**
> [STYLE]. View from inside through a tall mullioned Gothic window looking down onto an enclosed Victorian rose garden, dozens of rose varieties in full impossible bloom against autumnal frost—deep crimson, snow white, dusty gold, pale pink—arranged in formal geometric beds with low hedges, gravel paths converging at a central fountain with a stone angel, low fog drifting between the bushes, no people.

### 6.3 `dining_silver`
**役割:** 紋章入り食器の長卓  
**使用シーン:** `s3_1c`, `s3_2`
**Prompt:**
> [STYLE]. Medium overhead shot of a long polished Victorian dining table set for one in the sunlit hall, immaculate white linen tablecloth, ornate silver flatware engraved with a rose-and-thorns crest each piece gleaming, fine bone china teacup and saucer, a small silver tray of pastries, single crimson rose in a crystal vase, antique chairs around the otherwise empty table, warm sunlight from a tall window.

### 6.4 `tea_pouring`
**役割:** 紅茶を注ぐ白手袋の所作  
**使用シーン:** `s3_2`, `s3_2b`
**Prompt:**
> [STYLE]. Close-up of white-gloved hands carefully tilting an antique silver teapot to pour amber tea into a delicate floral bone china cup, the tea stream catching morning light, scattered fresh crimson rose petals already inside the cup, steam rising in soft tendrils, the butler's black-cuffed sleeves visible but his face out of frame, perfect ceremonial precision.

### 6.5 `tea_steam_memory`
**役割:** 母を思い出す紅茶の湯気  
**使用シーン:** `s3_2c`, `s3_3`, `s3_3b`
**Prompt:**
> [STYLE]. Intimate close-up of the young woman seen from a three-quarter back angle holding a rose-scented teacup just below her lips, eyes closed in remembrance (face not directly visible), a single tear glinting on her lashes, the rising steam from the cup forming faint dreamlike silhouettes of distant flowers and a graceful figure, warm sunlight softening everything to gold and rose hues.

### 6.6 `garden_path_fog`
**役割:** 霧の薔薇園を二人で歩く  
**使用シーン:** `s3_garden1`, `s3_garden2`
**Prompt:**
> [STYLE]. Wide elegant shot of a misty Victorian rose garden in late morning, gravel path winding between dense rose hedges in deep crimson and snow white, two figures walking side by side with their backs to camera, the butler in dark tailcoat carrying a small wicker basket and the heroine beside him at a respectful distance, fog softening everything to dreamlike pastels, **the butler casting no shadow on the gravel** while the heroine's shadow is clearly visible.

### 6.7 `valdia_blood_rose`
**役割:** ヴァルディアの血と呼ばれる深紅  
**使用シーン:** `s3_garden2`, `s3_garden3`
**Prompt:**
> [STYLE]. Macro close-up of a single perfect deep crimson rose in full bloom, dewdrops on velvety petals catching morning light like tiny jewels, sharp black-green thorns visible on the stem, a white-gloved hand entering frame from the right gently cradling the bloom, behind it a soft-focus haze of more roses, the color of the petals so deep and saturated it seems lit from within, almost like blood made luminous.

### 6.8 `handing_rose`
**役割:** 朝露の薔薇を受け取る手  
**使用シーン:** `s3_garden4`, `s3_garden5`, `s3_garden6`
**Prompt:**
> [STYLE]. Close-up moment of a single crimson rose being passed between two pairs of hands—the butler's white-gloved fingers extending the freshly cut stem still glistening with dew, the heroine's bare delicate hand reaching to receive it, fingertips just touching the stem, soft morning light, faint fog, the two pairs of hands forming a quiet symmetrical composition, both faces out of frame.

### 6.9 `fifty_year_face`
**役割:** 五十年告白の表情  
**使用シーン:** `s3_4`, `s3_5`, `s3_5b`, `s3_5c`, `s3_choice2`
**Prompt:**
> [STYLE]. Three-quarter medium shot of the butler facing the viewer obliquely with the morning hall behind him out of focus, his composed face suddenly cracked by something raw—deep indigo eyes lowered as if confessing a wound, lips slightly parted in mid-word, white-gloved hand resting on his chest in an old-fashioned gesture of vow, golden rose-window light from behind catching his black hair as it would a halo, painfully beautiful and ageless.

### 6.10 `clock_stopped`
**役割:** 止まった柱時計  
**使用シーン:** `s3_6`, `s3_6b`, `s3_b_join`, `s3_b_join2`, `s3_b_join3`, `s3_7`, `s3_7b`, `s3_7c`, `s3_end`, `s3_end2`
**Prompt:**
> [STYLE]. Atmospheric medium shot of an enormous Victorian grandfather clock against a wood-paneled wall, intricately carved case with rose motifs, brass pendulum visible through the glass front frozen perfectly mid-swing, ornate Roman numeral face showing 11:47, dust on the carved crown, single ray of morning light cutting across it, in the bottom of the frame a forgotten teacup on a small table, sense of time itself suspended.

---

## 7. 第4章 西の塔の真実 (9 枚)

### 7.1 `moonrise_high`
**役割:** 月が館より高く昇る  
**使用シーン:** `chapter4_intro`, `s4_pre1`
**Prompt:**
> [STYLE]. Wide low-angle exterior shot of the Gothic manor at midnight, a brilliant full moon risen higher than the tallest spire, silver moonlight cutting through scattered storm clouds, the rose garden below transformed by the cool light into pallid greys with the deep crimson roses appearing nearly black, distant cliff edge dropping into fog, ominous sacred beauty, no people.

### 7.2 `three_knocks`
**役割:** 三度のノック  
**使用シーン:** `s4_pre2`, `s4_pre3`, `s4_pre4`
**Prompt:**
> [STYLE]. Medium shot from inside the bedchamber looking toward a tall ornate wooden door at night, the door slightly ajar showing the silhouette of the butler in profile in the corridor beyond, his white-gloved hand poised mid-knock, single candlestick lighting his black hair from behind, his expression one of grave purpose, the heroine's silhouette in foreground rising from the bedside in the warm fireplace glow.

### 7.3 `spiral_stairs_endless`
**役割:** 終わらない螺旋階段  
**使用シーン:** `s4_1`, `s4_1b`
**Prompt:**
> [STYLE]. Vertical perspective shot looking up the inside of a tall stone Gothic tower, an iron spiral staircase rusted with age corkscrewing impossibly upward into a vanishing point, narrow arrow-slit windows letting in faint moonlight at uneven intervals, two figures climbing far below the camera with the butler leading, heroine following with a candle, **the staircase visibly curling tighter and longer above them than physical architecture would allow**, dreamlike oppressive geometry.

### 7.4 `same_face_portraits`
**役割:** すべて同じ顔の歴代肖像画  
**使用シーン:** `s4_1c`
**Prompt:**
> [STYLE]. Atmospheric close-up of a stretch of stone tower wall hung with five Victorian-era oil portraits at uneven intervals along the spiraling staircase, **each portrait depicting unmistakably the same young man—the butler—but in five different historical costumes from different decades, each with a different aristocratic name engraved on a small brass plate beneath**, candlelight from the heroine's candelabra making the painted faces seem to follow her gaze, deeply unsettling.

### 7.5 `stair_truth_telling`
**役割:** 階段途中の告白  
**使用シーン:** `s4_2`, `s4_2b`, `s4_3`, `s4_choice1`, `s4_a1`, `s4_a2`, `s4_a3`, `s4_a_join`, `s4_4`, `s4_4b`, `s4_5`, `s4_5b`, `s4_5c`, `s4_6`
**Prompt:**
> [STYLE]. Three-quarter medium shot in the stone tower stairwell mid-flight, the butler turned to face the heroine on a small landing, his composed butler facade visibly fractured—deep indigo eyes haunted and slightly wider than usual, hands open at his sides in a gesture of vulnerability, candlelight from the heroine's candle (held off-frame foreground) painting one half of his face golden and the other in deep shadow, ancient stone walls behind him.

### 7.6 `gardener_curse_origin`
**役割:** 百年前の庭師の自刃  
**使用シーン:** `s4_5b`, `s4_5c`
**Prompt:**
> [STYLE]. Sepia-toned dreamlike flashback scene depicting a younger Victorian-era rose garden one hundred years prior, a despairing young gardener in worn linen shirt slumping against a stone wall covered in black thorns at twilight, an antique pruning knife fallen from his hand, dark stains on his shirt (no graphic violence shown), a single crimson rose blooming on the wall above him, his face turned away in eternal grief, atmosphere of an old painting, melancholic and symbolic.

### 7.7 `mother_choice_flashback`
**役割:** 母も招かれた一人だった  
**使用シーン:** `s4_6b`, `s4_6c`, `s4_6d`, `s4_7`, `s4_7b`
**Prompt:**
> [STYLE]. Sepia-toned tender flashback scene of a young woman seen from behind in Victorian travel attire stepping into a horse-drawn carriage outside the manor at dawn decades ago, leaving behind a folded white handkerchief on the carriage steps, the manor's front door slowly closing in the distance, a younger version of the butler (identical to the present one, ageless) standing in the doorway watching her go with profound stillness, no faces shown clearly, atmosphere of bittersweet historical memory.

### 7.8 `kneel_handkiss`
**役割:** 跪いて手の甲にキス  
**使用シーン:** `s4_choice2`, `s4_b1`, `s4_b2`, `s4_b3`, `s4_b4`, `s4_b_join`
**Prompt:**
> [STYLE]. Intimate medium shot in the dim stone tower stairwell, the butler kneeling on cold flagstones, gently lifting the heroine's bare hand to his lips with his white-gloved fingers, his bowed head with raven hair against her lifted hand, her free hand frozen at her side, candlelight on the floor between them creating an island of warmth in the surrounding darkness, single tear visible on his closed eyelashes, sacred quiet emotion.

### 7.9 `tower_door_handing_candle`
**役割:** 塔の扉前で燭台を渡す  
**使用シーン:** `s4_end`, `s4_end2`
**Prompt:**
> [STYLE]. Wide moody shot at the top of the tower stairwell facing a massive ancient wooden door deeply carved with intertwining roses and thorns, two figures stand before it—the butler turning with great solemnity to hand a single brass candelabra to the heroine, his face in profile composed but shadowed, her hand reaching to receive the candle, the door looming behind them inscribed with a heavy iron lock shaped like an inverted candle holder, single shaft of moonlight from a high window.

---

## 8. 第5章 月夜の誓い (11 枚)

### 8.1 `crest_door`
**役割:** 薔薇と茨の紋章の扉  
**使用シーン:** `chapter5_intro`, `s5_pre1`
**Prompt:**
> [STYLE]. Close-up detail shot of a heavy ancient wooden tower door, deeply carved with intricate intertwining wild roses and twisted thorns surrounding a central crest of the Valdia family—a single rose entwined with a serpentine thorn—the carving deep enough to cast its own shadows, central inverted candle-holder shaped iron lock pristine, the wood near-black with age, faint candlelight flickering across it from off-frame, mood of sacred threshold.

### 8.2 `candle_key`
**役割:** 燭台が鍵となる  
**使用シーン:** `s5_pre2`
**Prompt:**
> [STYLE]. Extreme close-up of a slender pale hand turning a small brass candelabra base inserted into a beautifully crafted iron lock shaped like an inverted candle-holder on a heavy wooden door, the candle still lit on top, the lock mechanism visibly turning silently and almost without resistance, the rose-and-thorns carved relief of the door surrounding the lock, dramatic single-flame lighting.

### 8.3 `thorn_bed_sleeping`
**役割:** 茨に縛られ眠る半身  
**使用シーン:** `s5_1`, `s5_1b`
**Prompt:**
> [STYLE]. Wide atmospheric shot of a circular tower chamber under massive moonlight pouring through high arched windows, in the center a low marble bier on which lies a young man in pale period clothes—the butler's exact double—asleep with eyes closed and hands crossed on chest, **his entire body bound in living thick green thorny vines that seem to slowly breathe, snaking around his limbs, torso, and into his hair**, the chamber otherwise stark stone, ethereal solemn beauty.

### 8.4 `ash_petals_decades`
**役割:** 何十年分の枯れた薔薇  
**使用シーン:** `s5_1c`
**Prompt:**
> [STYLE]. Close-up looking down at the stone floor at the foot of the marble bier, an immense drift of dried and decaying rose petals piled inches deep around the base of the slab in shades of brown, ochre, dust-grey, the petals layered like geological sediments suggesting decades of accumulation, single fresh crimson petal lying atop the pile catching pale moonlight, atmosphere of vast frozen sorrow.

### 8.5 `shadow_vs_real`
**役割:** 影と本体の対比  
**使用シーン:** `s5_2`, `s5_2b`, `s5_2c`, `s5_2d`, `s5_3`, `s5_4`, `s5_4b`, `s5_4c`
**Prompt:**
> [STYLE]. Stark symbolic composition under moonlight in the tower chamber—on the right, the butler standing in his immaculate black tailcoat, perfectly composed but slightly transparent at the edges as if he might dissolve, on the left, his thorn-bound sleeping double on the marble bier, the two figures sharing the exact same face, separated by a column of moonlight between them like a divider, one alive but artificial, the other real but imprisoned, profoundly dreamlike.

### 8.6 `pocketwatch_reveal`
**役割:** 母の懐中時計の紋章  
**使用シーン:** `s5_5`, `s5_6`, `s5_7`, `s5_8`
**Prompt:**
> [STYLE]. Extreme close-up of a small antique silver pocket watch held cradled in a pale young woman's bare palm, **the pocket watch closed, not open**, its worn outer lid/back case engraved with a rubbed-down Valdia rose-and-thorns crest that becomes recognizable only under direct moonlight from above, no clock face visible, in the background blurry suggestion of the marble bier, sacred reveal.

### 8.7 `last_letter`
**役割:** 母の最後の手紙  
**使用シーン:** `s5_9`, `s5_10`, `s5_11`
**Prompt:**
> [STYLE]. Medium close-up of the butler standing under tower moonlight holding open an aged folded letter on cream paper with elegant Victorian handwriting visible (text not legible to viewer), his face downcast with profound tenderness as he reads softly, in his other gloved hand a small bundle of additional letters tied with faded red silk ribbon, the heroine seen partially in foreground out of focus listening, intimate sacred atmosphere.

### 8.8 `moonlit_pair_choice`
**役割:** 月光の二人、最後の対話  
**使用シーン:** `s5_12`, `s5_13`, `s5_14`, `s5_15`, `s5_16`
**Prompt:**
> [STYLE]. Symmetrical wide shot of the tower chamber, the butler and the heroine standing facing each other at distance with the marble bier and the sleeping thorn-bound double lying between them, all three figures equally illuminated by silvery moonlight from the high windows above, the air between them seeming to vibrate with held breath, a single fresh crimson rose on the floor between them, breathtaking solemn beauty.

### 8.9 `glove_to_lips_tear`
**役割:** 白手袋で口を覆い、月光を弾く瞳  
**使用シーン:** `s5_17`, `s5_18`, `s5_choice1`
**Prompt:**
> [STYLE]. Tight close-up of the butler's face in profile in moonlight, his white-gloved hand pressed to his mouth as if to silence himself after speaking what should not be said, deep indigo eyes glistening with unshed tears reflecting the moonlight like silver mirrors, raven hair catching cool blue highlights, a single teardrop just escaping the corner of his eye, painfully restrained emotion.

### 8.10 `final_kiss`
**役割:** 最終選択キスの瞬間  
**使用シーン:** `s5_aft1`, `s5_aft2`, `s5_aft3`
**Prompt:**
> [STYLE]. Intimate close-up at the moment of a kiss in moonlight, the heroine's silhouette in profile rising on tiptoes pressing her lips gently to the butler's, his eyes wide in shock then beginning to close, his white-gloved hand trembling as it rises to her shoulder, silver moonlight haloing both figures, a single crimson rose petal drifting between their faces, the air seeming to hold still, sacred climax.

### 8.11 `final_refuse`
**役割:** 最終選択拒絶の背中  
**使用シーン:** `s5_aft4`
**Prompt:**
> [STYLE]. Wide quiet shot in the moonlit tower chamber, the heroine in mid-stride with her back to the camera walking toward the door away from the bier, her shoulders trembling, behind her the butler standing perfectly straight and composed by the marble bier with head bowed and white-gloved hands clasped in front of him in a final formal bow of farewell, no anger no plea, just dignified silent acceptance, devastating restraint.

---

## 9. エンディング (4 枚)

### 9.1 `end_true_roses`
**役割:** 茨が薔薇に変わる、塔を覆い尽くす  
**使用シーン:** TRUE END (`ENDINGS.true.bg`)
**Prompt:**
> [STYLE]. Magical wide cinematic shot of the Gothic tower at midnight transforming, the dark stone walls being engulfed by a tidal wave of blooming crimson roses surging upward through the black thorns that crumble to dust, petals showering through the cool moonlit air like rain, soft silver glow breaking through scattered clouds above, two distant figures embracing on a high tower balcony silhouetted against the moon, the entire manor drinking in transformative golden-rose magical light, ecstatic cathartic beauty.

### 9.2 `end_normal_bell`
**役割:** 半身の絆、館の鐘  
**使用シーン:** NORMAL END (`ENDINGS.normal.bg`)
**Prompt:**
> [STYLE]. Quiet wide shot of the manor at twilight after a peaceful day, an ancient bronze bell hanging in a small stone belfry tolling softly, warm golden lamplight glowing in two tall ground-floor windows, two figures partially visible inside through the lacy curtains seated together by a fireplace, the rose gardens below glimmering with the last of evening, no tragedy and no triumph, an in-between peace, melancholic acceptance.

### 9.3 `end_bitter_carriage_glove`
**役割:** 別離の手袋、馬車に乗る  
**使用シーン:** BITTERSWEET END (`ENDINGS.bitter.bg`)
**Prompt:**
> [STYLE]. Bittersweet wide shot at dawn outside the manor's front gates, a Victorian carriage waiting with horses breathing steam in the cold air, the heroine seen from behind being helped into the carriage, in her gloved hands she clutches **a single immaculate white butler's glove** against her chest as if it were a heart, fog rolling in obscuring the manor behind, and a single tall figure in black standing motionless watching from the manor doorway, his presence felt rather than fully seen, melancholy yearning.

### 9.4 `end_bad_black_rose_ash`
**役割:** 黒い薔薇が灰となって崩れる  
**使用シーン:** BAD END (`ENDINGS.bad.bg`)
**Prompt:**
> [STYLE]. Disturbing close-up shot in eternal twilight, a single perfect black rose lying on a polished marble floor of an empty tower chamber, the rose visibly **crumbling to fine grey ash before our eyes**—the lower petals already dust drifting on a cold breeze, the upper petals still holding form for one more breath, beyond it the marble bier stands empty and the tower door stands open onto pure darkness, no figures, atmosphere of haunted finality, a single point of light reflected in the ash like a watching eye.

---

## 10. 後続実装 (本 Issue ではなく別 Issue で扱う)

50 枚すべて生成・配置されたあと、以下を別 Issue として実装する:

1. `images/<key>.webp` (約 50 ファイル) を配置
2. `scenes.js` の `IMG` マップを 50+ キーに置き換え (旧 5 キー `hall`/`corridor`/`closeup`/`gloves`/`bowing` も新キーへ統合または削除)
3. `scenes.js` の各シーン `bg` / `character` 参照を新 IMG キーへ書き換え (約 166 箇所)
4. `index.html` のタイトル背景を `images/gate_butler.webp` に差し替え済み
5. `index.html` のクレジット背景を `images/end_normal_bell.webp` に差し替え済み
6. `script.js` の `ENDINGS[*].bg` を新キーへ差し替え (4 箇所)
7. 不要になった旧サンプル画像を削除済み
8. `BUILD_GUIDE.md` のアセット表を 50 枚構成に追従
9. ブラウザで全シーン・全エンディング踏破して画像が正しく差し替わっていることを確認

実装フェーズの分担:
- 各画像の生成: ユーザ (gpt-image-2 で IMAGE_PLAN.md の Prompt を順に実行)
- ファイル配置: ユーザ (ダウンロードしたものを `images/` に配置)
- IMG マップ更新・scene 書き換え: 後続 Issue で Claude が実装

---

## 11. 補足: gpt-image-2 で生成する際のコツ

- Style プレフィックス (§ 1) は **省略しない**。一貫性が下がる
- セバスチャンの顔を出す画像は、§ 2.1 のキャラクタ仕様文 (`tall slender butler in black tailcoat with white gloves, raven shoulder-length hair...`) を Prompt 内に明示的に含める
- 主人公が映る画像は、§ 2.2 のルール (`face not shown directly`) を Prompt に明示する
- 1 枚に対して 2〜3 回生成して気に入った 1 枚を選ぶのが現実的 (Suno と同様)
- 解像度は **横 1920px 以上** が望ましい (CSS background-size:cover でブラウザ全画面表示するため)
