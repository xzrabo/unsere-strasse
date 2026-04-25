const DEFAULT_QUESTION = "Wer hat hier gewohnt?";

// Text der am Ende erscheint (editierbar)
const FINAL_MESSAGE = "🎆 Geschafft! Die Zeitreise ist nun zuende. Du hast viel Geduld bewiesen und ich hoffe, das Ganze hat dir auch etwas Spaß gemacht? Viele Erinnerungen sind noch vorhanden, aber viele sind auch zumindest zeitweilig verloren. Daher: Wenn dir noch etwas einfällt, dann würde ich das gerne ergänzen wollen. Schließlich geht es darum eine der schönsten Zeiten festzuhalten, die wir vielleicht hatten. Natürlich könnten wir zu den einzelnen Namen auch noch Anekdoten festhalten- wäre vielleicht gar keine so schlechte Idee. Insofern darfst du gerne kleine Geschichten verfassen, die ich dann als 'Anekdote' im Programm festhalte. Schick sie mir gerne zu (janbuettgen@gmx.de) Wer weiß, was uns einmal noch vom Leben bleibt und da wäre es doch schön, wenn man etwas tiefer zurückblicken könnte, oder? Ich jedenfalls habe die Zeit mit all meinen Freunden, meinen Geschwistern und Freundinnen sehr genossen und denke gerne daran zurück. Das Leben geht weiter, natürlich, doch geht es euch nicht auch so, dass kleine Erinnerungen aufblitzen, wenn ihr ein spezielles Lied hört oder man an die ein oder andere Süßigket denkt- ich sag nur 'Leckmuschel' oder 'Märchenlolli', 'Brauner Bär & Co.'- das sind kleine Zeitportale, die wir bitter nötig haben! Also nutze diesen Zufluchtsort, wenn alles mal wieder den Bach runter geht. Träumt von Bonanzarädern oder selbstgebauten Skateboards, spielt eine Runde Schelldeckel und verausgabt euch bei unserer Straßen Olympiade, lest Hulli Trulli und schaut Peddar beim Samstäglichen Autowaschen zu. Macht die Gegend mit den Vogts unsicher oder spielt mit den Hildebrands Gummitwist oder Vater-Mutter-Kind. Lauft vor den Schüsslers davon oder verprügelt sie, wie Hauke das gemacht hat- (ich bin heute noch stolz auf dich!). Und natürlich- eine schöne Runde Fußball gehört auch dazu- mit Hauke im Tor verlieren wir nicht. Geht ne Runde Süßigkeiten betteln oder schaut zu, wie Andreas Schüssler auf einem Hoover Staubsauger die MC-Strasse hinunter reitet. Und trinkt dazu ein schönes Glas Bluna und fühlt wieder die Sonne auf eurer Haut. So haben wir damals gelebt....";
// Optional: Musik beim Enddialog (Pfad zur Audiodatei, z.B. \"audio/mein_song.mp3\")
// Leer lassen (\"\") = keine Musik
const FINAL_AUDIO_SRC = "audio/The Alan Parsons Project - Time.mp3";

// Playlist für den Player im Header.
// Wenn die Liste leer bleibt, wird sie automatisch aus allen HOTSPOTS[audioSrc] (+ FINAL_AUDIO_SRC) erstellt.
// Reihenfolge hier = Abspielreihenfolge.
const AUDIO_PLAYLIST = [
  "audio/Lipps Inc. - Funkytown (1980).mp3",
  "audio/Exile - kiss you all over.mp3",
  "audio/Gilbert O' Sullivan - Clair.mp3",
  "audio/Cosa Rosa - In meinen Armen 1985.mp3",
  "audio/Sailor - A Glass Of Champagne (1976).mp3",
  "audio/ABBA - Take A Chance On Me.mp3",
  "audio/Brotherhood Of Man - Save Your Kisses For Me.mp3",
  "audio/David Dundas - Jeans On 1977.mp3",
  "audio/Harpo - Moviestar (1976).mp3",
  "audio/Status Quo - Down down 1974.mp3",
  "audio/Queen - Spread Your Wings.mp3",
  "audio/Bourbon Skiffle Company - Giff mi Kalk.mp3",
  "audio/Rudi Carrell - Wann wird's mal wieder richtig Sommer 1975.mp3",
  "audio/Wum´s Gesang-Ich wünsch´mir´ne Miezekatze.mp3",
  "audio/Henry Valentino & Uschi - Im Wagen vor mir.mp3",
  "audio/Hot Butter-Popcorn.mp3",
  "audio/Nichts - Tango 2000.mp3",
  "audio/10cc - Dreadlock Holiday 1978.mp3",
  "audio/The Buggles - Video Killed The Radio Star 1979.mp3",
  "audio/Rod Stewart - Da Ya Think I'm Sexy 1978.mp3",
  "audio/ELO - Mr. Blue Sky (1977).mp3",
  "audio/The Air That I Breath - The Hollies.mp3",
  "audio/Markus - Kleine Taschenlampe brenn.mp3",
  "audio/Supertramp - School 1974.mp3",
  "audio/The Alan Parsons Project - Time.mp3",

];

