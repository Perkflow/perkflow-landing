import {
  DollarSign,
  Gift,
  MapPin,
  Plane,
  ShoppingBag,
  Trophy,
  Star,
  Heart,
  Coffee,
  BookOpen,
  Music,
  Camera,
  Gamepad2,
  Car,
  Home,
  ShoppingCart,
  CreditCard,
  PiggyBank,
} from "lucide-react";
import { ReactNode } from "react";

export interface RewardIconProps {
  type: string;
  size?: number;
  className?: string;
  color?: string;
}

export const getRewardIcon = (
  type: string,
  size: number = 24,
  className: string = "",
  color: string = "currentColor",
): ReactNode => {
  const iconProps = {
    size,
    className,
    color,
  };

  switch (type.toLowerCase()) {
    case "cash":
    case "money":
      return <DollarSign {...iconProps} />;

    case "gift":
      return <Gift {...iconProps} />;

    case "travel":
      return <Plane {...iconProps} />;

    case "shopping":
    case "voucher":
      return <ShoppingCart {...iconProps} />;

    case "trophy":
    case "achievement":
      return <Trophy {...iconProps} />;

    case "star":
    case "recognition":
      return <Star {...iconProps} />;

    case "heart":
    case "appreciation":
      return <Heart {...iconProps} />;

    case "coffee":
    case "food":
      return <Coffee {...iconProps} />;

    case "book":
    case "education":
      return <BookOpen {...iconProps} />;

    case "music":
    case "entertainment":
      return <Music {...iconProps} />;

    case "camera":
    case "photo":
      return <Camera {...iconProps} />;

    case "game":
    case "gaming":
      return <Gamepad2 {...iconProps} />;

    case "car":
    case "transport":
      return <Car {...iconProps} />;

    case "home":
    case "house":
      return <Home {...iconProps} />;

    case "credit":
    case "card":
      return <CreditCard {...iconProps} />;

    case "savings":
    case "piggy":
      return <PiggyBank {...iconProps} />;

    case "location":
    case "map":
      return <MapPin {...iconProps} />;

    case "bag":
    case "shopping":
      return <ShoppingBag {...iconProps} />;

    default:
      return <Gift {...iconProps} />;
  }
};

export const getRewardIconWithLabel = (
  type: string,
  size: number = 24,
  className: string = "",
  color: string = "currentColor",
) => {
  const icon = getRewardIcon(type, size, className, color);

  return {
    icon,
    label: type.charAt(0).toUpperCase() + type.slice(1),
    type: type.toLowerCase(),
  };
};

export const getRewardTypeColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case "cash":
    case "money":
      return "text-green-600 bg-green-100";

    case "gift":
      return "text-purple-600 bg-purple-100";

    case "travel":
      return "text-blue-600 bg-blue-100";

    case "shopping":
    case "voucher":
      return "text-orange-600 bg-orange-100";

    case "trophy":
    case "achievement":
      return "text-yellow-600 bg-yellow-100";

    case "star":
    case "recognition":
      return "text-pink-600 bg-pink-100";

    case "heart":
    case "appreciation":
      return "text-red-600 bg-red-100";

    case "coffee":
    case "food":
      return "text-brown-600 bg-brown-100";

    case "book":
    case "education":
      return "text-indigo-600 bg-indigo-100";

    case "music":
    case "entertainment":
      return "text-teal-600 bg-teal-100";

    case "camera":
    case "photo":
      return "text-cyan-600 bg-cyan-100";

    case "game":
    case "gaming":
      return "text-violet-600 bg-violet-100";

    case "car":
    case "transport":
      return "text-gray-600 bg-gray-100";

    case "home":
    case "house":
      return "text-emerald-600 bg-emerald-100";

    case "credit":
    case "card":
      return "text-slate-600 bg-slate-100";

    case "savings":
    case "piggy":
      return "text-amber-600 bg-amber-100";

    case "location":
    case "map":
      return "text-rose-600 bg-rose-100";

    case "bag":
    case "shopping":
      return "text-orange-600 bg-orange-100";

    default:
      return "text-gray-600 bg-gray-100";
  }
};
