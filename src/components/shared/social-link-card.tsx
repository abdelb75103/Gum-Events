"use client";

import type { SocialLink } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialLinkCardProps {
  link: SocialLink;
}

export function SocialLinkCard({ link }: SocialLinkCardProps) {
  const Icon = link.icon;
  return (
    <Card className={cn("flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300", link.bgColorClass || 'bg-card')}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Icon className={cn("h-8 w-8", link.iconColorClass || 'text-primary')} />
          <CardTitle className={cn("text-xl font-semibold", link.textColorClass || 'text-card-foreground')}>{link.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        {link.description && <p className={cn("text-sm mb-4 flex-grow", link.textColorClass || 'text-muted-foreground')}>{link.description}</p>}
        <Button asChild className={cn(link.buttonClasses, 'w-full')}>
          <Link href={link.href} target="_blank" rel="noopener noreferrer">
            {link.cta || 'Visit'} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
