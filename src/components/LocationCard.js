import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Linking } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const LocationCard = ({ name, address, phone, hours }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scale = useSharedValue(1);

  const handleHoverIn = () => {
    setIsHovered(true);
    scale.value = withTiming(1.02, { duration: 200 });
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    scale.value = withTiming(1, { duration: 200 });
  };

  const handleDirections = () => {
    const query = encodeURIComponent(`${name}, ${address}`);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${phone.replace(/\s/g, '')}`);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable onHoverIn={handleHoverIn} onHoverOut={handleHoverOut}>
      <Animated.View style={[styles.card, animatedStyle, isHovered && styles.cardHovered]}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.detail}>{address}</Text>
        <TouchableOpacity onPress={handleCall}>
          <Text style={styles.phone}>{phone}</Text>
        </TouchableOpacity>
        <Text style={styles.detail}>{hours}</Text>
        <TouchableOpacity
          style={[styles.button, isHovered && styles.buttonHovered]}
          onPress={handleDirections}
        >
          <Text style={[styles.buttonText, isHovered && styles.buttonTextHovered]}>
            Directions
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f1f1f',
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5A24',
  },
  cardHovered: {
    backgroundColor: '#252525',
    borderLeftColor: '#FF7A44',
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  detail: {
    color: '#bbb',
    fontSize: 15,
    marginBottom: 6,
    fontWeight: '500',
  },
  phone: {
    color: '#FF5A24',
    fontSize: 15,
    marginBottom: 6,
    fontWeight: '600',
  },
  button: {
    marginTop: 16,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 69, 0, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF5A24',
  },
  buttonHovered: {
    backgroundColor: '#FF5A24',
  },
  buttonText: {
    color: '#FF5A24',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  buttonTextHovered: {
    color: '#fff',
  },
});

export default LocationCard;
