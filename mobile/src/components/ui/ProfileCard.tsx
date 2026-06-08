import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { CustomText } from './CustomText';

interface ProfileCardProps {
  username: string;
  imageSource: any;
  onPress?: () => void;
}

/*
  strict grid adherence on most iOS devices
*/
const { width } = Dimensions.get('window');
const AVATAR_SIZE = width * 0.38;

export const ProfileCard: React.FC<ProfileCardProps> = ({
  username,
  imageSource,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.75} onPress={onPress}>
      <View style={styles.avatarContainer}>
        {/* 
          if i were releasing it into production 
          i would add cache property for loading images
        */}
        <Image source={imageSource} style={styles.avatar} />
      </View>
      
      <CustomText style={styles.username}>{username}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 28,
  },
  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
    backgroundColor: '#1E1F22',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  username: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
  },
  tagContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#52525B',
    letterSpacing: 0.5,
  },
});