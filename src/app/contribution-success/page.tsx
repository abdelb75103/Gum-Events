
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Container from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Loader2, Users, Share2, Heart } from 'lucide-react';

export default function ContributionSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col bg-secondary dark:bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12">
        <Container>
          <Card className="max-w-xl mx-auto text-center shadow-xl bg-card">
            <CardHeader>
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-card-foreground">
                JazakAllah Khair!
              </CardTitle>
              <div className="mt-2 mx-auto h-[3px] w-20 rounded-full bg-gradient-to-r from-primary to-accent"></div>
            </CardHeader>
            <CardContent className="pt-6 pb-8 space-y-4 text-left">
              <p className="text-base md:text-lg text-muted-foreground">
                We want to extend our heartfelt gratitude for your incredible support of Growing Up Muslim! Your contributions are invaluable and truly help us continue our work.
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                If you know family or friends who might also be interested in supporting our mission, please share our website with them. And please, keep us in your duas.
              </p>
              <p className="text-base md:text-lg text-muted-foreground font-semibold">
                Barak Allahu feekum for everything! We hope to see you at our next events, insha'Allah.
              </p>
              <div className="flex flex-col items-center space-y-3 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Share2 className="h-4 w-4 mr-2 text-primary" />
                  <span>Share with friends and family</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Heart className="h-4 w-4 mr-2 text-primary" />
                  <span>Keep us in your duas</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  <span>See you at our next events!</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center pt-4">
                You will be redirected to the homepage shortly.
              </p>
              <div className="flex justify-center items-center mt-2">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
