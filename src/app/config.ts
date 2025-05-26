import type { SocialLink } from '@/lib/types';
import { Instagram, Facebook, Twitter, Youtube, Linkedin, Twitch, MessageSquare } from 'lucide-react';

export const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    href: 'https://instagram.com', // Replace with your actual Instagram link
    icon: Instagram,
    description: 'Follow our journey, stories, and event highlights.',
    cta: 'Follow on Instagram',
    buttonClasses: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white',
    iconColorClass: 'text-pink-600 dark:text-pink-400',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com', // Replace with your actual Facebook link
    icon: Facebook,
    description: 'Join our community discussions and get updates.',
    cta: 'Like on Facebook',
    buttonClasses: 'bg-blue-600 hover:bg-blue-700 text-white',
    iconColorClass: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com', // Replace with your actual X/Twitter link
    icon: Twitter,
    description: 'Catch our latest thoughts and real-time news.',
    cta: 'Follow on X',
    buttonClasses: 'bg-sky-500 hover:bg-sky-600 text-white', // Or black for X's theme
    iconColorClass: 'text-sky-500 dark:text-sky-400',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com', // Replace with your actual YouTube link
    icon: Youtube,
    description: 'Watch our event recordings, talks, and more.',
    cta: 'Subscribe on YouTube',
    buttonClasses: 'bg-red-600 hover:bg-red-700 text-white',
    iconColorClass: 'text-red-600 dark:text-red-400',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com', // Replace with your actual LinkedIn link
    icon: Linkedin,
    description: 'Connect with us for professional insights.',
    cta: 'Connect on LinkedIn',
    buttonClasses: 'bg-sky-700 hover:bg-sky-800 text-white',
    iconColorClass: 'text-sky-700 dark:text-sky-500',
  },
  {
    name: 'WhatsApp Community',
    href: 'https://whatsapp.com', // Replace with your actual WhatsApp community link
    icon: MessageSquare, // Or other relevant icon like Users2
    description: 'Join our direct community chat for instant updates.',
    cta: 'Join WhatsApp',
    buttonClasses: 'bg-green-500 hover:bg-green-600 text-white',
    iconColorClass: 'text-green-500 dark:text-green-400',
  },
];
