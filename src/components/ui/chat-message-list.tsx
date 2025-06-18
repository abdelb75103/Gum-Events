
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ChatMessageList({
  children,
  className,
  ...props
}: ChatMessageListProps) {
  return (
    <ScrollArea className={cn("h-full flex-1 p-4", className)} {...props}>
      <div className="space-y-4">
        {children}
      </div>
    </ScrollArea>
  );
}
