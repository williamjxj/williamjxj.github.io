import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 text-xs sm:text-sm hover:text-accent"
      title={language === "en" ? "Switch to Chinese" : "切换到英文"}
    >
      <Languages size={16} className="flex-shrink-0" />
      <span className="whitespace-nowrap">{language === "en" ? "中文" : "EN"}</span>
    </Button>
  );
}
