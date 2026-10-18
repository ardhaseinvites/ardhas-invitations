const picture = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const images = {
  wedding: picture("photo-1519741497674-611481863552"),
  couple: picture("photo-1529636798458-92182e662485"),
  flowers: picture("photo-1490750967868-88aa4486c946"),
  birthday: picture("photo-1464349095431-e9a21285b5f3"),
  home: picture("photo-1600210492486-724fe5c67fb0"),
  baby: picture("photo-1519689680058-324335c77eba"),
  nursery: picture("photo-1515488042361-ee00e0ddd4e4"),
  party: picture("photo-1511795409834-ef04bbd61622"),
  sangeet: picture("photo-1492684223066-81342ee5ff30"),
  pooja: picture("photo-1609599006353-e629aaabfeae"),
  graduation: picture("photo-1523240795612-9a054b0db644"),
  dinner: picture("photo-1544025162-d76694265947"),
  celestial: picture("photo-1506703719100-a0f3a48c0f86"),
  heritage: picture("photo-1582510003544-4d00b7f74220"),
  boho: picture("photo-1513519245088-0e12902e5a38"),
};

const events = {
  Wedding: {
    type: "Wedding",
    slug: "wedding",
    names: "Aarav & Diya",
    eyebrow: "TOGETHER WITH OUR FAMILIES",
    line: "Joyfully invite you to celebrate our wedding",
    storyTitle: "A little story of us",
    story:
      "A chance meeting, a thousand conversations, and a friendship that quietly became forever. Now, we cannot wait to begin our next chapter with you by our side.",
    imageKey: "wedding",
    time: "10:00",
    venue: "Kollam, Kerala",
    address: "The Leela Ashtamudi, Thevally, Kollam, Kerala",
    dress: "Festive elegance · Soft, joyful colors",
    designs: [
      ["Memories Deckle", "deckle", "#8d7045"],
      ["Chocolat & Ivoire", "chocolate", "#2d1e18"],
      ["Atelier Triptych", "triptych", "#738370"],
      ["Château de Rose", "chateau", "#cba286"],
      ["Pichwai Vrindavan", "pichwai", "#0c3b43"],
    ],
    memories: ["The first hello", "A thousand memories", "Our forever begins"],
    schedule: [
      ["09:30", "A warm welcome"],
      ["10:00", "The wedding ceremony"],
      ["12:30", "Lunch & laughter"],
    ],
  },
  Engagement: {
    type: "Engagement",
    slug: "engagement",
    names: "Arjun & Meera",
    eyebrow: "A PROMISE TO KEEP",
    line: "Join us as we say yes to forever",
    storyTitle: "The easiest yes",
    story:
      "A promise, a new beginning, and a lifetime of possibilities. Join our families as we celebrate the beautiful journey ahead.",
    imageKey: "couple",
    time: "17:00",
    venue: "Kochi, Kerala",
    address: "Bolgatty Palace, Mulavukad, Kochi, Kerala",
    dress: "Pastel festive wear",
    designs: [
      ["The Golden Yes", "minimal", "#99763f"],
      ["Blush Promise", "estate", "#a55770"],
      ["Moonlit Rings", "royal", "#c8a96a"],
      ["Velvet Courtyard", "heritage", "#8a2b3d"],
      ["Celestial Constellation", "celestial", "#2e4368"],
    ],
    memories: [
      "We crossed paths",
      "A beautiful question",
      "Two families, one promise",
    ],
    schedule: [
      ["17:00", "Welcome drinks"],
      ["18:00", "The ring ceremony"],
      ["19:30", "Dinner together"],
    ],
  },
  Birthday: {
    type: "Birthday",
    slug: "birthday",
    names: "Ananya",
    eyebrow: "ANOTHER YEAR OF WONDER",
    line: "Cake, laughter, and a celebration with my favorite people",
    storyTitle: "A little older. A lot more magic.",
    story:
      "Another trip around the sun, another reason to gather our favorite people. Come for the cake, stay for the laughter, and help us make a wonderful new memory.",
    imageKey: "birthday",
    time: "18:00",
    venue: "Thiruvananthapuram, Kerala",
    address: "O by Tamara, Anayara, Thiruvananthapuram, Kerala",
    dress: "Your brightest party outfit",
    designs: [
      ["Confetti Club", "modern", "#825a9b"],
      ["Birthday Wishes", "romantic", "#b05267"],
      ["After Dark", "royal", "#dec187"],
      ["Terracotta Fiesta", "boho", "#b25d3b"],
      ["Midnight Starlight", "celestial", "#4a3c7c"],
    ],
    memories: ["The little moments", "The big adventures", "The next chapter"],
    schedule: [
      ["18:00", "Let the party begin"],
      ["19:00", "Make a wish"],
      ["20:00", "Dance a little"],
    ],
  },
  Housewarming: {
    type: "Housewarming",
    slug: "housewarming",
    names: "The Nair Family",
    eyebrow: "A NEW ADDRESS. THE SAME WARM HEARTS.",
    line: "Our door is open. Come bless our new home.",
    storyTitle: "Home begins with the people we love",
    story:
      "A new address and a home ready to be filled with love. Join us for a heartfelt welcome, good food, and the first of many happy memories here.",
    imageKey: "home",
    time: "09:00",
    venue: "Kollam, Kerala",
    address: "Sreeragam, Asramam, Kollam, Kerala",
    dress: "Comfortable traditional attire",
    designs: [
      ["The Open Door", "minimal", "#8b7254"],
      ["Griha Pravesh", "classic", "#92543a"],
      ["A Place to Belong", "floral", "#60785b"],
      ["Auspicious Abode", "heritage", "#9c4927"],
      ["Earthy Haven", "boho", "#a8714e"],
    ],
    memories: ["A little dream", "Made with love", "Ready for you"],
    schedule: [
      ["09:00", "House blessing"],
      ["10:30", "Come on in"],
      ["12:00", "Our first feast"],
    ],
  },
  "Baby Shower": {
    type: "Baby Shower",
    slug: "baby-shower",
    names: "Meera & Our Little Miracle",
    eyebrow: "A LITTLE WONDER IS ON THE WAY",
    line: "Shower our growing family with love",
    storyTitle: "Our sweetest chapter yet",
    story:
      "Our little world is about to get a little bigger. Celebrate the sweetest new chapter with a gathering full of love, laughter, and wishes for our little one.",
    imageKey: "baby",
    time: "15:00",
    venue: "Kochi, Kerala",
    address: "Grand Hyatt Kochi Bolgatty, Mulavukad, Kochi, Kerala",
    dress: "Soft pastels and a little sunshine",
    designs: [
      ["Over the Moon", "minimal", "#687da0"],
      ["Little Cloud", "romantic", "#a2717f"],
      ["A Tiny Bloom", "floral", "#7b8760"],
      ["Golden Cradle", "heritage", "#a38243"],
      ["Boho Pampas Nest", "boho", "#c9866b"],
    ],
    memories: ["The sweetest news", "Dreaming of you", "Almost in our arms"],
    schedule: [
      ["15:00", "Tea & tiny treats"],
      ["16:00", "Wishes for baby"],
      ["17:00", "A sweet celebration"],
    ],
  },
  Anniversary: {
    type: "Anniversary",
    slug: "anniversary",
    names: "Rajesh & Lakshmi",
    eyebrow: "A LIFETIME OF LITTLE MOMENTS",
    line: "Celebrate our years of love, laughter, and togetherness",
    storyTitle: "Still choosing each other",
    story:
      "Through every season, every little adventure, and all the everyday magic, love has been our favorite story. Join us as we celebrate another beautiful year together.",
    imageKey: "couple",
    time: "18:30",
    venue: "Kollam, Kerala",
    address: "The Raviz Ashtamudi, Thevally, Kollam, Kerala",
    dress: "Elegant evening wear",
    designs: [
      ["Chocolat & Ivoire", "chocolate", "#2d1e18"],
      ["A Golden Journey", "royal", "#d0b37c"],
      ["Still in Bloom", "floral", "#8b6373"],
      ["Heritage Garland", "heritage", "#943c4a"],
      ["Midnight Starlight", "celestial", "#3b5373"],
    ],
    memories: [
      "The day we said yes",
      "A home full of memories",
      "Forever, still",
    ],
    schedule: [
      ["18:30", "Welcome & memories"],
      ["19:00", "A toast to love"],
      ["20:00", "Dinner & dancing"],
    ],
  },
  "Naming Ceremony": {
    type: "Naming Ceremony",
    slug: "naming-ceremony",
    names: "Baby Aadhya",
    eyebrow: "A LITTLE NAME. A WORLD OF LOVE.",
    line: "Join us to welcome and bless our newest family member",
    storyTitle: "The beginning of a beautiful story",
    story:
      "A tiny arrival, a beautiful name, and a family overflowing with joy. We would love you to join us as we welcome our little one with blessings and love.",
    imageKey: "nursery",
    time: "10:30",
    venue: "Thrissur, Kerala",
    address: "Our family home, Punkunnam, Thrissur, Kerala",
    dress: "Light traditional attire",
    designs: [
      ["Little Lotus", "floral", "#8e6272"],
      ["A Name in the Stars", "minimal", "#7887a0"],
      ["Blessed Beginning", "classic", "#a37b44"],
      ["Vedic Cradle", "heritage", "#a85d3b"],
      ["Celestial Moonbeam", "celestial", "#4d658d"],
    ],
    memories: [
      "Hello, little one",
      "A name to cherish",
      "Surrounded by blessings",
    ],
    schedule: [
      ["10:30", "Family welcome"],
      ["11:00", "The naming ceremony"],
      ["12:30", "Lunch together"],
    ],
  },
  "Save the Date": {
    type: "Save the Date",
    slug: "save-the-date",
    names: "Aarav & Diya",
    eyebrow: "SOMETHING BEAUTIFUL IS COMING",
    line: "Mark your calendar. Our next chapter needs you in it.",
    storyTitle: "Keep a little space for us",
    story:
      "Something wonderful is on the horizon. Save a little space in your calendar for a celebration filled with the people and moments we love most.",
    imageKey: "couple",
    time: "10:00",
    venue: "Kollam, Kerala",
    address: "Kollam, Kerala · Venue to be announced",
    dress: "Details to follow",
    designs: [
      ["Mark the Moment", "modern", "#436568"],
      ["Atelier Triptych", "triptych", "#738370"],
      ["Postcard from Forever", "polaroid", "#a66372"],
      ["Regal Announcement", "heritage", "#8d3444"],
      ["Constellation Calendar", "celestial", "#324a6e"],
    ],
    memories: ["We found our person", "We picked a day", "Now we need you"],
    schedule: [
      ["10:00", "Save this date"],
      ["12:00", "Full schedule to follow"],
    ],
  },
  Reception: {
    type: "Reception",
    slug: "reception",
    names: "Aarav & Diya",
    eyebrow: "DINNER. DANCING. HAPPILY EVER AFTER.",
    line: "Join us for an unforgettable evening of celebration",
    storyTitle: "Now, let us celebrate",
    story:
      "The promises have been made. Now let us celebrate! Join us for an evening of music, laughter, and memories with the people who make our world brighter.",
    imageKey: "party",
    time: "18:30",
    venue: "Kochi, Kerala",
    address: "Le Méridien Kochi, Maradu, Kochi, Kerala",
    dress: "Evening elegance · Jewel tones",
    designs: [
      ["L'Édition Noire", "edition", "#1c1d1f"],
      ["Champagne Hours", "minimal", "#987949"],
      ["Under the Lights", "purple", "#7869a0"],
      ["Grand Ballroom", "heritage", "#8c2e42"],
      ["Nocturne Celestial", "nocturne", "#293c5c"],
    ],
    memories: ["A day of promises", "An evening of joy", "Memories after dark"],
    schedule: [
      ["18:30", "The welcome"],
      ["19:30", "A toast to forever"],
      ["20:00", "Dinner & dance"],
    ],
  },
  Mehendi: {
    type: "Mehendi",
    slug: "mehendi",
    names: "Diya’s Mehendi",
    eyebrow: "LOVE WRITTEN IN HENNA",
    line: "An afternoon of color, music, and a little bridal magic",
    storyTitle: "Patterns, promises, and our people",
    story:
      "A little color, a little music, and stories woven into every beautiful pattern. Join us for an afternoon of mehendi, laughter, and celebration.",
    imageKey: "flowers",
    time: "15:00",
    venue: "Kollam, Kerala",
    address: "Our family garden, Thevally, Kollam, Kerala",
    dress: "Shades of green · Colorful festive attire",
    designs: [
      ["Henna & Harmony", "classic", "#47683a"],
      ["The Mehfil Garden", "floral", "#6f7940"],
      ["Emerald Afternoons", "royal", "#c6b078"],
      ["Zari & Marigold", "heritage", "#9c572a"],
      ["Boho Sunset Palm", "boho", "#b0623a"],
    ],
    memories: [
      "A little bridal joy",
      "Stories in every pattern",
      "Music in the air",
    ],
    schedule: [
      ["15:00", "Henna & hellos"],
      ["16:00", "Music & memories"],
      ["17:30", "Chai & little treats"],
    ],
  },
  Haldi: {
    type: "Haldi",
    slug: "haldi",
    names: "Aarav & Diya",
    eyebrow: "A LITTLE SUNSHINE BEFORE FOREVER",
    line: "Bring your blessings and your brightest smile to our haldi",
    storyTitle: "A golden beginning",
    story:
      "Sunshine, flowers, and a golden beginning. Gather with us for a joyful haldi celebration filled with blessings and happy memories.",
    imageKey: "flowers",
    time: "09:30",
    venue: "Kollam, Kerala",
    address: "Our family courtyard, Asramam, Kollam, Kerala",
    dress: "Yellow, ivory, and sunshine",
    designs: [
      ["Marigold Morning", "floral", "#b17a15"],
      ["Golden Blessings", "classic", "#a65e1b"],
      ["Hello Sunshine", "modern", "#9c7623"],
      ["Peeli Champa", "heritage", "#98581d"],
      ["Warm Terracotta Sun", "boho", "#bf6f2b"],
    ],
    memories: [
      "Before the big day",
      "Golden blessings",
      "A splash of happiness",
    ],
    schedule: [
      ["09:30", "A sunny welcome"],
      ["10:00", "The haldi ceremony"],
      ["11:30", "Brunch together"],
    ],
  },
  Other: {
    type: "Other",
    slug: "celebration",
    names: "A Gathering of Good Things",
    eyebrow: "YOU MAKE THE OCCASION SPECIAL",
    line: "Join us for a celebration worth remembering",
    storyTitle: "The best moments are shared",
    story:
      "The best moments are the ones we share. Join our favorite people for a celebration filled with warmth, laughter, and a little everyday magic.",
    imageKey: "party",
    time: "17:00",
    venue: "Kochi, Kerala",
    address: "Fort Kochi, Kochi, Kerala",
    dress: "Come as your wonderful self",
    designs: [
      ["The Gathering", "modern", "#416e75"],
      ["Something Special", "minimal", "#917448"],
      ["Good Company", "romantic", "#a06574"],
      ["Palace Rendezvous", "heritage", "#8a3a48"],
      ["Starlit Evening", "celestial", "#3a4a6e"],
    ],
    memories: ["A good reason", "A thoughtful gathering", "A memory to keep"],
    schedule: [
      ["17:00", "A warm welcome"],
      ["18:00", "The celebration"],
      ["19:00", "A shared table"],
    ],
  },
  "Sangeet & Cocktail": {
    type: "Sangeet & Cocktail",
    slug: "sangeet",
    names: "Rohan & Rhea",
    eyebrow: "MUSIC, DANCING & HIGH SPIRITS",
    line: "Step onto the dance floor and celebrate the beats of our love",
    storyTitle: "Turn the music up",
    story:
      "An electric night of rhythm, dhol beats, glamorous toasts, and non-stop celebration! Put on your dancing shoes and join us for the ultimate musical evening.",
    imageKey: "sangeet",
    time: "19:00",
    venue: "Kochi, Kerala",
    address: "Grand Hyatt Ballroom, Mulavukad, Kochi, Kerala",
    dress: "Glamorous festive wear & cocktail evening attire",
    designs: [
      ["Rhythm of the Night", "modern", "#793da8"],
      ["Velvet & Starlight", "royal", "#c4a35a"],
      ["Disco Glamour", "glassmorphic", "#b03a72"],
      ["Mehfil e Sangeet", "heritage", "#8c2e42"],
      ["Electric Midnight", "celestial", "#35408a"],
    ],
    memories: [
      "The music begins",
      "A dance to remember",
      "Toasts under the stars",
    ],
    schedule: [
      ["19:00", "Red carpet & cocktails"],
      ["20:00", "Family dance performances"],
      ["21:30", "DJ & midnight feast"],
    ],
  },
  "Pooja & House Blessing": {
    type: "Pooja & House Blessing",
    slug: "pooja",
    names: "The Sharma Family",
    eyebrow: "AUSPICIOUS BLESSINGS & SACRED CHANTS",
    line: "Join us in invoking peace, prosperity, and divine grace",
    storyTitle: "In sacred company",
    story:
      "With the lighting of sacred lamps, fragrance of fresh marigolds, and sacred mantras, we seek the almighty's blessings for our family, home, and endeavors.",
    imageKey: "pooja",
    time: "08:30",
    venue: "Thrissur, Kerala",
    address: "Sree Krishna Kripa, Punkunnam, Thrissur, Kerala",
    dress: "Traditional white, gold, or silk attire",
    designs: [
      ["Sacred Diya", "classic", "#a35824"],
      ["Vedic Lotus", "floral", "#b8702b"],
      ["Auspicious Mangal", "heritage", "#9c3725"],
      ["Pure Serenity", "minimal", "#8b7245"],
      ["Temple Bells", "boho", "#a86438"],
    ],
    memories: [
      "Lighting the lamp",
      "Sacred blessings",
      "Prasadam together",
    ],
    schedule: [
      ["08:30", "Ganapati homam & pooja"],
      ["10:30", "Maha Aarti & blessings"],
      ["12:00", "Traditional Sadya feast"],
    ],
  },
  Graduation: {
    type: "Graduation",
    slug: "graduation",
    names: "Dr. Siddharth Menon",
    eyebrow: "HONORING AN INCREDIBLE MILESTONE",
    line: "Years of dedication, late nights, and a future full of promise",
    storyTitle: "The cap is thrown. The journey begins.",
    story:
      "After seasons of relentless focus, exams, and perseverance, the milestone is reached! Join us as we celebrate graduation and toast to brilliant new horizons.",
    imageKey: "graduation",
    time: "16:00",
    venue: "Bengaluru, Karnataka",
    address: "The Oberoi, MG Road, Bengaluru, Karnataka",
    dress: "Smart formal & celebratory chic",
    designs: [
      ["Golden Laurel", "royal", "#caa258"],
      ["Summit & Future", "minimal", "#3b5c7a"],
      ["Modern Scholar", "modern", "#2a6254"],
      ["Heritage Honors", "heritage", "#7d2b38"],
      ["Cosmic Horizon", "celestial", "#273f6a"],
    ],
    memories: [
      "The first chapter",
      "Milestones conquered",
      "The journey ahead",
    ],
    schedule: [
      ["16:00", "Arrival & commencement toast"],
      ["17:00", "Honors & speeches"],
      ["18:30", "Celebration reception"],
    ],
  },
  "Dinner Party": {
    type: "Dinner Party",
    slug: "dinner",
    names: "The Summer Soirée",
    eyebrow: "AN INTIMATE EVENING OF GOOD FOOD & COMPANY",
    line: "Pull up a chair. Great food, fine wine, and wonderful conversations await.",
    storyTitle: "Gather around the table",
    story:
      "The best evenings are those spent with favorite people around an abundant table, sharing stories, clinking glasses, and laughing into the night.",
    imageKey: "dinner",
    time: "19:30",
    venue: "Fort Kochi, Kerala",
    address: "Brunton Boatyard Terrace, Fort Kochi, Kerala",
    dress: "Smart casual & warm evening elegance",
    designs: [
      ["Candlelit Terrace", "romantic", "#8f3a52"],
      ["Olive & Linen", "boho", "#5c6b44"],
      ["Midnight Feast", "celestial", "#2d3a54"],
      ["Vintage Bistro", "classic", "#85583b"],
      ["The Modern Table", "minimal", "#4d5b63"],
    ],
    memories: [
      "A warm greeting",
      "A feast shared",
      "Stories under candlelight",
    ],
    schedule: [
      ["19:30", "Aperitifs & hors d'oeuvres"],
      ["20:30", "Seated seasonal dinner"],
      ["22:00", "Dessert & digestifs"],
    ],
  },
};

