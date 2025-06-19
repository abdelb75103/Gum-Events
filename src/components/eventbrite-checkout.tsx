
"use client";

import Script from 'next/script';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

interface EventbriteCheckoutProps {
  eventId: string;
  iframeContainerHeight?: number;
}

declare global {
  interface Window {
    EBWidgets: any;
  }
}

const EventbriteCheckout: React.FC<EventbriteCheckoutProps> = ({ eventId, iframeContainerHeight = 425 }) => {
  const widgetContainerId = `eventbrite-widget-container-${eventId}`;
  const scriptInitializing = useRef(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isWidgetCreated, setIsWidgetCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const exampleCallback = useCallback(() => {
    console.log('Order complete for eventId:', eventId);
    router.push('/?event_registration_complete=true');
  }, [eventId, router]);

  useEffect(() => {
    if (isScriptLoaded && window.EBWidgets && !isWidgetCreated) {
      const containerElement = document.getElementById(widgetContainerId);
      if (containerElement) {
        containerElement.innerHTML = '';
        try {
          window.EBWidgets.createWidget({
            widgetType: 'checkout',
            eventId: eventId,
            iframeContainerId: widgetContainerId,
            iframeContainerHeight: iframeContainerHeight,
            onOrderComplete: exampleCallback,
          });
          setIsWidgetCreated(true);
          setError(null);
        } catch (e: any) {
          console.error('Eventbrite widget creation error:', e);
          setError('Failed to initialize the checkout widget. Please try refreshing or use the link below.');
        }
      } else {
        console.warn(`Container ${widgetContainerId} not found for Eventbrite widget.`);
      }
    }
  }, [eventId, iframeContainerHeight, widgetContainerId, isScriptLoaded, isWidgetCreated, exampleCallback]);

  const handleScriptLoad = () => {
    setIsScriptLoaded(true);
    scriptInitializing.current = false;
  };

  const handleScriptError = () => {
    console.error('Failed to load Eventbrite widget script.');
    setError('Could not load the Eventbrite checkout script. Please check your internet connection or try again later.');
    scriptInitializing.current = false;
  };

  return (
    <>
      {!isScriptLoaded && !scriptInitializing.current && (
         <Script
          src="https://www.eventbrite.ie/static/widgets/eb_widgets.js"
          strategy="lazyOnload"
          onLoad={handleScriptLoad}
          onError={handleScriptError}
          onReady={() => {
            if (window.EBWidgets) {
              setIsScriptLoaded(true);
            }
            scriptInitializing.current = false;
          }}
        />
      )}

      {(!isWidgetCreated || !isScriptLoaded) && !error && (
        <Skeleton className="w-full" style={{ minHeight: `${iframeContainerHeight}px` }} />
      )}

      {error && (
        <div className="text-center p-4 text-destructive bg-destructive/10 rounded-md">
          <p>{error}</p>
        </div>
      )}

      <div id={widgetContainerId} style={{ width: '100%', minHeight: isWidgetCreated ? 'auto' : `${iframeContainerHeight}px` }}>
        {/* Eventbrite widget will be embedded here. */}
      </div>
    </>
  );
};

export default EventbriteCheckout;
