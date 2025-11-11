import { useState, useEffect } from 'react';
import { setLocale, getLocale } from '@/lib/strapi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState(getLocale());

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('locale') || 'en';
    setLocale(savedLang);
    setCurrentLang(savedLang);
  }, []);

  const handleLanguageChange = (newLang: string) => {
    setLocale(newLang);
    setCurrentLang(newLang);
    localStorage.setItem('locale', newLang);

    // Reload the page to fetch content in the new language
    window.location.reload();
  };

  return (
    <Select value={currentLang} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue>
          {LANGUAGES.find(l => l.code === currentLang)?.flag}{' '}
          {LANGUAGES.find(l => l.code === currentLang)?.name}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