export const eventTypes = Object.keys(events);

export const eventStories = Object.fromEntries(
  eventTypes.map((type) => [type, events[type].story]),
);

export const templates = eventTypes.flatMap((eventType) =>
  events[eventType].designs.map(([name, style, color], index) => ({
    id: `${events[eventType].slug}-${index + 1}`,
    eventType,
    name,
    style,
    color,
    layout:
      style === "deckle"
        ? "deckle"
        : style === "velure"
          ? "velure"
          : style === "polaroid"
            ? "polaroid"
            : style === "estate"
              ? "estate"
              : style === "purple"
                ? "purple"
                : style === "edition"
                  ? "edition"
                  : style === "pichwai"
                    ? "pichwai"
                    : style === "nocturne"
                      ? "nocturne"
                      : style === "chocolate"
                        ? "chocolate"
                        : style === "triptych"
                          ? "triptych"
                          : style === "chateau"
                            ? "chateau"
                            : ["editorial", "arch", "split", "framed", "floating"][index % 5],
    font:
      style === "edition"
        ? "Serif"
        : style === "pichwai"
          ? "Royal"
          : style === "nocturne"
            ? "Modern"
            : style === "chocolate"
              ? "Serif"
              : style === "triptych"
                ? "Modern"
                : style === "chateau"
                  ? "Serif"
                  : style === "modern" || style === "glassmorphic"
                    ? "Modern"
                    : style === "royal" || style === "heritage"
                      ? "Royal"
                      : style === "boho" || style === "velure"
                        ? "Minimal"
                        : style === "deckle" || style === "polaroid" || style === "estate"
                          ? "Handwritten"
                          : "Serif",
    background: "Plain",
    description: `${["A signature", "An intimate", "An expressive", "A regal", "A celestial"][index % 5]} ${eventType.toLowerCase()} invitation, made personal.`,
    category: eventType,
    tag:
      style === "deckle"
        ? "DECKLE"
        : style === "velure"
          ? "VELURE"
          : style === "polaroid"
            ? "POLAROID"
            : style === "estate"
              ? "ESTATE"
              : style === "purple"
                ? "LAVENDER"
                : style === "edition"
                  ? "EDITORIAL"
                  : style === "pichwai"
                    ? "HERITAGE"
                    : style === "nocturne"
                      ? "CELESTIAL"
                      : style === "chocolate"
                        ? "PARCHMENT"
                        : style === "triptych"
                          ? "TRIPTYCH"
                          : style === "chateau"
                            ? "CHÂTEAU"
                            : ["SIGNATURE", "TIMELESS", "EDITORIAL", "HERITAGE", "CELESTIAL"][index % 5],
  })),
);

