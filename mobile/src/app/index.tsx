import React, { useState } from "react";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { PaywallScreen } from "../screens/PaywallScreen";
import { MainScreen } from "../screens/MainScreen";

type AppFlow = 'onboarding' | 'paywall' | 'main';

export default function Index() {
  const [currentFlow, setCurrentFlow] = useState<AppFlow>('onboarding');

  /*
    state management for UI
    this eliminates the need for heavy
    routing for simple linear scenarios
    Onboarding -> Paywall -> Main
  */
  if (currentFlow === 'onboarding') {
    return <OnboardingScreen onFinish={() => setCurrentFlow('paywall')} />;
  }

  if (currentFlow === 'paywall') {
    return <PaywallScreen onFinish={() => setCurrentFlow('main')} />;
  }

  return <MainScreen />;
}