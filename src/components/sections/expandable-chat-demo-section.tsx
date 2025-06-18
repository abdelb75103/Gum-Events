
"use client";

import { useState, type FormEvent } from "react";
import { Send, Bot, Paperclip, Mic, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import Image from "next/image";

interface Message {
  id: number;
  content: string;
  sender: "ai" | "user";
}

export default function ExpandableChatDemoSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      sender: "ai",
    },
    {
      id: 2,
      content: "I have a question about the component library.",
      sender: "user",
    },
    {
      id: 3,
      content: "Sure! I'd be happy to help. What would you like to know?",
      sender: "ai",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(), // Use timestamp for more unique ID
        content: input,
        sender: "user",
      },
    ]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1, // Use timestamp for more unique ID
          content: "This is an AI response to your message.",
          sender: "ai",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleAttachFile = () => {
    // Placeholder for file attachment logic
    console.log("Attach file clicked");
  };

  const handleMicrophoneClick = () => {
    // Placeholder for microphone logic
    console.log("Microphone clicked");
  };

  const userAvatarSrc = "https://placehold.co/64x64.png";
  const aiAvatarSrc = "https://placehold.co/64x64.png";

  return (
    <section id="chat-demo" className="py-12 bg-secondary dark:bg-background">
      <div className="container mx-auto px-4 text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Try Our Expandable Chat!</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Experience the interactive chat component below.
        </p>
      </div>
      {/* This div controls the placement and size of the chat for demo purposes on the page */}
      <div className="h-[600px] relative max-w-3xl mx-auto">
        <ExpandableChat
          size="lg"
          position="bottom-right"
          icon={<Bot className="h-6 w-6" />}
          // For in-page demo, override fixed positioning to static or relative if needed.
          // className="static sm:relative" // Example: if you want it embedded, not fixed.
          // If you want it to behave as a true fixed chat widget for the demo section, remove className override.
        >
          <ExpandableChatHeader className="flex-col text-center justify-center">
            <h1 className="text-xl font-semibold">Chat with AI ✨</h1>
            <p className="text-sm text-muted-foreground">
              Ask me anything about the components
            </p>
          </ExpandableChatHeader>

          <ExpandableChatBody>
            <ChatMessageList>
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  variant={message.sender === "user" ? "sent" : "received"}
                >
                  <ChatBubbleAvatar
                    className="h-8 w-8 shrink-0"
                    // fallback is used if Image component has issues or src is invalid
                    fallback={message.sender === "user" ? "US" : "AI"}
                  >
                    <Image 
                      src={message.sender === "user" ? userAvatarSrc : aiAvatarSrc} 
                      alt={`${message.sender} avatar`} 
                      width={32} 
                      height={32} 
                      className="rounded-full"
                      data-ai-hint={message.sender === "user" ? "user avatar" : "robot avatar"}
                    />
                  </ChatBubbleAvatar>
                  <ChatBubbleMessage
                    variant={message.sender === "user" ? "sent" : "received"}
                  >
                    {message.content}
                  </ChatBubbleMessage>
                </ChatBubble>
              ))}

              {isLoading && (
                <ChatBubble variant="received">
                   <ChatBubbleAvatar
                    className="h-8 w-8 shrink-0"
                    fallback="AI"
                  >
                     <Image 
                      src={aiAvatarSrc} 
                      alt="AI avatar" 
                      width={32} 
                      height={32} 
                      className="rounded-full"
                      data-ai-hint="robot avatar"
                    />
                  </ChatBubbleAvatar>
                  <ChatBubbleMessage isLoading />
                </ChatBubble>
              )}
            </ChatMessageList>
          </ExpandableChatBody>

          <ExpandableChatFooter>
            <form
              onSubmit={handleSubmit}
              className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
            >
              <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0 justify-between">
                <div className="flex">
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={handleAttachFile}
                    aria-label="Attach file"
                  >
                    <Paperclip className="size-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={handleMicrophoneClick}
                    aria-label="Use microphone"
                  >
                    <Mic className="size-4" />
                  </Button>
                </div>
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </ExpandableChatFooter>
        </ExpandableChat>
      </div>
    </section>
  );
}
