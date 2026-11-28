type Team = {
  teamName: string;
  points: number;
  avatarKey: string;
  isPVP: boolean;
};

const teams: Team[] = [
  {
    teamName: "Banyan Roots",
    points: 4,
    avatarKey: "uploads/Banyan Roots.jpg",
    isPVP: false,
  },
  {
    teamName: "Homestart",
    points: 32,
    avatarKey: "uploads/Homestart.jpg",
    isPVP: false,
  },
  {
    teamName: "International Health Collective",
    points: 10,
    avatarKey: "uploads/International Health Collective.jpg",
    isPVP: false,
  },
  {
    teamName: "Sharia's Closet",
    points: 30,
    avatarKey: "uploads/Sharia's Closet.jpg",
    isPVP: false,
  },
  {
    teamName: "Simplified PLC",
    points: 1,
    avatarKey: "uploads/Simplified PLC.jpg",
    isPVP: false,
  },
  {
    teamName: "Tecate Horse Rescue",
    points: 44,
    avatarKey: "uploads/Tecate Horse Rescue.jpg",
    isPVP: false,
  },
  {
    teamName: "PVP",
    points: 1,
    avatarKey: "uploads/Eshaan Sharma.jpg",
    isPVP: true,
  },
  {
    teamName: "TEST",
    points: 100,
    avatarKey: "uploads/TEST.png",
    isPVP: false,
  },
];

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
  {
    name: "Sur Shah",
    team: "PVP",
    role: "VP Operations",
    isPVP: true,
  },

  // Banyan Roots
  {
    name: "Alice Lan",
    team: "Banyan Roots",
    role: "Designer",
    isPVP: false,
  },
  {
    name: "Aaryan Patel",
    team: "Banyan Roots",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Anirudh Annabathula",
    team: "Banyan Roots",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Jeff Umanzor",
    team: "Banyan Roots",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Jenny Zhu",
    team: "Banyan Roots",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Jerry Zhang",
    team: "Banyan Roots",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Kalyssa Choy",
    team: "Banyan Roots",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Nico Docena",
    team: "Banyan Roots",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Rushil Gupta",
    team: "Banyan Roots",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Ketan Mittal",
    team: "Banyan Roots",
    role: "Engineering Manager",
    isPVP: false,
  },

  // International Health Collective
  {
    name: "Vivian Liu",
    team: "International Health Collective",
    role: "Designer",
    isPVP: false,
  },
  {
    name: "Kate Songpetchmongkol",
    team: "International Health Collective",
    role: "Designer",
    isPVP: false,
  },
  {
    name: "Jamie Han",
    team: "International Health Collective",
    role: "Designer",
    isPVP: false,
  },
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
  {
    name: "Jeremy Lim",
    team: "International Health Collective",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "JP Davalos",
    team: "International Health Collective",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Ming Lu",
    team: "International Health Collective",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Jordan Junaidi",
    team: "International Health Collective",
    role: "Engineering Manager",
    isPVP: false,
  },

  // Sharia's Closet
  {
    name: "Alice Guo",
    team: "Sharia's Closet",
    role: "Designer",
    isPVP: false,
  },
  {
    name: "Jeffrey Antony",
    team: "Sharia's Closet",
    role: "Designer",
    isPVP: false,
  },
  {
    name: "Jaden Huang",
    team: "Sharia's Closet",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "James Escobedo",
    team: "Sharia's Closet",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Katelyn Li",
    team: "Sharia's Closet",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Munachi Okoro",
    team: "Sharia's Closet",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Suhaan Khurana",
    team: "Sharia's Closet",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Yasmin Kabir",
    team: "Sharia's Closet",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Weston Zong",
    team: "Sharia's Closet",
    role: "Engineering Manager",
    isPVP: false,
  },
  {
    name: "Annabelle Guiditta",
    team: "Sharia's Closet",
    role: "Product Manager",
    isPVP: false,
  },

  // Simplified PLC
  {
    name: "Annabelle Zhou",
    team: "Simplified PLC",
    role: "Designer",
    isPVP: false,
  },
  {
    name: "Aniket Warty",
    team: "Simplified PLC",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Pranav Puttagunta",
    team: "Simplified PLC",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Raghav Sreekumar",
    team: "Simplified PLC",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Shashwat Bhandari",
    team: "Simplified PLC",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Sungwoo Cho",
    team: "Simplified PLC",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "William Wu",
    team: "Simplified PLC",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Yifei Xue",
    team: "Simplified PLC",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Philip Chen",
    team: "Simplified PLC",
    role: "Engineering Manager",
    isPVP: false,
  },

  // HomeStart
  {
    name: "Joyce Ren",
    team: "Homestart",
    role: "Designer",
    isPVP: false,
  },
  {
    name: "Charlie Suarez Robles",
    team: "Homestart",
    role: "Developer",
    isPVP: false,
    photoKey: "uploads/Charlie Suarez Robles.jpg",
  },
  {
    name: "Edward Yao",
    team: "Homestart",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Lulu Shao",
    team: "Homestart",
    role: "Developer",
    isPVP: false,
    photoKey: "uploads/Lulu Shao.jpg",
  },
  {
    name: "Michael Wang",
    team: "Homestart",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Nate Murphy",
    team: "Homestart",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Yuzuki Tomioka",
    team: "Homestart",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Karen Yan",
    team: "Homestart",
    role: "Product Manager",
    isPVP: false,
  },

  // Tecate Horse Rescue
  {
    name: "Evan Chen",
    team: "Tecate Horse Rescue",
    role: "Designer",
    isPVP: false,
  },
  {
    name: "Alyssia Almanza",
    team: "Tecate Horse Rescue",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Himir Desai",
    team: "Tecate Horse Rescue",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Rohaan Sandhu",
    team: "Tecate Horse Rescue",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Thomas Rocha",
    team: "Tecate Horse Rescue",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Isabel Ku",
    team: "Tecate Horse Rescue",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Lucas Yan",
    team: "Tecate Horse Rescue",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Michael Sullivan",
    team: "Tecate Horse Rescue",
    role: "Engineering Manager",
    isPVP: false,
  },

  // TEST
  {
    name: "Alice Park",
    team: "TEST",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Isaac Montanez",
    team: "TEST",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Sofia Heim",
    team: "TEST",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Tony Wang",
    team: "TEST",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Thy Doan",
    team: "TEST",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Waleed Siddiqui",
    team: "TEST",
    role: "Developer",
    isPVP: false,
  },
  {
    name: "Alice Guo",
    team: "TEST",
    role: "Design Lead",
    isPVP: false,
  },
  {
    name: "David Nguyen",
    team: "TEST",
    role: "Designer",
    isPVP: false,
  },
  {
    name: "Juee Deshmukh",
    team: "TEST",
    role: "Designer",
    isPVP: false,
  },
  {
    name: "Sakura Nishikawa",
    team: "TEST",
    role: "Designer",
    isPVP: false,
  },
  {
    name: "Yang Zheng",
    team: "TEST",
    role: "Designer",
    isPVP: false,
  },
];

