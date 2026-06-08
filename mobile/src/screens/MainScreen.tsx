import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, Search, LayoutGrid } from "lucide-react-native";
import { CustomText } from "../components/ui/CustomText";
import { ProfileCard } from "../components/ui/ProfileCard";

export const MainScreen: React.FC = () => {
  const PROFILES = [
    {
      id: "1",
      username: "elisiom",
      img: require("../../assets/images/1.jpg"),
    },
    {
      id: "2",
      username: "arv.ia",
      img: require("../../assets/images/2.jpg"),
    },
    {
      id: "3",
      username: "spancoAI",
      img: require("../../assets/images/3.jpg"),
    },
    {
      id: "4",
      username: "blackcofe.ai",
      img: require("../../assets/images/4.jpg"),
    },
    {
      id: "5",
      username: "elisiom",
      img: require("../../assets/images/1.jpg"),
    },
    {
      id: "6",
      username: "arv.ia",
      img: require("../../assets/images/2.jpg"),
    },
    {
      id: "7",
      username: "elisiom",
      img: require("../../assets/images/1.jpg"),
    },
    {
      id: "8",
      username: "arv.ia",
      img: require("../../assets/images/2.jpg"),
    },
    {
      id: "9",
      username: "elisiom",
      img: require("../../assets/images/1.jpg"),
    },
    {
      id: "10",
      username: "arv.ia",
      img: require("../../assets/images/2.jpg"),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* content */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Plus color="#FFFFFF" size={24} strokeWidth={1.8} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Search color="#FFFFFF" size={22} strokeWidth={1.8} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.iconButtonRight} activeOpacity={0.7}>
          <LayoutGrid color="#FFFFFF" size={22} strokeWidth={1.8} />
        </TouchableOpacity>
      </View>
      {/*
          up to 10 is enough for now and ScrollView + map
          but if more a would like use FlatList
      */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.titleContainer}>
          <CustomText variant="title" style={styles.mainTitle}>
            Select AI
          </CustomText>
        </View>

        <View style={styles.grid}>
          {PROFILES.map((profile) => (
            <ProfileCard
              key={profile.id}
              username={profile.username}
              imageSource={profile.img}
              onPress={() => console.log(`Selected ${profile.username}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18191B",
  },
  header: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginRight: 24,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonRight: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  titleContainer: {
    marginTop: 16,
    marginBottom: 36,
  },
  mainTitle: {
    fontSize: 44,
    lineHeight: 50,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
});
