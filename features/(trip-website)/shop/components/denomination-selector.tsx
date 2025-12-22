"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DenominationSelectorProps {
  denominations: number[];
  currency: string;
  label: string;
}

export default function DenominationSelector({
  denominations,
  currency,
  label,
}: DenominationSelectorProps) {
  const [selected, setSelected] = useState<number>(denominations[0]);

  return (
    <div>
      <h3 className="mb-3 font-semibold text-gray-900">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {denominations.map((amount) => (
          <Button
            key={amount}
            variant={selected === amount ? "default" : "outline"}
            onClick={() => setSelected(amount)}
            className={cn(
              "min-w-[80px]",
              selected === amount && "ring-2 ring-primary ring-offset-2"
            )}
          >
            {amount} {currency}
          </Button>
        ))}
      </div>
    </div>
  );
}
