// Product, class, animal, gallery data — using real farm photos
const LOGO_URL = "assets/logo.png";

// Real photography
const P = {
  chickens:     "assets/photos/chickens.jpg",
  chickensWide: "assets/photos/chickens-flock.jpg",
  pig:          "assets/photos/pig-snout.jpg",
  pigWide:      "assets/photos/pig-snout-wide.jpg",
  piglets:      "assets/photos/piglets.jpg",
  pigletsHeld:  "assets/photos/piglets-held.jpg",
  sheep:        "assets/photos/sheep-pasture.jpg",
  sheepSunset:  "assets/photos/sheep-sunset.jpg",
  lamb:         "assets/photos/lamb.jpg",
  lambCarol:    "assets/photos/lamb-carol.jpg",
  cows:         "assets/photos/cows.jpg",
  calf:         "assets/photos/calf.jpg",
  jimCow:       "assets/photos/jim-cow.jpg",
  eggs:         "assets/photos/meat-compare.jpg",
  sourdough:    "assets/photos/sourdough-display.jpg",
  sourdoughSl:  "assets/photos/sourdough-sliced.jpg",
  bacon:        "assets/photos/bacon.jpg",
  peppers:      "assets/photos/peppers.jpg",
  farmSign:     "assets/photos/farm-sign.jpg",
  storeDoor:    "assets/photos/store-welcome.jpg",
  coop:         "assets/photos/coop.jpg",
  pastureSun:   "assets/photos/pasture-sunset.jpg",
  rainbow:      "assets/photos/rainbow-coop.jpg",
  cat:          "assets/photos/cat.jpg",
  pastureWalk:  "assets/photos/pasture-walk.jpg",
  classKitchen: "assets/photos/class-kitchen.jpg",
  portrait:     "assets/photos/jim-carol-selfie.jpg",
  portraitField:"assets/photos/jim-carol-field.jpg",
  portraitArt:  "assets/photos/jim-carol-portrait.jpg",
  poultryPacks: "assets/photos/poultry-packs.jpg",
  meatBundle:   "assets/photos/meat-bundle.jpg",
  blueberries:  "assets/photos/blueberries.jpg",
  honey:        "assets/photos/honey.jpg",
  butchering:   "assets/photos/butchering-class.jpg",
};

// Legacy aliases kept so existing page code keeps working
const IMG_CHIX     = P.chickens;
const IMG_PIGS     = P.pig;
const IMG_SHEEP    = P.sheep;
const IMG_FARM     = P.pastureSun;
const IMG_EGGS     = P.eggs;
const IMG_GARDEN   = P.peppers;
const IMG_BACON    = P.bacon;
const IMG_SOURDOUGH= P.sourdough;
const IMG_SAUSAGE  = P.meatBundle;
const IMG_PORK     = P.pigWide;
const IMG_PASTURE  = P.sheepSunset;
const IMG_STORE    = P.farmSign;
const IMG_PORTRAIT = P.portrait;

// Gallery — mix of crops, sizes, subjects
const GALLERY_URLS = [
  P.chickens, P.pig, P.sheepSunset, P.eggs, P.rainbow, P.farmSign,
  P.piglets, P.lambCarol, P.cows, P.sourdoughSl, P.bacon, P.peppers,
  P.coop, P.calf, P.cat, P.sourdough, P.chickensWide, P.storeDoor,
  P.lamb, P.pastureSun, P.jimCow, P.classKitchen, P.pastureWalk, P.honey,
];

const PRODUCTS = [
  { id: "whole-chicken", name: "Whole Chicken", cut: "Pasture Raised", price: 7.50, unit: "lb", tag: "Best Seller", imgUrl: P.poultryPacks },
  { id: "chicken-breast", name: "Boneless Breast", cut: "Pasture Raised · Chicken", price: 14.00, unit: "lb", tag: null, imgUrl: P.chickens },
  { id: "pork-chops", name: "Thick Cut Chops", cut: "Pasture Raised · Pork", price: 12.00, unit: "lb", tag: "Fresh", imgUrl: P.meatBundle },
  { id: "bacon", name: "Smoked Bacon", cut: "Pasture Raised · Pork", price: 14.00, unit: "lb", tag: null, imgUrl: P.bacon },
  { id: "ground-pork", name: "Ground Pork", cut: "Pasture Raised · Pork", price: 9.00, unit: "lb", tag: null, imgUrl: P.pigWide },
  { id: "sausage", name: "Breakfast Sausage", cut: "House Seasoned · Pork", price: 10.00, unit: "lb", tag: "House made", imgUrl: P.meatBundle },
  { id: "eggs", name: "Farm Eggs", cut: "Pasture Raised · Dozen", price: 7.00, unit: "dozen", tag: null, imgUrl: P.eggs },
  { id: "sourdough", name: "Country Sourdough", cut: "Baked Friday · Loaf", price: 9.00, unit: "loaf", tag: "Limited", imgUrl: P.sourdough },
];

