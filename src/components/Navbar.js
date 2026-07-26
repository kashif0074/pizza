import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'Menu', route: 'menu' },
  { label: 'Deals', route: 'deals' },
  { label: 'Track', route: 'track' },
  { label: 'Story', route: 'story' },
  { label: 'Contact', route: 'contact' },
];

const Navbar = ({ onNavigate }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const handleNav = (route) => {
    setMenuOpen(false);
    onNavigate(route);
  };

  return (
    <View style={styles.navWrapper}>
      <View style={[styles.container, isMobile && styles.containerMobile]}>
        <TouchableOpacity onPress={() => handleNav('home')} accessibilityRole="button">
          <Text style={styles.logo}>MALIK .</Text>
        </TouchableOpacity>

        {!isMobile && (
          <View style={styles.links}>
            {NAV_LINKS.map(({ label, route }) => (
              <TouchableOpacity key={route} onPress={() => handleNav(route)}>
                <Text style={styles.linkText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.cartBtn} onPress={() => handleNav('cart')}>
            <Text style={styles.cartText}>CART</Text>
            {itemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{itemCount > 99 ? '99+' : itemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          {!isMobile && (
            <TouchableOpacity style={styles.orderBtn} onPress={() => handleNav('menu')}>
              <Text style={styles.orderText}>ORDER NOW</Text>
            </TouchableOpacity>
          )}
          {isMobile && (
            <TouchableOpacity
              onPress={() => setMenuOpen(!menuOpen)}
              style={styles.hamburger}
              accessibilityLabel={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <Text style={styles.hamburgerText}>{menuOpen ? '✕' : '☰'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isMobile && menuOpen && (
        <View style={styles.mobileMenu}>
          {NAV_LINKS.map(({ label, route }) => (
            <TouchableOpacity key={route} style={styles.mobileLink} onPress={() => handleNav(route)}>
              <Text style={styles.linkText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navWrapper: {
    zIndex: 100,
    backgroundColor: '#111111',
    position: 'sticky',
    top: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  containerMobile: {
    paddingHorizontal: 16,
  },
  logo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
  },
  links: {
    flexDirection: 'row',
    gap: 24,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartBtn: {
    padding: 8,
    position: 'relative',
  },
  cartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF5A24',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
  },
  orderBtn: {
    backgroundColor: '#FF5A24',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  orderText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  hamburger: {
    padding: 8,
    marginLeft: 4,
  },
  hamburgerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  mobileMenu: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  mobileLink: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
});

export default Navbar;
