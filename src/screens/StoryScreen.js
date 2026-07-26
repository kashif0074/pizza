import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import LocationCard from '../components/LocationCard';

const locationsData = [
  { id: '1', name: 'Gulberg Flagship', address: 'MM Alam Rd, Gulberg III, Lahore', phone: '+92 300 1234567', hours: '12:00 PM — 2:00 AM' },
  { id: '2', name: 'DHA Phase 6', address: 'Commercial Broadway, Lahore', phone: '+92 300 2345678', hours: '12:00 PM — 1:00 AM' },
  { id: '3', name: 'F-7 Markaz', address: 'Jinnah Super, Islamabad', phone: '+92 300 3456789', hours: '12:00 PM — 2:00 AM' },
  { id: '4', name: 'Clifton Block 5', address: 'Khayaban-e-Ittehad, Karachi', phone: '+92 300 4567890', hours: '12:00 PM — 3:00 AM' },
];

const StoryScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BORN FROM THE EMBERS</Text>
        <Text style={styles.subtitle}>Our story starts in 1994</Text>
      </View>
      
      <ImageBackground 
        source={require('../../assets/chef_malik.jpg')}
        style={styles.heroImage}
      >
        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>"The dough is a living creature. We just guide it to the heat."</Text>
          <Text style={styles.quoteAuthor}>— Chef Malik</Text>
        </View>
      </ImageBackground>

      <View style={styles.timelineContainer}>
        <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <Text style={styles.year}>1994</Text>
          <Text style={styles.timelineTitle}>The First Ember</Text>
          <Text style={styles.timelineText}>A hand-built brick oven in a Lahore garage. One recipe, three tables.</Text>
        </View>
        
        <View style={styles.counterBox}>
          <Text style={styles.counterValue}>1.2M+</Text>
          <Text style={styles.counterLabel}>Pizzas Fired</Text>
        </View>
        
        <View style={styles.timelineItem}>
          <Text style={styles.year}>2008</Text>
          <Text style={styles.timelineTitle}>The Flagship</Text>
          <Text style={styles.timelineText}>MM Alam Road opens. The first proper temple to dough.</Text>
        </View>
        <View style={styles.timelineItem}>
          <Text style={styles.year}>2018</Text>
          <Text style={styles.timelineTitle}>The Expansion</Text>
          <Text style={styles.timelineText}>Islamabad and Karachi join the family. Same fire, wider reach.</Text>
        </View>
        <View style={styles.timelineItem}>
          <Text style={styles.year}>2024</Text>
          <Text style={styles.timelineTitle}>Modern Fire</Text>
          <Text style={styles.timelineText}>Live tracking, digital ritual — but the oven still burns oak.</Text>
        </View>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Find your hearth</Text>
      <View style={styles.locationsContainer}>
        {locationsData.map((loc) => (
          <LocationCard 
            key={loc.id}
            name={loc.name}
            address={loc.address}
            phone={loc.phone}
            hours={loc.hours}
          />
        ))}
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
  header: {
    paddingVertical: 20,
    backgroundColor: '#111111',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 8,
  },
  heroImage: {
    width: '100%',
    height: 350,
    justifyContent: 'flex-end',
  },
  quoteBox: {
    backgroundColor: '#FF5A24',
    padding: 24,
    width: '85%',
    borderTopRightRadius: 16,
  },
  quoteText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    lineHeight: 28,
  },
  quoteAuthor: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  timelineContainer: {
    padding: 20,
    marginTop: 20,
  },
  timeline: {
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#333',
    marginLeft: 10,
  },
  timelineItem: {
    marginBottom: 24,
    paddingLeft: 20,
    position: 'relative',
  },
  year: {
    color: '#FF5A24',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 8,
  },
  timelineTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  timelineText: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 20,
  },
  counterBox: {
    backgroundColor: '#FF5A24',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    marginLeft: 20,
    alignItems: 'center',
  },
  counterValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  counterLabel: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  locationsContainer: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  footerSpacer: {
    height: 40,
  }
});

export default StoryScreen;
