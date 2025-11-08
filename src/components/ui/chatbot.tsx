import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Send, MessageSquare } from "lucide-react";

type Message = { from: "user" | "bot"; text: string };

export default function Chatbot({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! I'm FarmBot — ask me about soil, pests, irrigation, or courses." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      // small delay to ensure element is visible
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }, 50);
    }
  }, [messages.length, open]);

  const cannedReply = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("soil")) return "For soil health: test pH, check NPK levels, and add organic matter. You can order a soil test or follow our Soil Health course.";
    if (t.includes("pest") || t.includes("pests") || t.includes("disease")) return "Inspect leaves for spots and pests. Use integrated pest management: manual removal, biopesticides, and targeted chemical use only when necessary.";
    if (t.includes("irrig") || t.includes("drip") || t.includes("water")) return "Drip irrigation is water-efficient. Check for clogs, maintain pressure, and schedule watering according to crop stage and weather.";
    if (t.includes("course") || t.includes("learn") || t.includes("certificate")) return "Visit the Farm Academy courses section to enroll. We offer soil, pest control, and climate-smart courses with certificates.";
    return "Thanks for the question — here's a tip: rotate crops, maintain soil organic matter, and monitor pests weekly. For in-depth help, ask a specific question or visit our courses.";
  };

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { from: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // simulate bot response
    setTimeout(() => {
      const botMsg: Message = { from: "bot", text: cannedReply(trimmed) };
      setMessages((m) => [...m, botMsg]);
    }, 700);
  };

  return (
    <div>
      {/* Floating button */}
      <div className="fixed right-6 bottom-6 z-50">
        {!open && (
          <Button
            size="lg"
            className="flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
            onClick={() => onOpenChange(true)}
          >
            <MessageSquare className="h-5 w-5" />
            Chat
          </Button>
        )}

        {/* Chat panel */}
        {open && (
          <Card className="w-96 max-w-[92vw] h-[520px] flex flex-col overflow-hidden shadow-xl">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-orange-100 p-2">
                  <MessageSquare className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-semibold">FarmBot</div>
                  <div className="text-xs text-muted-foreground">AI farming assistant</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={() => onOpenChange(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white to-orange-50">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-lg ${m.from === "user" ? "bg-orange-500 text-white" : "bg-white border"}`}>
                    <div className="text-sm">{m.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                  placeholder="Ask about soil, pests, irrigation..."
                  className="flex-1 rounded-md border px-3 py-2 text-sm"
                />
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white" onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
