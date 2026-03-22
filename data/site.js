export const siteSettings = {
  phone: '+995 555 00 00 00',
  email: 'hello@gtgroup-byd.ge',
  address: {
    ka: 'placeholder მისამართი, თბილისი, საქართველო',
    en: 'Placeholder address, Tbilisi, Georgia',
  },
  hours: {
    ka: 'ორშ-შაბ: 10:00 - 19:00',
    en: 'Mon-Sat: 10:00 - 19:00',
  },
  whatsapp: '+995555000000',
};

export const compareFields = [
  { key: 'price', label: { ka: 'ფასი', en: 'Price' }, category: 'commercial' },
  { key: 'monthlyFinance', label: { ka: 'თვიური დაფინანსება', en: 'Monthly finance' }, category: 'commercial' },
  { key: 'range', label: { ka: 'სავალი მანძილი', en: 'Range' }, category: 'performance' },
  { key: 'battery', label: { ka: 'ბატარეა', en: 'Battery' }, category: 'performance' },
  { key: 'horsepower', label: { ka: 'ცხენის ძალა', en: 'Horsepower' }, category: 'performance' },
  { key: 'acceleration', label: { ka: '0-100 კმ/სთ', en: '0-100 km/h' }, category: 'performance' },
  { key: 'drivetrain', label: { ka: 'ძრავი', en: 'Drivetrain' }, category: 'engineering' },
  { key: 'dimensions', label: { ka: 'ზომები', en: 'Dimensions' }, category: 'practicality' },
  { key: 'cargo', label: { ka: 'საბარგული', en: 'Cargo' }, category: 'practicality' },
  { key: 'seating', label: { ka: 'ადგილები', en: 'Seating' }, category: 'practicality' },
  { key: 'charging', label: { ka: 'დამუხტვა', en: 'Charging' }, category: 'charging' },
  { key: 'warranty', label: { ka: 'გარანტია', en: 'Warranty' }, category: 'ownership' },
  { key: 'safety', label: { ka: 'უსაფრთხოება', en: 'Safety' }, category: 'ownership' },
];

export const homepageContent = {
  hero: {
    eyebrow: { ka: 'GT Group × BYD საქართველო', en: 'GT Group × BYD Georgia' },
    title: {
      ka: 'ელექტრო მომავალი, წარმოდგენილი პრემიუმ გამოცდილებად',
      en: 'The electric future, presented as a premium ownership experience',
    },
    description: {
      ka: 'აღმოაჩინეთ BYD-ის ახალი თაობის ელექტრომობილები საქართველოში — ტექნოლოგია, დიზაინი და პრაქტიკული ღირებულება GT Group-ის ექსკლუზიური მხარდაჭერით.',
      en: 'Discover next-generation BYD electric vehicles in Georgia, delivered with standout technology, design, and GT Group’s exclusive premium support.',
    },
    metrics: [
      { value: '3', label: { ka: 'საწყისი მოდელი', en: 'Launch models' } },
      { value: '530 km', label: { ka: 'მაქს. სავალი მანძილი*', en: 'Max range*' } },
      { value: '8 yr', label: { ka: 'ბატარეის გარანტია*', en: 'Battery warranty*' } },
    ],
  },
  whyByd: [
    {
      title: { ka: 'Blade Battery ტექნოლოგია', en: 'Blade Battery technology' },
      description: { ka: 'უსაფრთხოებაზე, თერმულ სტაბილურობასა და ყოველდღიურ გამძლეობაზე ფოკუსირებული პლატფორმა.', en: 'A platform engineered around safety, thermal stability, and everyday durability.' },
    },
    {
      title: { ka: 'გლობალური EV ლიდერი', en: 'Global EV leader' },
      description: { ka: 'BYD აერთიანებს ბატარეას, ელექტრონიკას და ავტომობილს ერთ ეკოსისტემაში.', en: 'BYD integrates battery, electronics, and vehicle engineering into one ecosystem.' },
    },
    {
      title: { ka: 'GT Group მხარდაჭერა', en: 'GT Group support' },
      description: { ka: 'ლოკალური გაყიდვები, სერვისი და მფლობელობის გამოცდილება ერთ პრემიუმ ჰაბში.', en: 'Local sales, service, and ownership support in one premium destination.' },
    },
  ],
  whyEv: [
    { title: { ka: 'დაბალი საოპერაციო ხარჯები', en: 'Lower running costs' }, description: { ka: 'ენერგიისა და მომსახურების ოპტიმიზაცია შიდა წვის ავტომობილებთან შედარებით.', en: 'Optimized energy and service costs compared with combustion alternatives.' } },
    { title: { ka: 'მყისიერი რეაქცია', en: 'Instant response' }, description: { ka: 'ელექტროძრავის მყისიერი ბრუნვა ქალაქშიც და ტრასაზეც.', en: 'Instant torque for refined confidence in city and highway driving.' } },
    { title: { ka: 'ყოველდღიური სიმარტივე', en: 'Daily simplicity' }, description: { ka: 'დატენვა სახლში, ოფისში ან საჯარო ქსელში — მოქნილი ყოველდღიური რუტინა.', en: 'Charge at home, at work, or via public infrastructure for a simpler routine.' } },
  ],
  banners: [
    {
      title: { ka: 'შეადარეთ BYD მოდელები', en: 'Compare BYD models' },
      description: { ka: 'იხილეთ განსხვავებები რეალურ მონაცემებზე დაყრდნობით.', en: 'See the differences side by side using real-world ownership metrics.' },
      href: '/compare',
    },
    {
      title: { ka: 'დაჯავშნეთ კონსულტაცია', en: 'Book a sales consultation' },
      description: { ka: 'მიიღეთ პერსონალური შეთავაზება, ტესტ-დრაივისა და დაფინანსების ინფორმაციით.', en: 'Receive a tailored offer with test-drive and finance guidance.' },
      href: '/contact',
    },
  ],
};

