import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { CustomText } from './CustomText';

interface TariffCardProps {
  title: string;
  price: string;
  description: string;
  badge?: string;
  isSelected: boolean;
  onPress: () => void;
}

export const TariffCard: React.FC<TariffCardProps> = ({
  title,
  price,
  description,
  badge,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      // dynamic switching of map frames and backgrounds
      style={[styles.card, isSelected && styles.cardSelected]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.leftContent}>
        <View style={styles.titleContainer}>
          <CustomText style={styles.title}>{title}</CustomText>
          {badge && (
            <View style={styles.badge}>
              <CustomText style={styles.badgeText}>{badge}</CustomText>
            </View>
          )}
        </View>
        <CustomText style={styles.description}>{description}</CustomText>
      </View>
      
      <View style={styles.rightContent}>
        <CustomText style={styles.price}>{price}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  cardSelected: {
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  leftContent: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  badge: {
    backgroundColor: '#3F3F46',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 14,
    color: '#A1A1AA',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});