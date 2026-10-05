// SAMPLE LIBRARY for the Intent Clarifier prototype (430 entries).
//  - 30 research-deck photos (source: 'real') — metadata fixed; images from zip or unchanged
//  - ~393 Unsplash-backed photos (source: 'unsplash') — mock metadata from seed 42; JPEGs from build:library
//  - ~30 document entries (source: 'handmade-doc' | 'generated', src: null)
// NOTE: dates, locations, and tags are MOCK values for the demo (not from Unsplash).

export const REFERENCE_DATE = "2026-10-05"; // treat as "today" so relative timeline options stay stable

export type Photo = {
  id: string;
  kind: "photo" | "document";
  source: "real" | "unsplash" | "handmade-doc" | "generated";
  src: string | null;
  placeholder?: { hueA: number; hueB: number; emoji: string };
  alt: string;
  width: number;
  height: number;
  date: string;
  location: string;
  setting: "indoor" | "outdoor";
  hasPeople: boolean;
  peopleCount: number;
  photoType?: "selfie" | "portrait" | "group" | "candid";
  pose?: "smiling" | "serious" | "posing" | "action";
  animals: string[];
  objects: string[];
  timeOfDay?: "morning" | "afternoon" | "sunset" | "night";
  sky?: "clear" | "cloudy" | "foggy";
  colors: string[];
  docType?: "receipt" | "id" | "ticket" | "note" | "screenshot" | "slides";
  textContent?: Array<"name" | "number" | "date" | "address">;
  language?: string;
  unsplashCredit?: { photoId: string; photographer: string; profileUrl: string; photoUrl: string };
};

