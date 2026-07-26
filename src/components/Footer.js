import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from 'react-native';

const Footer = ({ onNavigate }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleLink = (route) => {
    if (onNavigate) onNavigate(route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.newsletterSection}>
        <Text style={styles.innerCircle}>Inner Circle</Text>
        <Text style={styles.newsletterTitle}>Get 20% off your first order</Text>
        <Text style={styles.newsletterDesc}>
          Join our newsletter for off-menu drops, chef notes, and secret specials.
        </Text>
        {subscribed ? (
          <Text style={styles.subscribedMsg}>You're in! Check your inbox for your welcome offer.</Text>
        ) : (
          <View style={[styles.inputContainer, isMobile && styles.inputContainerMobile]}>
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.subscribeBtn} onPress={handleSubscribe}>
              <Text style={styles.subscribeText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={[styles.linksContainer, isMobile && styles.linksContainerMobile]}>
        <View style={[styles.linkColumn, isMobile && styles.linkColumnMobile]}>
          <Text style={styles.columnTitle}>Menu</Text>
          <TouchableOpacity onPress={() => handleLink('menu')}>
            <Text style={styles.link}>Classic</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLink('menu')}>
            <Text style={styles.link}>BBQ Series</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLink('menu')}>
            <Text style={styles.link}>Premium</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.linkColumn, isMobile && styles.linkColumnMobile]}>
          <Text style={styles.columnTitle}>Company</Text>
          <TouchableOpacity onPress={() => handleLink('story')}>
            <Text style={styles.link}>Our Story</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLink('story')}>
            <Text style={styles.link}>Locations</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.linkColumn, isMobile && styles.linkColumnMobile]}>
          <Text style={styles.columnTitle}>Support</Text>
          <TouchableOpacity onPress={() => handleLink('track')}>
            <Text style={styles.link}>Track Order</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLink('contact')}>
            <Text style={styles.link}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.trustLayer}>
        <View style={[styles.badgesRow, isMobile && styles.badgesRowMobile]}>
          <Text style={styles.trustBadge}>✓ Halal Certified</Text>
          <Text style={styles.trustBadge}>✓ SSL Secure</Text>
          <Text style={styles.trustBadge}>★ 5-Star Rated</Text>
        </View>
        <View style={styles.paymentIcons}>
          {['Visa', 'Mastercard', 'JazzCash', 'EasyPaisa', 'COD'].map((method) => (
            <Text key={method} style={styles.payIcon}>
              {method}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.bottomBar}>
        <Text style={styles.copyright}>© 2026 Malik Wood-Fired Pizzeria</Text>
        <Text style={styles.copyright}>Crafted in Lahore with fire and love</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0a0a0a',
    padding: 20,
    marginTop: 20,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  newsletterSection: {
    marginBottom: 40,
    alignItems: 'center',
    paddingVertical: 20,
  },
  innerCircle: {
    color: '#FF5A24',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  newsletterTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  newsletterDesc: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
    maxWidth: 400,
  },
  subscribedMsg: {
    color: '#4CAF50',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 480,
    flexDirection: 'row',
  },
  inputContainerMobile: {
    flexDirection: 'column',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    padding: 14,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    fontSize: 16,
  },
  subscribeBtn: {
    backgroundColor: '#FF5A24',
    paddingHorizontal: 24,
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: 14,
  },
  subscribeText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 40,
    gap: 20,
  },
  linksContainerMobile: {
    flexDirection: 'column',
  },
  linkColumn: {
    flex: 1,
    minWidth: 120,
  },
  linkColumnMobile: {
    marginBottom: 8,
  },
  columnTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  link: {
    color: '#888',
    fontSize: 14,
    marginBottom: 10,
  },
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 20,
  },
  copyright: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  trustLayer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#222',
    marginBottom: 20,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  badgesRowMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  trustBadge: {
    color: '#4caf50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  paymentIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  payIcon: {
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Footer;
