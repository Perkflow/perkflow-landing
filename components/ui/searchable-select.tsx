"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
  description?: string;
  isSystem?: boolean;
}

interface SearchableSelectProps {
  options: Option[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  loading?: boolean;
  noOptionsMessage?: string;
  isClearable?: boolean;
  // New props for department creation suggestion
  showCreateSuggestion?: boolean;
  createSuggestionText?: string;
  onCreateSuggestion?: () => void;
}

export function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search options...",
  emptyMessage = "No options found.",
  disabled = false,
  required = false,
  className,
  loading = false,
  noOptionsMessage = "No options available",
  isClearable = false,
  showCreateSuggestion = false,
  createSuggestionText = "Create department",
  onCreateSuggestion,
}: SearchableSelectProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      option.description?.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const displayMessage = loading
    ? "Loading..."
    : filteredOptions.length === 0
      ? noOptionsMessage
      : emptyMessage;

  const handleCreateSuggestion = () => {
    if (onCreateSuggestion) {
      onCreateSuggestion();
      setIsOpen(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled || loading}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger
          className={cn("w-full", required && !value && "border-red-500")}
        >
          <SelectValue placeholder={placeholder}>
            {selectedOption && (
              <div className="flex items-center gap-2">
                <span>{selectedOption.label}</span>
                {selectedOption.isSystem && (
                  <Badge variant="secondary" className="text-xs">
                    System
                  </Badge>
                )}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <div className="relative">
              <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-8"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          {filteredOptions.length === 0 ? (
            <div className="p-2">
              <div className="mb-2 text-sm text-gray-500">{displayMessage}</div>
              {showCreateSuggestion && onCreateSuggestion && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={handleCreateSuggestion}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  {createSuggestionText}
                </Button>
              )}
            </div>
          ) : (
            filteredOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <span>{option.label}</span>
                  {option.isSystem && (
                    <Badge variant="secondary" className="text-xs">
                      System
                    </Badge>
                  )}
                </div>
                {option.description && (
                  <span className="ml-auto text-xs text-gray-500">
                    {option.description}
                  </span>
                )}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
