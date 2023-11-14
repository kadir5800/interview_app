import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colorPalette } from '../../../colorPalette';
import { getCharacters } from '../Characters/getCharacters ';

const PieChartScreen = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
        try {
          const { characters } = await getCharacters('', 100);
      
          characters.sort((a, b) => b.events.available - a.events.available);
      
          const topCharacters = characters.slice(0, 5);
      
          // En yüksek etkinlik sayısına sahip karakterin etkinlik sayısını al
          const maxEvents = topCharacters[0].events.available;
          // Etkinlik sayılarını orantıla ve random renk ata
          const eventData = topCharacters.map((character, index) => ({
            name: character.name,
            events: Math.round((character.events.available / maxEvents) * 100),
            color: getRandomColor(index),
          }));
      
          setEventData(eventData);
        } catch (error) {
          console.error('Karakterleri alma hatası:', error);
        }
      };

    fetchHeroes();
  }, []);

  const getRandomColor = () => {
    // Random renk oluşturma
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderSlices = () => {
    let cumulativePercentage = 0;
    const radius = 100; // Pie chart radius
    const centerX = 100; // X coordinate of the center
    const centerY = 100; // Y coordinate of the center
  
    return eventData.map((data, index) => {
      const slicePercentage = data.events;
      const sliceColor = data.color;
  
      const startAngle = (cumulativePercentage / 100) * 360;
      const endAngle = ((cumulativePercentage + slicePercentage) / 100) * 360;
  
      const startRadians = (startAngle - 90) * (Math.PI / 180);
      const endRadians = (endAngle - 90) * (Math.PI / 180);
  
      const x1 = centerX + radius * Math.cos(startRadians);
      const y1 = centerY + radius * Math.sin(startRadians);
  
      const x2 = centerX + radius * Math.cos(endRadians);
      const y2 = centerY + radius * Math.sin(endRadians);
  
      cumulativePercentage += slicePercentage;
  
      return (
        <View key={index} style={{ position: 'absolute', width: 200, height: 200 }}>
          <View
            style={{
              position: 'absolute',
              backgroundColor: sliceColor,
              borderTopLeftRadius: 100,
              borderTopRightRadius: 100,
              width: 200,
              height: 100,
              transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: `${startAngle}deg` }],
              overflow: 'hidden',
            }}
          />
          <View
            style={{
              position: 'absolute',
              backgroundColor: sliceColor,
              borderBottomLeftRadius: 100,
              borderBottomRightRadius: 100,
              width: 200,
              height: 100,
              transform: [{ translateX: 0 }, { translateY: 100 }, { rotate: `${startAngle}deg` }],
              overflow: 'hidden',
            }}
          />
          <Text
            style={{
              position: 'absolute',
              top: 80,
              left: 80,
              transform: [{ rotate: `${startAngle + slicePercentage / 2}deg` }],
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {data.name}
          </Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Events Pie Chart</Text>
      <View style={styles.pieContainer}>{renderSlices()}</View>
      <View style={styles.labelContainer}>
        {eventData.map((data, index) => (
          <Text key={index} style={[styles.label, { color: data.color }]}>
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
  pieContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    textAlign: 'center',
  },
});

export default PieChartScreen;
