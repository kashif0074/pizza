import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const STEPS = ['Prep', 'Bake', 'Deliver'];

const TrackOrder = () => {
  const progress = useSharedValue(0);
  const [status, setStatus] = useState('Order Received');
  const [timeRemaining, setTimeRemaining] = useState('35 mins');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const duration = 15000;
    const startTime = Date.now();

    progress.value = withTiming(100, { duration, easing: Easing.linear });

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);

      if (pct >= 90) {
        setStatus('Arriving Now');
        setTimeRemaining('1 min');
        setActiveStep(3);
      } else if (pct >= 60) {
        setStatus('Out for Delivery');
        setTimeRemaining('10 mins');
        setActiveStep(2);
      } else if (pct >= 30) {
        setStatus('Baking in the Hearth');
        setTimeRemaining('20 mins');
        setActiveStep(1);
      } else {
        setStatus('Preparing Ingredients');
        setTimeRemaining('30 mins');
        setActiveStep(0);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.statusText}>{status}</Text>
        <Text style={styles.timeText}>{timeRemaining}</Text>
      </View>

      <View style={styles.progressBarBg}>
        <Animated.View style={[styles.progressBarFill, progressStyle]} />
      </View>

      <View style={styles.stepsContainer}>
        {STEPS.map((label, index) => {
          const isActive = activeStep > index || (index === 0 && activeStep === 0);
          const isComplete = activeStep > index;
          return (
            <View key={label} style={styles.step}>
              <View style={[styles.dot, isActive && styles.dotActive, isComplete && styles.dotComplete]} />
              <Text style={[styles.stepText, isActive && styles.stepTextActive]}>{label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  timeText: {
    color: '#FF5A24',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF5A24',
    borderRadius: 4,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#333',
    marginBottom: 8,
  },
  dotActive: {
    backgroundColor: '#FF5A24',
  },
  dotComplete: {
    backgroundColor: '#4CAF50',
  },
  stepText: {
    color: '#666',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepTextActive: {
    color: '#fff',
  },
});

export default TrackOrder;
