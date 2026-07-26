import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';

const reviewsData = [
  {
    id: '1',
    text: '"The crust is unreal. You can taste the wood smoke in every bite. Best pizza in Gulberg, hands down."',
    author: 'Ayesha K.',
    location: 'Lahore · Verified',
  },
  {
    id: '2',
    text: '"Ordered for a birthday party and everyone was floored. The Bee Sting is a religious experience."',
    author: 'Hamza R.',
    location: 'Islamabad · Verified',
  },
  {
    id: '3',
    text: '"The delivery tracking is next level — watched my rider the whole way. Pizza arrived hot and perfect."',
    author: 'Sara M.',
    location: 'Karachi · Verified',
  },
  {
    id: '4',
    text: '"I\'ve eaten pizza across three continents. Malik holds up. The sourdough fermentation shows."',
    author: 'Bilal A.',
    location: 'Lahore · Verified',
  },
];

const ReviewsSection = () => {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width * 0.85, 400);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>2,400+ reviews</Text>
      <Text style={styles.subheader}>What our customers are saying</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={cardWidth + 16}
        decelerationRate="fast"
      >
        {reviewsData.map((review) => (
          <View key={review.id} style={[styles.reviewCard, { width: cardWidth }]}>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text key={star} style={styles.star}>
                  ★
                </Text>
              ))}
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
            <Text style={styles.author}>{review.author}</Text>
            <Text style={styles.location}>{review.location}</Text>
          </View>
        ))}
      </ScrollView>
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subheader: {
    color: '#888',
    fontSize: 15,
    marginBottom: 20,
  },
  scrollContent: {
    paddingRight: 16,
  },
  reviewCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    marginRight: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5A24',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  star: {
    color: '#ffaa00',
    fontSize: 16,
    marginRight: 2,
  },
  reviewText: {
    color: '#eee',
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 12,
  },
  author: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
});

export default ReviewsSection;