// Formate:
// 1) Single (1 Partei): Häuser 1,2,3,4,6,8,10,12 => question: "Wer wohnte hier?"
// 2) Zwei Parteien (stack2): Haus 7 => 1. Partei / 2. Partei
// 3) Zwei Parteien (stack2floors): Haus 5 => Obergeschoss / Erdgeschoss
// 4) Vier Parteien je Etage (floors1): Haus 16 => DG/2.OG/1.OG/EG
// 5) Sieben Parteien (floors): Häuser 18/20/22
// 6) Drei Parteien je Etage (floors3): Häuser 9/11 => DG/1.OG/EG
const HOTSPOTS = [
  {
    "id": "Feld 1",
    "name": "?",
    "question": "Was war hier früher?",
    "answers": [
      "Felder"
    ],
    "reveal": "Das waren alles früher Felder- toll zum spielen- bis der Bauer kam...",
"audioSrc": "audio/The Air That I Breath - The Hollies.mp3",
    "polygon": [
      [
        0.005532503457814661,
        0.4387550200803213
      ],
      [
        0.004149377593360996,
        0.0030120481927710845
      ],
      [
        0.7143845089903181,
        0.006024096385542169
      ]
    ],
    "hint": "Man konnte sich toll darin verstecken",
    "revealComment": "",
    "revealImage": ""
  },
  {
    "id": "Feld 2",
    "name": "?",
    "question": "Was war hier früher?",
    "answers": [
      "Felder"
    ],
    "reveal": "Die Stoppelfelder wurden früher abgebrannt!!!",
"audioSrc": "audio/Markus - Kleine Taschenlampe brenn.mp3",
    "polygon": [
      [
        0.9944674965421854,
        0.6094377510040161
      ],
      [
        0.8271092669432918,
        0.0030120481927710845
      ],
      [
        0.9965421853388658,
        0.006024096385542169
      ]
    ],
    "hint": "'die'grenzten bis an die Gärten",
    "revealComment": "Schöner Kinderspielplatz",
    "revealImage": ""
  },
  {
    "id": "Strasse",
    "name": "Strasse",
    "question": "Was war das hier für uns?",
    "answers": [
      "Der beste Spielplatz der Welt"
    ],
    "reveal": "❤️ Der beste Spielplatz der Welt in den 70ern.",
"audioSrc": "audio/Rudi Carrell - Wann wird's mal wieder richtig Sommer 1975.mp3",
    "polygon": [
      [
        0.058091286307053944,
        0.7981927710843374
      ],
      [
        0.04564315352697095,
        0.7479919678714859
      ],
      [
        0.21230982019363762,
        0.6546184738955824
      ],
      [
        0.1632088520055325,
        0.35441767068273095
      ],
      [
        0.18603042876901799,
        0.3514056224899598
      ],
      [
        0.24343015214384509,
        0.6455823293172691
      ],
      [
        0.623789764868603,
        0.47289156626506024
      ],
      [
        0.6037344398340249,
        0.2751004016064257
      ],
      [
        0.5691562932226832,
        0.22088353413654618
      ],
      [
        0.5511756569847857,
        0.15261044176706828
      ],
      [
        0.6313969571230982,
        0.10240963855421686
      ],
      [
        0.6493775933609959,
        0.1686746987951807
      ],
      [
        0.6466113416320886,
        0.26104417670682734
      ],
      [
        0.673582295988935,
        0.5150602409638554
      ]
    ],
    "hint": "Hier hat ALLES stattgefunden...",
    "revealComment": "",
    "revealImage": "pics/Strasse.png"
  },
  {
    "id": "x",
    "name": "x",
    "question": "Das hier war ein besonderer Punkt. Was wurde hier oft gemacht und was wurde dort getauscht? Ein Tipp von mir: Es 'Sie' waren rund, mal bunt, mal nicht...",
    "answers": [
      "Murmeln"
    ],
    "reveal": "❤️ In dem Erdloch am Stromkasten haben wir oft gemurmelt",
"audioSrc": "audio/Wum´s Gesang-Ich wünsch´mir´ne Miezekatze.mp3",
    "polygon": [
      [
        0.5338865836791148,
        0.5843373493975904
      ],
      [
        0.5670816044260027,
        0.5843373493975904
      ],
      [
        0.5670816044260027,
        0.6244979919678715
      ],
      [
        0.5338865836791148,
        0.6244979919678715
      ]
    ],
    "hint": "Das war eine beliebte Beschäftigung bei Kindern in der Zeit",
    "revealComment": "Seine schönen bunten Glasmurmeln hat man gehütet wie Schätze. Aber damals gab es auch noch Tonmurmeln. Die waren kleiner und viel billiger",
    "revealImage": "pics/strom.png"
  },
  {
    "id": "y",
    "name": "y",
    "question": "Was war an diesem Ort versteckt?",
    "answers": [
      "Chemielabor"
    ],
    "reveal": "❤️ War gar nicht so schwer, hm? Genau, hier war Haukes Chemielabor !!",
"audioSrc": "audio/Henry Valentino & Uschi - Im Wagen vor mir.mp3",
"polygon": [
      [
        0.5905947441217151,
        0.786144578313253
      ],
      [
        0.5760719225449515,
        0.7550200803212851
      ],
      [
        0.607192254495159,
        0.7339357429718876
      ],
      [
        0.6175656984785616,
        0.7670682730923695
      ]
    ],
    "hint": "...damit ist nicht unsere Garage gemeint",
    "revealComment": "Man kann sich nicht an alles erinnern...",
    "revealImage": "pics/garage.png"
  },
  {
    "id": "z",
    "name": "z",
    "question": "Oha, hier sah es damals noch ganz anders aus. Kannst du dich noch daran erinnern, was hier früher war? Ein Tipp: Zu langes 'baden' darin macht gelbe Flecken...",
    "answers": [
      "Sandkasten"
    ],
    "reveal": "❤️ Hier war natürlich der Spielplatz mit dem Sandkasten",
"audioSrc": "audio/Hot Butter-Popcorn.mp3",
    "polygon": [
      [
        0.7275242047026279,
        0.8022088353413654
      ],
      [
        0.6507607192254495,
        0.5562248995983936
      ],
      [
        0.6514522821576764,
        0.5411646586345381
      ],
      [
        0.6673582295988935,
        0.5381526104417671
      ],
      [
        0.7005532503457814,
        0.6526104417670683
      ],
      [
        0.7385892116182573,
        0.6696787148594378
      ],
      [
        0.7434301521438451,
        0.6807228915662651
      ],
      [
        0.7697095435684648,
        0.7771084337349398
      ]
    ],
    "hint": "Wer ein Architekt werden will, kann sich hier früh üben...",
    "revealComment": "Macht nichts, du warst ja auch schon etwas zu alt für solche Freizeitbeschäftigungen. Trotzdem hast du an den Geräten auch schon Turnübungen gemacht",
    "revealImage": ""
  },
  {
    "id": "3",
    "name": "Haus 3",
    "question": "Wer wohnte hier?",
    "answers": [
      "Adameit"
    ],
    "reveal": "❤️ Rolf und Helma Adameit mit Sohn Erik und der kleinen Tochter Annekatrin. Der Mann ist bereits 2020 verstorben, die Frau nun geradeam 17.3.26. Der Sohn Erik war ein echter Chaot. Die Tochter hatte sehr schlechte Zähne",
"audioSrc": "audio/Gilbert O' Sullivan - Clair.mp3",
    "polygon": [
      [
        0.06500691562932227,
        0.5271084337349398
      ],
      [
        0.035269709543568464,
        0.45180722891566266
      ],
      [
        0.1037344398340249,
        0.4006024096385542
      ],
      [
        0.13208852005532504,
        0.4759036144578313
      ]
    ],
    "hint": "Der Vater hatte eine Brille, erinnerte deutlich an Dieter-Thomas Heck",
    "revealComment": "",
    "revealImage": ""
  },
  {
    "id": "1",
    "name": "Haus 1",
    "question": "Was war hier?",
    "answers": [
      "Katholische Mission"
    ],
    "reveal": "❤️ Hier war die katholische Mission untergebracht. Die Kinder hatten witzige Namen. Eines hieß 'Christfriede'. Wahnsinnig komisch, wenn ihm mal wieder verboten wurde mit den 'Heidenkindern' zu spielen. Einmal hat sich der Kleine auf der Rutsche vollgeschissen und auf der Rutsche eine Spur hinterlassen- oje...",
"audioSrc": "audio/Lipps Inc. - Funkytown (1980).mp3",
    "polygon": [
      [
        0.056708160442600276,
        0.6937751004016064
      ],
      [
        0.04080221300138313,
        0.6485943775100401
      ],
      [
        0.07538035961272475,
        0.6184738955823293
      ],
      [
        0.056016597510373446,
        0.5542168674698795
      ],
      [
        0.1355463347164592,
        0.4929718875502008
      ],
      [
        0.173582295988935,
        0.6104417670682731
      ]
    ],
    "hint": "Die waren sehr religiös",
    "revealComment": "",
    "revealImage": ""
  },
  {
    "id": "2",
    "name": "Haus 2",
    "question": "Wer wohnte hier?",
    "answers": [
      "Rist"
    ],
    "reveal": "❤️ Den Sohn Mathias habe ich mal in Italien getroffen- ein Riesenzufall! Heute ist er CFO. Wie ich erfahren habe, hatten Rists wohl zwei Kinder. Das eine (Axel?) hatte wohl einen schlimmen Unfall während die Eltern im Urlaub waren. Das Haus wird zurzeit umgebaut- dort sind neue Mieter eingezogen. ",
"audioSrc": "audio/Exile - kiss you all over.mp3",
    "polygon": [
      [
        0.12863070539419086,
        0.8313253012048193
      ],
      [
        0.07745504840940526,
        0.8614457831325302
      ],
      [
        0.1037344398340249,
        0.9457831325301205
      ],
      [
        0.15214384508990317,
        0.9156626506024096
      ]
    ],
    "hint": "Der Mann hat mit Papa gekegelt",
    "revealComment": "",
    "revealImage": ""
  },
  {
    "id": "4",
    "name": "Haus 4",
    "question": "Wer wohnte hier?",
    "answers": [
      "Koch"
    ],
    "reveal": "❤️ Hier lebte wohl das Ehepaar Koch. Die Familie hatte wohl ein schwer behindertes Kind, an das kann ich mich aber nicht erinnern. Darüber hinaus verkehrte hier Frau Sowa, die früher einmal meine Sportlehrerin in der Realschule war und eine Hühnerbrust hatte, ich glaube so nennt man das. Sie fuhr einen weißen Opel mit einem Korsika Aufkleber hinten drauf.",
"audioSrc": "audio/Cosa Rosa - In meinen Armen 1985.mp3",
    "polygon": [
      [
        0.1950207468879668,
        0.8112449799196787
      ],
      [
        0.14522821576763487,
        0.8413654618473896
      ],
      [
        0.17012448132780084,
        0.9257028112449799
      ],
      [
        0.21853388658367912,
        0.8955823293172691
      ]
    ],
    "hint": "Hier waren Schilder im Vorgarten aufgestellt",
    "revealComment": "",
    "revealImage": "pics/4.png"
  },
  {
    "id": "7",
    "name": "Haus 7",
    "question": "Wer wohnte hier?",
    "reveal": "❤️ Prima- alles richtig! ",
"audioSrc": "audio/Brotherhood Of Man - Save Your Kisses For Me.mp3",
    "polygon": [
      [
        0.27800829875518673,
        0.4086345381526104
      ],
      [
        0.24688796680497926,
        0.3132530120481928
      ],
      [
        0.318118948824343,
        0.2680722891566265
      ],
      [
        0.3478561549100968,
        0.3634538152610442
      ]
    ],
    "multiLayout": "stack2",
    "multiRows": [
      {
        "key": "P1",
        "label": "1. Partei",
        "answers": [
          "Bussmann"
        ],
        "hint": "Ein 'Baletthaushalt'",
        "solution": "Frau Traudel Bussmann mit ihrer doofen Tochter, deren Namen ich vergessen habe. Die war wohl bei Marita in der Parallelklasse die Streberin",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "P2",
        "label": "2. Partei",
        "answers": [
          "Evers"
        ],
        "hint": "Eine Frau die immer ein Augenzwinkern mit Lächeln trug. Sie hatte etwas Eulenhaftes an sich...",
        "solution": "Frau Evers mit Tochter Heike. Frau Evers war Lehrerin für Religion an der M-C-Schule. Ihre Tochter hat mittlerweile eine Praxis für Radiologie in Düsseldorf",
        "revealComment": "",
        "revealImage": ""
      }
    ],
    "hint": "",
    "revealComment": "",
    "revealImage": ""
  },
  {
    "id": "5",
    "name": "Haus 5",
    "question": "Wer wohnte hier?",
    "reveal": "❤️ Alles richtig- super Leistung!!!",
"audioSrc": "audio/Sailor - A Glass Of Champagne (1976).mp3",
    "polygon": [
      [
        0.3112033195020747,
        0.5753012048192772
      ],
      [
        0.2814661134163209,
        0.4779116465863454
      ],
      [
        0.35131396957123096,
        0.4327309236947791
      ],
      [
        0.38105117565698476,
        0.5301204819277109
      ]
    ],
    "multiLayout": "stack2floors",
    "multiRows": [
      {
        "key": "OG",
        "label": "Obergeschoss",
        "answers": [
          "Broll"
        ],
        "hint": "Der Mann hat in Wesel beim RWE gearbeitet",
        "solution": "Herr Broll auch 'Bröllerken' oder 'Milchgesicht' genannt. Ein absoluter Langweiler, der immer aussah, wie Mamas Liebling. Wenn Papa dem gesagt hätte, er soll seinen Wagen waschen, er hätte das getan",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "EG",
        "label": "Erdgeschoss",
        "answers": [
          "Kowalski"
        ],
        "hint": "Frau Saubermann - hallo?",
        "solution": "Frau Kowalski oder besser gesagt Frau Saubermann- ohne Worte. Die hätten wir mal besser behandeln sollen. Aber wer die Strasse putzt- also wirklich...Leider ist das ganze Haus heutzutage verkommen. Herr Broll wohnt mit seiner Frau immer noch da. Die haben sich bis ins Dachgeschoss hochgewohnt und das ganze Haus ist voll Müll, genau wie die Garage. Schade, die Wohnungen sind wohl ziemlich groß und können so nicht vermietet werden.",
        "revealComment": "",
        "revealImage": ""
      }
    ],
    "hint": "",
    "revealComment": "",
    "revealImage": ""
  },
  {
    "id": "13",
    "name": "Haus 13",
    "question": "Wer wohnte hier?",
    "answers": [
      "Sawicki"
    ],
    "reveal": "❤️ Familie Sawicki mit Reingard, Alfred, Diethard und Tochter. Diethard ist promovierter Mitarbeiter im interdisziplinären Zentrum für Pietismusforschung. Okay? Was ist das? Schau mal hier (https://www.youtube.com/watch?v=OUEp5NDLu3E) rein, dann bekommst du einen Eindruck. Ein Interview mit ihm findest du auch hier (https://www.portal-militaergeschichte.de/content/interview-mit-dr-diethard-sawicki). Tochter Ulrike arbeitet heute als selbstständig, Übersetzerin und Lektorin in Köln- gratulation!",
"audioSrc": "audio/Nichts - Tango 2000.mp3",
    "polygon": [
      [
        0.47579529737206083,
        0.2700803212851406
      ],
      [
        0.44744121715076074,
        0.18473895582329317
      ],
      [
        0.5172890733056709,
        0.1395582329317269
      ],
      [
        0.5442600276625172,
        0.2248995983935743
      ]
    ],
    "hint": "Konnte nicht parken",
    "revealComment": "",
    "revealImage": "pics/Sawicki.png"
  },
  {
    "id": "11",
    "name": "Haus 11",
    "question": "Wer wohnte hier?",
    "reveal": "❤️ Alles richtig- super Leistung!!!",
"audioSrc": "audio/Queen - Spread Your Wings.mp3",
    "polygon": [
      [
        0.4896265560165975,
        0.3785140562248996
      ],
      [
        0.46265560165975106,
        0.2931726907630522
      ],
      [
        0.5338865836791148,
        0.24799196787148595
      ],
      [
        0.5594744121715076,
        0.3333333333333333
      ]
    ],
    "multiLayout": "floors3",
    "multiRows": [
      {
        "key": "DG",
        "label": "DG",
        "answers": [
          "unbekannt"
        ],
        "hint": "keine Ahnung",
        "solution": "Wer hier ursprünlich wohnte, weiß ich nicht mehr. Später ist dort ein Pärchen eingezogen, die teils wilde Partys gefeiert haben. Das war für mich teils sehr interessant anzusehen.",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "1OG",
        "label": "1. OG",
        "answers": [
          "Schulte Krumpen"
        ],
        "hint": "Haben vorher in 22 gewohnt",
        "solution": "Wer hier vorher gewohnt hat, weiß ich nicht. Später sind dort aber Schulte Krumpens eingezogen. Vielleicht waren wir ja zu laut?",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "EG",
        "label": "EG",
        "answers": [
          "Marx"
        ],
        "hint": "Vorliebe für Zäpfchen",
        "solution": "Familie Marx mit ihrem Sohn Haidger. Unglaublich, was aus den Menschen werden kann (https://heidgermarx.com/about) heute ein erfolgreicher Photograf, der in New York ausstellt. Und damals sind wir noch mit seinen Eltern durchs Rotbachtal gewandert und er hat mich beim Briefmarkentauschen betuppt, naja. Die Familie ist später in den Fasanenweg gezogen. Dennoch wohnte hier ganz am Anfang Familie May mit Sohn (Tobias?), die dann nach Schermbeck oder Gahlen weggezogen sind",
        "revealComment": "",
        "revealImage": "pics/MayMarx.png"
      }
    ],
    "revealImage": ""
  },
  {
    "id": "9",
    "name": "Haus 9",
    "question": "Wer wohnte hier?",
    "reveal": "❤️ Alles richtig- super Leistung!!!",
    "audioSrc": "audio/Harpo - Moviestar (1976).mp3",
    "polygon": [
      [
        0.5242047026279392,
        0.48493975903614456
      ],
      [
        0.4972337482710927,
        0.39959839357429716
      ],
      [
        0.5684647302904564,
        0.35240963855421686
      ],
      [
        0.5940525587828492,
        0.4397590361445783
      ]
    ],
    "multiLayout": "floors3",
    "multiRows": [
      {
        "key": "DG",
        "label": "DG",
        "answers": [
          "unbekannt"
        ],
        "hint": "keine Ahnung",
        "solution": "Irgendwer muss hier wohl gewohnt haben, aber ich weiß es nicht mehr. Vielleicht hat ja auch Susanne Bernsmann unterm Dach gewohnt- könnte sein. Die war später ja auch verheiratet, das könnte hinkommen",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "1OG",
        "label": "1. OG",
        "answers": [
          "Bernsmann"
        ],
        "hint": "Hat 12 Finger",
        "solution": "Familie Bernsmann mit den Kindern Peter und Susanne. Peter hat immer(!) am Wochendende den Wagen vom Vater gewaschen. Er stotterte leicht und wurde sooft von uns gehänselt. Dabei war er ein gutmütiger Mensch. Leider war er auch nicht immer der hellste. Legendär die Situation, bei der er sich dreimal hintereinander an einem warmen Krümmer seines Motorrollers verbrannt hat... ",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "EG",
        "label": "EG",
        "answers": [
          "Klein-Wiele"
        ],
        "hint": "Hulli Trulli",
        "solution": "Ehepaar Klein-Wiele mit den Söhnen Felix, Franz und Martin. Franz und Martin (heute Prof. Dipl.-Ing. Martin Klein-Wiele) beide an der Peter Behrens School of Arts in Düsseldorf im Fachbereich Architektur & Design tätig. Felix war ein Elektronikfreak.",
        "revealComment": "",
        "revealImage": "pics/KW.png"
      }
    ],
    "revealImage": ""
  },
  {
    "id": "22",
    "name": "Haus 22",
    "question": "Wer hat hier gewohnt?",
    "answers": [],
    "reveal": "❤️ Alles richtig- super Leistung!!!",
"audioSrc": "audio/ELO - Mr. Blue Sky (1977).mp3",
    "polygon": [
      [
        0.7026279391424619,
        0.17971887550200802
      ],
      [
        0.6964038727524204,
        0.17670682730923695
      ],
      [
        0.6618257261410788,
        0.05421686746987952
      ],
      [
        0.7413554633471646,
        0.0030120481927710845
      ],
      [
        0.7793914246196404,
        0.1285140562248996
      ]
    ],
    "hint": "",
    "revealComment": "",
    "multiRows": [
      {
        "key": "EG_L",
        "label": "EG links",
        "answers": [
          "Lichtenberg"
        ],
        "hint": "Die Familie hatte drei Söhne",
        "solution": "Bist du nicht mit Jochen in die Schule gegangen?",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "EG_R",
        "label": "EG rechts",
        "answers": [
          "Halici"
        ],
        "hint": "P+M waren mit denen schon im Urlaub",
        "solution": "Richtig, Fam. Halici mit Önder, Ilse, Tanju und Sibel. Im Jahr 1975 haben hier Hans und Irmgart Houben (damals noch ohne Kinder) gewohnt. Irmgart hat an der Gregorschule ihr Refrendariat gemacht und Hans hatte bei Deuz in Köln gearbeitet. Ich war so stolz, dass ich die Schulhefte 'mit korrigieren' durfte, d.h. eigentlich durfte ich nur den Stempel für den Klassenspiegel dort rein machen- und dabei kannte ich dann die ein oder andere Person wie z.B. Regina Jansen vom Schwimmen... Schön, dass wir mit Houbens heute immer noch Kontakt haben und das nach nun 50 Jahren!! ",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "1OG_L",
        "label": "1. OG links",
        "answers": [
          "Skowronski"
        ],
        "hint": "Die Kinder waren echte Nervensägen",
        "solution": "Eine laute und herzensgute Familie mit den Töchtern Bettina und Anette",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "1OG_R",
        "label": "1. OG rechts",
        "answers": [
          "Seiml-Buchinger"
        ],
        "hint": "Mama hatte das gleiche Oberteil wie sie- von Inge Moden...",
        "solution": "Da muss man nicht mehr zu sagen, wir werden Ilse immer vermissen",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "2OG_L",
        "label": "2. OG links",
        "answers": [
          "Sonntag"
        ],
        "hint": "Die sind später nach EG rechts gezogen",
        "solution": "Richtig- Frau Sonntag mit ihrem 'Sonneschein' Mirko",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "2OG_R",
        "label": "2. OG rechts",
        "answers": [
          "Schulte-Krumpen"
        ],
        "hint": "Sind später nach gegenüber gezogen (2.OG)",
        "solution": "Frau Schulte-Krumpen hat uns immer Bonbons geschenkt, die wie Kieselsteine aussahen (und auch nicht besser geschmeckt haben)",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "DG",
        "label": "DG",
        "answers": [
          "Büttgen"
        ],
        "hint": "na also...",
        "solution": "Die einzig wahren Büttgens- 'Zentrum' der Matthias-Claudius Strasse. Von unserem Balkon aus konnten wir sehen, wenn Papa morgens zur Arbeit fuhr oder welche Freunde gerade auf der Strasse waren. Aus unseren Zimmern konnten wir auf weite Felder blicken und uns treiben lassen.",
        "revealComment": "",
        "revealImage": "pics/22.png"
      }
    ],
    "multiLayout": "floors",
    "revealImage": ""
  },
  {
    "id": "6",
    "name": "Haus 6",
    "question": "Wer wohnte hier?",
    "answers": ["Simon"],
    "reveal": "Ich konnte mich wirklich nicht mehr erinnern, wer hier wohnte. Ich habe erfahren, dass Herr Simon gerade aktuell ins Altersheim umgezogen ist. Seine Frau ist wohl schon vor Jahren verstorben. Die wohnten schon immer da.Im Haus wohnt wohl auch eine Familie Conrad",
"audioSrc": "audio/ABBA - Take A Chance On Me.mp3",
    "polygon": [
      [
        0.2959889349930844,
        0.7530120481927711
      ],
      [
        0.24619640387275243,
        0.785140562248996
      ],
      [
        0.2710926694329184,
        0.8694779116465864
      ],
      [
        0.32088520055325037,
        0.8373493975903614
      ]
    ],
    "hint": "...vielleicht fällt dir ja was ein?",
    "revealComment": "",
    "revealImage": ""
  },
  {
    "id": "8",
    "name": "Haus 8",
    "question": "Wer wohnte hier?",
    "answers": [
      "Scheiper"
    ],
    "reveal": "Walter Scheiper mit seiner Frau Leni und den Söhnen Dirk und (?) Carsten. Wie sein Vater ist Dirk heute noch Architekt. Heute ist er in enem A-Büro südlich von München beschäftigt",
"audioSrc": "audio/David Dundas - Jeans On 1977.mp3",
    "polygon": [
      [
        0.36099585062240663,
        0.7349397590361446
      ],
      [
        0.3112033195020747,
        0.7670682730923695
      ],
      [
        0.3360995850622407,
        0.8493975903614458
      ],
      [
        0.38589211618257263,
        0.8192771084337349
      ]
    ],
    "hint": "Der Vater war Architekt",
    "revealComment": "",
    "revealImage": "pics/Dirk.jpg"
  },
  {
    "id": "10",
    "name": "Haus 10",
    "question": "Wer wohnte hier?",
    "answers": [
      "Kaufmann"
    ],
    "reveal": "Josef Kaufmann mit Ehefrau Helga und den Töchtern Regina und Andrea und den Söhnen Christian (Kitti) und Christian. Herr Kaufmann war Maratonläufer, das hat Hauke schon einmal zu spüren gekriegt. Die Mutter war quasi überall und hat alles mitbekommen.Leider ist sie vor ca. 5 Jahren verstorben. Vater Josef lebt nun alleine im Haus und ist weit über 90 Jahre alt.Leider ist sein Bein nicht in Ordnung. Als junger Mann war er wohl in Österreich im Krieg und hat von dort Erfrierungen mitbekommen. Die Töchter Regina und Andrea arbeiten beide im OGS der Grundschule und steuern auf die Rente zu. Kitti war Rechtspfleger und ist ebenfalls pensioniert. Andrea wohnt in der Nähe (Sandkuhle) und ist nicht verheiratet. Sie ist mit Maik Börmel liiert und hat wohl keinen Kontakt mehr zu ihrem Vater. Die Söhne kümmern sich aber um ihn. Markus ist immer busy, aber Christian lässt sich öfters blicken. Wahnsinn, einen Zeitzeugen zu treffen! Im Gespräch konnte er sich noch an viele Leute erinnern. Er berichtete von einem Alkoholiker Ehepaar. Der Mann ging wohl jeden Tag mit einer Plastiktüte Nachschub holen, aber wer das war, müssen wir wohl noch herausfinden...",
"audioSrc": "audio/Status Quo - Down down 1974.mp3",
    "polygon": [
      [
        0.4287690179806362,
        0.8182730923694779
      ],
      [
        0.3962655601659751,
        0.7188755020080321
      ],
      [
        0.4536652835408022,
        0.6817269076305221
      ],
      [
        0.4847856154910097,
        0.7811244979919679
      ]
    ],
    "hint": "Der Vater konnte gut laufen",
    "revealComment": "",
    "revealImage": "pics/Kauf.png"
  },
  {
    "id": "12",
    "name": "Haus 12",
    "question": "Wer wohnte hier?",
    "answers": [
      "Umlauf"
    ],
    "reveal": "Herbert Umlauf, der ständig an der Bude stand und Bier getrunken hat- immer in den weißen Maurerklamotten mit Mütze auf dem Kopf. Am schlimmsten war es immer, den Ball aus seinem Garten zu holen, wenn dieser mal wieder über die Garagen geflogen war. Eine richtige Mutprobe. Jahre später hab ich mit ihm zusammen auf dem Bau gearbeitet. Ich war ganz neu. Aber da sich alle dort duzen, war es für mich von da an der Herbert. Der war eigentlich super nett und hatte viel Humor. Er berichtete später, was er für einen Spaß daran hatte, uns zu 'vergraulen'.",
"audioSrc": "audio/Bourbon Skiffle Company - Giff mi Kalk.mp3",
    "polygon": [
      [
        0.4951590594744122,
        0.7781124497991968
      ],
      [
        0.4612724757952974,
        0.678714859437751
      ],
      [
        0.5200553250345782,
        0.641566265060241
      ],
      [
        0.549792531120332,
        0.7409638554216867
      ]
    ],
    "hint": "Ein Schaf im Wolfspelz",
    "revealComment": "",
    "revealImage": ""
  },
  {
    "id": "20",
    "name": "Haus 20",
    "question": "Wer hat hier gewohnt?",
    "answers": [],
    "reveal": "❤️ Alles richtig- super Leistung!!!",
"audioSrc": "audio/Rod Stewart - Da Ya Think I'm Sexy 1978.mp3",
    "polygon": [
      [
        0.7717842323651453,
        0.4026104417670683
      ],
      [
        0.76417704011065,
        0.39357429718875503
      ],
      [
        0.7309820193637621,
        0.27710843373493976
      ],
      [
        0.8105117565698479,
        0.22590361445783133
      ],
      [
        0.8499308437067773,
        0.3514056224899598
      ]
    ],
    "hint": "",
    "revealComment": "",
    "multiLayout": "floors",
    "multiRows": [
      {
        "key": "EG_L",
        "label": "EG links",
        "answers": [
          "Vogt"
        ],
        "hint": "Der jüngere Sohn hat sich schon einmal mit einem Luftgewehr in den Finger geschossen",
        "solution": "Fam. Vogt mit den Söhnen Jochen und Michael. Jochen war Haukes Kumpel- Michael war etwas jünger. Die hatten auch nur Flausen im Kopf",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "EG_R",
        "label": "EG rechts",
        "answers": [
          "Reinhold"
        ],
        "hint": "Sie hatten eine Tochter, die mit mir in die Klasse ging",
        "solution": "Frau Reinhold, sie pflegte manchmal oben ohne auf dem Balkon zu sitzen. Der Apfel fiel nicht weit vom Stamm.",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "1OG_L",
        "label": "1. OG links",
        "answers": [
          "Kerst"
        ],
        "hint": "Der Vater war ständig in der Garage",
        "solution": "Michael Kerst alias Keksi- heute JVA_Beamter",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "1OG_R",
        "label": "1. OG rechts",
        "answers": [
          "Ziegenbart"
        ],
        "hint": "Wir haben einmal seine grüne Ente auf einen anderen Parkplatz gestellt",
        "solution": "Ich kenne den nur unter Ziegenbart- leider war auch er ein Nervenbündel",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "2OG_L",
        "label": "2. OG links",
        "answers": [
          "keine Ahnung"
        ],
        "hint": "keine Ahnung",
        "solution": "Keine Ahnung, eine tote Etage...",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "2OG_R",
        "label": "2. OG rechts",
        "answers": [
          "keine Ahnung"
        ],
        "hint": "keine Ahnung",
        "solution": "Keine Ahnung, eine tote Etage...",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "DG",
        "label": "DG",
        "answers": [
          "Kemper"
        ],
        "hint": "Ich meine, der Mann hat immer Pfeife geraucht. Nun sagt Mama, die wären öfters nackt in der Wohnung rumgelaufen und die hätten eine Tochter gehabt??? Da kann ich mich nicht dran erinnern",
        "solution": "Ich meine, die hießen Kemper- unsere Balkonnachbarn",
        "revealComment": "",
        "revealImage": ""
      }
    ],
    "revealImage": ""
  },
  {
    "id": "18",
    "name": "Haus 18",
    "question": "Wer hat hier gewohnt",
    "answers": [
      ""
    ],
    "reveal": "❤️ Alles richtig- super Leistung!!!",
"audioSrc": "audio/The Buggles - Video Killed The Radio Star 1979.mp3",
    "polygon": [
      [
        0.7939142461964038,
        0.5552208835341366
      ],
      [
        0.7544951590594744,
        0.42971887550200805
      ],
      [
        0.8354080221300139,
        0.3785140562248996
      ],
      [
        0.8734439834024896,
        0.5040160642570282
      ]
    ],
    "hint": "",
    "revealComment": "",
    "multiLayout": "floors",
    "multiRows": [
      {
        "key": "EG_L",
        "label": "EG links",
        "answers": [
          "keine Ahnung"
        ],
        "hint": "keine Ahnung",
        "solution": "keine Erinnerung",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "EG_R",
        "label": "EG rechts",
        "answers": [
          "keine Ahnung"
        ],
        "hint": "keine Ahnung",
        "solution": "keine Erinnerung",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "1OG_L",
        "label": "1. OG links",
        "answers": [
          "Langehegermann"
        ],
        "hint": "Der fuhr immer amerikanische Blechschlitten",
        "solution": "Ehepaar Langehegermann mit Tochter",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "1OG_R",
        "label": "1. OG rechts",
        "answers": [
          "Hildebrand"
        ],
        "hint": "Ein reiner Frauenhaushalt",
        "solution": "Hildebrand, Katja, Kirsten, Bettina und Petra. Ich bin mir nicht sicher, aber die hatten glaube ich auch einen Bruder, der aber bei seinem Vater lebte. Der sah genauso aus wie Katja, nur mit Schnäuzer",
        "revealComment": "",
        "revealImage": "pics/Bettina.png"
      },
      {
        "key": "2OG_L",
        "label": "2. OG links",
        "answers": [
          "Muschner"
        ],
        "hint": "Die Tochter ging auf die Gesamtschule in Gladbeck",
        "solution": "Anette mit ihrem kleinen Bruder Tom. Anette war ein richtiges Miststück und hatte damals schon lange Fingernägel. Der Vater hat bei Karstadt gearbeitet",
        "revealComment": "",
        "revealImage": "pics/Muschner.png"
      },
      {
        "key": "2OG_R",
        "label": "2. OG rechts",
        "answers": [
          "keine Ahnung"
        ],
        "hint": "keine Ahnung",
        "solution": "keine Erinnerung",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "DG",
        "label": "DG",
        "answers": [
          "Eisenberg"
        ],
        "hint": "Eine große Tragödie hat die Familie begleitet",
        "solution": "Marita und Gerd Eisenberg. Die hatten auch einen Sohn- ein richtiges Weichei- der hieß Gorden oder so, weiß nicht mehr genau. Der andere Sohn ist ja tragischerweise ertrunken",
        "revealComment": "",
        "revealImage": ""
      }
    ],
    "revealImage": ""
  },
  {
    "id": "16",
    "name": "Haus 16",
    "question": "Wer hat hier gewohnt?",
    "answers": [],
    "reveal": "❤️ Alles richtig- super Leistung!!! Ich habe aber bei einer Besichtigung festgestellt, dass es dort doch 7 Parteien im Haus gab- aber keine Chance...",
"audioSrc": "audio/10cc - Dreadlock Holiday 1978.mp3",
    "polygon": [
      [
        0.8492392807745505,
        0.6837349397590361
      ],
      [
        0.809820193637621,
        0.5582329317269076
      ],
      [
        0.8907330567081605,
        0.5070281124497992
      ],
      [
        0.9287690179806363,
        0.6325301204819277
      ]
    ],
    "hint": "",
    "revealComment": "",
    "multiLayout": "floors1",
    "multiRows": [
      {
        "key": "EG",
        "label": "EG",
        "answers": [
          "Van Beusekom"
        ],
        "hint": "Die hatten mal einen Metall- und Gemischtwarenladen im Dorf",
        "solution": "Familie van Beusekom mit Sohn Eric (oder mit k?)",
        "revealComment": "Der Vater ging immer mit dem Hund spazieren",
        "revealImage": ""
      },
      {
        "key": "1OG",
        "label": "1. OG",
        "answers": [
          "Dietrich"
        ],
        "hint": "1-2 Söhne und eine Tochter",
        "solution": "'Zigeunerfamilie' mit nervigen bissigen Hunden, die die Söhne Kai und Ulf einem auch gerne mal auf den Hals gehetzt haben, wenn man ihre kleine Schwester Iris geärgert hatte (haben wir aber trotzdem getan)",
        "revealComment": "",
        "revealImage": "pics/iris.png"
      },
      {
        "key": "2OG",
        "label": "2. OG",
        "answers": [
          "nicht bekannt"
        ],
        "hint": "Die hatten einen Sohn (Patrick glaube ich), sind aber schnell weggezogen",
        "solution": "unbekannt",
        "revealComment": "",
        "revealImage": ""
      },
      {
        "key": "DG",
        "label": "DG",
        "answers": [
          "Hasse"
        ],
        "hint": "Die Frau hatte rote Haare und Sommersprossen",
        "solution": "Familie Hasse mit Sohn Jens. Frau Hasse war meine erste Kindergärtnerin. Sie wohnt noch heute in dem Haus ganz oben!",
        "revealComment": "",
        "revealImage": ""
      }
    ],
    "revealImage": ""
  },
  {
    "id": "Schulhof",
    "name": "?",
    "question": "Was war hier?",
    "answers": ["Schulhof"],
    "reveal": "❤️ Natürlich war das unser Schulhof- dabei muss ich noch mal nachdenken: War er das wirklich? Wer durfte nur oben und wer nur unten spielen? Uns Kindern war das herzlich egal, aber es gab ja schließlich Vorschriften. Unglaublich, dass sowas zu unserer Zeit noch möglich war. Wir mussten immer wachsam sein '...wenn der Lembke kommt', als hausmeister passte er auch auf, dass wir nicht auf dem Schulhof spielen. Und wer war noch dein Lieblingslehrer? Herr Grabert?",
"audioSrc": "audio/Supertramp - School 1974.mp3",
    "polygon": [
      [
        0.9944674965421854,
        0.9949799196787149
      ],
      [
        0.3686030428769018,
        0.9919678714859438
      ],
      [
        0.9944674965421854,
        0.7339357429718876
      ]
    ],
    "hint": "Alles streng geteilt nach Katholisch und Evangelisch",
    "revealComment": "",
    "revealImage": ""
  }
];
