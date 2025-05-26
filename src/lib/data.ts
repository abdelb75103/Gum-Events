import type { Event, Speaker } from "./types";

export const events: Event[] = [
  {
    id: "1",
    title: "Annual Youth Conference",
    date: "October 26, 2024",
    time: "10:00 AM - 5:00 PM",
    location: "Community Grand Hall",
    description: "Join us for an inspiring day of talks, workshops, and networking for young Muslims.",
    registrationLink: "#",
    image: "https://placehold.co/1080x1350.png",
    imageHint: "conference poster",
  },
  // {
  //   id: "2",
  //   title: "Family Fun Day",
  //   date: "November 10, 2024",
  //   time: "12:00 PM - 4:00 PM",
  //   location: "City Park",
  //   description: "A day of fun activities, games, and food for the whole family. Celebrate community bonds.",
  //   registrationLink: "#",
  //   image: "https://placehold.co/600x400.png",
  //   imageHint: "family park",
  // },
  // {
  //   id: "3",
  //   title: "Workshop: Navigating Identity",
  //   date: "December 1, 2024",
  //   time: "2:00 PM - 4:00 PM",
  //   location: "Online via Zoom",
  //   description: "An interactive workshop focusing on identity for Muslim youth in the modern world.",
  //   registrationLink: "#",
  //   image: "https://placehold.co/600x400.png",
  //   imageHint: "workshop online",
  // },
];

export const speakers: Speaker[] = [
  {
    id: "1",
    name: "Imam Zaid Shakir",
    title: "Scholar & Co-founder of Zaytuna College",
    bio: "A renowned Islamic scholar, Imam Zaid Shakir is known for his work in community development and education.",
    photo: "https://placehold.co/400x400.png",
    photoHint: "man portrait",
  },
  {
    id: "2",
    name: "Dr. Amina Wadud",
    title: "Islamic Feminist Theologian",
    bio: "Dr. Wadud is a progressive Muslim scholar focusing on gender and Quranic interpretation.",
    photo: "https://placehold.co/400x400.png",
    photoHint: "woman portrait",
  },
  {
    id: "3",
    name: "Yusuf Estes",
    title: "Muslim Preacher",
    bio: "Yusuf Estes is an American preacher who converted from Christianity to Islam in 1991.",
    photo: "https://placehold.co/400x400.png",
    photoHint: "man smiling",
  },
];