export const photos: Photo[] = [
 {
  "id": "p01",
  "kind": "photo",
  "src": "/photos/photo-01.jpg",
  "alt": "White poodle sitting on grass in a forest",
  "width": 900,
  "height": 1350,
  "date": "2026-08-09",
  "location": "Mumbai, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "dog"
  ],
  "objects": [
   "poodle",
   "tree",
   "grass"
  ],
  "colors": [
   "green",
   "white",
   "brown"
  ],
  "source": "real"
 },
 {
  "id": "p02",
  "kind": "photo",
  "src": "/photos/photo-02.jpg",
  "alt": "Taipei 101 tower and city skyline under a cloudy blue sky",
  "width": 900,
  "height": 600,
  "date": "2026-03-14",
  "location": "Taipei, Taiwan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "skyscraper",
   "Taipei 101",
   "skyline",
   "city"
  ],
  "colors": [
   "teal",
   "blue"
  ],
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "source": "real"
 },
 {
  "id": "p03",
  "kind": "photo",
  "src": "/photos/photo-03.jpg",
  "alt": "Two adults smiling down at a swaddled newborn by a window",
  "width": 900,
  "height": 1350,
  "date": "2026-06-21",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "baby",
   "window",
   "world map"
  ],
  "colors": [
   "white",
   "grey"
  ],
  "photoType": "candid",
  "pose": "smiling",
  "source": "real"
 },
 {
  "id": "p04",
  "kind": "photo",
  "src": "/photos/photo-04.jpg",
  "alt": "Large black fragmented sphere sculpture in a white gallery",
  "width": 900,
  "height": 506,
  "date": "2026-01-18",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sculpture",
   "art installation",
   "gallery"
  ],
  "colors": [
   "black",
   "white"
  ],
  "source": "real"
 },
 {
  "id": "p05",
  "kind": "photo",
  "src": "/photos/photo-05.jpg",
  "alt": "Surfer silhouetted against a golden sunset over waves",
  "width": 900,
  "height": 1350,
  "date": "2026-05-02",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "surfboard",
   "beach",
   "waves",
   "sea"
  ],
  "colors": [
   "gold",
   "orange"
  ],
  "photoType": "candid",
  "pose": "action",
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "source": "real"
 },
 {
  "id": "p06",
  "kind": "photo",
  "src": "/photos/photo-06.jpg",
  "alt": "Colourful flower bouquet overflowing a dark wheelie bin",
  "width": 900,
  "height": 1125,
  "date": "2026-04-11",
  "location": "Mumbai, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "flowers",
   "trash bin",
   "bouquet"
  ],
  "colors": [
   "multicolour",
   "grey",
   "white"
  ],
  "timeOfDay": "afternoon",
  "source": "real"
 },
 {
  "id": "p07",
  "kind": "photo",
  "src": "/photos/photo-07.jpg",
  "alt": "Dirt forest path with autumn trees",
  "width": 900,
  "height": 1350,
  "date": "2026-10-02",
  "location": "Vancouver Island, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "forest",
   "trail",
   "trees",
   "autumn leaves"
  ],
  "colors": [
   "green",
   "brown",
   "orange"
  ],
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "source": "real"
 },
 {
  "id": "p08",
  "kind": "photo",
  "src": "/photos/photo-08.jpg",
  "alt": "Silhouette of a hand drawing a heart on a fogged window",
  "width": 900,
  "height": 600,
  "date": "2026-07-19",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "window",
   "fog",
   "heart drawing"
  ],
  "colors": [
   "black",
   "grey",
   "gold"
  ],
  "photoType": "candid",
  "pose": "action",
  "sky": "foggy",
  "source": "real"
 },
 {
  "id": "p09",
  "kind": "photo",
  "src": "/photos/photo-09.jpg",
  "alt": "Studio portrait with braided updo, red top, yellow background",
  "width": 900,
  "height": 1199,
  "date": "2026-02-27",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "earrings",
   "braids",
   "red top"
  ],
  "colors": [
   "yellow",
   "red",
   "black"
  ],
  "photoType": "portrait",
  "pose": "posing",
  "source": "real"
 },
 {
  "id": "p10",
  "kind": "photo",
  "src": "/photos/photo-10.jpg",
  "alt": "Calm lake with a small tree on a rock, forested hills, lily pads",
  "width": 900,
  "height": 1350,
  "date": "2026-10-02",
  "location": "Vancouver Island, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "pine forest",
   "hills",
   "lily pads"
  ],
  "colors": [
   "blue",
   "green",
   "grey"
  ],
  "timeOfDay": "morning",
  "sky": "clear",
  "source": "real"
 },
 {
  "id": "p11",
  "kind": "photo",
  "src": "/photos/photo-11.jpg",
  "alt": "View of a lighthouse and boat through a white-framed door",
  "width": 900,
  "height": 1139,
  "date": "2026-08-22",
  "location": "Michigan, USA",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lighthouse",
   "door",
   "boat",
   "water",
   "railing"
  ],
  "colors": [
   "white",
   "blue",
   "dark green"
  ],
  "timeOfDay": "afternoon",
  "sky": "clear",
  "source": "real"
 },
 {
  "id": "p12",
  "kind": "photo",
  "src": "/photos/photo-12.jpg",
  "alt": "Couple embracing on a platform as a train blurs past",
  "width": 900,
  "height": 675,
  "date": "2025-07-12",
  "location": "Zurich, Switzerland",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "train",
   "platform",
   "backpack"
  ],
  "colors": [
   "beige",
   "blue"
  ],
  "photoType": "candid",
  "pose": "posing",
  "timeOfDay": "afternoon",
  "source": "real"
 },
 {
  "id": "p13",
  "kind": "photo",
  "src": "/photos/photo-13.jpg",
  "alt": "Black-and-white portrait of a bearded person",
  "width": 900,
  "height": 1334,
  "date": "2026-03-30",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "beard",
   "black and white"
  ],
  "colors": [
   "black",
   "white",
   "grey"
  ],
  "photoType": "portrait",
  "pose": "serious",
  "source": "real"
 },
 {
  "id": "p14",
  "kind": "photo",
  "src": "/photos/photo-14.jpg",
  "alt": "Shop corner with patchwork tote bags, books, plant and bench",
  "width": 900,
  "height": 1350,
  "date": "2026-09-12",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "tote bags",
   "books",
   "plant",
   "bench",
   "shop"
  ],
  "colors": [
   "white",
   "orange",
   "green"
  ],
  "source": "real"
 },
 {
  "id": "p15",
  "kind": "photo",
  "src": "/photos/photo-15.jpg",
  "alt": "Five friends posing playfully in a line under a stone archway",
  "width": 900,
  "height": 735,
  "date": "2025-08-23",
  "location": "Glasgow, UK",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 5,
  "animals": [],
  "objects": [
   "archway",
   "university building"
  ],
  "colors": [
   "grey",
   "stone",
   "green"
  ],
  "photoType": "group",
  "pose": "action",
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "source": "real"
 },
 {
  "id": "p16",
  "kind": "photo",
  "src": "/photos/photo-16.jpg",
  "alt": "Lone chair standing in shallow water at a pastel dusk",
  "width": 900,
  "height": 1351,
  "date": "2025-09-06",
  "location": "Lake Tuz, Turkey",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "chair",
   "reflection",
   "salt flat",
   "water"
  ],
  "colors": [
   "peach",
   "pink",
   "grey"
  ],
  "timeOfDay": "sunset",
  "sky": "clear",
  "source": "real"
 },
 {
  "id": "p17",
  "kind": "photo",
  "src": "/photos/photo-17.jpg",
  "alt": "Portrait with cropped bleached hair, black turtleneck, orange background",
  "width": 900,
  "height": 1350,
  "date": "2026-05-17",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "turtleneck",
   "earring"
  ],
  "colors": [
   "orange",
   "black"
  ],
  "photoType": "portrait",
  "pose": "posing",
  "source": "real"
 },
 {
  "id": "p18",
  "kind": "photo",
  "src": "/photos/photo-18.jpg",
  "alt": "Blurred abstract of a setting sun over water",
  "width": 900,
  "height": 1350,
  "date": "2026-05-03",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sun",
   "sea",
   "water",
   "abstract"
  ],
  "colors": [
   "orange",
   "teal",
   "blue"
  ],
  "timeOfDay": "sunset",
  "sky": "clear",
  "source": "real"
 },
 {
  "id": "p19",
  "kind": "photo",
  "src": "/photos/photo-19.jpg",
  "alt": "Graduate in cap and gown jumping mid-air above a brick wall",
  "width": 900,
  "height": 1350,
  "date": "2026-06-08",
  "location": "Boulder, USA",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "graduation cap",
   "gown",
   "brick wall"
  ],
  "colors": [
   "navy",
   "red",
   "grey"
  ],
  "photoType": "candid",
  "pose": "action",
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "source": "real"
 },
 {
  "id": "p20",
  "kind": "photo",
  "src": "/photos/photo-20.jpg",
  "alt": "Historic stone buildings on a city street corner",
  "width": 900,
  "height": 1350,
  "date": "2026-10-01",
  "location": "Montreal, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "building",
   "street",
   "hotel",
   "cars"
  ],
  "colors": [
   "beige",
   "grey"
  ],
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "source": "real"
 },
 {
  "id": "p21",
  "kind": "photo",
  "src": "/photos/photo-21.jpg",
  "alt": "Passport-style headshot of a person with glasses on a red background",
  "width": 900,
  "height": 1200,
  "date": "2026-02-09",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "passport photo",
   "glasses",
   "white top"
  ],
  "colors": [
   "red",
   "white",
   "black"
  ],
  "photoType": "portrait",
  "pose": "serious",
  "source": "real"
 },
 {
  "id": "p22",
  "kind": "photo",
  "src": "/photos/photo-22.jpg",
  "alt": "Four friends laughing and high-fiving over tea by a window",
  "width": 900,
  "height": 1350,
  "date": "2026-01-25",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 4,
  "animals": [],
  "objects": [
   "tea",
   "teapot",
   "mugs",
   "window"
  ],
  "colors": [
   "white",
   "green",
   "grey"
  ],
  "photoType": "group",
  "pose": "smiling",
  "timeOfDay": "morning",
  "source": "real"
 },
 {
  "id": "p23",
  "kind": "photo",
  "src": "/photos/photo-23.jpg",
  "alt": "Oil painting of billowing clouds",
  "width": 900,
  "height": 785,
  "date": "2025-12-14",
  "location": "Paris, France",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "painting",
   "clouds",
   "oil painting"
  ],
  "colors": [
   "blue",
   "beige",
   "grey"
  ],
  "sky": "cloudy",
  "source": "real"
 },
 {
  "id": "p24",
  "kind": "photo",
  "src": "/photos/photo-24.jpg",
  "alt": "Uprooted fallen tree beside a house after a storm",
  "width": 900,
  "height": 600,
  "date": "2026-07-26",
  "location": "Mumbai, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "uprooted tree",
   "roots",
   "house",
   "storm damage"
  ],
  "colors": [
   "brown",
   "green",
   "grey"
  ],
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "source": "real"
 },
 {
  "id": "p25",
  "kind": "photo",
  "src": "/photos/photo-25.jpg",
  "alt": "Close-up portrait of a Jack Russell terrier on pink background",
  "width": 900,
  "height": 600,
  "date": "2026-09-20",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "dog"
  ],
  "objects": [
   "dog",
   "pet portrait"
  ],
  "colors": [
   "pink",
   "black",
   "tan"
  ],
  "source": "real"
 },
 {
  "id": "p26",
  "kind": "photo",
  "src": "/photos/photo-26.jpg",
  "alt": "Wildflower meadow with pines and a stormy sunset sky",
  "width": 900,
  "height": 600,
  "date": "2026-06-10",
  "location": "Colorado, USA",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "meadow",
   "wildflowers",
   "pine trees",
   "mountains"
  ],
  "colors": [
   "green",
   "yellow",
   "purple"
  ],
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "source": "real"
 },
 {
  "id": "p27",
  "kind": "photo",
  "src": "/photos/photo-27.jpg",
  "alt": "Group celebrating Diwali with sparklers, marigold garlands and diyas",
  "width": 900,
  "height": 1349,
  "date": "2025-10-20",
  "location": "Mumbai, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 6,
  "animals": [],
  "objects": [
   "sparklers",
   "marigold garlands",
   "diyas",
   "festival"
  ],
  "colors": [
   "red",
   "yellow",
   "orange"
  ],
  "photoType": "group",
  "pose": "smiling",
  "timeOfDay": "night",
  "source": "real"
 },
 {
  "id": "p28",
  "kind": "photo",
  "src": "/photos/photo-28.jpg",
  "alt": "Black-and-white portrait of a person looking downward",
  "width": 900,
  "height": 1125,
  "date": "2026-04-05",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "black and white",
   "long hair"
  ],
  "colors": [
   "black",
   "white"
  ],
  "photoType": "portrait",
  "pose": "serious",
  "source": "real"
 },
 {
  "id": "p29",
  "kind": "photo",
  "src": "/photos/photo-29.jpg",
  "alt": "Adjustable wrench on a light grey background",
  "width": 900,
  "height": 1350,
  "date": "2026-09-05",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "wrench",
   "tool"
  ],
  "colors": [
   "grey",
   "silver"
  ],
  "source": "real"
 },
 {
  "id": "p30",
  "kind": "photo",
  "src": "/photos/photo-30.jpg",
  "alt": "Harbour with boats, stadium and city skyline under clear blue sky",
  "width": 900,
  "height": 675,
  "date": "2026-10-03",
  "location": "Vancouver, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "harbour",
   "boat",
   "stadium",
   "skyline",
   "water"
  ],
  "colors": [
   "blue",
   "white"
  ],
  "timeOfDay": "afternoon",
  "sky": "clear",
  "source": "real"
 },
 {
  "id": "d01",
  "kind": "document",
  "src": null,
  "alt": "Hotel receipt (itemised bill)",
  "width": 900,
  "height": 1200,
  "date": "2026-10-01",
  "location": "Montreal, Canada",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "docType": "receipt",
  "textContent": [
   "number",
   "date"
  ],
  "language": "English",
  "source": "handmade-doc"
 },
 {
  "id": "d02",
  "kind": "document",
  "src": null,
  "alt": "Restaurant receipt",
  "width": 900,
  "height": 1200,
  "date": "2026-08-14",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "docType": "receipt",
  "textContent": [
   "number",
   "date"
  ],
  "language": "English",
  "source": "handmade-doc"
 },
 {
  "id": "d03",
  "kind": "document",
  "src": null,
  "alt": "Train ticket",
  "width": 900,
  "height": 1200,
  "date": "2025-07-12",
  "location": "Zurich, Switzerland",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "docType": "ticket",
  "textContent": [
   "date",
   "number"
  ],
  "language": "German",
  "source": "handmade-doc"
 },
 {
  "id": "d04",
  "kind": "document",
  "src": null,
  "alt": "Student ID card",
  "width": 900,
  "height": 1200,
  "date": "2026-02-09",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "docType": "id",
  "textContent": [
   "name",
   "number"
  ],
  "language": "English",
  "source": "handmade-doc"
 },
 {
  "id": "d05",
  "kind": "document",
  "src": null,
  "alt": "Handwritten note",
  "width": 900,
  "height": 1200,
  "date": "2026-09-18",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "docType": "note",
  "textContent": [
   "name",
   "address"
  ],
  "language": "English",
  "source": "handmade-doc"
 },
 {
  "id": "d06",
  "kind": "document",
  "src": null,
  "alt": "Phone screenshot of a booking confirmation",
  "width": 900,
  "height": 1200,
  "date": "2026-09-29",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "docType": "screenshot",
  "textContent": [
   "date",
   "name"
  ],
  "language": "English",
  "source": "handmade-doc"
 },
 {
  "id": "d07",
  "kind": "document",
  "src": null,
  "alt": "Whiteboard / slide photo from a meeting",
  "width": 900,
  "height": 1200,
  "date": "2026-09-10",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "docType": "slides",
  "textContent": [
   "name"
  ],
  "language": "English",
  "source": "handmade-doc"
 },
 {
  "id": "g001",
  "kind": "photo",
  "src": "/photos/g001.jpg",
  "alt": "Lake scene: lake, water, forest",
  "width": 4000,
  "height": 6000,
  "date": "2026-10-04",
  "location": "Vancouver Island, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "forest"
  ],
  "colors": [
   "teal",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 15,
   "hueB": 45,
   "emoji": "🏞️"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "UOk556hi1-8",
   "photographer": "Max Andrey",
   "profileUrl": "https://unsplash.com/@maxandrey",
   "photoUrl": "https://unsplash.com/photos/body-of-water-UOk556hi1-8"
  }
 },
 {
  "id": "g002",
  "kind": "photo",
  "src": "/photos/g002.jpg",
  "alt": "Lake scene: lake, water, kayak",
  "width": 4000,
  "height": 6000,
  "date": "2026-10-04",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "kayak"
  ],
  "colors": [
   "white",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 321,
   "hueB": 25,
   "emoji": "🏞️"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "9HVPZBDkYZc",
   "photographer": "Miguel Alcântara",
   "profileUrl": "https://unsplash.com/@miguelalcantara",
   "photoUrl": "https://unsplash.com/photos/green-water-with-water-droplets-9HVPZBDkYZc"
  }
 },
 {
  "id": "g003",
  "kind": "photo",
  "src": "/photos/g003.jpg",
  "alt": "Trek scene: forest",
  "width": 2666,
  "height": 4000,
  "date": "2026-10-04",
  "location": "Kasol, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "forest"
  ],
  "colors": [
   "teal",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 78,
   "hueB": 115,
   "emoji": "🥾"
  },
  "timeOfDay": "morning",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "Z3NceSeZqgI",
   "photographer": "Federico Bottos",
   "profileUrl": "https://unsplash.com/@landscapeplaces",
   "photoUrl": "https://unsplash.com/photos/aerial-photography-of-pine-trees-Z3NceSeZqgI"
  }
 },
 {
  "id": "g004",
  "kind": "photo",
  "src": "/photos/g004.jpg",
  "alt": "Food scene: coffee",
  "width": 4480,
  "height": 6720,
  "date": "2026-10-04",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "coffee"
  ],
  "colors": [
   "orange",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 286,
   "hueB": 338,
   "emoji": "🍜"
  },
  "unsplashCredit": {
   "photoId": "zEdCT0qrodE",
   "photographer": "Nathan Dumlao",
   "profileUrl": "https://unsplash.com/@nate_dumlao",
   "photoUrl": "https://unsplash.com/photos/cafe-late-on-table-zEdCT0qrodE"
  }
 },
 {
  "id": "g005",
  "kind": "photo",
  "src": "/photos/g005.jpg",
  "alt": "Lake scene: lake, water, forest",
  "width": 3024,
  "height": 4032,
  "date": "2026-10-03",
  "location": "Vancouver Island, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "forest"
  ],
  "colors": [
   "grey",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 332,
   "hueB": 41,
   "emoji": "🏞️"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "ddPOHBElCRY",
   "photographer": "Raunaq Patel",
   "profileUrl": "https://unsplash.com/@raunaqpatel",
   "photoUrl": "https://unsplash.com/photos/green-trees-beside-body-of-water-during-daytime-ddPOHBElCRY"
  }
 },
 {
  "id": "g006",
  "kind": "photo",
  "src": "/photos/g006.jpg",
  "alt": "Lake scene: lake, water, reflection",
  "width": 4000,
  "height": 6000,
  "date": "2026-10-03",
  "location": "Whistler, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "reflection"
  ],
  "colors": [
   "blue",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 161,
   "hueB": 211,
   "emoji": "🏞️"
  },
  "timeOfDay": "morning",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "9HVPZBDkYZc",
   "photographer": "Miguel Alcântara",
   "profileUrl": "https://unsplash.com/@miguelalcantara",
   "photoUrl": "https://unsplash.com/photos/green-water-with-water-droplets-9HVPZBDkYZc"
  }
 },
 {
  "id": "g007",
  "kind": "photo",
  "src": "/photos/g007.jpg",
  "alt": "Food scene: table",
  "width": 2000,
  "height": 3000,
  "date": "2026-10-03",
  "location": "Jaipur, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "table"
  ],
  "colors": [
   "orange",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 356,
   "hueB": 54,
   "emoji": "🍜"
  },
  "unsplashCredit": {
   "photoId": "ZPl1v83Im_I",
   "photographer": "hesam Link",
   "profileUrl": "https://unsplash.com/@hesamjr",
   "photoUrl": "https://unsplash.com/photos/a-clock-sitting-on-top-of-a-wooden-table-ZPl1v83Im_I"
  }
 },
 {
  "id": "g008",
  "kind": "photo",
  "src": "/photos/g008.jpg",
  "alt": "Waterfall scene: water, rocks",
  "width": 1977,
  "height": 2768,
  "date": "2026-10-03",
  "location": "Coorg, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "water",
   "rocks"
  ],
  "colors": [
   "orange",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 271,
   "hueB": 322,
   "emoji": "💧"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "kv4jhoght-I",
   "photographer": "Andy Sherk",
   "profileUrl": "https://unsplash.com/@sherkware",
   "photoUrl": "https://unsplash.com/photos/rocky-river-landscape-kv4jhoght-I"
  }
 },
 {
  "id": "g009",
  "kind": "photo",
  "src": "/photos/g009.jpg",
  "alt": "Lake scene: lake, water, boat",
  "width": 2453,
  "height": 3679,
  "date": "2026-10-02",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "boat"
  ],
  "colors": [
   "green",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 325,
   "hueB": 0,
   "emoji": "🏞️"
  },
  "timeOfDay": "sunset",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "-6YVJEsoEdE",
   "photographer": "Aman Upadhyay",
   "profileUrl": "https://unsplash.com/@iaman_upadhyay",
   "photoUrl": "https://unsplash.com/photos/person-riding-on-blue-kayak-on-body-of-water-during-daytime--6YVJEsoEdE"
  }
 },
 {
  "id": "g010",
  "kind": "photo",
  "src": "/photos/g010.jpg",
  "alt": "Group photo of 4 people",
  "width": 4016,
  "height": 5355,
  "date": "2026-10-02",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 4,
  "animals": [],
  "objects": [
   "cake"
  ],
  "colors": [
   "brown",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 5,
   "hueB": 46,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "serious",
  "unsplashCredit": {
   "photoId": "Zqh5l1JWs5M",
   "photographer": "LAUREN GRAY",
   "profileUrl": "https://unsplash.com/@laurenagray",
   "photoUrl": "https://unsplash.com/photos/baking-ingredients-with-flour-and-eggs-Zqh5l1JWs5M"
  }
 },
 {
  "id": "g011",
  "kind": "photo",
  "src": "/photos/g011.jpg",
  "alt": "Lake scene: lake, water, boat",
  "width": 3688,
  "height": 5705,
  "date": "2026-10-01",
  "location": "Vancouver Island, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "boat"
  ],
  "colors": [
   "white",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 3,
   "hueB": 38,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "HAjn6vN1rN8",
   "photographer": "Harshit Sood",
   "profileUrl": "https://unsplash.com/@hiddendepths__",
   "photoUrl": "https://unsplash.com/photos/sea-near-the-jungle-during-daytime-HAjn6vN1rN8"
  }
 },
 {
  "id": "g012",
  "kind": "photo",
  "src": "/photos/g012.jpg",
  "alt": "Lake scene: lake, water, reflection",
  "width": 2358,
  "height": 2946,
  "date": "2026-10-01",
  "location": "Vancouver Island, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "reflection"
  ],
  "colors": [
   "grey",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 172,
   "hueB": 203,
   "emoji": "🏞️"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "hFfHREFLbhU",
   "photographer": "Tamara Bitter",
   "profileUrl": "https://unsplash.com/@tamofoto",
   "photoUrl": "https://unsplash.com/photos/a-bird-flying-over-a-body-of-water-hFfHREFLbhU"
  }
 },
 {
  "id": "g013",
  "kind": "photo",
  "src": "/photos/g013.jpg",
  "alt": "Lake scene: lake, water, mountains",
  "width": 3688,
  "height": 5705,
  "date": "2026-10-01",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "mountains"
  ],
  "colors": [
   "white",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 22,
   "hueB": 76,
   "emoji": "🏞️"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "HAjn6vN1rN8",
   "photographer": "Harshit Sood",
   "profileUrl": "https://unsplash.com/@hiddendepths__",
   "photoUrl": "https://unsplash.com/photos/sea-near-the-jungle-during-daytime-HAjn6vN1rN8"
  }
 },
 {
  "id": "g014",
  "kind": "photo",
  "src": "/photos/g014.jpg",
  "alt": "Beach scene: sea",
  "width": 2232,
  "height": 2976,
  "date": "2026-10-01",
  "location": "Gokarna, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sea"
  ],
  "colors": [
   "grey",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 285,
   "hueB": 336,
   "emoji": "🏖️"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "Adl90-aXYwA",
   "photographer": "Kees Streefkerk",
   "profileUrl": "https://unsplash.com/@kees_streefkerk",
   "photoUrl": "https://unsplash.com/photos/empty-seashore-Adl90-aXYwA"
  }
 },
 {
  "id": "g015",
  "kind": "photo",
  "src": "/photos/g015.jpg",
  "alt": "Snow scene: pine trees",
  "width": 3456,
  "height": 5184,
  "date": "2026-10-01",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "pine trees"
  ],
  "colors": [
   "blue",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 242,
   "hueB": 312,
   "emoji": "❄️"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "yJ1EUSifz_w",
   "photographer": "Nenad Kaevik",
   "profileUrl": "https://unsplash.com/@nenadkaevik",
   "photoUrl": "https://unsplash.com/photos/green-pine-tree-in-close-up-photography-yJ1EUSifz_w"
  }
 },
 {
  "id": "g016",
  "kind": "photo",
  "src": "/photos/g016.jpg",
  "alt": "Sunset scene: sunset, mountains",
  "width": 4160,
  "height": 6240,
  "date": "2026-10-01",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "mountains"
  ],
  "colors": [
   "brown",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 63,
   "hueB": 111,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "pfywsjCLzKQ",
   "photographer": "Daniel J. Schwarz",
   "profileUrl": "https://unsplash.com/@danieljschwarz",
   "photoUrl": "https://unsplash.com/photos/snow-covered-mountain-under-cloudy-sky-during-daytime-pfywsjCLzKQ"
  }
 },
 {
  "id": "g017",
  "kind": "photo",
  "src": "/photos/g017.jpg",
  "alt": "Selfie of 2 people at a food scene",
  "width": 4480,
  "height": 6720,
  "date": "2026-10-01",
  "location": "Zurich, Switzerland",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "cafe"
  ],
  "colors": [
   "green",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 85,
   "hueB": 144,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "R_5bQWAf8p0",
   "photographer": "Nathan Dumlao",
   "profileUrl": "https://unsplash.com/@nate_dumlao",
   "photoUrl": "https://unsplash.com/photos/close-up-photo-of-flat-screen-monitor-turned-and-displaying-cooked-food-R_5bQWAf8p0"
  }
 },
 {
  "id": "g018",
  "kind": "photo",
  "src": "/photos/g018.jpg",
  "alt": "Portrait of 1 person at a beach scene",
  "width": 3024,
  "height": 4032,
  "date": "2026-10-01",
  "location": "Gokarna, Karnataka",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "sea",
   "sand"
  ],
  "colors": [
   "green",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 117,
   "hueB": 168,
   "emoji": "🙂"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "photoType": "portrait",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "lm1V1Emb7cY",
   "photographer": "Mari A",
   "profileUrl": "https://unsplash.com/@marikoa888",
   "photoUrl": "https://unsplash.com/photos/a-close-up-of-a-beach-lm1V1Emb7cY"
  }
 },
 {
  "id": "g019",
  "kind": "document",
  "src": null,
  "alt": "ID / card",
  "width": 900,
  "height": 1200,
  "date": "2026-10-01",
  "location": "Hampi, Karnataka",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "id",
  "textContent": [
   "name",
   "number"
  ],
  "language": "German"
 },
 {
  "id": "g020",
  "kind": "photo",
  "src": "/photos/g020.jpg",
  "alt": "Lake scene: lake, water, boat",
  "width": 3024,
  "height": 4032,
  "date": "2026-09-30",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "boat"
  ],
  "colors": [
   "grey",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 148,
   "hueB": 178,
   "emoji": "🏞️"
  },
  "timeOfDay": "morning",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "ddPOHBElCRY",
   "photographer": "Raunaq Patel",
   "profileUrl": "https://unsplash.com/@raunaqpatel",
   "photoUrl": "https://unsplash.com/photos/green-trees-beside-body-of-water-during-daytime-ddPOHBElCRY"
  }
 },
 {
  "id": "g021",
  "kind": "photo",
  "src": "/photos/g021.jpg",
  "alt": "Flowers scene: leaves",
  "width": 4000,
  "height": 6000,
  "date": "2026-09-30",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "leaves"
  ],
  "colors": [
   "green",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 338,
   "hueB": 21,
   "emoji": "🌸"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "049M_crau5k",
   "photographer": "Rodion Kutsaiev",
   "profileUrl": "https://unsplash.com/@frostroomhead",
   "photoUrl": "https://unsplash.com/photos/closeup-photo-of-green-leafed-plant-049M_crau5k"
  }
 },
 {
  "id": "g022",
  "kind": "photo",
  "src": "/photos/g022.jpg",
  "alt": "Lake scene: lake, water, mountains",
  "width": 3024,
  "height": 4032,
  "date": "2026-09-29",
  "location": "Vancouver Island, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "mountains"
  ],
  "colors": [
   "white",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 114,
   "hueB": 147,
   "emoji": "🏞️"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "ddPOHBElCRY",
   "photographer": "Raunaq Patel",
   "profileUrl": "https://unsplash.com/@raunaqpatel",
   "photoUrl": "https://unsplash.com/photos/green-trees-beside-body-of-water-during-daytime-ddPOHBElCRY"
  }
 },
 {
  "id": "g023",
  "kind": "photo",
  "src": "/photos/g023.jpg",
  "alt": "Lake scene: lake, water, boat",
  "width": 4000,
  "height": 5000,
  "date": "2026-09-29",
  "location": "Whistler, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "boat"
  ],
  "colors": [
   "teal",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 327,
   "hueB": 36,
   "emoji": "🏞️"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "Q0PGBNLL9HA",
   "photographer": "Anthony Adu",
   "profileUrl": "https://unsplash.com/@furtheradu",
   "photoUrl": "https://unsplash.com/photos/green-trees-beside-body-of-water-during-daytime-Q0PGBNLL9HA"
  }
 },
 {
  "id": "g024",
  "kind": "document",
  "src": null,
  "alt": "ID / card",
  "width": 900,
  "height": 1200,
  "date": "2026-09-29",
  "location": "Bali, Indonesia",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "id",
  "textContent": [
   "name",
   "number"
  ],
  "language": "Hindi"
 },
 {
  "id": "g025",
  "kind": "document",
  "src": null,
  "alt": "Slide / whiteboard",
  "width": 900,
  "height": 1200,
  "date": "2026-09-29",
  "location": "Delhi, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "slides",
  "textContent": [
   "name"
  ],
  "language": "English"
 },
 {
  "id": "g026",
  "kind": "photo",
  "src": "/photos/g026.jpg",
  "alt": "Lake scene: lake, water, mountains",
  "width": 5167,
  "height": 7746,
  "date": "2026-09-28",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "mountains"
  ],
  "colors": [
   "pink",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 186,
   "hueB": 221,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "RsFO5OG0rjA",
   "photographer": "Toan Chu",
   "profileUrl": "https://unsplash.com/@toanchu",
   "photoUrl": "https://unsplash.com/photos/blue-body-of-water-under-white-sky-during-daytime-RsFO5OG0rjA"
  }
 },
 {
  "id": "g027",
  "kind": "photo",
  "src": "/photos/g027.jpg",
  "alt": "Home scene: kitchen, sofa",
  "width": 4188,
  "height": 5235,
  "date": "2026-09-28",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "kitchen",
   "sofa"
  ],
  "colors": [
   "white",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 82,
   "hueB": 124,
   "emoji": "🛋️"
  },
  "unsplashCredit": {
   "photoId": "8G88tY1nvE0",
   "photographer": "Emmanuel Black",
   "profileUrl": "https://unsplash.com/@emmanuelblack",
   "photoUrl": "https://unsplash.com/photos/modern-living-room-and-kitchen-with-dark-furniture-8G88tY1nvE0"
  }
 },
 {
  "id": "g028",
  "kind": "photo",
  "src": "/photos/g028.jpg",
  "alt": "Trek scene: snow",
  "width": 2250,
  "height": 3000,
  "date": "2026-09-28",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "snow"
  ],
  "colors": [
   "grey",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 293,
   "hueB": 2,
   "emoji": "🥾"
  },
  "timeOfDay": "night",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "hSPVuakrJqs",
   "photographer": "Kelly Sikkema",
   "profileUrl": "https://unsplash.com/@kellysikkema",
   "photoUrl": "https://unsplash.com/photos/frost-patterns-on-window-pane-hSPVuakrJqs"
  }
 },
 {
  "id": "g029",
  "kind": "photo",
  "src": "/photos/g029.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 2401,
  "height": 3600,
  "date": "2026-09-28",
  "location": "Chopta, Uttarakhand",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "gym"
  ],
  "colors": [
   "grey",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 66,
   "hueB": 112,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "posing",
  "unsplashCredit": {
   "photoId": "gnJqUTCPzzg",
   "photographer": "Tyler Raye",
   "profileUrl": "https://unsplash.com/@tcraye",
   "photoUrl": "https://unsplash.com/photos/a-black-and-white-photo-of-a-row-of-gym-equipment-gnJqUTCPzzg"
  }
 },
 {
  "id": "g030",
  "kind": "photo",
  "src": "/photos/g030.jpg",
  "alt": "Beach scene: sea, beach",
  "width": 4000,
  "height": 6000,
  "date": "2026-09-26",
  "location": "Gokarna, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sea",
   "beach"
  ],
  "colors": [
   "pink",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 35,
   "hueB": 94,
   "emoji": "🏖️"
  },
  "timeOfDay": "morning",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "G1jt0l9I2d0",
   "photographer": "Hannah Lee",
   "profileUrl": "https://unsplash.com/@hhhues",
   "photoUrl": "https://unsplash.com/photos/a-person-walking-on-the-beach-carrying-a-surfboard-G1jt0l9I2d0"
  }
 },
 {
  "id": "g031",
  "kind": "photo",
  "src": "/photos/g031.jpg",
  "alt": "Flowers scene: garden",
  "width": 3000,
  "height": 2001,
  "date": "2026-09-26",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "garden"
  ],
  "colors": [
   "grey",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 240,
   "hueB": 277,
   "emoji": "🌸"
  },
  "timeOfDay": "night",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "4f17CPrrxlY",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/a-person-inserts-a-memory-card-into-a-digital-device-4f17CPrrxlY"
  }
 },
 {
  "id": "g032",
  "kind": "photo",
  "src": "/photos/g032.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 2832,
  "height": 4256,
  "date": "2026-09-26",
  "location": "Pangong, Ladakh",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "party"
  ],
  "colors": [
   "black",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 117,
   "hueB": 166,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "Nesg78e8xxQ",
   "photographer": "Daniel Stiel",
   "profileUrl": "https://unsplash.com/@danielstiel",
   "photoUrl": "https://unsplash.com/photos/courtyard-with-potted-plants-and-tiled-floor-Nesg78e8xxQ"
  }
 },
 {
  "id": "g033",
  "kind": "photo",
  "src": "/photos/g033.jpg",
  "alt": "Sunset scene: sunset, city, sky",
  "width": 3076,
  "height": 2051,
  "date": "2026-09-25",
  "location": "Lisbon, Portugal",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "city",
   "sky"
  ],
  "colors": [
   "white",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 320,
   "hueB": 22,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "gFswBJPtR_E",
   "photographer": "Nikita Pishchugin",
   "profileUrl": "https://unsplash.com/@nikita_pishchugin",
   "photoUrl": "https://unsplash.com/photos/straw-umbrellas-on-beach-in-bodrum-gFswBJPtR_E"
  }
 },
 {
  "id": "g034",
  "kind": "photo",
  "src": "/photos/g034.jpg",
  "alt": "Sunset scene: sunset, city, mountains",
  "width": 3972,
  "height": 5958,
  "date": "2026-09-23",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "city",
   "mountains"
  ],
  "colors": [
   "grey",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 13,
   "hueB": 49,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "gEy87N7lgQw",
   "photographer": "Ismail Mohamed - SoviLe",
   "profileUrl": "https://unsplash.com/@sovile",
   "photoUrl": "https://unsplash.com/photos/person-walking-on-sandy-beach-gEy87N7lgQw"
  }
 },
 {
  "id": "g035",
  "kind": "photo",
  "src": "/photos/g035.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 4256,
  "height": 5188,
  "date": "2026-09-23",
  "location": "Chopta, Uttarakhand",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "car"
  ],
  "colors": [
   "brown",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 264,
   "hueB": 305,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "serious",
  "unsplashCredit": {
   "photoId": "DBi0GRKrY4A",
   "photographer": "curaits",
   "profileUrl": "https://unsplash.com/@curaits",
   "photoUrl": "https://unsplash.com/photos/basketball-before-ornate-stone-doorway-DBi0GRKrY4A"
  }
 },
 {
  "id": "g036",
  "kind": "photo",
  "src": "/photos/g036.jpg",
  "alt": "Beach scene: waves",
  "width": 6048,
  "height": 4032,
  "date": "2026-09-22",
  "location": "Gokarna, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "waves"
  ],
  "colors": [
   "green",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 286,
   "hueB": 337,
   "emoji": "🏖️"
  },
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "-pewxZl8j_I",
   "photographer": "Egor Myznik",
   "profileUrl": "https://unsplash.com/@vonshnauzer",
   "photoUrl": "https://unsplash.com/photos/vintage-car-headlights-and-chrome-bumper--pewxZl8j_I"
  }
 },
 {
  "id": "g037",
  "kind": "photo",
  "src": "/photos/g037.jpg",
  "alt": "Waterfall scene: water, forest, waterfall",
  "width": 5718,
  "height": 8577,
  "date": "2026-09-22",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "water",
   "forest",
   "waterfall"
  ],
  "colors": [
   "brown",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 305,
   "hueB": 3,
   "emoji": "💧"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "B_E9MBWu9yw",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/family-eating-ice-cream-at-theater-B_E9MBWu9yw"
  }
 },
 {
  "id": "g038",
  "kind": "photo",
  "src": "/photos/g038.jpg",
  "alt": "Temple scene: statue",
  "width": 4160,
  "height": 5200,
  "date": "2026-09-22",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "statue"
  ],
  "colors": [
   "white",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 108,
   "hueB": 145,
   "emoji": "🛕"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "DgfWOj2pWGI",
   "photographer": "Farid Daba",
   "profileUrl": "https://unsplash.com/@faridworld",
   "photoUrl": "https://unsplash.com/photos/woman-in-white-dress-on-sofa-DgfWOj2pWGI"
  }
 },
 {
  "id": "g039",
  "kind": "photo",
  "src": "/photos/g039.jpg",
  "alt": "Candid of 3 people at a beach scene",
  "width": 4160,
  "height": 6240,
  "date": "2026-09-22",
  "location": "Lisbon, Portugal",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "sand"
  ],
  "colors": [
   "orange",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 335,
   "hueB": 15,
   "emoji": "👥"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "photoType": "candid",
  "pose": "posing",
  "unsplashCredit": {
   "photoId": "oOFRTWa6EQg",
   "photographer": "Caroline Badran",
   "profileUrl": "https://unsplash.com/@___atmos",
   "photoUrl": "https://unsplash.com/photos/camera-and-book-on-marble-table-oOFRTWa6EQg"
  }
 },
 {
  "id": "g040",
  "kind": "photo",
  "src": "/photos/g040.jpg",
  "alt": "Portrait of 1 person at a trek scene",
  "width": 4134,
  "height": 6201,
  "date": "2026-09-21",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "backpack"
  ],
  "colors": [
   "grey",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 282,
   "hueB": 323,
   "emoji": "🙂"
  },
  "timeOfDay": "night",
  "sky": "foggy",
  "photoType": "portrait",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "5Hy-QAKV0to",
   "photographer": "Dmitry Kropachev",
   "profileUrl": "https://unsplash.com/@kropachev",
   "photoUrl": "https://unsplash.com/photos/skyscrapers-in-chicago-city-center-5Hy-QAKV0to"
  }
 },
 {
  "id": "g041",
  "kind": "photo",
  "src": "/photos/g041.jpg",
  "alt": "Trek scene: tent, forest",
  "width": 4672,
  "height": 6797,
  "date": "2026-09-18",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "tent",
   "forest"
  ],
  "colors": [
   "grey",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 192,
   "hueB": 234,
   "emoji": "🥾"
  },
  "timeOfDay": "night",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "ObftURPUYZU",
   "photographer": "Caroline Badran",
   "profileUrl": "https://unsplash.com/@___atmos",
   "photoUrl": "https://unsplash.com/photos/cream-jacket-and-shorts-on-rack-ObftURPUYZU"
  }
 },
 {
  "id": "g042",
  "kind": "photo",
  "src": "/photos/g042.jpg",
  "alt": "Group photo of 5 people",
  "width": 3323,
  "height": 4985,
  "date": "2026-09-17",
  "location": "Lisbon, Portugal",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 5,
  "animals": [],
  "objects": [
   "car"
  ],
  "colors": [
   "orange",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 88,
   "hueB": 151,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "d8h0SuLm9jI",
   "photographer": "Henry Tuchez",
   "profileUrl": "https://unsplash.com/@henrytuchez",
   "photoUrl": "https://unsplash.com/photos/woman-in-cream-dress-on-stone-steps-d8h0SuLm9jI"
  }
 },
 {
  "id": "g043",
  "kind": "photo",
  "src": "/photos/g043.jpg",
  "alt": "Sunset scene: sunset, clouds, city",
  "width": 3605,
  "height": 5407,
  "date": "2026-09-15",
  "location": "Delhi, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "clouds",
   "city"
  ],
  "colors": [
   "white",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 125,
   "hueB": 155,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "voG9sYih3ds",
   "photographer": "Filip Kvasnak",
   "profileUrl": "https://unsplash.com/@filipkvasnak",
   "photoUrl": "https://unsplash.com/photos/crescent-moon-over-dark-forest-silhouette-voG9sYih3ds"
  }
 },
 {
  "id": "g044",
  "kind": "document",
  "src": null,
  "alt": "Ticket",
  "width": 900,
  "height": 1200,
  "date": "2026-09-13",
  "location": "Bali, Indonesia",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "ticket",
  "textContent": [
   "date",
   "number"
  ],
  "language": "English"
 },
 {
  "id": "g045",
  "kind": "photo",
  "src": "/photos/g045.jpg",
  "alt": "Food scene: dessert",
  "width": 3000,
  "height": 2001,
  "date": "2026-09-01",
  "location": "Delhi, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "dessert"
  ],
  "colors": [
   "grey",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 101,
   "hueB": 135,
   "emoji": "🍜"
  },
  "unsplashCredit": {
   "photoId": "p0lRVTkrfpE",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/smiling-woman-uses-laptop-person-holds-credit-card-nearby-p0lRVTkrfpE"
  }
 },
 {
  "id": "g046",
  "kind": "photo",
  "src": "/photos/g046.jpg",
  "alt": "Portrait of 1 person at a temple scene",
  "width": 2913,
  "height": 4076,
  "date": "2026-08-29",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "courtyard"
  ],
  "colors": [
   "pink",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 32,
   "hueB": 73,
   "emoji": "🙂"
  },
  "timeOfDay": "morning",
  "sky": "clear",
  "photoType": "portrait",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "P_1fe_4cbf4",
   "photographer": "Kris Tian",
   "profileUrl": "https://unsplash.com/@kris_tian",
   "photoUrl": "https://unsplash.com/photos/man-riding-scooter-in-beijing-P_1fe_4cbf4"
  }
 },
 {
  "id": "g047",
  "kind": "photo",
  "src": "/photos/g047.jpg",
  "alt": "City scene: cars",
  "width": 4096,
  "height": 2731,
  "date": "2026-08-19",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "cars"
  ],
  "colors": [
   "green",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 83,
   "hueB": 137,
   "emoji": "🏙️"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "1lLqsynNaZY",
   "photographer": "Oleg",
   "profileUrl": "https://unsplash.com/@olezhanjudi",
   "photoUrl": "https://unsplash.com/photos/autumn-leaf-reflections-on-water-1lLqsynNaZY"
  }
 },
 {
  "id": "g048",
  "kind": "photo",
  "src": "/photos/g048.jpg",
  "alt": "Sunset scene: sunset, sky",
  "width": 3944,
  "height": 7008,
  "date": "2026-08-16",
  "location": "Delhi, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "sky"
  ],
  "colors": [
   "green",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 275,
   "hueB": 313,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "FZ7yMBQCFXM",
   "photographer": "Ali Aziz",
   "profileUrl": "https://unsplash.com/@thealiaziz",
   "photoUrl": "https://unsplash.com/photos/stained-glass-dome-in-paris-FZ7yMBQCFXM"
  }
 },
 {
  "id": "g049",
  "kind": "photo",
  "src": "/photos/g049.jpg",
  "alt": "Trek scene: tent",
  "width": 7888,
  "height": 9860,
  "date": "2026-08-15",
  "location": "Rishikesh, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "tent"
  ],
  "colors": [
   "white",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 325,
   "hueB": 25,
   "emoji": "🥾"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "grQPk2AdrRM",
   "photographer": "Ali Aziz",
   "profileUrl": "https://unsplash.com/@thealiaziz",
   "photoUrl": "https://unsplash.com/photos/ornate-green-doors-in-stone-facade-grQPk2AdrRM"
  }
 },
 {
  "id": "g050",
  "kind": "photo",
  "src": "/photos/g050.jpg",
  "alt": "Home scene: books",
  "width": 4220,
  "height": 2816,
  "date": "2026-08-07",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "books"
  ],
  "colors": [
   "green",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 71,
   "hueB": 111,
   "emoji": "🛋️"
  },
  "unsplashCredit": {
   "photoId": "SSKYe-bsLUg",
   "photographer": "Ahmet Yüksek ✪",
   "profileUrl": "https://unsplash.com/@ahmetyuksek",
   "photoUrl": "https://unsplash.com/photos/brown-frog-on-green-lily-pad-SSKYe-bsLUg"
  }
 },
 {
  "id": "g051",
  "kind": "photo",
  "src": "/photos/g051.jpg",
  "alt": "Group photo of 4 people",
  "width": 4128,
  "height": 6192,
  "date": "2026-08-06",
  "location": "Pune, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 4,
  "animals": [],
  "objects": [
   "cafe"
  ],
  "colors": [
   "black",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 119,
   "hueB": 148,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "posing",
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "qY94G63w-9Y",
   "photographer": "Tobias Reich",
   "profileUrl": "https://unsplash.com/@electerious",
   "photoUrl": "https://unsplash.com/photos/sunlight-in-indoor-botanical-garden-qY94G63w-9Y"
  }
 },
 {
  "id": "g052",
  "kind": "photo",
  "src": "/photos/g052.jpg",
  "alt": "Candid of 3 people at a temple scene",
  "width": 5152,
  "height": 7728,
  "date": "2026-08-06",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "courtyard",
   "statue"
  ],
  "colors": [
   "white",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 317,
   "hueB": 10,
   "emoji": "👥"
  },
  "timeOfDay": "morning",
  "sky": "clear",
  "photoType": "candid",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "QxxaOwcBnQE",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/oysters-with-lemon-and-dipping-sauce-QxxaOwcBnQE"
  }
 },
 {
  "id": "g053",
  "kind": "photo",
  "src": "/photos/g053.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 2207,
  "height": 3130,
  "date": "2026-07-31",
  "location": "Rishikesh, Uttarakhand",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "brown",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 155,
   "hueB": 199,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "posing",
  "unsplashCredit": {
   "photoId": "uSEM9VCJQQQ",
   "photographer": "Richard Stachmann",
   "profileUrl": "https://unsplash.com/@stachmann",
   "photoUrl": "https://unsplash.com/photos/palm-house-conservatory-in-vienna-uSEM9VCJQQQ"
  }
 },
 {
  "id": "g054",
  "kind": "photo",
  "src": "/photos/g054.jpg",
  "alt": "Selfie photo of 2 people",
  "width": 3125,
  "height": 4688,
  "date": "2026-07-28",
  "location": "Munnar, Kerala",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "festival"
  ],
  "colors": [
   "brown",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 191,
   "hueB": 261,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "abm-8Dk3U0c",
   "photographer": "Kevin Grieve",
   "profileUrl": "https://unsplash.com/@grievek1610begur",
   "photoUrl": "https://unsplash.com/photos/silhouettes-of-people-against-colorful-light-abm-8Dk3U0c"
  }
 },
 {
  "id": "g055",
  "kind": "photo",
  "src": "/photos/g055.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 3840,
  "height": 2560,
  "date": "2026-07-21",
  "location": "Lonavala, Maharashtra",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "cafe"
  ],
  "colors": [
   "grey",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 6,
   "hueB": 73,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "HAx5VJPw9CQ",
   "photographer": "MATTHIAS CHO",
   "profileUrl": "https://unsplash.com/@stillhour_film",
   "photoUrl": "https://unsplash.com/photos/child-pushing-red-ball-uphill-HAx5VJPw9CQ"
  }
 },
 {
  "id": "g056",
  "kind": "photo",
  "src": "/photos/g056.jpg",
  "alt": "Beach scene: waves, palm trees",
  "width": 4492,
  "height": 6774,
  "date": "2026-07-20",
  "location": "Gokarna, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "waves",
   "palm trees"
  ],
  "colors": [
   "brown",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 256,
   "hueB": 298,
   "emoji": "🏖️"
  },
  "timeOfDay": "afternoon",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "t1w5cLWcJ0E",
   "photographer": "Jason Zeis",
   "profileUrl": "https://unsplash.com/@zeis",
   "photoUrl": "https://unsplash.com/photos/mountain-slope-with-autumn-foliage-t1w5cLWcJ0E"
  }
 },
 {
  "id": "g057",
  "kind": "photo",
  "src": "/photos/g057.jpg",
  "alt": "Trek scene: forest",
  "width": 4763,
  "height": 3175,
  "date": "2026-07-18",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "forest"
  ],
  "colors": [
   "blue",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 213,
   "hueB": 249,
   "emoji": "🥾"
  },
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "BBF-RGGXGvI",
   "photographer": "Mat",
   "profileUrl": "https://unsplash.com/@mathelot",
   "photoUrl": "https://unsplash.com/photos/ship-deck-with-red-hull-BBF-RGGXGvI"
  }
 },
 {
  "id": "g058",
  "kind": "photo",
  "src": "/photos/g058.jpg",
  "alt": "Home scene: plants, lamp",
  "width": 4000,
  "height": 2668,
  "date": "2026-07-17",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "plants",
   "lamp"
  ],
  "colors": [
   "white",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 126,
   "hueB": 191,
   "emoji": "🛋️"
  },
  "unsplashCredit": {
   "photoId": "jyieoy83hUc",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/a-professional-video-camera-on-a-tripod-with-blurred-lights-jyieoy83hUc"
  }
 },
 {
  "id": "g059",
  "kind": "photo",
  "src": "/photos/g059.jpg",
  "alt": "Sunset scene: sunset, clouds, sky",
  "width": 5472,
  "height": 3648,
  "date": "2026-07-15",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "clouds",
   "sky"
  ],
  "colors": [
   "grey",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 73,
   "hueB": 116,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "S7xPalu0zKQ",
   "photographer": "Helena Lopes",
   "profileUrl": "https://unsplash.com/@helenalopesph",
   "photoUrl": "https://unsplash.com/photos/woman-hugging-brown-horse-in-plaid-S7xPalu0zKQ"
  }
 },
 {
  "id": "g060",
  "kind": "photo",
  "src": "/photos/g060.jpg",
  "alt": "Trek scene: tent, trail",
  "width": 8640,
  "height": 5760,
  "date": "2026-07-08",
  "location": "Kasol, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "tent",
   "trail"
  ],
  "colors": [
   "blue",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 56,
   "hueB": 90,
   "emoji": "🥾"
  },
  "timeOfDay": "night",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "yXgQE7S6cGw",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/man-and-woman-walking-in-garden-yXgQE7S6cGw"
  }
 },
 {
  "id": "g061",
  "kind": "photo",
  "src": "/photos/g061.jpg",
  "alt": "Home scene: books, plants",
  "width": 3004,
  "height": 4012,
  "date": "2026-07-05",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "books",
   "plants"
  ],
  "colors": [
   "pink",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 265,
   "hueB": 307,
   "emoji": "🛋️"
  },
  "unsplashCredit": {
   "photoId": "Fdr6GonTzms",
   "photographer": "Jason Leung",
   "profileUrl": "https://unsplash.com/@ninjason",
   "photoUrl": "https://unsplash.com/photos/diner-interior-with-red-chairs-Fdr6GonTzms"
  }
 },
 {
  "id": "g062",
  "kind": "photo",
  "src": "/photos/g062.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 3072,
  "height": 3840,
  "date": "2026-07-04",
  "location": "Zurich, Switzerland",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "jacket"
  ],
  "colors": [
   "blue",
   "black"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 6,
   "hueB": 46,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "smiling",
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "HusWR8AgVqo",
   "photographer": "Leonardo Iribe",
   "profileUrl": "https://unsplash.com/@leonardodbi",
   "photoUrl": "https://unsplash.com/photos/person-in-bright-red-light-HusWR8AgVqo"
  }
 },
 {
  "id": "g063",
  "kind": "photo",
  "src": "/photos/g063.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 5209,
  "height": 7810,
  "date": "2026-07-04",
  "location": "Rishikesh, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "sunglasses"
  ],
  "colors": [
   "blue",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 25,
   "hueB": 60,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "smiling",
  "timeOfDay": "afternoon",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "Wm27Vf65NIg",
   "photographer": "Heather Newsom",
   "profileUrl": "https://unsplash.com/@native7photo",
   "photoUrl": "https://unsplash.com/photos/four-lit-red-candles-in-holders-Wm27Vf65NIg"
  }
 },
 {
  "id": "g064",
  "kind": "photo",
  "src": "/photos/g064.jpg",
  "alt": "Temple scene: temple, statue",
  "width": 4000,
  "height": 6000,
  "date": "2026-06-25",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "temple",
   "statue"
  ],
  "colors": [
   "brown",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 227,
   "hueB": 280,
   "emoji": "🛕"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "PhznYLlylU0",
   "photographer": "Elijah Grimm",
   "profileUrl": "https://unsplash.com/@robbin_grimm",
   "photoUrl": "https://unsplash.com/photos/woman-in-red-light-by-lake-PhznYLlylU0"
  }
 },
 {
  "id": "g065",
  "kind": "photo",
  "src": "/photos/g065.jpg",
  "alt": "Portrait of 1 person at a trek scene",
  "width": 9470,
  "height": 8457,
  "date": "2026-06-22",
  "location": "Lonavala, Maharashtra",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "snow",
   "valley"
  ],
  "colors": [
   "teal",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 150,
   "hueB": 203,
   "emoji": "🙂"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "photoType": "portrait",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "YTHRL-MtPZI",
   "photographer": "Zhen Yao",
   "profileUrl": "https://unsplash.com/@rex_filmer",
   "photoUrl": "https://unsplash.com/photos/minibuses-on-neon-city-street-YTHRL-MtPZI"
  }
 },
 {
  "id": "g066",
  "kind": "photo",
  "src": "/photos/g066.jpg",
  "alt": "Trek scene: trail",
  "width": 3325,
  "height": 4433,
  "date": "2026-06-21",
  "location": "Coorg, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "trail"
  ],
  "colors": [
   "pink",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 278,
   "hueB": 348,
   "emoji": "🥾"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "TOEAo8g-zUk",
   "photographer": "Lens by Benji",
   "profileUrl": "https://unsplash.com/@lens_by_benji",
   "photoUrl": "https://unsplash.com/photos/corner-cafe-with-red-awnings-paris-TOEAo8g-zUk"
  }
 },
 {
  "id": "g067",
  "kind": "photo",
  "src": "/photos/g067.jpg",
  "alt": "Portrait of 1 person at a beach scene",
  "width": 3000,
  "height": 2518,
  "date": "2026-06-21",
  "location": "Bali, Indonesia",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "beach"
  ],
  "colors": [
   "white",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 134,
   "hueB": 196,
   "emoji": "🙂"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "photoType": "portrait",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "Xs7H-uhr96k",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/mans-face-through-red-filter-being-photographed-by-camera-Xs7H-uhr96k"
  }
 },
 {
  "id": "g068",
  "kind": "photo",
  "src": "/photos/g068.jpg",
  "alt": "Pet scene: pet portrait (dog)",
  "width": 3888,
  "height": 5184,
  "date": "2026-06-20",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "dog"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "grey",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 208,
   "hueB": 264,
   "emoji": "🐕"
  },
  "unsplashCredit": {
   "photoId": "GCbUtuH7Uu8",
   "photographer": "Rafael Garcin",
   "profileUrl": "https://unsplash.com/@nimbus_vulpis",
   "photoUrl": "https://unsplash.com/photos/lighthouse-silhouette-against-low-sun-GCbUtuH7Uu8"
  }
 },
 {
  "id": "g069",
  "kind": "photo",
  "src": "/photos/g069.jpg",
  "alt": "Group of 4 people at a snow scene",
  "width": 3349,
  "height": 5024,
  "date": "2026-06-17",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 4,
  "animals": [],
  "objects": [
   "mountains",
   "pine trees"
  ],
  "colors": [
   "green",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 330,
   "hueB": 33,
   "emoji": "👥"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "photoType": "group",
  "pose": "posing",
  "unsplashCredit": {
   "photoId": "D4BPjX-jGEw",
   "photographer": "Dan Begel",
   "profileUrl": "https://unsplash.com/@danbegel",
   "photoUrl": "https://unsplash.com/photos/person-cycling-past-house-in-autumn-D4BPjX-jGEw"
  }
 },
 {
  "id": "g070",
  "kind": "photo",
  "src": "/photos/g070.jpg",
  "alt": "Group of 3 people at a lake scene",
  "width": 3259,
  "height": 2185,
  "date": "2026-06-16",
  "location": "Munnar, Kerala",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "kayak",
   "forest"
  ],
  "colors": [
   "brown",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 234,
   "hueB": 302,
   "emoji": "👥"
  },
  "timeOfDay": "night",
  "sky": "clear",
  "photoType": "group",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "ZKIzGVPFv-4",
   "photographer": "T",
   "profileUrl": "https://unsplash.com/@tanyabarrow",
   "photoUrl": "https://unsplash.com/photos/green-fields-and-hills-from-mirror-ZKIzGVPFv-4"
  }
 },
 {
  "id": "g071",
  "kind": "photo",
  "src": "/photos/g071.jpg",
  "alt": "Candid photo of 4 people",
  "width": 2716,
  "height": 4096,
  "date": "2026-06-08",
  "location": "Kasol, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 4,
  "animals": [],
  "objects": [
   "cafe"
  ],
  "colors": [
   "green",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 273,
   "hueB": 323,
   "emoji": "👥"
  },
  "photoType": "candid",
  "pose": "action",
  "timeOfDay": "night",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "m6GmxT5JsJw",
   "photographer": "Farnaz Kohankhaki",
   "profileUrl": "https://unsplash.com/@farnaz________",
   "photoUrl": "https://unsplash.com/photos/red-dandelion-seed-heads-m6GmxT5JsJw"
  }
 },
 {
  "id": "g072",
  "kind": "document",
  "src": null,
  "alt": "Slide / whiteboard",
  "width": 900,
  "height": 1200,
  "date": "2026-06-08",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "slides",
  "textContent": [
   "name"
  ],
  "language": "Hindi"
 },
 {
  "id": "g073",
  "kind": "photo",
  "src": "/photos/g073.jpg",
  "alt": "Lake scene: lake, water, forest",
  "width": 4000,
  "height": 6000,
  "date": "2026-06-06",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "forest",
   "mountains"
  ],
  "colors": [
   "teal",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 55,
   "hueB": 111,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "9HVPZBDkYZc",
   "photographer": "Miguel Alcântara",
   "profileUrl": "https://unsplash.com/@miguelalcantara",
   "photoUrl": "https://unsplash.com/photos/green-water-with-water-droplets-9HVPZBDkYZc"
  }
 },
 {
  "id": "g074",
  "kind": "photo",
  "src": "/photos/g074.jpg",
  "alt": "Group of 6 people at a food scene",
  "width": 3400,
  "height": 2267,
  "date": "2026-06-03",
  "location": "Jaipur, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 6,
  "animals": [],
  "objects": [
   "dessert"
  ],
  "colors": [
   "pink",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 358,
   "hueB": 33,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "XV3lz-JmdEI",
   "photographer": "Clay Banks",
   "profileUrl": "https://unsplash.com/@claybanks",
   "photoUrl": "https://unsplash.com/photos/wooden-staircase-in-mid-century-home-XV3lz-JmdEI"
  }
 },
 {
  "id": "g075",
  "kind": "photo",
  "src": "/photos/g075.jpg",
  "alt": "Vehicle scene: road, bike",
  "width": 5152,
  "height": 7728,
  "date": "2026-06-01",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "road",
   "bike"
  ],
  "colors": [
   "brown",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 355,
   "hueB": 32,
   "emoji": "🚗"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "9SFWp9AuboQ",
   "photographer": "Benjamin Chambon",
   "profileUrl": "https://unsplash.com/@benjamin_photo_lab",
   "photoUrl": "https://unsplash.com/photos/food-cart-on-city-street-9SFWp9AuboQ"
  }
 },
 {
  "id": "g076",
  "kind": "photo",
  "src": "/photos/g076.jpg",
  "alt": "Home scene: sofa, plants",
  "width": 4968,
  "height": 7448,
  "date": "2026-05-30",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sofa",
   "plants"
  ],
  "colors": [
   "orange",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 114,
   "hueB": 139,
   "emoji": "🛋️"
  },
  "unsplashCredit": {
   "photoId": "mZ_JThK8DQ0",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/woman-carrying-child-at-resort-pool-mZ_JThK8DQ0"
  }
 },
 {
  "id": "g077",
  "kind": "photo",
  "src": "/photos/g077.jpg",
  "alt": "Beach scene: waves",
  "width": 6986,
  "height": 4657,
  "date": "2026-05-28",
  "location": "Lisbon, Portugal",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "waves"
  ],
  "colors": [
   "teal",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 281,
   "hueB": 308,
   "emoji": "🏖️"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "_O7Td4ZabFg",
   "photographer": "Venti Views",
   "profileUrl": "https://unsplash.com/@ventiviews",
   "photoUrl": "https://unsplash.com/photos/rocky-sea-stacks-at-low-sun-_O7Td4ZabFg"
  }
 },
 {
  "id": "g078",
  "kind": "photo",
  "src": "/photos/g078.jpg",
  "alt": "Vehicle scene: car",
  "width": 3543,
  "height": 5286,
  "date": "2026-05-28",
  "location": "Pune, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "car"
  ],
  "colors": [
   "pink",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 326,
   "hueB": 351,
   "emoji": "🚗"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "qUtbGNNq5x0",
   "photographer": "Maximilian Bungart",
   "profileUrl": "https://unsplash.com/@hypernature",
   "photoUrl": "https://unsplash.com/photos/orange-vintage-sports-car-rear-qUtbGNNq5x0"
  }
 },
 {
  "id": "g079",
  "kind": "photo",
  "src": "/photos/g079.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 4743,
  "height": 7115,
  "date": "2026-05-27",
  "location": "Rishikesh, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "pink",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 212,
   "hueB": 246,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "action",
  "timeOfDay": "morning",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "gKF157GLaQ4",
   "photographer": "jack berry",
   "profileUrl": "https://unsplash.com/@jackseeberry",
   "photoUrl": "https://unsplash.com/photos/yellow-building-with-flowering-tree-ishigaki-gKF157GLaQ4"
  }
 },
 {
  "id": "g080",
  "kind": "document",
  "src": null,
  "alt": "Handwritten note",
  "width": 900,
  "height": 1200,
  "date": "2026-05-24",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "note",
  "textContent": [
   "name",
   "address"
  ],
  "language": "English"
 },
 {
  "id": "g081",
  "kind": "photo",
  "src": "/photos/g081.jpg",
  "alt": "Food scene: dessert, coffee",
  "width": 2432,
  "height": 3600,
  "date": "2026-05-22",
  "location": "Udaipur, Rajasthan",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "dessert",
   "coffee"
  ],
  "colors": [
   "brown",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 249,
   "hueB": 308,
   "emoji": "🍜"
  },
  "unsplashCredit": {
   "photoId": "9-3vwUwAljM",
   "photographer": "Sélina Farzaei",
   "profileUrl": "https://unsplash.com/@boinkers",
   "photoUrl": "https://unsplash.com/photos/low-sun-over-lake-with-trees-9-3vwUwAljM"
  }
 },
 {
  "id": "g082",
  "kind": "photo",
  "src": "/photos/g082.jpg",
  "alt": "Selfie photo of 2 people",
  "width": 5000,
  "height": 3000,
  "date": "2026-05-22",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "sunglasses"
  ],
  "colors": [
   "grey",
   "black"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 154,
   "hueB": 222,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "action",
  "timeOfDay": "night",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "UixomSG2fuo",
   "photographer": "Esma Melike Sezer",
   "profileUrl": "https://unsplash.com/@melkszr",
   "photoUrl": "https://unsplash.com/photos/translucent-brown-glass-abstract-layers-UixomSG2fuo"
  }
 },
 {
  "id": "g083",
  "kind": "document",
  "src": null,
  "alt": "Screenshot",
  "width": 900,
  "height": 1200,
  "date": "2026-05-19",
  "location": "Goa, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "screenshot",
  "textContent": [
   "date",
   "name"
  ],
  "language": "English"
 },
 {
  "id": "g084",
  "kind": "photo",
  "src": "/photos/g084.jpg",
  "alt": "Lake scene: lake, water, forest",
  "width": 4000,
  "height": 5000,
  "date": "2026-05-18",
  "location": "Udaipur, Rajasthan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "forest"
  ],
  "colors": [
   "brown",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 226,
   "hueB": 290,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "Q0PGBNLL9HA",
   "photographer": "Anthony Adu",
   "profileUrl": "https://unsplash.com/@furtheradu",
   "photoUrl": "https://unsplash.com/photos/green-trees-beside-body-of-water-during-daytime-Q0PGBNLL9HA"
  }
 },
 {
  "id": "g085",
  "kind": "photo",
  "src": "/photos/g085.jpg",
  "alt": "Lake scene: lake, water, reflection",
  "width": 3400,
  "height": 2267,
  "date": "2026-05-17",
  "location": "Zurich, Switzerland",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "reflection"
  ],
  "colors": [
   "white",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 115,
   "hueB": 167,
   "emoji": "🏞️"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "TDXF1KUyyTk",
   "photographer": "Clay Banks",
   "profileUrl": "https://unsplash.com/@claybanks",
   "photoUrl": "https://unsplash.com/photos/modern-kitchen-with-walnut-cabinetry-TDXF1KUyyTk"
  }
 },
 {
  "id": "g086",
  "kind": "photo",
  "src": "/photos/g086.jpg",
  "alt": "Food scene: food, table",
  "width": 3000,
  "height": 4500,
  "date": "2026-05-16",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "food",
   "table"
  ],
  "colors": [
   "white",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 63,
   "hueB": 117,
   "emoji": "🍜"
  },
  "unsplashCredit": {
   "photoId": "zoP_v6U80EU",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/a-blue-backpack-with-keys-and-jackets-hanging-from-it-zoP_v6U80EU"
  }
 },
 {
  "id": "g087",
  "kind": "photo",
  "src": "/photos/g087.jpg",
  "alt": "Candid photo of 2 people",
  "width": 3000,
  "height": 2001,
  "date": "2026-05-14",
  "location": "Coorg, Karnataka",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "street"
  ],
  "colors": [
   "black",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 291,
   "hueB": 359,
   "emoji": "🙂"
  },
  "photoType": "candid",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "4f17CPrrxlY",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/a-person-inserts-a-memory-card-into-a-digital-device-4f17CPrrxlY"
  }
 },
 {
  "id": "g088",
  "kind": "photo",
  "src": "/photos/g088.jpg",
  "alt": "City scene: building, market",
  "width": 2832,
  "height": 4256,
  "date": "2026-05-13",
  "location": "Delhi, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "building",
   "market"
  ],
  "colors": [
   "white",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 55,
   "hueB": 118,
   "emoji": "🏙️"
  },
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "Nesg78e8xxQ",
   "photographer": "Daniel Stiel",
   "profileUrl": "https://unsplash.com/@danielstiel",
   "photoUrl": "https://unsplash.com/photos/courtyard-with-potted-plants-and-tiled-floor-Nesg78e8xxQ"
  }
 },
 {
  "id": "g089",
  "kind": "photo",
  "src": "/photos/g089.jpg",
  "alt": "Group of 6 people at a lake scene",
  "width": 3076,
  "height": 2051,
  "date": "2026-05-11",
  "location": "Zurich, Switzerland",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 6,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "forest",
   "mountains"
  ],
  "colors": [
   "teal",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 27,
   "hueB": 94,
   "emoji": "👥"
  },
  "timeOfDay": "morning",
  "sky": "clear",
  "photoType": "group",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "gFswBJPtR_E",
   "photographer": "Nikita Pishchugin",
   "profileUrl": "https://unsplash.com/@nikita_pishchugin",
   "photoUrl": "https://unsplash.com/photos/straw-umbrellas-on-beach-in-bodrum-gFswBJPtR_E"
  }
 },
 {
  "id": "g090",
  "kind": "photo",
  "src": "/photos/g090.jpg",
  "alt": "Candid of 3 people at a trek scene",
  "width": 3972,
  "height": 5958,
  "date": "2026-05-05",
  "location": "Munnar, Kerala",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "snow"
  ],
  "colors": [
   "teal",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 176,
   "hueB": 232,
   "emoji": "👥"
  },
  "timeOfDay": "night",
  "sky": "clear",
  "photoType": "candid",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "gEy87N7lgQw",
   "photographer": "Ismail Mohamed - SoviLe",
   "profileUrl": "https://unsplash.com/@sovile",
   "photoUrl": "https://unsplash.com/photos/person-walking-on-sandy-beach-gEy87N7lgQw"
  }
 },
 {
  "id": "g091",
  "kind": "photo",
  "src": "/photos/g091.jpg",
  "alt": "Food scene: food, table",
  "width": 4256,
  "height": 5188,
  "date": "2026-05-03",
  "location": "Lisbon, Portugal",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "food",
   "table"
  ],
  "colors": [
   "blue",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 9,
   "hueB": 63,
   "emoji": "🍜"
  },
  "unsplashCredit": {
   "photoId": "DBi0GRKrY4A",
   "photographer": "curaits",
   "profileUrl": "https://unsplash.com/@curaits",
   "photoUrl": "https://unsplash.com/photos/basketball-before-ornate-stone-doorway-DBi0GRKrY4A"
  }
 },
 {
  "id": "g092",
  "kind": "photo",
  "src": "/photos/g092.jpg",
  "alt": "Portrait of 1 person at a lake scene",
  "width": 6048,
  "height": 4032,
  "date": "2026-04-28",
  "location": "Udaipur, Rajasthan",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "kayak",
   "mountains"
  ],
  "colors": [
   "brown",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 44,
   "hueB": 73,
   "emoji": "🙂"
  },
  "timeOfDay": "morning",
  "sky": "cloudy",
  "photoType": "portrait",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "-pewxZl8j_I",
   "photographer": "Egor Myznik",
   "profileUrl": "https://unsplash.com/@vonshnauzer",
   "photoUrl": "https://unsplash.com/photos/vintage-car-headlights-and-chrome-bumper--pewxZl8j_I"
  }
 },
 {
  "id": "g093",
  "kind": "photo",
  "src": "/photos/g093.jpg",
  "alt": "Selfie photo of 2 people",
  "width": 5718,
  "height": 8577,
  "date": "2026-04-23",
  "location": "Delhi, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "cake"
  ],
  "colors": [
   "blue",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 190,
   "hueB": 246,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "B_E9MBWu9yw",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/family-eating-ice-cream-at-theater-B_E9MBWu9yw"
  }
 },
 {
  "id": "g094",
  "kind": "photo",
  "src": "/photos/g094.jpg",
  "alt": "Beach scene: palm trees",
  "width": 4160,
  "height": 5200,
  "date": "2026-04-20",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "palm trees"
  ],
  "colors": [
   "brown",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 51,
   "hueB": 104,
   "emoji": "🏖️"
  },
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "DgfWOj2pWGI",
   "photographer": "Farid Daba",
   "profileUrl": "https://unsplash.com/@faridworld",
   "photoUrl": "https://unsplash.com/photos/woman-in-white-dress-on-sofa-DgfWOj2pWGI"
  }
 },
 {
  "id": "g095",
  "kind": "photo",
  "src": "/photos/g095.jpg",
  "alt": "City scene: cars, market",
  "width": 4160,
  "height": 6240,
  "date": "2026-04-15",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "cars",
   "market"
  ],
  "colors": [
   "white",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 338,
   "hueB": 36,
   "emoji": "🏙️"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "oOFRTWa6EQg",
   "photographer": "Caroline Badran",
   "profileUrl": "https://unsplash.com/@___atmos",
   "photoUrl": "https://unsplash.com/photos/camera-and-book-on-marble-table-oOFRTWa6EQg"
  }
 },
 {
  "id": "g096",
  "kind": "photo",
  "src": "/photos/g096.jpg",
  "alt": "Lake scene: lake, water, kayak",
  "width": 4134,
  "height": 6201,
  "date": "2026-04-13",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "kayak"
  ],
  "colors": [
   "orange",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 69,
   "hueB": 98,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "5Hy-QAKV0to",
   "photographer": "Dmitry Kropachev",
   "profileUrl": "https://unsplash.com/@kropachev",
   "photoUrl": "https://unsplash.com/photos/skyscrapers-in-chicago-city-center-5Hy-QAKV0to"
  }
 },
 {
  "id": "g097",
  "kind": "photo",
  "src": "/photos/g097.jpg",
  "alt": "Snow scene: pine trees, mountains",
  "width": 4672,
  "height": 6797,
  "date": "2026-04-13",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "pine trees",
   "mountains"
  ],
  "colors": [
   "pink",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 157,
   "hueB": 213,
   "emoji": "❄️"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "ObftURPUYZU",
   "photographer": "Caroline Badran",
   "profileUrl": "https://unsplash.com/@___atmos",
   "photoUrl": "https://unsplash.com/photos/cream-jacket-and-shorts-on-rack-ObftURPUYZU"
  }
 },
 {
  "id": "g098",
  "kind": "document",
  "src": null,
  "alt": "Slide / whiteboard",
  "width": 900,
  "height": 1200,
  "date": "2026-04-05",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "slides",
  "textContent": [
   "name"
  ],
  "language": "English"
 },
 {
  "id": "g099",
  "kind": "photo",
  "src": "/photos/g099.jpg",
  "alt": "Lake scene: lake, water, kayak",
  "width": 3323,
  "height": 4985,
  "date": "2026-03-29",
  "location": "Udaipur, Rajasthan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "kayak"
  ],
  "colors": [
   "blue",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 208,
   "hueB": 238,
   "emoji": "🏞️"
  },
  "timeOfDay": "sunset",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "d8h0SuLm9jI",
   "photographer": "Henry Tuchez",
   "profileUrl": "https://unsplash.com/@henrytuchez",
   "photoUrl": "https://unsplash.com/photos/woman-in-cream-dress-on-stone-steps-d8h0SuLm9jI"
  }
 },
 {
  "id": "g100",
  "kind": "photo",
  "src": "/photos/g100.jpg",
  "alt": "Group photo of 6 people",
  "width": 3605,
  "height": 5407,
  "date": "2026-03-29",
  "location": "Manali, Himachal Pradesh",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 6,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "brown",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 53,
   "hueB": 82,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "posing",
  "unsplashCredit": {
   "photoId": "voG9sYih3ds",
   "photographer": "Filip Kvasnak",
   "profileUrl": "https://unsplash.com/@filipkvasnak",
   "photoUrl": "https://unsplash.com/photos/crescent-moon-over-dark-forest-silhouette-voG9sYih3ds"
  }
 },
 {
  "id": "g101",
  "kind": "photo",
  "src": "/photos/g101.jpg",
  "alt": "Trek scene: mountains, tent",
  "width": 3000,
  "height": 2001,
  "date": "2026-03-25",
  "location": "Lonavala, Maharashtra",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "mountains",
   "tent"
  ],
  "colors": [
   "grey",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 115,
   "hueB": 159,
   "emoji": "🥾"
  },
  "timeOfDay": "night",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "p0lRVTkrfpE",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/smiling-woman-uses-laptop-person-holds-credit-card-nearby-p0lRVTkrfpE"
  }
 },
 {
  "id": "g102",
  "kind": "photo",
  "src": "/photos/g102.jpg",
  "alt": "Candid of 1 person at a beach scene",
  "width": 2913,
  "height": 4076,
  "date": "2026-03-18",
  "location": "Gokarna, Karnataka",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "sand"
  ],
  "colors": [
   "brown",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 274,
   "hueB": 299,
   "emoji": "🙂"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "photoType": "candid",
  "pose": "posing",
  "unsplashCredit": {
   "photoId": "P_1fe_4cbf4",
   "photographer": "Kris Tian",
   "profileUrl": "https://unsplash.com/@kris_tian",
   "photoUrl": "https://unsplash.com/photos/man-riding-scooter-in-beijing-P_1fe_4cbf4"
  }
 },
 {
  "id": "g103",
  "kind": "photo",
  "src": "/photos/g103.jpg",
  "alt": "Vehicle scene: road",
  "width": 4096,
  "height": 2731,
  "date": "2026-03-17",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "road"
  ],
  "colors": [
   "grey",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 235,
   "hueB": 282,
   "emoji": "🚗"
  },
  "timeOfDay": "night",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "1lLqsynNaZY",
   "photographer": "Oleg",
   "profileUrl": "https://unsplash.com/@olezhanjudi",
   "photoUrl": "https://unsplash.com/photos/autumn-leaf-reflections-on-water-1lLqsynNaZY"
  }
 },
 {
  "id": "g104",
  "kind": "photo",
  "src": "/photos/g104.jpg",
  "alt": "Selfie of 1 person at a lake scene",
  "width": 3944,
  "height": 7008,
  "date": "2026-03-16",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "tent",
   "mountains"
  ],
  "colors": [
   "teal",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 338,
   "hueB": 4,
   "emoji": "🙂"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "photoType": "selfie",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "FZ7yMBQCFXM",
   "photographer": "Ali Aziz",
   "profileUrl": "https://unsplash.com/@thealiaziz",
   "photoUrl": "https://unsplash.com/photos/stained-glass-dome-in-paris-FZ7yMBQCFXM"
  }
 },
 {
  "id": "g105",
  "kind": "photo",
  "src": "/photos/g105.jpg",
  "alt": "Group photo of 6 people",
  "width": 7888,
  "height": 9860,
  "date": "2026-03-14",
  "location": "Pangong, Ladakh",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 6,
  "animals": [],
  "objects": [
   "jacket"
  ],
  "colors": [
   "grey",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 134,
   "hueB": 192,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "grQPk2AdrRM",
   "photographer": "Ali Aziz",
   "profileUrl": "https://unsplash.com/@thealiaziz",
   "photoUrl": "https://unsplash.com/photos/ornate-green-doors-in-stone-facade-grQPk2AdrRM"
  }
 },
 {
  "id": "g106",
  "kind": "document",
  "src": null,
  "alt": "Ticket",
  "width": 900,
  "height": 1200,
  "date": "2026-03-10",
  "location": "Hampi, Karnataka",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "ticket",
  "textContent": [
   "date",
   "number"
  ],
  "language": "Hindi"
 },
 {
  "id": "g107",
  "kind": "photo",
  "src": "/photos/g107.jpg",
  "alt": "Candid photo of 2 people",
  "width": 4220,
  "height": 2816,
  "date": "2026-03-09",
  "location": "Kasol, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "gym"
  ],
  "colors": [
   "pink",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 219,
   "hueB": 269,
   "emoji": "🙂"
  },
  "photoType": "candid",
  "pose": "serious",
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "SSKYe-bsLUg",
   "photographer": "Ahmet Yüksek ✪",
   "profileUrl": "https://unsplash.com/@ahmetyuksek",
   "photoUrl": "https://unsplash.com/photos/brown-frog-on-green-lily-pad-SSKYe-bsLUg"
  }
 },
 {
  "id": "g108",
  "kind": "photo",
  "src": "/photos/g108.jpg",
  "alt": "Lake scene: lake, water, reflection",
  "width": 4128,
  "height": 6192,
  "date": "2026-03-08",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "reflection",
   "forest"
  ],
  "colors": [
   "orange",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 230,
   "hueB": 278,
   "emoji": "🏞️"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "qY94G63w-9Y",
   "photographer": "Tobias Reich",
   "profileUrl": "https://unsplash.com/@electerious",
   "photoUrl": "https://unsplash.com/photos/sunlight-in-indoor-botanical-garden-qY94G63w-9Y"
  }
 },
 {
  "id": "g109",
  "kind": "photo",
  "src": "/photos/g109.jpg",
  "alt": "Temple scene: courtyard, statue",
  "width": 5152,
  "height": 7728,
  "date": "2026-03-05",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "courtyard",
   "statue"
  ],
  "colors": [
   "blue",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 50,
   "hueB": 88,
   "emoji": "🛕"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "QxxaOwcBnQE",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/oysters-with-lemon-and-dipping-sauce-QxxaOwcBnQE"
  }
 },
 {
  "id": "g110",
  "kind": "photo",
  "src": "/photos/g110.jpg",
  "alt": "Candid of 2 people at a snow scene",
  "width": 2207,
  "height": 3130,
  "date": "2026-03-05",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "mountains"
  ],
  "colors": [
   "blue",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 345,
   "hueB": 23,
   "emoji": "🙂"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "photoType": "candid",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "uSEM9VCJQQQ",
   "photographer": "Richard Stachmann",
   "profileUrl": "https://unsplash.com/@stachmann",
   "photoUrl": "https://unsplash.com/photos/palm-house-conservatory-in-vienna-uSEM9VCJQQQ"
  }
 },
 {
  "id": "g111",
  "kind": "photo",
  "src": "/photos/g111.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 3125,
  "height": 4688,
  "date": "2026-03-03",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "cake"
  ],
  "colors": [
   "black",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 188,
   "hueB": 225,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "posing",
  "timeOfDay": "sunset",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "abm-8Dk3U0c",
   "photographer": "Kevin Grieve",
   "profileUrl": "https://unsplash.com/@grievek1610begur",
   "photoUrl": "https://unsplash.com/photos/silhouettes-of-people-against-colorful-light-abm-8Dk3U0c"
  }
 },
 {
  "id": "g112",
  "kind": "photo",
  "src": "/photos/g112.jpg",
  "alt": "Lake scene: lake, water, kayak",
  "width": 3840,
  "height": 2560,
  "date": "2026-02-28",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "kayak",
   "boat"
  ],
  "colors": [
   "blue",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 321,
   "hueB": 20,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "HAx5VJPw9CQ",
   "photographer": "MATTHIAS CHO",
   "profileUrl": "https://unsplash.com/@stillhour_film",
   "photoUrl": "https://unsplash.com/photos/child-pushing-red-ball-uphill-HAx5VJPw9CQ"
  }
 },
 {
  "id": "g113",
  "kind": "photo",
  "src": "/photos/g113.jpg",
  "alt": "Flowers scene: flowers",
  "width": 4492,
  "height": 6774,
  "date": "2026-02-28",
  "location": "Coorg, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "flowers"
  ],
  "colors": [
   "pink",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 333,
   "hueB": 10,
   "emoji": "🌸"
  },
  "timeOfDay": "night",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "t1w5cLWcJ0E",
   "photographer": "Jason Zeis",
   "profileUrl": "https://unsplash.com/@zeis",
   "photoUrl": "https://unsplash.com/photos/mountain-slope-with-autumn-foliage-t1w5cLWcJ0E"
  }
 },
 {
  "id": "g114",
  "kind": "photo",
  "src": "/photos/g114.jpg",
  "alt": "Pet scene: pet portrait (dog)",
  "width": 4763,
  "height": 3175,
  "date": "2026-02-23",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "dog"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "green",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 17,
   "hueB": 70,
   "emoji": "🐕"
  },
  "unsplashCredit": {
   "photoId": "BBF-RGGXGvI",
   "photographer": "Mat",
   "profileUrl": "https://unsplash.com/@mathelot",
   "photoUrl": "https://unsplash.com/photos/ship-deck-with-red-hull-BBF-RGGXGvI"
  }
 },
 {
  "id": "g115",
  "kind": "photo",
  "src": "/photos/g115.jpg",
  "alt": "Candid photo of 3 people",
  "width": 4000,
  "height": 2668,
  "date": "2026-02-20",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "sunglasses"
  ],
  "colors": [
   "pink",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 122,
   "hueB": 150,
   "emoji": "👥"
  },
  "photoType": "candid",
  "pose": "smiling",
  "timeOfDay": "morning",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "jyieoy83hUc",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/a-professional-video-camera-on-a-tripod-with-blurred-lights-jyieoy83hUc"
  }
 },
 {
  "id": "g116",
  "kind": "photo",
  "src": "/photos/g116.jpg",
  "alt": "Pet scene: pet portrait (dog)",
  "width": 5472,
  "height": 3648,
  "date": "2026-02-17",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "dog"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "white",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 357,
   "hueB": 53,
   "emoji": "🐕"
  },
  "unsplashCredit": {
   "photoId": "S7xPalu0zKQ",
   "photographer": "Helena Lopes",
   "profileUrl": "https://unsplash.com/@helenalopesph",
   "photoUrl": "https://unsplash.com/photos/woman-hugging-brown-horse-in-plaid-S7xPalu0zKQ"
  }
 },
 {
  "id": "g117",
  "kind": "photo",
  "src": "/photos/g117.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 8640,
  "height": 5760,
  "date": "2026-02-14",
  "location": "Udaipur, Rajasthan",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "blue",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 127,
   "hueB": 166,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "serious",
  "unsplashCredit": {
   "photoId": "yXgQE7S6cGw",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/man-and-woman-walking-in-garden-yXgQE7S6cGw"
  }
 },
 {
  "id": "g118",
  "kind": "document",
  "src": null,
  "alt": "ID / card",
  "width": 900,
  "height": 1200,
  "date": "2026-02-09",
  "location": "Hampi, Karnataka",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "id",
  "textContent": [
   "name",
   "number"
  ],
  "language": "English"
 },
 {
  "id": "g119",
  "kind": "photo",
  "src": "/photos/g119.jpg",
  "alt": "Lake scene: lake, water, kayak",
  "width": 3004,
  "height": 4012,
  "date": "2026-02-07",
  "location": "Nainital, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "kayak",
   "reflection"
  ],
  "colors": [
   "orange",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 1,
   "hueB": 42,
   "emoji": "🏞️"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "Fdr6GonTzms",
   "photographer": "Jason Leung",
   "profileUrl": "https://unsplash.com/@ninjason",
   "photoUrl": "https://unsplash.com/photos/diner-interior-with-red-chairs-Fdr6GonTzms"
  }
 },
 {
  "id": "g120",
  "kind": "photo",
  "src": "/photos/g120.jpg",
  "alt": "Candid photo of 3 people",
  "width": 3072,
  "height": 3840,
  "date": "2026-02-07",
  "location": "Jaipur, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "sunglasses"
  ],
  "colors": [
   "orange",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 67,
   "hueB": 107,
   "emoji": "👥"
  },
  "photoType": "candid",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "HusWR8AgVqo",
   "photographer": "Leonardo Iribe",
   "profileUrl": "https://unsplash.com/@leonardodbi",
   "photoUrl": "https://unsplash.com/photos/person-in-bright-red-light-HusWR8AgVqo"
  }
 },
 {
  "id": "g121",
  "kind": "photo",
  "src": "/photos/g121.jpg",
  "alt": "Lake scene: lake, water, boat",
  "width": 5209,
  "height": 7810,
  "date": "2026-02-04",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "boat"
  ],
  "colors": [
   "blue",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 294,
   "hueB": 2,
   "emoji": "🏞️"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "Wm27Vf65NIg",
   "photographer": "Heather Newsom",
   "profileUrl": "https://unsplash.com/@native7photo",
   "photoUrl": "https://unsplash.com/photos/four-lit-red-candles-in-holders-Wm27Vf65NIg"
  }
 },
 {
  "id": "g122",
  "kind": "photo",
  "src": "/photos/g122.jpg",
  "alt": "Beach scene: waves",
  "width": 4000,
  "height": 6000,
  "date": "2026-02-04",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "waves"
  ],
  "colors": [
   "green",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 297,
   "hueB": 343,
   "emoji": "🏖️"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "PhznYLlylU0",
   "photographer": "Elijah Grimm",
   "profileUrl": "https://unsplash.com/@robbin_grimm",
   "photoUrl": "https://unsplash.com/photos/woman-in-red-light-by-lake-PhznYLlylU0"
  }
 },
 {
  "id": "g123",
  "kind": "photo",
  "src": "/photos/g123.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 9470,
  "height": 8457,
  "date": "2026-02-04",
  "location": "Kasol, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "festival"
  ],
  "colors": [
   "orange",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 201,
   "hueB": 230,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "smiling",
  "timeOfDay": "morning",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "YTHRL-MtPZI",
   "photographer": "Zhen Yao",
   "profileUrl": "https://unsplash.com/@rex_filmer",
   "photoUrl": "https://unsplash.com/photos/minibuses-on-neon-city-street-YTHRL-MtPZI"
  }
 },
 {
  "id": "g124",
  "kind": "photo",
  "src": "/photos/g124.jpg",
  "alt": "Food scene: cafe, dessert",
  "width": 3325,
  "height": 4433,
  "date": "2026-01-27",
  "location": "Goa, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "cafe",
   "dessert"
  ],
  "colors": [
   "green",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 157,
   "hueB": 210,
   "emoji": "🍜"
  },
  "unsplashCredit": {
   "photoId": "TOEAo8g-zUk",
   "photographer": "Lens by Benji",
   "profileUrl": "https://unsplash.com/@lens_by_benji",
   "photoUrl": "https://unsplash.com/photos/corner-cafe-with-red-awnings-paris-TOEAo8g-zUk"
  }
 },
 {
  "id": "g125",
  "kind": "photo",
  "src": "/photos/g125.jpg",
  "alt": "Trek scene: backpack, tent",
  "width": 3000,
  "height": 2518,
  "date": "2026-01-24",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "backpack",
   "tent"
  ],
  "colors": [
   "teal",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 218,
   "hueB": 275,
   "emoji": "🥾"
  },
  "timeOfDay": "afternoon",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "Xs7H-uhr96k",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/mans-face-through-red-filter-being-photographed-by-camera-Xs7H-uhr96k"
  }
 },
 {
  "id": "g126",
  "kind": "photo",
  "src": "/photos/g126.jpg",
  "alt": "Group photo of 6 people",
  "width": 3888,
  "height": 5184,
  "date": "2026-01-16",
  "location": "Chopta, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 6,
  "animals": [],
  "objects": [
   "gym"
  ],
  "colors": [
   "blue",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 308,
   "hueB": 353,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "action",
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "GCbUtuH7Uu8",
   "photographer": "Rafael Garcin",
   "profileUrl": "https://unsplash.com/@nimbus_vulpis",
   "photoUrl": "https://unsplash.com/photos/lighthouse-silhouette-against-low-sun-GCbUtuH7Uu8"
  }
 },
 {
  "id": "g127",
  "kind": "photo",
  "src": "/photos/g127.jpg",
  "alt": "Vehicle scene: car, bike",
  "width": 3349,
  "height": 5024,
  "date": "2026-01-14",
  "location": "Nainital, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "car",
   "bike"
  ],
  "colors": [
   "blue",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 214,
   "hueB": 279,
   "emoji": "🚗"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "D4BPjX-jGEw",
   "photographer": "Dan Begel",
   "profileUrl": "https://unsplash.com/@danbegel",
   "photoUrl": "https://unsplash.com/photos/person-cycling-past-house-in-autumn-D4BPjX-jGEw"
  }
 },
 {
  "id": "g128",
  "kind": "photo",
  "src": "/photos/g128.jpg",
  "alt": "Group photo of 5 people",
  "width": 3259,
  "height": 2185,
  "date": "2026-01-14",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 5,
  "animals": [],
  "objects": [
   "jacket"
  ],
  "colors": [
   "grey",
   "black"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 251,
   "hueB": 279,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "smiling",
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "ZKIzGVPFv-4",
   "photographer": "T",
   "profileUrl": "https://unsplash.com/@tanyabarrow",
   "photoUrl": "https://unsplash.com/photos/green-fields-and-hills-from-mirror-ZKIzGVPFv-4"
  }
 },
 {
  "id": "g129",
  "kind": "photo",
  "src": "/photos/g129.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 2716,
  "height": 4096,
  "date": "2026-01-14",
  "location": "Nainital, Uttarakhand",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "cafe"
  ],
  "colors": [
   "pink",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 285,
   "hueB": 349,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "m6GmxT5JsJw",
   "photographer": "Farnaz Kohankhaki",
   "profileUrl": "https://unsplash.com/@farnaz________",
   "photoUrl": "https://unsplash.com/photos/red-dandelion-seed-heads-m6GmxT5JsJw"
  }
 },
 {
  "id": "g130",
  "kind": "photo",
  "src": "/photos/g130.jpg",
  "alt": "City scene: street, monument",
  "width": 3400,
  "height": 2267,
  "date": "2026-01-10",
  "location": "Udaipur, Rajasthan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "street",
   "monument"
  ],
  "colors": [
   "green",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 220,
   "hueB": 267,
   "emoji": "🏙️"
  },
  "timeOfDay": "afternoon",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "XV3lz-JmdEI",
   "photographer": "Clay Banks",
   "profileUrl": "https://unsplash.com/@claybanks",
   "photoUrl": "https://unsplash.com/photos/wooden-staircase-in-mid-century-home-XV3lz-JmdEI"
  }
 },
 {
  "id": "g131",
  "kind": "photo",
  "src": "/photos/g131.jpg",
  "alt": "Snow scene: mountains",
  "width": 5152,
  "height": 7728,
  "date": "2026-01-10",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "mountains"
  ],
  "colors": [
   "grey",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 341,
   "hueB": 13,
   "emoji": "❄️"
  },
  "timeOfDay": "sunset",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "9SFWp9AuboQ",
   "photographer": "Benjamin Chambon",
   "profileUrl": "https://unsplash.com/@benjamin_photo_lab",
   "photoUrl": "https://unsplash.com/photos/food-cart-on-city-street-9SFWp9AuboQ"
  }
 },
 {
  "id": "g132",
  "kind": "photo",
  "src": "/photos/g132.jpg",
  "alt": "City scene: monument",
  "width": 4968,
  "height": 7448,
  "date": "2026-01-09",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "monument"
  ],
  "colors": [
   "pink",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 135,
   "hueB": 181,
   "emoji": "🏙️"
  },
  "timeOfDay": "afternoon",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "mZ_JThK8DQ0",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/woman-carrying-child-at-resort-pool-mZ_JThK8DQ0"
  }
 },
 {
  "id": "g133",
  "kind": "photo",
  "src": "/photos/g133.jpg",
  "alt": "Beach scene: waves, beach",
  "width": 6986,
  "height": 4657,
  "date": "2026-01-09",
  "location": "Bali, Indonesia",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "waves",
   "beach"
  ],
  "colors": [
   "green",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 175,
   "hueB": 241,
   "emoji": "🏖️"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "_O7Td4ZabFg",
   "photographer": "Venti Views",
   "profileUrl": "https://unsplash.com/@ventiviews",
   "photoUrl": "https://unsplash.com/photos/rocky-sea-stacks-at-low-sun-_O7Td4ZabFg"
  }
 },
 {
  "id": "g134",
  "kind": "photo",
  "src": "/photos/g134.jpg",
  "alt": "Beach scene: boat, sand",
  "width": 3543,
  "height": 5286,
  "date": "2026-01-08",
  "location": "Gokarna, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "boat",
   "sand"
  ],
  "colors": [
   "orange",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 3,
   "hueB": 53,
   "emoji": "🏖️"
  },
  "timeOfDay": "night",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "qUtbGNNq5x0",
   "photographer": "Maximilian Bungart",
   "profileUrl": "https://unsplash.com/@hypernature",
   "photoUrl": "https://unsplash.com/photos/orange-vintage-sports-car-rear-qUtbGNNq5x0"
  }
 },
 {
  "id": "g135",
  "kind": "photo",
  "src": "/photos/g135.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 4743,
  "height": 7115,
  "date": "2026-01-08",
  "location": "Chopta, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "sunglasses"
  ],
  "colors": [
   "white",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 207,
   "hueB": 256,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "action",
  "timeOfDay": "morning",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "gKF157GLaQ4",
   "photographer": "jack berry",
   "profileUrl": "https://unsplash.com/@jackseeberry",
   "photoUrl": "https://unsplash.com/photos/yellow-building-with-flowering-tree-ishigaki-gKF157GLaQ4"
  }
 },
 {
  "id": "g136",
  "kind": "document",
  "src": null,
  "alt": "Slide / whiteboard",
  "width": 900,
  "height": 1200,
  "date": "2026-01-07",
  "location": "Hampi, Karnataka",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "slides",
  "textContent": [
   "name"
  ],
  "language": "German"
 },
 {
  "id": "g137",
  "kind": "photo",
  "src": "/photos/g137.jpg",
  "alt": "Fort scene: courtyard, fort",
  "width": 2432,
  "height": 3600,
  "date": "2026-01-06",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "courtyard",
   "fort"
  ],
  "colors": [
   "orange",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 96,
   "hueB": 128,
   "emoji": "🏰"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "9-3vwUwAljM",
   "photographer": "Sélina Farzaei",
   "profileUrl": "https://unsplash.com/@boinkers",
   "photoUrl": "https://unsplash.com/photos/low-sun-over-lake-with-trees-9-3vwUwAljM"
  }
 },
 {
  "id": "g138",
  "kind": "photo",
  "src": "/photos/g138.jpg",
  "alt": "Group of 4 people at a snow scene",
  "width": 5000,
  "height": 3000,
  "date": "2026-01-01",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 4,
  "animals": [],
  "objects": [
   "pine trees",
   "mountains"
  ],
  "colors": [
   "orange",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 277,
   "hueB": 346,
   "emoji": "👥"
  },
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "photoType": "group",
  "pose": "posing",
  "unsplashCredit": {
   "photoId": "UixomSG2fuo",
   "photographer": "Esma Melike Sezer",
   "profileUrl": "https://unsplash.com/@melkszr",
   "photoUrl": "https://unsplash.com/photos/translucent-brown-glass-abstract-layers-UixomSG2fuo"
  }
 },
 {
  "id": "g139",
  "kind": "photo",
  "src": "/photos/g139.jpg",
  "alt": "Beach scene: waves",
  "width": 3400,
  "height": 2267,
  "date": "2025-12-26",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "waves"
  ],
  "colors": [
   "white",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 64,
   "hueB": 129,
   "emoji": "🏖️"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "TDXF1KUyyTk",
   "photographer": "Clay Banks",
   "profileUrl": "https://unsplash.com/@claybanks",
   "photoUrl": "https://unsplash.com/photos/modern-kitchen-with-walnut-cabinetry-TDXF1KUyyTk"
  }
 },
 {
  "id": "g140",
  "kind": "photo",
  "src": "/photos/g140.jpg",
  "alt": "Home scene: lamp",
  "width": 3000,
  "height": 4500,
  "date": "2025-12-25",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lamp"
  ],
  "colors": [
   "teal",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 285,
   "hueB": 343,
   "emoji": "🛋️"
  },
  "unsplashCredit": {
   "photoId": "zoP_v6U80EU",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/a-blue-backpack-with-keys-and-jackets-hanging-from-it-zoP_v6U80EU"
  }
 },
 {
  "id": "g141",
  "kind": "photo",
  "src": "/photos/g141.jpg",
  "alt": "Temple scene: statue",
  "width": 3000,
  "height": 2001,
  "date": "2025-12-22",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "statue"
  ],
  "colors": [
   "green",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 274,
   "hueB": 310,
   "emoji": "🛕"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "p0lRVTkrfpE",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/smiling-woman-uses-laptop-person-holds-credit-card-nearby-p0lRVTkrfpE"
  }
 },
 {
  "id": "g142",
  "kind": "photo",
  "src": "/photos/g142.jpg",
  "alt": "Lake scene: lake, water, tent",
  "width": 4000,
  "height": 5333,
  "date": "2025-12-18",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "tent"
  ],
  "colors": [
   "blue",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 209,
   "hueB": 245,
   "emoji": "🏞️"
  },
  "timeOfDay": "morning",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "pQ0b41l-xW8",
   "photographer": "Linus Belanger",
   "profileUrl": "https://unsplash.com/@linusbelanger",
   "photoUrl": "https://unsplash.com/photos/dried-flowers-on-pink-teal-gradient-pQ0b41l-xW8"
  }
 },
 {
  "id": "g143",
  "kind": "photo",
  "src": "/photos/g143.jpg",
  "alt": "Candid photo of 2 people",
  "width": 3823,
  "height": 5734,
  "date": "2025-12-15",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "cafe"
  ],
  "colors": [
   "orange",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 96,
   "hueB": 152,
   "emoji": "🙂"
  },
  "photoType": "candid",
  "pose": "smiling",
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "oUYPvibFtEM",
   "photographer": "NIR HIMI",
   "profileUrl": "https://unsplash.com/@nirhimi",
   "photoUrl": "https://unsplash.com/photos/a-lone-figure-walks-across-a-vast-desert-dune-oUYPvibFtEM"
  }
 },
 {
  "id": "g144",
  "kind": "photo",
  "src": "/photos/g144.jpg",
  "alt": "Trek scene: backpack",
  "width": 7722,
  "height": 11583,
  "date": "2025-12-13",
  "location": "Nainital, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "backpack"
  ],
  "colors": [
   "blue",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 9,
   "hueB": 50,
   "emoji": "🥾"
  },
  "timeOfDay": "night",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "711mZUxBgro",
   "photographer": "Dmitry Kropachev",
   "profileUrl": "https://unsplash.com/@kropachev",
   "photoUrl": "https://unsplash.com/photos/woman-outside-bahai-temple-in-santiago-711mZUxBgro"
  }
 },
 {
  "id": "g145",
  "kind": "photo",
  "src": "/photos/g145.jpg",
  "alt": "Lake scene: lake, water, tent",
  "width": 4000,
  "height": 6000,
  "date": "2025-12-08",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "tent"
  ],
  "colors": [
   "orange",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 65,
   "hueB": 92,
   "emoji": "🏞️"
  },
  "timeOfDay": "sunset",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "FyVM48yP-S4",
   "photographer": "Mike Cox",
   "profileUrl": "https://unsplash.com/@iprefermike",
   "photoUrl": "https://unsplash.com/photos/person-in-blazer-using-smartphone-FyVM48yP-S4"
  }
 },
 {
  "id": "g146",
  "kind": "photo",
  "src": "/photos/g146.jpg",
  "alt": "Portrait of 1 person at a food scene",
  "width": 3445,
  "height": 5140,
  "date": "2025-12-08",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "plate",
   "coffee"
  ],
  "colors": [
   "brown",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 231,
   "hueB": 262,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "_gtqfkE948g",
   "photographer": "Maximilian Bungart",
   "profileUrl": "https://unsplash.com/@hypernature",
   "photoUrl": "https://unsplash.com/photos/dachshund-figurine-on-car-rear-shelf-_gtqfkE948g"
  }
 },
 {
  "id": "g147",
  "kind": "photo",
  "src": "/photos/g147.jpg",
  "alt": "Trek scene: valley, tent",
  "width": 3838,
  "height": 5120,
  "date": "2025-12-07",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "valley",
   "tent"
  ],
  "colors": [
   "green",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 195,
   "hueB": 256,
   "emoji": "🥾"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "4qm1EGFaJe4",
   "photographer": "EMD Optics",
   "profileUrl": "https://unsplash.com/@emdoptics",
   "photoUrl": "https://unsplash.com/photos/staircase-leading-to-exit-doorway-4qm1EGFaJe4"
  }
 },
 {
  "id": "g148",
  "kind": "photo",
  "src": "/photos/g148.jpg",
  "alt": "Pet scene: pet portrait (dog)",
  "width": 6265,
  "height": 4293,
  "date": "2025-12-06",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "dog"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "teal",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 38,
   "hueB": 84,
   "emoji": "🐕"
  },
  "unsplashCredit": {
   "photoId": "AbQJp-Q2qjE",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/skyscrapers-and-brisbane-river-in-brisbane-AbQJp-Q2qjE"
  }
 },
 {
  "id": "g149",
  "kind": "photo",
  "src": "/photos/g149.jpg",
  "alt": "Home scene: kitchen, books",
  "width": 4094,
  "height": 6141,
  "date": "2025-12-03",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "kitchen",
   "books"
  ],
  "colors": [
   "teal",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 97,
   "hueB": 129,
   "emoji": "🛋️"
  },
  "unsplashCredit": {
   "photoId": "kvyMgooYwgw",
   "photographer": "sayan Nath",
   "profileUrl": "https://unsplash.com/@hiresayan",
   "photoUrl": "https://unsplash.com/photos/person-on-rocky-desert-cliff-kvyMgooYwgw"
  }
 },
 {
  "id": "g150",
  "kind": "photo",
  "src": "/photos/g150.jpg",
  "alt": "Food scene: dessert",
  "width": 3840,
  "height": 2160,
  "date": "2025-12-02",
  "location": "Kyoto, Japan",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "dessert"
  ],
  "colors": [
   "teal",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 185,
   "hueB": 211,
   "emoji": "🍜"
  },
  "unsplashCredit": {
   "photoId": "8qyyTHeI99U",
   "photographer": "sayan Nath",
   "profileUrl": "https://unsplash.com/@hiresayan",
   "photoUrl": "https://unsplash.com/photos/striped-hill-in-vast-desert-8qyyTHeI99U"
  }
 },
 {
  "id": "g151",
  "kind": "photo",
  "src": "/photos/g151.jpg",
  "alt": "Temple scene: statue, lamps",
  "width": 3114,
  "height": 4667,
  "date": "2025-12-01",
  "location": "Hampi, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "statue",
   "lamps"
  ],
  "colors": [
   "green",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 85,
   "hueB": 154,
   "emoji": "🛕"
  },
  "timeOfDay": "night",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "AoWV295_E7w",
   "photographer": "Ahmet Yüksek ✪",
   "profileUrl": "https://unsplash.com/@ahmetyuksek",
   "photoUrl": "https://unsplash.com/photos/cozy-living-room-with-wooden-walls-AoWV295_E7w"
  }
 },
 {
  "id": "g152",
  "kind": "photo",
  "src": "/photos/g152.jpg",
  "alt": "Trek scene: snow, backpack",
  "width": 3972,
  "height": 5958,
  "date": "2025-12-01",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "snow",
   "backpack"
  ],
  "colors": [
   "brown",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 106,
   "hueB": 168,
   "emoji": "🥾"
  },
  "timeOfDay": "morning",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "gEy87N7lgQw",
   "photographer": "Ismail Mohamed - SoviLe",
   "profileUrl": "https://unsplash.com/@sovile",
   "photoUrl": "https://unsplash.com/photos/person-walking-on-sandy-beach-gEy87N7lgQw"
  }
 },
 {
  "id": "g153",
  "kind": "photo",
  "src": "/photos/g153.jpg",
  "alt": "Portrait of 1 person at a city scene",
  "width": 2832,
  "height": 4256,
  "date": "2025-11-30",
  "location": "Pune, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "street"
  ],
  "colors": [
   "blue",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 142,
   "hueB": 202,
   "emoji": "🙂"
  },
  "timeOfDay": "morning",
  "sky": "cloudy",
  "photoType": "portrait",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "Nesg78e8xxQ",
   "photographer": "Daniel Stiel",
   "profileUrl": "https://unsplash.com/@danielstiel",
   "photoUrl": "https://unsplash.com/photos/courtyard-with-potted-plants-and-tiled-floor-Nesg78e8xxQ"
  }
 },
 {
  "id": "g154",
  "kind": "photo",
  "src": "/photos/g154.jpg",
  "alt": "Portrait of 1 person at a temple scene",
  "width": 3076,
  "height": 2051,
  "date": "2025-11-24",
  "location": "Rishikesh, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "temple",
   "lamps"
  ],
  "colors": [
   "blue",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 305,
   "hueB": 355,
   "emoji": "🙂"
  },
  "timeOfDay": "morning",
  "sky": "clear",
  "photoType": "portrait",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "gFswBJPtR_E",
   "photographer": "Nikita Pishchugin",
   "profileUrl": "https://unsplash.com/@nikita_pishchugin",
   "photoUrl": "https://unsplash.com/photos/straw-umbrellas-on-beach-in-bodrum-gFswBJPtR_E"
  }
 },
 {
  "id": "g155",
  "kind": "photo",
  "src": "/photos/g155.jpg",
  "alt": "Beach scene: boat",
  "width": 3000,
  "height": 2001,
  "date": "2025-11-22",
  "location": "Lisbon, Portugal",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "boat"
  ],
  "colors": [
   "green",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 263,
   "hueB": 330,
   "emoji": "🏖️"
  },
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "BiN7U2lF53A",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/two-people-collaborating-on-a-laptop-in-a-bright-room-BiN7U2lF53A"
  }
 },
 {
  "id": "g156",
  "kind": "photo",
  "src": "/photos/g156.jpg",
  "alt": "Group photo of 5 people",
  "width": 4256,
  "height": 5188,
  "date": "2025-11-18",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 5,
  "animals": [],
  "objects": [
   "party"
  ],
  "colors": [
   "orange",
   "black"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 49,
   "hueB": 104,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "posing",
  "timeOfDay": "sunset",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "DBi0GRKrY4A",
   "photographer": "curaits",
   "profileUrl": "https://unsplash.com/@curaits",
   "photoUrl": "https://unsplash.com/photos/basketball-before-ornate-stone-doorway-DBi0GRKrY4A"
  }
 },
 {
  "id": "g157",
  "kind": "photo",
  "src": "/photos/g157.jpg",
  "alt": "Flowers scene: garden",
  "width": 6048,
  "height": 4032,
  "date": "2025-11-17",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "garden"
  ],
  "colors": [
   "brown",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 160,
   "hueB": 227,
   "emoji": "🌸"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "-pewxZl8j_I",
   "photographer": "Egor Myznik",
   "profileUrl": "https://unsplash.com/@vonshnauzer",
   "photoUrl": "https://unsplash.com/photos/vintage-car-headlights-and-chrome-bumper--pewxZl8j_I"
  }
 },
 {
  "id": "g158",
  "kind": "photo",
  "src": "/photos/g158.jpg",
  "alt": "Selfie photo of 2 people",
  "width": 4160,
  "height": 5200,
  "date": "2025-11-14",
  "location": "Pangong, Ladakh",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "cafe"
  ],
  "colors": [
   "pink",
   "black"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 301,
   "hueB": 340,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "DgfWOj2pWGI",
   "photographer": "Farid Daba",
   "profileUrl": "https://unsplash.com/@faridworld",
   "photoUrl": "https://unsplash.com/photos/woman-in-white-dress-on-sofa-DgfWOj2pWGI"
  }
 },
 {
  "id": "g159",
  "kind": "photo",
  "src": "/photos/g159.jpg",
  "alt": "City scene: cars, monument",
  "width": 4160,
  "height": 6240,
  "date": "2025-11-09",
  "location": "Hampi, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "cars",
   "monument"
  ],
  "colors": [
   "brown",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 181,
   "hueB": 249,
   "emoji": "🏙️"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "oOFRTWa6EQg",
   "photographer": "Caroline Badran",
   "profileUrl": "https://unsplash.com/@___atmos",
   "photoUrl": "https://unsplash.com/photos/camera-and-book-on-marble-table-oOFRTWa6EQg"
  }
 },
 {
  "id": "g160",
  "kind": "photo",
  "src": "/photos/g160.jpg",
  "alt": "Sunset scene: sunset, sky, mountains",
  "width": 8640,
  "height": 5760,
  "date": "2025-11-07",
  "location": "Nainital, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "sky",
   "mountains"
  ],
  "colors": [
   "green",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 137,
   "hueB": 171,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "yXgQE7S6cGw",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/man-and-woman-walking-in-garden-yXgQE7S6cGw"
  }
 },
 {
  "id": "g161",
  "kind": "photo",
  "src": "/photos/g161.jpg",
  "alt": "Portrait of 1 person at a lake scene",
  "width": 4134,
  "height": 6201,
  "date": "2025-11-06",
  "location": "Udaipur, Rajasthan",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "kayak",
   "tent"
  ],
  "colors": [
   "teal",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 2,
   "hueB": 47,
   "emoji": "🙂"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "photoType": "portrait",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "5Hy-QAKV0to",
   "photographer": "Dmitry Kropachev",
   "profileUrl": "https://unsplash.com/@kropachev",
   "photoUrl": "https://unsplash.com/photos/skyscrapers-in-chicago-city-center-5Hy-QAKV0to"
  }
 },
 {
  "id": "g162",
  "kind": "photo",
  "src": "/photos/g162.jpg",
  "alt": "Lake scene: lake, water, reflection",
  "width": 4672,
  "height": 6797,
  "date": "2025-11-04",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "reflection",
   "boat"
  ],
  "colors": [
   "teal",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 343,
   "hueB": 49,
   "emoji": "🏞️"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "ObftURPUYZU",
   "photographer": "Caroline Badran",
   "profileUrl": "https://unsplash.com/@___atmos",
   "photoUrl": "https://unsplash.com/photos/cream-jacket-and-shorts-on-rack-ObftURPUYZU"
  }
 },
 {
  "id": "g163",
  "kind": "photo",
  "src": "/photos/g163.jpg",
  "alt": "Group photo of 5 people",
  "width": 3323,
  "height": 4985,
  "date": "2025-11-01",
  "location": "Hampi, Karnataka",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 5,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "orange",
   "black"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 206,
   "hueB": 240,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "action",
  "timeOfDay": "night",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "d8h0SuLm9jI",
   "photographer": "Henry Tuchez",
   "profileUrl": "https://unsplash.com/@henrytuchez",
   "photoUrl": "https://unsplash.com/photos/woman-in-cream-dress-on-stone-steps-d8h0SuLm9jI"
  }
 },
 {
  "id": "g164",
  "kind": "photo",
  "src": "/photos/g164.jpg",
  "alt": "Temple scene: lamps",
  "width": 3605,
  "height": 5407,
  "date": "2025-10-31",
  "location": "Hampi, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lamps"
  ],
  "colors": [
   "green",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 283,
   "hueB": 317,
   "emoji": "🛕"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "voG9sYih3ds",
   "photographer": "Filip Kvasnak",
   "profileUrl": "https://unsplash.com/@filipkvasnak",
   "photoUrl": "https://unsplash.com/photos/crescent-moon-over-dark-forest-silhouette-voG9sYih3ds"
  }
 },
 {
  "id": "g165",
  "kind": "photo",
  "src": "/photos/g165.jpg",
  "alt": "Beach scene: sand",
  "width": 2913,
  "height": 4076,
  "date": "2025-10-25",
  "location": "Lisbon, Portugal",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sand"
  ],
  "colors": [
   "teal",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 71,
   "hueB": 98,
   "emoji": "🏖️"
  },
  "timeOfDay": "sunset",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "P_1fe_4cbf4",
   "photographer": "Kris Tian",
   "profileUrl": "https://unsplash.com/@kris_tian",
   "photoUrl": "https://unsplash.com/photos/man-riding-scooter-in-beijing-P_1fe_4cbf4"
  }
 },
 {
  "id": "g166",
  "kind": "photo",
  "src": "/photos/g166.jpg",
  "alt": "Candid of 1 person at a lake scene",
  "width": 4096,
  "height": 2731,
  "date": "2025-10-24",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "mountains",
   "boat"
  ],
  "colors": [
   "orange",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 322,
   "hueB": 19,
   "emoji": "🙂"
  },
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "photoType": "candid",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "1lLqsynNaZY",
   "photographer": "Oleg",
   "profileUrl": "https://unsplash.com/@olezhanjudi",
   "photoUrl": "https://unsplash.com/photos/autumn-leaf-reflections-on-water-1lLqsynNaZY"
  }
 },
 {
  "id": "g167",
  "kind": "photo",
  "src": "/photos/g167.jpg",
  "alt": "Pet scene: pet portrait (dog)",
  "width": 4000,
  "height": 2668,
  "date": "2025-10-23",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "dog"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "white",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 207,
   "hueB": 276,
   "emoji": "🐕"
  },
  "unsplashCredit": {
   "photoId": "XQMlNhjorBQ",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/young-man-uses-laptop-portable-storage-device-on-table-XQMlNhjorBQ"
  }
 },
 {
  "id": "g168",
  "kind": "photo",
  "src": "/photos/g168.jpg",
  "alt": "Pet scene: pet portrait (cat)",
  "width": 3944,
  "height": 7008,
  "date": "2025-10-23",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "cat"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "teal",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 41,
   "hueB": 109,
   "emoji": "🐕"
  },
  "unsplashCredit": {
   "photoId": "FZ7yMBQCFXM",
   "photographer": "Ali Aziz",
   "profileUrl": "https://unsplash.com/@thealiaziz",
   "photoUrl": "https://unsplash.com/photos/stained-glass-dome-in-paris-FZ7yMBQCFXM"
  }
 },
 {
  "id": "g169",
  "kind": "photo",
  "src": "/photos/g169.jpg",
  "alt": "Group of 5 people at a lake scene",
  "width": 7888,
  "height": 9860,
  "date": "2025-10-23",
  "location": "Udaipur, Rajasthan",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 5,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "boat"
  ],
  "colors": [
   "white",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 58,
   "hueB": 94,
   "emoji": "👥"
  },
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "photoType": "group",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "grQPk2AdrRM",
   "photographer": "Ali Aziz",
   "profileUrl": "https://unsplash.com/@thealiaziz",
   "photoUrl": "https://unsplash.com/photos/ornate-green-doors-in-stone-facade-grQPk2AdrRM"
  }
 },
 {
  "id": "g170",
  "kind": "photo",
  "src": "/photos/g170.jpg",
  "alt": "Beach scene: sea",
  "width": 4220,
  "height": 2816,
  "date": "2025-10-22",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sea"
  ],
  "colors": [
   "grey",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 308,
   "hueB": 342,
   "emoji": "🏖️"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "SSKYe-bsLUg",
   "photographer": "Ahmet Yüksek ✪",
   "profileUrl": "https://unsplash.com/@ahmetyuksek",
   "photoUrl": "https://unsplash.com/photos/brown-frog-on-green-lily-pad-SSKYe-bsLUg"
  }
 },
 {
  "id": "g171",
  "kind": "photo",
  "src": "/photos/g171.jpg",
  "alt": "Selfie of 1 person at a sunset scene",
  "width": 3000,
  "height": 2001,
  "date": "2025-10-19",
  "location": "Lisbon, Portugal",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "sunset",
   "sky"
  ],
  "colors": [
   "teal",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 58,
   "hueB": 107,
   "emoji": "🙂"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "photoType": "selfie",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "p0lRVTkrfpE",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/smiling-woman-uses-laptop-person-holds-credit-card-nearby-p0lRVTkrfpE"
  }
 },
 {
  "id": "g172",
  "kind": "photo",
  "src": "/photos/g172.jpg",
  "alt": "Home scene: plants",
  "width": 4000,
  "height": 5333,
  "date": "2025-10-17",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "plants"
  ],
  "colors": [
   "blue",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 63,
   "hueB": 121,
   "emoji": "🛋️"
  },
  "unsplashCredit": {
   "photoId": "pQ0b41l-xW8",
   "photographer": "Linus Belanger",
   "profileUrl": "https://unsplash.com/@linusbelanger",
   "photoUrl": "https://unsplash.com/photos/dried-flowers-on-pink-teal-gradient-pQ0b41l-xW8"
  }
 },
 {
  "id": "g173",
  "kind": "photo",
  "src": "/photos/g173.jpg",
  "alt": "Lake scene: lake, water, mountains",
  "width": 3823,
  "height": 5734,
  "date": "2025-10-16",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "mountains"
  ],
  "colors": [
   "grey",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 283,
   "hueB": 321,
   "emoji": "🏞️"
  },
  "timeOfDay": "afternoon",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "oUYPvibFtEM",
   "photographer": "NIR HIMI",
   "profileUrl": "https://unsplash.com/@nirhimi",
   "photoUrl": "https://unsplash.com/photos/a-lone-figure-walks-across-a-vast-desert-dune-oUYPvibFtEM"
  }
 },
 {
  "id": "g174",
  "kind": "photo",
  "src": "/photos/g174.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 7722,
  "height": 11583,
  "date": "2025-10-16",
  "location": "Mumbai, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "gym"
  ],
  "colors": [
   "pink",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 58,
   "hueB": 105,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "action",
  "timeOfDay": "night",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "711mZUxBgro",
   "photographer": "Dmitry Kropachev",
   "profileUrl": "https://unsplash.com/@kropachev",
   "photoUrl": "https://unsplash.com/photos/woman-outside-bahai-temple-in-santiago-711mZUxBgro"
  }
 },
 {
  "id": "g175",
  "kind": "photo",
  "src": "/photos/g175.jpg",
  "alt": "Temple scene: lamps",
  "width": 4000,
  "height": 6000,
  "date": "2025-10-13",
  "location": "Rishikesh, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lamps"
  ],
  "colors": [
   "blue",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 225,
   "hueB": 252,
   "emoji": "🛕"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "FyVM48yP-S4",
   "photographer": "Mike Cox",
   "profileUrl": "https://unsplash.com/@iprefermike",
   "photoUrl": "https://unsplash.com/photos/person-in-blazer-using-smartphone-FyVM48yP-S4"
  }
 },
 {
  "id": "g176",
  "kind": "photo",
  "src": "/photos/g176.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 3445,
  "height": 5140,
  "date": "2025-10-12",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "festival"
  ],
  "colors": [
   "orange",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 147,
   "hueB": 180,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "serious",
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "_gtqfkE948g",
   "photographer": "Maximilian Bungart",
   "profileUrl": "https://unsplash.com/@hypernature",
   "photoUrl": "https://unsplash.com/photos/dachshund-figurine-on-car-rear-shelf-_gtqfkE948g"
  }
 },
 {
  "id": "g177",
  "kind": "photo",
  "src": "/photos/g177.jpg",
  "alt": "Group photo of 8 people",
  "width": 3838,
  "height": 5120,
  "date": "2025-10-09",
  "location": "Rishikesh, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 8,
  "animals": [],
  "objects": [
   "street"
  ],
  "colors": [
   "black",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 324,
   "hueB": 354,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "action",
  "timeOfDay": "sunset",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "4qm1EGFaJe4",
   "photographer": "EMD Optics",
   "profileUrl": "https://unsplash.com/@emdoptics",
   "photoUrl": "https://unsplash.com/photos/staircase-leading-to-exit-doorway-4qm1EGFaJe4"
  }
 },
 {
  "id": "g178",
  "kind": "photo",
  "src": "/photos/g178.jpg",
  "alt": "Sunset scene: sunset, mountains, sky",
  "width": 6265,
  "height": 4293,
  "date": "2025-10-08",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "mountains",
   "sky"
  ],
  "colors": [
   "green",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 236,
   "hueB": 289,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "AbQJp-Q2qjE",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/skyscrapers-and-brisbane-river-in-brisbane-AbQJp-Q2qjE"
  }
 },
 {
  "id": "g179",
  "kind": "document",
  "src": null,
  "alt": "Screenshot",
  "width": 900,
  "height": 1200,
  "date": "2025-10-08",
  "location": "Lisbon, Portugal",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "screenshot",
  "textContent": [
   "date",
   "name"
  ],
  "language": "Hindi"
 },
 {
  "id": "g180",
  "kind": "photo",
  "src": "/photos/g180.jpg",
  "alt": "Selfie of 1 person at a food scene",
  "width": 4094,
  "height": 6141,
  "date": "2025-10-07",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "table",
   "cafe"
  ],
  "colors": [
   "teal",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 60,
   "hueB": 119,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "kvyMgooYwgw",
   "photographer": "sayan Nath",
   "profileUrl": "https://unsplash.com/@hiresayan",
   "photoUrl": "https://unsplash.com/photos/person-on-rocky-desert-cliff-kvyMgooYwgw"
  }
 },
 {
  "id": "g181",
  "kind": "photo",
  "src": "/photos/g181.jpg",
  "alt": "Lake scene: lake, water, forest",
  "width": 3840,
  "height": 2160,
  "date": "2025-10-05",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "forest",
   "tent"
  ],
  "colors": [
   "brown",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 321,
   "hueB": 6,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "8qyyTHeI99U",
   "photographer": "sayan Nath",
   "profileUrl": "https://unsplash.com/@hiresayan",
   "photoUrl": "https://unsplash.com/photos/striped-hill-in-vast-desert-8qyyTHeI99U"
  }
 },
 {
  "id": "g182",
  "kind": "photo",
  "src": "/photos/g182.jpg",
  "alt": "Pet scene: pet portrait (dog)",
  "width": 3114,
  "height": 4667,
  "date": "2025-10-03",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "dog"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "white",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 139,
   "hueB": 185,
   "emoji": "🐕"
  },
  "unsplashCredit": {
   "photoId": "AoWV295_E7w",
   "photographer": "Ahmet Yüksek ✪",
   "profileUrl": "https://unsplash.com/@ahmetyuksek",
   "photoUrl": "https://unsplash.com/photos/cozy-living-room-with-wooden-walls-AoWV295_E7w"
  }
 },
 {
  "id": "g183",
  "kind": "document",
  "src": null,
  "alt": "Receipt",
  "width": 900,
  "height": 1200,
  "date": "2025-09-24",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "receipt",
  "textContent": [
   "number",
   "date"
  ],
  "language": "English"
 },
 {
  "id": "g184",
  "kind": "photo",
  "src": "/photos/g184.jpg",
  "alt": "Fort scene: gate",
  "width": 3972,
  "height": 5958,
  "date": "2025-09-20",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "gate"
  ],
  "colors": [
   "white",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 179,
   "hueB": 204,
   "emoji": "🏰"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "gEy87N7lgQw",
   "photographer": "Ismail Mohamed - SoviLe",
   "profileUrl": "https://unsplash.com/@sovile",
   "photoUrl": "https://unsplash.com/photos/person-walking-on-sandy-beach-gEy87N7lgQw"
  }
 },
 {
  "id": "g185",
  "kind": "photo",
  "src": "/photos/g185.jpg",
  "alt": "Selfie photo of 2 people",
  "width": 2832,
  "height": 4256,
  "date": "2025-09-20",
  "location": "Hampi, Karnataka",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "street"
  ],
  "colors": [
   "orange",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 222,
   "hueB": 257,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "Nesg78e8xxQ",
   "photographer": "Daniel Stiel",
   "profileUrl": "https://unsplash.com/@danielstiel",
   "photoUrl": "https://unsplash.com/photos/courtyard-with-potted-plants-and-tiled-floor-Nesg78e8xxQ"
  }
 },
 {
  "id": "g186",
  "kind": "document",
  "src": null,
  "alt": "Receipt",
  "width": 900,
  "height": 1200,
  "date": "2025-09-19",
  "location": "Delhi, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "receipt",
  "textContent": [
   "number",
   "date"
  ],
  "language": "English"
 },
 {
  "id": "g187",
  "kind": "document",
  "src": null,
  "alt": "Ticket",
  "width": 900,
  "height": 1200,
  "date": "2025-09-19",
  "location": "Hampi, Karnataka",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "ticket",
  "textContent": [
   "date",
   "number"
  ],
  "language": "English"
 },
 {
  "id": "g188",
  "kind": "photo",
  "src": "/photos/g188.jpg",
  "alt": "Lake scene: lake, water, forest",
  "width": 3076,
  "height": 2051,
  "date": "2025-09-17",
  "location": "Munnar, Kerala",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "forest"
  ],
  "colors": [
   "teal",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 204,
   "hueB": 244,
   "emoji": "🏞️"
  },
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "gFswBJPtR_E",
   "photographer": "Nikita Pishchugin",
   "profileUrl": "https://unsplash.com/@nikita_pishchugin",
   "photoUrl": "https://unsplash.com/photos/straw-umbrellas-on-beach-in-bodrum-gFswBJPtR_E"
  }
 },
 {
  "id": "g189",
  "kind": "photo",
  "src": "/photos/g189.jpg",
  "alt": "Vehicle scene: bike",
  "width": 3000,
  "height": 2001,
  "date": "2025-09-17",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "bike"
  ],
  "colors": [
   "brown",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 187,
   "hueB": 221,
   "emoji": "🚗"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "BiN7U2lF53A",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/two-people-collaborating-on-a-laptop-in-a-bright-room-BiN7U2lF53A"
  }
 },
 {
  "id": "g190",
  "kind": "photo",
  "src": "/photos/g190.jpg",
  "alt": "Home scene: sofa, kitchen",
  "width": 4256,
  "height": 5188,
  "date": "2025-09-10",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sofa",
   "kitchen"
  ],
  "colors": [
   "blue",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 344,
   "hueB": 26,
   "emoji": "🛋️"
  },
  "unsplashCredit": {
   "photoId": "DBi0GRKrY4A",
   "photographer": "curaits",
   "profileUrl": "https://unsplash.com/@curaits",
   "photoUrl": "https://unsplash.com/photos/basketball-before-ornate-stone-doorway-DBi0GRKrY4A"
  }
 },
 {
  "id": "g191",
  "kind": "photo",
  "src": "/photos/g191.jpg",
  "alt": "Portrait of 1 person at a snow scene",
  "width": 6048,
  "height": 4032,
  "date": "2025-09-06",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "pine trees"
  ],
  "colors": [
   "pink",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 66,
   "hueB": 129,
   "emoji": "🙂"
  },
  "timeOfDay": "morning",
  "sky": "clear",
  "photoType": "portrait",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "-pewxZl8j_I",
   "photographer": "Egor Myznik",
   "profileUrl": "https://unsplash.com/@vonshnauzer",
   "photoUrl": "https://unsplash.com/photos/vintage-car-headlights-and-chrome-bumper--pewxZl8j_I"
  }
 },
 {
  "id": "g192",
  "kind": "photo",
  "src": "/photos/g192.jpg",
  "alt": "Lake scene: lake, water, forest",
  "width": 4160,
  "height": 5200,
  "date": "2025-09-02",
  "location": "Munnar, Kerala",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "forest"
  ],
  "colors": [
   "white",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 5,
   "hueB": 73,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "DgfWOj2pWGI",
   "photographer": "Farid Daba",
   "profileUrl": "https://unsplash.com/@faridworld",
   "photoUrl": "https://unsplash.com/photos/woman-in-white-dress-on-sofa-DgfWOj2pWGI"
  }
 },
 {
  "id": "g193",
  "kind": "photo",
  "src": "/photos/g193.jpg",
  "alt": "Candid of 2 people at a lake scene",
  "width": 4160,
  "height": 6240,
  "date": "2025-08-26",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "forest"
  ],
  "colors": [
   "teal",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 299,
   "hueB": 354,
   "emoji": "🙂"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "photoType": "candid",
  "pose": "smiling",
  "unsplashCredit": {
   "photoId": "oOFRTWa6EQg",
   "photographer": "Caroline Badran",
   "profileUrl": "https://unsplash.com/@___atmos",
   "photoUrl": "https://unsplash.com/photos/camera-and-book-on-marble-table-oOFRTWa6EQg"
  }
 },
 {
  "id": "g194",
  "kind": "photo",
  "src": "/photos/g194.jpg",
  "alt": "Portrait of 1 person at a sunset scene",
  "width": 8640,
  "height": 5760,
  "date": "2025-08-26",
  "location": "Udaipur, Rajasthan",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "sunset",
   "sea",
   "city"
  ],
  "colors": [
   "green",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 186,
   "hueB": 243,
   "emoji": "🙂"
  },
  "timeOfDay": "sunset",
  "sky": "foggy",
  "photoType": "portrait",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "yXgQE7S6cGw",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/man-and-woman-walking-in-garden-yXgQE7S6cGw"
  }
 },
 {
  "id": "g195",
  "kind": "photo",
  "src": "/photos/g195.jpg",
  "alt": "Trek scene: backpack, trail",
  "width": 4134,
  "height": 6201,
  "date": "2025-08-24",
  "location": "Nainital, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "backpack",
   "trail"
  ],
  "colors": [
   "brown",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 278,
   "hueB": 327,
   "emoji": "🥾"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "5Hy-QAKV0to",
   "photographer": "Dmitry Kropachev",
   "profileUrl": "https://unsplash.com/@kropachev",
   "photoUrl": "https://unsplash.com/photos/skyscrapers-in-chicago-city-center-5Hy-QAKV0to"
  }
 },
 {
  "id": "g196",
  "kind": "photo",
  "src": "/photos/g196.jpg",
  "alt": "Food scene: dessert, cafe",
  "width": 4672,
  "height": 6797,
  "date": "2025-08-21",
  "location": "Goa, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "dessert",
   "cafe"
  ],
  "colors": [
   "grey",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 12,
   "hueB": 76,
   "emoji": "🍜"
  },
  "unsplashCredit": {
   "photoId": "ObftURPUYZU",
   "photographer": "Caroline Badran",
   "profileUrl": "https://unsplash.com/@___atmos",
   "photoUrl": "https://unsplash.com/photos/cream-jacket-and-shorts-on-rack-ObftURPUYZU"
  }
 },
 {
  "id": "g197",
  "kind": "photo",
  "src": "/photos/g197.jpg",
  "alt": "Food scene: dessert, food",
  "width": 3323,
  "height": 4985,
  "date": "2025-08-20",
  "location": "Bali, Indonesia",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "dessert",
   "food"
  ],
  "colors": [
   "pink",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 335,
   "hueB": 37,
   "emoji": "🍜"
  },
  "unsplashCredit": {
   "photoId": "d8h0SuLm9jI",
   "photographer": "Henry Tuchez",
   "profileUrl": "https://unsplash.com/@henrytuchez",
   "photoUrl": "https://unsplash.com/photos/woman-in-cream-dress-on-stone-steps-d8h0SuLm9jI"
  }
 },
 {
  "id": "g198",
  "kind": "photo",
  "src": "/photos/g198.jpg",
  "alt": "Sunset scene: sunset, clouds, city",
  "width": 3605,
  "height": 5407,
  "date": "2025-08-19",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "clouds",
   "city"
  ],
  "colors": [
   "brown",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 274,
   "hueB": 337,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "voG9sYih3ds",
   "photographer": "Filip Kvasnak",
   "profileUrl": "https://unsplash.com/@filipkvasnak",
   "photoUrl": "https://unsplash.com/photos/crescent-moon-over-dark-forest-silhouette-voG9sYih3ds"
  }
 },
 {
  "id": "g199",
  "kind": "photo",
  "src": "/photos/g199.jpg",
  "alt": "Home scene: lamp, books",
  "width": 2913,
  "height": 4076,
  "date": "2025-08-10",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lamp",
   "books"
  ],
  "colors": [
   "teal",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 166,
   "hueB": 201,
   "emoji": "🛋️"
  },
  "unsplashCredit": {
   "photoId": "P_1fe_4cbf4",
   "photographer": "Kris Tian",
   "profileUrl": "https://unsplash.com/@kris_tian",
   "photoUrl": "https://unsplash.com/photos/man-riding-scooter-in-beijing-P_1fe_4cbf4"
  }
 },
 {
  "id": "g200",
  "kind": "photo",
  "src": "/photos/g200.jpg",
  "alt": "Lake scene: lake, water, boat",
  "width": 4096,
  "height": 2731,
  "date": "2025-08-07",
  "location": "Zurich, Switzerland",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "boat",
   "mountains"
  ],
  "colors": [
   "blue",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 240,
   "hueB": 267,
   "emoji": "🏞️"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "1lLqsynNaZY",
   "photographer": "Oleg",
   "profileUrl": "https://unsplash.com/@olezhanjudi",
   "photoUrl": "https://unsplash.com/photos/autumn-leaf-reflections-on-water-1lLqsynNaZY"
  }
 },
 {
  "id": "g201",
  "kind": "photo",
  "src": "/photos/g201.jpg",
  "alt": "Lake scene: lake, water, boat",
  "width": 4000,
  "height": 2668,
  "date": "2025-08-03",
  "location": "Munnar, Kerala",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "boat",
   "forest"
  ],
  "colors": [
   "white",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 126,
   "hueB": 186,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "XQMlNhjorBQ",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/young-man-uses-laptop-portable-storage-device-on-table-XQMlNhjorBQ"
  }
 },
 {
  "id": "g202",
  "kind": "photo",
  "src": "/photos/g202.jpg",
  "alt": "Lake scene: lake, water, reflection",
  "width": 3944,
  "height": 7008,
  "date": "2025-07-29",
  "location": "Zurich, Switzerland",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "reflection"
  ],
  "colors": [
   "teal",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 230,
   "hueB": 290,
   "emoji": "🏞️"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "FZ7yMBQCFXM",
   "photographer": "Ali Aziz",
   "profileUrl": "https://unsplash.com/@thealiaziz",
   "photoUrl": "https://unsplash.com/photos/stained-glass-dome-in-paris-FZ7yMBQCFXM"
  }
 },
 {
  "id": "g203",
  "kind": "photo",
  "src": "/photos/g203.jpg",
  "alt": "Trek scene: valley",
  "width": 7888,
  "height": 9860,
  "date": "2025-07-25",
  "location": "Coorg, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "valley"
  ],
  "colors": [
   "orange",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 12,
   "hueB": 67,
   "emoji": "🥾"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "grQPk2AdrRM",
   "photographer": "Ali Aziz",
   "profileUrl": "https://unsplash.com/@thealiaziz",
   "photoUrl": "https://unsplash.com/photos/ornate-green-doors-in-stone-facade-grQPk2AdrRM"
  }
 },
 {
  "id": "g204",
  "kind": "photo",
  "src": "/photos/g204.jpg",
  "alt": "Sunset scene: sunset, city",
  "width": 4220,
  "height": 2816,
  "date": "2025-07-24",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "city"
  ],
  "colors": [
   "blue",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 329,
   "hueB": 36,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "SSKYe-bsLUg",
   "photographer": "Ahmet Yüksek ✪",
   "profileUrl": "https://unsplash.com/@ahmetyuksek",
   "photoUrl": "https://unsplash.com/photos/brown-frog-on-green-lily-pad-SSKYe-bsLUg"
  }
 },
 {
  "id": "g205",
  "kind": "document",
  "src": null,
  "alt": "Ticket",
  "width": 900,
  "height": 1200,
  "date": "2025-07-24",
  "location": "Delhi, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "ticket",
  "textContent": [
   "date",
   "number"
  ],
  "language": "English"
 },
 {
  "id": "g206",
  "kind": "document",
  "src": null,
  "alt": "Ticket",
  "width": 900,
  "height": 1200,
  "date": "2025-07-22",
  "location": "Udaipur, Rajasthan",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "ticket",
  "textContent": [
   "date",
   "number"
  ],
  "language": "German"
 },
 {
  "id": "g207",
  "kind": "photo",
  "src": "/photos/g207.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 4128,
  "height": 6192,
  "date": "2025-07-17",
  "location": "Nainital, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "car"
  ],
  "colors": [
   "green",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 71,
   "hueB": 103,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "smiling",
  "timeOfDay": "morning",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "qY94G63w-9Y",
   "photographer": "Tobias Reich",
   "profileUrl": "https://unsplash.com/@electerious",
   "photoUrl": "https://unsplash.com/photos/sunlight-in-indoor-botanical-garden-qY94G63w-9Y"
  }
 },
 {
  "id": "g208",
  "kind": "photo",
  "src": "/photos/g208.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 2207,
  "height": 3130,
  "date": "2025-07-17",
  "location": "Hampi, Karnataka",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "cake"
  ],
  "colors": [
   "white",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 70,
   "hueB": 121,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "smiling",
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "uSEM9VCJQQQ",
   "photographer": "Richard Stachmann",
   "profileUrl": "https://unsplash.com/@stachmann",
   "photoUrl": "https://unsplash.com/photos/palm-house-conservatory-in-vienna-uSEM9VCJQQQ"
  }
 },
 {
  "id": "g209",
  "kind": "photo",
  "src": "/photos/g209.jpg",
  "alt": "Lake scene: lake, water, reflection",
  "width": 3125,
  "height": 4688,
  "date": "2025-07-16",
  "location": "Zurich, Switzerland",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "reflection"
  ],
  "colors": [
   "grey",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 159,
   "hueB": 209,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "abm-8Dk3U0c",
   "photographer": "Kevin Grieve",
   "profileUrl": "https://unsplash.com/@grievek1610begur",
   "photoUrl": "https://unsplash.com/photos/silhouettes-of-people-against-colorful-light-abm-8Dk3U0c"
  }
 },
 {
  "id": "g210",
  "kind": "document",
  "src": null,
  "alt": "Screenshot",
  "width": 900,
  "height": 1200,
  "date": "2025-07-15",
  "location": "Banff, Canada",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "screenshot",
  "textContent": [
   "date",
   "name"
  ],
  "language": "English"
 },
 {
  "id": "g211",
  "kind": "photo",
  "src": "/photos/g211.jpg",
  "alt": "Group photo of 5 people",
  "width": 7728,
  "height": 5152,
  "date": "2025-07-13",
  "location": "Nainital, Uttarakhand",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 5,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "pink",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 119,
   "hueB": 178,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "serious",
  "unsplashCredit": {
   "photoId": "_jZCc9xCJ38",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/people-climbing-steel-bridge-structure-_jZCc9xCJ38"
  }
 },
 {
  "id": "g212",
  "kind": "photo",
  "src": "/photos/g212.jpg",
  "alt": "Portrait of 1 person at a city scene",
  "width": 3840,
  "height": 2560,
  "date": "2025-07-10",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "building",
   "bridge"
  ],
  "colors": [
   "brown",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 184,
   "hueB": 227,
   "emoji": "🙂"
  },
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "photoType": "portrait",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "HAx5VJPw9CQ",
   "photographer": "MATTHIAS CHO",
   "profileUrl": "https://unsplash.com/@stillhour_film",
   "photoUrl": "https://unsplash.com/photos/child-pushing-red-ball-uphill-HAx5VJPw9CQ"
  }
 },
 {
  "id": "g213",
  "kind": "photo",
  "src": "/photos/g213.jpg",
  "alt": "Fort scene: gate",
  "width": 4492,
  "height": 6774,
  "date": "2025-07-09",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "gate"
  ],
  "colors": [
   "pink",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 271,
   "hueB": 306,
   "emoji": "🏰"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "unsplashCredit": {
   "photoId": "t1w5cLWcJ0E",
   "photographer": "Jason Zeis",
   "profileUrl": "https://unsplash.com/@zeis",
   "photoUrl": "https://unsplash.com/photos/mountain-slope-with-autumn-foliage-t1w5cLWcJ0E"
  }
 },
 {
  "id": "g214",
  "kind": "photo",
  "src": "/photos/g214.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 4763,
  "height": 3175,
  "date": "2025-07-04",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "car"
  ],
  "colors": [
   "black",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 261,
   "hueB": 293,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "serious",
  "unsplashCredit": {
   "photoId": "BBF-RGGXGvI",
   "photographer": "Mat",
   "profileUrl": "https://unsplash.com/@mathelot",
   "photoUrl": "https://unsplash.com/photos/ship-deck-with-red-hull-BBF-RGGXGvI"
  }
 },
 {
  "id": "g215",
  "kind": "photo",
  "src": "/photos/g215.jpg",
  "alt": "Group photo of 6 people",
  "width": 3000,
  "height": 2000,
  "date": "2025-07-04",
  "location": "Bali, Indonesia",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 6,
  "animals": [],
  "objects": [
   "sunglasses"
  ],
  "colors": [
   "green",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 40,
   "hueB": 97,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "serious",
  "unsplashCredit": {
   "photoId": "1m3nQvYYW_A",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/a-hand-inserting-a-blue-usb-drive-into-a-laptop-1m3nQvYYW_A"
  }
 },
 {
  "id": "g216",
  "kind": "photo",
  "src": "/photos/g216.jpg",
  "alt": "Lake scene: lake, water, tent",
  "width": 5472,
  "height": 3648,
  "date": "2025-06-30",
  "location": "Udaipur, Rajasthan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "tent"
  ],
  "colors": [
   "brown",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 288,
   "hueB": 315,
   "emoji": "🏞️"
  },
  "timeOfDay": "afternoon",
  "sky": "clear",
  "unsplashCredit": {
   "photoId": "S7xPalu0zKQ",
   "photographer": "Helena Lopes",
   "profileUrl": "https://unsplash.com/@helenalopesph",
   "photoUrl": "https://unsplash.com/photos/woman-hugging-brown-horse-in-plaid-S7xPalu0zKQ"
  }
 },
 {
  "id": "g217",
  "kind": "photo",
  "src": "/photos/g217.jpg",
  "alt": "Food scene: food, plate",
  "width": 3004,
  "height": 4012,
  "date": "2025-06-23",
  "location": "Udaipur, Rajasthan",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "food",
   "plate"
  ],
  "colors": [
   "blue",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 104,
   "hueB": 148,
   "emoji": "🍜"
  },
  "unsplashCredit": {
   "photoId": "Fdr6GonTzms",
   "photographer": "Jason Leung",
   "profileUrl": "https://unsplash.com/@ninjason",
   "photoUrl": "https://unsplash.com/photos/diner-interior-with-red-chairs-Fdr6GonTzms"
  }
 },
 {
  "id": "g218",
  "kind": "photo",
  "src": "/photos/g218.jpg",
  "alt": "Food scene: food, plate",
  "width": 3072,
  "height": 3840,
  "date": "2025-06-13",
  "location": "Jaipur, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "food",
   "plate"
  ],
  "colors": [
   "green",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 10,
   "hueB": 72,
   "emoji": "🍜"
  },
  "unsplashCredit": {
   "photoId": "HusWR8AgVqo",
   "photographer": "Leonardo Iribe",
   "profileUrl": "https://unsplash.com/@leonardodbi",
   "photoUrl": "https://unsplash.com/photos/person-in-bright-red-light-HusWR8AgVqo"
  }
 },
 {
  "id": "g219",
  "kind": "photo",
  "src": "/photos/g219.jpg",
  "alt": "Candid photo of 2 people",
  "width": 6240,
  "height": 4160,
  "date": "2025-06-02",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "festival"
  ],
  "colors": [
   "blue",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 98,
   "hueB": 135,
   "emoji": "🙂"
  },
  "photoType": "candid",
  "pose": "serious",
  "unsplashCredit": {
   "photoId": "-uS0266ec-M",
   "photographer": "Queensland, Australia",
   "profileUrl": "https://unsplash.com/@queenslandaustralia",
   "photoUrl": "https://unsplash.com/photos/roller-coaster-climbing-red-track--uS0266ec-M"
  }
 },
 {
  "id": "g220",
  "kind": "photo",
  "src": "/photos/g220.jpg",
  "alt": "Trek scene: forest, mountains",
  "width": 5209,
  "height": 7810,
  "date": "2025-05-29",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "forest",
   "mountains"
  ],
  "colors": [
   "grey",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 68,
   "hueB": 123,
   "emoji": "🥾"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "Wm27Vf65NIg",
   "photographer": "Heather Newsom",
   "profileUrl": "https://unsplash.com/@native7photo",
   "photoUrl": "https://unsplash.com/photos/four-lit-red-candles-in-holders-Wm27Vf65NIg"
  }
 },
 {
  "id": "g221",
  "kind": "photo",
  "src": "/photos/g221.jpg",
  "alt": "Candid photo of 1 person",
  "width": 4000,
  "height": 6000,
  "date": "2025-05-27",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "festival"
  ],
  "colors": [
   "white",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 27,
   "hueB": 61,
   "emoji": "🙂"
  },
  "photoType": "candid",
  "pose": "action",
  "timeOfDay": "afternoon",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "PhznYLlylU0",
   "photographer": "Elijah Grimm",
   "profileUrl": "https://unsplash.com/@robbin_grimm",
   "photoUrl": "https://unsplash.com/photos/woman-in-red-light-by-lake-PhznYLlylU0"
  }
 },
 {
  "id": "g222",
  "kind": "photo",
  "src": "/photos/g222.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 9470,
  "height": 8457,
  "date": "2025-05-26",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "festival"
  ],
  "colors": [
   "blue",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 162,
   "hueB": 195,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "smiling",
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "YTHRL-MtPZI",
   "photographer": "Zhen Yao",
   "profileUrl": "https://unsplash.com/@rex_filmer",
   "photoUrl": "https://unsplash.com/photos/minibuses-on-neon-city-street-YTHRL-MtPZI"
  }
 },
 {
  "id": "g223",
  "kind": "photo",
  "src": "/photos/g223.jpg",
  "alt": "Candid photo of 4 people",
  "width": 3325,
  "height": 4433,
  "date": "2025-05-25",
  "location": "Delhi, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 4,
  "animals": [],
  "objects": [
   "cake"
  ],
  "colors": [
   "black",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 334,
   "hueB": 0,
   "emoji": "👥"
  },
  "photoType": "candid",
  "pose": "posing",
  "timeOfDay": "night",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "TOEAo8g-zUk",
   "photographer": "Lens by Benji",
   "profileUrl": "https://unsplash.com/@lens_by_benji",
   "photoUrl": "https://unsplash.com/photos/corner-cafe-with-red-awnings-paris-TOEAo8g-zUk"
  }
 },
 {
  "id": "g224",
  "kind": "photo",
  "src": "/photos/g224.jpg",
  "alt": "Fort scene: gate",
  "width": 3888,
  "height": 5184,
  "date": "2025-05-22",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "gate"
  ],
  "colors": [
   "green",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 145,
   "hueB": 199,
   "emoji": "🏰"
  },
  "timeOfDay": "morning",
  "sky": "cloudy",
  "unsplashCredit": {
   "photoId": "GCbUtuH7Uu8",
   "photographer": "Rafael Garcin",
   "profileUrl": "https://unsplash.com/@nimbus_vulpis",
   "photoUrl": "https://unsplash.com/photos/lighthouse-silhouette-against-low-sun-GCbUtuH7Uu8"
  }
 },
 {
  "id": "g225",
  "kind": "photo",
  "src": "/photos/g225.jpg",
  "alt": "Selfie of 1 person at a sunset scene",
  "width": 3349,
  "height": 5024,
  "date": "2025-05-19",
  "location": "Udaipur, Rajasthan",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "sunset",
   "city",
   "sea"
  ],
  "colors": [
   "teal",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 295,
   "hueB": 328,
   "emoji": "🙂"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "photoType": "selfie",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "D4BPjX-jGEw",
   "photographer": "Dan Begel",
   "profileUrl": "https://unsplash.com/@danbegel",
   "photoUrl": "https://unsplash.com/photos/person-cycling-past-house-in-autumn-D4BPjX-jGEw"
  }
 },
 {
  "id": "g226",
  "kind": "photo",
  "src": "/photos/g226.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 3000,
  "height": 2001,
  "date": "2025-05-14",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "cafe"
  ],
  "colors": [
   "blue",
   "black"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 231,
   "hueB": 273,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "serious",
  "unsplashCredit": {
   "photoId": "4f17CPrrxlY",
   "photographer": "Sandisk",
   "profileUrl": "https://unsplash.com/@sandisk",
   "photoUrl": "https://unsplash.com/photos/a-person-inserts-a-memory-card-into-a-digital-device-4f17CPrrxlY"
  }
 },
 {
  "id": "g227",
  "kind": "photo",
  "src": "/photos/g227.jpg",
  "alt": "Selfie photo of 2 people",
  "width": 3259,
  "height": 2185,
  "date": "2025-05-14",
  "location": "Pangong, Ladakh",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "car"
  ],
  "colors": [
   "blue",
   "black"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 133,
   "hueB": 199,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "action",
  "unsplashCredit": {
   "photoId": "ZKIzGVPFv-4",
   "photographer": "T",
   "profileUrl": "https://unsplash.com/@tanyabarrow",
   "photoUrl": "https://unsplash.com/photos/green-fields-and-hills-from-mirror-ZKIzGVPFv-4"
  }
 },
 {
  "id": "g228",
  "kind": "photo",
  "src": "/photos/g228.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 900,
  "height": 1200,
  "date": "2025-05-11",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "green",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 235,
   "hueB": 261,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "smiling"
 },
 {
  "id": "g229",
  "kind": "photo",
  "src": "/photos/g229.jpg",
  "alt": "Candid photo of 3 people",
  "width": 900,
  "height": 600,
  "date": "2025-05-11",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "street"
  ],
  "colors": [
   "white",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 13,
   "hueB": 58,
   "emoji": "👥"
  },
  "photoType": "candid",
  "pose": "posing",
  "timeOfDay": "afternoon",
  "sky": "clear"
 },
 {
  "id": "g230",
  "kind": "photo",
  "src": "/photos/g230.jpg",
  "alt": "Food scene: food, dessert",
  "width": 900,
  "height": 600,
  "date": "2025-05-09",
  "location": "Zurich, Switzerland",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "food",
   "dessert"
  ],
  "colors": [
   "teal",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 8,
   "hueB": 66,
   "emoji": "🍜"
  }
 },
 {
  "id": "g231",
  "kind": "photo",
  "src": "/photos/g231.jpg",
  "alt": "Trek scene: forest, tent",
  "width": 900,
  "height": 600,
  "date": "2025-05-08",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "forest",
   "tent"
  ],
  "colors": [
   "orange",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 115,
   "hueB": 183,
   "emoji": "🥾"
  },
  "timeOfDay": "night",
  "sky": "clear"
 },
 {
  "id": "g232",
  "kind": "photo",
  "src": "/photos/g232.jpg",
  "alt": "Selfie photo of 2 people",
  "width": 900,
  "height": 600,
  "date": "2025-05-08",
  "location": "Kasol, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "sunglasses"
  ],
  "colors": [
   "brown",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 141,
   "hueB": 182,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "posing",
  "timeOfDay": "sunset",
  "sky": "clear"
 },
 {
  "id": "g233",
  "kind": "photo",
  "src": "/photos/g233.jpg",
  "alt": "Lake scene: lake, water, kayak",
  "width": 900,
  "height": 1350,
  "date": "2025-05-05",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "kayak"
  ],
  "colors": [
   "grey",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 164,
   "hueB": 207,
   "emoji": "🏞️"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy"
 },
 {
  "id": "g234",
  "kind": "document",
  "src": null,
  "alt": "ID / card",
  "width": 900,
  "height": 1200,
  "date": "2025-05-02",
  "location": "Kyoto, Japan",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "id",
  "textContent": [
   "name",
   "number"
  ],
  "language": "English"
 },
 {
  "id": "g235",
  "kind": "photo",
  "src": "/photos/g235.jpg",
  "alt": "Trek scene: valley, forest",
  "width": 900,
  "height": 1200,
  "date": "2025-04-29",
  "location": "Rishikesh, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "valley",
   "forest"
  ],
  "colors": [
   "pink",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 156,
   "hueB": 197,
   "emoji": "🥾"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy"
 },
 {
  "id": "g236",
  "kind": "document",
  "src": null,
  "alt": "Receipt",
  "width": 900,
  "height": 1200,
  "date": "2025-04-29",
  "location": "Zurich, Switzerland",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "receipt",
  "textContent": [
   "number",
   "date"
  ],
  "language": "English"
 },
 {
  "id": "g237",
  "kind": "photo",
  "src": "/photos/g237.jpg",
  "alt": "Lake scene: lake, water, reflection",
  "width": 900,
  "height": 1350,
  "date": "2025-04-26",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "reflection",
   "boat"
  ],
  "colors": [
   "pink",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 240,
   "hueB": 287,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "foggy"
 },
 {
  "id": "g238",
  "kind": "photo",
  "src": "/photos/g238.jpg",
  "alt": "Home scene: books, sofa",
  "width": 900,
  "height": 1350,
  "date": "2025-04-20",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "books",
   "sofa"
  ],
  "colors": [
   "brown",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 249,
   "hueB": 287,
   "emoji": "🛋️"
  }
 },
 {
  "id": "g239",
  "kind": "photo",
  "src": "/photos/g239.jpg",
  "alt": "Fort scene: walls",
  "width": 900,
  "height": 1200,
  "date": "2025-04-17",
  "location": "Udaipur, Rajasthan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "walls"
  ],
  "colors": [
   "white",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 247,
   "hueB": 302,
   "emoji": "🏰"
  },
  "timeOfDay": "sunset",
  "sky": "foggy"
 },
 {
  "id": "g240",
  "kind": "photo",
  "src": "/photos/g240.jpg",
  "alt": "Lake scene: lake, water, boat",
  "width": 900,
  "height": 600,
  "date": "2025-04-13",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "boat"
  ],
  "colors": [
   "blue",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 253,
   "hueB": 316,
   "emoji": "🏞️"
  },
  "timeOfDay": "sunset",
  "sky": "clear"
 },
 {
  "id": "g241",
  "kind": "photo",
  "src": "/photos/g241.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 900,
  "height": 600,
  "date": "2025-04-12",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "grey",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 232,
   "hueB": 278,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "posing"
 },
 {
  "id": "g242",
  "kind": "photo",
  "src": "/photos/g242.jpg",
  "alt": "Trek scene: trail",
  "width": 900,
  "height": 1200,
  "date": "2025-04-05",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "trail"
  ],
  "colors": [
   "teal",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 315,
   "hueB": 6,
   "emoji": "🥾"
  },
  "timeOfDay": "morning",
  "sky": "cloudy"
 },
 {
  "id": "g243",
  "kind": "photo",
  "src": "/photos/g243.jpg",
  "alt": "Home scene: sofa, kitchen",
  "width": 900,
  "height": 1200,
  "date": "2025-04-02",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sofa",
   "kitchen"
  ],
  "colors": [
   "grey",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 274,
   "hueB": 308,
   "emoji": "🛋️"
  }
 },
 {
  "id": "g244",
  "kind": "document",
  "src": null,
  "alt": "Handwritten note",
  "width": 900,
  "height": 1200,
  "date": "2025-04-02",
  "location": "Goa, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "note",
  "textContent": [
   "name",
   "address"
  ],
  "language": "English"
 },
 {
  "id": "g245",
  "kind": "photo",
  "src": "/photos/g245.jpg",
  "alt": "Sunset scene: sunset, mountains",
  "width": 900,
  "height": 1350,
  "date": "2025-03-31",
  "location": "Lisbon, Portugal",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "mountains"
  ],
  "colors": [
   "green",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 277,
   "hueB": 320,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy"
 },
 {
  "id": "g246",
  "kind": "photo",
  "src": "/photos/g246.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 900,
  "height": 600,
  "date": "2025-03-29",
  "location": "Lonavala, Maharashtra",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "cake"
  ],
  "colors": [
   "orange",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 63,
   "hueB": 125,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "smiling",
  "timeOfDay": "night",
  "sky": "cloudy"
 },
 {
  "id": "g247",
  "kind": "photo",
  "src": "/photos/g247.jpg",
  "alt": "Candid photo of 2 people",
  "width": 900,
  "height": 1350,
  "date": "2025-03-29",
  "location": "Mumbai, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "street"
  ],
  "colors": [
   "green",
   "black"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 226,
   "hueB": 264,
   "emoji": "🙂"
  },
  "photoType": "candid",
  "pose": "posing",
  "timeOfDay": "night",
  "sky": "foggy"
 },
 {
  "id": "g248",
  "kind": "photo",
  "src": "/photos/g248.jpg",
  "alt": "Food scene: cafe, table",
  "width": 900,
  "height": 1200,
  "date": "2025-03-27",
  "location": "Zurich, Switzerland",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "cafe",
   "table"
  ],
  "colors": [
   "teal",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 102,
   "hueB": 165,
   "emoji": "🍜"
  }
 },
 {
  "id": "g249",
  "kind": "photo",
  "src": "/photos/g249.jpg",
  "alt": "Trek scene: tent",
  "width": 900,
  "height": 600,
  "date": "2025-03-25",
  "location": "Coorg, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "tent"
  ],
  "colors": [
   "teal",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 173,
   "hueB": 241,
   "emoji": "🥾"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy"
 },
 {
  "id": "g250",
  "kind": "photo",
  "src": "/photos/g250.jpg",
  "alt": "Waterfall scene: water, waterfall",
  "width": 900,
  "height": 1350,
  "date": "2025-03-23",
  "location": "Nainital, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "water",
   "waterfall"
  ],
  "colors": [
   "teal",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 202,
   "hueB": 259,
   "emoji": "💧"
  },
  "timeOfDay": "sunset",
  "sky": "clear"
 },
 {
  "id": "g251",
  "kind": "photo",
  "src": "/photos/g251.jpg",
  "alt": "Beach scene: palm trees",
  "width": 900,
  "height": 600,
  "date": "2025-03-22",
  "location": "Gokarna, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "palm trees"
  ],
  "colors": [
   "teal",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 266,
   "hueB": 325,
   "emoji": "🏖️"
  },
  "timeOfDay": "sunset",
  "sky": "clear"
 },
 {
  "id": "g252",
  "kind": "photo",
  "src": "/photos/g252.jpg",
  "alt": "Lake scene: lake, water, tent",
  "width": 900,
  "height": 1350,
  "date": "2025-03-20",
  "location": "Zurich, Switzerland",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "tent",
   "mountains"
  ],
  "colors": [
   "grey",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 354,
   "hueB": 55,
   "emoji": "🏞️"
  },
  "timeOfDay": "morning",
  "sky": "clear"
 },
 {
  "id": "g253",
  "kind": "photo",
  "src": "/photos/g253.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 900,
  "height": 1350,
  "date": "2025-03-15",
  "location": "Rishikesh, Uttarakhand",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "sunglasses"
  ],
  "colors": [
   "green",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 233,
   "hueB": 290,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "smiling"
 },
 {
  "id": "g254",
  "kind": "photo",
  "src": "/photos/g254.jpg",
  "alt": "Candid photo of 4 people",
  "width": 900,
  "height": 600,
  "date": "2025-03-14",
  "location": "Lonavala, Maharashtra",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 4,
  "animals": [],
  "objects": [
   "sunglasses"
  ],
  "colors": [
   "orange",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 140,
   "hueB": 170,
   "emoji": "👥"
  },
  "photoType": "candid",
  "pose": "serious"
 },
 {
  "id": "g255",
  "kind": "photo",
  "src": "/photos/g255.jpg",
  "alt": "Selfie photo of 2 people",
  "width": 900,
  "height": 1200,
  "date": "2025-03-11",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "sunglasses"
  ],
  "colors": [
   "blue",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 134,
   "hueB": 181,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "serious",
  "timeOfDay": "night",
  "sky": "clear"
 },
 {
  "id": "g256",
  "kind": "photo",
  "src": "/photos/g256.jpg",
  "alt": "Lake scene: lake, water, tent",
  "width": 900,
  "height": 1350,
  "date": "2025-03-10",
  "location": "Munnar, Kerala",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "tent",
   "forest"
  ],
  "colors": [
   "green",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 220,
   "hueB": 252,
   "emoji": "🏞️"
  },
  "timeOfDay": "sunset",
  "sky": "clear"
 },
 {
  "id": "g257",
  "kind": "photo",
  "src": "/photos/g257.jpg",
  "alt": "Home scene: books",
  "width": 900,
  "height": 1200,
  "date": "2025-03-09",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "books"
  ],
  "colors": [
   "brown",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 295,
   "hueB": 352,
   "emoji": "🛋️"
  }
 },
 {
  "id": "g258",
  "kind": "photo",
  "src": "/photos/g258.jpg",
  "alt": "Lake scene: lake, water, reflection",
  "width": 900,
  "height": 1200,
  "date": "2025-03-08",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "reflection"
  ],
  "colors": [
   "pink",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 281,
   "hueB": 312,
   "emoji": "🏞️"
  },
  "timeOfDay": "afternoon",
  "sky": "clear"
 },
 {
  "id": "g259",
  "kind": "photo",
  "src": "/photos/g259.jpg",
  "alt": "Sunset scene: sunset, clouds, sky",
  "width": 900,
  "height": 1350,
  "date": "2025-03-06",
  "location": "Zurich, Switzerland",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "clouds",
   "sky"
  ],
  "colors": [
   "pink",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 180,
   "hueB": 224,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy"
 },
 {
  "id": "g260",
  "kind": "photo",
  "src": "/photos/g260.jpg",
  "alt": "Home scene: lamp",
  "width": 900,
  "height": 1350,
  "date": "2025-03-05",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lamp"
  ],
  "colors": [
   "white",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 248,
   "hueB": 274,
   "emoji": "🛋️"
  }
 },
 {
  "id": "g261",
  "kind": "photo",
  "src": "/photos/g261.jpg",
  "alt": "Trek scene: valley",
  "width": 900,
  "height": 1200,
  "date": "2025-03-04",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "valley"
  ],
  "colors": [
   "pink",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 31,
   "hueB": 101,
   "emoji": "🥾"
  },
  "timeOfDay": "night",
  "sky": "foggy"
 },
 {
  "id": "g262",
  "kind": "photo",
  "src": "/photos/g262.jpg",
  "alt": "Pet scene: pet portrait (cat)",
  "width": 900,
  "height": 1200,
  "date": "2025-03-02",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "cat"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "orange",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 275,
   "hueB": 330,
   "emoji": "🐕"
  }
 },
 {
  "id": "g263",
  "kind": "photo",
  "src": "/photos/g263.jpg",
  "alt": "Portrait of 1 person at a beach scene",
  "width": 900,
  "height": 600,
  "date": "2025-02-23",
  "location": "Gokarna, Karnataka",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "waves"
  ],
  "colors": [
   "teal",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 234,
   "hueB": 271,
   "emoji": "🙂"
  },
  "timeOfDay": "afternoon",
  "sky": "clear",
  "photoType": "portrait",
  "pose": "posing"
 },
 {
  "id": "g264",
  "kind": "photo",
  "src": "/photos/g264.jpg",
  "alt": "Vehicle scene: bike, train",
  "width": 900,
  "height": 1200,
  "date": "2025-02-22",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "bike",
   "train"
  ],
  "colors": [
   "orange",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 216,
   "hueB": 265,
   "emoji": "🚗"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy"
 },
 {
  "id": "g265",
  "kind": "photo",
  "src": "/photos/g265.jpg",
  "alt": "Selfie of 1 person at a trek scene",
  "width": 900,
  "height": 1350,
  "date": "2025-02-19",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "forest"
  ],
  "colors": [
   "grey",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 310,
   "hueB": 5,
   "emoji": "🙂"
  },
  "timeOfDay": "sunset",
  "sky": "clear",
  "photoType": "selfie",
  "pose": "smiling"
 },
 {
  "id": "g266",
  "kind": "photo",
  "src": "/photos/g266.jpg",
  "alt": "Beach scene: palm trees",
  "width": 900,
  "height": 1200,
  "date": "2025-02-18",
  "location": "Gokarna, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "palm trees"
  ],
  "colors": [
   "blue",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 329,
   "hueB": 21,
   "emoji": "🏖️"
  },
  "timeOfDay": "morning",
  "sky": "cloudy"
 },
 {
  "id": "g267",
  "kind": "photo",
  "src": "/photos/g267.jpg",
  "alt": "Home scene: plants",
  "width": 900,
  "height": 1350,
  "date": "2025-02-14",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "plants"
  ],
  "colors": [
   "green",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 271,
   "hueB": 309,
   "emoji": "🛋️"
  }
 },
 {
  "id": "g268",
  "kind": "photo",
  "src": "/photos/g268.jpg",
  "alt": "Pet scene: pet portrait (dog)",
  "width": 900,
  "height": 1350,
  "date": "2025-02-11",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "dog"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "teal",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 276,
   "hueB": 322,
   "emoji": "🐕"
  }
 },
 {
  "id": "g269",
  "kind": "photo",
  "src": "/photos/g269.jpg",
  "alt": "Pet scene: pet portrait (cat)",
  "width": 900,
  "height": 1350,
  "date": "2025-02-10",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "cat"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "pink",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 182,
   "hueB": 242,
   "emoji": "🐕"
  }
 },
 {
  "id": "g270",
  "kind": "photo",
  "src": "/photos/g270.jpg",
  "alt": "Group photo of 3 people",
  "width": 900,
  "height": 1200,
  "date": "2025-01-28",
  "location": "Banff, Canada",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "street"
  ],
  "colors": [
   "black",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 227,
   "hueB": 283,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "action"
 },
 {
  "id": "g271",
  "kind": "photo",
  "src": "/photos/g271.jpg",
  "alt": "Candid photo of 4 people",
  "width": 900,
  "height": 1350,
  "date": "2025-01-26",
  "location": "Lisbon, Portugal",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 4,
  "animals": [],
  "objects": [
   "party"
  ],
  "colors": [
   "brown",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 95,
   "hueB": 137,
   "emoji": "👥"
  },
  "photoType": "candid",
  "pose": "action",
  "timeOfDay": "night",
  "sky": "clear"
 },
 {
  "id": "g272",
  "kind": "photo",
  "src": "/photos/g272.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 900,
  "height": 1350,
  "date": "2025-01-25",
  "location": "Goa, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "car"
  ],
  "colors": [
   "blue",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 225,
   "hueB": 279,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "serious"
 },
 {
  "id": "g273",
  "kind": "photo",
  "src": "/photos/g273.jpg",
  "alt": "Trek scene: mountains",
  "width": 900,
  "height": 1200,
  "date": "2025-01-18",
  "location": "Coorg, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "mountains"
  ],
  "colors": [
   "brown",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 74,
   "hueB": 107,
   "emoji": "🥾"
  },
  "timeOfDay": "morning",
  "sky": "foggy"
 },
 {
  "id": "g274",
  "kind": "photo",
  "src": "/photos/g274.jpg",
  "alt": "Sunset scene: sunset, clouds, city",
  "width": 900,
  "height": 600,
  "date": "2025-01-17",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "clouds",
   "city"
  ],
  "colors": [
   "grey",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 126,
   "hueB": 194,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "foggy"
 },
 {
  "id": "g275",
  "kind": "photo",
  "src": "/photos/g275.jpg",
  "alt": "Sunset scene: sunset, clouds",
  "width": 900,
  "height": 1350,
  "date": "2025-01-16",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "clouds"
  ],
  "colors": [
   "brown",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 62,
   "hueB": 113,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "foggy"
 },
 {
  "id": "g276",
  "kind": "photo",
  "src": "/photos/g276.jpg",
  "alt": "Sunset scene: sunset, mountains, sky",
  "width": 900,
  "height": 600,
  "date": "2025-01-13",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "mountains",
   "sky"
  ],
  "colors": [
   "orange",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 316,
   "hueB": 344,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "clear"
 },
 {
  "id": "g277",
  "kind": "photo",
  "src": "/photos/g277.jpg",
  "alt": "Lake scene: lake, water, tent",
  "width": 900,
  "height": 1350,
  "date": "2025-01-12",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "tent",
   "boat"
  ],
  "colors": [
   "white",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 245,
   "hueB": 303,
   "emoji": "🏞️"
  },
  "timeOfDay": "morning",
  "sky": "clear"
 },
 {
  "id": "g278",
  "kind": "photo",
  "src": "/photos/g278.jpg",
  "alt": "Candid of 3 people at a trek scene",
  "width": 900,
  "height": 600,
  "date": "2025-01-09",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "forest",
   "valley"
  ],
  "colors": [
   "pink",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 189,
   "hueB": 249,
   "emoji": "👥"
  },
  "timeOfDay": "night",
  "sky": "foggy",
  "photoType": "candid",
  "pose": "posing"
 },
 {
  "id": "g279",
  "kind": "photo",
  "src": "/photos/g279.jpg",
  "alt": "Sunset scene: sunset, city",
  "width": 900,
  "height": 1200,
  "date": "2025-01-05",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "city"
  ],
  "colors": [
   "teal",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 205,
   "hueB": 263,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "clear"
 },
 {
  "id": "g280",
  "kind": "photo",
  "src": "/photos/g280.jpg",
  "alt": "Trek scene: forest",
  "width": 900,
  "height": 600,
  "date": "2024-12-17",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "forest"
  ],
  "colors": [
   "pink",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 26,
   "hueB": 56,
   "emoji": "🥾"
  },
  "timeOfDay": "sunset",
  "sky": "foggy"
 },
 {
  "id": "g281",
  "kind": "photo",
  "src": "/photos/g281.jpg",
  "alt": "Group of 6 people at a temple scene",
  "width": 900,
  "height": 600,
  "date": "2024-12-16",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 6,
  "animals": [],
  "objects": [
   "statue"
  ],
  "colors": [
   "grey",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 137,
   "hueB": 173,
   "emoji": "👥"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy",
  "photoType": "group",
  "pose": "action"
 },
 {
  "id": "g282",
  "kind": "photo",
  "src": "/photos/g282.jpg",
  "alt": "Beach scene: palm trees",
  "width": 900,
  "height": 1200,
  "date": "2024-12-15",
  "location": "Lisbon, Portugal",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "palm trees"
  ],
  "colors": [
   "brown",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 235,
   "hueB": 305,
   "emoji": "🏖️"
  },
  "timeOfDay": "morning",
  "sky": "cloudy"
 },
 {
  "id": "g283",
  "kind": "photo",
  "src": "/photos/g283.jpg",
  "alt": "Trek scene: trail, backpack",
  "width": 900,
  "height": 600,
  "date": "2024-12-15",
  "location": "Kasol, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "trail",
   "backpack"
  ],
  "colors": [
   "white",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 51,
   "hueB": 108,
   "emoji": "🥾"
  },
  "timeOfDay": "afternoon",
  "sky": "clear"
 },
 {
  "id": "g284",
  "kind": "photo",
  "src": "/photos/g284.jpg",
  "alt": "Beach scene: waves",
  "width": 900,
  "height": 1350,
  "date": "2024-12-13",
  "location": "Gokarna, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "waves"
  ],
  "colors": [
   "green",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 261,
   "hueB": 298,
   "emoji": "🏖️"
  },
  "timeOfDay": "morning",
  "sky": "foggy"
 },
 {
  "id": "g285",
  "kind": "photo",
  "src": "/photos/g285.jpg",
  "alt": "Lake scene: lake, water, reflection",
  "width": 900,
  "height": 1200,
  "date": "2024-12-08",
  "location": "Nainital, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "reflection"
  ],
  "colors": [
   "white",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 336,
   "hueB": 39,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "cloudy"
 },
 {
  "id": "g286",
  "kind": "photo",
  "src": "/photos/g286.jpg",
  "alt": "Beach scene: palm trees",
  "width": 900,
  "height": 600,
  "date": "2024-12-04",
  "location": "Bali, Indonesia",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "palm trees"
  ],
  "colors": [
   "grey",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 137,
   "hueB": 186,
   "emoji": "🏖️"
  },
  "timeOfDay": "morning",
  "sky": "foggy"
 },
 {
  "id": "g287",
  "kind": "photo",
  "src": "/photos/g287.jpg",
  "alt": "Trek scene: backpack",
  "width": 900,
  "height": 1200,
  "date": "2024-12-02",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "backpack"
  ],
  "colors": [
   "orange",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 276,
   "hueB": 317,
   "emoji": "🥾"
  },
  "timeOfDay": "morning",
  "sky": "cloudy"
 },
 {
  "id": "g288",
  "kind": "photo",
  "src": "/photos/g288.jpg",
  "alt": "Candid photo of 1 person",
  "width": 900,
  "height": 600,
  "date": "2024-12-01",
  "location": "Munnar, Kerala",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "jacket"
  ],
  "colors": [
   "brown",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 262,
   "hueB": 290,
   "emoji": "🙂"
  },
  "photoType": "candid",
  "pose": "smiling"
 },
 {
  "id": "g289",
  "kind": "photo",
  "src": "/photos/g289.jpg",
  "alt": "Lake scene: lake, water, mountains",
  "width": 900,
  "height": 600,
  "date": "2024-11-28",
  "location": "Munnar, Kerala",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "mountains",
   "reflection"
  ],
  "colors": [
   "grey",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 266,
   "hueB": 301,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "clear"
 },
 {
  "id": "g290",
  "kind": "photo",
  "src": "/photos/g290.jpg",
  "alt": "Trek scene: tent, snow",
  "width": 900,
  "height": 1350,
  "date": "2024-11-20",
  "location": "Munnar, Kerala",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "tent",
   "snow"
  ],
  "colors": [
   "teal",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 176,
   "hueB": 210,
   "emoji": "🥾"
  },
  "timeOfDay": "sunset",
  "sky": "clear"
 },
 {
  "id": "g291",
  "kind": "photo",
  "src": "/photos/g291.jpg",
  "alt": "Beach scene: waves, sand",
  "width": 900,
  "height": 1200,
  "date": "2024-11-16",
  "location": "Bali, Indonesia",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "waves",
   "sand"
  ],
  "colors": [
   "pink",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 46,
   "hueB": 76,
   "emoji": "🏖️"
  },
  "timeOfDay": "afternoon",
  "sky": "foggy"
 },
 {
  "id": "g292",
  "kind": "photo",
  "src": "/photos/g292.jpg",
  "alt": "Flowers scene: garden, leaves",
  "width": 900,
  "height": 600,
  "date": "2024-11-12",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "garden",
   "leaves"
  ],
  "colors": [
   "teal",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 194,
   "hueB": 262,
   "emoji": "🌸"
  },
  "timeOfDay": "afternoon",
  "sky": "clear"
 },
 {
  "id": "g293",
  "kind": "photo",
  "src": "/photos/g293.jpg",
  "alt": "Sunset scene: sunset, mountains, city",
  "width": 900,
  "height": 1350,
  "date": "2024-11-11",
  "location": "Delhi, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "mountains",
   "city"
  ],
  "colors": [
   "pink",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 163,
   "hueB": 201,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "clear"
 },
 {
  "id": "g294",
  "kind": "photo",
  "src": "/photos/g294.jpg",
  "alt": "Candid photo of 1 person",
  "width": 900,
  "height": 600,
  "date": "2024-11-09",
  "location": "Coorg, Karnataka",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "white",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 233,
   "hueB": 291,
   "emoji": "🙂"
  },
  "photoType": "candid",
  "pose": "smiling",
  "timeOfDay": "sunset",
  "sky": "cloudy"
 },
 {
  "id": "g295",
  "kind": "photo",
  "src": "/photos/g295.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 900,
  "height": 1200,
  "date": "2024-11-08",
  "location": "Nainital, Uttarakhand",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "cake"
  ],
  "colors": [
   "green",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 109,
   "hueB": 164,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "action"
 },
 {
  "id": "g296",
  "kind": "photo",
  "src": "/photos/g296.jpg",
  "alt": "Waterfall scene: water, forest, waterfall",
  "width": 900,
  "height": 600,
  "date": "2024-11-04",
  "location": "Munnar, Kerala",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "water",
   "forest",
   "waterfall"
  ],
  "colors": [
   "teal",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 296,
   "hueB": 359,
   "emoji": "💧"
  },
  "timeOfDay": "sunset",
  "sky": "clear"
 },
 {
  "id": "g297",
  "kind": "photo",
  "src": "/photos/g297.jpg",
  "alt": "Beach scene: palm trees, sea",
  "width": 900,
  "height": 1200,
  "date": "2024-11-04",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "palm trees",
   "sea"
  ],
  "colors": [
   "white",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 153,
   "hueB": 208,
   "emoji": "🏖️"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy"
 },
 {
  "id": "g298",
  "kind": "photo",
  "src": "/photos/g298.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 900,
  "height": 1200,
  "date": "2024-10-31",
  "location": "Nainital, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "pink",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 281,
   "hueB": 337,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "smiling",
  "timeOfDay": "morning",
  "sky": "cloudy"
 },
 {
  "id": "g299",
  "kind": "photo",
  "src": "/photos/g299.jpg",
  "alt": "Temple scene: courtyard",
  "width": 900,
  "height": 1200,
  "date": "2024-10-29",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "courtyard"
  ],
  "colors": [
   "blue",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 254,
   "hueB": 297,
   "emoji": "🛕"
  },
  "timeOfDay": "morning",
  "sky": "foggy"
 },
 {
  "id": "g300",
  "kind": "photo",
  "src": "/photos/g300.jpg",
  "alt": "Pet scene: pet portrait (dog)",
  "width": 900,
  "height": 600,
  "date": "2024-10-27",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "dog"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "brown",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 263,
   "hueB": 313,
   "emoji": "🐕"
  }
 },
 {
  "id": "g301",
  "kind": "document",
  "src": null,
  "alt": "Ticket",
  "width": 900,
  "height": 1200,
  "date": "2024-10-25",
  "location": "Lisbon, Portugal",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "ticket",
  "textContent": [
   "date",
   "number"
  ],
  "language": "English"
 },
 {
  "id": "g302",
  "kind": "photo",
  "src": "/photos/g302.jpg",
  "alt": "Pet scene: pet portrait (cat)",
  "width": 900,
  "height": 600,
  "date": "2024-10-23",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "cat"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "teal",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 66,
   "hueB": 115,
   "emoji": "🐕"
  }
 },
 {
  "id": "g303",
  "kind": "photo",
  "src": "/photos/g303.jpg",
  "alt": "Flowers scene: flowers, garden",
  "width": 900,
  "height": 1200,
  "date": "2024-10-22",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "flowers",
   "garden"
  ],
  "colors": [
   "pink",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 41,
   "hueB": 104,
   "emoji": "🌸"
  },
  "timeOfDay": "night",
  "sky": "cloudy"
 },
 {
  "id": "g304",
  "kind": "photo",
  "src": "/photos/g304.jpg",
  "alt": "Lake scene: lake, water, forest",
  "width": 900,
  "height": 1200,
  "date": "2024-10-18",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "forest",
   "kayak"
  ],
  "colors": [
   "white",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 244,
   "hueB": 276,
   "emoji": "🏞️"
  },
  "timeOfDay": "afternoon",
  "sky": "clear"
 },
 {
  "id": "g305",
  "kind": "document",
  "src": null,
  "alt": "ID / card",
  "width": 900,
  "height": 1200,
  "date": "2024-10-17",
  "location": "Banff, Canada",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "id",
  "textContent": [
   "name",
   "number"
  ],
  "language": "Hindi"
 },
 {
  "id": "g306",
  "kind": "photo",
  "src": "/photos/g306.jpg",
  "alt": "Selfie of 2 people at a lake scene",
  "width": 900,
  "height": 600,
  "date": "2024-10-10",
  "location": "Chopta, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "tent"
  ],
  "colors": [
   "blue",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 89,
   "hueB": 140,
   "emoji": "🙂"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "photoType": "selfie",
  "pose": "smiling"
 },
 {
  "id": "g307",
  "kind": "photo",
  "src": "/photos/g307.jpg",
  "alt": "Candid of 3 people at a temple scene",
  "width": 900,
  "height": 1200,
  "date": "2024-09-28",
  "location": "Rishikesh, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "statue"
  ],
  "colors": [
   "brown",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 54,
   "hueB": 86,
   "emoji": "👥"
  },
  "timeOfDay": "afternoon",
  "sky": "foggy",
  "photoType": "candid",
  "pose": "action"
 },
 {
  "id": "g308",
  "kind": "photo",
  "src": "/photos/g308.jpg",
  "alt": "Food scene: plate, dessert",
  "width": 900,
  "height": 600,
  "date": "2024-09-27",
  "location": "Delhi, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "plate",
   "dessert"
  ],
  "colors": [
   "white",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 152,
   "hueB": 195,
   "emoji": "🍜"
  }
 },
 {
  "id": "g309",
  "kind": "photo",
  "src": "/photos/g309.jpg",
  "alt": "Candid of 3 people at a temple scene",
  "width": 900,
  "height": 1200,
  "date": "2024-09-27",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "lamps"
  ],
  "colors": [
   "teal",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 67,
   "hueB": 98,
   "emoji": "👥"
  },
  "timeOfDay": "morning",
  "sky": "clear",
  "photoType": "candid",
  "pose": "smiling"
 },
 {
  "id": "g310",
  "kind": "photo",
  "src": "/photos/g310.jpg",
  "alt": "Home scene: books, plants",
  "width": 900,
  "height": 1350,
  "date": "2024-09-23",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "books",
   "plants"
  ],
  "colors": [
   "brown",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 194,
   "hueB": 236,
   "emoji": "🛋️"
  }
 },
 {
  "id": "g311",
  "kind": "photo",
  "src": "/photos/g311.jpg",
  "alt": "Sunset scene: sunset, city",
  "width": 900,
  "height": 600,
  "date": "2024-09-18",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "city"
  ],
  "colors": [
   "orange",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 226,
   "hueB": 273,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "foggy"
 },
 {
  "id": "g312",
  "kind": "photo",
  "src": "/photos/g312.jpg",
  "alt": "Group photo of 5 people",
  "width": 900,
  "height": 1200,
  "date": "2024-09-18",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 5,
  "animals": [],
  "objects": [
   "gym"
  ],
  "colors": [
   "blue",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 55,
   "hueB": 121,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "smiling",
  "timeOfDay": "morning",
  "sky": "foggy"
 },
 {
  "id": "g313",
  "kind": "photo",
  "src": "/photos/g313.jpg",
  "alt": "Waterfall scene: water, waterfall, forest",
  "width": 900,
  "height": 1350,
  "date": "2024-09-11",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "water",
   "waterfall",
   "forest"
  ],
  "colors": [
   "teal",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 5,
   "hueB": 36,
   "emoji": "💧"
  },
  "timeOfDay": "night",
  "sky": "cloudy"
 },
 {
  "id": "g314",
  "kind": "photo",
  "src": "/photos/g314.jpg",
  "alt": "Candid photo of 2 people",
  "width": 900,
  "height": 600,
  "date": "2024-09-11",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "white",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 265,
   "hueB": 328,
   "emoji": "🙂"
  },
  "photoType": "candid",
  "pose": "posing",
  "timeOfDay": "afternoon",
  "sky": "foggy"
 },
 {
  "id": "g315",
  "kind": "photo",
  "src": "/photos/g315.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 900,
  "height": 600,
  "date": "2024-09-11",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "sunglasses"
  ],
  "colors": [
   "green",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 190,
   "hueB": 222,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "posing",
  "timeOfDay": "morning",
  "sky": "clear"
 },
 {
  "id": "g316",
  "kind": "photo",
  "src": "/photos/g316.jpg",
  "alt": "Trek scene: snow, forest",
  "width": 900,
  "height": 1350,
  "date": "2024-09-08",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "snow",
   "forest"
  ],
  "colors": [
   "pink",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 328,
   "hueB": 24,
   "emoji": "🥾"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy"
 },
 {
  "id": "g317",
  "kind": "photo",
  "src": "/photos/g317.jpg",
  "alt": "Food scene: cafe, table",
  "width": 900,
  "height": 1350,
  "date": "2024-09-07",
  "location": "Goa, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "cafe",
   "table"
  ],
  "colors": [
   "blue",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 225,
   "hueB": 276,
   "emoji": "🍜"
  }
 },
 {
  "id": "g318",
  "kind": "photo",
  "src": "/photos/g318.jpg",
  "alt": "Food scene: table",
  "width": 900,
  "height": 1200,
  "date": "2024-09-07",
  "location": "Banff, Canada",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "table"
  ],
  "colors": [
   "grey",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 111,
   "hueB": 139,
   "emoji": "🍜"
  }
 },
 {
  "id": "g319",
  "kind": "photo",
  "src": "/photos/g319.jpg",
  "alt": "Lake scene: lake, water, mountains",
  "width": 900,
  "height": 1350,
  "date": "2024-09-02",
  "location": "Zurich, Switzerland",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "mountains"
  ],
  "colors": [
   "grey",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 51,
   "hueB": 102,
   "emoji": "🏞️"
  },
  "timeOfDay": "afternoon",
  "sky": "foggy"
 },
 {
  "id": "g320",
  "kind": "photo",
  "src": "/photos/g320.jpg",
  "alt": "Vehicle scene: road",
  "width": 900,
  "height": 1350,
  "date": "2024-09-01",
  "location": "Lisbon, Portugal",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "road"
  ],
  "colors": [
   "grey",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 358,
   "hueB": 39,
   "emoji": "🚗"
  },
  "timeOfDay": "morning",
  "sky": "foggy"
 },
 {
  "id": "g321",
  "kind": "photo",
  "src": "/photos/g321.jpg",
  "alt": "Selfie photo of 2 people",
  "width": 900,
  "height": 1350,
  "date": "2024-09-01",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "party"
  ],
  "colors": [
   "brown",
   "black"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 72,
   "hueB": 129,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "smiling"
 },
 {
  "id": "g322",
  "kind": "photo",
  "src": "/photos/g322.jpg",
  "alt": "Flowers scene: flowers",
  "width": 900,
  "height": 600,
  "date": "2024-08-30",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "flowers"
  ],
  "colors": [
   "brown",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 210,
   "hueB": 277,
   "emoji": "🌸"
  },
  "timeOfDay": "morning",
  "sky": "clear"
 },
 {
  "id": "g323",
  "kind": "photo",
  "src": "/photos/g323.jpg",
  "alt": "Selfie photo of 2 people",
  "width": 900,
  "height": 600,
  "date": "2024-08-29",
  "location": "Hampi, Karnataka",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "cake"
  ],
  "colors": [
   "pink",
   "black"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 17,
   "hueB": 74,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "posing",
  "timeOfDay": "afternoon",
  "sky": "clear"
 },
 {
  "id": "g324",
  "kind": "photo",
  "src": "/photos/g324.jpg",
  "alt": "Candid photo of 4 people",
  "width": 900,
  "height": 1200,
  "date": "2024-08-26",
  "location": "Coorg, Karnataka",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 4,
  "animals": [],
  "objects": [
   "jacket"
  ],
  "colors": [
   "grey",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 273,
   "hueB": 301,
   "emoji": "👥"
  },
  "photoType": "candid",
  "pose": "smiling",
  "timeOfDay": "night",
  "sky": "cloudy"
 },
 {
  "id": "g325",
  "kind": "photo",
  "src": "/photos/g325.jpg",
  "alt": "Candid of 3 people at a snow scene",
  "width": 900,
  "height": 1200,
  "date": "2024-08-22",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "mountains",
   "pine trees"
  ],
  "colors": [
   "orange",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 244,
   "hueB": 283,
   "emoji": "👥"
  },
  "timeOfDay": "morning",
  "sky": "cloudy",
  "photoType": "candid",
  "pose": "posing"
 },
 {
  "id": "g326",
  "kind": "photo",
  "src": "/photos/g326.jpg",
  "alt": "Vehicle scene: bike",
  "width": 900,
  "height": 600,
  "date": "2024-08-16",
  "location": "Pune, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "bike"
  ],
  "colors": [
   "green",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 142,
   "hueB": 189,
   "emoji": "🚗"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy"
 },
 {
  "id": "g327",
  "kind": "photo",
  "src": "/photos/g327.jpg",
  "alt": "Candid photo of 3 people",
  "width": 900,
  "height": 1350,
  "date": "2024-08-16",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "cafe"
  ],
  "colors": [
   "brown",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 299,
   "hueB": 342,
   "emoji": "👥"
  },
  "photoType": "candid",
  "pose": "action"
 },
 {
  "id": "g328",
  "kind": "photo",
  "src": "/photos/g328.jpg",
  "alt": "Group of 3 people at a sunset scene",
  "width": 900,
  "height": 600,
  "date": "2024-08-15",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "sunset",
   "mountains"
  ],
  "colors": [
   "white",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 267,
   "hueB": 315,
   "emoji": "👥"
  },
  "timeOfDay": "sunset",
  "sky": "foggy",
  "photoType": "group",
  "pose": "smiling"
 },
 {
  "id": "g329",
  "kind": "photo",
  "src": "/photos/g329.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 900,
  "height": 1350,
  "date": "2024-07-30",
  "location": "Coorg, Karnataka",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "cake"
  ],
  "colors": [
   "black",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 59,
   "hueB": 103,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "posing"
 },
 {
  "id": "g330",
  "kind": "photo",
  "src": "/photos/g330.jpg",
  "alt": "Beach scene: sand",
  "width": 900,
  "height": 1200,
  "date": "2024-07-23",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sand"
  ],
  "colors": [
   "grey",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 149,
   "hueB": 218,
   "emoji": "🏖️"
  },
  "timeOfDay": "night",
  "sky": "foggy"
 },
 {
  "id": "g331",
  "kind": "photo",
  "src": "/photos/g331.jpg",
  "alt": "Sunset scene: sunset, sky",
  "width": 900,
  "height": 1200,
  "date": "2024-07-14",
  "location": "Rishikesh, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "sky"
  ],
  "colors": [
   "brown",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 259,
   "hueB": 301,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy"
 },
 {
  "id": "g332",
  "kind": "photo",
  "src": "/photos/g332.jpg",
  "alt": "Snow scene: pine trees",
  "width": 900,
  "height": 600,
  "date": "2024-07-09",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "pine trees"
  ],
  "colors": [
   "green",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 126,
   "hueB": 188,
   "emoji": "❄️"
  },
  "timeOfDay": "afternoon",
  "sky": "cloudy"
 },
 {
  "id": "g333",
  "kind": "photo",
  "src": "/photos/g333.jpg",
  "alt": "Lake scene: lake, water, forest",
  "width": 900,
  "height": 1350,
  "date": "2024-07-08",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "forest"
  ],
  "colors": [
   "white",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 120,
   "hueB": 173,
   "emoji": "🏞️"
  },
  "timeOfDay": "afternoon",
  "sky": "clear"
 },
 {
  "id": "g334",
  "kind": "photo",
  "src": "/photos/g334.jpg",
  "alt": "Trek scene: forest",
  "width": 900,
  "height": 1350,
  "date": "2024-07-07",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "forest"
  ],
  "colors": [
   "blue",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 314,
   "hueB": 351,
   "emoji": "🥾"
  },
  "timeOfDay": "night",
  "sky": "cloudy"
 },
 {
  "id": "g335",
  "kind": "photo",
  "src": "/photos/g335.jpg",
  "alt": "Candid photo of 1 person",
  "width": 900,
  "height": 1350,
  "date": "2024-07-06",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "street"
  ],
  "colors": [
   "black",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 197,
   "hueB": 266,
   "emoji": "🙂"
  },
  "photoType": "candid",
  "pose": "action",
  "timeOfDay": "night",
  "sky": "foggy"
 },
 {
  "id": "g336",
  "kind": "photo",
  "src": "/photos/g336.jpg",
  "alt": "Food scene: coffee",
  "width": 900,
  "height": 1200,
  "date": "2024-06-28",
  "location": "Udaipur, Rajasthan",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "coffee"
  ],
  "colors": [
   "grey",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 298,
   "hueB": 332,
   "emoji": "🍜"
  }
 },
 {
  "id": "g337",
  "kind": "photo",
  "src": "/photos/g337.jpg",
  "alt": "Lake scene: lake, water, kayak",
  "width": 900,
  "height": 600,
  "date": "2024-06-22",
  "location": "Zurich, Switzerland",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "kayak"
  ],
  "colors": [
   "blue",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 17,
   "hueB": 46,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "clear"
 },
 {
  "id": "g338",
  "kind": "photo",
  "src": "/photos/g338.jpg",
  "alt": "Sunset scene: sunset, mountains, city",
  "width": 900,
  "height": 600,
  "date": "2024-06-19",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "mountains",
   "city"
  ],
  "colors": [
   "brown",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 222,
   "hueB": 264,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "foggy"
 },
 {
  "id": "g339",
  "kind": "photo",
  "src": "/photos/g339.jpg",
  "alt": "Candid photo of 4 people",
  "width": 900,
  "height": 600,
  "date": "2024-06-17",
  "location": "Pune, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 4,
  "animals": [],
  "objects": [
   "jacket"
  ],
  "colors": [
   "grey",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 67,
   "hueB": 105,
   "emoji": "👥"
  },
  "photoType": "candid",
  "pose": "smiling",
  "timeOfDay": "morning",
  "sky": "foggy"
 },
 {
  "id": "g340",
  "kind": "photo",
  "src": "/photos/g340.jpg",
  "alt": "Beach scene: boat, waves",
  "width": 900,
  "height": 1350,
  "date": "2024-06-15",
  "location": "Bali, Indonesia",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "boat",
   "waves"
  ],
  "colors": [
   "white",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 8,
   "hueB": 56,
   "emoji": "🏖️"
  },
  "timeOfDay": "night",
  "sky": "foggy"
 },
 {
  "id": "g341",
  "kind": "photo",
  "src": "/photos/g341.jpg",
  "alt": "Portrait photo of 1 person",
  "width": 900,
  "height": 600,
  "date": "2024-06-10",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "cafe"
  ],
  "colors": [
   "orange",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 287,
   "hueB": 356,
   "emoji": "🙂"
  },
  "photoType": "portrait",
  "pose": "action",
  "timeOfDay": "sunset",
  "sky": "clear"
 },
 {
  "id": "g342",
  "kind": "photo",
  "src": "/photos/g342.jpg",
  "alt": "Trek scene: trail",
  "width": 900,
  "height": 600,
  "date": "2024-06-09",
  "location": "Rishikesh, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "trail"
  ],
  "colors": [
   "blue",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 230,
   "hueB": 299,
   "emoji": "🥾"
  },
  "timeOfDay": "morning",
  "sky": "clear"
 },
 {
  "id": "g343",
  "kind": "photo",
  "src": "/photos/g343.jpg",
  "alt": "Group of 5 people at a trek scene",
  "width": 900,
  "height": 1350,
  "date": "2024-06-07",
  "location": "Coorg, Karnataka",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 5,
  "animals": [],
  "objects": [
   "trail"
  ],
  "colors": [
   "white",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 293,
   "hueB": 353,
   "emoji": "👥"
  },
  "timeOfDay": "morning",
  "sky": "foggy",
  "photoType": "group",
  "pose": "smiling"
 },
 {
  "id": "g344",
  "kind": "photo",
  "src": "/photos/g344.jpg",
  "alt": "Selfie photo of 2 people",
  "width": 900,
  "height": 600,
  "date": "2024-06-05",
  "location": "Lonavala, Maharashtra",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "sunglasses"
  ],
  "colors": [
   "pink",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 51,
   "hueB": 118,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "smiling",
  "timeOfDay": "sunset",
  "sky": "foggy"
 },
 {
  "id": "g345",
  "kind": "photo",
  "src": "/photos/g345.jpg",
  "alt": "Waterfall scene: water, rocks",
  "width": 900,
  "height": 1350,
  "date": "2024-06-03",
  "location": "Kasol, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "water",
   "rocks"
  ],
  "colors": [
   "teal",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 169,
   "hueB": 228,
   "emoji": "💧"
  },
  "timeOfDay": "afternoon",
  "sky": "clear"
 },
 {
  "id": "g346",
  "kind": "photo",
  "src": "/photos/g346.jpg",
  "alt": "Beach scene: palm trees",
  "width": 900,
  "height": 1200,
  "date": "2024-06-03",
  "location": "Goa, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "palm trees"
  ],
  "colors": [
   "green",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 330,
   "hueB": 6,
   "emoji": "🏖️"
  },
  "timeOfDay": "sunset",
  "sky": "foggy"
 },
 {
  "id": "g347",
  "kind": "photo",
  "src": "/photos/g347.jpg",
  "alt": "Sunset scene: sunset, mountains, clouds",
  "width": 900,
  "height": 1350,
  "date": "2024-05-27",
  "location": "Pune, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "mountains",
   "clouds"
  ],
  "colors": [
   "brown",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 287,
   "hueB": 318,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "clear"
 },
 {
  "id": "g348",
  "kind": "photo",
  "src": "/photos/g348.jpg",
  "alt": "Beach scene: waves, palm trees",
  "width": 900,
  "height": 600,
  "date": "2024-05-24",
  "location": "Gokarna, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "waves",
   "palm trees"
  ],
  "colors": [
   "teal",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 168,
   "hueB": 201,
   "emoji": "🏖️"
  },
  "timeOfDay": "morning",
  "sky": "cloudy"
 },
 {
  "id": "g349",
  "kind": "photo",
  "src": "/photos/g349.jpg",
  "alt": "Candid photo of 3 people",
  "width": 900,
  "height": 600,
  "date": "2024-05-22",
  "location": "Lonavala, Maharashtra",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "brown",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 143,
   "hueB": 206,
   "emoji": "👥"
  },
  "photoType": "candid",
  "pose": "serious",
  "timeOfDay": "afternoon",
  "sky": "cloudy"
 },
 {
  "id": "g350",
  "kind": "photo",
  "src": "/photos/g350.jpg",
  "alt": "Lake scene: lake, water, mountains",
  "width": 900,
  "height": 600,
  "date": "2024-05-20",
  "location": "Udaipur, Rajasthan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "mountains"
  ],
  "colors": [
   "pink",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 30,
   "hueB": 94,
   "emoji": "🏞️"
  },
  "timeOfDay": "morning",
  "sky": "clear"
 },
 {
  "id": "g351",
  "kind": "photo",
  "src": "/photos/g351.jpg",
  "alt": "Group photo of 3 people",
  "width": 900,
  "height": 600,
  "date": "2024-05-20",
  "location": "Pune, India",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "party"
  ],
  "colors": [
   "green",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 288,
   "hueB": 313,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "serious",
  "timeOfDay": "afternoon",
  "sky": "cloudy"
 },
 {
  "id": "g352",
  "kind": "photo",
  "src": "/photos/g352.jpg",
  "alt": "Lake scene: lake, water, reflection",
  "width": 900,
  "height": 600,
  "date": "2024-05-14",
  "location": "Chopta, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "reflection"
  ],
  "colors": [
   "orange",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 26,
   "hueB": 59,
   "emoji": "🏞️"
  },
  "timeOfDay": "sunset",
  "sky": "clear"
 },
 {
  "id": "g353",
  "kind": "photo",
  "src": "/photos/g353.jpg",
  "alt": "Candid photo of 2 people",
  "width": 900,
  "height": 600,
  "date": "2024-05-09",
  "location": "Manali, Himachal Pradesh",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "cake"
  ],
  "colors": [
   "pink",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 321,
   "hueB": 355,
   "emoji": "🙂"
  },
  "photoType": "candid",
  "pose": "action"
 },
 {
  "id": "g354",
  "kind": "photo",
  "src": "/photos/g354.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 900,
  "height": 1200,
  "date": "2024-05-03",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "jacket"
  ],
  "colors": [
   "black",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 237,
   "hueB": 278,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "posing",
  "timeOfDay": "morning",
  "sky": "clear"
 },
 {
  "id": "g355",
  "kind": "photo",
  "src": "/photos/g355.jpg",
  "alt": "Lake scene: lake, water, boat",
  "width": 900,
  "height": 1200,
  "date": "2024-05-02",
  "location": "Chopta, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "boat"
  ],
  "colors": [
   "white",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 99,
   "hueB": 142,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "cloudy"
 },
 {
  "id": "g356",
  "kind": "photo",
  "src": "/photos/g356.jpg",
  "alt": "City scene: bridge, monument",
  "width": 900,
  "height": 1200,
  "date": "2024-04-30",
  "location": "Jaipur, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "bridge",
   "monument"
  ],
  "colors": [
   "pink",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 62,
   "hueB": 95,
   "emoji": "🏙️"
  },
  "timeOfDay": "sunset",
  "sky": "foggy"
 },
 {
  "id": "g357",
  "kind": "photo",
  "src": "/photos/g357.jpg",
  "alt": "Beach scene: sand",
  "width": 900,
  "height": 1200,
  "date": "2024-04-29",
  "location": "Lisbon, Portugal",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sand"
  ],
  "colors": [
   "pink",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 28,
   "hueB": 82,
   "emoji": "🏖️"
  },
  "timeOfDay": "morning",
  "sky": "foggy"
 },
 {
  "id": "g358",
  "kind": "photo",
  "src": "/photos/g358.jpg",
  "alt": "Lake scene: lake, water, tent",
  "width": 900,
  "height": 600,
  "date": "2024-04-28",
  "location": "Zurich, Switzerland",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "tent",
   "mountains"
  ],
  "colors": [
   "blue",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 265,
   "hueB": 313,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "cloudy"
 },
 {
  "id": "g359",
  "kind": "photo",
  "src": "/photos/g359.jpg",
  "alt": "Candid photo of 3 people",
  "width": 900,
  "height": 1350,
  "date": "2024-04-28",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "orange",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 331,
   "hueB": 6,
   "emoji": "👥"
  },
  "photoType": "candid",
  "pose": "smiling",
  "timeOfDay": "sunset",
  "sky": "cloudy"
 },
 {
  "id": "g360",
  "kind": "photo",
  "src": "/photos/g360.jpg",
  "alt": "Pet scene: pet portrait (dog)",
  "width": 900,
  "height": 600,
  "date": "2024-04-27",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "dog"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "green",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 84,
   "hueB": 128,
   "emoji": "🐕"
  }
 },
 {
  "id": "g361",
  "kind": "photo",
  "src": "/photos/g361.jpg",
  "alt": "Pet scene: pet portrait (cat)",
  "width": 900,
  "height": 600,
  "date": "2024-04-18",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "cat"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "orange",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 271,
   "hueB": 296,
   "emoji": "🐕"
  }
 },
 {
  "id": "g362",
  "kind": "photo",
  "src": "/photos/g362.jpg",
  "alt": "Candid photo of 1 person",
  "width": 900,
  "height": 1200,
  "date": "2024-04-13",
  "location": "Rishikesh, Uttarakhand",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "car"
  ],
  "colors": [
   "white",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 237,
   "hueB": 265,
   "emoji": "🙂"
  },
  "photoType": "candid",
  "pose": "serious"
 },
 {
  "id": "g363",
  "kind": "photo",
  "src": "/photos/g363.jpg",
  "alt": "Sunset scene: sunset, clouds",
  "width": 900,
  "height": 1350,
  "date": "2024-04-11",
  "location": "Lonavala, Maharashtra",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "clouds"
  ],
  "colors": [
   "pink",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 211,
   "hueB": 257,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy"
 },
 {
  "id": "g364",
  "kind": "photo",
  "src": "/photos/g364.jpg",
  "alt": "Trek scene: snow",
  "width": 900,
  "height": 1350,
  "date": "2024-04-09",
  "location": "Kasol, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "snow"
  ],
  "colors": [
   "brown",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 356,
   "hueB": 55,
   "emoji": "🥾"
  },
  "timeOfDay": "night",
  "sky": "cloudy"
 },
 {
  "id": "g365",
  "kind": "photo",
  "src": "/photos/g365.jpg",
  "alt": "Pet scene: pet portrait (cat)",
  "width": 900,
  "height": 600,
  "date": "2024-03-30",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "cat"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "green",
   "blue"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 45,
   "hueB": 92,
   "emoji": "🐕"
  }
 },
 {
  "id": "g366",
  "kind": "photo",
  "src": "/photos/g366.jpg",
  "alt": "Trek scene: backpack",
  "width": 900,
  "height": 1350,
  "date": "2024-03-28",
  "location": "Kasol, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "backpack"
  ],
  "colors": [
   "brown",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 105,
   "hueB": 163,
   "emoji": "🥾"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy"
 },
 {
  "id": "g367",
  "kind": "document",
  "src": null,
  "alt": "Slide / whiteboard",
  "width": 900,
  "height": 1200,
  "date": "2024-03-22",
  "location": "Jaipur, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "slides",
  "textContent": [
   "name"
  ],
  "language": "English"
 },
 {
  "id": "g368",
  "kind": "photo",
  "src": "/photos/g368.jpg",
  "alt": "Lake scene: lake, water, forest",
  "width": 900,
  "height": 1200,
  "date": "2024-03-21",
  "location": "Banff, Canada",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "forest",
   "reflection"
  ],
  "colors": [
   "white",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 356,
   "hueB": 38,
   "emoji": "🏞️"
  },
  "timeOfDay": "afternoon",
  "sky": "clear"
 },
 {
  "id": "g369",
  "kind": "photo",
  "src": "/photos/g369.jpg",
  "alt": "Lake scene: lake, water, tent",
  "width": 900,
  "height": 1200,
  "date": "2024-03-19",
  "location": "Kyoto, Japan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "lake",
   "water",
   "tent"
  ],
  "colors": [
   "blue",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 292,
   "hueB": 358,
   "emoji": "🏞️"
  },
  "timeOfDay": "night",
  "sky": "cloudy"
 },
 {
  "id": "g370",
  "kind": "photo",
  "src": "/photos/g370.jpg",
  "alt": "Beach scene: beach",
  "width": 900,
  "height": 600,
  "date": "2024-03-18",
  "location": "Bali, Indonesia",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "beach"
  ],
  "colors": [
   "blue",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 272,
   "hueB": 324,
   "emoji": "🏖️"
  },
  "timeOfDay": "morning",
  "sky": "foggy"
 },
 {
  "id": "g371",
  "kind": "photo",
  "src": "/photos/g371.jpg",
  "alt": "Fort scene: gate, courtyard",
  "width": 900,
  "height": 1350,
  "date": "2024-03-17",
  "location": "Hampi, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "gate",
   "courtyard"
  ],
  "colors": [
   "orange",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 311,
   "hueB": 19,
   "emoji": "🏰"
  },
  "timeOfDay": "afternoon",
  "sky": "clear"
 },
 {
  "id": "g372",
  "kind": "photo",
  "src": "/photos/g372.jpg",
  "alt": "Selfie photo of 2 people",
  "width": 900,
  "height": 1350,
  "date": "2024-03-17",
  "location": "Chopta, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 2,
  "animals": [],
  "objects": [
   "jacket"
  ],
  "colors": [
   "black",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 65,
   "hueB": 95,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "smiling",
  "timeOfDay": "morning",
  "sky": "clear"
 },
 {
  "id": "g373",
  "kind": "photo",
  "src": "/photos/g373.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 900,
  "height": 1200,
  "date": "2024-03-17",
  "location": "Hampi, Karnataka",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "jacket"
  ],
  "colors": [
   "brown",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 25,
   "hueB": 82,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "posing",
  "timeOfDay": "night",
  "sky": "cloudy"
 },
 {
  "id": "g374",
  "kind": "photo",
  "src": "/photos/g374.jpg",
  "alt": "Pet scene: pet portrait (cat)",
  "width": 900,
  "height": 1200,
  "date": "2024-03-16",
  "location": "Mumbai, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [
   "cat"
  ],
  "objects": [
   "pet portrait"
  ],
  "colors": [
   "pink",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 264,
   "hueB": 311,
   "emoji": "🐕"
  }
 },
 {
  "id": "g375",
  "kind": "photo",
  "src": "/photos/g375.jpg",
  "alt": "Trek scene: trail",
  "width": 900,
  "height": 600,
  "date": "2024-03-13",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "trail"
  ],
  "colors": [
   "green",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 121,
   "hueB": 163,
   "emoji": "🥾"
  },
  "timeOfDay": "morning",
  "sky": "cloudy"
 },
 {
  "id": "g376",
  "kind": "photo",
  "src": "/photos/g376.jpg",
  "alt": "Sunset scene: sunset, city, mountains",
  "width": 900,
  "height": 600,
  "date": "2024-03-06",
  "location": "Udaipur, Rajasthan",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "city",
   "mountains"
  ],
  "colors": [
   "green",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 257,
   "hueB": 296,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "foggy"
 },
 {
  "id": "g377",
  "kind": "photo",
  "src": "/photos/g377.jpg",
  "alt": "City scene: market, bridge",
  "width": 900,
  "height": 600,
  "date": "2024-02-29",
  "location": "Lisbon, Portugal",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "market",
   "bridge"
  ],
  "colors": [
   "white",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 1,
   "hueB": 39,
   "emoji": "🏙️"
  },
  "timeOfDay": "morning",
  "sky": "cloudy"
 },
 {
  "id": "g378",
  "kind": "photo",
  "src": "/photos/g378.jpg",
  "alt": "Candid of 3 people at a beach scene",
  "width": 900,
  "height": 1350,
  "date": "2024-02-28",
  "location": "Lisbon, Portugal",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "sand"
  ],
  "colors": [
   "grey",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 336,
   "hueB": 34,
   "emoji": "👥"
  },
  "timeOfDay": "night",
  "sky": "clear",
  "photoType": "candid",
  "pose": "smiling"
 },
 {
  "id": "g379",
  "kind": "photo",
  "src": "/photos/g379.jpg",
  "alt": "Sunset scene: sunset, sky",
  "width": 900,
  "height": 1200,
  "date": "2024-02-25",
  "location": "Pune, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "sky"
  ],
  "colors": [
   "brown",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 55,
   "hueB": 95,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "foggy"
 },
 {
  "id": "g380",
  "kind": "photo",
  "src": "/photos/g380.jpg",
  "alt": "Selfie photo of 1 person",
  "width": 900,
  "height": 1350,
  "date": "2024-02-19",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "street"
  ],
  "colors": [
   "orange",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 252,
   "hueB": 301,
   "emoji": "🙂"
  },
  "photoType": "selfie",
  "pose": "action"
 },
 {
  "id": "g381",
  "kind": "document",
  "src": null,
  "alt": "Screenshot",
  "width": 900,
  "height": 1200,
  "date": "2024-02-18",
  "location": "Udaipur, Rajasthan",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "document"
  ],
  "colors": [
   "white"
  ],
  "source": "generated",
  "placeholder": {
   "hueA": 0,
   "hueB": 0,
   "emoji": "📄"
  },
  "docType": "screenshot",
  "textContent": [
   "date",
   "name"
  ],
  "language": "English"
 },
 {
  "id": "g382",
  "kind": "photo",
  "src": "/photos/g382.jpg",
  "alt": "Temple scene: temple",
  "width": 900,
  "height": 1200,
  "date": "2024-02-11",
  "location": "Rishikesh, Uttarakhand",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "temple"
  ],
  "colors": [
   "pink",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 310,
   "hueB": 7,
   "emoji": "🛕"
  },
  "timeOfDay": "sunset",
  "sky": "cloudy"
 },
 {
  "id": "g383",
  "kind": "photo",
  "src": "/photos/g383.jpg",
  "alt": "Vehicle scene: bike, train",
  "width": 900,
  "height": 1200,
  "date": "2024-02-08",
  "location": "Pune, India",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "bike",
   "train"
  ],
  "colors": [
   "orange",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 354,
   "hueB": 58,
   "emoji": "🚗"
  },
  "timeOfDay": "afternoon",
  "sky": "clear"
 },
 {
  "id": "g384",
  "kind": "photo",
  "src": "/photos/g384.jpg",
  "alt": "Trek scene: tent",
  "width": 900,
  "height": 1200,
  "date": "2024-01-20",
  "location": "Pangong, Ladakh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "tent"
  ],
  "colors": [
   "blue",
   "teal"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 15,
   "hueB": 55,
   "emoji": "🥾"
  },
  "timeOfDay": "morning",
  "sky": "foggy"
 },
 {
  "id": "g385",
  "kind": "photo",
  "src": "/photos/g385.jpg",
  "alt": "Trek scene: backpack, trail",
  "width": 900,
  "height": 600,
  "date": "2024-01-18",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "backpack",
   "trail"
  ],
  "colors": [
   "orange",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 98,
   "hueB": 162,
   "emoji": "🥾"
  },
  "timeOfDay": "morning",
  "sky": "foggy"
 },
 {
  "id": "g386",
  "kind": "photo",
  "src": "/photos/g386.jpg",
  "alt": "Food scene: plate",
  "width": 900,
  "height": 1350,
  "date": "2024-01-16",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "plate"
  ],
  "colors": [
   "teal",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 246,
   "hueB": 284,
   "emoji": "🍜"
  }
 },
 {
  "id": "g387",
  "kind": "photo",
  "src": "/photos/g387.jpg",
  "alt": "Group photo of 6 people",
  "width": 900,
  "height": 1350,
  "date": "2024-01-15",
  "location": "Rishikesh, Uttarakhand",
  "setting": "indoor",
  "hasPeople": true,
  "peopleCount": 6,
  "animals": [],
  "objects": [
   "birthday"
  ],
  "colors": [
   "blue",
   "pink"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 203,
   "hueB": 260,
   "emoji": "👥"
  },
  "photoType": "group",
  "pose": "serious"
 },
 {
  "id": "g388",
  "kind": "photo",
  "src": "/photos/g388.jpg",
  "alt": "Food scene: table",
  "width": 900,
  "height": 1350,
  "date": "2024-01-09",
  "location": "Pune, India",
  "setting": "indoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "table"
  ],
  "colors": [
   "white",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 187,
   "hueB": 237,
   "emoji": "🍜"
  }
 },
 {
  "id": "g389",
  "kind": "photo",
  "src": "/photos/g389.jpg",
  "alt": "Group of 3 people at a snow scene",
  "width": 900,
  "height": 1350,
  "date": "2024-01-08",
  "location": "Manali, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 3,
  "animals": [],
  "objects": [
   "pine trees"
  ],
  "colors": [
   "grey",
   "brown"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 161,
   "hueB": 212,
   "emoji": "👥"
  },
  "timeOfDay": "night",
  "sky": "foggy",
  "photoType": "group",
  "pose": "smiling"
 },
 {
  "id": "g390",
  "kind": "photo",
  "src": "/photos/g390.jpg",
  "alt": "Group of 4 people at a snow scene",
  "width": 900,
  "height": 1200,
  "date": "2024-01-06",
  "location": "Spiti Valley, Himachal Pradesh",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 4,
  "animals": [],
  "objects": [
   "snow"
  ],
  "colors": [
   "green",
   "orange"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 113,
   "hueB": 161,
   "emoji": "👥"
  },
  "timeOfDay": "night",
  "sky": "clear",
  "photoType": "group",
  "pose": "action"
 },
 {
  "id": "g391",
  "kind": "photo",
  "src": "/photos/g391.jpg",
  "alt": "Sunset scene: sunset, sea, mountains",
  "width": 900,
  "height": 1200,
  "date": "2024-01-04",
  "location": "Coorg, Karnataka",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "sunset",
   "sea",
   "mountains"
  ],
  "colors": [
   "pink",
   "white"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 218,
   "hueB": 278,
   "emoji": "🌇"
  },
  "timeOfDay": "sunset",
  "sky": "foggy"
 },
 {
  "id": "g392",
  "kind": "photo",
  "src": "/photos/g392.jpg",
  "alt": "Waterfall scene: water, rocks, forest",
  "width": 900,
  "height": 1200,
  "date": "2024-01-03",
  "location": "Munnar, Kerala",
  "setting": "outdoor",
  "hasPeople": false,
  "peopleCount": 0,
  "animals": [],
  "objects": [
   "water",
   "rocks",
   "forest"
  ],
  "colors": [
   "pink",
   "green"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 97,
   "hueB": 140,
   "emoji": "💧"
  },
  "timeOfDay": "night",
  "sky": "foggy"
 },
 {
  "id": "g393",
  "kind": "photo",
  "src": "/photos/g393.jpg",
  "alt": "Portrait of 1 person at a beach scene",
  "width": 900,
  "height": 600,
  "date": "2024-01-01",
  "location": "Bali, Indonesia",
  "setting": "outdoor",
  "hasPeople": true,
  "peopleCount": 1,
  "animals": [],
  "objects": [
   "beach"
  ],
  "colors": [
   "teal",
   "grey"
  ],
  "source": "unsplash",
  "placeholder": {
   "hueA": 300,
   "hueB": 337,
   "emoji": "🙂"
  },
  "timeOfDay": "night",
  "sky": "cloudy",
  "photoType": "portrait",
  "pose": "smiling"
 }
];
