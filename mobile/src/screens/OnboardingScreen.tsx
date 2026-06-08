import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomText } from "../components/ui/CustomText";
import { Button } from "../components/ui/Button";

interface OnboardingScreenProps {
  onFinish: () => void;
}

const DATA = [
  {
    id: 1,
    title: "Build apps without\nwriting any code",
    image: require("../../assets/images/picture-one.png"),
  },
  {
    id: 2,
    title: "Everything you need:\nAI, payments, database\nand more...",
    image: require("../../assets/images/picture-two.png"),
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onFinish,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleContinue = () => {
    if (currentStep < DATA.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onFinish();
    }
  };

  const activeData = DATA[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFinish} activeOpacity={0.7}>
          <CustomText variant="skip">Skip</CustomText>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={activeData.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {/* pagination via index */}
          {DATA.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <CustomText variant="title" style={styles.title}>
          {activeData.title}
        </CustomText>

        <Button title="Continue" onPress={handleContinue} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18191B",
  },
  header: {
    height: 44,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 24,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: "100%",
    height: "80%",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  dotsContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  dot: {
    height: 4,
    borderRadius: 2,
    marginRight: 6,
  },
  activeDot: {
    width: 16,
    backgroundColor: "#FFFFFF",
  },
  inactiveDot: {
    width: 4,
    backgroundColor: "#3F3F46",
  },
  title: {
    marginBottom: 40,
  },
});
