import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialAuthLoadingProps {
  isLoading: boolean;
  status: string;
  error?: string | null;
  progress?: number;
  className?: string;
}

export function SocialAuthLoading({
  isLoading,
  status,
  error,
  progress = 0,
  className,
}: SocialAuthLoadingProps) {
  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center space-x-2 text-red-600",
          className,
        )}
      >
        <XCircle className="h-4 w-4" />
        <span className="text-sm font-medium">{error}</span>
      </div>
    );
  }

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center space-x-2 text-blue-600",
        className,
      )}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm font-medium">{status}</span>
      {progress > 0 && (
        <div className="ml-2 h-1 w-16 rounded-full bg-gray-200">
          <div
            className="h-1 rounded-full bg-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

interface SocialAuthProgressProps {
  currentStep: number;
  totalSteps: number;
  status: string;
  error?: string | null;
  className?: string;
}

export function SocialAuthProgress({
  currentStep,
  totalSteps,
  status,
  error,
  className,
}: SocialAuthProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  if (error) {
    return (
      <div className={cn("text-center", className)}>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-red-600">
          Authentication Error
        </h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className={cn("text-center", className)}>
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">
        Setting up your account
      </h3>
      <p className="mb-4 text-gray-600">{status}</p>

      {/* Progress bar */}
      <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress steps */}
      <div className="flex justify-between text-xs text-gray-500">
        <span className={currentStep >= 1 ? "text-blue-600" : ""}>Connect</span>
        <span className={currentStep >= 2 ? "text-blue-600" : ""}>Verify</span>
        <span className={currentStep >= 3 ? "text-blue-600" : ""}>Setup</span>
        <span className={currentStep >= 4 ? "text-blue-600" : ""}>
          Complete
        </span>
      </div>
    </div>
  );
}

interface SocialAuthSuccessProps {
  message: string;
  className?: string;
}

export function SocialAuthSuccess({
  message,
  className,
}: SocialAuthSuccessProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center space-x-2 text-green-600",
        className,
      )}
    >
      <CheckCircle className="h-4 w-4" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
