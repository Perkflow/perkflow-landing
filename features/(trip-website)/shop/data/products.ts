import type {
  GiftCardProduct,
  GiftCardCategory,
  CategoryItem,
  TopNavItem,
  PaginationInfo,
} from "../types/shop";

export const ITEMS_PER_PAGE = 12;

export const giftCardProducts: GiftCardProduct[] = [
  {
    id: "1",
    slug: "zalando",
    name: "Zalando Gift Card",
    brandName: "Zalando",
    category: "fashion-lifestyle",
    image: "/shop/brands/zalando.svg",
    backgroundColor: "#000000",
    description: {
      en: "Shop the latest fashion trends with Zalando gift cards. Discover thousands of brands and styles for the whole family.",
      fr: "Achetez les dernières tendances mode avec les cartes cadeaux Zalando. Découvrez des milliers de marques et de styles pour toute la famille.",
    },
    denominations: [25, 50, 100, 200],
    currency: "EUR",
    featured: true,
  },
  {
    id: "2",
    slug: "nike",
    name: "Nike Gift Card",
    brandName: "Nike",
    category: "fashion-lifestyle",
    image: "/shop/brands/nike.svg",
    backgroundColor: "#FFFFFF",
    description: {
      en: "Get the latest Nike gear, shoes, and apparel. Perfect for athletes and fashion enthusiasts alike.",
      fr: "Obtenez les derniers équipements, chaussures et vêtements Nike. Parfait pour les athlètes et les passionnés de mode.",
    },
    denominations: [25, 50, 100, 150],
    currency: "EUR",
    featured: true,
  },
  {
    id: "3",
    slug: "alltricks",
    name: "Alltricks Gift Card",
    brandName: "Alltricks",
    category: "wellness-sport",
    image: "/shop/brands/alltricks.svg",
    backgroundColor: "#1A4D2E",
    description: {
      en: "Your destination for cycling, running and outdoor gear. Quality equipment for your active lifestyle.",
      fr: "Votre destination pour le vélo, la course et l'équipement outdoor. Des équipements de qualité pour votre style de vie actif.",
    },
    denominations: [50, 100, 200],
    currency: "EUR",
  },
  {
    id: "4",
    slug: "leroy-merlin",
    name: "Leroy Merlin Gift Card",
    brandName: "Leroy Merlin",
    category: "grocery",
    image: "/shop/brands/leroy-merlin.svg",
    backgroundColor: "#FFFFFF",
    description: {
      en: "Everything for your home improvement projects. From tools to décor, make your house a home.",
      fr: "Tout pour vos projets de bricolage. Des outils à la décoration, faites de votre maison un foyer.",
    },
    denominations: [25, 50, 100, 200, 500],
    currency: "EUR",
  },
  {
    id: "5",
    slug: "auchan",
    name: "Auchan Gift Card",
    brandName: "Auchan",
    category: "grocery",
    image: "/shop/brands/auchan.svg",
    backgroundColor: "#FFFFFF",
    description: {
      en: "Shop groceries, electronics, and more at Auchan. Quality products at great prices.",
      fr: "Faites vos courses alimentaires, électronique et plus chez Auchan. Des produits de qualité à petits prix.",
    },
    denominations: [20, 50, 100],
    currency: "EUR",
  },
  {
    id: "6",
    slug: "carrefour",
    name: "Carrefour Gift Card",
    brandName: "Carrefour",
    category: "grocery",
    image: "/shop/brands/carrefour.svg",
    backgroundColor: "#FFFFFF",
    description: {
      en: "France's leading retailer for groceries, household items, and more. Everything you need under one roof.",
      fr: "Le premier distributeur français pour l'alimentaire, les articles ménagers et plus encore. Tout ce dont vous avez besoin sous un même toit.",
    },
    denominations: [20, 50, 100, 150],
    currency: "EUR",
  },
  {
    id: "7",
    slug: "asos",
    name: "ASOS Gift Card",
    brandName: "ASOS",
    category: "fashion-lifestyle",
    image: "/shop/brands/asos.svg",
    backgroundColor: "#000000",
    description: {
      en: "Discover fashion online with ASOS. Over 850 brands and thousands of styles to choose from.",
      fr: "Découvrez la mode en ligne avec ASOS. Plus de 850 marques et des milliers de styles au choix.",
    },
    denominations: [25, 50, 100, 200],
    currency: "EUR",
    featured: true,
  },
  {
    id: "8",
    slug: "airbnb",
    name: "Airbnb Gift Card",
    brandName: "Airbnb",
    category: "travel-entertainment",
    image: "/shop/brands/airbnb.svg",
    backgroundColor: "#FF5A5F",
    description: {
      en: "Gift unique travel experiences. From cozy apartments to luxury villas, find the perfect stay anywhere in the world.",
      fr: "Offrez des expériences de voyage uniques. Des appartements cosy aux villas de luxe, trouvez le séjour parfait partout dans le monde.",
    },
    denominations: [50, 100, 200, 500],
    currency: "EUR",
    featured: true,
  },
  {
    id: "9",
    slug: "uber",
    name: "Uber Gift Card",
    brandName: "Uber",
    category: "travel-entertainment",
    image: "/shop/brands/uber.svg",
    backgroundColor: "#FFFFFF",
    description: {
      en: "Get rides or food delivery with Uber. Convenient transportation and meals at your fingertips.",
      fr: "Obtenez des trajets ou des livraisons de repas avec Uber. Transport et repas pratiques à portée de main.",
    },
    denominations: [25, 50, 100],
    currency: "EUR",
  },
  {
    id: "10",
    slug: "foot-locker",
    name: "Foot Locker Gift Card",
    brandName: "Foot Locker",
    category: "fashion-lifestyle",
    image: "/shop/brands/foot-locker.svg",
    backgroundColor: "#000000",
    description: {
      en: "The ultimate destination for sneakers and athletic wear. Find the latest drops from top brands.",
      fr: "La destination ultime pour les sneakers et les vêtements de sport. Trouvez les dernières sorties des meilleures marques.",
    },
    denominations: [25, 50, 100, 150],
    currency: "EUR",
  },
  {
    id: "11",
    slug: "evertreen",
    name: "Evertreen Gift Card",
    brandName: "Evertreen",
    category: "wellness-sport",
    image: "/shop/brands/evertreen.svg",
    backgroundColor: "#FFFFFF",
    description: {
      en: "Sustainable outdoor experiences and eco-friendly products. Connect with nature responsibly.",
      fr: "Expériences outdoor durables et produits éco-responsables. Connectez-vous à la nature de manière responsable.",
    },
    denominations: [25, 50, 100],
    currency: "EUR",
  },
  {
    id: "12",
    slug: "crazy-horse",
    name: "Crazy Horse Gift Card",
    brandName: "Crazy Horse",
    category: "travel-entertainment",
    image: "/shop/brands/crazy-horse.svg",
    backgroundColor: "#C41E3A",
    description: {
      en: "Experience the legendary Parisian cabaret. An unforgettable night of entertainment and glamour.",
      fr: "Vivez l'expérience du légendaire cabaret parisien. Une nuit inoubliable de divertissement et de glamour.",
    },
    denominations: [100, 200, 500],
    currency: "EUR",
  },
  {
    id: "13",
    slug: "amazon",
    name: "Amazon Gift Card",
    brandName: "Amazon",
    category: "grocery",
    image: "/shop/brands/amazon.svg",
    backgroundColor: "#232F3E",
    description: {
      en: "Shop millions of products on Amazon. From electronics to books, find everything you need.",
      fr: "Achetez des millions de produits sur Amazon. De l'électronique aux livres, trouvez tout ce dont vous avez besoin.",
    },
    denominations: [25, 50, 100, 200, 500],
    currency: "EUR",
    featured: true,
  },
  {
    id: "14",
    slug: "primark",
    name: "Primark Gift Card",
    brandName: "Primark",
    category: "fashion-lifestyle",
    image: "/shop/brands/primark.svg",
    backgroundColor: "#00A0D0",
    description: {
      en: "Affordable fashion for everyone. Trendy styles at unbeatable prices.",
      fr: "Mode abordable pour tous. Styles tendance à des prix imbattables.",
    },
    denominations: [15, 25, 50, 100],
    currency: "EUR",
  },
  {
    id: "15",
    slug: "steam",
    name: "Steam Gift Card",
    brandName: "Steam",
    category: "gaming",
    image: "/shop/brands/steam.svg",
    backgroundColor: "#1B2838",
    description: {
      en: "Access thousands of PC games on Steam. The ultimate platform for gamers.",
      fr: "Accédez à des milliers de jeux PC sur Steam. La plateforme ultime pour les joueurs.",
    },
    denominations: [20, 50, 100],
    currency: "EUR",
    featured: true,
  },
  {
    id: "16",
    slug: "playstation",
    name: "PlayStation Gift Card",
    brandName: "PlayStation",
    category: "gaming",
    image: "/shop/brands/playstation.svg",
    backgroundColor: "#003087",
    description: {
      en: "Buy games, add-ons, and subscriptions on PlayStation Store. Level up your gaming experience.",
      fr: "Achetez des jeux, des extensions et des abonnements sur PlayStation Store. Améliorez votre expérience de jeu.",
    },
    denominations: [20, 50, 100],
    currency: "EUR",
  },
  {
    id: "17",
    slug: "xbox",
    name: "Xbox Gift Card",
    brandName: "Xbox",
    category: "gaming",
    image: "/shop/brands/xbox.svg",
    backgroundColor: "#107C10",
    description: {
      en: "Get games, movies, and more from the Xbox Store. Entertainment for the whole family.",
      fr: "Obtenez des jeux, des films et plus encore sur le Xbox Store. Divertissement pour toute la famille.",
    },
    denominations: [15, 25, 50, 100],
    currency: "EUR",
  },
  {
    id: "18",
    slug: "mcdonalds",
    name: "McDonald's Gift Card",
    brandName: "McDonald's",
    category: "food-restaurant",
    image: "/shop/brands/mcdonalds.svg",
    backgroundColor: "#FFC72C",
    description: {
      en: "Enjoy your favorite McDonald's meals. From burgers to breakfast, treat yourself.",
      fr: "Savourez vos repas McDonald's préférés. Des burgers au petit-déjeuner, faites-vous plaisir.",
    },
    denominations: [10, 20, 50],
    currency: "EUR",
  },
  {
    id: "19",
    slug: "starbucks",
    name: "Starbucks Gift Card",
    brandName: "Starbucks",
    category: "food-restaurant",
    image: "/shop/brands/starbucks.svg",
    backgroundColor: "#00704A",
    description: {
      en: "Coffee, pastries, and more at Starbucks. Your daily caffeine fix awaits.",
      fr: "Café, pâtisseries et plus chez Starbucks. Votre dose quotidienne de caféine vous attend.",
    },
    denominations: [15, 25, 50],
    currency: "EUR",
  },
  {
    id: "20",
    slug: "decathlon",
    name: "Decathlon Gift Card",
    brandName: "Decathlon",
    category: "wellness-sport",
    image: "/shop/brands/decathlon.svg",
    backgroundColor: "#0082C3",
    description: {
      en: "Sports equipment for everyone. From beginners to pros, find gear for over 80 sports.",
      fr: "Équipement sportif pour tous. Des débutants aux pros, trouvez du matériel pour plus de 80 sports.",
    },
    denominations: [25, 50, 100, 200],
    currency: "EUR",
    featured: true,
  },
];

