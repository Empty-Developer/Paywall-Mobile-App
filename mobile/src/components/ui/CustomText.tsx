import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
  variant?: 'title' | 'body' | 'skip';
}

export const CustomText: React.FC<CustomTextProps> = ({ 
  children, 
  variant = 'body', // standard
  style, 
  ...props 
}) => {
  return (
    <Text style={[styles.base, styles[variant], style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: '#FFFFFF',
    // on iOS and Android system fonts will be pulled in by default
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  body: {
    fontSize: 16,
    color: '#A1A1AA',
    lineHeight: 24,
  },
  skip: {
    fontSize: 15,
    color: '#71717A',
    fontWeight: '500',
  },
});