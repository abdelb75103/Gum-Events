
import type { Event } from "./types";

export const events: Event[] = [
  {
    id: "1",
    title: "The Digital Sisterhood",
    date: "17th August 2025",
    time: "1.15PM - 5.30PM",
    location: "UCD Astra Hall",
    // Updated registrationLink to point to the internal checkout page
    registrationLink: "/events/checkout/1532993267129", 
    image: "/images/The digital sisterhood-3.png",
    imageHint: "Ireland event poster",
    status: "upcoming",
    eventId: "1532993267129", // Added eventId for clarity
    description: "Join us for an inspiring and uplifting event with The Digital Sisterhood. An event for all sisters to come together and connect.",
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
