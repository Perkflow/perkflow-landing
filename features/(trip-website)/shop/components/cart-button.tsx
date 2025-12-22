"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CartButtonProps {
  label: string;
  successMessage?: string;
}

export default function CartButton({ label, successMessage }: CartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    setIsAdded(true);
    toast.success(successMessage || "Added to cart!");

    // Reset after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="w-full gap-2 sm:w-auto"
      disabled={isAdded}
    >
      {isAdded ? (
        <>
          <Check className="h-5 w-5" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          {label}
        </>
      )}
    </Button>
  );
}