type Submission = {
  key: string;
  photoKeys: string[];
  eventName: string;
  date: Date;
  location: string;
  pointAllocation: {
    team: string; //reference
    points: number;
  }[];
  tags: {
    photoIndex: number;
    member: string; //reference
    x: number;
    y: number;
  }[];
  pvpHandling: "yes" | "no";
  pvpTargetTeam: string | null; //reference
  status: "pending" | "approved" | "rejected";
  reviewedAt: Date | null;
  member: string; //reference
};

const submissions: Submission[] = [
  {
    key: "retreat-event",
    photoKeys: ["uploads/Retreat.png"],
    eventName: "Event 1",
    date: new Date(),
    location: "Washington, DC",
    pointAllocation: [
      { team: "Banyan Roots", points: 4 },
      { team: "Homestart", points: 2 },
      { team: "PVP", points: 4 },
      { team: "International Health Collective", points: 2 },
    ],
    tags: [
      { photoIndex: 0, member: "Alice Lan", x: 32, y: 46 },
      { photoIndex: 0, member: "Karen Yan", x: 68, y: 54 },
    ],
    pvpHandling: "yes",
    pvpTargetTeam: "International Health Collective",
    status: "approved",
    reviewedAt: new Date(Date.now() + 1),
    member: "Alice Lan",
  },
  {
    key: "san-diego-event",
    photoKeys: ["uploads/San Diego 1.png", "uploads/San Diego 2.png"],
    eventName: "Event 2",
    date: new Date(Date.now() + 2),
    location: "San Diego, CA",
    pointAllocation: [
      { team: "Homestart", points: 6 },
      { team: "International Health Collective", points: 4 },
      { team: "PVP", points: 3 },
    ],
    tags: [
      { photoIndex: 0, member: "Charlie Suarez Robles", x: 35, y: 42 },
      { photoIndex: 0, member: "Vivian Liu", x: 71, y: 34 },
      { photoIndex: 1, member: "Michael Wang", x: 43, y: 59 },
      { photoIndex: 1, member: "JP Davalos", x: 67, y: 47 },
    ],
    pvpHandling: "no",
    pvpTargetTeam: null,
    status: "approved",
    reviewedAt: new Date(Date.now() + 3),
    member: "Charlie Suarez Robles",
  },
  {
    key: "venice-event",
    photoKeys: ["uploads/Venice.png"],
    eventName: "Event 3",
    date: new Date(Date.now() + 4),
    location: "Venice, Italy",
    pointAllocation: [{ team: "International Health Collective", points: 8 }],
    tags: [],
    pvpHandling: "no",
    pvpTargetTeam: null,
    status: "pending",
    reviewedAt: null,
    member: "Edward Yao",
  },
  {
    key: "cairo-event",
    photoKeys: ["uploads/Egypt 1.png", "uploads/Egypt 2.png"],
    eventName: "Event 4",
    date: new Date(Date.now() + 5),
    location: "Cairo, Egypt",
    pointAllocation: [{ team: "Sharia's Closet", points: 12 }],
    tags: [],
    pvpHandling: "no",
    pvpTargetTeam: null,
    status: "pending",
    reviewedAt: null,
    member: "Joyce Ren",
  },
  {
    key: "shanghai-event",
    photoKeys: ["uploads/shanghai.png"],
    eventName: "Shanghai, China",
    date: new Date(Date.now() + 6),
    location: "Location 1",
    pointAllocation: [{ team: "Simplified PLC", points: 16 }],
    tags: [],
    pvpHandling: "no",
    pvpTargetTeam: null,
    status: "rejected",
    reviewedAt: new Date(Date.now() + 7),
    member: "Evan Chen",
  },
  {
    key: "santiago-chile-event",
    photoKeys: [
      "uploads/Santiago Chile 1.png",
      "uploads/Santiago Chile 2.png",
      "uploads/Santiago Chile 3.png",
      "uploads/Santiago Chile 4.jpg",
    ],
    eventName: "Santiago, Chile",
    date: new Date(Date.now() + 8),
    location: "Location 1",
    pointAllocation: [
      { team: "PVP", points: 7 },
      { team: "Tecate Horse Rescue", points: 3 },
    ],
    tags: [],
    pvpHandling: "yes",
    pvpTargetTeam: "Tecate Horse Rescue",
    status: "rejected",
    reviewedAt: new Date(Date.now() + 9),
    member: "Eshaan Sharma",
  },
];