export const faqItems = [
  {
    question: { ka: 'რამდენად მარტივია BYD-ის დატენვა საქართველოში?', en: 'How easy is it to charge a BYD in Georgia?' },
    answer: { ka: 'Mock პასუხი: ყოველდღიურ გამოყენებაში შესაძლებელია სახლის დამტენით, ხოლო ქალაქებს შორის გადაადგილებისთვის საჯარო AC/DC ინფრასტრუქტურა იზრდება. GT Group მომხმარებელს დაეხმარება ოპტიმალური დამტენის სცენარის შერჩევაში.', en: 'Mock answer: daily charging can be covered at home, while intercity trips are increasingly supported by public AC/DC infrastructure. GT Group can help customers choose the right charging setup.' },
  },
  {
    question: { ka: 'რა არის Blade Battery?', en: 'What is Blade Battery?' },
    answer: { ka: 'Mock პასუხი: BYD-ის ბატარეის არქიტექტურა, რომელიც აქცენტს აკეთებს უსაფრთხოებაზე, ეფექტიან პაკეტირებასა და ხანგრძლივობაზე.', en: 'Mock answer: BYD’s battery architecture focused on safety, efficient packaging, and long-term durability.' },
  },
  {
    question: { ka: 'არის თუ არა EV ყოველდღიური საოჯახო ავტომობილი?', en: 'Can an EV work as an everyday family car?' },
    answer: { ka: 'Mock პასუხი: დიახ, თუ სწორად შეირჩევა დიაპაზონი, დატენვის ჩვევა და გამოყენების პროფილი. ამ საიტზე წარმოდგენილია შედარება და განათლების ბლოკები სწორი არჩევანისთვის.', en: 'Mock answer: yes, if range, charging habits, and use profile are aligned. This site includes comparison and education modules to support that decision.' },
  },
];

