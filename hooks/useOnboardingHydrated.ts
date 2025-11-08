import { useEffect, useState } from "react";
import { useOnboardingStore } from "@/stores/onboarding-store";

export function useOnboardingHydrated() {
  const [hydrated, setHydrated] = useState(false);
  const store = useOnboardingStore;

  useEffect(() => {
    const unsub = store.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (store.persist.hasHydrated()) {
      setHydrated(true);
    }

    return unsub;
  }, [store]);

  return hydrated;
}
