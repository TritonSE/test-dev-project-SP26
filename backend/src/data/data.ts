type Member = {
  name: string;
  team: string;
  role: string;
  isPVP: boolean;
  photoKey?: string;
};

const members: Member[] = [
  // PVP
  {
    name: "Eshaan Sharma",
    team: "PVP",
    role: "President",
    isPVP: true,
    photoKey: "uploads/Eshaan Sharma.jpg",
  },
  { name: "Sur Shah", team: "PVP", role: "VP Operations", isPVP: true },

  // Banyan Roots
  { name: "Alice Lan", team: "Banyan Roots", role: "Designer", isPVP: false },
  { name: "Aaryan Patel", team: "Banyan Roots", role: "Developer", isPVP: false },
  { name: "Anirudh Annabathula", team: "Banyan Roots", role: "Developer", isPVP: false },
  { name: "Jeff Umanzor", team: "Banyan Roots", role: "Developer", isPVP: false },
  { name: "Jenny Zhu", team: "Banyan Roots", role: "Developer", isPVP: false },
  { name: "Jerry Zhang", team: "Banyan Roots", role: "Developer", isPVP: false },
  { name: "Kalyssa Choy", team: "Banyan Roots", role: "Developer", isPVP: false },
  { name: "Nico Docena", team: "Banyan Roots", role: "Developer", isPVP: false },
  { name: "Rushil Gupta", team: "Banyan Roots", role: "Developer", isPVP: false },
  { name: "Ketan Mittal", team: "Banyan Roots", role: "Engineering Manager", isPVP: false },

  // International Health Collective
  { name: "Vivian Liu", team: "International Health Collective", role: "Designer", isPVP: false },
  {
    name: "Kate Songpetchmongkol",
    team: "International Health Collective",
    role: "Designer",
    isPVP: false,
  },
  { name: "Jamie Han", team: "International Health Collective", role: "Designer", isPVP: false },
  {
    name: "Darshika Mishra",
    team: "International Health Collective",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Edward Millan",
    team: "International Health Collective",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Hoang Anh Pham",
    team: "International Health Collective",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Ishayu Ghosh",
    team: "International Health Collective",
    role: "Developer",
    isPVP: false,
  },
  { name: "Jeremy Lim", team: "International Health Collective", role: "Developer", isPVP: false },
  { name: "JP Davalos", team: "International Health Collective", role: "Developer", isPVP: false },
  { name: "Ming Lu", team: "International Health Collective", role: "Developer", isPVP: false },
  {
    name: "Jordan Junaidi",
    team: "International Health Collective",
    role: "Engineering Manager",
    isPVP: false,
  },

  // Sharia's Closet
  { name: "Alice Guo", team: "Sharia's Closet", role: "Designer", isPVP: false },
  { name: "Jeffrey Antony", team: "Sharia's Closet", role: "Designer", isPVP: false },
  { name: "Jaden Huang", team: "Sharia's Closet", role: "Developer", isPVP: false },
  { name: "James Escobedo", team: "Sharia's Closet", role: "Developer", isPVP: false },
  { name: "Katelyn Li", team: "Sharia's Closet", role: "Developer", isPVP: false },
  { name: "Munachi Okoro", team: "Sharia's Closet", role: "Developer", isPVP: false },
  { name: "Suhaan Khurana", team: "Sharia's Closet", role: "Developer", isPVP: false },
  { name: "Yasmin Kabir", team: "Sharia's Closet", role: "Developer", isPVP: false },
  { name: "Weston Zong", team: "Sharia's Closet", role: "Engineering Manager", isPVP: false },
  { name: "Annabelle Guiditta", team: "Sharia's Closet", role: "Product Manager", isPVP: false },

  // Simplified PLC
  { name: "Annabelle Zhou", team: "Simplified PLC", role: "Designer", isPVP: false },
  { name: "Aniket Warty", team: "Simplified PLC", role: "Developer", isPVP: false },
  { name: "Pranav Puttagunta", team: "Simplified PLC", role: "Developer", isPVP: false },
  { name: "Raghav Sreekumar", team: "Simplified PLC", role: "Developer", isPVP: false },
  { name: "Shashwat Bhandari", team: "Simplified PLC", role: "Developer", isPVP: false },
  { name: "Sungwoo Cho", team: "Simplified PLC", role: "Developer", isPVP: false },
  { name: "William Wu", team: "Simplified PLC", role: "Developer", isPVP: false },
  { name: "Yifei Xue", team: "Simplified PLC", role: "Developer", isPVP: false },
  { name: "Philip Chen", team: "Simplified PLC", role: "Engineering Manager", isPVP: false },

  // HomeStart
  { name: "Joyce Ren", team: "Homestart", role: "Designer", isPVP: false },
  {
    name: "Charlie Suarez Robles",
    team: "Homestart",
    role: "Developer",
    isPVP: false,
    photoKey: "uploads/Charlie Suarez Robles.jpg",
  },
  { name: "Edward Yao", team: "Homestart", role: "Developer", isPVP: false },
  {
    name: "Lulu Shao",
    team: "Homestart",
    role: "Developer",
    isPVP: false,
    photoKey: "uploads/Lulu Shao.jpg",
  },
  { name: "Michael Wang", team: "Homestart", role: "Developer", isPVP: false },
  { name: "Nate Murphy", team: "Homestart", role: "Developer", isPVP: false },
  { name: "Yuzuki Tomioka", team: "Homestart", role: "Developer", isPVP: false },
  { name: "Karen Yan", team: "Homestart", role: "Product Manager", isPVP: false },

  // Tecate Horse Rescue
  { name: "Evan Chen", team: "Tecate Horse Rescue", role: "Designer", isPVP: false },
  { name: "Alyssia Almanza", team: "Tecate Horse Rescue", role: "Developer", isPVP: false },
  { name: "Himir Desai", team: "Tecate Horse Rescue", role: "Developer", isPVP: false },
  { name: "Rohaan Sandhu", team: "Tecate Horse Rescue", role: "Developer", isPVP: false },
  { name: "Thomas Rocha", team: "Tecate Horse Rescue", role: "Developer", isPVP: false },
  { name: "Isabel Ku", team: "Tecate Horse Rescue", role: "Developer", isPVP: false },
  { name: "Lucas Yan", team: "Tecate Horse Rescue", role: "Developer", isPVP: false },
  {
    name: "Michael Sullivan",
    team: "Tecate Horse Rescue",
    role: "Engineering Manager",
    isPVP: false,
  },

  // TEST
  { name: "Alice Park", team: "TEST", role: "Developer", isPVP: false },
  { name: "Isaac Montanez", team: "TEST", role: "Developer", isPVP: false },
  { name: "Sofia Heim", team: "TEST", role: "Developer", isPVP: false },
  { name: "Tony Wang", team: "TEST", role: "Developer", isPVP: false },
  { name: "Thy Doan", team: "TEST", role: "Developer", isPVP: false },
  { name: "Waleed Siddiqui", team: "TEST", role: "Developer", isPVP: false },
  { name: "Alice Guo", team: "TEST", role: "Design Lead", isPVP: false },
  { name: "David Nguyen", team: "TEST", role: "Designer", isPVP: false },
  { name: "Juee Deshmukh", team: "TEST", role: "Designer", isPVP: false },
  { name: "Sakura Nishikawa", team: "TEST", role: "Designer", isPVP: false },
  { name: "Yang Zheng", team: "TEST", role: "Designer", isPVP: false },
];