export const educationSections = [
  {
    slug: 'why-byd',
    title: { ka: 'რატომ BYD', en: 'Why BYD' },
    description: { ka: 'Mock შინაარსი: BYD-ის ინჟინერია, ბატარეა, უსაფრთხოება და გლობალური მასშტაბი.', en: 'Mock content: BYD engineering, battery leadership, safety, and global scale.' },
  },
  {
    slug: 'why-ev',
    title: { ka: 'რატომ ელექტრომობილი', en: 'Why EV' },
    description: { ka: 'Mock შინაარსი: საოპერაციო ხარჯები, სიმშვიდე, ტექნოლოგია და ყოველდღიური კომფორტი.', en: 'Mock content: operating costs, refinement, technology, and daily comfort.' },
  },
  {
    slug: 'charging-basics',
    title: { ka: 'დამუხტვის საფუძვლები', en: 'Charging basics' },
    description: { ka: 'Mock შინაარსი: AC/DC სცენარები, დრო, სახლის დამტენი და მოგზაურობის დაგეგმვა.', en: 'Mock content: AC/DC scenarios, timing, home charging, and trip planning.' },
  },
  {
    slug: 'battery-technology',
    title: { ka: 'ბატარეის ტექნოლოგია', en: 'Battery technology' },
    description: { ka: 'Mock შინაარსი: Blade Battery, თერმული სტაბილურობა და გრძელვადიანი გამძლეობა.', en: 'Mock content: Blade Battery, thermal stability, and long-term resilience.' },
  },
  {
    slug: 'warranty-service',
    title: { ka: 'გარანტია და სერვისი', en: 'Warranty and service' },
    description: { ka: 'Mock შინაარსი: GT Group-ის სერვისის პროცესი და მფლობელობის მხარდაჭერა.', en: 'Mock content: GT Group service process and ownership support.' },
  },
  {
    slug: 'ev-myths',
    title: { ka: 'EV მითების დარღვევა', en: 'Common EV misconceptions' },
    description: { ka: 'Mock შინაარსი: დიაპაზონი, ბატარეა, ზამთარი და მოვლის ხარჯები.', en: 'Mock content: range, battery, winter use, and maintenance costs.' },
  },
];

export const legalContent = {
  privacy: {
    title: { ka: 'კონფიდენციალურობის პოლიტიკა', en: 'Privacy Policy' },
    body: { ka: 'Mock legal copy: პერსონალური მონაცემები გამოიყენება მხოლოდ გაყიდვების, კონსულტაციისა და მომსახურების კომუნიკაციისთვის.', en: 'Mock legal copy: personal data is used only for sales, consultation, and service communication.' },
  },
  terms: {
    title: { ka: 'წესები და პირობები', en: 'Terms & Conditions' },
    body: { ka: 'Mock legal copy: საიტზე განთავსებული ინფორმაცია არის საინფორმაციო და შეიძლება განახლდეს.', en: 'Mock legal copy: information on the site is informational and subject to change.' },
  },
  cookies: {
    title: { ka: 'Cookies შეტყობინება', en: 'Cookies Notice' },
    body: { ka: 'Mock legal copy: cookies გამოიყენება ანალიტიკისა და გამოცდილების გაუმჯობესებისთვის.', en: 'Mock legal copy: cookies are used for analytics and experience improvements.' },
  },
  disclaimer: {
    title: { ka: 'სპეციფიკაციებისა და ფასების დისკლეიმერი', en: 'Specs and prices disclaimer' },
    body: { ka: 'Mock legal copy: მოდელების სპეციფიკაციები, ფასი და ხელმისაწვდომობა შეიძლება შეიცვალოს ოფიციალური განახლებების მიხედვით.', en: 'Mock legal copy: model specifications, pricing, and availability may change according to official updates.' },
  },
};

export const blogPosts = [
  {
    slug: 'byd-georgia-launch-vision',
    date: '2026-03-18',
    category: { ka: 'ახალი ამბები', en: 'News' },
    title: { ka: 'როგორ ქმნის GT Group BYD-ის პრემიუმ გამოცდილებას საქართველოში', en: 'How GT Group is shaping a premium BYD experience in Georgia' },
    excerpt: { ka: 'Mock editorial copy about launch positioning, customer education, and service confidence.', en: 'Mock editorial copy about launch positioning, customer education, and service confidence.' },
    body: { ka: 'Mock article body: This bilingual editorial structure is ready for real CMS content later.', en: 'Mock article body: This bilingual editorial structure is ready for real CMS content later.' },
  },
  {
    slug: 'understanding-blade-battery',
    date: '2026-03-12',
    category: { ka: 'განათლება', en: 'Education' },
    title: { ka: 'Blade Battery მარტივად ახსნილი', en: 'Blade Battery explained simply' },
    excerpt: { ka: 'Mock educational article focused on safety, packaging, and trust.', en: 'Mock educational article focused on safety, packaging, and trust.' },
    body: { ka: 'Mock article body: Educational copy structure for SEO-oriented EV awareness pages.', en: 'Mock article body: Educational copy structure for SEO-oriented EV awareness pages.' },
  },
];

