import { Text, TouchableOpacity, View } from 'react-native';

import React from 'react';

const Home = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ColorPalette');
        }}>
        <Text>Solarized</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
