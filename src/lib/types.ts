export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  registrationLink: string;
  image: string;
  imageHint?: string;
}

// export interface Speaker {
//   id: string;
//   name: string;
//   title: string;
//   bio: string;
//   photo: string;
//   photoHint?: string;
// }

export interface SpeakerCardProps {
  name: string;
  imageUrl: string;
  imageHint?: string;
}
