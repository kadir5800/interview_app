import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colorPalette } from '../../../colorPalette';
import { getCharacters } from '../Characters/getCharacters ';


const LineChartScreen = () => {
  const [popularityData, setPopularityData] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const { characters } = await getCharacters('', 100);

        characters.sort((a, b) => b.comics.available - a.comics.available);

        const topCharacters = characters.slice(0, 10);

        // En yüksek popülerliğe sahip karakterin popularity değerini al
        const maxPopularity = topCharacters[0].comics.available;

        // Popülerlik değerlerini orantıla
        const popularityData = topCharacters.map((character) => ({
          name: character.name,
          popularity: Math.round((character.comics.available / maxPopularity) * 100),
        }));

        setPopularityData(popularityData);
      } catch (error) {
        console.error('Karakterleri alma hatası:', error);
      }
    };

    fetchHeroes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Popularity Chart</Text>
      <View style={styles.chartContainer}>
        {popularityData.map((data, index) => (
          <View key={index} style={[styles.bar, { height: data.popularity }]} />
        ))}
      </View>
      <View style={styles.labelContainer}>
        {popularityData.map((data, index) => (
          <Text key={index} style={styles.label}>
            {data.name}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colorPalette.background,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colorPalette.text,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    marginBottom: 16,
  },
  bar: {
    flex: 1,
    backgroundColor: colorPalette.primary,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    textAlign: 'center',
    color: colorPalette.text,
  },
});

export default LineChartScreen;
