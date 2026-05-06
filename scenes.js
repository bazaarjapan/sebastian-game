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
    next:'s1_pre1'
  },
  s1_pre1:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">車輪が石畳を叩く音だけが、永遠のように続いている。<br>窓の外、深い森は闇に沈み、稲妻が走るたびに、見たこともない樹々の輪郭が浮かんでは消えた。</span>',
    next:'s1_pre2'
  },
  s1_pre2:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">膝の上には、亡き父の銀の懐中時計。<br>蓋を開けば、刻まれた紋章は擦り切れて、もう、どの家のものかも判別できない。</span>',
    next:'s1_pre3'
  },
  s1_pre3:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">――両親を流行り病で失って、ひと月。<br>身寄りといえば、会ったこともない遠縁の伯爵だけ。<br>「ヴァルディア家でお引き取りいただけることになりました」と、弁護士は事務的に告げた。</span>',
    next:'s1_2'
  },
  s1_2:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">天涯孤独となったあなたを引き取ってくださったのは、亡き母の遠縁にあたるヴァルディア伯爵。<br>しかしその伯爵は、半年前から行方不明だという。</span>',
    next:'s1_2b'
  },
  s1_2b:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">それでも、行く当てのないあなたを、館は迎え入れると返書を寄越した。<br>差出人の署名は――「執事 セバスチャン・ヴァルディア」。</span>',
    next:'s1_3'
  },
  s1_3:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">不意に、雷光が空を裂いた。<br>その閃きの中、断崖の頂に黒い影絵のように浮かび上がる、尖塔の連なり。<br>――それが、ヴァルディア伯爵邸だった。</span>',
    next:'s1_3b'
  },
  s1_3b:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">門の前で待っていたのは、雨に濡れた黒衣の男――この館の執事だった。<br>傘もささず、燭台ひとつを手にして、ただ、静かに佇んでいた。</span>',
    next:'s1_4'
  },
  s1_4:{
    bg:IMG.hall,
    character:IMG.bowing,
    effect:'character-show',
    speaker:'セバスチャン',
    text:'お待ちしておりました、お嬢様。<br>私はこの館で執事を務めております、セバスチャン・ヴァルディアと申します。',
    next:'s1_4b'
  },
  s1_4b:{
    character:IMG.bowing,
    speaker:'',
    text:'<span class="narration">深く下げられた頭。雨粒は、その黒髪を伝って、燭台の炎に小さく弾けた。<br>その所作の、隙のなさ。執事というには、あまりに端正に過ぎる。</span>',
    next:'s1_5'
  },
  s1_5:{
    character:IMG.bowing,
    speaker:'セバスチャン',
    text:'伯爵様の代理として、この館の一切を取り仕切っております。<br>……どうか、ご無礼をお許しくださいませ。',
    next:'s1_5b'
  },
  s1_5b:{
    character:IMG.bowing,
    speaker:'',
    text:'<span class="narration">声は低く、雨音をするりとくぐり抜けてあなたの耳に届く。<br>無礼など、どこにあるというのか。彼ほど慇懃な男に、まだ会ったことがなかった。</span>',
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
    text:'お部屋へご案内致します。<br>長旅でお疲れでしょう。湯浴みの支度も、整えてございます。',
    next:'s1_7b'
  },
  s1_7b:{
    bg:IMG.hall,
    character:null,
    speaker:'',
    text:'<span class="narration">先導されて踏み入った大広間は、想像を絶する広さだった。<br>天井から吊られた燭台はどれも半分以上が消え、磨き上げられた床にだけ、点々と炎が映り込んでいる。</span>',
    next:'s1_7c'
  },
  s1_7c:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">壁に飾られた歴代当主の肖像画は、なぜかどれも、目元だけが布で隠されていた。<br>(……どうして、目だけを?)<br>訊ねようとした唇が、なぜか動かなかった。</span>',
    next:'s1_7d'
  },
  s1_7d:{
    bg:IMG.hall,
    character:IMG.bowing,
    effect:'character-show',
    speaker:'セバスチャン',
    text:'こちらが、お嬢様のお部屋でございます。<br>南向きの一室を、急ぎ整えさせていただきました。',
    next:'s1_8_pre'
  },
  s1_8_pre:{
    character:IMG.bowing,
    speaker:'セバスチャン',
    text:'……それから、お嬢様。<br>お休みになる前に、一つだけお願いがございます。',
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
    next:'s1_post1'
  },
  s1_b2:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……知らぬが、お嬢様の幸せでございます。<br>どうか、お忘れください。',
    next:'s1_post1'
  },
  s1_b3:{
    character:IMG.closeup,
    effect:'shake',
    speaker:'セバスチャン',
    text:'……お嬢様。<br>好奇心は、時に身を滅ぼします。覚えておいてくださいませ。',
    next:'s1_post1'
  },
  s1_post1:{
    bg:IMG.hall,
    character:IMG.bowing,
    speaker:'セバスチャン',
    text:'では、ごゆるりとお休みくださいませ。<br>……もし、何ぞございましたら、扉をお叩きください。私は、どこにでもおりますゆえ。',
    next:'s1_post2'
  },
  s1_post2:{
    bg:IMG.hall,
    character:null,
    speaker:'',
    text:'<span class="narration">扉が、すうと閉まる。<br>その音すら、彼の所作と同じくらい静かだった。</span>',
    next:'s1_post3'
  },
  s1_post3:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">天蓋の絹は色褪せ、暖炉の薪は赤く燃えていた。<br>誰がこの火を熾したのか――この館にいるのは、たった一人の執事だけだというのに。</span>',
    next:'s1_post4'
  },
  s1_post4:{
    bg:IMG.hall,
    speaker:'',
    effect:'heartbeat-start',
    text:'<span class="narration">ベッドに身を沈めると、心臓が、まだ妙な律動を刻んでいた。<br>(……あの瞳を、思い出してはいけない)<br>そう言い聞かせるほど、瞼の裏に、夜の海が広がる。</span>',
    next:'s1_end'
  },
  s1_end:{
    bg:IMG.hall,
    character:null,
    speaker:'',
    effect:'heartbeat-stop',
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
    next:'s2_1b'
  },
  s2_1b:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">どこかで聞いた旋律。<br>(……これは、母が子守唄に弾いてくれた曲。<br>けれど、誰も知らないはずの、私だけの記憶のはず)</span>',
    next:'s2_1c'
  },
  s2_1c:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">枕元の燭台に火を灯す。指先が、わずかに震えていた。<br>こんな夜半に廊下を歩くなど、礼儀知らずだと、母なら叱ったろうか。<br>――けれど、足は、もう扉に向かっていた。</span>',
    next:'s2_2'
  },
  s2_2:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">音を辿るように廊下へ出る。蝋燭は、なぜか全て消えていた。</span>',
    effect:'heartbeat-start',
    next:'s2_2b'
  },
  s2_2b:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">手にした燭台の炎だけが、ぽつり、と石壁を照らす。<br>歩を進めるたび、自分の影が床を這って、まるで別の何かが付いてくるようだった。</span>',
    next:'s2_2c'
  },
  s2_2c:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">旋律はだんだんと近くなる。<br>けれど、近づくほどに――<br>それは、ピアノではなく、誰かが口ずさむ声のように聞こえはじめた。</span>',
    next:'s2_3'
  },
  s2_3:{
    bg:IMG.corridor,
    speaker:'???',
    text:'……お嬢様。',
    next:'s2_3b'
  },
  s2_3b:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">背後から、雨音より低い声。<br>振り向こうとして、振り向けない。<br>振り向けば、何かが、決定的に変わってしまう気がした。</span>',
    next:'s2_4'
  },
  s2_4:{
    bg:IMG.corridor,
    character:IMG.closeup,
    effect:'character-show shake',
    speaker:'セバスチャン',
    text:'こんな夜更けに、どうなさいました。',
    next:'s2_4b'
  },
  s2_4b:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">――燭台を、彼は持っていなかった。<br>それなのに、闇の中で、その輪郭だけがはっきりと浮かび上がっていた。<br>まるで、夜そのものが、彼を縁取っているかのように。</span>',
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
    next:'s2_a_join'
  },
  s2_a2:{
    character:IMG.closeup,
    effect:'heartbeat-stop',
    speaker:'セバスチャン',
    text:'……っ。<br>そのような言葉、執事に向ける言葉ではございませんよ、お嬢様。<br>(けれど、声が、わずかに震えていた)',
    next:'s2_a_join'
  },
  s2_a3:{
    character:IMG.closeup,
    effect:'shake',
    speaker:'セバスチャン',
    text:'……お嬢様。<br>あの音は、風がガラスを鳴らしたものに過ぎません。<br>お部屋に戻りましょう。今すぐに。',
    next:'s2_a_join'
  },
  s2_a_join:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">彼の答えは、どれも、はぐらかすようでいて――<br>けれど、その瞳は、嘘をつくには、深すぎた。</span>',
    next:'s2_a_join2'
  },
  s2_a_join2:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……あの旋律は、お聞きにならなかったことに、どうかなさってくださいませ。<br>古い館には、雨と風に応える、古い音が住まうものでございます。',
    next:'s2_6'
  },
  s2_6:{
    character:IMG.gloves,
    effect:'character-show',
    speaker:'セバスチャン',
    text:'(白手袋を、ゆっくりと整えながら)<br>……お部屋までお送り致します。手を、お貸しいただけますか。',
    next:'s2_6b'
  },
  s2_6b:{
    character:IMG.gloves,
    speaker:'',
    text:'<span class="narration">差し出された手袋の白さ。<br>夜の闇の中で、それだけが、まるで一輪の白百合のように、宙に咲いていた。</span>',
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
    next:'s2_b_join'
  },
  s2_b2:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'……ありがとうございます、お嬢様。<br>怖い思いをさせて、申し訳ございません。',
    next:'s2_b_join'
  },
  s2_b3:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'……。<br>かしこまりました。<br>(その手は、行き場をなくしたまま、空を握った)',
    next:'s2_b_join'
  },
  s2_b_join:{
    bg:IMG.corridor,
    character:IMG.gloves,
    speaker:'',
    text:'<span class="narration">廊下を歩く間、二人の足音は、奇妙なほど揃わなかった。<br>あなたの靴音は石床に残るのに、彼の足音だけは、驚くほど、何ひとつ立てない。</span>',
    next:'s2_b_join2'
  },
  s2_b_join2:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'……お嬢様は、お母様を、覚えておいでですか。',
    next:'s2_b_join3'
  },
  s2_b_join3:{
    character:IMG.gloves,
    speaker:'',
    text:'<span class="narration">唐突な問い。<br>覚えている。覚えているに決まっている。<br>けれど、なぜ今、彼が、それを訊くのだろう。</span>',
    next:'s2_b_join4'
  },
  s2_b_join4:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'……失礼を。<br>夜が深いと、人は、訊いてはならぬことを訊いてしまう。<br>どうか、お忘れくださいませ。',
    next:'s2_7'
  },
  s2_7:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'お嬢様。<br>……どうか、私を、信じすぎないでくださいませ。',
    next:'s2_7b'
  },
  s2_7b:{
    character:IMG.gloves,
    speaker:'',
    text:'<span class="narration">信じる、信じない、ではなく。<br>(……あなたは、何を、私から守ろうとしているの)<br>その問いは、しかし、口にする前に喉の奥で凍った。</span>',
    next:'s2_end'
  },
  s2_end:{
    bg:IMG.corridor,
    character:null,
    speaker:'',
    text:'<span class="narration">何故、そんなことを。<br>言葉を返す前に、彼は闇に溶けるように、廊下の奥へと消えていった。</span>',
    effect:'heartbeat-stop',
    next:'s2_end2'
  },
  s2_end2:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">部屋に戻り、ベッドに腰掛ける。<br>掌には、まだ、白手袋越しの彼の指の感触が残っているような気がした。<br>(……母の弾いた、あの旋律。彼は、知っているのだろうか)</span>',
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
    next:'s3_1b'
  },
  s3_1b:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">窓の下には、思いがけず広い薔薇園が広がっていた。<br>季節外れの霜にも枯れず、深紅・白・くすんだ金色――幾種もの薔薇が、塀沿いに咲き乱れている。<br>(……こんな北方の地で、なぜ、これほどの薔薇が)</span>',
    next:'s3_1c'
  },
  s3_1c:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">階下に降りると、磨き上げられた長卓に、ひと組分の食器が整然と並んでいた。<br>銀のスプーン一本に至るまで、紋章が、一切の曇りなく輝いている。</span>',
    next:'s3_2'
  },
  s3_2:{
    bg:IMG.hall,
    character:IMG.gloves,
    effect:'character-show',
    speaker:'セバスチャン',
    text:'おはようございます、お嬢様。<br>朝の紅茶をご用意致しました。バラの花弁を散らしたものでございます。',
    next:'s3_2b'
  },
  s3_2b:{
    character:IMG.gloves,
    speaker:'',
    text:'<span class="narration">注がれる紅茶の音は、まるで小川のせせらぎのよう。<br>湯気の中に、確かに薔薇の香りが揺れた。<br>――昨夜の闇は、本当に、夢だったのだろうか。</span>',
    next:'s3_2c'
  },
  s3_2c:{
    character:IMG.gloves,
    speaker:'',
    text:'<span class="narration">ひと口、含む。<br>……懐かしい味だった。<br>母が、季節の終わりに、薔薇の花弁を干して湯に浮かべてくれた、あの味。</span>',
    next:'s3_3'
  },
  s3_3:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'……昨夜は、お見苦しいところを。<br>夢の中の出来事として、お忘れいただければ幸いです。',
    next:'s3_3b'
  },
  s3_3b:{
    character:IMG.gloves,
    speaker:'',
    text:'<span class="narration">忘れろ、と。<br>けれど、この紅茶の味を覚えている彼に、忘れろと言われても。<br>(……あなたは、いつから、私のことを知っているの)</span>',
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
    next:'s3_a_join'
  },
  s3_a2:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'本当のこと、ですか。<br>……それを聞いて、お嬢様は、後悔なさいませんか。',
    next:'s3_a_join'
  },
  s3_a3:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……ありがとうございます。<br>(その瞳に、ほんの少し、寂しげな影が差した)',
    next:'s3_a_join'
  },
  s3_a_join:{
    bg:IMG.hall,
    character:null,
    effect:'heartbeat-stop',
    speaker:'セバスチャン',
    text:'……朝のうちは、まだ陽が高うございます。<br>よろしければ、薔薇園を、ご案内致しましょうか。',
    next:'s3_garden1'
  },
  s3_garden1:{
    bg:IMG.hall,
    bgm:'bgm3',
    speaker:'',
    text:'<span class="narration">霧が薄く立ち込める薔薇園を、二人で歩いた。<br>湿った石畳に、彼の靴音だけが、なぜか、相変わらず一切しない。</span>',
    next:'s3_garden2'
  },
  s3_garden2:{
    bg:IMG.hall,
    character:IMG.gloves,
    effect:'character-show',
    speaker:'セバスチャン',
    text:'こちらの深紅は「ヴァルディアの血」と呼ばれております。<br>初代当主が、最愛のご令嬢のために交配なさった、この館の象徴でございます。',
    next:'s3_garden3'
  },
  s3_garden3:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'……一輪、お切りしてもよろしいでしょうか。<br>(剪定鋏が、白手袋越しに、優しく茎を抱いた)',
    next:'s3_garden4'
  },
  s3_garden4:{
    character:IMG.gloves,
    speaker:'',
    text:'<span class="narration">差し出された深紅の薔薇は、まだ朝露に濡れていた。<br>受け取る指先が触れた瞬間、彼の手袋越しの体温が、確かに、伝わった。</span>',
    next:'s3_garden5'
  },
  s3_garden5:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'……お嬢様。<br>この館で、薔薇の名を覚えることは、お時間の浪費ではございません。<br>名を知る、ということは――遺すべき記憶を選ぶ、ということでございます。',
    next:'s3_garden6'
  },
  s3_garden6:{
    character:IMG.gloves,
    speaker:'',
    text:'<span class="narration">遺すべき記憶。<br>その言い回しが、奇妙に胸に引っかかった。<br>(……まるで、自分には記憶を遺す力がない、と言っているような)</span>',
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
    next:'s3_5b'
  },
  s3_5b:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'お嬢様のお祖父様の代から、ずっと。<br>……もしかすると、お嬢様のお母様の、ご幼少のころも、私はこの目で存じております。',
    next:'s3_5c'
  },
  s3_5c:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">――母を、知っている。<br>昨夜の旋律が、なぜ伝わらなかったはずの曲だったのか。<br>その答えが、突然、目の前に横たわっていた。</span>',
    next:'s3_6'
  },
  s3_6:{
    character:IMG.closeup,
    effect:'shake',
    speaker:'',
    text:'<span class="narration">五十年。<br>目の前にいる青年は、どう見ても二十代半ばだというのに。</span>',
    next:'s3_6b'
  },
  s3_6b:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">大広間の柱時計に、ふと目をやる。<br>振り子は、確かに、揺れていない。<br>(……止まっている? いや、最初から、動いていなかったのかもしれない)</span>',
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
    next:'s3_b_join'
  },
  s3_b2:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……ありがとうございます。<br>怖いと、仰ってくださって。<br>その方が、ずっと、人間らしい。',
    next:'s3_b_join'
  },
  s3_b3:{
    character:IMG.closeup,
    effect:'shake',
    speaker:'セバスチャン',
    text:'……ええ。<br>信じない方が、お嬢様のためでございます。',
    next:'s3_b_join'
  },
  s3_b_join:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'お嬢様。<br>……お母様は、若かりし日、よくこの庭で薔薇を摘まれておいででした。<br>祖父である伯爵様の妹君として、生まれ育ったこの館で。',
    next:'s3_b_join2'
  },
  s3_b_join2:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">――母は、ヴァルディアの娘だった。<br>あなたは、知らされていなかった。<br>母は嫁いだあと、生家のことを、決して語らなかったから。</span>',
    next:'s3_b_join3'
  },
  s3_b_join3:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'お嬢様には、ヴァルディアの血が流れております。<br>……それが、この呪われた館に、あなたが招かれた本当の理由でございます。',
    next:'s3_7'
  },
  s3_7:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'伯爵様は、行方不明ではございません。<br>……西の塔に、おわします。',
    effect:'heartbeat-stop',
    next:'s3_7b'
  },
  s3_7b:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">手にしたカップが、震えていた。<br>紅茶の波紋が、自分の動揺を、無慈悲に映し返している。</span>',
    next:'s3_7c'
  },
  s3_7c:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'今宵、月が高く昇ったら――<br>もし、お嬢様にお覚悟がございましたら、私が、塔へお連れ致します。<br>判断は、それまでに。',
    next:'s3_end'
  },
  s3_end:{
    bg:IMG.hall,
    character:null,
    speaker:'',
    text:'<span class="narration">紅茶のカップから立ちのぼる湯気が、ゆらりと震えた。<br>真実は、もう、すぐそこにあった。</span>',
    next:'s3_end2'
  },
  s3_end2:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">日が沈むまでの数時間が、奇妙に長かった。<br>あなたは何度も窓辺に立ち、薔薇園と西の塔の影を、交互に眺めた。<br>覚悟。<br>その言葉が、これほど重く感じられたことは、生涯になかった。</span>',
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
    next:'s4_pre1'
  },
  s4_pre1:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">月が、館の塔よりも高く昇った。<br>窓の外、銀の月光が霧を切り裂き、薔薇園の深紅を、奇妙な色彩のない深紅へと変えていた。</span>',
    next:'s4_pre2'
  },
  s4_pre2:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">部屋の扉が、三度、静かにノックされる。<br>――迎えに来た、と告げる声は、紛れもなく、彼のものだった。</span>',
    next:'s4_pre3'
  },
  s4_pre3:{
    bg:IMG.corridor,
    character:IMG.bowing,
    effect:'character-show',
    speaker:'セバスチャン',
    text:'お嬢様。<br>……お覚悟は、定まりましたか。',
    next:'s4_pre4'
  },
  s4_pre4:{
    character:IMG.bowing,
    speaker:'',
    text:'<span class="narration">頷く。それしか、できなかった。<br>燭台を受け取る指先は、すでに冷たかった。</span>',
    next:'s4_1'
  },
  s4_1:{
    bg:IMG.corridor,
    character:null,
    speaker:'',
    text:'<span class="narration">禁忌の塔。鉄錆びた螺旋階段を、セバスチャンは無言で先導する。<br>一段ごとに、心臓が竪琴のように鳴った。</span>',
    effect:'heartbeat-start',
    next:'s4_1b'
  },
  s4_1b:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">登っても、登っても、塔は終わらない。<br>外から見上げたとき、あの塔は、確かにこんなに高くはなかったはずだ。<br>(……時間が、引き延ばされている)</span>',
    next:'s4_1c'
  },
  s4_1c:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">壁に等間隔で掛けられた肖像画は、すべて、同じ顔をしていた。<br>すべて――セバスチャンの顔。<br>名は、すべて違っていた。</span>',
    next:'s4_2'
  },
  s4_2:{
    bg:IMG.corridor,
    character:IMG.bowing,
    effect:'character-show',
    speaker:'セバスチャン',
    text:'……ここから先は、私の故郷でございます。<br>お嬢様。最後にもう一度、お聞きします。',
    next:'s4_2b'
  },
  s4_2b:{
    character:IMG.bowing,
    speaker:'',
    text:'<span class="narration">故郷、と。<br>振り返った彼の表情は、燭光に揺らいで、初めて、執事の仮面を外したように見えた。</span>',
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
    next:'s4_a_join'
  },
  s4_a2:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'お嬢様。<br>……私は、この館を出ることが、できないのです。',
    next:'s4_a_join'
  },
  s4_a3:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……それが、賢明でございます。<br>けれど、最後にこれだけは、お話しさせてください。',
    next:'s4_a_join'
  },
  s4_a_join:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……階段の途中ではございますが、ここで、すべてをお話し致します。<br>これより先は、覚悟なしには、お入れすることはできません。',
    next:'s4_4'
  },
  s4_4:{
    bg:IMG.corridor,
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'西の塔に眠るのは――<br>呪いを受け、姿を保てなくなった、現当主。<br>すなわち、私自身の影でございます。',
    next:'s4_4b'
  },
  s4_4b:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'いえ、影、というのは比喩ではございません。<br>文字通り、呪いによって、私の半身が、別の肉体として塔に閉じ込められているのです。',
    next:'s4_5'
  },
  s4_5:{
    character:IMG.closeup,
    effect:'shake heartbeat-start',
    speaker:'セバスチャン',
    text:'私は、ヴァルディア家の血を継ぐ者。<br>呪いにより、半身は人として、半身は獣として、この館に縛られております。',
    next:'s4_5b'
  },
  s4_5b:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'呪いをかけたのは――百年前、初代当主の妹君に懸想し、結ばれずに館を呪って自刃した、若い庭師。<br>「ヴァルディアの血を引く者と、真実の愛で結ばれぬかぎり、当主は永遠に、半身として彷徨え」と。',
    next:'s4_5c'
  },
  s4_5c:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'歴代の当主たちは、皆、呪いを解こうとして失敗してまいりました。<br>愛が偽りであれば、選んだ娘の命を奪い、当主自身は、また、塔の中で半身を取り戻せぬまま、何十年も眠るのです。',
    next:'s4_6'
  },
  s4_6:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'執事を演じてきたのは、客人を欺き、自らの正体を隠すため。<br>……お嬢様を、お招きしたのも、本当は。',
    next:'s4_6b'
  },
  s4_6b:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">――母を、知っていた、という告白の意味が、ようやく繋がった。<br>母も、若き日、この呪いを解くために、この館に呼ばれていたのだろうか。</span>',
    next:'s4_6c'
  },
  s4_6c:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'お嬢様のお母様も、かつて、この館に招かれた一人でございました。<br>けれど、彼女は、この呪いを解くことを選ばず、ただ、館を捨てて、外の世で愛する人と生きる道を選ばれた。',
    next:'s4_6d'
  },
  s4_6d:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……それを、私は、誇りに思っておりました。<br>けれど、その娘である、あなたを、結局、この館は呼び寄せてしまった。',
    next:'s4_7'
  },
  s4_7:{
    character:IMG.closeup,
    effect:'flash',
    speaker:'セバスチャン',
    text:'呪いを解く鍵は、ヴァルディアの血を引く者の、真実の愛だと――そう、伝えられているのです。',
    next:'s4_7b'
  },
  s4_7b:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'真実の愛が成就すれば、呪いは解け、私は完全な人間となれます。<br>けれど、もし偽りであれば――娘の命が代償となり、私はまた、半身のまま、何十年も塔に閉じ込められる。',
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
    bgm:'bgm3',
    speaker:'セバスチャン',
    text:'……お嬢様。<br>(初めて、彼は跪き、あなたの手の甲に唇を寄せた)<br>あなたという、人は……。',
    next:'s4_b_join'
  },
  s4_b2:{
    character:IMG.closeup,
    effect:'heartbeat-stop',
    speaker:'セバスチャン',
    text:'……それは、命の懸かる賭けです。<br>本当に、よろしいのですか。',
    next:'s4_b_join'
  },
  s4_b3:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……ええ。仰る通りでございます。<br>けれど、私は、あなたを愛してしまった。<br>本当に、ひどい男でございます。',
    next:'s4_b_join'
  },
  s4_b4:{
    character:IMG.closeup,
    effect:'shake',
    speaker:'セバスチャン',
    text:'……当然の、お言葉です。<br>明朝、馬車をご用意致します。<br>どうか、二度と、この館を思い出さないでくださいませ。',
    next:'s4_b_join'
  },
  s4_b_join:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……それでも、お嬢様。<br>最後の決断は、塔の最上階で、もう一度、お聞きしましょう。<br>言葉ではなく、あなたの心が、答えを出すべきだ。',
    next:'s4_end'
  },
  s4_end:{
    bg:IMG.corridor,
    character:null,
    speaker:'',
    text:'<span class="narration">塔の最上階。<br>月光に照らされて、その扉は、静かにあなたを待っていた。</span>',
    effect:'heartbeat-stop',
    next:'s4_end2'
  },
  s4_end2:{
    bg:IMG.corridor,
    speaker:'',
    text:'<span class="narration">扉の前で、彼は、燭台をあなたに手渡した。<br>ここから先、彼は導くことができないという。<br>呪いを解く儀は、館の血を引く者ひとりが、扉を押し開けて始めるものなのだと。</span>',
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
    bgm:'bgm3',
    text:'<span class="narration">― 最終章 月夜の誓い ―</span>',
    next:'s5_pre1'
  },
  s5_pre1:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">塔の最上階の扉。<br>木目に深く刻まれていたのは、薔薇と茨の絡まる紋章。<br>その中央に、燭台と同じ大きさの鍵穴があった。</span>',
    next:'s5_pre2'
  },
  s5_pre2:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">燭台の柄を、ゆっくりと差し込む。<br>音もなく回り、木の扉は、たいした重さもなく内側へと開いた。<br>(……まるで、私の手で開かれることを、最初から待っていたみたいに)</span>',
    next:'s5_1'
  },
  s5_1:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">塔の扉が開かれた。<br>そこに横たわっていたのは――茨に縛られ、眠る、もう一人のセバスチャン。</span>',
    next:'s5_1b'
  },
  s5_1b:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">大理石の寝台。<br>その全身を覆うのは、生きている茨。葉脈が呼吸するように、ゆっくりと動いていた。<br>顔は、振り向いた彼そのもの。<br>けれど、瞼を閉じたその表情は、五十年眠り続けた者の、深い疲弊を刻んでいた。</span>',
    next:'s5_1c'
  },
  s5_1c:{
    bg:IMG.hall,
    speaker:'',
    text:'<span class="narration">寝台の足元には、枯れた薔薇の花弁が、何十年分も積もっている。<br>これまで、ここに導かれた娘たちの、選ばなかった答えの数だけ。</span>',
    next:'s5_2'
  },
  s5_2:{
    bg:IMG.hall,
    character:IMG.closeup,
    effect:'character-show',
    speaker:'セバスチャン',
    text:'これが、私の本当の姿。<br>呪いに侵された、半身でございます。',
    next:'s5_2b'
  },
  s5_2b:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'お嬢様の前にいる私は、影。<br>半身が眠っている間、館を維持するためだけの幻のようなもので。<br>……五十年、ずっと、こうしてきました。',
    next:'s5_2c'
  },
  s5_2c:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'娘が来るたび、私は出迎え、館を案内し、紅茶を淹れ……。<br>そして、毎度、別れを告げてまいりました。<br>けれど、お嬢様。あなたほど、長く言葉を交わした方は、おりませんでした。',
    next:'s5_2d'
  },
  s5_2d:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">――母の話を、聞き出したくて、何度もお茶の席を所望した。<br>薔薇の名を、覚え切れぬほど教わった。<br>その時間が、彼にとっては、五十年で初めての、奇跡だったというのか。</span>',
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
    next:'s5_4b'
  },
  s5_4b:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'お母様は、それを知って、塔まで来ながら、寝台の前で踵を返された。<br>そして、館を捨てて、外の世で生きる道を選ばれたのです。<br>……賢明な、判断でございました。',
    next:'s5_4c'
  },
  s5_4c:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'お嬢様も、お母様と同じように、踵を返してくださって構いません。<br>私は、また、五十年でも百年でも、眠り続ければよいのです。<br>それが、ヴァルディアに生まれた者の、宿命でございます。',
    next:'s5_5'
  },
  s5_5:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">――けれど。<br>その「賢明な判断」をした母は、生涯、薔薇の紅茶を淹れるたびに、どこか遠くを見つめていた。<br>幸せだったはず。愛する人と生きていたはず。<br>それでも、母は、何かを置き忘れたまま、外の世界で生きていた。</span>',
    next:'s5_6'
  },
  s5_6:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">あなたは、懐から、銀の懐中時計を取り出した。<br>父の形見と思っていた、紋章の擦り切れた時計。<br>けれど、その紋章は、よく見れば――薔薇と茨の絡まる、ヴァルディアの印だった。<br>(……母さん。あなたの、答えだったの)</span>',
    next:'s5_7'
  },
  s5_7:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……それは。<br>お嬢様。それは、お母様の懐中時計でございます。<br>初めて館を訪れた日、お母様が、寝台の脇に置いて行かれた、たった一つの遺品。',
    next:'s5_8'
  },
  s5_8:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">そう、これは父の形見ではなかった。<br>父が、嫁いできた母から預かり、わたしを引き取ってくれた弁護士に託したもの。<br>母は、最後まで、館に何かを残していた。</span>',
    next:'s5_9'
  },
  s5_9:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'お母様は、踵を返されたあとも、毎年、薔薇の咲く頃に、私のもとへ手紙を寄越されました。<br>「あなたを忘れたわけではない。<br>けれど、私には、もう、私の家庭がある」と。',
    next:'s5_10'
  },
  s5_10:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'最後の手紙は、十六年前。<br>「娘が生まれました。<br>もし、私のあとに、もう一度、館があの子を呼ぶ日が来たならば――<br>そのときは、どうか、あの子の心に従ってあげてください」と。',
    next:'s5_11'
  },
  s5_11:{
    character:IMG.closeup,
    effect:'flash',
    speaker:'',
    text:'<span class="narration">――母さん。<br>あなたは、わたしを、ここに来させるつもりだったの?<br>いいえ。あなたは、選択肢を、わたしに残してくれた。<br>逃げてもいい。選んでもいい。<br>どちらも、母の愛だった。</span>',
    next:'s5_12'
  },
  s5_12:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'お嬢様。<br>……お決めになるのは、お嬢様ご自身でございます。<br>私のために、決めてくださる必要は、一片もございません。',
    next:'s5_13'
  },
  s5_13:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'もし、踵を返されるなら――<br>明朝、馬車をご用意致します。<br>この夜のことは、夢として、生涯、お忘れくださいませ。',
    next:'s5_14'
  },
  s5_14:{
    character:IMG.gloves,
    speaker:'セバスチャン',
    text:'もし、進まれるなら――<br>どうか、迷いなく。<br>迷いは、呪いの牙となって、お嬢様の心臓を貫きます。',
    next:'s5_15'
  },
  s5_15:{
    character:IMG.closeup,
    effect:'heartbeat-start',
    speaker:'',
    text:'<span class="narration">月光が、塔の窓から差し込み、寝台の半身と、立つ彼とを、二つながら、白く照らした。<br>本物のセバスチャンは、どちらなのか。<br>――いや。どちらも、本物だった。</span>',
    next:'s5_16'
  },
  s5_16:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">五十年、館を護ってきた執事の影。<br>百年、茨に縛られ眠ってきた、傷ついた半身。<br>その両方を、わたしは、もう、知っていた。</span>',
    next:'s5_17'
  },
  s5_17:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……お嬢様。<br>最後に、ひとつだけ。<br>もし、生まれ変わることが許されるなら、私は、執事ではなく、あなたの隣で薔薇を育てる、ただの一人の男でありたかった。',
    next:'s5_18'
  },
  s5_18:{
    character:IMG.closeup,
    speaker:'セバスチャン',
    text:'……ご無礼を。<br>呪いの男が、口にしてよい言葉では、ございませんでした。<br>(白手袋で、口を覆った。けれど、その瞳は、涙のように、月光を弾いていた)',
    next:'s5_choice1'
  },
  s5_choice1:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">月光が、彼の頬を白く濡らしていた。<br>あなたの心は、どう答える?</span>',
    choices:[
      {text:'迷わず、彼に口づける',                       affection:+3, next:'s5_aft1'},
      {text:'「あなたを愛している」と告げてから、口づける', affection:+2, next:'s5_aft2'},
      {text:'抱きしめて、「一緒に呪いを背負う」と誓う',   affection:+2, next:'s5_aft3'},
      {text:'「ごめんなさい」と踵を返す',                 affection:-5, next:'s5_aft4'},
    ]
  },
  s5_aft1:{
    character:IMG.closeup,
    effect:'flash',
    speaker:'',
    text:'<span class="narration">言葉は要らなかった。<br>背伸びをして、彼の唇に、自分の唇を、そっと重ねる。<br>白手袋越しに、彼の手が、震えながら、わたしの肩を抱いた。</span>',
    next:'ending_branch'
  },
  s5_aft2:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">「セバスチャン――愛してる」<br>声は、自分のものとも思えないほど、はっきりとしていた。<br>言い切ったあとに、初めて、自分の頬が濡れていることに気がついた。<br>そして、唇を、重ねた。</span>',
    next:'ending_branch'
  },
  s5_aft3:{
    character:IMG.closeup,
    speaker:'',
    text:'<span class="narration">「呪いも、半身も、ぜんぶ、わたしと半分こよ」<br>そう言って、抱きしめた。<br>彼の体は、思っていたより細く、月光のように冷たかった。<br>けれど、その鼓動は、確かに、人間のものだった。</span>',
    next:'ending_branch'
  },
  s5_aft4:{
    character:IMG.closeup,
    effect:'shake',
    bgm:'bgm4',
    speaker:'',
    text:'<span class="narration">「ごめんなさい」<br>声が、震えた。<br>踵を返して扉に向かう背中に、彼は何も言わなかった。<br>ただ、白手袋を整え、深く、深く、頭を下げる気配だけがあった。</span>',
    next:'ending_branch'
  },

  /* ending_branch is handled by engine: routes by affection */
};
