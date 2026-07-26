import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, useWindowDimensions } from 'react-native';

const ContactScreen = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill out all fields.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>Questions, catering, or just want to say hi? We're here.</Text>

      {submitted ? (
        <View style={styles.successMessage}>
          <Text style={styles.successTitle}>Thanks for reaching out!</Text>
          <Text style={styles.successText}>
            We'll get back to you faster than our 900° oven cooks a pizza.
          </Text>
        </View>
      ) : (
        <View style={styles.formContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your Message"
            placeholderTextColor="#888"
            multiline
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.locationsTitle}>Our Hearths</Text>
        <View style={[styles.locationsRow, isMobile && styles.locationsMobile]}>
          <View style={styles.locationCard}>
            <Text style={styles.locationName}>Gulberg Flagship</Text>
            <Text style={styles.locationAddress}>MM Alam Road, Gulberg III, Lahore</Text>
            <Text style={styles.locationTime}>Open 12:00 PM — 2:00 AM</Text>
          </View>
  
          <View style={styles.locationCard}>
            <Text style={styles.locationName}>DHA Phase 6</Text>
            <Text style={styles.locationAddress}>Commercial Broadway, Lahore</Text>
            <Text style={styles.locationTime}>Open 12:00 PM — 1:00 AM</Text>
          </View>
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
    marginBottom: 8,
  },
  subtitle: {
    color: '#888',
    fontSize: 15,
    marginBottom: 24,
  },
  formContainer: {
    marginBottom: 40,
  },
  errorText: {
    color: '#ff6b6b',
    marginBottom: 12,
    fontSize: 14,
  },
  successMessage: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    padding: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    marginBottom: 40,
  },
  successTitle: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  successText: {
    color: '#ccc',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: '#FF5A24',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  locationsMobile: {
    flexDirection: 'column',
  },
  locationsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    width: '100%',
  },
  locationCard: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5A24',
    flex: 1,
  },
  locationName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationAddress: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  locationTime: {
    color: '#FF5A24',
    fontSize: 14,
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default ContactScreen;
