
"use client";

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

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

  const exampleCallback = () => {
    console.log('Order complete for eventId:', eventId);
    // You can add logic here, e.g., redirect to a thank you page
    // or display an inline success message.
    // For example:
    // router.push('/order-success'); 
  };

  useEffect(() => {
    // This effect handles widget creation/re-creation if eventId changes
    // or if the script loads after the component has already mounted.
    if (isScriptLoaded && window.EBWidgets && !isWidgetCreated) {
      const containerElement = document.getElementById(widgetContainerId);
      if (containerElement) {
        // Clear previous widget if any to avoid multiple initializations
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
        // This case might occur if the div is not yet rendered for some reason
        console.warn(`Container ${widgetContainerId} not found for Eventbrite widget.`);
      }
    }
  }, [eventId, iframeContainerHeight, widgetContainerId, isScriptLoaded, isWidgetCreated]);

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
            // onReady is called after the script has executed.
            // This is another point where we can be sure EBWidgets might be available.
            if (window.EBWidgets) {
              setIsScriptLoaded(true);
            }
            scriptInitializing.current = false;
          }}
        />
      )}
      
      {/* Show skeleton or loading indicator while script/widget is initializing */}
      {(!isWidgetCreated || !isScriptLoaded) && !error && (
        <Skeleton className="w-full" style={{ minHeight: `${iframeContainerHeight}px` }} />
      )}

      {error && (
        <div className="text-center p-4 text-destructive bg-destructive/10 rounded-md">
          <p>{error}</p>
        </div>
      )}
      
      {/* The container for the Eventbrite widget */}
      <div id={widgetContainerId} style={{ width: '100%', minHeight: isWidgetCreated ? 'auto' : `${iframeContainerHeight}px` }}>
        {/* Eventbrite widget will be embedded here. Content is dynamically inserted by Eventbrite. */}
      </div>
    </>
  );
};

export default EventbriteCheckout;
