import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, useWindowDimensions } from 'react-native';
import Animated, {
  FadeInRight,
  FadeOutLeft,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

const CartScreen = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 600;
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromoCode,
    cartTotal,
    subtotal,
    discount,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const scooterX = useSharedValue(-200);
  const biteScale = useSharedValue(1);
  const cheeseStretch = useSharedValue(0);
  const overlayOpacity = useSharedValue(1);

  const resetAnimation = () => {
    scooterX.value = -200;
    biteScale.value = 1;
    cheeseStretch.value = 0;
    overlayOpacity.value = 1;
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);
    resetAnimation();

    cheeseStretch.value = withTiming(100, { duration: 1500 });
    biteScale.value = withDelay(1500, withTiming(0, { duration: 500 }));
    scooterX.value = withDelay(
      2500,
      withTiming(isMobile ? 300 : 500, { duration: 2500, easing: Easing.inOut(Easing.ease) })
    );
    overlayOpacity.value = withDelay(5000, withTiming(0, { duration: 500 }));

    setTimeout(() => {
      setIsCheckingOut(false);
      clearCart();
      setPromoInput('');
      setPromoMessage('');
      setOrderPlaced(true);
      setTimeout(() => setOrderPlaced(false), 4000);
    }, 5500);
  };

  const handleApplyPromo = () => {
    if (!promoInput.trim()) {
      setPromoMessage('Enter a promo code.');
      return;
    }
    if (applyPromoCode(promoInput)) {
      setPromoMessage('Promo code FIRE20 applied — 20% off!');
    } else {
      setPromoMessage('Invalid promo code. Try FIRE20.');
    }
  };

  const scooterStyle = useAnimatedStyle(() => ({ transform: [{ translateX: scooterX.value }] }));
  const sliceStyle = useAnimatedStyle(() => ({ transform: [{ scale: biteScale.value }] }));
  const cheeseStyle = useAnimatedStyle(() => ({ height: cheeseStretch.value }));
  const overlayStyle = useAnimatedStyle(() => ({ opacity: overlayOpacity.value }));

  return (
    <View style={styles.container}>
      {isCheckingOut && (
        <Animated.View style={[styles.checkoutOverlay, overlayStyle]}>
          <Text style={styles.overlayText}>Preparing your order...</Text>
          <View style={styles.eatingAnimation}>
            <Animated.Text style={[styles.pizzaSlice, sliceStyle]}>🍕</Animated.Text>
            <Animated.View style={[styles.stretchyCheese, cheeseStyle]} />
          </View>
          <Animated.Text style={[styles.scooter, scooterStyle]}>🛵</Animated.Text>
        </Animated.View>
      )}

      <View style={styles.innerContainer}>
        <Text style={styles.title}>Your Cart</Text>
        <Text style={styles.subtitle}>
          {cartItems.length === 0
            ? 'Your cart is empty — browse the menu to get started.'
            : `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} ready to fire.`}
        </Text>

      {orderPlaced && (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>
            Order placed! The fire is burning and your pizza is on the way.
          </Text>
        </View>
      )}

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🍕</Text>
          <Text style={styles.emptyText}>Nothing here yet.</Text>
        </View>
      ) : (
        <View style={styles.itemsContainer}>
          {cartItems.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInRight.delay(index * 80)}
              exiting={FadeOutLeft}
              style={styles.cartItem}
            >
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetail} numberOfLines={2}>
                  {item.details}
                </Text>
                <Text style={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</Text>
              </View>
              <View style={styles.itemActions}>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, -1)}
                  >
                    <Text style={styles.qtyBtnText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, 1)}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))}

          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Promo code (try FIRE20)"
              placeholderTextColor="#666"
              value={promoInput}
              onChangeText={setPromoInput}
            />
            <TouchableOpacity style={styles.applyBtn} onPress={handleApplyPromo}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
          {promoMessage ? (
            <Text
              style={[
                styles.promoMessage,
                promoMessage.includes('applied') && styles.promoSuccess,
              ]}
            >
              {promoMessage}
            </Text>
          ) : null}

          <View style={styles.totalContainer}>
            <View>
              <Text style={styles.totalText}>Total {discount > 0 ? '(20% off)' : ''}</Text>
              {discount > 0 && (
                <Text style={styles.subtotalText}>Subtotal: {formatPrice(subtotal)}</Text>
              )}
            </View>
            <Text style={styles.totalAmount}>{formatPrice(cartTotal)}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
    </View>
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
  innerContainer: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  checkoutOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17, 17, 17, 0.95)',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#FF5A24',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  eatingAnimation: { alignItems: 'center', marginBottom: 60 },
  pizzaSlice: { fontSize: 80, zIndex: 2 },
  stretchyCheese: {
    width: 20,
    backgroundColor: '#FFD700',
    marginTop: -20,
    zIndex: 1,
    borderRadius: 10,
  },
  scooter: { fontSize: 60, position: 'absolute', bottom: 100 },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    color: '#888',
    fontSize: 15,
    marginBottom: 30,
  },
  successBanner: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    marginBottom: 20,
  },
  successText: { color: '#4CAF50', fontSize: 15, fontWeight: '600' },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyText: { color: '#aaa', fontSize: 18 },
  itemsContainer: { paddingBottom: 40 },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FF5A24',
    gap: 12,
  },
  itemInfo: { flex: 1 },
  itemName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  itemDetail: { color: '#888', fontSize: 14, marginTop: 4, marginBottom: 6 },
  itemPrice: { color: '#FF5A24', fontSize: 16, fontWeight: 'bold' },
  itemActions: { alignItems: 'flex-end', gap: 8 },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    overflow: 'hidden',
  },
  qtyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#333',
  },
  qtyBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  qtyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    minWidth: 36,
    textAlign: 'center',
  },
  removeBtn: {
    backgroundColor: 'rgba(255, 69, 0, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeText: { color: '#FF5A24', fontSize: 12, fontWeight: 'bold' },
  promoContainer: { flexDirection: 'row', marginTop: 20, marginBottom: 10 },
  promoInput: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    padding: 14,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    fontSize: 16,
  },
  applyBtn: {
    backgroundColor: '#333',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  applyText: { color: '#fff', fontWeight: 'bold' },
  promoMessage: { color: '#ff6b6b', marginBottom: 16, fontSize: 14 },
  promoSuccess: { color: '#4CAF50' },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  totalText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  subtotalText: { color: '#888', fontSize: 13, marginTop: 4 },
  totalAmount: { color: '#FF5A24', fontSize: 24, fontWeight: 'bold' },
  checkoutBtn: {
    backgroundColor: '#FF5A24',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default CartScreen;
