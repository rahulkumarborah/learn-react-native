import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';

import { COLORS } from './constants/colors';
import ColorBox from './components/ColorBox';
import React from 'react';

const App = () => {
  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        data={COLORS}
        keyExtractor={(item) => item.hexCode}
        renderItem={({ item }) => (
          <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
        )}
        ListHeaderComponent={<Text style={styles.heading}>Solarized</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default App;