export const categories: CategoryItem[] = [
  { id: "all", labelKey: "categories.all" },
  { id: "fashion-lifestyle", labelKey: "categories.fashionLifestyle" },
  { id: "food-restaurant", labelKey: "categories.foodRestaurant" },
  { id: "gaming", labelKey: "categories.gaming" },
  { id: "grocery", labelKey: "categories.grocery" },
  { id: "travel-entertainment", labelKey: "categories.travelEntertainment" },
  { id: "wellness-sport", labelKey: "categories.wellnessSport" },
];

export const topNavCategories: TopNavItem[] = [
  { id: "gift-card", labelKey: "topNav.giftCard", icon: "Gift" },
  { id: "flights", labelKey: "topNav.flights", icon: "Plane" },
  { id: "experience", labelKey: "topNav.experience", icon: "Sparkles" },
  { id: "hotels", labelKey: "topNav.hotels", icon: "Building2" },
  { id: "gadgets", labelKey: "topNav.gadgets", icon: "Gadget" },
  { id: "mobile-topup", labelKey: "topNav.mobileTopup", icon: "Phone" },
];

export function getProductBySlug(slug: string): GiftCardProduct | undefined {
  return giftCardProducts.find((p) => p.slug === slug);
}

export function filterProducts(
  products: GiftCardProduct[],
  filters: { category: string; search: string }
): GiftCardProduct[] {
  return products.filter((product) => {
    const matchesCategory =
      filters.category === "all" || product.category === filters.category;
    const matchesSearch =
      !filters.search ||
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.brandName.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

export function paginateProducts(
  products: GiftCardProduct[],
  page: number,
  itemsPerPage: number = ITEMS_PER_PAGE
): { products: GiftCardProduct[]; pagination: PaginationInfo } {
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage,
    },
  };
}

export function getRelatedProducts(
  product: GiftCardProduct,
  limit: number = 4
): GiftCardProduct[] {
  return giftCardProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
