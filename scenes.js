/* ============================================================
   SEBASTIAN — 真夜中の薔薇館
   Scene Data
   ============================================================ */

const IMG = {
  hall:    'images/image3.png',  // 大広間・階段
  corridor:'images/image1.png',  // 暗い廊下
  closeup: 'images/image2.png',  // 顔のクローズアップ
  gloves:  'images/image4.png',  // 白手袋を整える
  bowing:  'images/image5.png',  // 礼をする
};

const SCENES = {

  /* ========================================
     CHAPTER 1 ─ 嵐の夜の到着
     ======================================== */
  start:{
    chapter:1,
    bg:IMG.hall,
    character:null,
    speaker:'',
    bgm:'bgm1',
    text:'<span class="narration">―― 一八九X年、霧深き秋の夜。<br>あなたを乗せた馬車は、人里離れた断崖の上に建つ「ヴァルディア伯爵邸」へと辿り着いた。</span>',
    next:'s1_2'
  },
  s1_2:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">天涯孤独となったあなたを引き取ってくださったのは、亡き母の遠縁にあたるヴァルディア伯爵。<br>しかしその伯爵は、半年前から行方不明だという。</span>',
    next:'s1_3'
  },
  s1_3:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">門の前で待っていたのは、雨に濡れた黒衣の男――この館の執事だった。</span>',
    next:'s1_4'
  },
  s1_4:{
    bg:IMG.hall,
    character:IMG.bowing,
    effect:'character-show',
    speaker:'セバスチャン',
    text:'お待ちしておりました、お嬢様。<br>私はこの館で執事を務めております、セバスチャン・ヴァルディアと申します。',
    next:'s1_5'
  },
  s1_5:{
    character:IMG.bowing,
    speaker:'セバスチャン',
    text:'伯爵様の代理として、この館の一切を取り仕切っております。<br>……どうか、ご無礼をお許しくださいませ。',
    next:'s1_6'
  },
  s1_6:{
    character:IMG.closeup,
    effect:'heartbeat-start',
    speaker:'',
    text:'<span class="narration">顔を上げた瞬間――息が止まった。<br>蝋燭の灯に浮かぶその瞳は、夜の海のように深く、底が見えなかった。</span>',
    next:'s1_choice1'
  },
  s1_choice1:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……何か?',
    choices:[
      {text:'「い、いえ……素敵な瞳をされていると思って」', affection:+2, next:'s1_a1'},
      {text:'「冷たい人ね、あなた」',                       affection:-1, next:'s1_a2'},
      {text:'「よろしくお願いします、セバスチャン」',       affection:+1, next:'s1_a3'},
    ]
  },
  s1_a1:{
    character:IMG.closeup,
    effect:'heartbeat-stop',
    speaker:'セバスチャン',
    text:'……まあ。お嬢様の方が、よほどお美しゅうございますよ。<br>(かすかに、口元が綻んだ気がした)',
    next:'s1_7'
  },
  s1_a2:{
    character:IMG.closeup,
    effect:'heartbeat-stop',
    speaker:'セバスチャン',
    text:'……仰る通りです。<br>私は人形のようなものですから、お嬢様。',
    next:'s1_7'
  },
  s1_a3:{
    character:IMG.closeup,
    effect:'heartbeat-stop',
    speaker:'セバスチャン',
    text:'こちらこそ。<br>あなたのお世話を、生涯かけて務めさせていただきます。',
    next:'s1_7'
  },
  s1_7:{
    bg:IMG.hall,
    character:IMG.bowing,
    speaker:'セバスチャン',
    text:'お部屋へご案内致します。<br>……ただし、一つだけお願いがございます。',
    next:'s1_8'
  },
  s1_8:{
    character:IMG.closeup,
    effect:'shake',
    speaker:'セバスチャン',
    bgm:'bgm2',
    text:'夜半――決して、西の塔へは近づかないように。',
    next:'s1_9'
  },
  s1_9:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'それが、亡き伯爵様……いえ、現当主からの唯一の命令にございます。',
    next:'s1_choice2'
  },
  s1_choice2:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">禁忌――その響きが、胸の奥でちりちりと鳴る。</span>',
    choices:[
      {text:'「分かりました。お約束します」',           affection:+2, next:'s1_b1'},
      {text:'「西の塔には、何があるんですか?」',       affection:0,  next:'s1_b2'},
      {text:'「秘密……ね。面白いじゃない」',           affection:-1, next:'s1_b3'},
    ]
  },
  s1_b1:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……ありがとうございます。<br>あなたは、聡明なお方だ。',
    next:'s1_end'
  },
  s1_b2:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……知らぬが、お嬢様の幸せでございます。<br>どうか、お忘れください。',
    next:'s1_end'
  },
  s1_b3:{
    character:IMG.closeup,
    effect:'shake',
    speaker:'セバスチャン',
    text:'……お嬢様。<br>好奇心は、時に身を滅ぼします。覚えておいてくださいませ。',
    next:'s1_end'
  },
  s1_end:{
    bg:IMG.hall,
    character:null,
    speaker:'',
    bgm:'bgm1',
    text:'<span class="narration">こうして、薔薇館での最初の夜が始まった――。</span>',
    next:'chapter2_intro'
  },

  /* ========================================
     CHAPTER 2 ─ 真夜中の物音
     ======================================== */
  chapter2_intro:{
    chapter:2,
    bg:IMG.corridor,
    character:null,
    speaker:'',
    bgm:'bgm2',
    text:'<span class="narration">― 第二章 真夜中の物音 ―</span>',
    next:'s2_1'
  },
  s2_1:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">深夜。雨音に混じって、聞き覚えのない調べがどこからか流れてきた。<br>古いピアノの旋律――しかし、調律のずれた音色はひどく哀しげだ。</span>',
    next:'s2_2'
  },
  s2_2:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">音を辿るように廊下へ出る。蝋燭は、なぜか全て消えていた。</span>',
    effect:'heartbeat-start',
    next:'s2_3'
  },
  s2_3:{
    bg:IMG.corridor,
    speaker:'???',
    text:'……お嬢様。',
    next:'s2_4'
  },
  s2_4:{
    bg:IMG.corridor,
    character:IMG.closeup,
    effect:'character-show shake',
    speaker:'セバスチャン',
    text:'こんな夜更けに、どうなさいました。',
    next:'s2_5'
  },
  s2_5:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">闇の中、彼の瞳だけが燭光のように揺れていた。<br>息が、できない。</span>',
    next:'s2_choice1'
  },
  s2_choice1:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……お答えくださいますか?',
    choices:[
      {text:'「物音がしたから……怖くて」',                   affection:+1, next:'s2_a1'},
      {text:'「あなたを、探していたの」',                   affection:+3, next:'s2_a2'},
      {text:'「西の塔の音じゃないの? 答えなさい」',         affection:-2, next:'s2_a3'},
    ]
  },
  s2_a1:{
    character:IMG.closeup,
    effect:'heartbeat-stop',
    speaker:'セバスチャン',
    text:'……お一人でしたか。<br>申し訳ございません。私の不徳の致すところで。',
    next:'s2_6'
  },
  s2_a2:{
    character:IMG.closeup,
    effect:'heartbeat-stop',
    speaker:'セバスチャン',
    text:'……っ。<br>そのような言葉、執事に向ける言葉ではございませんよ、お嬢様。<br>(けれど、声が、わずかに震えていた)',
    next:'s2_6'
  },
  s2_a3:{
    character:IMG.closeup,
    effect:'shake',
    speaker:'セバスチャン',
    text:'……お嬢様。<br>あの音は、風がガラスを鳴らしたものに過ぎません。<br>お部屋に戻りましょう。今すぐに。',
    next:'s2_6'
  },
  s2_6:{
    character:IMG.gloves,
    effect:'character-show',
    speaker:'セバスチャン',
    text:'(白手袋を、ゆっくりと整えながら)<br>……お部屋までお送り致します。手を、お貸しいただけますか。',
    next:'s2_choice2'
  },
  s2_choice2:{
    character:IMG.gloves,
    speaker:'',
    text:'<span class="narration">差し伸べられた、白い手袋の手。</span>',
    choices:[
      {text:'そっと、その手を取る',           affection:+3, next:'s2_b1'},
      {text:'ためらいながら手を重ねる',       affection:+1, next:'s2_b2'},
      {text:'手を取らず、自分で歩く',         affection:-1, next:'s2_b3'},
    ]
  },
  s2_b1:{
    character:IMG.gloves,
    effect:'flash',
    speaker:'セバスチャン',
    text:'……熱い。<br>(手袋越しでも、はっきりと伝わるあなたの体温に、彼は息を呑んだ)',
    next:'s2_7'
  },
  s2_b2:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'……ありがとうございます、お嬢様。<br>怖い思いをさせて、申し訳ございません。',
    next:'s2_7'
  },
  s2_b3:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'……。<br>かしこまりました。<br>(その手は、行き場をなくしたまま、空を握った)',
    next:'s2_7'
  },
  s2_7:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'お嬢様。<br>……どうか、私を、信じすぎないでくださいませ。',
    next:'s2_end'
  },
  s2_end:{
    bg:IMG.corridor,
    character:null,
    speaker:'',
    text:'<span class="narration">何故、そんなことを。<br>言葉を返す前に、彼は闇に溶けるように、廊下の奥へと消えていった。</span>',
    effect:'heartbeat-stop',
    next:'chapter3_intro'
  },

  /* ========================================
     CHAPTER 3 ─ 紅茶と告白
     ======================================== */
  chapter3_intro:{
    chapter:3,
    bg:IMG.hall,
    character:null,
    speaker:'',
    bgm:'bgm1',
    text:'<span class="narration">― 第三章 紅茶と告白 ―</span>',
    next:'s3_1'
  },
  s3_1:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">翌朝。陽光が薔薇窓から差し込み、館は別世界のように輝いていた。<br>昨夜の出来事が、まるで夢のように思える。</span>',
    next:'s3_2'
  },
  s3_2:{
    bg:IMG.hall,
    character:IMG.gloves,
    effect:'character-show',
    speaker:'セバスチャン',
    text:'おはようございます、お嬢様。<br>朝の紅茶をご用意致しました。バラの花弁を散らしたものでございます。',
    next:'s3_3'
  },
  s3_3:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'……昨夜は、お見苦しいところを。<br>夢の中の出来事として、お忘れいただければ幸いです。',
    next:'s3_choice1'
  },
  s3_choice1:{
    character:IMG.gloves,
    speaker:'',
    text:'<span class="narration">忘れろ、と。<br>けれど、握られた手の温度は、まだ残っていた。</span>',
    choices:[
      {text:'「忘れられない――あなたのことが」',           affection:+3, next:'s3_a1'},
      {text:'「セバスチャン、本当のことを話して」',       affection:+1, next:'s3_a2'},
      {text:'「分かったわ。忘れる」',                       affection:0,  next:'s3_a3'},
    ]
  },
  s3_a1:{
    character:IMG.closeup,
    effect:'flash heartbeat-start',
    speaker:'セバスチャン',
    text:'……ッ。<br>お嬢様、それは……。<br>(白い頬に、わずかに朱が走った)',
    next:'s3_4'
  },
  s3_a2:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'本当のこと、ですか。<br>……それを聞いて、お嬢様は、後悔なさいませんか。',
    next:'s3_4'
  },
  s3_a3:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……ありがとうございます。<br>(その瞳に、ほんの少し、寂しげな影が差した)',
    next:'s3_4'
  },
  s3_4:{
    bg:IMG.hall,
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……お嬢様。<br>一つだけ、申し上げてもよろしいでしょうか。',
    next:'s3_5'
  },
  s3_5:{
    character:IMG.closeup,
    effect:'heartbeat-start',
    speaker:'セバスチャン',
    bgm:'bgm2',
    text:'私が、この館で執事を務めて――もう五十年になります。',
    next:'s3_6'
  },
  s3_6:{
    character:IMG.closeup,
    effect:'shake',
    speaker:'',
    text:'<span class="narration">五十年。<br>目の前にいる青年は、どう見ても二十代半ばだというのに。</span>',
    next:'s3_choice2'
  },
  s3_choice2:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……お逃げになっても、構わないのですよ。',
    choices:[
      {text:'「逃げないわ。あなたのそばにいる」',         affection:+3, next:'s3_b1'},
      {text:'「……怖い。けれど、聞かせて」',             affection:+2, next:'s3_b2'},
      {text:'「そんな話、信じられないわ!」',             affection:-2, next:'s3_b3'},
    ]
  },
  s3_b1:{
    character:IMG.closeup,
    effect:'flash',
    speaker:'セバスチャン',
    text:'……お嬢様。<br>何故、あなたという方は、そう……私を試すような言葉を仰るのですか。',
    next:'s3_7'
  },
  s3_b2:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……ありがとうございます。<br>怖いと、仰ってくださって。<br>その方が、ずっと、人間らしい。',
    next:'s3_7'
  },
  s3_b3:{
    character:IMG.closeup,
    effect:'shake',
    speaker:'セバスチャン',
    text:'……ええ。<br>信じない方が、お嬢様のためでございます。',
    next:'s3_7'
  },
  s3_7:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'伯爵様は、行方不明ではございません。<br>……西の塔に、おわします。',
    effect:'heartbeat-stop',
    next:'s3_end'
  },
  s3_end:{
    bg:IMG.hall,
    character:null,
    speaker:'',
    text:'<span class="narration">紅茶のカップから立ちのぼる湯気が、ゆらりと震えた。<br>真実は、もう、すぐそこにあった。</span>',
    next:'chapter4_intro'
  },

  /* ========================================
     CHAPTER 4 ─ 西の塔
     ======================================== */
  chapter4_intro:{
    chapter:4,
    bg:IMG.corridor,
    character:null,
    speaker:'',
    bgm:'bgm2',
    text:'<span class="narration">― 第四章 西の塔の真実 ―</span>',
    next:'s4_1'
  },
  s4_1:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">禁忌の塔。鉄錆びた螺旋階段を、セバスチャンは無言で先導する。<br>一段ごとに、心臓が竪琴のように鳴った。</span>',
    effect:'heartbeat-start',
    next:'s4_2'
  },
  s4_2:{
    bg:IMG.corridor,
    character:IMG.bowing,
    effect:'character-show',
    speaker:'セバスチャン',
    text:'……ここから先は、私の故郷でございます。<br>お嬢様。最後にもう一度、お聞きします。',
    next:'s4_3'
  },
  s4_3:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'お戻りになりますか。<br>このまま何も知らずに、明朝、馬車を呼ぶこともできます。',
    next:'s4_choice1'
  },
  s4_choice1:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">最後の岐路。<br>引き返すなら、今しかない。</span>',
    choices:[
      {text:'「進むわ。あなたと一緒に」',                 affection:+4, next:'s4_a1'},
      {text:'「逃げるなら、あなたも一緒に来て」',         affection:+2, next:'s4_a2'},
      {text:'「……戻るわ。私は、何も見なかった」',       affection:-3, next:'s4_a3'},
    ]
  },
  s4_a1:{
    character:IMG.closeup,
    effect:'flash',
    speaker:'セバスチャン',
    text:'……お嬢様は、どこまで、私を……。<br>(初めて、彼の声が崩れた)',
    next:'s4_4'
  },
  s4_a2:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'お嬢様。<br>……私は、この館を出ることが、できないのです。',
    next:'s4_4'
  },
  s4_a3:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……それが、賢明でございます。<br>けれど、最後にこれだけは、お話しさせてください。',
    next:'s4_4'
  },
  s4_4:{
    bg:IMG.corridor,
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'西の塔に眠るのは――<br>呪いを受け、姿を保てなくなった、現当主。<br>すなわち、私自身の影でございます。',
    next:'s4_5'
  },
  s4_5:{
    character:IMG.closeup,
    effect:'shake heartbeat-start',
    speaker:'セバスチャン',
    text:'私は、ヴァルディア家の血を継ぐ者。<br>呪いにより、半身は人として、半身は獣として、この館に縛られております。',
    next:'s4_6'
  },
  s4_6:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'執事を演じてきたのは、客人を欺き、自らの正体を隠すため。<br>……お嬢様を、お招きしたのも、本当は。',
    next:'s4_7'
  },
  s4_7:{
    character:IMG.closeup,
    effect:'flash',
    speaker:'セバスチャン',
    text:'呪いを解く鍵は、ヴァルディアの血を引く者の、真実の愛だと――そう、伝えられているのです。',
    next:'s4_choice2'
  },
  s4_choice2:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……あなたを、利用するつもりでした。<br>お嫌い、なさいますか。',
    choices:[
      {text:'「嫌いになんて、なれない」',                 affection:+4, next:'s4_b1'},
      {text:'「……分かった。私が呪いを解くわ」',         affection:+3, next:'s4_b2'},
      {text:'「ひどい人ね、あなたって」',                 affection:-2, next:'s4_b3'},
      {text:'「私を騙したのね……許せない」',             affection:-4, next:'s4_b4'},
    ]
  },
  s4_b1:{
    character:IMG.closeup,
    effect:'flash heartbeat-stop',
    speaker:'セバスチャン',
    text:'……お嬢様。<br>(初めて、彼は跪き、あなたの手の甲に唇を寄せた)<br>あなたという、人は……。',
    next:'s4_end'
  },
  s4_b2:{
    character:IMG.closeup,
    effect:'heartbeat-stop',
    speaker:'セバスチャン',
    text:'……それは、命の懸かる賭けです。<br>本当に、よろしいのですか。',
    next:'s4_end'
  },
  s4_b3:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……ええ。仰る通りでございます。<br>けれど、私は、あなたを愛してしまった。<br>本当に、ひどい男でございます。',
    next:'s4_end'
  },
  s4_b4:{
    character:IMG.closeup,
    effect:'shake',
    speaker:'セバスチャン',
    text:'……当然の、お言葉です。<br>明朝、馬車をご用意致します。<br>どうか、二度と、この館を思い出さないでくださいませ。',
    next:'s4_end'
  },
  s4_end:{
    bg:IMG.corridor,
    character:null,
    speaker:'',
    text:'<span class="narration">塔の最上階。<br>月光に照らされて、その扉は、静かにあなたを待っていた。</span>',
    effect:'heartbeat-stop',
    next:'chapter5_intro'
  },

  /* ========================================
     CHAPTER 5 ─ 月夜の誓い
     ======================================== */
  chapter5_intro:{
    chapter:5,
    bg:IMG.hall,
    character:null,
    speaker:'',
    bgm:'bgm2',
    text:'<span class="narration">― 最終章 月夜の誓い ―</span>',
    next:'s5_1'
  },
  s5_1:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">塔の扉が開かれた。<br>そこに横たわっていたのは――茨に縛られ、眠る、もう一人のセバスチャン。</span>',
    next:'s5_2'
  },
  s5_2:{
    bg:IMG.hall,
    character:IMG.closeup,
    effect:'character-show',
    speaker:'セバスチャン',
    text:'これが、私の本当の姿。<br>呪いに侵された、半身でございます。',
    next:'s5_3'
  },
  s5_3:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'お嬢様。<br>真実の口づけを賜れば、私は人として完全になれる。<br>……ですが、もし、あなたの愛が偽りであれば。',
    next:'s5_4'
  },
  s5_4:{
    character:IMG.closeup,
    effect:'heartbeat-start shake',
    speaker:'セバスチャン',
    text:'……あなたが、命を落とします。<br>これが、ヴァルディアの呪い。',
    next:'s5_choice1'
  },
  s5_choice1:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">月光が、彼の頬を白く濡らしていた。<br>あなたの心は、どう答える?</span>',
    choices:[
      {text:'迷わず、彼に口づける',                       affection:+3, next:'ending_branch'},
      {text:'「あなたを愛している」と告げてから、口づける', affection:+2, next:'ending_branch'},
      {text:'抱きしめて、「一緒に呪いを背負う」と誓う',   affection:+2, next:'ending_branch'},
      {text:'「ごめんなさい」と踵を返す',                 affection:-5, next:'ending_branch'},
    ]
  },

  /* ending_branch is handled by engine: routes by affection */
};
