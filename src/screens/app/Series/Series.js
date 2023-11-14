import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView, TextInput } from 'react-native';
import { getAllSeries } from './getAllSeries';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colorPalette } from '../../../colorPalette';

const Series = () => {
    const [seriesData, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [limit, setlimit] = useState(20);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalSeries, setTotalSeries] = useState(0);
    const [sortingOption, setSortingOption] = useState('title');


    useEffect(() => {
        const fetchAllSeries = async () => {
            try {
                const { seriesData, total } = await getAllSeries(searchTerm, limit, sortingOption);
                setSeries(seriesData);
                setTotalSeries(total);
                setLoading(false);
            } catch (error) {
                console.error('Series fetch error:', error);
                setLoading(false);
            }
        };

        fetchAllSeries();
    }, [searchTerm, limit, sortingOption]);
    useEffect(() => {
        setlimit(20);
        setSeries([]);
    }, [searchTerm]);

    const openSeriesModal = (seriesData) => {
        setSelectedSeries(seriesData);
    };
    const handleEndReached = () => {
        if (limit < 100) {
            setlimit((limit) => limit + 20);
        }
    };
    const closeSeriesModal = () => {
        setSelectedSeries(null);
    };

    const renderSeries = ({ item }) => (
        <TouchableOpacity
            style={styles.seriesItem}
            onPress={() => openSeriesModal(item)}
        >
            <Text style={styles.seriesName}>{item.title}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Ara..."
                    value={searchTerm}
                    onChangeText={text => setSearchTerm(text)}
                />
                <View style={styles.selectView}>
                    <RNPickerSelect
                        style={styles.picker}
                        placeholder={{ label: 'Sıralam ', value: null }}
                        items={[
                            { label: 'İsim  A-Z', value: 'title' },
                            { label: 'Değiştirilme A-Z', value: 'modified' },
                            { label: 'Başlangıç Yılı A-Z', value: 'startYear' },
                            { label: 'İsim', value: '-title' },
                            { label: 'Değiştirilme Z-A', value: '-modified' },
                            { label: 'Başlangıç Yılı Z-A', value: '-startYear' },
                        ]}
                        onValueChange={(itemValue) => setSortingOption(itemValue)}
                    />
                </View>
            </View>
            <View style={styles.totalSeriesContainer}>
                <Text style={styles.totalSeriesText}>Toplam Seri Sayısı: {totalSeries}</Text>
            </View>
            <SafeAreaView style={styles.flatListContainer} >
                <FlatList
                    data={seriesData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderSeries}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.1}
                />
            </SafeAreaView>
            <Modal
                visible={selectedSeries !== null}
                animationType="slide"
                transparent
                onRequestClose={closeSeriesModal}
            >
                <ScrollView style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeSeriesModal}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <View style={styles.modalContent}>
                        <Text style={styles.seriesTitle}>{selectedSeries?.title}</Text>
                        <Text style={styles.seriesDescription}>{selectedSeries?.description}</Text>
                        {/* Diğer detayları da buraya ekleyebilirsiniz */}
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorPalette.background,
    },
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
        backgroundColor: 'white',
        padding: 8,
        height: 40,
        marginRight: 10,
        color: colorPalette.text,
    },
    selectView: {
        backgroundColor: colorPalette.lighter,
        borderRadius: 16,
        borderColor: colorPalette.darker,
        height: 40,
        alignItems:'center',
        justifyContent:'center',
        width: 120,
        borderWidth: 1,
    },
    picker: {
        borderWidth: 1,
        borderColor: colorPalette.darker,
        padding: 8,
        width: 120,
        marginRight: 10,
        color: colorPalette.text,
    },
    totalSeriesContainer: {
        backgroundColor: colorPalette.primary,
        padding: 5,
        alignItems: 'center',
        borderBottomLeftRadius:16,
        borderBottomRightRadius:16,
    },
    totalSeriesText: {
        color: colorPalette.text,
        fontSize: 16,
    },
    flatListContainer: {
        flex: 1,
        backgroundColor: colorPalette.background,
    },
    seriesItem: {
        borderWidth: 1,
        borderColor: colorPalette.darker,
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 8,
        marginVertical: 8,
        backgroundColor: colorPalette.lighter,
    },
    seriesName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorPalette.text,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: colorPalette.background,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorPalette.primary,
        borderRadius: 20,
    },
    closeButtonText: {
        color: colorPalette.text,
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContent: {
        padding: 16,
        marginTop:40,
    },
    seriesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: colorPalette.text,
    },
    seriesDescription: {
        fontSize: 16,
        color: colorPalette.text,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Series;
