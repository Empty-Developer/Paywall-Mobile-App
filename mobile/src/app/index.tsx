import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { PaywallScreen } from "../screens/PaywallScreen";
import { MainScreen } from "../screens/MainScreen";
import { useSubscription } from "../context/SubscriptionContext";

export default function Index() {
  const { isPremium, hasSeenOnboarding, isLoading, completeOnboarding, purchaseSubscription } = useSubscription();

  /*
    state management for UI
    this eliminates the need for heavy
    routing for simple linear scenarios
    Onboarding -> Paywall -> Main
  */
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (isPremium) {
    return <MainScreen />;
  }

  if (hasSeenOnboarding) {
    return <PaywallScreen onFinish={purchaseSubscription} />;
  }

  return <OnboardingScreen onFinish={completeOnboarding} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#18191B",
    justifyContent: "center",
    alignItems: "center",
  },
});