export const getEventTemplates = (eventType) =>
  templates.filter((template) => template.eventType === eventType);

export function getEventDefaults(eventType = "Wedding", templateId) {
  const type = events[eventType] ? eventType : "Wedding";
  const event = events[type];
  const design =
    getEventTemplates(type).find((item) => item.id === templateId) ||
    getEventTemplates(type)[0];
  const copy = {
    heroEyebrow: event.eyebrow,
    invitationLine: event.line,
    scrollLabel: "Explore the celebration",
    footerLine: "WITH LOVE, ALWAYS",
    daysLabel: "Days",
    hoursLabel: "Hours",
    minutesLabel: "Minutes",
    secondsLabel: "Seconds",
    milestoneLabel: "years of us",
    ageLabel: "years of joy",
    calendarLabel: "Save this date",
    nameRevealLabel: "A beautiful name, a new beginning",
    storyEyebrow: "EVERY CHAPTER HAS A STORY",
    storyTitle: event.storyTitle,
    detailsEyebrow: "WE SAVED A PLACE FOR YOU",
    detailsTitle: "The lovely details",
    dayLabel: "The day",
    timeLabel: "The time",
    venueLabel: "The place",
    dressLabel: "Dress code",
    mapTitle: "A beautiful place to come together",
    mapLabel: "Open directions",
    scheduleEyebrow: "A DAY TO REMEMBER",
    scheduleTitle: "Every beautiful moment",
    galleryEyebrow: "LITTLE MOMENTS, BIG FEELINGS",
    galleryTitle: "Our memory book",
    galleryCaption:
      "Illustrative photography for your preview. Add your own favorite memories.",
    galleryGridLabel: "Masonry",
    gallerySliderLabel: "Slider",
    musicPlayLabel: "Play music",
    musicPauseLabel: "Pause music",
    pdfLabel: "Save invitation PDF",
    videoBackgroundPlayLabel: "Play background",
    videoBackgroundPauseLabel: "Pause background",
    videoTitle: "A glimpse of the celebration",
    videoPlayLabel: "Play our film",
    videoCaption: "Sample film · Replace with your own celebration video",
    rsvpEyebrow: "IT WOULDN’T BE THE SAME WITHOUT YOU",
    rsvpTitle: "Will you be there?",
    rsvpNameLabel: "Your name",
    rsvpEmailLabel: "Email address",
    rsvpAttendanceLabel: "Will you join us?",
    rsvpGuestsLabel: "Number of guests",
    rsvpNoteLabel: "A little note",
    rsvpSubmitLabel: "Send my love",
    rsvpAcceptLabel: "Joyfully accept",
    rsvpDeclineLabel: "Regretfully decline",
    rsvpSuccessTitle: "Thank you for your wishes!",
    rsvpSuccessText:
      "We cannot wait to celebrate with you. This is a preview; your response has not been sent or stored.",
    rsvpAgainLabel: "Try another response",
    rsvpDemoText: "Interactive demo only. No details are transmitted or saved.",
    wishesEyebrow: "WORDS WE’LL KEEP FOREVER",
    wishesTitle: "Wrapped in your wishes",
    wishesCaption: "Sample guest wishes · Make them your own",
    registryEyebrow: "YOUR PRESENCE IS OUR PRESENT",
    registryTitle: "A little extra love",
    registryText:
      "Being there is the most beautiful gift. For those who would like to give a little more, here are a few wishes close to our hearts.",
    registryLinkLabel: "Visit registry",
    registryDemoText:
      "This registry is a preview. Add a registry URL in the customizer to connect it.",
    contactsEyebrow: "HERE TO HELP YOU FEEL AT HOME",
    contactsTitle: [
      "Wedding",
      "Engagement",
      "Reception",
      "Sangeet & Cocktail",
    ].includes(type)
      ? "With love, from our families"
      : "Your hosts are here to help",
    contactMapLabel: "Find the celebration",
    signoffText: "We can’t wait to make memories with you.",
  };
  const galleryKeys = {
    Wedding: ["couple", "wedding", "flowers"],
    Engagement: ["couple", "flowers", "party"],
    Birthday: ["birthday", "party", "flowers"],
    Housewarming: ["home", "flowers", "party"],
    "Baby Shower": ["baby", "nursery", "flowers"],
    Anniversary: ["couple", "party", "flowers"],
    "Naming Ceremony": ["nursery", "baby", "flowers"],
    "Save the Date": ["couple", "wedding", "flowers"],
    Reception: ["party", "couple", "wedding"],
    Mehendi: ["flowers", "party", "couple"],
    Haldi: ["flowers", "wedding", "party"],
    Other: ["party", "flowers", "birthday"],
    "Sangeet & Cocktail": ["sangeet", "party", "flowers"],
    "Pooja & House Blessing": ["pooja", "flowers", "home"],
    Graduation: ["graduation", "party", "couple"],
    "Dinner Party": ["dinner", "flowers", "party"],
  };
  return {
    template: design.id,
    style: design.style,
    layout: design.layout,
    eventType: type,
    projectId: "",
    groomFullName: "",
    brideFullName: "",
    groomFatherName: "",
    groomMotherName: "",
    brideFatherName: "",
    brideMotherName: "",
    additionalFamily: [],
    events: [
      {
        id: "event-1",
        name: type === "Wedding" ? "Wedding" : type,
        date: "2027-02-22",
        time: event.time,
        venue: event.venue,
        address: event.address,
      },
    ],
    customFields: [],
    names: event.names,
    date: "2027-02-22",
    time: event.time,
    timezone: "+05:30",
    venue: event.venue,
    address: event.address,
    mapQuery: "",
    mapUrl: "",
    dressCode: event.dress,
    story: event.story,
    color: design.color,
    font: design.font,
    background: design.background,
    image: "",
    heroImage: images[event.imageKey],
    videoPoster: images[event.imageKey],
    videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    heroVideoUrl: "",
    age: type === "Birthday" ? "25" : "",
    milestone: type === "Anniversary" ? "25" : "",
    copy,
    decorations: {
      Flowers: [
        "Wedding",
        "Mehendi",
        "Haldi",
        "Naming Ceremony",
        "Pooja & House Blessing",
      ].includes(type),
      Leaves: ["Housewarming", "Mehendi", "Dinner Party"].includes(type),
      Sparkles: true,
      Lanterns: ["Reception", "Sangeet & Cocktail"].includes(type),
      Butterflies: type === "Baby Shower",
      Hearts: ["Wedding", "Engagement", "Anniversary"].includes(type),
      "Temple Pattern": [
        "Housewarming",
        "Haldi",
        "Pooja & House Blessing",
      ].includes(type),
    },
    sections: {
      story: true,
      details: true,
      schedule: true,
      gallery: true,
      video: true,
      rsvp: true,
      wishes: true,
      registry: true,
      contacts: true,
      countdown: true,
      music: true,
    },
    memories: event.memories.map((title, index) => ({
      id: `memory-${index + 1}`,
      title,
      text: [
        "A little moment that became a beautiful memory.",
        "The people, places, and little things we treasure.",
        "The next chapter is better with you beside us.",
      ][index],
    })),
    schedule: event.schedule.map(([time, title], index) => ({
      id: `schedule-${index + 1}`,
      time,
      title,
      text:
        [
          "Gather with our favorite people.",
          "The moment we have been looking forward to.",
          "Food, conversation, and memories to keep.",
        ][index] || "",
    })),
    gallery: galleryKeys[type].map((key, index) => ({
      id: `photo-${index + 1}`,
      src: images[key] || images.party,
      alt: `${type} inspiration ${index + 1}`,
    })),
    wishes: [
      {
        id: "wish-1",
        quote: `Wishing you a wonderful ${type === "Other" ? "celebration" : type.toLowerCase()} filled with love and beautiful memories.`,
        author: "Ananya & family",
      },
      {
        id: "wish-2",
        quote:
          "So excited to celebrate this beautiful chapter with you. Here is to all the magic ahead!",
        author: "Meera & friends",
      },
      {
        id: "wish-3",
        quote:
          "May your days be full of laughter, sunshine, and all the people you love most.",
        author: "The Sharma family",
      },
    ],
    registry: [
      {
        id: "gift-1",
        title: ["Baby Shower", "Naming Ceremony"].includes(type)
          ? "For our little one"
          : type === "Graduation"
            ? "Future aspirations fund"
            : "A little wish",
        description: "Something special for our next chapter.",
        url: "",
      },
      {
        id: "gift-2",
        title: "A cause close to us",
        description: "Sharing the joy with others.",
        url: "",
      },
    ],
    contacts: [
      {
        id: "contact-1",
        name: [
          "Wedding",
          "Engagement",
          "Reception",
          "Sangeet & Cocktail",
        ].includes(type)
          ? "Rohan’s family"
          : "Our family",
        role: "Event host",
        phone: "",
        email: "",
      },
      {
        id: "contact-2",
        name: [
          "Wedding",
          "Engagement",
          "Reception",
          "Sangeet & Cocktail",
        ].includes(type)
          ? "Rhea’s family"
          : "Celebration coordinator",
        role: "Guest support",
        phone: "",
        email: "",
      },
    ],
  };
}

export const defaultConfig = getEventDefaults();