type Rankings = {
  message: string;
  photoKeys: string[];
};

const rankings: Rankings[] = [
  { message: "Team F3 Global is now in 3rd Place!", photoKeys: ["uploads/Tree.png"] },
  {
    message: "Homestart is now 1st Place!",
    photoKeys: ["uploads/Home.png", "uploads/Home 2.png", "uploads/Home 3.png"],
  },
  {
    message: "DBC is now in 2nd Place!",
    photoKeys: ["uploads/Australia.png", "uploads/Venice.png"],
  },
  { message: "Meemli is now in 3rd Place!", photoKeys: [] },
  { message: "TEST is now in 1st Place!", photoKeys: ["uploads/TEST.png"] },
];

type Submission = {
  photoKeys: string[];
  eventName: string;
  date: Date;
  location: string;
  pointAllocation: {
    team: string;
    points: number;
  }[];
  status: "pending" | "approved" | "rejected";
  member: string;
};

const submissions: Submission[] = [
  {
    photoKeys: ["uploads/Retreat.png"],
    eventName: "Event 1",
    date: new Date(),
    location: "Washington, DC",
    pointAllocation: [
      { team: "Banyan Roots", points: 4 },
      { team: "Homestart", points: 2 },
      { team: "International Health Collective", points: 6 },
    ],
    status: "approved",
    member: "Alice Lan",
  },
  {
    photoKeys: ["uploads/San Diego 1.png", "uploads/San Diego 2.png"],
    eventName: "Event 2",
    date: new Date(),
    location: "San Diego, CA",
    pointAllocation: [
      { team: "Homestart", points: 6 },
      { team: "International Health Collective", points: 4 },
    ],
    status: "approved",
    member: "Charlie Suarez Robles",
  },
  {
    photoKeys: ["uploads/Venice.png"],
    eventName: "Event 3",
    date: new Date(),
    location: "Venice, Italy",
    pointAllocation: [{ team: "International Health Collective", points: 8 }],
    status: "pending",
    member: "Edward Yao",
  },
  {
    photoKeys: ["uploads/Egypt 1.png", "uploads/Egypt 2.png"],
    eventName: "Event 4",
    date: new Date(),
    location: "Cairo, Egypt",
    pointAllocation: [{ team: "Sharia's Closet", points: 12 }],
    status: "pending",
    member: "Joyce Ren",
  },
  {
    photoKeys: ["uploads/shanghai.png"],
    eventName: "Shanghai, China",
    date: new Date(),
    location: "Location 1",
    pointAllocation: [{ team: "Simplified PLC", points: 16 }],
    status: "rejected",
    member: "Evan Chen",
  },
  {
    photoKeys: [
      "uploads/Santiago Chile 1.png",
      "uploads/Santiago Chile 2.png",
      "uploads/Santiago Chile 3.png",
      "uploads/Santiago Chile 4.jpg",
    ],
    eventName: "Santiago, Chile",
    date: new Date(),
    location: "Location 1",
    pointAllocation: [{ team: "Tecate Horse Rescue", points: 10 }],
    status: "rejected",
    member: "Eshaan Sharma",
  },
];

type Team = {
  teamName: string;
  points: number;
  avatarKey: string;
};

const teams: Team[] = [
  { teamName: "Banyan Roots", points: 0, avatarKey: "uploads/Banyan Roots.jpg" },
  { teamName: "Homestart", points: 24, avatarKey: "uploads/Homestart.jpg" },
  {
    teamName: "International Health Collective",
    points: 0,
    avatarKey: "uploads/International Health Collective.jpg",
  },
  { teamName: "Sharia's Closet", points: 30, avatarKey: "uploads/Sharia's Closet.jpg" },
  { teamName: "Simplified PLC", points: 0, avatarKey: "uploads/Simplified PLC.jpg" },
  { teamName: "Tecate Horse Rescue", points: 44, avatarKey: "uploads/Tecate Horse Rescue.jpg" },
  { teamName: "PVP", points: 1, avatarKey: "uploads/Eshaan.jpg" },
  { teamName: "TEST", points: 100, avatarKey: "uploads/TEST.jpg" },
];

export { teams, members, submissions, rankings };
