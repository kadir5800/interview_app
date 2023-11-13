import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView, TextInput } from 'react-native';
import { getAllSeries } from './getAllSeries';
import RNPickerSelect from 'react-native-picker-select';

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
    const sortingOptions = [
        { label: 'İsim  A-Z', value: 'title' },
        { label: 'Değiştirilme A-Z', value: 'modified' },
        { label: 'Başlangıç Yılı A-Z', value: 'startYear' },
        { label: 'İsim', value: '-title' },
        { label: 'Değiştirilme Z-A', value: '-modified' },
        { label: 'Başlangıç Yılı Z-A', value: '-startYear' },
    ];

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
                        style={{ style: styles.picker }}
                        placeholder={{ label: 'Sıralam ', value: null }}
                        items={sortingOptions.map(option => ({ label: option.label, value: option.value }))}
                        onValueChange={(itemValue) => setSortingOption(itemValue)}
                    />
                </View>
            </View>
            <View style={styles.totalCharactersContainer}>
                <Text style={styles.totalCharactersText}>Toplam Seri Sayısı: {totalSeries}</Text>
            </View>
            <FlatList
                data={seriesData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderSeries}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
            />

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
                    <View style={styles.container2}>

                        <Text style={styles.seriesName}>{selectedSeries?.title}</Text>
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
    },
    container2: {
        marginTop:40,
    },
    selectView: {
        backgroundColor: 'white',
        borderRadius: 8,
        height: 45,
        width: 120,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        width: 120,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 8,
        marginRight: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#71bdb8',
        alignItems: 'center',
        padding: 10,
    },
    seriesItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
    },
    seriesName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    seriesDescription: {
        fontSize: 14,
        color: 'gray',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 40,
        alignItems: 'center',
        backgroundColor: '#71bdb8',
        borderRadius: 30,
        padding: 5,
    },
    closeButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalCharactersContainer: {
        backgroundColor: '#71bdb8',
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    totalCharactersText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Series;
