import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomText } from "../components/ui/CustomText";
import { TariffCard } from "../components/ui/TariffCard";
import { Button } from "../components/ui/Button";

/*
  TODO:
  1. implement a simulated purchase
  2. create save state purchase
*/

interface PaywallScreenProps {
  onFinish: () => void;
}

const FEATURES = [
  "Full access to all premium tools",
  "Advanced AI generation models",
  "Unlimited projects & cloud exports",
  "Priority 24/7 customer support",
];

export const PaywallScreen: React.FC<PaywallScreenProps> = ({ onFinish }) => {
  const [selectedTariff, setSelectedTariff] = useState<"monthly" | "yearly">(
    "yearly",
  );
  const [isLoading, setIsLoading] = useState(false);

  // simulating asynchronous billing behavior
  const handlePurchase = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onFinish();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <CustomText variant="title" style={styles.mainTitle}>
          Get Premium Access
        </CustomText>
        <CustomText style={styles.subtitle}>
          Unlock the full power of the app and speed up your workflow
        </CustomText>
      </View>

      <View style={styles.featuresContainer}>
        {FEATURES.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <CustomText style={styles.checkmark}>✓</CustomText>
            <CustomText style={styles.featureText}>{feature}</CustomText>
          </View>
        ))}
      </View>

      <View style={styles.tariffsContainer}>
        <TariffCard
          title="Monthly Plan"
          price="$9.99/mo"
          description="Cancel anytime, no commitment"
          isSelected={selectedTariff === "monthly"}
          onPress={() => setSelectedTariff("monthly")}
        />

        <TariffCard
          title="Annual Plan"
          price="$59.99/yr"
          description="Just $4.99/month, billed annually"
          badge="SAVE 50%"
          isSelected={selectedTariff === "yearly"}
          onPress={() => setSelectedTariff("yearly")}
        />
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handlePurchase}
          isLoading={isLoading}
        />
        <CustomText style={styles.termsText}>
          Secured with App Store. Cancel anytime in settings.
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18191B",
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 16,
    borderRadius: 14,
  },
  mainTitle: {
    textAlign: "center",
    fontSize: 28,
  },
  subtitle: {
    textAlign: "center",
    marginTop: 8,
    color: "#A1A1AA",
  },
  featuresContainer: {
    marginVertical: 24,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkmark: {
    color: "#FFFFFF",
    marginRight: 12,
    fontSize: 16,
    fontWeight: "700",
  },
  featureText: {
    fontSize: 15,
    color: "#E4E4E7",
  },
  tariffsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  footer: {
    marginBottom: 16,
    alignItems: "center",
  },
  termsText: {
    fontSize: 12,
    color: "#71717A",
    marginTop: 12,
    textAlign: "center",
  },
});