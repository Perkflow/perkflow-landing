import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlignJustify, X } from "lucide-react";
import LanguageSwitcher from "@/components/i18n/language-switcher";

interface Props {
  open: boolean;
  onToggle: () => void;
}

export default function MobileToggle({ onToggle, open }: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      <LanguageSwitcher />
      <Button
        onClick={onToggle}
        variant="ghost"
        className={cn(
          "inline-flex items-center justify-center rounded-md p-2",
          "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          "focus:outline-none",
        )}
      >
        {open ? <X className="size-7" /> : <AlignJustify className="size-7" />}
      </Button>
    </div>
  );
}