type Rankings = {
  message: string;
  rankings: string[];
  source: "submission" | "pointsAdjustment";
  submission: string | null;
};

const rankings: Rankings[] = [
  {
    message: "Homestart is now in 1st Place!",
    rankings: [
      "Tecate Horse Rescue",
      "Homestart",
      "TEST",
      "Sharia's Closet",
      "Simplified PLC",
      "PVP",
      "International Health Collective",
      "Banyan Roots",
    ],
    source: "pointsAdjustment",
    submission: null,
  },
  {
    message: "Sharia's Closet is now in 2nd Place!",
    rankings: [
      "Tecate Horse Rescue",
      "Homestart",
      "TEST",
      "Sharia's Closet",
      "Simplified PLC",
      "PVP",
      "International Health Collective",
      "Banyan Roots",
    ],
    source: "pointsAdjustment",
    submission: null,
  },
  {
    message: "Banyan Roots is now in 3rd Place!",
    rankings: [
      "TEST",
      "Tecate Horse Rescue",
      "Sharia's Closet",
      "Homestart",
      "PVP",
      "Simplified PLC",
      "International Health Collective",
      "Banyan Roots",
    ],
    source: "pointsAdjustment",
    submission: null,
  },
  {
    message: "International Health Collective is now in 3rd Place!",
    rankings: [
      "TEST",
      "Tecate Horse Rescue",
      "Sharia's Closet",
      "Homestart",
      "International Health Collective",
      "Banyan Roots",
      "PVP",
      "Simplified PLC",
    ],
    source: "submission",
    submission: "retreat-event",
  },
  {
    message: "TEST is now in 1st Place!",
    rankings: [
      "TEST",
      "Tecate Horse Rescue",
      "Homestart",
      "Sharia's Closet",
      "International Health Collective",
      "Banyan Roots",
      "PVP",
      "Simplified PLC",
    ],
    source: "submission",
    submission: "san-diego-event",
  },
];

export { teams, members, submissions, rankings };
