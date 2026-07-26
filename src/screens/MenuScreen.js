import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import MenuItem from '../components/MenuItem';

const menuData = [
  {
    id: '1',
    name: 'Original Margherita',
    price: 'PKR 1,450',
    category: 'Classic',
    ingredients: 'San Marzano, buffalo mozzarella, fresh basil, EVOO',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '2',
    name: 'Bee Sting',
    price: 'PKR 1,850',
    category: 'Premium',
    ingredients: 'Double pepperoni, hot honey, Calabrian chili, smoked mozz',
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '3',
    name: 'Funghi Misti',
    price: 'PKR 1,650',
    category: 'Premium',
    ingredients: 'Wild mushrooms, truffle oil, fontina, thyme',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '4',
    name: 'Smoky Orchard',
    price: 'PKR 1,750',
    category: 'BBQ Series',
    ingredients: 'Applewood chicken, house BBQ, red onion, cilantro',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '5',
    name: 'Quattro Formaggi',
    price: 'PKR 1,950',
    category: 'Premium',
    ingredients: 'Mozzarella, gorgonzola, parmesan, ricotta, black pepper',
    imageUrl: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '6',
    name: 'Hearth Margherita',
    price: 'PKR 1,350',
    category: 'Classic',
    ingredients: 'Classic tomato, mozzarella, basil, charred crust',
    imageUrl: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '7',
    name: 'Garlic Bread',
    price: 'PKR 450',
    category: 'Sides',
    ingredients: 'Wood-fired flatbread, garlic butter, parsley, sea salt',
    imageUrl: 'https://images.unsplash.com/photo-1619535628914-1482d703a4d2?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '8',
    name: 'Fire Wings',
    price: 'PKR 850',
    category: 'Sides',
    ingredients: 'Crispy wings, house hot sauce, ranch dip',
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '9',
    name: 'Fresh Lemonade',
    price: 'PKR 350',
    category: 'Drinks',
    ingredients: 'Fresh-squeezed lemons, mint, sparkling water',
    imageUrl: 'https://images.unsplash.com/photo-1523677011781-c91b1a2f1b42?auto=format&fit=crop&w=500&q=80',
  },
];

const categories = ['All', 'Classic', 'BBQ Series', 'Premium', 'Sides', 'Drinks'];

const MenuScreen = () => {
  const { width } = useWindowDimensions();
  const [activeCategory, setActiveCategory] = useState('All');

  let itemWidth = '100%';
  if (width >= 1024) itemWidth = '33.33%';
  else if (width >= 768) itemWidth = '50%';

  const filteredData =
    activeCategory === 'All'
      ? menuData
      : menuData.filter((item) => item.category === activeCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Menu</Text>
      <Text style={styles.subtitle}>
        Tap a pizza for nutritional details. Every layer, your call.
      </Text>

      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterBtn, activeCategory === cat && styles.activeFilterBtn]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.filterText, activeCategory === cat && styles.activeFilterText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {filteredData.length === 0 ? (
        <Text style={styles.emptyText}>No items in this category yet.</Text>
      ) : (
        <View style={styles.gridContainer}>
          {filteredData.map((item) => (
            <View key={item.id} style={[styles.gridItem, { width: itemWidth }]}>
              <MenuItem
                name={item.name}
                price={item.price}
                ingredients={item.ingredients}
                imageUrl={item.imageUrl}
              />
            </View>
          ))}
        </View>
      )}
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  gridItem: {
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginHorizontal: 16,
    alignSelf: 'center',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: 5,
    alignSelf: 'center',
    textAlign: 'center',
    maxWidth: 500,
  },
  filtersWrapper: {
    marginBottom: 20,
    alignSelf: 'center',
    maxWidth: '100%',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 10,
  },
  filterBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
  },
  activeFilterBtn: {
    backgroundColor: '#FF5A24',
    borderColor: '#FF5A24',
  },
  filterText: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#fff',
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 40,
  },
});

export default MenuScreen;
