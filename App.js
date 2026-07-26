import React, { useRef } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MarqueeBar from './src/components/MarqueeBar';
import Navbar from './src/components/Navbar';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import CustomizationSection from './src/components/CustomizationSection';
import TrackScreen from './src/screens/TrackScreen';
import StoryScreen from './src/screens/StoryScreen';
import ReviewsSection from './src/components/ReviewsSection';
import ContactScreen from './src/screens/ContactScreen';
import CartScreen from './src/screens/CartScreen';
import Footer from './src/components/Footer';

import { CartProvider } from './src/context/CartContext';

export default function App() {
  const scrollViewRef = useRef(null);
  const sectionYOffsets = useRef({});

  const handleLayout = (sectionName, event) => {
    sectionYOffsets.current[sectionName] = event.nativeEvent.layout.y;
  };

  const scrollToSection = (sectionName) => {
    const offset = sectionYOffsets.current[sectionName];
    if (scrollViewRef.current && offset !== undefined) {
      scrollViewRef.current.scrollTo({ y: offset, animated: true });
    }
  };

  return (
    <SafeAreaProvider>
      <CartProvider>
        <View style={styles.mainContainer}>
          <StatusBar style="light" />
          <MarqueeBar />
          <Navbar onNavigate={scrollToSection} />

          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            {...(Platform.OS === 'web' ? { nestedScrollEnabled: true } : {})}
          >
            <View onLayout={(e) => handleLayout('home', e)}>
              <HomeScreen onScrollToMenu={() => scrollToSection('menu')} />
            </View>

            <View onLayout={(e) => handleLayout('menu', e)}>
              <MenuScreen />
            </View>

            <View onLayout={(e) => handleLayout('deals', e)}>
              <CustomizationSection />
            </View>

            <View onLayout={(e) => handleLayout('cart', e)}>
              <CartScreen />
            </View>

            <View onLayout={(e) => handleLayout('track', e)}>
              <TrackScreen />
            </View>

            <View onLayout={(e) => handleLayout('story', e)}>
              <StoryScreen />
            </View>

            <ReviewsSection />

            <View onLayout={(e) => handleLayout('contact', e)}>
              <ContactScreen />
            </View>

            <Footer onNavigate={scrollToSection} />
          </ScrollView>
        </View>
      </CartProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#111111',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
