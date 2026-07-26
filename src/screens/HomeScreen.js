import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, useWindowDimensions } from 'react-native';
import Animated, {
  FadeInUp,
  FadeInLeft,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import HeroSection from '../components/HeroSection';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

const SALE_DEALS = [
  {
    title: 'Family Feast',
    desc: '2 Large + Sides + 1.5L Drink',
    price: 3999,
    details: 'Family Feast Deal · 2 Large Pizzas',
  },
  {
    title: 'Midnight Munchies',
    desc: '1 Medium + Garlic Bread',
    price: 1899,
    details: 'Midnight Munchies · Medium + Garlic Bread',
  },
];

const formatCountdown = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const HomeScreen = ({ onScrollToMenu }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 600;
  const [countdown, setCountdown] = useState(2 * 3600 + 14 * 60 + 33);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 2 * 3600 + 14 * 60 + 33));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <HeroSection onScrollToMenu={onScrollToMenu} />

      <View style={[styles.badgesContainer, isMobile && styles.badgesContainerMobile]}>
        {[
          { title: 'Wood-Fired', text: '900°F oak-burning ovens' },
          { title: 'Fresh Daily', text: '48-hour sourdough' },
          { title: 'Family Recipe', text: 'Three generations' },
          { title: 'Certified Halal', text: 'Every ingredient, verified' },
        ].map((badge, index) => (
          <Animated.View
            key={badge.title}
            entering={FadeInUp.delay(100 * (index + 1))}
            style={[styles.badge, isMobile ? styles.badgeMobile : styles.badgeDesktop]}
          >
            <Text style={styles.badgeTitle}>{badge.title}</Text>
            <Text style={styles.badgeText}>{badge.text}</Text>
          </Animated.View>
        ))}
      </View>

      <View style={styles.salesSection}>
        <Animated.Text entering={FadeInLeft.delay(100)} style={styles.sectionTitle}>
          Fire sales
        </Animated.Text>
        <Animated.Text entering={FadeInLeft.delay(200)} style={styles.timer}>
          Flash sale ends in {formatCountdown(countdown)}
        </Animated.Text>

        {SALE_DEALS.map((deal, index) => (
          <SaleCard key={deal.title} deal={deal} delay={300 + index * 100} />
        ))}
      </View>
    </View>
  );
};

const SaleCard = ({ deal, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const scale = useSharedValue(1);
  const { addToCart } = useCart();

  const handleHoverIn = () => {
    setIsHovered(true);
    scale.value = withTiming(1.02, { duration: 200 });
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    scale.value = withTiming(1, { duration: 200 });
  };

  const handleAdd = () => {
    addToCart({ name: deal.title, details: deal.details, price: deal.price });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInUp.delay(delay)} style={styles.saleCardWrapper}>
      <Animated.View style={animatedStyle}>
        <Pressable
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
          style={[styles.saleCard, isHovered && styles.saleCardHovered]}
        >
          <View style={styles.saleHeader}>
            <Text style={styles.saleTitle}>{deal.title}</Text>
            <Text style={styles.salePrice}>{formatPrice(deal.price)}</Text>
          </View>
          <Text style={styles.saleDesc}>{deal.desc}</Text>
          <TouchableOpacity
            style={[styles.saleButton, (isHovered || added) && styles.saleButtonHovered]}
            onPress={handleAdd}
          >
            <Text style={styles.saleButtonText}>{added ? 'Added ✓' : 'Add to Order'}</Text>
          </TouchableOpacity>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    paddingHorizontal: 20,
    paddingVertical: 40,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  badgesContainerMobile: {
    paddingHorizontal: 12,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  badgeDesktop: {
    width: '48%',
  },
  badgeMobile: {
    width: '100%',
  },
  badgeTitle: {
    color: '#FF5A24',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  badgeText: {
    color: '#aaa',
    fontSize: 12,
  },
  salesSection: {
    paddingVertical: 40,
    backgroundColor: '#111111',
    marginTop: 10,
    marginBottom: 30,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  timer: {
    color: '#FF5A24',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  saleCardWrapper: {
    marginBottom: 16,
  },
  saleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  saleCardHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 90, 36, 0.3)',
  },
  saleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 8,
  },
  saleTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    textTransform: 'uppercase',
    flex: 1,
  },
  salePrice: {
    color: '#FF5A24',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saleDesc: {
    color: '#ccc',
    fontSize: 15,
    marginBottom: 20,
  },
  saleButton: {
    backgroundColor: 'rgba(255, 90, 36, 0.1)',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF5A24',
  },
  saleButtonHovered: {
    backgroundColor: '#FF5A24',
  },
  saleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default HomeScreen;
