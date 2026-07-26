import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const HeroSection = ({ onScrollToMenu }) => {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  const heroHeight = isMobile ? Math.min(520, height * 0.75) : 600;

  const scale = useSharedValue(1.1);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 10000 }),
        withTiming(1.1, { duration: 10000 })
      ),
      -1,
      true
    );
    rotateX.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-5, { duration: 5000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    rotateY.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-5, { duration: 6000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
    ],
  }));

  return (
    <View style={[styles.container, { height: heroHeight }]}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop',
          }}
          style={styles.backgroundImage}
        />
      </Animated.View>

      {!isMobile &&
        [...Array(12)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 800} containerHeight={heroHeight} />
        ))}

      <View style={styles.overlay}>
        <Text style={[styles.eyebrow, isMobile && styles.eyebrowMobile]}>
          Wood-Fired Since 1994
        </Text>
        <Text style={[styles.title, isMobile && styles.titleMobile]}>
          Crafted with Fire, Served with Love
        </Text>

        <View style={[styles.statsContainer, isMobile && styles.statsContainerMobile]}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>4.9/5</Text>
            <Text style={styles.statLabel}>2,400+ reviews</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>30+</Text>
            <Text style={styles.statLabel}>Years serving</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1.2M</Text>
            <Text style={styles.statLabel}>Pizzas fired</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onScrollToMenu} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FloatingParticle = ({ delay, containerHeight }) => {
  const translateY = useSharedValue(containerHeight);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(0);
  const left = useRef(Math.random() * 90 + 5).current;
  const size = useRef(Math.random() * 8 + 4).current;
  const color = useRef(Math.random() > 0.5 ? '#4CAF50' : '#FFC107').current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      translateY.value = withRepeat(
        withTiming(-100, { duration: 8000, easing: Easing.linear }),
        -1,
        false
      );
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 1000 }),
          withTiming(0.8, { duration: 6000 }),
          withTiming(0, { duration: 1000 })
        ),
        -1,
        false
      );
      rotate.value = withRepeat(
        withTiming(360, { duration: 4000, easing: Easing.linear }),
        -1,
        false
      );
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        style,
        { left: `${left}%`, width: size, height: size, backgroundColor: color },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    zIndex: 10,
  },
  particle: {
    position: 'absolute',
    borderRadius: 50,
    zIndex: 2,
    bottom: 0,
  },
  eyebrow: {
    color: '#FF5A24',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  eyebrowMobile: {
    fontSize: 12,
    letterSpacing: 2,
  },
  title: {
    color: '#fff',
    fontSize: 52,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 32,
    textShadow: '0px 4px 15px rgba(0,0,0,0.9)',
    textTransform: 'uppercase',
    letterSpacing: 2,
    maxWidth: 900,
  },
  titleMobile: {
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 1,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 600,
    marginBottom: 32,
  },
  statsContainerMobile: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 24,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#FF5A24',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF5A24',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    boxShadow: '0px 8px 15px rgba(255,90,36,0.4)',
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default HeroSection;
