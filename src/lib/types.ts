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

export interface SpeakerCardProps {
  name: string;
  imageUrl: string;
  imageHint?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ElementType; // Lucide icon component
  description?: string;
  cta?: string;
  bgColorClass?: string;
  textColorClass?: string;
  iconColorClass?: string;
  buttonClasses?: string;
}
