import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay,
  Easing,
  withRepeat
} from 'react-native-reanimated';
import { useCart } from '../context/CartContext';

const customizationOptions = [
  { name: 'Base', options: [{ label: 'Sourdough', price: 0 }, { label: 'Gluten Free', price: 250 }] },
  { name: 'Sauce', options: [{ label: 'San Marzano', price: 0 }, { label: 'Spicy Arrabbiata', price: 100 }] },
  { name: 'Cheese', options: [{ label: 'Fior di Latte', price: 0 }, { label: 'Vegan Mozzarella', price: 300 }] },
  { name: 'Toppings', options: [{ label: 'Pepperoni', price: 150 }, { label: 'Truffle Oil', price: 250 }, { label: 'Basil', price: 0 }] }
];

const PizzaVisualizer = ({ selections, isBaking }) => {
  const sauceScale = useSharedValue(0);
  const doughRotate = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    if (selections.Base) {
      doughRotate.value = withTiming(360, { duration: 1000, easing: Easing.out(Easing.exp) });
    }
  }, [selections.Base]);

  useEffect(() => {
    if (selections.Sauce) {
      sauceScale.value = 0;
      sauceScale.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.circle) });
    }
  }, [selections.Sauce]);

  useEffect(() => {
    if (isBaking) {
      glowOpacity.value = withRepeat(
        withSequence(withTiming(0.8, { duration: 400 }), withTiming(0.4, { duration: 400 })),
        5,
        true
      );
      setTimeout(() => { glowOpacity.value = withTiming(0) }, 2000);
    }
  }, [isBaking]);

  const doughStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${doughRotate.value}deg` }],
  }));

  const sauceStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sauceScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.visualizerContainer}>
      <Animated.View style={[styles.glow, glowStyle]} />
      <Animated.View style={[styles.dough, doughStyle]}>
        {selections.Sauce && (
          <Animated.View style={[styles.sauce, sauceStyle]} />
        )}
        {selections.Cheese && (
          <View style={styles.cheeseContainer}>
             {[...Array(20)].map((_, i) => (
                <Particle key={`cheese-${i}`} color="#FFFDD0" delay={i * 30} />
             ))}
          </View>
        )}
        {selections.Toppings && (
          <View style={styles.toppingsContainer}>
             {[...Array(12)].map((_, i) => (
                <Particle 
                  key={`top-${i}`} 
                  color={selections.Toppings === 'Pepperoni' ? '#D22B2B' : (selections.Toppings === 'Basil' ? '#4CAF50' : '#8B4513')} 
                  delay={i * 60} 
                  size={selections.Toppings === 'Pepperoni' ? 24 : 15}
                  isRound={selections.Toppings === 'Pepperoni'}
                />
             ))}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const Particle = ({ color, delay, size = 10, isRound = false }) => {
  const translateY = useSharedValue(-200);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(delay, withTiming(0, { duration: 500, easing: Easing.bounce }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 100 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const left = Math.random() * 80 + 10;
  const top = Math.random() * 80 + 10;

  return (
    <Animated.View style={[
      {
        position: 'absolute',
        backgroundColor: color,
        width: size,
        height: size,
        left: `${left}%`,
        top: `${top}%`,
        borderRadius: isRound ? size/2 : 4,
      },
      style
    ]} />
  );
}

const CustomizationSection = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [selections, setSelections] = useState({
    Base: 'Sourdough',
    Sauce: 'San Marzano',
    Cheese: 'Fior di Latte',
    Toppings: 'Pepperoni'
  });
  const [isBaking, setIsBaking] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const toggleSelection = (category, label) => {
    setSelections({ ...selections, [category]: label });
  };

  const calculatePrice = () => {
    let basePrice = 1200;
    customizationOptions.forEach(cat => {
      const selectedOption = cat.options.find(opt => opt.label === selections[cat.name]);
      if (selectedOption) {
        basePrice += selectedOption.price;
      }
    });
    return basePrice;
  };

  const handleAddToCart = () => {
    setIsBaking(true);
    setTimeout(() => {
      const details = `${selections.Base} · ${selections.Sauce} · ${selections.Cheese} · ${selections.Toppings}`;
      addToCart({
        name: 'Custom Pizza',
        details,
        price: calculatePrice(),
      });
      setIsBaking(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BUILD YOUR OWN</Text>
      <Text style={styles.subtitle}>Every layer, your call. We handle the fire.</Text>
      
      <View style={[styles.builderLayout, isMobile && styles.builderLayoutMobile]}>
        <View style={[styles.optionsSide, isMobile && styles.optionsSideMobile]}>
          {customizationOptions.map((cat, i) => (
            <View key={i} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{cat.name}</Text>
              <View style={styles.optionsContainer}>
                {cat.options.map((opt, index) => {
                  const isActive = selections[cat.name] === opt.label;
                  return (
                    <TouchableOpacity 
                      key={index} 
                      style={[styles.optionBtn, isActive && styles.optionBtnActive]}
                      onPress={() => toggleSelection(cat.name, opt.label)}
                    >
                      <Text style={[styles.optionText, isActive && styles.optionTextActive]}>{opt.label}</Text>
                      {opt.price > 0 && <Text style={[styles.optionPrice, isActive && styles.optionTextActive]}>+PKR {opt.price}</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.visualizerSide, isMobile && { marginBottom: 40 }]}>
           <PizzaVisualizer selections={selections} isBaking={isBaking} />
        </View>
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.summaryTitle}>Your Custom Creation</Text>
        <View style={styles.orderItem}>
          <Text style={styles.itemName}>Base: {selections.Base}</Text>
          <Text style={styles.itemName}>Sauce: {selections.Sauce}</Text>
          <Text style={styles.itemName}>Cheese: {selections.Cheese}</Text>
          <Text style={styles.itemName}>Toppings: {selections.Toppings}</Text>
        </View>
        <TouchableOpacity style={[styles.checkoutBtn, isBaking && styles.checkoutBtnDisabled]} onPress={handleAddToCart} disabled={isBaking}>
          <Text style={styles.checkoutText}>
            {isBaking ? 'Baking in Oven...' : added ? 'Added to Cart ✓' : `Add to Cart · PKR ${calculatePrice().toLocaleString()}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#111111',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  builderLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  builderLayoutMobile: {
    flexDirection: 'column-reverse',
  },
  optionsSide: {
    flex: 1,
    minWidth: '50%',
  },
  optionsSideMobile: {
    minWidth: '100%',
  },
  visualizerSide: {
    flex: 1,
    minWidth: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  visualizerContainer: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dough: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#F5DEB3', // Slightly warmer dough color
    borderWidth: 16,
    borderColor: '#D2B48C', // richer crust
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    boxShadow: '0px 10px 15px rgba(0,0,0,0.5)',
    elevation: 10,
  },
  sauce: {
    width: '95%',
    height: '95%',
    borderRadius: 120,
    backgroundColor: '#9e1b1b', // Deeper San Marzano red
    position: 'absolute',
  },
  cheeseContainer: { ...StyleSheet.absoluteFillObject },
  toppingsContainer: { ...StyleSheet.absoluteFillObject },
  glow: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#FF4500',
    filter: 'blur(20px)', 
    zIndex: -1,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 20,
  },
  categoryContainer: { marginBottom: 16 },
  categoryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionBtn: {
    backgroundColor: '#1f1f1f',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    boxShadow: '0px 4px 5px rgba(0,0,0,0.3)',
    elevation: 3,
  },
  optionBtnActive: {
    backgroundColor: '#FF5A24',
    borderColor: '#FF5A24',
  },
  optionText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
  },
  optionTextActive: { color: '#fff' },
  optionPrice: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  orderSummary: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#444',
    marginTop: 20,
  },
  summaryTitle: {
    color: '#FF5A24',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  orderItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  itemName: { color: '#fff', fontSize: 16, fontWeight: '600' },
  checkoutBtn: {
    backgroundColor: '#FF5A24',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    boxShadow: '0px 8px 15px rgba(255,90,36,0.4)',
    elevation: 8,
  },
  checkoutBtnDisabled: {
    opacity: 0.7,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  }
});

export default CustomizationSection;
