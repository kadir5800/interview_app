import React, { Component } from 'react'
import { Text, View } from 'react-native'
import LineChartScreen from './LineChartScreen';
import PieChartScreen from './PieChartScreen';

const Statistics = () => {
    return (
        <View style={{flex:1,}}>
            <LineChartScreen  />
            <PieChartScreen  />
        </View>
    );
}
export default Statistics;