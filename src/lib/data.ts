
import type { Event } from "./types";

export const events: Event[] = [
  {
    id: "1",
    title: "The Awakening",
    date: "26th July 2025",
    time: "1.30PM - 5.30PM",
    location: "UCD Astra Hall",
    description: "Join us for an inspiring day of talks, workshops, and networking for young Muslims.",
    // Updated registrationLink to point to the internal checkout page
    registrationLink: "/events/checkout/1410834667469", 
    image: "/images/ireland.png",
    imageHint: "Ireland event poster",
    status: "upcoming",
    eventId: "1410834667469", // Added eventId for clarity, matches the one in registrationLink
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
