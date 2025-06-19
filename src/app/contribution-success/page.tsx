
"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Container from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function ContributionSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // To potentially access session_id if needed in future

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000); // 5 seconds

    // Clear the timer if the component unmounts before 5 seconds
    return () => clearTimeout(timer);
  }, [router]);

  // Optional: You can retrieve session_id if you want to display it or use it
  // const sessionId = searchParams.get('session_id');

  return (
    <div className="flex min-h-screen flex-col bg-secondary dark:bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12">
        <Container>
          <Card className="max-w-lg mx-auto text-center shadow-xl bg-card">
            <CardHeader>
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-card-foreground">
                Thank You!
              </CardTitle>
              <div className="mt-2 mx-auto h-[3px] w-20 rounded-full bg-gradient-to-r from-primary to-accent"></div>
            </CardHeader>
            <CardContent className="pt-6 pb-8 space-y-4">
              <p className="text-lg text-muted-foreground">
                Your contribution has been processed successfully. We greatly appreciate your support!
              </p>
              <p className="text-sm text-muted-foreground">
                You will be redirected to the homepage shortly.
              </p>
              <div className="flex justify-center items-center mt-4">
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