const ANIMALS = [
  { id: "chickens", name: "The Flock", count: "200+ laying hens", cls: "a1", imgUrl: P.chickens },
  { id: "pigs", name: "Idaho Pasture Pigs", count: "Heritage breed", cls: "a2", imgUrl: P.piglets },
  { id: "sheep", name: "Katahdin Sheep", count: "Grass-fed flock", cls: "a3", imgUrl: P.sheep },
  { id: "eggs", name: "The Eggs", count: "Pasture raised, daily", cls: "a4", imgUrl: P.eggs },
  { id: "cows", name: "Belted Galloways", count: "Cattle & calves", cls: "a5", imgUrl: P.cows },
  { id: "farm", name: "The Farm", count: "Kenly, NC", cls: "a6", imgUrl: P.rainbow },
];

const CLASSES = [
  { date: [2026, 4, 25], month: "Apr", day: 25, name: "Sourdough from Scratch", time: "10:00 AM – 1:00 PM", seats: "6 spots left", price: 85, desc: "Build a starter, learn the shaping, leave with a loaf." },
  { date: [2026, 5, 2],  month: "May", day: 2,  name: "Backyard Chicken Basics", time: "9:00 AM – 11:30 AM", seats: "Open", price: 55, desc: "Breeds, coops, feed, predators. For first-time keepers." },
  { date: [2026, 5, 9],  month: "May", day: 9,  name: "Butchering a Whole Chicken", time: "1:00 PM – 4:00 PM", seats: "4 spots left", price: 95, desc: "Hands-on, take home what you process." },
  { date: [2026, 5, 16], month: "May", day: 16, name: "Pasture Walk & Farm Tour", time: "10:00 AM – 12:00 PM", seats: "Open", price: 20, desc: "Meet the animals, see the rotations, ask anything." },
  { date: [2026, 5, 30], month: "May", day: 30, name: "Putting Up the Harvest", time: "9:00 AM – 12:00 PM", seats: "8 spots left", price: 65, desc: "Water-bath canning, tomatoes and jam." },
];

const STOCK = [
  { name: "Whole Chickens", state: "in", tag: "In Stock" },
  { name: "Chicken Parts", state: "in", tag: "In Stock" },
  { name: "Pork Chops", state: "in", tag: "In Stock" },
  { name: "Bacon", state: "low", tag: "Running Low" },
  { name: "Ground Pork", state: "in", tag: "In Stock" },
  { name: "Breakfast Sausage", state: "in", tag: "In Stock" },
  { name: "Fresh Eggs", state: "in", tag: "In Stock" },
  { name: "Sourdough Bread", state: "low", tag: "Fri Only" },
  { name: "Raw Pet Milk", state: "in", tag: "In Stock" },
  { name: "Lamb (cuts)", state: "low", tag: "Limited" },
  { name: "Beef (cuts)", state: "in", tag: "In Stock" },
  { name: "Seasonal Produce", state: "out", tag: "Between Seasons" },
];

const GALLERY = GALLERY_URLS.map((url, i) => {
  const sizes = ["tall", "sq", "wide", "sq", "tall", "wide", "sq", "tall", "wide", "sq", "tall", "wide"];
  return { imgUrl: url, cls: sizes[i % sizes.length], label: `Farm life #${i+1}` };
});

const SCHED_DAYS = [5, 6];
const OPEN_HOURS = { start: 10, end: 14 };

function isOpenNow() {
  const d = new Date();
  const day = d.getDay();
  const h = d.getHours() + d.getMinutes() / 60;
  return SCHED_DAYS.includes(day) && h >= OPEN_HOURS.start && h < OPEN_HOURS.end;
}

function nextOpening() {
  const d = new Date();
  const day = d.getDay();
  const h = d.getHours() + d.getMinutes() / 60;
  if (SCHED_DAYS.includes(day) && h < OPEN_HOURS.end) {
    return h < OPEN_HOURS.start ? `Opens today at 10 AM` : `Open now · Closes at 2 PM`;
  }
  const daysAhead = ((5 - day + 7) % 7) || 7;
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const next = new Date(d); next.setDate(d.getDate() + daysAhead);
  return `Opens ${daysAhead === 1 ? "tomorrow" : names[next.getDay()]} at 10 AM`;
}

Object.assign(window, {
  PRODUCTS, ANIMALS, CLASSES, STOCK, GALLERY, GALLERY_URLS,
  LOGO_URL, P,
  IMG_CHIX, IMG_PIGS, IMG_SHEEP, IMG_FARM, IMG_EGGS, IMG_GARDEN, IMG_PORTRAIT, IMG_STORE, IMG_PASTURE, IMG_BACON, IMG_SOURDOUGH, IMG_SAUSAGE, IMG_PORK,
  isOpenNow, nextOpening,
});
