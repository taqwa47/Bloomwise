export const mockProducts = [
  // --- FLOWERS (mainCategory: 'Flowers') ---
  { id: "flw_1", nameEnglish: "Red Rose", name: "Red Rose", type: "Rose", mainCategory: "Flowers", subcategories: ["Romantic"], category: "Romantic", color: "Red", quantity: 25, minStock: 10, price: 4.99, cost: 2.50, supplier: "Local Farms", season: "All Year", freshness: "Fresh", status: "In Stock", lastUpdated: "Jun 20", image: "/src/assets/flowers/red-rose.jpg", description: "Classic red rose.", careInstructions: "Keep in water." },
  { id: "flw_2", nameEnglish: "White Rose", name: "White Rose", type: "Rose", mainCategory: "Flowers", subcategories: ["Wedding"], category: "Wedding", color: "White", quantity: 18, minStock: 10, price: 5.50, cost: 2.80, supplier: "Local Farms", season: "All Year", freshness: "Fresh", status: "In Stock", lastUpdated: "Jun 20", image: "/src/assets/flowers/white-rose.jpg", description: "Elegant white rose.", careInstructions: "Keep in water." },
  { id: "flw_3", nameEnglish: "Pink Lisianthus", name: "Pink Lisianthus", type: "Lisianthus", mainCategory: "Flowers", subcategories: ["Birthday"], category: "Birthday", color: "Pink", quantity: 14, minStock: 5, price: 7.00, cost: 3.50, supplier: "Global Blooms", season: "Summer", freshness: "Fresh", status: "In Stock", lastUpdated: "Jun 21", image: "/src/assets/flowers/pink-lisianthus.jpg", description: "Delicate pink lisianthus.", careInstructions: "Trim stems daily." },
  { id: "flw_4", nameEnglish: "White Lisianthus", name: "White Lisianthus", type: "Lisianthus", mainCategory: "Flowers", subcategories: ["Sympathy"], category: "Sympathy", color: "White", quantity: 9, minStock: 10, price: 7.00, cost: 3.50, supplier: "Global Blooms", season: "Summer", freshness: "Fresh", status: "Low Stock", lastUpdated: "Jun 21", image: "/src/assets/flowers/white-lisianthus.jpg", description: "Beautiful white lisianthus.", careInstructions: "Trim stems daily." },
  { id: "flw_5", nameEnglish: "Pink Gerbera", name: "Pink Gerbera", type: "Gerbera", mainCategory: "Flowers", subcategories: ["Congratulations"], category: "Congratulations", color: "Pink", quantity: 20, minStock: 10, price: 3.50, cost: 1.50, supplier: "Sunny Farms", season: "Spring", freshness: "Fresh", status: "In Stock", lastUpdated: "Jun 19", image: "/src/assets/flowers/pink-gerbera.jpg", description: "Bright pink gerbera daisy.", careInstructions: "Shallow water." },
  { id: "flw_6", nameEnglish: "White Lily", name: "White Lily", type: "Lily", mainCategory: "Flowers", subcategories: ["Sympathy"], category: "Sympathy", color: "White", quantity: 3, minStock: 5, price: 6.50, cost: 3.00, supplier: "Dutch Imports", season: "Spring", freshness: "Fresh", status: "Low Stock", lastUpdated: "Jun 20", image: "/src/assets/flowers/white-lily.jpg", description: "Fragrant white lily.", careInstructions: "Remove pollen." },
  { id: "flw_7", nameEnglish: "Yellow Sunflower", name: "Yellow Sunflower", type: "Sunflower", mainCategory: "Flowers", subcategories: ["Birthday"], category: "Birthday", color: "Yellow", quantity: 12, minStock: 5, price: 3.75, cost: 1.80, supplier: "Sunny Farms", season: "Summer", freshness: "Fresh", status: "In Stock", lastUpdated: "Jun 20", image: "/src/assets/flowers/yellow-sunflower.jpg", description: "Cheerful yellow sunflower.", careInstructions: "Deep water." },
  { id: "flw_8", nameEnglish: "White Chrysanthemum", name: "White Chrysanthemum", type: "Chrysanthemum", mainCategory: "Flowers", subcategories: ["Sympathy"], category: "Sympathy", color: "White", quantity: 30, minStock: 15, price: 4.00, cost: 2.00, supplier: "Local Farms", season: "Autumn", freshness: "Fresh", status: "In Stock", lastUpdated: "Jun 22", image: "/src/assets/flowers/white-chrysanthemum.jpg", description: "Long-lasting white mum.", careInstructions: "Change water often." },
  { id: "flw_9", nameEnglish: "Pink Carnation", name: "Pink Carnation", type: "Carnation", mainCategory: "Flowers", subcategories: ["Congratulations"], category: "Congratulations", color: "Pink", quantity: 22, minStock: 10, price: 2.50, cost: 1.00, supplier: "Global Blooms", season: "All Year", freshness: "Fresh", status: "In Stock", lastUpdated: "Jun 18", image: "/src/assets/flowers/pink-carnation.jpg", description: "Ruffled pink carnation.", careInstructions: "Keep cool." },
  { id: "flw_10", nameEnglish: "Baby's Breath", name: "Baby's Breath", type: "Filler", mainCategory: "Flowers", subcategories: ["Wedding"], category: "Wedding", color: "White", quantity: 16, minStock: 10, price: 1.50, cost: 0.50, supplier: "Local Farms", season: "All Year", freshness: "Fresh", status: "In Stock", lastUpdated: "Jun 20", image: "/src/assets/flowers/babys-breath.jpg", description: "Delicate white filler.", careInstructions: "Mist lightly." },
  { id: "flw_11", nameEnglish: "Purple Statice", name: "Purple Statice", type: "Filler", mainCategory: "Flowers", subcategories: ["Birthday"], category: "Birthday", color: "Purple", quantity: 8, minStock: 5, price: 2.00, cost: 0.80, supplier: "Dutch Imports", season: "Summer", freshness: "Fresh", status: "In Stock", lastUpdated: "Jun 21", image: "/src/assets/flowers/purple-statice.jpg", description: "Papery purple filler.", careInstructions: "Dries well." },
  { id: "flw_12", nameEnglish: "White Orchid", name: "White Orchid", type: "Orchid", mainCategory: "Flowers", subcategories: ["Congratulations"], category: "Congratulations", color: "White", quantity: 0, minStock: 2, price: 25.00, cost: 12.00, supplier: "Exotic Plants", season: "All Year", freshness: "Fresh", status: "Out of Stock", lastUpdated: "Jun 15", image: "/src/assets/flowers/white-orchid.jpg", description: "Elegant potted orchid.", careInstructions: "Water weekly." },

  // --- INDOOR PLANTS (mainCategory: 'Indoor Plants') ---
  {
    id: "plt_pothos", name: "Pothos", nameEnglish: "Pothos", nameArabic: "بوتوس", nameHebrew: "פוטוס", mainCategory: "Indoor Plants",
    subcategories: ["Easy Care", "Hanging & Shelf Plants"], tags: ["Easy Care", "Hanging", "Low Maintenance"],
    description: "A trailing plant that is ideal for shelves and hanging pots. Easy to care for and suitable for beginners.",
    price: 35.00, status: "In Stock", careLevel: "Easy", lightLevel: "Low to Bright Indirect Light", wateringLevel: "Every 7–14 days", size: "Medium",
    image: "https://images.unsplash.com/photo-1614594805320-e6e6bd0cb93a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_snake", name: "Sansevieria", nameEnglish: "Sansevieria / Snake Plant", nameArabic: "سانسيفيريا / لسان الحماة", nameHebrew: "סנסיווריה / לשון החותנת", mainCategory: "Indoor Plants",
    subcategories: ["Easy Care"], tags: ["Easy Care", "Low Water", "Office Plant"],
    description: "An elegant upright plant that tolerates infrequent watering and different indoor conditions.",
    price: 45.00, status: "In Stock", careLevel: "Very Easy", lightLevel: "Flexible Light", wateringLevel: "Every 14–21 days", size: "Medium / Large",
    image: "https://images.unsplash.com/photo-1593482892290-f54927eba704?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_zz", name: "ZZ Plant", nameEnglish: "ZZ Plant", nameArabic: "زاميا", nameHebrew: "זמיה קוקוס", mainCategory: "Indoor Plants",
    subcategories: ["Easy Care"], tags: ["Easy Care", "Low Light", "Office Plant"],
    description: "A durable indoor plant with glossy leaves that is suitable for homes and offices.",
    price: 50.00, status: "In Stock", careLevel: "Very Easy", lightLevel: "Low to Bright Indirect Light", wateringLevel: "Every 14–21 days", size: "Medium",
    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_monstera", name: "Monstera", nameEnglish: "Monstera", nameArabic: "مونستيرا", nameHebrew: "מונסטרה", mainCategory: "Indoor Plants",
    subcategories: ["Easy Care"], tags: ["Popular", "Large Leaves", "Modern"],
    description: "A modern indoor plant known for its large, naturally split leaves.",
    price: 65.00, status: "In Stock", careLevel: "Moderate", lightLevel: "Bright Indirect Light", wateringLevel: "Every 7–10 days", size: "Large",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_peacelily", name: "Peace Lily", nameEnglish: "Peace Lily", nameArabic: "سباثيفيلوم", nameHebrew: "ספטיפיליום", mainCategory: "Indoor Plants",
    subcategories: ["Easy Care"], tags: ["Flowering", "Gift", "Low Light"],
    description: "A green plant with elegant white flowers. A beautiful choice for gifts and indoor decoration.",
    price: 40.00, status: "In Stock", careLevel: "Easy", lightLevel: "Low to Bright Indirect Light", wateringLevel: "Every 5–7 days", size: "Medium",
    image: "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_aglaonema", name: "Aglaonema", nameEnglish: "Aglaonema", nameArabic: "أجلونيما", nameHebrew: "אגלונמה", mainCategory: "Indoor Plants",
    subcategories: ["Easy Care"], tags: ["Colorful Leaves", "Low Light", "Easy Care"],
    description: "A colorful foliage plant that can adapt well to lower indoor light.",
    price: 35.00, status: "Low Stock", careLevel: "Easy", lightLevel: "Low Light", wateringLevel: "Every 7–10 days", size: "Small / Medium",
    image: "https://images.unsplash.com/photo-1655760614352-0453e00cfbe4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_dieffenbachia", name: "Dieffenbachia", nameEnglish: "Dieffenbachia", nameArabic: "ديفنباخيا", nameHebrew: "דיפנבכיה", mainCategory: "Indoor Plants",
    subcategories: ["Easy Care"], tags: ["Decorative Leaves", "Indoor", "Medium Size"],
    description: "A decorative indoor plant with large patterned leaves.",
    price: 42.00, status: "In Stock", careLevel: "Moderate", lightLevel: "Bright Indirect Light", wateringLevel: "Every 7–10 days", size: "Medium",
    image: "https://images.unsplash.com/photo-1646667687331-e069720058b8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_dracaena", name: "Dracaena", nameEnglish: "Dracaena", nameArabic: "دراسينا", nameHebrew: "דרצנה", mainCategory: "Indoor Plants",
    subcategories: ["Easy Care"], tags: ["Tall Plant", "Office Plant", "Elegant"],
    description: "A tall and elegant plant suitable for empty corners, offices, and modern interiors.",
    price: 55.00, status: "In Stock", careLevel: "Easy", lightLevel: "Flexible Light", wateringLevel: "Every 10–14 days", size: "Large",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_chamaedorea", name: "Chamaedorea Palm", nameEnglish: "Chamaedorea Palm", nameArabic: "نخلة شاميدوريا", nameHebrew: "דקל חמדוריאה", mainCategory: "Indoor Plants",
    subcategories: ["Easy Care"], tags: ["Tropical", "Small Palm", "Indoor"],
    description: "A soft compact palm that adds a fresh tropical feeling to indoor spaces.",
    price: 38.00, status: "In Stock", careLevel: "Easy", lightLevel: "Bright Indirect Light", wateringLevel: "Every 7–10 days", size: "Medium",
    image: "https://images.unsplash.com/photo-1620127252535-0ba65d953a99?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_philodendron", name: "Philodendron", nameEnglish: "Philodendron", nameArabic: "فيلوديندرون", nameHebrew: "פילודנדרון", mainCategory: "Indoor Plants",
    subcategories: ["Easy Care"], tags: ["Easy Care", "Popular", "Decorative Leaves"],
    description: "A popular plant available in trailing varieties and large-leaf varieties.",
    price: 40.00, status: "In Stock", careLevel: "Easy", lightLevel: "Flexible Light", wateringLevel: "Every 7–10 days", size: "Medium",
    image: "https://images.unsplash.com/photo-1612459284970-e8f1f503c5eb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_fiddle", name: "Fiddle Leaf Fig", nameEnglish: "Fiddle Leaf Fig", nameArabic: "فيكس ليراتا", nameHebrew: "פיקוס כינורי", mainCategory: "Indoor Plants",
    subcategories: ["Premium Plants"], tags: ["Premium", "Large Plant", "Statement Plant"],
    description: "A luxurious statement plant with large violin-shaped leaves.",
    price: 120.00, status: "In Stock", careLevel: "Moderate", lightLevel: "Bright Indirect Light", wateringLevel: "Every 7–10 days", size: "Large",
    image: "https://images.unsplash.com/photo-1617173945092-1facb966a0bb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_rubber", name: "Rubber Plant", nameEnglish: "Rubber Plant", nameArabic: "فيكس مطاط", nameHebrew: "פיקוס גומי", mainCategory: "Indoor Plants",
    subcategories: ["Premium Plants"], tags: ["Premium", "Glossy Leaves", "Office Plant"],
    description: "A stylish plant with thick, glossy leaves that suits elegant interiors.",
    price: 85.00, status: "In Stock", careLevel: "Easy", lightLevel: "Bright Indirect Light", wateringLevel: "Every 10–14 days", size: "Medium / Large",
    image: "https://images.unsplash.com/photo-1646667687361-ec2e31644fc2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_calathea", name: "Calathea", nameEnglish: "Calathea", nameArabic: "كالاتيا", nameHebrew: "קלתאה", mainCategory: "Indoor Plants",
    subcategories: ["Premium Plants"], tags: ["Premium", "Patterned Leaves", "Decorative"],
    description: "A distinctive plant with patterned and colorful decorative leaves.",
    price: 60.00, status: "Low Stock", careLevel: "Moderate", lightLevel: "Low to Bright Indirect Light", wateringLevel: "Every 5–7 days", size: "Medium",
    image: "/src/assets/indoor-plants/calathea.jpg"
  },
  {
    id: "plt_anthurium", name: "Anthurium", nameEnglish: "Anthurium", nameArabic: "أنثوريوم", nameHebrew: "אנטוריום", mainCategory: "Indoor Plants",
    subcategories: ["Premium Plants"], tags: ["Flowering", "Premium Gift", "Colorful"],
    description: "An elegant flowering plant with bright heart-shaped flowers.",
    price: 75.00, status: "In Stock", careLevel: "Easy", lightLevel: "Bright Indirect Light", wateringLevel: "Every 7–10 days", size: "Medium",
    image: "https://images.unsplash.com/photo-1600411832986-5a4477b64a1c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_orchid", name: "Orchid", nameEnglish: "Orchid", nameArabic: "أوركيد", nameHebrew: "סחלב", mainCategory: "Indoor Plants",
    subcategories: ["Premium Plants"], tags: ["Luxury Gift", "Flowering", "Elegant"],
    description: "A refined flowering plant suitable for gifts, offices, and elegant home decoration.",
    price: 90.00, status: "In Stock", careLevel: "Moderate", lightLevel: "Bright Indirect Light", wateringLevel: "Every 7–10 days", size: "Medium",
    image: "https://images.unsplash.com/photo-1517457220556-9799291122ce?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_hoya", name: "Hoya", nameEnglish: "Hoya", nameArabic: "هويا", nameHebrew: "הויה", mainCategory: "Indoor Plants",
    subcategories: ["Premium Plants", "Hanging & Shelf Plants"], tags: ["Hanging", "Flowering", "Special Plant"],
    description: "A unique trailing plant with thick leaves and delicate clusters of flowers.",
    price: 55.00, status: "Low Stock", careLevel: "Easy", lightLevel: "Bright Indirect Light", wateringLevel: "Every 10–14 days", size: "Small / Medium",
    image: "/src/assets/indoor-plants/hoya.jpg"
  },
  {
    id: "plt_kentia", name: "Kentia Palm", nameEnglish: "Kentia Palm", nameArabic: "نخلة كنتيا", nameHebrew: "דקל קנציה", mainCategory: "Indoor Plants",
    subcategories: ["Premium Plants"], tags: ["Premium", "Large Plant", "Tropical"],
    description: "A luxurious indoor palm that adds height and elegance to large rooms and offices.",
    price: 150.00, status: "In Stock", careLevel: "Moderate", lightLevel: "Bright Indirect Light", wateringLevel: "Every 7–10 days", size: "Large",
    image: "https://images.unsplash.com/photo-1605553535260-2ff8ea9abeb7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_cactus", name: "Cactus", nameEnglish: "Cactus", nameArabic: "صبّار", nameHebrew: "קקטוסים", mainCategory: "Indoor Plants",
    subcategories: ["Small & Affordable"], tags: ["Small", "Low Water", "Affordable"],
    description: "A compact and low-maintenance plant suitable for desks and small spaces.",
    price: 25.00, status: "In Stock", careLevel: "Very Easy", lightLevel: "Bright Indirect Light", wateringLevel: "Every 21–30 days", size: "Small",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_succulent", name: "Succulent", nameEnglish: "Succulent", nameArabic: "سكولنت", nameHebrew: "סוקולנטים", mainCategory: "Indoor Plants",
    subcategories: ["Small & Affordable"], tags: ["Small", "Affordable", "Easy Care"],
    description: "A small decorative plant available in different shapes and colors.",
    price: 22.00, status: "In Stock", careLevel: "Very Easy", lightLevel: "Bright Indirect Light", wateringLevel: "Every 14–21 days", size: "Small",
    image: "https://images.unsplash.com/photo-1487798452839-c748a707a6b2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_aloe", name: "Aloe Vera", nameEnglish: "Aloe Vera", nameArabic: "ألوفيرا", nameHebrew: "אלוורה", mainCategory: "Indoor Plants",
    subcategories: ["Small & Affordable"], tags: ["Easy Care", "Small Plant", "Low Water"],
    description: "An easy-care plant with distinctive fleshy green leaves.",
    price: 28.00, status: "In Stock", careLevel: "Very Easy", lightLevel: "Bright Indirect Light", wateringLevel: "Every 14–21 days", size: "Small / Medium",
    image: "https://images.unsplash.com/photo-1596547609652-9cb5d8d85f83?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "plt_zebra", name: "Zebra Haworthia", nameEnglish: "Zebra Haworthia", nameArabic: "هاورثيا زيبرا", nameHebrew: "הוורתיה זברה", mainCategory: "Indoor Plants",
    subcategories: ["Small & Affordable"], tags: ["Small", "Decorative", "Affordable"],
    description: "A compact succulent with decorative striped leaves.",
    price: 20.00, status: "In Stock", careLevel: "Very Easy", lightLevel: "Bright Indirect Light", wateringLevel: "Every 14–21 days", size: "Small",
    image: "/src/assets/indoor-plants/zebra.jpg"
  },
  {
    id: "plt_kalanchoe", name: "Flowering Kalanchoe", nameEnglish: "Flowering Kalanchoe", nameArabic: "كلانشو مزهر", nameHebrew: "ניצנית", mainCategory: "Indoor Plants",
    subcategories: ["Small & Affordable"], tags: ["Flowering", "Gift", "Affordable"],
    description: "A small colorful flowering plant that is suitable as an affordable gift.",
    price: 30.00, status: "In Stock", careLevel: "Easy", lightLevel: "Bright Indirect Light", wateringLevel: "Every 10–14 days", size: "Small",
    image: "/src/assets/indoor-plants/kalanchoe.jpg"
  },
  {
    id: "plt_scandens", name: "Philodendron Scandens", nameEnglish: "Philodendron Scandens", nameArabic: "فيلوديندرون سكاندنس", nameHebrew: "פילודנדרון סקנדנס", mainCategory: "Indoor Plants",
    subcategories: ["Hanging & Shelf Plants"], tags: ["Hanging", "Easy Care"],
    description: "A trailing heart-leaf plant suitable for shelves and hanging baskets.",
    price: 35.00, status: "In Stock", careLevel: "Easy", lightLevel: "Flexible Light", wateringLevel: "Every 7–10 days", size: "Medium",
    image: "/src/assets/indoor-plants/philodendron_scandens.jpg"
  },
  {
    id: "plt_spider", name: "Spider Plant", nameEnglish: "Spider Plant", nameArabic: "نبات العنكبوت", nameHebrew: "כלורופיטום", mainCategory: "Indoor Plants",
    subcategories: ["Hanging & Shelf Plants"], tags: ["Hanging", "Easy Care", "Decorative"],
    description: "An easy-care plant with long striped leaves, suitable for hanging pots.",
    price: 28.00, status: "In Stock", careLevel: "Easy", lightLevel: "Flexible Light", wateringLevel: "Every 7–10 days", size: "Medium",
    image: "/src/assets/indoor-plants/spider_plant.jpg"
  },
  {
    id: "plt_fern", name: "Fern", nameEnglish: "Fern", nameArabic: "سرخس", nameHebrew: "שרך", mainCategory: "Indoor Plants",
    subcategories: ["Hanging & Shelf Plants"], tags: ["Hanging", "Soft Foliage", "Decorative"],
    description: "A soft green plant with full foliage that looks beautiful on shelves and in hanging pots.",
    price: 32.00, status: "In Stock", careLevel: "Moderate", lightLevel: "Low to Bright Indirect Light", wateringLevel: "Every 5–7 days", size: "Medium",
    image: "/src/assets/indoor-plants/fern.jpg"
  },

  // --- VASES & POTS (mainCategory: 'Vases') ---
  // 10 Plant Pots
  { id: "vase_pot_1", name: "Classic Terracotta Plant Pot", nameEnglish: "Classic Terracotta Plant Pot", mainCategory: "Vases", subcategories: ["Plant Pots"], price: 25.00, status: "In Stock", image: "/src/assets/vases/pot_terracotta.png", description: "Classic clay pot with a drainage hole.", material: "Terracotta" },
  { id: "vase_pot_2", name: "Minimalist White Ceramic Plant Pot", nameEnglish: "Minimalist White Ceramic Plant Pot", mainCategory: "Vases", subcategories: ["Plant Pots"], price: 45.00, status: "In Stock", image: "/src/assets/vases/pot_white.png", description: "Smooth matte white pot for modern interiors.", material: "Ceramic" },
  { id: "vase_pot_3", name: "Textured Beige Ceramic Plant Pot", nameEnglish: "Textured Beige Ceramic Plant Pot", mainCategory: "Vases", subcategories: ["Plant Pots"], price: 55.00, status: "In Stock", image: "/src/assets/vases/pot_beige.png", description: "Warm beige pot with a soft textured finish.", material: "Ceramic" },
  { id: "vase_pot_4", name: "Large Black Floor Plant Pot", nameEnglish: "Large Black Floor Plant Pot", mainCategory: "Vases", subcategories: ["Plant Pots"], price: 120.00, status: "In Stock", image: "/src/assets/vases/pot_black.png", description: "Tall black floor pot for large indoor plants.", material: "Fiberstone" },
  { id: "vase_pot_5", name: "Sage Green Plant Pot", nameEnglish: "Sage Green Plant Pot", mainCategory: "Vases", subcategories: ["Plant Pots"], price: 50.00, status: "In Stock", image: "/src/assets/vases/pot_sage.png", description: "Soft sage-green pot with a clean modern shape.", material: "Ceramic" },
  { id: "vase_pot_6", name: "Ribbed Cream Plant Pot", nameEnglish: "Ribbed Cream Plant Pot", mainCategory: "Vases", subcategories: ["Plant Pots"], price: 60.00, status: "In Stock", image: "/src/assets/vases/pot_ribbed.png", description: "Cream-colored pot with an elegant ribbed texture.", material: "Ceramic" },
  { id: "vase_pot_7", name: "Small Concrete Plant Pot", nameEnglish: "Small Concrete Plant Pot", mainCategory: "Vases", subcategories: ["Plant Pots"], price: 35.00, status: "In Stock", image: "/src/assets/vases/pot_concrete.png", description: "Compact concrete pot for small indoor plants.", material: "Concrete" },
  { id: "vase_pot_8", name: "Round White Fiberstone Pot", nameEnglish: "Round White Fiberstone Pot", mainCategory: "Vases", subcategories: ["Plant Pots"], price: 75.00, status: "In Stock", image: "/src/assets/vases/pot_fiberstone.png", description: "Lightweight white pot with a rounded design.", material: "Fiberstone" },
  { id: "vase_pot_9", name: "Natural Seagrass Plant Basket", nameEnglish: "Natural Seagrass Plant Basket", mainCategory: "Vases", subcategories: ["Plant Pots"], price: 65.00, status: "In Stock", image: "/src/assets/vases/pot_basket.png", description: "Woven decorative basket cover for indoor plant pots.", material: "Seagrass" },
  { id: "vase_pot_10", name: "Gold Metal Plant Pot", nameEnglish: "Gold Metal Plant Pot", mainCategory: "Vases", subcategories: ["Plant Pots"], price: 85.00, status: "In Stock", image: "/src/assets/vases/pot_gold.png", description: "Elegant gold-colored decorative plant pot.", material: "Metal" },

  // 10 Flower Vases
  { id: "vase_flw_1", name: "Clear Cylinder Glass Vase", nameEnglish: "Clear Cylinder Glass Vase", mainCategory: "Vases", subcategories: ["Flower Vases"], price: 35.00, status: "In Stock", image: "/src/assets/vases/vase_clear_cylinder.png", description: "Simple transparent cylinder vase for flower bouquets.", material: "Glass" },
  { id: "vase_flw_2", name: "Tall Clear Glass Vase", nameEnglish: "Tall Clear Glass Vase", mainCategory: "Vases", subcategories: ["Flower Vases"], price: 50.00, status: "In Stock", image: "/src/assets/vases/vase_tall_glass.png", description: "Tall slim vase suitable for long-stem flowers.", material: "Glass" },
  { id: "vase_flw_3", name: "Round Glass Bouquet Vase", nameEnglish: "Round Glass Bouquet Vase", mainCategory: "Vases", subcategories: ["Flower Vases"], price: 45.00, status: "In Stock", image: "/src/assets/vases/vase_round_glass.png", description: "Rounded transparent vase for medium bouquets.", material: "Glass" },
  // --- GIFT ADD-ONS (mainCategory: 'Gift Add-ons') ---
  { id: "gift_1", nameEnglish: "Artisan Chocolate Box", name: "Artisan Chocolate Box", mainCategory: "Gift Add-ons", subcategories: ["Chocolate"], category: "Chocolate", price: 35.00, status: "In Stock", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", description: "Handmade premium truffles (9 pcs)." },
  { id: "gift_2", nameEnglish: "Lavender Soy Candle", name: "Lavender Soy Candle", mainCategory: "Gift Add-ons", subcategories: ["Candle"], category: "Candle", price: 28.00, status: "In Stock", image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", description: "Relaxing lavender scent, 40h burn time." },
  { id: "gift_3", nameEnglish: "Plush Teddy Bear", name: "Plush Teddy Bear", mainCategory: "Gift Add-ons", subcategories: ["Teddy Bear"], category: "Teddy Bear", price: 22.00, status: "In Stock", image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", description: "Soft and cuddly brown teddy bear." }
];
