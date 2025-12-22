"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  const debouncedOnChange = useDebouncedCallback((newValue: string) => {
    onChange(newValue);
  }, 300);

  return (
    <div className="relative mx-auto max-w-2xl">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        defaultValue={value}
        onChange={(e) => debouncedOnChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-full border-gray-200 bg-white pl-12 pr-4 text-base shadow-sm focus:border-primary focus:ring-primary"
      />
    </div>
  );
}
