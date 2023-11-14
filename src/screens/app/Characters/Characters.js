import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Modal, ScrollView } from 'react-native';
import { getCharacters } from './getCharacters ';
import { WebView } from 'react-native-webview';
import { colorPalette } from '../../../colorPalette';

const Characters = () => {
  const [heroes, setHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [limit, setlimit] = useState(20);
  const [totalCharacters, setTotalCharacters] = useState(0);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const { characters, total } = await getCharacters(searchTerm, limit);
        setHeroes(characters);
        setTotalCharacters(total);
      } catch (error) {
        console.error('Karakterleri alma hatası:', error);
        // Kullanıcıya hata bildirimi gösterme veya başka bir işlem ekleme
      }
    };

    fetchHeroes()
  }, [searchTerm, limit]);

  useEffect(() => {
    setlimit(20);
    setHeroes([]);
  }, [searchTerm]);

  const handleCharacterPress = (character) => {
    setSelectedCharacter(character);
    setModalVisible(true);
  };
  const handleEndReached = () => {
    // Sayfa numarasını artırarak daha fazla veri çek
    if (limit < 100) {
      setlimit((limit) => limit + 20);
    }
  };
  const closeModal = () => {
    setSelectedCharacter(null);
    setModalVisible(false);
  }
  const renderCharacter = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCharacterPress(item)}>
      <Image source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text numberOfLines={4}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Ara..."
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
          />
        </View>
        <View style={styles.totalCharactersContainer}>
          <Text style={styles.totalCharactersText}>Toplam Karakter Sayısı: {totalCharacters}</Text>
        </View>
        <FlatList
          data={heroes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCharacter}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
        />
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Image
                source={{ uri: `${selectedCharacter?.thumbnail.path}.${selectedCharacter?.thumbnail.extension}` }}
                style={styles.modalImage}
              />
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>

              <Text style={styles.modalName}>{selectedCharacter?.name}</Text>
              <Text style={styles.modalDescription}>{selectedCharacter?.description}</Text>

              <Text style={styles.modalSectionTitle}>Comics</Text>
              {selectedCharacter?.comics?.items.map((comic, index) => (
                <Text key={index}>{comic.name}</Text>
              ))}

              <Text style={styles.modalSectionTitle}>Stories</Text>
              {selectedCharacter?.stories?.items.map((story, index) => (
                <Text key={index}>{story.name}</Text>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colorPalette.primary,
    alignItems: 'center',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colorPalette.darker,
    borderRadius: 16,
    backgroundColor: colorPalette.background,
    padding: 8,
    marginRight: 10,
  },
  container: {
    paddingBottom: 45,
    backgroundColor: colorPalette.background,
  },
  card: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    backgroundColor: colorPalette.primary,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colorPalette.text,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colorPalette.background,
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 40,
    alignItems: 'center',
    backgroundColor: colorPalette.primary,
    borderRadius: 30,
    padding: 5,
  },
  closeButtonText: {
    color: colorPalette.text,
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colorPalette.text,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: colorPalette.text,
  },
  modalSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: colorPalette.text,
  },
  totalCharactersContainer: {
    backgroundColor: colorPalette.primary,
    padding: 5,
    borderBottomLeftRadius:16,
    borderBottomRightRadius:16,
    alignItems: 'center',
    marginBottom: 10,
  },
  totalCharactersText: {
    color: colorPalette.text,
    fontSize: 16,
  },
});
export default Characters;