const buildVehicle = ({
  slug,
  name,
  bodyType,
  price,
  finance,
  range,
  battery,
  horsepower,
  acceleration,
  drivetrain,
  topSpeed,
  seating,
  charging,
  dimensions,
  cargo,
  safety,
  heroImage,
  gallery,
  baseColor,
}) => ({
  slug,
  name,
  year: 2026,
  bodyType,
  price,
  monthlyFinance: finance,
  range,
  battery,
  horsepower,
  acceleration,
  drivetrain,
  topSpeed,
  dimensions,
  cargo,
  seating,
  charging,
  safety,
  warranty: 'Mock 8 წელი ბატარეაზე / Mock 6 წელი ავტომობილზე',
  description: {
    ka: `${name} — mock პრემიუმ BYD პროდუქტის გვერდის აღწერა, რომელიც რეალური ოფიციალური სპეციფიკაციებით მოგვიანებით ჩანაცვლდება.`,
    en: `${name} — mock premium BYD product page copy, designed to be swapped with official data later.`,
  },
  financeDisclaimer: {
    ka: 'Mock ფინანსური ინფორმაცია. საბოლოო პირობები დამოკიდებულია პარტნიორ ფინანსურ ინსტიტუტზე.',
    en: 'Mock finance information. Final terms depend on the partner financial institution.',
  },
  colors: [
    { key: 'aurora-black', name: { ka: 'Aurora Black', en: 'Aurora Black' }, hex: '#111827', priceImpact: 0 },
    { key: 'arctic-white', name: { ka: 'Arctic White', en: 'Arctic White' }, hex: '#f8fafc', priceImpact: 1200 },
    { key: 'tidal-blue', name: { ka: 'Tidal Blue', en: 'Tidal Blue' }, hex: '#1d4ed8', priceImpact: 1500 },
    { key: 'ember-red', name: { ka: 'Ember Red', en: 'Ember Red' }, hex: '#b91c1c', priceImpact: 1800 },
  ],
  wheels: [
    { key: 'aero-19', name: '19” Aero', priceImpact: 0 },
    { key: 'performance-20', name: '20” Performance', priceImpact: 2200 },
  ],
  interiors: [
    { key: 'obsidian', name: { ka: 'Obsidian Black', en: 'Obsidian Black' }, priceImpact: 0 },
    { key: 'pearl', name: { ka: 'Pearl White', en: 'Pearl White' }, priceImpact: 1700 },
  ],
  trims: [
    {
      key: 'comfort',
      name: 'Comfort',
      price,
      range,
      horsepower,
      acceleration,
      standardFeatures: ['Mock 360 camera', 'Mock heated seats', 'Mock adaptive cruise'],
    },
    {
      key: 'design',
      name: 'Design',
      price: price + 7500,
      range: range + 20,
      horsepower: horsepower + 20,
      acceleration: Math.max(acceleration - 0.3, 3.8),
      standardFeatures: ['Mock panoramic roof', 'Mock HUD', 'Mock premium audio'],
    },
  ],
  highlights: [
    {
      title: { ka: 'ციფრული კაბინა', en: 'Digital cockpit' },
      description: { ka: 'Mock აღწერა: თანამედროვე ეკრანები, UI და პრემიუმ მასალები.', en: 'Mock description: immersive displays, UI, and premium material expression.' },
    },
    {
      title: { ka: 'ელექტრო ეფექტიანობა', en: 'Electric efficiency' },
      description: { ka: 'Mock აღწერა: ქალაქისა და ტრასის გამოყენებისთვის გათვლილი ბალანსი.', en: 'Mock description: tuned balance for city and highway ownership.' },
    },
    {
      title: { ka: 'უსაფრთხოების სისტემა', en: 'Safety suite' },
      description: { ka: 'Mock აღწერა: აქტიური ასისტენტები და მგზავრების დაცვა.', en: 'Mock description: active assistance and occupant protection technologies.' },
    },
  ],
  gallery,
  heroImage,
  asset3d: {
    glb: '/models/placeholder-byd.glb',
    poster: heroImage,
    hotspots: [
      { id: 'front', label: { ka: 'LED განათება', en: 'LED signature' }, x: 1.5, y: 0.5, z: 1.2 },
      { id: 'side', label: { ka: 'აეროდინამიკა', en: 'Aerodynamic profile' }, x: -1.1, y: 0.6, z: 0.1 },
      { id: 'interior', label: { ka: 'სალონის ინტერფეისი', en: 'Cabin interface' }, x: 0.2, y: 0.8, z: -0.2 },
    ],
  },
  compare: {
    price,
    monthlyFinance: finance,
    range: `${range} km*`,
    battery: `${battery} kWh*`,
    horsepower: `${horsepower} hp*`,
    acceleration: `${acceleration}s*`,
    drivetrain,
    dimensions,
    cargo: `${cargo} L*`,
    seating: `${seating}`,
    charging,
    warranty: 'Mock 8y / 6y',
    safety,
  },
  filters: {
    performanceTier: horsepower > 300 ? 'high' : horsepower > 220 ? 'mid' : 'urban',
    rangeTier: range > 500 ? 'long' : range > 420 ? 'balanced' : 'city',
  },
  placeholderNote: 'All specs, pricing, finance, and 3D assets are mock placeholders until official BYD Georgia data is supplied.',
  baseColor,
});

