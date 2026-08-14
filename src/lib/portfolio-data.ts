
export type RoomData = {
  id: string;
  name: string;
  icon: string;
  cover: string;
  images: string[];
};

export type ProjectData = {
  id: string;
  title: string;
  location: string;
  tagline: string;
  cover: string;
  rooms: RoomData[];
};

// ---------------------------------------------------------------------------
// Helper to generate image paths
// ---------------------------------------------------------------------------
function imgs(projectSlug: string, roomSlug: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/projects/${projectSlug}/${roomSlug}/img-${String(i + 1).padStart(2, "0")}.webp`,
  );
}

// ---------------------------------------------------------------------------
// PROJECT 1 — 7 Plumeria Drive, Punawale (3BHK)
// ---------------------------------------------------------------------------
const p1Rooms: RoomData[] = [
  {
    id: "p1-living-room",
    name: "Living Room",
    icon: "🛋️",
    cover: "/projects/p1/living-room/img-01.webp",
    images: imgs("p1", "living-room", 8),
  },
  {
    id: "p1-master-room",
    name: "Master Room",
    icon: "🛏️",
    cover: "/projects/p1/master-room/img-01.webp",
    images: imgs("p1", "master-room", 10),
  },
  {
    id: "p1-kitchen",
    name: "Kitchen",
    icon: "🍳",
    cover: "/projects/p1/kitchen/img-01.webp",
    images: imgs("p1", "kitchen", 4),
  },
  {
    id: "p1-kids-room",
    name: "Kids Room",
    icon: "🎨",
    cover: "/projects/p1/kids-room/img-01.webp",
    images: imgs("p1", "kids-room", 6),
  },
  {
    id: "p1-parents-room",
    name: "Parents Room",
    icon: "🌿",
    cover: "/projects/p1/parents-room/img-01.webp",
    images: imgs("p1", "parents-room", 6),
  },
];

// ---------------------------------------------------------------------------
// PROJECT 2 — Suncrest Dhayari · Unit A
// ---------------------------------------------------------------------------
const p2Rooms: RoomData[] = [
  {
    id: "p2-living-room",
    name: "Living Room",
    icon: "🛋️",
    cover: "/projects/p2/living-room/img-01.webp",
    images: imgs("p2", "living-room", 6),
  },
  {
    id: "p2-master-bed",
    name: "Master Bedroom",
    icon: "🛏️",
    cover: "/projects/p2/master-bed/img-01.webp",
    images: imgs("p2", "master-bed", 4),
  },
  {
    id: "p2-kitchen",
    name: "Kitchen",
    icon: "🍳",
    cover: "/projects/p2/kitchen/img-01.webp",
    images: imgs("p2", "kitchen", 5),
  },
  {
    id: "p2-entrance",
    name: "Entrance",
    icon: "🚪",
    cover: "/projects/p2/entrance/img-01.webp",
    images: imgs("p2", "entrance", 3),
  },
  {
    id: "p2-foyer-area",
    name: "Foyer Area",
    icon: "✨",
    cover: "/projects/p2/foyer-area/img-01.webp",
    images: imgs("p2", "foyer-area", 4),
  },
  {
    id: "p2-kids-room",
    name: "Kids Room",
    icon: "🎨",
    cover: "/projects/p2/kids-room/img-01.webp",
    images: imgs("p2", "kids-room", 9),
  },
  {
    id: "p2-living-more",
    name: "Living — Alternate View",
    icon: "🪴",
    cover: "/projects/p2/living-more/img-01.webp",
    images: imgs("p2", "living-more", 8),
  },
];

// ---------------------------------------------------------------------------
// PROJECT 3 — Suncrest Dhayari · Unit B
// ---------------------------------------------------------------------------
const p3Rooms: RoomData[] = [
  {
    id: "p3-living-room",
    name: "Living Room",
    icon: "🛋️",
    cover: "/projects/p3/living-room/img-01.webp",
    images: imgs("p3", "living-room", 13),
  },
  {
    id: "p3-master",
    name: "Master Bedroom",
    icon: "🛏️",
    cover: "/projects/p3/master/img-01.webp",
    images: imgs("p3", "master", 6),
  },
  {
    id: "p3-kitchen",
    name: "Kitchen",
    icon: "🍳",
    cover: "/projects/p3/kitchen/img-01.webp",
    images: imgs("p3", "kitchen", 9),
  },
  {
    id: "p3-entrance",
    name: "Entrance",
    icon: "🚪",
    cover: "/projects/p3/entrance/img-01.webp",
    images: imgs("p3", "entrance", 6),
  },
  {
    id: "p3-child-bedroom",
    name: "Child Bedroom",
    icon: "🎨",
    cover: "/projects/p3/child-bedroom/img-01.webp",
    images: imgs("p3", "child-bedroom", 6),
  },
];


// ---------------------------------------------------------------------------
// PROJECT 4 — Ambegaon BK Family Home
// ---------------------------------------------------------------------------
const p4Rooms: RoomData[] = [
  {
    id: "p4-entrance",
    name: "Entrance",
    icon: "🚪",
    cover: "/projects/p4/entrance/img-01.webp",
    images: imgs("p4", "entrance", 6),
  },
  {
    id: "p4-living-room",
    name: "Living Room",
    icon: "🛋️",
    cover: "/projects/p4/living-room/img-01.webp",
    images: imgs("p4", "living-room", 8),
  },
  {
    id: "p4-kitchen",
    name: "Kitchen",
    icon: "🍳",
    cover: "/projects/p4/kitchen/img-01.webp",
    images: imgs("p4", "kitchen", 8),
  },
  {
    id: "p4-master",
    name: "Master Bedroom",
    icon: "🛏️",
    cover: "/projects/p4/master/img-01.webp",
    images: imgs("p4", "master", 6),
  },
  {
    id: "p4-kids-room",
    name: "Kids Room",
    icon: "🎨",
    cover: "/projects/p4/kids-room/img-01.webp",
    images: imgs("p4", "kids-room", 7),
  },
  {
    id: "p4-parents",
    name: "Parents Room",
    icon: "🌿",
    cover: "/projects/p4/parents/img-01.webp",
    images: imgs("p4", "parents", 7),
  },
];

// ---------------------------------------------------------------------------
// MASTER LIST
// ---------------------------------------------------------------------------
export const PORTFOLIO_PROJECTS: ProjectData[] = [
  {
    id: "p1",
    title: "7 Plumeria Drive",
    location: "Punawale, Pune · 3BHK",
    tagline: "A warm, layered family home with curated spaces for every generation.",
    cover: "/projects/p1/living-room/img-02.webp",
    rooms: p1Rooms,
  },
  {
    id: "p2",
    title: "Suncrest Dhayari · Unit A",
    location: "Dhayari, Pune",
    tagline: "Elegant interiors blending openness with intimate family living.",
    cover: "/projects/p2/living-room/img-01.webp",
    rooms: p2Rooms,
  },
  {
    id: "p3",
    title: "Suncrest Dhayari · Unit B",
    location: "Dhayari, Pune",
    tagline: "Modern, clean lines with rich material textures throughout.",
    cover: "/projects/p3/living-room/img-01.webp",
    rooms: p3Rooms,
  },
  {
    id: "p4",
    title: "Ambegaon BK Residence",
    location: "Ambegaon BK, Pune",
    tagline: "A complete family home crafted with warmth, colour and functional design.",
    cover: "/projects/p4/living-room/img-01.webp",
    rooms: p4Rooms,
  },
];

