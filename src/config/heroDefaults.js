export const DEFAULT_HERO_CONTENT = {
  autoRotateMs: 6500,
  useStaticStats: false,
  useStaticVideos: true,
  videos: [
    {
      title: "Sports",
      src: "https://storage.googleapis.com/ticket9-prod.appspot.com/videos/1765955266059_sport.mp4",
    },
    {
      title: "Concerts",
      src: "https://storage.googleapis.com/ticket9-prod.appspot.com/videos/1765955219308_concert.mp4",
    },
    {
      title: "Music",
      src: "https://storage.googleapis.com/ticket9-prod.appspot.com/videos/1765955295343_music.mp4",
    },
  ],
  stats: [
    { key: "approved_events", label: "Approved Events", value: 0 },
    { key: "active_organisers", label: "Active Organisers", value: 0 },
    { key: "active_cities", label: "Active Cities", value: 0 },
  ],
};

export const DEFAULT_HERO_CATEGORIES = [
  { _id: "concerts", name: "Concerts" },
  { _id: "college-fests", name: "College Fests" },
  { _id: "comedy", name: "Comedy" },
  { _id: "sports", name: "Sports" },
  { _id: "creator-events", name: "Creator Events" },
];