export const vehicles = [
  buildVehicle({
    slug: 'seal',
    name: 'Seal',
    bodyType: 'Sedan',
    price: 132900,
    finance: 1890,
    range: 530,
    battery: 82.5,
    horsepower: 313,
    acceleration: 5.9,
    drivetrain: 'RWD',
    topSpeed: '180 km/h*',
    seating: 5,
    charging: 'Mock DC 150 kW / AC 11 kW',
    dimensions: '4800 × 1875 × 1460 mm*',
    cargo: 400,
    safety: 'Mock Euro NCAP 5-star ready copy',
    heroImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    ],
    baseColor: '#1d4ed8',
  }),
  buildVehicle({
    slug: 'dolphin',
    name: 'Dolphin',
    bodyType: 'Hatchback',
    price: 89900,
    finance: 1290,
    range: 427,
    battery: 60.4,
    horsepower: 204,
    acceleration: 7.0,
    drivetrain: 'FWD',
    topSpeed: '160 km/h*',
    seating: 5,
    charging: 'Mock DC 88 kW / AC 11 kW',
    dimensions: '4290 × 1770 × 1570 mm*',
    cargo: 345,
    safety: 'Mock ADAS suite with 5-star-ready messaging',
    heroImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
    ],
    baseColor: '#0f766e',
  }),
  buildVehicle({
    slug: 'sealion-7',
    name: 'Sealion 7',
    bodyType: 'SUV',
    price: 148900,
    finance: 2140,
    range: 502,
    battery: 91.3,
    horsepower: 390,
    acceleration: 4.8,
    drivetrain: 'AWD',
    topSpeed: '215 km/h*',
    seating: 5,
    charging: 'Mock DC 180 kW / AC 11 kW',
    dimensions: '4830 × 1925 × 1620 mm*',
    cargo: 520,
    safety: 'Mock flagship ADAS and structural safety messaging',
    heroImage: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80',
    ],
    baseColor: '#111827',
  }),
];

export const navigation = [
  { href: '/', label: { ka: 'მთავარი', en: 'Home' } },
  { href: '/all-cars', label: { ka: 'მოდელები', en: 'All Cars' } },
  { href: '/compare', label: { ka: 'შედარება', en: 'Compare' } },
  { href: '/charging', label: { ka: 'EV განათლება', en: 'EV Education' } },
  { href: '/news', label: { ka: 'სიახლეები', en: 'News' } },
  { href: '/about', label: { ka: 'ჩვენ შესახებ', en: 'About' } },
  { href: '/contact', label: { ka: 'კონტაქტი', en: 'Contact' } },
];
