import React, { createContext, useContext, useState, useEffect } from "react";
// a hack for simulators to prevent sessions from crashing upon restart
import AsyncStorage from "@react-native-async-storage/async-storage";

const IS_PREMIUM_KEY = "user_is_premium_status";
const HAS_SEEN_ONBOARDING_KEY = "user_has_seen_onboarding_status";

interface SubscriptionContextType {
  isPremium: boolean;
  hasSeenOnboarding: boolean;
  isLoading: boolean;
  purchaseSubscription: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  resetSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined,
);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadInitialStates() {
      try {
        /*
          check user
        */
        const storedPremium = await AsyncStorage.getItem(IS_PREMIUM_KEY);
        const storedOnboarding = await AsyncStorage.getItem(
          HAS_SEEN_ONBOARDING_KEY,
        );

        if (storedPremium === "true") {
          setIsPremium(true);
        }
        if (storedOnboarding === "true") {
          setHasSeenOnboarding(true);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialStates();
  }, []);

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(HAS_SEEN_ONBOARDING_KEY, "true");
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error(error);
    }
  };

  const purchaseSubscription = async () => {
    try {
      await AsyncStorage.setItem(IS_PREMIUM_KEY, "true");
      setIsPremium(true);
    } catch (error) {
      console.error(error);
    }
  };

  const resetSubscription = async () => {
    try {
      await AsyncStorage.removeItem(IS_PREMIUM_KEY);
      await AsyncStorage.removeItem(HAS_SEEN_ONBOARDING_KEY); // clear
      setIsPremium(false);
      setHasSeenOnboarding(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isPremium,
        hasSeenOnboarding,
        isLoading,
        purchaseSubscription,
        completeOnboarding,
        resetSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error("useSubscription error");
  return context;
};