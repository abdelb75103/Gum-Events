
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react"; // For a close button

interface ExpandableChatContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpandableChatContext = React.createContext<ExpandableChatContextProps | null>(null);

const useExpandableChat = () => {
  const context = React.useContext(ExpandableChatContext);
  if (!context) {
    throw new Error("useExpandableChat must be used within an ExpandableChatProvider");
  }
  return context;
};

interface ExpandableChatProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  defaultOpen?: boolean;
}

const ExpandableChat = React.forwardRef<HTMLDivElement, ExpandableChatProps>(
  ({
    className,
    children,
    icon,
    size = "md",
    position = "bottom-right",
    defaultOpen = false, // Chat is closed by default
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    const positionClasses: Record<typeof position, string> = {
      "bottom-right": "bottom-4 right-4",
      "bottom-left": "bottom-4 left-4",
      "top-right": "top-4 right-4",
      "top-left": "top-4 left-4",
    };

    const sizeClasses: Record<typeof size, string> = {
      sm: "w-72 h-[28rem]", // 448px
      md: "w-80 h-[32rem]", // 512px
      lg: "w-96 h-[40rem]", // 640px
    };

    return (
      <ExpandableChatContext.Provider value={{ isOpen, setIsOpen }}>
        <div ref={ref} className={cn("fixed z-50", positionClasses[position], className)} {...props}>
          {isOpen ? (
            <div
              className={cn(
                "bg-background border shadow-xl rounded-lg flex flex-col overflow-hidden",
                sizeClasses[size]
              )}
            >
              {children}
            </div>
          ) : (
            <Button
              variant="default"
              size="icon"
              className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => setIsOpen(true)}
              aria-label="Open chat"
            >
              {icon || <MessageSquareIcon className="h-7 w-7" />}
            </Button>
          )}
        </div>
      </ExpandableChatContext.Provider>
    );
  }
);
ExpandableChat.displayName = "ExpandableChat";


const ExpandableChatHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { setIsOpen } = useExpandableChat();
    return (
      <div
        ref={ref}
        className={cn("p-4 border-b bg-muted/50 relative", className)}
        {...props}
      >
        {children}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8"
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    );
  }
);
ExpandableChatHeader.displayName = "ExpandableChatHeader";

const ExpandableChatBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-y-auto", className)} // Removed p-4, ChatMessageList handles padding
        {...props}
      >
        {children}
      </div>
    );
  }
);
ExpandableChatBody.displayName = "ExpandableChatBody";

const ExpandableChatFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-3 border-t bg-background", className)} // Added bg-background for consistency
        {...props}
      >
        {children}
      </div>
    );
  }
);
ExpandableChatFooter.displayName = "ExpandableChatFooter";

// A default icon if none is provided
const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
  useExpandableChat,
};
