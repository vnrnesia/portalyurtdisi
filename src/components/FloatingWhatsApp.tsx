import { Send } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/905385892549"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile danışma"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-[#f04420] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#f04420]/30 transition-all duration-300 hover:bg-[#d63a1a] hover:shadow-xl active:scale-95"
    >
      <span className="-translate-y-0.5 leading-none">İletişime geç</span>
      <Send className="h-4 w-4" />
    </a>
  );
}
