import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions } from 'react-native';

const MESSAGE =
  'FREE DELIVERY OVER RS. 2,500 🍕 CRAFTED WITH FIRE, SERVED WITH LOVE 🍕   ';

const MarqueeBar = () => {
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scrollX.setValue(0);
    const animation = Animated.loop(
      Animated.timing(scrollX, {
        toValue: -width,
        duration: 12000,
        useNativeDriver: false,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [width, scrollX]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textContainer, { transform: [{ translateX: scrollX }] }]}>
        <Text style={styles.text}>{MESSAGE.repeat(3)}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF5A24',
    height: 36,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});

export default MarqueeBar;
