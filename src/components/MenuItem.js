import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useCart } from '../context/CartContext';
import { parsePrice } from '../utils/formatPrice';

const MenuItem = ({ name, price, ingredients, imageUrl }) => {
  const [flipped, setFlipped] = useState(false);
  const flipValue = useSharedValue(0);
  const scale = useSharedValue(1);
  const elevation = useSharedValue(6);

  const { addToCart } = useCart();

  const handleAddToCart = (event) => {
    event?.stopPropagation?.();
    addToCart({
      name,
      details: ingredients,
      price: parsePrice(price),
    });
  };

  const flipCard = () => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );
    flipValue.value = withTiming(flipped ? 0 : 180, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    setFlipped(!flipped);
  };

  const handlePressIn = () => {
    scale.value = withTiming(1.05, { duration: 200 });
    elevation.value = withTiming(15, { duration: 200 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
    elevation.value = withTiming(6, { duration: 200 });
  };

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${flipValue.value}deg` }, { scale: scale.value }],
    boxShadow: `0px ${elevation.value}px ${elevation.value * 1.5}px rgba(0,0,0,${elevation.value / 30})`,
    elevation: elevation.value,
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${flipValue.value + 180}deg` }, { scale: scale.value }],
    elevation: elevation.value,
  }));

  return (
    <Pressable onPress={flipCard} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <View style={styles.cardContainer}>
        <CrumbParticles triggerScale={scale} />

        <Animated.View style={[styles.card, styles.cardFront, frontStyle]}>
          <Image
            source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
            style={styles.image}
            resizeMode="cover"
          />
          {(name === 'Original Margherita' || name === 'Bee Sting') && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>BESTSELLER</Text>
            </View>
          )}
          <View style={styles.details}>
            <View style={styles.header}>
              <Text style={styles.name} numberOfLines={1}>
                {name}
              </Text>
              <Text style={styles.price}>{price}</Text>
            </View>
            <Text style={styles.ingredients} numberOfLines={2}>
              {ingredients}
            </Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.card, styles.cardBack, backStyle]}>
          <View style={styles.backContent}>
            <Text style={styles.backTitle}>{name}</Text>
            <Text style={styles.backSub}>Nutritional Facts</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionBox}>
                <Text style={styles.nutritionVal}>850</Text>
                <Text style={styles.nutritionLabel}>Kcal</Text>
              </View>
              <View style={styles.nutritionBox}>
                <Text style={styles.nutritionVal}>32g</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
              <View style={styles.nutritionBox}>
                <Text style={styles.nutritionVal}>94g</Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              <View style={styles.nutritionBox}>
                <Text style={styles.nutritionVal}>38g</Text>
                <Text style={styles.nutritionLabel}>Fat</Text>
              </View>
            </View>
            <Text style={styles.backAllergens}>Allergens: Dairy, Gluten</Text>
            <TouchableOpacity style={styles.backAddBtn} onPress={handleAddToCart}>
              <Text style={styles.backAddText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const CrumbParticles = ({ triggerScale }) => (
  <>
    {[...Array(5)].map((_, i) => (
      <Crumb key={i} triggerScale={triggerScale} delay={i * 50} />
    ))}
  </>
);

const Crumb = ({ triggerScale, delay }) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const left = useRef(Math.random() * 80 + 10).current;
  const size = useRef(Math.random() * 4 + 2).current;

  useAnimatedReaction(
    () => triggerScale.value > 1.01,
    (isPressed) => {
      if (isPressed) {
        translateY.value = withDelay(delay, withTiming(40, { duration: 600 }));
        opacity.value = withDelay(
          delay,
          withSequence(
            withTiming(1, { duration: 100 }),
            withTiming(0, { duration: 500 })
          )
        );
      } else {
        translateY.value = 0;
        opacity.value = 0;
      }
    }
  );

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[styles.crumb, style, { left: `${left}%`, width: size, height: size }]}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginBottom: 20,
    width: '100%',
    height: 280,
  },
  crumb: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#d2b48c',
    borderRadius: 2,
    zIndex: 0,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    boxShadow: '0px 10px 10px rgba(0,0,0,0.5)',
  },
  cardFront: { zIndex: 2 },
  cardBack: { backgroundColor: '#2a2a2a', zIndex: 1 },
  backContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backTitle: {
    color: '#FF5A24',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  backSub: {
    color: '#888',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 20,
    letterSpacing: 1,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  nutritionBox: {
    backgroundColor: '#111',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  nutritionVal: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  nutritionLabel: {
    color: '#aaa',
    fontSize: 10,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  backAllergens: {
    color: '#FF5A24',
    fontSize: 12,
    marginTop: 10,
    fontWeight: 'bold',
  },
  backAddBtn: {
    marginTop: 16,
    backgroundColor: '#FF5A24',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backAddText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF5A24',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#FF5A24',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    boxShadow: '0px 4px 5px rgba(255, 90, 36, 0.5)',
    elevation: 5,
  },
  addIcon: { color: '#fff', fontSize: 22, fontWeight: 'bold', lineHeight: 24 },
  image: { width: '100%', height: 140 },
  details: { padding: 12 },
  header: { flexDirection: 'column', marginBottom: 6 },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' },
  price: { color: '#FF5A24', fontSize: 14, fontWeight: 'bold', marginTop: 4 },
  ingredients: { color: '#888', fontSize: 12, lineHeight: 16 },
});

export default MenuItem;
