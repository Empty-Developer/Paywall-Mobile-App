import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { CustomText } from './CustomText';

interface ButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, isLoading = false }) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress} 
      activeOpacity={0.8}
      /*
        button lockup when loading handle
        repeated native triggers Double-Tap bug 
        during network requests/purchases
      */
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#000000" />
      ) : (
        <CustomText style={styles.text}>{title}</CustomText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  text: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '600',
  },
});