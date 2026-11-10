/* global window */
window.ERFGOED_DATA = {
  storageKey: "erfgoedQuiz.v1",
  pointsPerItem: 10,
  streakBonus: 5,
  streakEvery: 3,
  badgeLevels: [
    { id: "none", minPct: 0, name: "Nog te verdienen", emoji: "○", className: "todo" },
    { id: "bronze", minPct: 50, name: "Brons", emoji: "🥉", className: "bronze" },
    { id: "silver", minPct: 80, name: "Zilver", emoji: "🥈", className: "silver" },
    { id: "gold", minPct: 100, name: "Goud", emoji: "🥇", className: "gold" }
  ],
  namedBadges: [
    { id: "jonge-farao", name: "Jonge Farao", emoji: "👑", sections: ["koppelen-egypte", "status-egypte", "nijl", "egypte-nu"], hint: "Haal minstens zilver op alle Egypte-oefeningen" },
    { id: "muurwachter", name: "Muurwachter", emoji: "🧱", sections: ["muur-toen", "muur-extra", "muur-nu", "muur-tf"], hint: "Haal minstens zilver op de oefeningen over de Chinese Muur" },
    { id: "zuilenbouwer", name: "Zuilenbouwer", emoji: "🏛️", sections: ["zuilen"], hint: "Haal minstens zilver bij de Griekse zuilen" },
    { id: "tempelspeurder", name: "Tempelspeurder", emoji: "🔎", sections: ["unesco", "rome"], hint: "Haal minstens zilver bij UNESCO/Maya's/Inca's en oud Rome" },
    { id: "asgraver", name: "Asgraver van Pompeï", emoji: "🌋", sections: ["pompei"], hint: "Haal minstens zilver bij Pompeï" },
    { id: "wereldmeester", name: "Wereld-erfgoedmeester", emoji: "🌍", allTopics: true, hint: "Haal minstens zilver op alle 14 onderwerpen" }
  ],
  milestones: [],
  sections: [
    { id: "erfgoed", num: 1, title: "Samengevat erfgoed", emoji: "🏛️", blurb: "Vul de juiste woorden in." , accent: "#1E4E8C" },
    { id: "unesco", num: 2, title: "UNESCO, Maya's en Inca's", emoji: "🌎", blurb: "Kies een volk en oefen de sites." , accent: "#1E4E8C" },
    { id: "koppelen-egypte", num: 3, title: "Egypte: woorden koppelen", emoji: "🏺", blurb: "Mummie, piramide, sfinx en sarcofaag." , accent: "#C4A35A" },
    { id: "status-egypte", num: 4, title: "Oud Egypte: status en geloof", emoji: "👑", blurb: "Farao, goden, piramides en mummies." , accent: "#C4A35A" },
    { id: "muur-toen", num: 5, title: "Chinese Muur: vroeger", emoji: "🧱", blurb: "Functies en mensen bij de muur." , accent: "#5C6B7A" },
    { id: "muur-extra", num: 6, title: "Chinese Muur: extra vragen", emoji: "🐉", blurb: "Grenzen, lengte en de draak." , accent: "#5C6B7A" },
    { id: "nijl", num: 7, title: "De Nijl, Rosetta en papyrus", emoji: "🌊", blurb: "Koppelen en nummeren." , accent: "#C4A35A" },
    { id: "egypte-nu", num: 8, title: "Egypte vandaag", emoji: "🗺️", blurb: "Infofiche en kaart." , accent: "#C4A35A" },
    { id: "muur-nu", num: 9, title: "Chinese Muur vandaag", emoji: "📸", blurb: "Toerisme, restauratie en de maan." , accent: "#5C6B7A" },
    { id: "muur-tf", num: 10, title: "Chinese Muur: waar of niet?", emoji: "✅", blurb: "Acht beweringen." , accent: "#5C6B7A" },
    { id: "china-nu", num: 11, title: "China vandaag", emoji: "🐼", blurb: "Werelddeel, hoofdstad en buren." , accent: "#1D7A5F" },
    { id: "zuilen", num: 12, title: "Griekse zuilen", emoji: "🏛️", blurb: "Dorisch, Ionisch, Korintisch en Belgische gebouwen." , accent: "#1E4E8C" },
    { id: "rome", num: 13, title: "Oud Rome", emoji: "🛣️", blurb: "Heirbaan, aquaduct en meer." , accent: "#8B6914" },
    { id: "pompei", num: 14, title: "Pompeï", emoji: "🌋", blurb: "Kernwoorden bij de foto's." , accent: "#6B4A2A" }
  ],
  questions: [
    {
      id: "s1-fill",
      section: "erfgoed",
      type: "fill",
      title: "Vul aan",
      prompt: "Sleep of tik de woorden in de juiste open plekken. Elk woord past op één plaats.",
      text: "Erfgoed kan verschillende vormen aannemen: gebouw, voorwerp, {{0}}, traditie…\n\nMen bewaart cultureel of natuurlijk erfgoed omdat een hele {{1}} het belangrijk vindt. Het is vaak iets van {{2}}, maar het kan ook iets van {{3}} zijn. Het wordt {{4}} van generatie op generatie.\n\n{{5}} is erfgoed dat men beschouwt als onvervangbaar, uniek en eigendom van de hele wereld.\n\n{{6}} heeft een {{7}} van werelderfgoed gemaakt… Want wat we nu {{8}}, bepaalt wat mensen later over ons zullen weten.",
      words: ["bewaren", "natuurgebied", "vroeger", "werelderfgoed", "UNESCO", "lijst", "doorgegeven", "vandaag", "groep mensen"],
      answers: ["natuurgebied", "groep mensen", "vroeger", "vandaag", "doorgegeven", "werelderfgoed", "UNESCO", "lijst", "bewaren"],
      explanation: "Natuurgebied hoort bij de vormen van erfgoed. Een hele groep mensen vindt het belangrijk. Het komt vaak uit vroeger, maar kan ook van vandaag zijn, en wordt doorgegeven. Werelderfgoed is uniek voor de hele wereld. UNESCO maakt daar een lijst van. Wat we nu bewaren, bepaalt wat later over ons bekend blijft."
    },

    {
      id: "s2-unesco",
      section: "unesco",
      type: "mc",
      title: "Wat is UNESCO?",
      prompt: "Waarvoor staat UNESCO vooral?",
      image: "images/unesco.jpg",
      imageAlt: "Gebouwen aan de Place de Fontenoy in Parijs, waar UNESCO is gevestigd",
      options: [
        { text: "Een organisatie van de Verenigde Naties die onderwijs, wetenschap, cultuur en werelderfgoed beschermt", correct: true },
        { text: "Een museum alleen over piramides", correct: false },
        { text: "Een voetbalploeg uit Egypte", correct: false },
        { text: "Een keizer van China", correct: false }
      ],
      explanation: "UNESCO is een organisatie van de Verenigde Naties. Ze helpt om belangrijke plaatsen, natuur en tradities te beschermen, zodat de hele wereld ze kan bewaren."
    },
    {
      id: "s2-werelderfgoed",
      section: "unesco",
      type: "mc",
      title: "Werelderfgoed",
      prompt: "Wat is werelderfgoed?",
      options: [
        { text: "Erfgoed dat zo bijzonder en onvervangbaar is dat de hele wereld het wil bewaren", correct: true },
        { text: "Alles wat in een winkel te koop is", correct: false },
        { text: "Alleen schilderijen van de laatste tien jaar", correct: false },
        { text: "Een lijst van de langste rivieren", correct: false }
      ],
      explanation: "Werelderfgoed is uniek, onvervangbaar en eigendom van de hele wereld. UNESCO zet die plaatsen op een speciale lijst."
    },
    {
      id: "s2-volken",
      section: "unesco",
      type: "mc",
      title: "Maya's en Inca's",
      prompt: "Waar leefden deze volken vooral?",
      options: [
        { text: "De Maya's in Midden-Amerika (onder meer Mexico) en de Inca's in de Andes (onder meer Peru en Bolivia)", correct: true },
        { text: "Beide alleen in Egypte, langs de Nijl", correct: false },
        { text: "De Maya's in China en de Inca's in Griekenland", correct: false },
        { text: "Beide alleen in Italië", correct: false }
      ],
      explanation: "De Maya's bouwden steden in onder meer Mexico, Guatemala en Belize. De Inca's leefden hoog in de Andes, onder meer in Peru en Bolivia."
    },
    {
      id: "s2-pick-culture",
      section: "unesco",
      type: "pick-path",
      key: "culture",
      includeInAll: false,
      title: "Opdrachtkeuze",
      prompt: "Kies een volk. Daarna kies je één site en oefen je die vragen. (In 'Alles oefenen' krijg je alle vier de sites.)",
      options: [
        { text: "Maya's (Calakmul of Chichén Itzá)", value: "maya" },
        { text: "Inca's (Machu Picchu of Samaipata)", value: "inca" }
      ]
    },
    {
      id: "s2-pick-maya",
      section: "unesco",
      type: "pick-path",
      key: "site",
      includeInAll: false,
      requires: { culture: "maya" },
      title: "Kies een Mayasite",
      prompt: "Over welke plek wil je oefenen?",
      image: "images/chichen-itza.jpg",
      imageAlt: "De piramide van Chichén Itzá",
      options: [
        { text: "Calakmul", value: "calakmul" },
        { text: "Chichén Itzá", value: "chichen" }
      ]
    },
    {
      id: "s2-pick-inca",
      section: "unesco",
      type: "pick-path",
      key: "site",
      includeInAll: false,
      requires: { culture: "inca" },
      title: "Kies een Incasite",
      prompt: "Over welke plek wil je oefenen?",
      image: "images/machu-picchu.jpg",
      imageAlt: "Machu Picchu in de bergen van Peru",
      options: [
        { text: "Machu Picchu", value: "machu" },
        { text: "Samaipata", value: "samaipata" }
      ]
    },

    {
      id: "s2-machu-land",
      section: "unesco",
      type: "mc",
      requires: { culture: "inca", site: "machu" },
      title: "Machu Picchu",
      prompt: "In welk land ligt Machu Picchu?",
      image: "images/machu-picchu.jpg",
      imageAlt: "Machu Picchu, een Incastad hoog in de bergen",
      options: [
        { text: "Mexico", correct: false },
        { text: "Peru", correct: true },
        { text: "Egypte", correct: false }
      ],
      explanation: "Machu Picchu ligt hoog in de Andes in Peru."
    },
    {
      id: "s2-machu-volk",
      section: "unesco",
      type: "mc",
      requires: { culture: "inca", site: "machu" },
      title: "Machu Picchu",
      prompt: "Welk volk bouwde Machu Picchu?",
      image: "images/machu-picchu.jpg",
      imageAlt: "Machu Picchu",
      options: [
        { text: "de Maya", correct: false },
        { text: "de Romeinen", correct: false },
        { text: "de Inca", correct: true }
      ],
      explanation: "Machu Picchu is een stad van de Inca."
    },
    {
      id: "s2-machu-muren",
      section: "unesco",
      type: "mc",
      requires: { culture: "inca", site: "machu" },
      title: "Machu Picchu",
      prompt: "Wat is bijzonder aan de muren?",
      image: "images/machu-picchu.jpg",
      imageAlt: "Stenen muren van Machu Picchu",
      options: [
        { text: "De stenen passen zo goed in elkaar dat er geen cement nodig was", correct: true },
        { text: "Ze zijn van goud", correct: false },
        { text: "Ze zijn van hout", correct: false }
      ],
      explanation: "De Inca hakten de stenen zo precies dat ze zonder cement stevig in elkaar pasten."
    },

    {
      id: "s2-sama-land",
      section: "unesco",
      type: "mc",
      requires: { culture: "inca", site: "samaipata" },
      title: "Samaipata",
      prompt: "In welk land ligt Samaipata?",
      image: "images/samaipata.jpg",
      imageAlt: "El Fuerte de Samaipata, een grote bewerkte rots",
      options: [
        { text: "Bolivia", correct: true },
        { text: "China", correct: false },
        { text: "Italië", correct: false }
      ],
      explanation: "Samaipata, ook El Fuerte genoemd, ligt in Bolivia."
    },
    {
      id: "s2-sama-bijzonder",
      section: "unesco",
      type: "mc",
      requires: { culture: "inca", site: "samaipata" },
      title: "Samaipata",
      prompt: "Wat is er bijzonder aan Samaipata?",
      image: "images/samaipata.jpg",
      imageAlt: "De uitgehouwen rots van Samaipata",
      options: [
        { text: "een piramide van ijs", correct: false },
        { text: "een enorme rots waarin figuren en kanalen zijn uitgehakt", correct: true },
        { text: "een kasteel onder water", correct: false }
      ],
      explanation: "El Fuerte de Samaipata is een reusachtige rots met uitgehakte figuren en kanalen."
    },
    {
      id: "s2-sama-wie",
      section: "unesco",
      type: "mc",
      requires: { culture: "inca", site: "samaipata" },
      title: "Samaipata",
      prompt: "Wie gebruikten de plek?",
      image: "images/samaipata.jpg",
      imageAlt: "Samaipata",
      options: [
        { text: "verschillende volken na elkaar, onder wie de Inca", correct: true },
        { text: "alleen de Vikingen", correct: false },
        { text: "de Egyptische farao's", correct: false }
      ],
      explanation: "Verschillende volken gebruikten de ceremoniële rots, later ook de Inca."
    },

    {
      id: "s2-chi-volk",
      section: "unesco",
      type: "mc",
      requires: { culture: "maya", site: "chichen" },
      title: "Chichén Itzá",
      prompt: "Welk volk bouwde Chichén Itzá?",
      image: "images/chichen-itza.jpg",
      imageAlt: "El Castillo, de grote piramide van Chichén Itzá",
      options: [
        { text: "de Inca", correct: false },
        { text: "de Maya", correct: true },
        { text: "de Grieken", correct: false }
      ],
      explanation: "Chichén Itzá is een beroemde Mayastad op het schiereiland Yucatán in Mexico."
    },
    {
      id: "s2-chi-slang",
      section: "unesco",
      type: "mc",
      requires: { culture: "maya", site: "chichen" },
      title: "Chichén Itzá",
      prompt: "Wat zie je bij het begin van de lente en de herfst op de trap van de grote piramide?",
      image: "images/chichen-itza.jpg",
      imageAlt: "De trap van de piramide van Kukulcán",
      options: [
        { text: "de schaduw van een slang", correct: true },
        { text: "een regenboog", correct: false },
        { text: "sneeuw", correct: false }
      ],
      explanation: "Rond het begin van de lente en de herfst vormt de zon een slingerende schaduw langs de trap: de slang van Kukulcán."
    },
    {
      id: "s2-chi-treden",
      section: "unesco",
      type: "mc",
      requires: { culture: "maya", site: "chichen" },
      title: "Chichén Itzá",
      prompt: "Alle treden samen zijn er ongeveer evenveel als…",
      image: "images/chichen-itza.jpg",
      imageAlt: "De piramide van Chichén Itzá",
      options: [
        { text: "dagen in een week", correct: false },
        { text: "dagen in een jaar", correct: true },
        { text: "uren in een dag", correct: false }
      ],
      explanation: "De treden van El Castillo komen ongeveer overeen met het aantal dagen in een jaar. De Maya's waren knappe sterrenwachtkundigen."
    },

    {
      id: "s2-cal-waar",
      section: "unesco",
      type: "mc",
      requires: { culture: "maya", site: "calakmul" },
      title: "Calakmul",
      prompt: "Waar ligt Calakmul?",
      image: "images/calakmul.jpg",
      imageAlt: "Een Mayapiramide van Calakmul tussen de bomen",
      options: [
        { text: "in de woestijn van Egypte", correct: false },
        { text: "op een berg in Peru", correct: false },
        { text: "diep in het regenwoud van Mexico", correct: true }
      ],
      explanation: "Calakmul ligt in het regenwoud van het schiereiland Yucatán in Mexico."
    },
    {
      id: "s2-cal-rivaal",
      section: "unesco",
      type: "mc",
      requires: { culture: "maya", site: "calakmul" },
      title: "Calakmul",
      prompt: "Wie was een grote rivaal van Calakmul?",
      image: "images/calakmul.jpg",
      imageAlt: "Calakmul",
      options: [
        { text: "Tikal", correct: true },
        { text: "Rome", correct: false },
        { text: "Machu Picchu", correct: false }
      ],
      explanation: "Calakmul en Tikal waren twee machtige Mayasteden die met elkaar rivaliseerden."
    },
    {
      id: "s2-cal-koninkrijk",
      section: "unesco",
      type: "mc",
      requires: { culture: "maya", site: "calakmul" },
      title: "Calakmul",
      prompt: "Calakmul hoorde bij het koninkrijk van de…",
      image: "images/calakmul.jpg",
      imageAlt: "Calakmul",
      options: [
        { text: "adelaar", correct: false },
        { text: "slang", correct: true },
        { text: "leeuw", correct: false }
      ],
      explanation: "Calakmul wordt verbonden met het Koninkrijk van de Slang, een machtig Mayarijk."
    },

    {
      id: "s3-match",
      section: "koppelen-egypte",
      type: "match",
      title: "Koppel de woorden",
      prompt: "Tik eerst op een woord links en daarna op de juiste verklaring rechts.",
      image: "images/sfinx.jpg",
      imageAlt: "De Sfinx van Gizeh met de piramides op de achtergrond",
      pairs: [
        { left: "mummificeren", right: "balsemen" },
        { left: "piramide", right: "koningsgraf" },
        { left: "sfinx", right: "beeld dat wacht houdt" },
        { left: "sarcofaag", right: "kist" }
      ],
      explanation: "Mummificeren is balsemen. Een piramide is een koningsgraf. De sfinx is een beeld dat wacht houdt. Een sarcofaag is de kist waarin de mummie lag."
    },

    {
      id: "s4-status",
      section: "status-egypte",
      type: "order",
      title: "Status in oud Egypte",
      prompt: "Zet de groepen in de juiste volgorde van status. Tik eerst op de hoogste (1) en daarna lager tot 4.",
      image: "images/pyramides.jpg",
      imageAlt: "De piramides van Gizeh",
      items: [
        { label: "farao", order: 1 },
        { label: "priester / schrijver", order: 2 },
        { label: "boer / beeldhouwer / soldaat", order: 3 },
        { label: "slaven", order: 4 }
      ],
      explanation: "De farao stond helemaal bovenaan. Daarna kwamen priesters en schrijvers. Boeren, beeldhouwers en soldaten zaten in het midden. Slaven hadden de laagste status."
    },
    {
      id: "s4-goden-aantal",
      section: "status-egypte",
      type: "mc",
      title: "Geloof bij de Sfinx",
      prompt: "Geloofden de oude Egyptenaren in één God of in verschillende goden?",
      image: "images/sfinx.jpg",
      imageAlt: "De Sfinx van Gizeh",
      options: [
        { text: "in verschillende goden", correct: true },
        { text: "in één God", correct: false }
      ],
      explanation: "De oude Egyptenaren waren polytheïstisch: ze geloofden in verschillende goden, zoals Ra, Osiris, Isis en Anubis."
    },
    {
      id: "s4-goden-vorm",
      section: "status-egypte",
      type: "multi",
      title: "Hoe zagen goden eruit?",
      prompt: "Hoe stelden de Egyptenaren hun goden voor? Kies alle juiste antwoorden.",
      image: "images/sfinx.jpg",
      imageAlt: "De Sfinx, een wezen met een mensenhoofd en een leeuwenlijf",
      options: [
        { text: "als mens", correct: true },
        { text: "als halfmens", correct: true },
        { text: "als dier", correct: true },
        { text: "als half dier", correct: true },
        { text: "alleen als levende farao's van vlees en bloed, nooit als beeld", correct: false }
      ],
      explanation: "Goden konden als mens, dier, halfmens of half dier worden afgebeeld. De sfinx zelf is half mens, half leeuw."
    },
    {
      id: "s4-piramide-wie",
      section: "status-egypte",
      type: "mc",
      title: "Voor wie waren de piramides?",
      prompt: "Voor wie bouwde men de grote piramides?",
      image: "images/pyramides.jpg",
      imageAlt: "De piramides van Gizeh",
      options: [
        { text: "voor de farao", correct: true },
        { text: "voor alle boeren van het dorp", correct: false },
        { text: "als speelplaats voor kinderen", correct: false },
        { text: "als vuurtoren voor boten op de Nijl", correct: false }
      ],
      explanation: "Piramides waren vooral graven voor de farao."
    },
    {
      id: "s4-piramide-waarom",
      section: "status-egypte",
      type: "mc",
      title: "Waarom piramides?",
      prompt: "Waarom bouwde men piramides voor de farao?",
      image: "images/pyramides.jpg",
      imageAlt: "De piramides van Gizeh",
      options: [
        { text: "Als graf, zodat de farao goed voorbereid was op het hiernamaals", correct: true },
        { text: "Om er graan in te bewaren voor de winter", correct: false },
        { text: "Om de Chinese Muur te steunen", correct: false },
        { text: "Als zwembad in de woestijn", correct: false }
      ],
      explanation: "De Egyptenaren geloofden in een leven na de dood. De piramide was het graf van de farao voor het hiernamaals."
    },
    {
      id: "s4-mummie",
      section: "status-egypte",
      type: "mc",
      title: "Waarom mummificeren?",
      prompt: "Waarom balsemde men het lichaam van een overledene?",
      image: "images/sfinx.jpg",
      imageAlt: "Oud-Egyptisch landschap bij de Sfinx",
      options: [
        { text: "Om het lichaam te bewaren voor het leven na de dood", correct: true },
        { text: "Zodat het lichaam sneller zou vergaan", correct: false },
        { text: "Om het lichaam naar China te sturen", correct: false },
        { text: "Omdat mummies beter konden zwemmen", correct: false }
      ],
      explanation: "Door te mummificeren (balsemen) bleef het lichaam bewaard. Zo kon de persoon volgens hun geloof verderleven in het hiernamaals."
    },

    {
      id: "s5-functies",
      section: "muur-toen",
      type: "multi",
      title: "Drie belangrijke functies",
      prompt: "Wat waren de drie belangrijkste functies van de Chinese Muur? Kies precies de juiste drie.",
      image: "images/chinese-muur.jpg",
      imageAlt: "De Chinese Muur die over de bergen slingert",
      options: [
        { text: "Het rijk verdedigen tegen aanvallers", correct: true },
        { text: "De grens van het rijk aanduiden", correct: true },
        { text: "Communicatie en controle, onder meer met rooksignalen en door reizigers en handel te controleren", correct: true },
        { text: "Als paleis waarin de keizer woonde", correct: false },
        { text: "Als grafpiramide voor farao's", correct: false },
        { text: "Als brug waarmee je naar de maan kon lopen", correct: false }
      ],
      explanation: "De muur diende om aanvallers tegen te houden, de grens te tonen en om berichten (rooksignalen) en verkeer te controleren."
    },
    {
      id: "s5-fill",
      section: "muur-toen",
      type: "fill",
      title: "Mensen bij de muur, vroeger",
      prompt: "Vul in met de woorden over het verleden.",
      image: "images/chinese-muur.jpg",
      imageAlt: "Wachttorens op de Chinese Muur",
      text: "In het oude China bewaakten {{0}} de muur. Zij hielden uitzicht op mogelijke {{1}}. Met {{2}} waarschuwden ze elkaar als er gevaar was. {{3}} moesten vaak als {{4}} meehelpen bij de zware bouw. Soms leefden ook {{5}} in de buurt van de wachtposten, bij hun familie.",
      words: ["soldaten", "aanvallers", "rooksignalen", "misdadigers", "straf", "vrouwen"],
      answers: ["soldaten", "aanvallers", "rooksignalen", "misdadigers", "straf", "vrouwen"],
      explanation: "Soldaten bewaakten de muur en keken uit naar aanvallers. Met rooksignalen gaven ze alarm. Misdadigers moesten vaak als straf mee bouwen. Vrouwen en families leefden soms bij de wachtposten."
    },

    {
      id: "s6-grenzen",
      section: "muur-extra",
      type: "multi",
      title: "Natuurlijke grenzen",
      prompt: "De verdedigingslinie gebruikte ook natuurlijke grenzen. Welke horen daarbij?",
      image: "images/chinese-muur.jpg",
      imageAlt: "De Chinese Muur in een bergachtig landschap",
      options: [
        { text: "bergen", correct: true },
        { text: "woestijnen", correct: true },
        { text: "rivieren", correct: true },
        { text: "piramides", correct: false },
        { text: "regenbogen", correct: false }
      ],
      explanation: "Niet overal stond een stenen muur. Bergen, woestijnen en rivieren vormden ook natuurlijke grenzen."
    },
    {
      id: "s6-lengte",
      section: "muur-extra",
      type: "mc",
      title: "De lengte van de muur",
      prompt: "Waarom is de exacte lengte van de Chinese Muur moeilijk vast te stellen?",
      options: [
        { text: "Het zijn veel losse stukken uit verschillende periodes, en sommige delen zijn verdwenen of vervallen", correct: true },
        { text: "Niemand mag de muur opmeten", correct: false },
        { text: "De muur groeit elk jaar een kilometer", correct: false },
        { text: "Hij ligt onder water", correct: false }
      ],
      explanation: "Er zijn veel verschillende stukken, gebouwd in verschillende tijden. Een deel is verdwenen of ingestort, daarom verschillen de cijfers."
    },
    {
      id: "s6-draak",
      section: "muur-extra",
      type: "mc",
      title: "Een beeldspraak",
      prompt: "Waarmee vergelijkt men de Chinese Muur vaak, omdat hij zo over het land slingert?",
      image: "images/chinese-muur.jpg",
      imageAlt: "De Chinese Muur als een lange lijn door het landschap",
      options: [
        { text: "een draak", correct: true },
        { text: "een piramide", correct: false },
        { text: "een sfinx", correct: false },
        { text: "een aquaduct", correct: false }
      ],
      explanation: "De muur lijkt op een lange, slingerende draak. Het beginfort aan zee wordt zelfs de 'Oude drakenkop' genoemd."
    },

    {
      id: "s7-nijl",
      section: "nijl",
      type: "match",
      title: "Koppelen: de Nijl",
      prompt: "Koppel elk woord aan de juiste uitleg.",
      image: "images/nile.jpg",
      imageAlt: "De Nijl en de delta, gezien vanuit de ruimte",
      pairs: [
        { left: "Overstroming", right: "Elk jaar in de zomer trad de Nijl buiten haar oevers." },
        { left: "Vruchtbaar slib", right: "Zwarte modder die achterbleef na het water; daarom noemden de Egyptenaren hun land \"Kemet\" (het zwarte land)." },
        { left: "Papyrus", right: "Plant langs de rivier waarvan men een soort papier maakte, maar ook manden en bootjes." },
        { left: "Transport", right: "Met boten vervoerde men graan en zware stenen; stroomafwaarts naar het noorden, met de wind in het zeil naar het zuiden." },
        { left: "Landbouw", right: "Boeren kweekten tarwe, gerst en vlas op de natte grond en groeven kanalen naar hun velden." }
      ],
      explanation: "De zomeroverstroming liet zwart, vruchtbaar slib achter (Kemet). Langs de rivier groeide papyrus. Boten zorgden voor transport en boeren verbouwden tarwe, gerst en vlas."
    },
    {
      id: "s7-rosetta",
      section: "nijl",
      type: "order",
      title: "Nummer de Steen van Rosetta",
      prompt: "Zet het verhaal in de juiste volgorde. Tik eerst op stap 1.",
      image: "images/rosetta.jpg",
      imageAlt: "De Steen van Rosetta in het British Museum",
      items: [
        { label: "Egypte — In het oude Egypte schreef men met beeldtekens.", order: 1 },
        { label: "Hiërogliefen — Die beeldtekens noemen we hiërogliefen.", order: 2 },
        { label: "Schrijvers — Geschoolde schrijvers konden ze lezen en schrijven.", order: 3 },
        { label: "Steen van Rosetta — Dankzij deze steen konden geleerden de hiërogliefen later weer ontcijferen.", order: 4 }
      ],
      explanation: "In Egypte gebruikte men hiërogliefen. Schrijvers kenden die tekens. Veel later hielp de Steen van Rosetta (met dezelfde tekst in meerdere schriften) om ze opnieuw te lezen."
    },
    {
      id: "s7-papyrus",
      section: "nijl",
      type: "order",
      title: "Papyrus maken",
      prompt: "Nummer de stappen om van de plant een schrijfvel te maken.",
      image: "images/papyrus.jpg",
      imageAlt: "Papyrusplanten",
      items: [
        { label: "papyrusriet", order: 1 },
        { label: "repen snijden", order: 2 },
        { label: "samenpersen", order: 3 },
        { label: "vel papyrus", order: 4 }
      ],
      explanation: "Eerst heb je papyrusriet. Daarvan snijd je repen. Die pers je samen tot ze aan elkaar kleven. Zo krijg je een vel papyrus om op te schrijven."
    },

    {
      id: "s8-werelddeel",
      section: "egypte-nu",
      type: "mc",
      title: "Infofiche Egypte",
      prompt: "Op welk werelddeel ligt Egypte?",
      image: "images/nile.jpg",
      imageAlt: "Egypte vanuit de ruimte, met de Nijl als groene lijn",
      options: [
        { text: "Afrika", correct: true },
        { text: "Azië", correct: false },
        { text: "Europa", correct: false },
        { text: "Amerika", correct: false }
      ],
      explanation: "Egypte ligt in het noordoosten van Afrika. Het Sinaï-schiereiland ligt wel in Azië, maar het land zelf rekenen we bij Afrika."
    },
    {
      id: "s8-hoofdstad",
      section: "egypte-nu",
      type: "mc",
      title: "Infofiche Egypte",
      prompt: "Wat is de hoofdstad van Egypte?",
      options: [
        { text: "Caïro", correct: true },
        { text: "Alexandrië", correct: false },
        { text: "Luxor", correct: false },
        { text: "Peking", correct: false }
      ],
      explanation: "De hoofdstad is Caïro, een enorme stad aan de Nijl."
    },
    {
      id: "s8-rivier",
      section: "egypte-nu",
      type: "mc",
      title: "Infofiche Egypte",
      prompt: "Wat is de langste rivier van het land (én van Afrika)?",
      options: [
        { text: "de Nijl", correct: true },
        { text: "de Jangtsekiang", correct: false },
        { text: "de Amazone", correct: false },
        { text: "de Schelde", correct: false }
      ],
      explanation: "De Nijl is de levensader van Egypte en een van de langste rivieren ter wereld."
    },
    {
      id: "s8-buren",
      section: "egypte-nu",
      type: "multi",
      title: "Infofiche Egypte",
      prompt: "Welke landen of gebieden grenzen aan Egypte? Kies alle juiste antwoorden.",
      options: [
        { text: "Libië", correct: true },
        { text: "Soedan", correct: true },
        { text: "Israël (en de Gazastrook)", correct: true },
        { text: "Tsjaad", correct: false },
        { text: "Griekenland", correct: false }
      ],
      explanation: "Egypte grenst aan Libië in het westen, Soedan in het zuiden en Israël plus de Gazastrook in het noordoosten."
    },
    {
      id: "s8-taal",
      section: "egypte-nu",
      type: "mc",
      title: "Infofiche Egypte",
      prompt: "Wat is de officiële taal?",
      options: [
        { text: "Arabisch", correct: true },
        { text: "Chinees", correct: false },
        { text: "Latijn", correct: false },
        { text: "Nederlands", correct: false }
      ],
      explanation: "De officiële taal van Egypte is Arabisch."
    },
    {
      id: "s8-zeeën",
      section: "egypte-nu",
      type: "multi",
      title: "Infofiche Egypte",
      prompt: "Aan welke zeeën ligt Egypte? Kies beide juiste antwoorden.",
      options: [
        { text: "de Middellandse Zee", correct: true },
        { text: "de Rode Zee", correct: true },
        { text: "de Noordzee", correct: false },
        { text: "de Zwarte Zee", correct: false }
      ],
      explanation: "In het noorden ligt de Middellandse Zee, in het oosten de Rode Zee."
    },
    {
      id: "s8-staat",
      section: "egypte-nu",
      type: "mc",
      title: "Infofiche Egypte",
      prompt: "Wat is de staatsvorm van Egypte vandaag?",
      options: [
        { text: "een republiek", correct: true },
        { text: "een koninkrijk met een farao", correct: false },
        { text: "een provincie van China", correct: false },
        { text: "een deel van het Romeinse Rijk", correct: false }
      ],
      explanation: "Egypte is vandaag een republiek (de Arabische Republiek Egypte). Er is geen farao meer."
    },
    {
      id: "s8-kaart",
      section: "egypte-nu",
      type: "map",
      title: "Kaart van Egypte",
      prompt: "Tik eerst op de rivier de Nijl en daarna op de stad Caïro.",
      targets: [
        { id: "nile", label: "de Nijl" },
        { id: "cairo", label: "Caïro" }
      ],
      explanation: "De Nijl stroomt van zuid naar noord door de woestijn en vormt een delta bij de Middellandse Zee. Caïro ligt ongeveer waar de delta begint."
    },

    {
      id: "s9-fill",
      section: "muur-nu",
      type: "fill",
      title: "De muur vandaag",
      prompt: "Vul in met de woorden over nu.",
      image: "images/chinese-muur.jpg",
      imageAlt: "Bezoekerspad op de Chinese Muur",
      text: "De Chinese Muur ligt in {{0}}. Vandaag komen vooral heel veel bezoekers voor het {{1}}. Op verschillende plaatsen gebeurt er {{2}}, zodat de muur bewaard blijft.",
      words: ["China", "toerisme", "restauratie"],
      answers: ["China", "toerisme", "restauratie"],
      explanation: "De muur ligt in China. De belangrijkste rol nu is toerisme. Restauratieteams herstellen stukken zodat het erfgoed bewaard blijft."
    },
    {
      id: "s9-functie",
      section: "muur-nu",
      type: "mc",
      title: "Functie vandaag",
      prompt: "Wat is vandaag de belangrijkste functie van de Chinese Muur?",
      image: "images/chinese-muur.jpg",
      imageAlt: "De Chinese Muur als bezoekersattractie",
      options: [
        { text: "Een toeristische attractie en werelderfgoed dat men bezoekt en beschermt", correct: true },
        { text: "De enige grensbescherming van het leger", correct: false },
        { text: "Een startbaan voor vliegtuigen", correct: false },
        { text: "Een ondergrondse metro", correct: false }
      ],
      explanation: "Vandaag is de muur vooral een beroemde bezienswaardigheid en UNESCO-werelderfgoed."
    },
    {
      id: "s9-maan",
      section: "muur-nu",
      type: "tf",
      title: "Zichtbaar vanaf de maan?",
      prompt: "Je kunt de Chinese Muur met het blote oog zien vanaf de maan.",
      image: "images/chinese-muur.jpg",
      imageAlt: "De Chinese Muur vanuit de lucht gezien is al een dunne lijn",
      answer: false,
      explanation: "Dat is niet waar. De muur is maar een paar meter breed, veel te smal om vanaf de maan te zien."
    },

    {
      id: "s10-1",
      section: "muur-tf",
      type: "tf",
      title: "Waar of niet waar? (1/8)",
      prompt: "Je kunt de Chinese Muur met het blote oog zien vanaf de maan.",
      answer: false,
      explanation: "Niet waar. De muur is maar een paar meter breed, veel te smal om vanaf de maan te zien."
    },
    {
      id: "s10-2",
      section: "muur-tf",
      type: "tf",
      title: "Waar of niet waar? (2/8)",
      prompt: "De muur moest China beschermen tegen invallen van volken uit het noorden.",
      answer: true,
      explanation: "Waar. Ruitervolken uit de steppe vielen China vaak binnen."
    },
    {
      id: "s10-3",
      section: "muur-tf",
      type: "tf",
      title: "Waar of niet waar? (3/8)",
      prompt: "Eén keizer bouwde de hele muur in één keer.",
      answer: false,
      explanation: "Niet waar. Verschillende keizers bouwden er meer dan 2000 jaar lang aan."
    },
    {
      id: "s10-4",
      section: "muur-tf",
      type: "tf",
      title: "Waar of niet waar? (4/8)",
      prompt: "De meeste stukken die toeristen nu bezoeken, werden gebouwd tijdens de Ming-dynastie.",
      answer: true,
      explanation: "Waar. Die stukken met bakstenen en torens zijn zo'n 500 jaar oud."
    },
    {
      id: "s10-5",
      section: "muur-tf",
      type: "tf",
      title: "Waar of niet waar? (5/8)",
      prompt: "De Chinese Muur is één lange muur zonder onderbrekingen.",
      answer: false,
      explanation: "Niet waar. Het zijn veel verschillende muren en stukken, soms met bergen of rivieren ertussen."
    },
    {
      id: "s10-6",
      section: "muur-tf",
      type: "tf",
      title: "Waar of niet waar? (6/8)",
      prompt: "Soldaten op de wachttorens gaven elkaar signalen met rook en vuur.",
      answer: true,
      explanation: "Waar. Zo ging een waarschuwing snel van toren naar toren."
    },
    {
      id: "s10-7",
      section: "muur-tf",
      type: "tf",
      title: "Waar of niet waar? (7/8)",
      prompt: "De Chinese Muur staat op de werelderfgoedlijst van UNESCO.",
      answer: true,
      explanation: "Waar. Sinds 1987."
    },
    {
      id: "s10-8",
      section: "muur-tf",
      type: "tf",
      title: "Waar of niet waar? (8/8)",
      prompt: "De muur werd overal met dezelfde stenen gebouwd.",
      answer: false,
      explanation: "Niet waar. Men gebruikte wat er in de buurt was: aarde, stenen, bakstenen of hout."
    },

    {
      id: "s11-werelddeel",
      section: "china-nu",
      type: "mc",
      title: "Infofiche China",
      prompt: "Op welk werelddeel ligt China?",
      image: "images/chinese-muur.jpg",
      imageAlt: "Landschap in China bij de muur",
      options: [
        { text: "Azië", correct: true },
        { text: "Afrika", correct: false },
        { text: "Europa", correct: false },
        { text: "Oceanië", correct: false }
      ],
      explanation: "China ligt in Azië. Het is een heel groot land in Oost-Azië."
    },
    {
      id: "s11-hoofdstad",
      section: "china-nu",
      type: "mc",
      title: "Infofiche China",
      prompt: "Wat is de hoofdstad van China?",
      options: [
        { text: "Peking (Beijing)", correct: true },
        { text: "Shanghai", correct: false },
        { text: "Hongkong", correct: false },
        { text: "Caïro", correct: false }
      ],
      explanation: "De hoofdstad is Peking, in het Chinees Beijing."
    },
    {
      id: "s11-rivier",
      section: "china-nu",
      type: "mc",
      title: "Infofiche China",
      prompt: "Wat is de langste rivier van Azië?",
      options: [
        { text: "de Jangtsekiang (Blauwe Rivier)", correct: true },
        { text: "de Nijl", correct: false },
        { text: "de Amazone", correct: false },
        { text: "de Rijn", correct: false }
      ],
      explanation: "De Jangtsekiang is de langste rivier van Azië (én van China). De Nijl is langer, maar ligt in Afrika."
    },
    {
      id: "s11-buur",
      section: "china-nu",
      type: "mc",
      title: "Infofiche China",
      prompt: "Welk land is géén buurland van China?",
      options: [
        { text: "Japan", correct: true },
        { text: "Mongolië", correct: false },
        { text: "Rusland", correct: false },
        { text: "India", correct: false }
      ],
      explanation: "Mongolië, Rusland en India grenzen aan China. Japan is een eilandenrijk over zee en dus geen landbuur."
    },

    {
      id: "s12-dorisch",
      section: "zuilen",
      type: "mc",
      title: "Dorische zuil",
      prompt: "Hoe herken je een Dorische zuil?",
      image: "images/dorisch.jpg",
      imageAlt: "Het Parthenon in Athene, met Dorische zuilen",
      imageContain: true,
      options: [
        { text: "Eenvoudig en stoer: meestal geen voet, een sober kapiteel (bovenstuk) zonder krullen of bladeren", correct: true },
        { text: "Met grote krullen (voluten) aan het kapiteel", correct: false },
        { text: "Rijk versierd met acanthusbladeren", correct: false }
      ],
      explanation: "Dorisch is de eenvoudigste Griekse orde: geen (of bijna geen) voet en een sober kapiteel. Het Parthenon in Athene is een beroemd voorbeeld."
    },
    {
      id: "s12-ionisch",
      section: "zuilen",
      type: "mc",
      title: "Ionische zuil",
      prompt: "Hoe herken je een Ionische zuil?",
      image: "images/ionisch.jpg",
      imageAlt: "Ionische zuilen van het Erechtheion in Athene, met krullen aan het kapiteel",
      imageContain: true,
      options: [
        { text: "Het kapiteel heeft kenmerkende krullen, voluten genoemd", correct: true },
        { text: "Er is geen kapiteel", correct: false },
        { text: "Het kapiteel lijkt op een dennenappel van goud", correct: false }
      ],
      explanation: "Ionische zuilen hebben een voet en een kapiteel met twee grote krullen (voluten)."
    },
    {
      id: "s12-korintisch",
      section: "zuilen",
      type: "mc",
      title: "Korintische zuil",
      prompt: "Hoe herken je een Korintische zuil?",
      image: "images/korintisch.jpg",
      imageAlt: "Een Korintisch kapiteel versierd met bladeren",
      imageContain: true,
      options: [
        { text: "Het kapiteel is rijk versierd met acanthusbladeren", correct: true },
        { text: "Het kapiteel is helemaal glad en zonder versiering", correct: false },
        { text: "De zuil heeft geen schacht", correct: false }
      ],
      explanation: "Korintisch is de meest versierde Griekse orde. Bovenaan zie je krullende acanthusbladeren."
    },
    {
      id: "s12-halle-stad",
      section: "zuilen",
      type: "mc",
      title: "Halle aux Draps",
      prompt: "In welke stad staat de Halle aux Draps (de Lakenhalle)?",
      image: "images/halle-draps.jpg",
      imageAlt: "De Halle aux Draps op de Grote Markt van Doornik",
      options: [
        { text: "Doornik", correct: true },
        { text: "Gent", correct: false },
        { text: "Brussel", correct: false },
        { text: "Athene", correct: false }
      ],
      explanation: "De Halle aux Draps staat op de Grote Markt van Doornik (Tournai)."
    },
    {
      id: "s12-halle-stijl",
      section: "zuilen",
      type: "multi",
      title: "Halle aux Draps",
      prompt: "Welke zuilenordes zie je aan de voorgevel van de Halle aux Draps?",
      image: "images/halle-draps.jpg",
      imageAlt: "Voorgevel van de Halle aux Draps met twee rijen zuilen",
      options: [
        { text: "Dorisch, op het gelijkvloers", correct: true },
        { text: "Ionisch, op de verdieping", correct: true },
        { text: "alleen Korintisch", correct: false },
        { text: "geen enkele klassieke zuil", correct: false }
      ],
      explanation: "De renaissancegevel heeft twee orden boven elkaar: Dorisch beneden en Ionisch boven. Dat was een typische volgorde."
    },
    {
      id: "s12-msk",
      section: "zuilen",
      type: "mc",
      title: "MSK Gent",
      prompt: "Welke zuilenorde heeft de hoofdingang van het Museum voor Schone Kunsten (MSK) in Gent?",
      image: "images/msk-gent.jpg",
      imageAlt: "De ingang van het MSK in Gent met vier klassieke zuilen",
      options: [
        { text: "Ionisch", correct: true },
        { text: "Dorisch", correct: false },
        { text: "Korintisch", correct: false }
      ],
      explanation: "Aan de monumentale ingang staan vier gecanneleerde Ionische zuilen (met krullen bovenaan). Binnen is er ook een Dorische galerij, maar de voorgevel is Ionisch."
    },
    {
      id: "s12-jacob",
      section: "zuilen",
      type: "mc",
      title: "Sint-Jacob-op-de-Koudenberg",
      prompt: "Welke zuilenorde zie je vooral aan de kerk Sint-Jacob-op-de-Koudenberg in Brussel?",
      image: "images/sint-jacob.jpg",
      imageAlt: "De classicistische voorgevel van Sint-Jacob-op-de-Koudenberg",
      options: [
        { text: "Korintisch", correct: true },
        { text: "Dorisch", correct: false },
        { text: "Ionisch", correct: false }
      ],
      explanation: "De voorgevel lijkt op een Grieks-Romeinse tempel, met gecanneleerde zuilen en Korintische kapitelen (acanthusbladeren)."
    },

    {
      id: "s13-match",
      section: "rome",
      type: "match",
      title: "Oud Rome: koppelen",
      prompt: "Koppel elk Romeins woord aan de juiste betekenis.",
      pairs: [
        { left: "heirbaan", right: "snelweg" },
        { left: "aquaduct", right: "waterleiding" },
        { left: "hypocaustum", right: "vloerverwarming" },
        { left: "insulae", right: "appartement" },
        { left: "betaalmiddel", right: "muntstukken" },
        { left: "mijlpaal", right: "wegwijzer" }
      ],
      extras: {
        images: [
          { src: "images/aquaduct.jpg", alt: "Een Romeins aquaduct" },
          { src: "images/hypocaustum.jpg", alt: "Resten van een hypocaustum, Romeinse vloerverwarming" },
          { src: "images/mijlpaal.jpg", alt: "Een Romeinse mijlpaal" },
          { src: "images/munten.jpg", alt: "Romeinse muntstukken" }
        ]
      },
      explanation: "Romeinen bouwden heirbanen (als snelwegen), aquaducten (waterleidingen) en hypocaustum (vloerverwarming). In steden woonden mensen in insulae (appartementen). Ze betaalden met munten en vonden de weg via mijlpalen."
    },

    {
      id: "s14-as",
      section: "pompei",
      type: "keywords",
      title: "Pompeï in de as",
      prompt: "Kies de drie juiste kernwoorden bij deze foto.",
      image: "images/pompei-as.jpg",
      imageAlt: "Gipsafgietsels van slachtoffers in Pompeï",
      correct: ["Vesuvius", "79 na Christus", "gipsafgietsels van lichamen"],
      wrong: ["lavastroom door de straten", "de stad zonk in zee"],
      explanation: "In 79 na Christus barstte de Vesuvius uit. Pompeï werd begraven onder as en puimsteen, niet onder een lavastroom door de straten, en de stad zonk niet in zee. In de holtes waar lichamen lagen, maakte men later gipsafgietsels."
    },
    {
      id: "s14-garum",
      section: "pompei",
      type: "keywords",
      title: "Garum",
      prompt: "Kies de drie juiste kernwoorden bij deze foto.",
      image: "images/garum.jpg",
      imageAlt: "Romeins mozaïek van een kruik voor garum",
      correct: ["vissaus", "gezouten vis die lang moest rijpen", "bewaard in amforen"],
      wrong: ["tomatensaus", "chocolade"],
      explanation: "Garum was een sterke Romeinse vissaus: gezouten vis die lang moest rijpen, bewaard in amforen. Tomaten en chocolade kenden de Romeinen niet."
    },
    {
      id: "s14-tafel",
      section: "pompei",
      type: "keywords",
      title: "Tafelmanieren",
      prompt: "Kies de drie juiste kernwoorden bij deze foto.",
      image: "images/tafelmanieren.jpg",
      imageAlt: "Muurschildering van een Romeins feestmaal",
      correct: ["liggend eten op een aanligbed", "eten met de vingers", "slaven bedienden"],
      wrong: ["frietjes", "koffie na het eten"],
      explanation: "Bij een feestmaal lagen de gasten op een aanligbed (triclinium), aten ze met de vingers en werden ze bediend door slaven. Frietjes en koffie horen niet bij het oude Rome."
    },
    {
      id: "s14-amfi",
      section: "pompei",
      type: "keywords",
      title: "Amfitheater",
      prompt: "Kies de drie juiste kernwoorden bij deze foto.",
      image: "images/amfitheater.jpg",
      imageAlt: "Het amfitheater van Pompeï in het avondlicht",
      correct: ["gladiatoren", "ovale arena", "duizenden toeschouwers"],
      wrong: ["voetbalwedstrijd", "bioscoop"],
      explanation: "In het ovale amfitheater vochten gladiatoren voor duizenden toeschouwers. Het was geen voetbalstadion of bioscoop."
    },
    {
      id: "s14-forum",
      section: "pompei",
      type: "keywords",
      title: "Forum",
      prompt: "Kies de drie juiste kernwoorden bij deze foto.",
      image: "images/forum.jpg",
      imageAlt: "Het forum van Pompeï met de Vesuvius op de achtergrond",
      correct: ["marktplein", "tempels", "rechtspraak en politiek"],
      wrong: ["kerk", "zwembad"],
      explanation: "Het forum was het hart van de stad: een marktplein met tempels, waar ook rechtspraak en politiek plaatsvonden."
    },
    {
      id: "s14-jupiter",
      section: "pompei",
      type: "keywords",
      title: "Jupiter",
      prompt: "Kies de drie juiste kernwoorden bij deze foto.",
      image: "images/jupiter.jpg",
      imageAlt: "De tempel van Jupiter aan het forum van Pompeï",
      correct: ["oppergod van de Romeinen", "bliksem", "tempel aan het forum"],
      wrong: ["god van de zee met drietand", "godin van de liefde"],
      explanation: "Jupiter was de oppergod van de Romeinen, god van de hemel en de bliksem. In Pompeï stond zijn tempel aan het forum. De god van de zee met drietand is Neptunus; de godin van de liefde is Venus."
    }
  ]
};
