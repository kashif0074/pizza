import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TrackOrder from '../components/TrackOrder';

const TrackScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Live Tracking</Text>
        
        <TrackOrder />
        
        <View style={styles.riderContainer}>
          <View style={styles.riderAvatar}>
            <Text style={styles.avatarText}>AK</Text>
          </View>
          <View style={styles.riderInfo}>
            <Text style={styles.riderName}>Arslan Khan</Text>
            <Text style={styles.riderDetails}>Rider · ⭐ 4.9</Text>
          </View>
        </View>
        
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>"The dough is a living creature. We just guide it to the heat."</Text>
          <Text style={styles.quoteAuthor}>— Chef Malik, Founder</Text>
        </View>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  riderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  riderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF5A24',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  riderInfo: {
    flex: 1,
  },
  riderName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  riderDetails: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  quoteContainer: {
    padding: 24,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5A24',
    marginBottom: 40,
  },
  quoteText: {
    color: '#eee',
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 12,
  },
  quoteAuthor: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
  }
});

export default TrackScreen;
