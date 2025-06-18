
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea, type TextareaProps } from "@/components/ui/textarea";

interface ChatInputProps extends TextareaProps {}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        className={cn(
          "flex-1 resize-none border-0 bg-background p-3 shadow-none focus-visible:ring-0",
          // Default height and styles, can be overridden by props
          "min-h-[3rem] text-sm",
          className
        )}
        {...props}
      />
    );
  }
);
ChatInput.displayName = "ChatInput";

export { ChatInput };
