export const BadgeComp: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md";
}> = ({ children, variant = "secondary", size = "md" }) => {
  const baseClasses =
    "inline-flex items-center font-medium rounded-md transition-colors";
  const sizeClasses =
    size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <span
      className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
};
