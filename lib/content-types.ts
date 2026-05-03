export type Address = { street: string; city: string; state: string; zip: string };
export type Hours = {
  days: number[];
  open: number;
  close: number;
  display: { label: string; value: string }[];
};
export type Product = {
  id: string;
  name: string;
  cut: string;
  price: number;
  unit: string;
  tag: string | null;
  image: string;
};
export type AnimalCls = "a1" | "a2" | "a3" | "a4" | "a5" | "a6";
export type Animal = {
  id: string;
  name: string;
  count: string;
  cls: AnimalCls;
  image: string;
};
export type ClassEvent = {
  id: string;
  date: string;
  month: string;
  day: number;
  name: string;
  time: string;
  seats: string;
  price: number;
  desc: string;
};
export type StockItem = { name: string; state: "in" | "low" | "out"; tag: string };
export type GalleryItem = { image: string; cls: "tall" | "sq" | "wide"; label: string };

export type SiteContent = {
  brand: {
    name: string;
    tagline: string;
    shortTagline: string;
    logoUrl: string;
    established: string;
  };
  contact: {
    phone: string;
    phoneHref: string;
    email: string;
    address: Address;
  };
  social: { facebook: string; instagram: string };
  shopLinks: { barn2door: string };
  hours: Hours;
  announce: { message: string; link: string; linkLabel: string };
  map: {
    lat: number;
    lng: number;
    zoom: number;
    pinLabel: string;
    directionsUrl: string;
  };
  hero: {
    titleVariant: string;
    heroVariant: string;
    eyebrow: string;
    subcopy: string;
    meta: { label: string; value: string }[];
  };
  homeStory: {
    eyebrow: string;
    heading: string;
    body: string[];
    signature: string;
    image: string;
  };
  homeQuote: { text: string; cite: string };
  homeCta: { eyebrow: string; heading: string; body: string };
  products: Product[];
  animals: Animal[];
  classes: ClassEvent[];
  stock: StockItem[];
  gallery: GalleryItem[];
  pages: {
    home: {
      farmStoreTitle: string;
      farmStoreHours: string;
      farmStoreMeta: { label: string; value: string }[];
    };
    animals: {
      title: string;
      lede: string;
      sections: { eyebrow: string; heading: string; body: string }[];
    };
    about: {
      title: string;
      lede: string;
      eyebrow: string;
      heading: string;
      body: string[];
      portrait: string;
      beliefs: { heading: string; body: string }[];
    };
    classes: { title: string; lede: string };
    farmStore: {
      title: string;
      lede: string;
      coolerHeading: string;
      coolerSub: string;
      heroImage: string;
      mapHeading: string;
      mapSectionNum: string;
    };
    contact: { title: string; lede: string };
    gallery: { title: string; lede: string };
  };
};
