import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl("Hello Luxora, I'd like to know more about your collections.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="glass rounded-full pl-3 pr-3 sm:pr-5 py-3 flex items-center gap-3 soft-shadow hover:scale-105 transition-transform">
        <div className="h-9 w-9 rounded-full bg-[#25D366] flex items-center justify-center">
          <MessageCircle className="h-5 w-5 text-white" />
        </div>
        <div className="hidden sm:block">
          <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Concierge</div>
          <div className="text-sm font-medium">Chat on WhatsApp</div>
        </div>
      </div>
    </a>
  );
}
