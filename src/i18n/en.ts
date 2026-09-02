import type { Dict } from './tr'

/** English texts. Translated from tr.ts. */

export const en: Dict = {
  meta: {
    langName: 'English',
    langShort: 'EN',
    htmlLang: 'en',
  },

  brand: {
    name: 'Club Afrodit',
    tagline: 'Holiday Village — Altınoluk, Mount Ida',
    claim: 'Contemporary living in natural surroundings.',
  },

  nav: {
    home: 'Home',
    rooms: 'Rooms',
    amenities: 'Facilities',
    tennis: 'Tennis',
    nursing: 'Assisted Living',
    news: 'News',
    contact: 'Contact',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to content',
    languageLabel: 'Language',
  },

  actions: {
    reserve: 'Book now',
    reserveLong: 'Make a reservation',
    call: 'Call us',
    whatsapp: 'Message us on WhatsApp',
    email: 'Send an email',
    more: 'Read more',
    allRooms: 'All rooms',
    allAmenities: 'All facilities',
    allNews: 'All news',
    viewMap: 'View on the map',
    watchVideo: 'Watch our YouTube channel',
    backHome: 'Back to home',
  },

  home: {
    heroTitle: 'A beachfront holiday village at the foot of Mount Ida',
    heroLead:
      'Wide gardens set among olive and fruit trees, walking paths and low-rise architecture — Club Afrodit is open all year round.',
    introTitle: 'A holiday surrounded by nature on Mount Ida',
    introBody:
      'At the foot of the Kazdağları (Mount Ida) range, with 21% oxygen and 50% humidity, our village offers conditions that are ideal for human wellbeing. Right on the shore in the heart of nature, with wide gardens set among olive and fruit trees, walking paths and low-rise architecture, it welcomes guests all year round. Because it was built with a firm commitment to using nature wisely — the principle of “use it while protecting it” — it stands as an exemplary holiday village.',
    roomsTitle: 'Rooms and apartments',
    roomsLead:
      'Comfortable rooms and spacious apartments in two-storey buildings, with windows facing the garden and the sea.',
    amenitiesTitle: 'Life at Club Afrodit',
    amenitiesLead:
      'The beach, the pools, the tennis courts, the open buffet and poolside entertainment — all within walking distance.',
    tennisTitle: 'Aftek Tennis Club',
    tennisLead: 'Four clay courts, the only federated club in the region.',
    nursingTitle: 'Healthy Living and Care Home',
    nursingLead:
      'Professional care for our elders all year round, in the clean air of Mount Ida and with the comfort of a holiday.',
    reviewsTitle: 'What our guests say',
    newsTitle: 'News',
    contactTitle: 'Get in touch',
    contactLead: 'Call us for availability and accommodation options.',
  },

  rooms: {
    pageTitle: 'Rooms and apartments',
    pageLead:
      'Every building on the property has two storeys and every room is air conditioned. Photographs and features for each room type are below.',
    galleryTitle: 'Room photographs',
    featuresTitle: 'Room features',
    capacity: 'Capacity',
    size: 'Size',
    count: 'Number',
    people: 'guests',
    unit: 'rooms',
    unitApart: 'apartments',
    note: 'Room counts and floor areas are still to be confirmed by the property.',

    /** For room types where a plain “N guests” is not precise enough. */
    capacityLabels: {
      grandSuit: '4 adults + 2 children',
    },

    standart: {
      title: 'Standard Room',
      summary: '2 guests · 25 m² · with or without balcony',
      body:
        'Each of the 25 standard rooms is furnished to feel warm and welcoming. Rooms are offered with or without a balcony and sleep two guests. Carefully prepared beds make for restful sleep and take away the tiredness of the day and the journey.',
      body2:
        'The room makes a good base for a well-rested start to the day: from here you can set out to explore the natural beauty of the Balıkesir region, or simply join the activities on the property itself.',
    },
    suit: {
      title: 'Suite Room',
      summary: '4 guests · 65 m² · family room, 1+1 and 2+1',
      body:
        'Our family rooms, designed as 1+1 and 2+1 layouts, each have a large balcony. Set in two-storey buildings with views of nature and the sea, these airy rooms have an adult bedroom, a children’s bedroom, a bathroom and a generous balcony.',
    },
    grandSuit: {
      title: 'Grand Suite',
      summary: '4 adults + 2 children · 90 m² · 2 bedrooms + living room + balcony',
      body:
        'The 16 Grand Suites measure 90 m² including two bedrooms, a living room and a balcony. The living room has a seating area and extra beds, so 4 adults and 2 children stay comfortably.',
      body2:
        'The large terrace opens onto the property’s shaded garden pergolas — the suite offers not just a place to sleep but somewhere to spend the day. We recommend the ground-floor suites for families with small children, as they lead straight out into the garden.',
    },
    apart: {
      title: 'Apartment',
      summary: '6–8 guests · 90–140 m² · private entrance',
      body:
        'The 25 apartments, each with a private entrance and a large private balcony, are located in two-storey buildings. Every apartment has a fully equipped kitchen, washing machine, dishwasher, refrigerator and air conditioning in all rooms; the windows look out over green walking gardens and the sea. Step outside and the pool, the beach, the tennis courts, the restaurant and Mono Afrodit are all within walking distance.',
    },
    nursing: {
      title: 'Care Home Rooms',
      summary: '1–3 guests · 35 m² · 20 rooms',
      body:
        'The care home has 20 standard rooms of 35 m². Rooms can be used as single, double or triple occupancy as needed. Every room comes with a bathroom and toilet, air conditioning, a television, a mini fridge, a wardrobe and shoe cabinet, and either a standard or a medical bed according to the resident’s needs.',
    },
  },

  roomFeatures: {
    internet: 'Internet',
    tv: 'Television',
    ac: 'Air conditioning',
    fridge: 'Mini fridge',
    phone: 'Telephone',
    balcony: 'Private balcony',
    minibar: 'Mini bar',
    hairdryer: 'Hairdryer',
    view: 'Sea or nature view',
    family: 'Suitable for families',
    livingRoom: 'Separate living room with seating area',
    safe: 'In-room safe',
    roomService: 'Room service',
    kitchen: 'Fully equipped kitchen',
    privateEntrance: 'Private entrance',
    yearRound: 'Suitable for year-round stays',
    laundry: 'Washing machine and dishwasher',
    bathroom: 'Bathroom and toilet',
    wardrobe: 'Wardrobe and shoe cabinet',
    careBed: 'Standard or medical bed',
  },

  amenities: {
    pageTitle: 'Facilities',
    pageLead:
      'From the beach to the pools, from the kitchen to poolside entertainment — everything the property offers, all within one garden and within walking distance.',
    conceptTodo:
      'The board basis and the check-in and check-out times are still to be confirmed by the property.',

    tennis: { title: 'Tennis Club', body: 'Four clay courts — the only federated club in the region.' },
    parking: { title: 'Free Parking', body: 'Safe, free parking for our guests.' },
    slide: { title: 'Water Slide', body: 'Laughter and cool water await our youngest guests.' },
    beach: { title: 'Blue Flag Beach', body: 'An award-winning beach where you can enjoy crystal-clear water.' },
    pool: { title: 'Semi-Olympic Pool', body: 'A comfortable swimming experience.' },
    buffet: { title: 'Open Buffet', body: 'Fresh breakfasts in the morning, Aegean flavours in the evening.' },
  },

  amenityGroups: {
    beach: {
      title: 'Beach',
      body:
        'A private Blue Flag beach with sunbeds, umbrellas and a beach café. The sea is a one- or two-minute walk away.',
      blueFlag: 'Private Blue Flag beach',
      sunbeds: 'Sunbeds and umbrellas',
      beachCafe: 'Beach café',
      sandBags: 'Easy access to the water over sandbags',
    },
    pools: {
      title: 'Pools',
      body: 'A semi-Olympic outdoor pool, an indoor pool, a children’s pool, a water slide and a women-only pool.',
      semiOlympic: 'Semi-Olympic outdoor pool',
      indoor: 'Indoor pool',
      kids: 'Children’s pool',
      slide: 'Water slide',
      womenOnly: 'Women-only pool',
    },
    wellness: {
      title: 'Health Club',
      body: 'The fitness room is free of charge; massage, sauna, Turkish bath and jacuzzi are charged separately.',
      fitness: 'Fitness room (free)',
      massage: 'Massage (paid)',
      sauna: 'Sauna (paid)',
      hamam: 'Turkish bath (paid)',
      jacuzzi: 'Jacuzzi (paid)',
    },
    kitchen: {
      title: 'Kitchen',
      body:
        'Open buffet meals are prepared largely from organic vegetables and fruit grown in the property’s own garden. With its own olive and olive oil production, a stone oven and the endemic herbs of Mount Ida, the kitchen serves Aegean and Mediterranean cuisine.',
      openBuffet: 'Open buffet breakfast and dinner',
      organicGarden: 'Organic vegetables and fruit from our own garden',
      oliveOil: 'Our own olive and olive oil production',
      stoneOven: 'Stone oven',
      herbs: 'Endemic herbs of Mount Ida',
      terraceDinner: 'Dinner with a view on the terrace, with live music',
    },
    mono: {
      title: 'Mono Afrodit',
      body:
        'A house music party series that began on Mount Ida in 2022. Poolside disco, DJ sets and its own YouTube channel.',
      houseMusic: 'House music party series',
      poolsideDisco: 'Poolside disco',
      youtube: 'Its own YouTube channel',
    },
    other: {
      title: 'Other',
      body: 'Services that make everyday life on the property easier.',
      parking: 'Free parking',
      pets: 'Pets welcome (conditions apply)',
      wifi: 'Wireless internet at reception',
      transfer: 'Airport transfer (on request)',
    },
  },

  tennis: {
    pageTitle: 'Afrodit Tennis Club',
    pageLead:
      'The only federated tennis club in the Gulf of Edremit. Four clay courts at the foot of Mount Ida, within walking distance of the sea.',

    courtsTitle: 'The courts',
    courtsBody:
      'Four clay courts, within walking distance of the accommodation. Guests can step onto the courts whenever they like during the day.',
    courtsBody2:
      'Clay is gentler on the joints than a hard court. The ball bounces more slowly, so rallies last longer — which makes for good tennis whether you are just starting out or have played for years.',

    clubTitle: 'Leagues and tournaments',
    clubBody: 'The club hosts league matches and I-Kort tournaments.',
    clubBody2:
      'Aftek is a federated club, so official matches played here enter the federation records. No other club in the gulf offers this.',

    discountTitle: 'Staying here as a player',
    discountBody:
      'Players taking part in official tennis tournaments receive up to 40% off their accommodation.',
    discountBody2:
      'Because the club and the resort are on the same grounds, players lose no time travelling between court and room; you can go back and rest between matches.',

    audienceTitle: 'Who it is for',
    audience: {
      licensed: 'Licensed players arriving for a tournament',
      guest: 'Holidaymakers who simply want time on court',
      kids: 'Children taking up tennis for the first time',
    },

    unknownsTitle: 'Worth calling us about',
    unknownsLead:
      'The topics below change with the season and the programme, so they are not published here. Call us for current information.',
    unknowns: {
      lighting: 'Court lighting and evening play',
      fees: 'Court hire rates and hours',
      coaching: 'Coaching and lessons',
      equipment: 'Racket and equipment hire',
      calendar: 'League and tournament calendar',
      membership: 'Club membership and its conditions',
      discountTerms: 'Scope and conditions of the tournament discount',
    },

    contactTitle: 'Courts and tournaments',
    contactBody:
      'Call the office for court reservations, the tournament calendar and any of the topics above.',
    instagram: 'Instagram: @afroditteniskulubu',

    todoNote:
      'Lighting, rates, coaching, equipment hire, calendar, membership and discount conditions have not been confirmed by the property, so no figures are quoted on this page.',
  },

  nursing: {
    pageTitle: 'Care Home and Assisted Living',
    pageLead:
      'A separate branch of Club Afrodit: professional care in the clean air of Mount Ida, with the comfort of a holiday.',
    introBody:
      'As impairments and losses accumulate in later life, people may no longer be able to manage on their own, to carry out everyday tasks or to look after themselves. Care within the family eventually becomes difficult and exhausting for both the carer and the person being cared for, and the need for professional care arises.',
    introBody2:
      'Professional care goes well beyond basic needs such as shelter, meals and cleaning: it includes medical care and support, emotional, psychological and physical rehabilitation, social and cultural activities, healthy nutrition, regular monitoring of blood pressure, blood sugar, pulse and temperature, and the tracking of medication and planned treatment. Club Afrodit Care Home provides all of this with an experienced, specialist team and a multidisciplinary approach.',

    servicesTitle: 'Services',
    services: {
      personal: 'Personal care',
      cleaning: 'Cleaning, laundry and ironing',
      medical: 'Medical care and support',
      physio: 'Physiotherapy and rehabilitation',
      activities: 'Individual and group psychosocial, cultural, cognitive and physical activities',
      nutrition: 'Nutrition supervised by a dietitian',
      transport: 'Transport support',
    },

    whoTitle: 'Who can benefit',
    who: {
      alzheimer: 'Alzheimer’s',
      parkinson: 'Parkinson’s',
      copd: 'COPD (chronic lung disease)',
      stroke: 'Stroke and paralysis',
      postOp: 'Post-operative care',
      ms: 'MS',
      ageRelated: 'Age-related special care needs',
    },

    teamTitle: 'The team',
    team: {
      doctor: 'Doctor',
      nurse: 'Nurse',
      physio: 'Physiotherapist',
      socialWorker: 'Social worker',
      caregiver: 'Professional care staff',
      support: 'Support staff',
    },

    roomsTitle: 'Rooms',
    contactTitle: 'Information and applications',
    contactBody: 'Call the care home line for admission conditions and applications.',

    complianceTodo:
      'The health-care statements on this page (which conditions are cared for, who is on the team) must match the scope of the operating licence exactly. To be confirmed with the property before going live.',
  },

  news: {
    pageTitle: 'News',
    pageLead: 'News from the property and stories from Mount Ida.',

    afroditStory: {
      title: 'The story of Aphrodite and the beauty contest',
      summary:
        'According to legend, the world’s first beauty contest took place on Mount Ida — the range we know today as Kazdağları.',
      body1:
        'Paris was abandoned on Mount Ida as a child and left to his fate. Suckled by a she-bear, he was later found by Agelaos, a shepherd on the mountain, who took him home.',
      body2:
        'While Paris was living happily on Mount Ida, the gods were holding a feast on Olympus. Eris, goddess of discord, threw an apple inscribed “To the fairest” into the middle of the table. Hera, wife of Zeus, claimed the golden apple, saying she was the fairest of them all. Aphrodite objected, insisting that no one could be more beautiful than she; and Athena, goddess of wisdom, joined the dispute and asked Zeus to judge.',
      body3:
        'Unable to choose, Zeus declared that Paris, the shepherd on Mount Ida, would decide, and sent the three goddesses to him. Sitting under a tree, Paris was at first astonished when the three appeared and stated their case. He was unmoved by Hera’s promise to make him king of Asia and by Athena’s offer of wisdom and success. But when Aphrodite told him that, if he chose her, he would win the most beautiful woman in the world, he handed her the golden apple. And so all the gods accepted Aphrodite as the fairest goddess.',
      body4:
        'According to the legend, the world’s first beauty contest was thus held on Mount Ida.',
    },

    seasonStart: {
      title: 'The holiday season has begun at Club Afrodit',
      summary:
        'Set at the foot of Mount Ida, Club Afrodit has opened for the summer season with renovated rooms and spacious apartments.',
      body1:
        'Club Afrodit, in its unique setting surrounded by nature at the foot of Mount Ida, has opened its doors for the summer season. It offers guests not merely a place to stay, but a peaceful escape in which to restore both body and mind.',
      body2:
        'With rooms renovated from top to bottom and airy apartments, the property offers an experience as comfortable as home. These living spaces, combining modern design with the calm of nature, have been prepared with care to make every moment of your holiday enjoyable.',
      body3:
        'The semi-Olympic pool with its water slide awaits everyone looking to cool off and have fun. The oxygen-rich air of Mount Ida is ideal for starting the day refreshed. Restaurant options serving the flavours of the Aegean, and dishes prepared with produce fresh from our organic garden, turn the promise of a healthy and delicious holiday into reality.',
      body4:
        'If you are dreaming of a peaceful holiday full of fun and good food in the heart of nature, call our office about early booking.',
    },

    mono: {
      title: 'The Mono Afrodit club brings colour to the summer',
      summary:
        'The video party series that began on Mount Ida in 2022 keeps growing at its home in Altınoluk, carried by the unifying power of house music.',
      body1:
        'We have taken our holiday entertainment to the Mono Afrodit Video Channel. Sprouting on Mount Ida in 2022 as the region’s first and only video party series, this adventure has built a warm and original community at its home in Altınoluk, Club Afrodit, through the unifying power of house music.',
      body2:
        'On our channel you can discover our finest moments, energetic party recordings, DJ sets, interviews and more. Mono Afrodit is more than a YouTube channel: it is a platform for sharing music and celebration, growing through special events.',
      body3: 'Follow the channel for our newest videos and live streams.',
    },
  },

  contact: {
    pageTitle: 'Contact',
    pageLead: 'Get in touch for reservations, availability and any questions you may have.',
    addressTitle: 'Address',
    phoneTitle: 'Telephone',
    officeLabel: 'Reservations / administration',
    mobileLabel: 'Mobile / WhatsApp',
    nursingLabel: 'Care home',
    emailTitle: 'Email',
    socialTitle: 'Social media',
    mapTitle: 'Location',
    mapAlt: 'Map of Club Afrodit Holiday Village',
    distancesTitle: 'Distances',
    hoursTodo: 'Check-in and check-out times are still to be confirmed by the property.',
  },

  distances: {
    altinoluk: 'Altınoluk town centre',
    akcay: 'Akçay',
    edremit: 'Edremit',
    airport: 'Edremit / Körfez Airport',
    sahindere: 'Şahindere Canyon',
    tahtakuslar: 'Tahtakuşlar Ethnography Gallery',
  },

  reviews: {
    title: 'Guest reviews',
    lead: 'In the words of guests who have stayed with us. Reviews are shown in their original Turkish.',
  },

  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for may have moved or changed address.',
  },

  footer: {
    lead: 'A beachfront holiday village in the clean air of Mount Ida.',
    contactTitle: 'Contact',
    linksTitle: 'Pages',
    followTitle: 'Follow us',
    rights: 'All rights reserved.',
  },

  common: {
    imageAlt: 'Club Afrodit',
    loading: 'Loading…',
    error: 'The content could not be loaded.',
  },
}
