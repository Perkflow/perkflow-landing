import React, {
  useId,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";

interface RadioGroupContextProps {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextProps | null>(null);

export const RadioGroup: React.FC<{
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  name?: string;
}> = ({ value, onValueChange, children, className, name }) => {
  const groupName = name || useId();
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!groupRef.current) return;
      const radios = Array.from(
        groupRef.current.querySelectorAll<HTMLInputElement>(
          "input[type=radio]",
        ),
      );
      const currentIndex = radios.findIndex((r) => r.checked);
      if (currentIndex === -1) return;
      let nextIndex = currentIndex;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % radios.length;
        radios[nextIndex].click();
        radios[nextIndex].focus();
        e.preventDefault();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        nextIndex = (currentIndex - 1 + radios.length) % radios.length;
        radios[nextIndex].click();
        radios[nextIndex].focus();
        e.preventDefault();
      }
    };

    const node = groupRef.current;
    node?.addEventListener("keydown", handleKeyDown);
    return () => node?.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <RadioGroupContext.Provider
      value={{ name: groupName, value, onValueChange }}
    >
      <div role="radiogroup" ref={groupRef} className={className} tabIndex={0}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

export const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { value: string; id?: string }
>(({ value, id, className = "", ...props }, ref) => {
  const context = useContext(RadioGroupContext);
  if (!context)
    throw new Error("RadioGroupItem must be used within RadioGroup");

  return (
    <input
      type="radio"
      id={id || value}
      name={context.name}
      value={value}
      className={`peer hidden ${className}`}
      ref={ref}
      checked={context.value === value}
      onChange={() => context.onValueChange(value)}
      {...props}
    />
  );
});

RadioGroupItem.displayName = "RadioGroupItem";
