import { GroupCard } from "./groupCard";

/* This example requires Tailwind CSS v2.0+ */

const groups = [
  {
    id: 1,
    name: "Openbeats Developers",
    title: "Software Developer",
    role: "Admin",
    imageUrl: "android-chrome-192x192.png",
  },
  {
    id: 2,
    name: "Fake Music Group",
    title: "Rapper",
    role: "Admin",
    imageUrl: "https://www.maxpixel.net/static/photo/1x/Mic-Graphic-Sing-Microphone-Singer-Audio-899933.png",
  },
];

export default function Groups() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {groups.map((group) => GroupCard(group))}
    </ul>
  );
}
