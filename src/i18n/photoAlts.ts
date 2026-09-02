import type { Lang } from './index'

/**
 * Galeri fotoğraflarının alt metinleri.
 *
 * KURAL: yalnızca fotoğrafta gerçekten görünen şey yazıldı. Görünmeyen
 * bir özellik (deniz manzarası, metrekare, donanım) tarif edilmedi.
 * Anahtar, görselin site içindeki yolu.
 */
export const photoAlts: Record<Lang, Record<string, string>> = {
  tr: {
    // --- Standart Oda ---
    '/img/standart-oda/1.jpg':
      'Fransız balkona açılan camlı kapının yanında, koyu pembe kapitone başlıklı çift kişilik yatak; üzerinde katlanmış havlular, yanında beyaz yuvarlak sehpa ve saksı çiçeği, duvarda makrome duvar süsü.',
    '/img/standart-oda/2.jpg':
      'Odanın kapıdan görünüşü: solda duvara asılı televizyon ve beyaz komodin, karşıda balkona açılan camlı kapı, sağda pembe başlıklı yatak; tavanda ferforje avize, duvarda klima.',
    '/img/standart-oda/3.jpg':
      'Pencere kenarı: aynalı beyaz konsol, duvara asılı televizyon, radyatörün üstünde ahşap komodin ve saksı; yatağın üzerinde katlanmış havlular ve nevresim takımı.',
    '/img/standart-oda/4.jpg':
      'Odanın zemin kat terasından bahçeye bakış: mavi boyalı ahşap direkler, mavi masa ve iki mavi sandalye, arkada çimenlik, zeytin ve palmiye ağaçları.',
    '/img/standart-oda/5.jpg':
      'Aynı terasın bir başka açıdan görünüşü; taş zemin, mavi masa takımı ve bahçedeki ağaçlar arasından geçen yürüyüş yolu.',

    // --- Suit Oda ---
    '/img/suit-oda/1.jpg':
      'Beyaz başlıklı çift kişilik yatak, üzerinde işlemeli yastık ve katlanmış havlular; duvarda çerçeveli resim ve makrome süs, köşede büyük saksı bitkisi, zemin terrakota karo.',
    '/img/suit-oda/2.jpg':
      'İki ayrı tek kişilik yatak, aralarında beyaz komodin ve vazoda pembe çiçekler; pencere kenarında duvara asılı televizyon, dışarıda palmiye ağacı görünüyor.',
    '/img/suit-oda/3.jpg':
      'Odanın penceresinden deniz görünüyor; bordo perdeler açık, iki yatak yan yana, sağda duvara asılı televizyon ve beyaz gardırop.',
    '/img/suit-oda/4.jpg':
      'Üstü kapalı balkon: mavi ahşap korkuluk, mavi masa ve iki hasır koltuk, masada vazoda mor çiçekler; arkada zeytin ağaçları ve deniz.',
    '/img/suit-oda/5.jpg':
      'Balkondan aşağı bakış: mavi korkuluğun ardında havuz ve mavi su kaydırağı, çiçekli çalılar, zeytin ağaçları ve deniz.',
    '/img/suit-oda/6.jpg':
      'Tesisin iki katlı beyaz binası bahçeden görünüyor; üst katta ahşap korkuluklu balkonlar, önde zeytin ağaçları ve pembe güller.',

    // --- Grand Suit ---
    '/img/grand-suit-oda/1.jpg':
      'Salon: mavi kanepe, iki mor koltuk ve kırmızı kanepe; sağda mutfak köşesi — çamaşır makinesi, bulaşık makinesi, mikrodalga ve dolaplar, solda televizyon.',
    '/img/grand-suit-oda/2.jpg':
      'Salonun pencere tarafı: iki mor koltuk, kırmızı köşe kanepe, ortada ahşap sehpa ve meyve tabağı; camlı kapı balkona açılıyor, duvarda klima.',
    '/img/grand-suit-oda/3.jpg':
      'Geniş salon: mavi çekyat, kırmızı kanepe ve mor koltuklar; sürgülü camlı kapıdan üstü kapalı balkondaki yemek masası görünüyor, solda buzdolabı.',
    '/img/grand-suit-oda/4.jpg':
      'Yatak odası: pembe kapitone başlıklı çift kişilik yatak, turkuaz perdeli pencere, ahşap komodinler ve duvarda klima.',
    '/img/grand-suit-oda/5.jpg':
      'İkinci yatak odası: pembe başlıklı çift kişilik yatak, ahşap gardırop, aynalı tuvalet masası ve iki komodin; yatakta katlanmış havlular.',
    '/img/grand-suit-oda/6.jpg':
      'Çocuk yatak odası: iki tek kişilik yatak, pembe kapitone başlıklar, turkuaz perdeli pencere ve klima.',
    '/img/grand-suit-oda/7.jpg':
      'Aynı iki yataklı odanın kapıdan görünüşü; yataklarda katlanmış havlular, arada komodin ve saksı bitkisi.',
    '/img/grand-suit-oda/8.jpg':
      'Salondan balkona bakış: açık camlı kapının ardında yeşil duvarlı üstü kapalı balkon, dört sandalyeli yemek masası ve zeytin dalları.',
    '/img/grand-suit-oda/9.jpg':
      'Balkonun kendisi: ahşap yemek masası ve dört sandalye, yeşil duvarlar, korkuluğun ötesinde ağaçlar ve komşu binalar.',
    '/img/grand-suit-oda/10.jpg':
      'Banyo: yeşil lavabo ve ayna, ahşap görünümlü duvar karoları, klozet ve taharet musluğu, üstte küçük pencere.',

    // --- Apart Daire ---
    '/img/apart-daireler/1.png':
      'Apart dairenin salonu: bordo köşe kanepe, iki desenli koltuk ve ahşap sehpa; solda mutfak köşesi — buzdolabı, ocak, bulaşık ve çamaşır makinesi.',
    '/img/apart-daireler/2.png':
      'Yatak odası: bordo kapitone başlıklı çift kişilik yatak, iki yanda ahşap komodin ve abajur, duvarda çerçeveli resim.',
    '/img/apart-daireler/3.png':
      'Banyo: küvet ve duş camı, ahşap görünümlü karolar, beyaz lavabo ve yuvarlak altın çerçeveli ayna.',

    // --- Huzurevi ---
    '/img/yasli-bakim/1.jpg':
      'Oda köşesinden ayrıntı: konsolun üstünde vazoda beyaz çiçekler, duvarda televizyon ve fıstık yeşili duvar.',
    '/img/yasli-bakim/2.jpg':
      'Pencere kenarı: yeşil kumaş koltuk, tüllü perde, sehpada saksı bitkisi; önde tek kişilik yatak.',
    '/img/yasli-bakim/3.jpg':
      'Cumbalı oda: tek kişilik yatak, iki yeşil koltuk, saksı bitkisi ve vazoda çiçekler; pencerelerden komşu binalar görünüyor.',
    '/img/yasli-bakim/4.jpg':
      'Cumbanın önünde örtülü küçük masa ve iki yeşil koltuk, masada saksı çiçeği; önde yatak ve yastık.',
    '/img/yasli-bakim/5.jpg':
      'Odanın geniş görünüşü: oturma köşesindeki masa ve koltuklar, ahşap komodin, tek kişilik yatak ve laminat zemin.',
    '/img/yasli-bakim/6.jpg':
      'Banyo: geniş tezgâh ve lavabo, büyük ayna, tutunma barı, klozet ve duvarda acil çağrı düğmesi; tezgâhta saç kurutma makinesi.',
    '/img/yasli-bakim/7.jpg':
      'Odanın kişisel eşyalarla düzenlenmiş hâli: yeşil koltuk, çiçekli yastık, konsolda abajur ve aile fotoğrafları, sehpada bardak ve kumanda.',
    '/img/yasli-bakim/8.jpg':
      'Gün ışığı alan oda: cumbalı pencerelerin önünde saksı çiçekleri ve küçük masa, tuvalet masasında kişisel eşyalar, yatağın üstünde çiçekli örtü.',
    '/img/yasli-bakim/9.jpg':
      'Başı yukarı kaldırılmış hasta yatağı, yanında iki yeşil koltuk; sağda aynalı tuvalet masası ve duvarda telefon.',
    '/img/yasli-bakim/10.jpg':
      'Geniş oda: hasta yatağı, iki yeşil koltuk, kitaplarla dolu ahşap raf ünitesi, televizyon ve bir köşede eski bir gramofon.',

    // --- Haber 1: Afrodit efsanesi ---
    '/img/haber-1/1.jpg':
      'Klasik bir yağlı boya tabloda uzanmış Venüs figürü ve yanında oklu bir Eros; ayakucunda beyaz bir güvercin.',
    '/img/haber-1/2.jpg':
      'Afrodisias antik kentindeki Afrodit Tapınağı kalıntıları: ayakta kalmış oluklu mermer sütunlar ve dağınık taş bloklar, arkada tepeler.',
    '/img/haber-1/3.jpg':
      'Paris’in Yargısını anlatan bir tablo: elindeki altın elmayı üç tanrıçadan birine uzatan Paris, çevresinde koyunlar, keçiler ve gökyüzünde uçan küçük figürler.',

    // --- Haber 2: sezon açılışı ---
    '/img/haber-2/1.jpg':
      'Boş ve durgun açık havuz; kenarında sarı şezlonglar ve hasır şemsiyeler, arkada mavi su kaydırağı ve gözcü kulesi.',
    '/img/haber-2/2.jpg':
      'İki katlı beyaz bina; turkuaz ahşap direkler ve balkon korkuluğu, önünde çimen, zeytin ağacı ve mor çiçekli çalılar.',
    '/img/haber-2/3.jpg':
      'Kalabalık havuz: suda yüzen misafirler, arkada iki katlı restoran binası ve hasır gölgelikler, gökyüzünde büyük beyaz bulut.',

    // --- Haber 3: Mono Afrodit ---
    '/img/haber-3/1.jpg':
      'Gece havuz başı: aydınlatılmış havuzun ardında kalabalık bir bar, sıcak ışıklar ve ağaçların silueti.',
    '/img/haber-3/2.jpg':
      'Gece aydınlatılmış bina cephesi: duvarda deniz kabuğunun üstünde duran Afrodit mozaiği, üstte kırmızı neon “MONO” tabelası ve sütunlu giriş.',
    '/img/haber-3/3.jpg':
      'Gece açık havada parti: bar önünde ayakta sohbet eden kalabalık, arkada beyaz perdeler ve sıcak sarı aydınlatma.',
  },

  en: {
    '/img/standart-oda/1.jpg':
      'A double bed with a deep pink buttoned headboard beside a glazed door onto a French balcony; folded towels on the bed, a small round white table with a potted plant, and a macramé hanging on the wall.',
    '/img/standart-oda/2.jpg':
      'The room seen from the doorway: a wall-mounted television and white chest on the left, the glazed balcony door ahead, the pink-headboard bed on the right, a wrought-iron light fitting and an air-conditioning unit.',
    '/img/standart-oda/3.jpg':
      'The window side of the room: a white console with a mirror, a wall-mounted television, a wooden chest with a potted plant above the radiator, and folded towels on the bed.',
    '/img/standart-oda/4.jpg':
      'The view from the ground-floor terrace into the garden: blue-painted wooden posts, a blue table with two blue chairs, lawn beyond and olive and palm trees.',
    '/img/standart-oda/5.jpg':
      'The same terrace from another angle; stone paving, the blue table set, and a path running between the trees in the garden.',

    '/img/suit-oda/1.jpg':
      'A double bed with a white headboard, an embroidered cushion and folded towels; a framed picture and a macramé hanging on the wall, a large potted plant in the corner and terracotta floor tiles.',
    '/img/suit-oda/2.jpg':
      'Two single beds with a white bedside table between them holding a vase of pink flowers; a wall-mounted television by the window, with a palm tree visible outside.',
    '/img/suit-oda/3.jpg':
      'The sea is visible through the room’s window with the burgundy curtains drawn back; two beds side by side, a wall-mounted television and a white wardrobe on the right.',
    '/img/suit-oda/4.jpg':
      'A covered balcony: a blue wooden railing, a blue table with two wicker armchairs and a vase of purple flowers; olive trees and the sea beyond.',
    '/img/suit-oda/5.jpg':
      'Looking down from the balcony: beyond the blue railing, the pool and its blue water slide, flowering shrubs, olive trees and the sea.',
    '/img/suit-oda/6.jpg':
      'One of the property’s two-storey white buildings seen from the garden, with wooden-railed balconies on the upper floor, olive trees and pink roses in front.',

    '/img/grand-suit-oda/1.jpg':
      'The living room: a blue sofa, two purple armchairs and a red sofa; a kitchen corner on the right with a washing machine, dishwasher, microwave and cupboards, and a television on the left.',
    '/img/grand-suit-oda/2.jpg':
      'The window side of the living room: two purple armchairs, a red corner sofa and a wooden coffee table with a bowl of fruit; a glazed door onto the balcony and an air-conditioning unit on the wall.',
    '/img/grand-suit-oda/3.jpg':
      'The wide living room: a blue sofa bed, a red sofa and purple armchairs; through the sliding glass door, the dining table on the covered balcony, with a refrigerator on the left.',
    '/img/grand-suit-oda/4.jpg':
      'A bedroom: a double bed with a pink buttoned headboard, a window with turquoise curtains, wooden bedside tables and an air-conditioning unit.',
    '/img/grand-suit-oda/5.jpg':
      'A second bedroom: a double bed with a pink headboard, a wooden wardrobe, a dressing table with a mirror and two bedside tables; folded towels on the bed.',
    '/img/grand-suit-oda/6.jpg':
      'The children’s bedroom: two single beds with pink buttoned headboards, a window with turquoise curtains and an air-conditioning unit.',
    '/img/grand-suit-oda/7.jpg':
      'The same twin room seen from the doorway; folded towels on the beds and a bedside table with a potted plant between them.',
    '/img/grand-suit-oda/8.jpg':
      'Looking from the living room onto the balcony: through the open glazed door, a covered balcony with green walls, a dining table with four chairs and olive branches.',
    '/img/grand-suit-oda/9.jpg':
      'The balcony itself: a wooden dining table with four chairs, green walls, and trees and neighbouring buildings beyond the railing.',
    '/img/grand-suit-oda/10.jpg':
      'The bathroom: a green basin and mirror, wood-effect wall tiles, a toilet with a bidet spray and a small window above.',

    '/img/apart-daireler/1.png':
      'The apartment’s living room: a burgundy corner sofa, two patterned armchairs and a wooden coffee table; a kitchen corner on the left with a refrigerator, hob, dishwasher and washing machine.',
    '/img/apart-daireler/2.png':
      'The bedroom: a double bed with a burgundy buttoned headboard, a wooden bedside table and lamp on each side, and a framed picture on the wall.',
    '/img/apart-daireler/3.png':
      'The bathroom: a bath with a shower screen, wood-effect tiles, a white basin and a round gold-framed mirror.',

    '/img/yasli-bakim/1.jpg':
      'A detail of a room corner: a vase of white flowers on a console, a television on the wall and pale green walls.',
    '/img/yasli-bakim/2.jpg':
      'By the window: a green upholstered armchair, net curtains and a potted plant on a side table, with a single bed in the foreground.',
    '/img/yasli-bakim/3.jpg':
      'A room with a bay window: a single bed, two green armchairs, a potted plant and a vase of flowers; neighbouring buildings visible through the windows.',
    '/img/yasli-bakim/4.jpg':
      'A small covered table and two green armchairs in front of the bay window, with a potted plant on the table; the bed and a pillow in the foreground.',
    '/img/yasli-bakim/5.jpg':
      'A wider view of the room: the table and armchairs in the sitting corner, a wooden bedside table, a single bed and laminate flooring.',
    '/img/yasli-bakim/6.jpg':
      'The bathroom: a wide counter and basin, a large mirror, a grab rail, a toilet and an emergency call button on the wall, with a hairdryer on the counter.',
    '/img/yasli-bakim/7.jpg':
      'The room arranged with personal belongings: a green armchair with a floral cushion, a lamp and family photographs on the console, a glass and a remote control on the side table.',
    '/img/yasli-bakim/8.jpg':
      'A sunlit room: potted flowers and a small table in front of the bay windows, personal items on the dressing table and a floral cover on the bed.',
    '/img/yasli-bakim/9.jpg':
      'A care bed with the head raised, two green armchairs beside it; a dressing table with a mirror on the right and a telephone on the wall.',
    '/img/yasli-bakim/10.jpg':
      'A large room: a care bed, two green armchairs, a wooden shelving unit full of books, a television and an old gramophone in one corner.',

    '/img/haber-1/1.jpg':
      'A classical oil painting of a reclining Venus with a small Eros holding an arrow beside her, and a white dove at her feet.',
    '/img/haber-1/2.jpg':
      'The ruins of the Temple of Aphrodite at Aphrodisias: standing fluted marble columns and scattered stone blocks, with hills behind.',
    '/img/haber-1/3.jpg':
      'A painting of the Judgement of Paris: Paris holding out the golden apple to one of the three goddesses, surrounded by sheep and goats, with small winged figures in the sky.',

    '/img/haber-2/1.jpg':
      'The empty, still outdoor pool; yellow sunbeds and thatched parasols along its edge, with the blue water slide and its tower behind.',
    '/img/haber-2/2.jpg':
      'A two-storey white building with turquoise wooden posts and balcony railings, with lawn, an olive tree and purple flowering shrubs in front.',
    '/img/haber-2/3.jpg':
      'A busy pool with guests swimming, the two-storey restaurant building and thatched shades behind, and a large white cloud in the sky.',

    '/img/haber-3/1.jpg':
      'Poolside at night: the lit pool with a crowded bar behind it, warm lights and the silhouettes of trees.',
    '/img/haber-3/2.jpg':
      'A building façade lit at night: a mosaic of Aphrodite standing on a shell, a red neon “MONO” sign above and a columned entrance.',
    '/img/haber-3/3.jpg':
      'An open-air party at night: a crowd standing and talking in front of the bar, white curtains behind and warm yellow lighting.',
  },

  de: {
    '/img/standart-oda/1.jpg':
      'Ein Doppelbett mit dunkelrosa gestepptem Kopfteil neben einer Glastür zum französischen Balkon; gefaltete Handtücher auf dem Bett, ein kleiner runder weißer Tisch mit Topfpflanze und ein Makramee-Wandbehang.',
    '/img/standart-oda/2.jpg':
      'Das Zimmer von der Tür aus: links ein Wandfernseher und eine weiße Kommode, gegenüber die Glastür zum Balkon, rechts das Bett mit rosa Kopfteil, dazu ein schmiedeeiserner Leuchter und eine Klimaanlage.',
    '/img/standart-oda/3.jpg':
      'Die Fensterseite des Zimmers: eine weiße Konsole mit Spiegel, ein Wandfernseher, über der Heizung eine Holzkommode mit Topfpflanze und gefaltete Handtücher auf dem Bett.',
    '/img/standart-oda/4.jpg':
      'Blick von der ebenerdigen Terrasse in den Garten: blau gestrichene Holzpfosten, ein blauer Tisch mit zwei blauen Stühlen, dahinter Rasen sowie Oliven- und Palmenbäume.',
    '/img/standart-oda/5.jpg':
      'Dieselbe Terrasse aus einem anderen Winkel; Steinboden, das blaue Tischset und ein Weg zwischen den Bäumen im Garten.',

    '/img/suit-oda/1.jpg':
      'Ein Doppelbett mit weißem Kopfteil, besticktem Kissen und gefalteten Handtüchern; an der Wand ein gerahmtes Bild und ein Makramee-Behang, in der Ecke eine große Topfpflanze, Terrakottafliesen am Boden.',
    '/img/suit-oda/2.jpg':
      'Zwei Einzelbetten mit einem weißen Nachttisch dazwischen, darauf eine Vase mit rosa Blumen; am Fenster ein Wandfernseher, draußen ist eine Palme zu sehen.',
    '/img/suit-oda/3.jpg':
      'Durch das Fenster des Zimmers ist das Meer zu sehen, die bordeauxroten Vorhänge sind zurückgezogen; zwei Betten nebeneinander, rechts ein Wandfernseher und ein weißer Kleiderschrank.',
    '/img/suit-oda/4.jpg':
      'Ein überdachter Balkon: blaues Holzgeländer, ein blauer Tisch mit zwei Korbsesseln und einer Vase mit lila Blumen; dahinter Olivenbäume und das Meer.',
    '/img/suit-oda/5.jpg':
      'Blick vom Balkon nach unten: hinter dem blauen Geländer der Pool mit blauer Wasserrutsche, blühende Sträucher, Olivenbäume und das Meer.',
    '/img/suit-oda/6.jpg':
      'Eines der zweigeschossigen weißen Gebäude der Anlage vom Garten aus, mit holzvergitterten Balkonen im Obergeschoss, Olivenbäumen und rosa Rosen davor.',

    '/img/grand-suit-oda/1.jpg':
      'Der Wohnraum: ein blaues Sofa, zwei lila Sessel und ein rotes Sofa; rechts eine Küchenzeile mit Waschmaschine, Geschirrspüler, Mikrowelle und Schränken, links ein Fernseher.',
    '/img/grand-suit-oda/2.jpg':
      'Die Fensterseite des Wohnraums: zwei lila Sessel, ein rotes Ecksofa und ein Holztisch mit Obstschale; eine Glastür zum Balkon und eine Klimaanlage an der Wand.',
    '/img/grand-suit-oda/3.jpg':
      'Der weite Wohnraum: ein blaues Schlafsofa, ein rotes Sofa und lila Sessel; durch die Schiebetür sieht man den Esstisch auf dem überdachten Balkon, links ein Kühlschrank.',
    '/img/grand-suit-oda/4.jpg':
      'Ein Schlafzimmer: ein Doppelbett mit rosa gestepptem Kopfteil, ein Fenster mit türkisfarbenen Vorhängen, hölzerne Nachttische und eine Klimaanlage.',
    '/img/grand-suit-oda/5.jpg':
      'Ein zweites Schlafzimmer: ein Doppelbett mit rosa Kopfteil, ein Holzkleiderschrank, ein Schminktisch mit Spiegel und zwei Nachttische; auf dem Bett gefaltete Handtücher.',
    '/img/grand-suit-oda/6.jpg':
      'Das Kinderzimmer: zwei Einzelbetten mit rosa gesteppten Kopfteilen, ein Fenster mit türkisfarbenen Vorhängen und eine Klimaanlage.',
    '/img/grand-suit-oda/7.jpg':
      'Dasselbe Zweibettzimmer von der Tür aus; gefaltete Handtücher auf den Betten und dazwischen ein Nachttisch mit Topfpflanze.',
    '/img/grand-suit-oda/8.jpg':
      'Blick vom Wohnraum auf den Balkon: durch die offene Glastür ein überdachter Balkon mit grünen Wänden, ein Esstisch mit vier Stühlen und Olivenzweige.',
    '/img/grand-suit-oda/9.jpg':
      'Der Balkon selbst: ein hölzerner Esstisch mit vier Stühlen, grüne Wände sowie Bäume und Nachbargebäude hinter dem Geländer.',
    '/img/grand-suit-oda/10.jpg':
      'Das Bad: ein grünes Waschbecken mit Spiegel, Wandfliesen in Holzoptik, eine Toilette mit Handbrause und darüber ein kleines Fenster.',

    '/img/apart-daireler/1.png':
      'Der Wohnraum des Apartments: ein bordeauxrotes Ecksofa, zwei gemusterte Sessel und ein Holztisch; links eine Küchenzeile mit Kühlschrank, Kochfeld, Geschirrspüler und Waschmaschine.',
    '/img/apart-daireler/2.png':
      'Das Schlafzimmer: ein Doppelbett mit bordeauxrotem gestepptem Kopfteil, beidseitig ein Holznachttisch mit Lampe und ein gerahmtes Bild an der Wand.',
    '/img/apart-daireler/3.png':
      'Das Bad: eine Badewanne mit Duschabtrennung, Fliesen in Holzoptik, ein weißes Waschbecken und ein runder Spiegel mit Goldrahmen.',

    '/img/yasli-bakim/1.jpg':
      'Ausschnitt einer Zimmerecke: eine Vase mit weißen Blumen auf einer Konsole, ein Fernseher an der Wand und hellgrüne Wände.',
    '/img/yasli-bakim/2.jpg':
      'Am Fenster: ein grün gepolsterter Sessel, Gardinen und eine Topfpflanze auf einem Beistelltisch, im Vordergrund ein Einzelbett.',
    '/img/yasli-bakim/3.jpg':
      'Ein Zimmer mit Erker: ein Einzelbett, zwei grüne Sessel, eine Topfpflanze und eine Blumenvase; durch die Fenster sind Nachbargebäude zu sehen.',
    '/img/yasli-bakim/4.jpg':
      'Vor dem Erker ein kleiner gedeckter Tisch mit zwei grünen Sesseln und einer Topfblume; im Vordergrund das Bett mit Kissen.',
    '/img/yasli-bakim/5.jpg':
      'Weitere Ansicht des Zimmers: Tisch und Sessel in der Sitzecke, ein hölzerner Nachttisch, ein Einzelbett und Laminatboden.',
    '/img/yasli-bakim/6.jpg':
      'Das Bad: eine breite Ablage mit Waschbecken, ein großer Spiegel, ein Haltegriff, eine Toilette und ein Notrufknopf an der Wand; auf der Ablage ein Haartrockner.',
    '/img/yasli-bakim/7.jpg':
      'Das Zimmer mit persönlichen Dingen eingerichtet: ein grüner Sessel mit Blumenkissen, eine Lampe und Familienfotos auf der Konsole, ein Glas und eine Fernbedienung auf dem Beistelltisch.',
    '/img/yasli-bakim/8.jpg':
      'Ein sonnendurchflutetes Zimmer: Topfblumen und ein kleiner Tisch vor den Erkerfenstern, persönliche Dinge auf dem Schminktisch und eine geblümte Decke auf dem Bett.',
    '/img/yasli-bakim/9.jpg':
      'Ein Pflegebett mit erhöhtem Kopfteil, daneben zwei grüne Sessel; rechts ein Schminktisch mit Spiegel und ein Telefon an der Wand.',
    '/img/yasli-bakim/10.jpg':
      'Ein großes Zimmer: ein Pflegebett, zwei grüne Sessel, ein hölzernes Regal voller Bücher, ein Fernseher und in einer Ecke ein altes Grammophon.',

    '/img/haber-1/1.jpg':
      'Ein klassisches Ölgemälde mit einer liegenden Venus, daneben ein kleiner Eros mit einem Pfeil und zu ihren Füßen eine weiße Taube.',
    '/img/haber-1/2.jpg':
      'Die Ruinen des Aphrodite-Tempels in Aphrodisias: stehende kannelierte Marmorsäulen und verstreute Steinblöcke, dahinter Hügel.',
    '/img/haber-1/3.jpg':
      'Ein Gemälde des Parisurteils: Paris reicht einer der drei Göttinnen den goldenen Apfel, ringsum Schafe und Ziegen, am Himmel kleine geflügelte Gestalten.',

    '/img/haber-2/1.jpg':
      'Der leere, stille Außenpool; am Rand gelbe Liegen und Schilfschirme, dahinter die blaue Wasserrutsche mit ihrem Turm.',
    '/img/haber-2/2.jpg':
      'Ein zweigeschossiges weißes Gebäude mit türkisfarbenen Holzpfosten und Balkongeländern, davor Rasen, ein Olivenbaum und lila blühende Sträucher.',
    '/img/haber-2/3.jpg':
      'Ein belebter Pool mit schwimmenden Gästen, dahinter das zweigeschossige Restaurantgebäude und Schilfdächer, am Himmel eine große weiße Wolke.',

    '/img/haber-3/1.jpg':
      'Der Poolbereich bei Nacht: der beleuchtete Pool, dahinter eine gut besuchte Bar, warmes Licht und die Silhouetten von Bäumen.',
    '/img/haber-3/2.jpg':
      'Eine nachts beleuchtete Fassade: ein Mosaik der auf einer Muschel stehenden Aphrodite, darüber ein rotes Neonschild „MONO“ und ein Säuleneingang.',
    '/img/haber-3/3.jpg':
      'Eine Party unter freiem Himmel bei Nacht: eine stehende, sich unterhaltende Menge vor der Bar, dahinter weiße Vorhänge und warmes gelbes Licht.',
  },
}

/** Verilen görsel yolları için o dildeki alt metinleri döndürür. */
export function altsFor(lang: Lang, paths: string[]): string[] | undefined {
  const table = photoAlts[lang]
  const result = paths.map((path) => table[path])
  return result.every(Boolean) ? (result as string[]) : undefined
}
