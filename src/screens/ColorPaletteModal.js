import {
  Alert,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';

import { COLORS } from '../constants/colors';
import ColorBox from '../components/ColorBox';

const ColorPaletteModal = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  const handleSubmit = useCallback(() => {
    if (!name) {
      Alert.alert('Please enter a palette name');
    } else if (selectedColors.length < 3) {
      Alert.alert('Please select at least three colors');
    } else {
      const newColorPalette = {
        paletteName: name,
        colors: selectedColors,
      };
      navigation.navigate('Home', { newColorPalette });
    }
  }, [name, navigation, selectedColors]);

  const handleSwitchValue = useCallback((value, color) => {
    if (value) {
      setSelectedColors((colors) => [...colors, color]);
    } else {
      setSelectedColors((colors) =>
        colors.filter(
          (selectedColor) => selectedColor.colorName !== color.colorName,
        ),
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Name of the palette</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Palette name"
      />
      <FlatList
        data={COLORS}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <View style={styles.color}>
            <Text>{item.colorName}</Text>
            <View style={styles.colorPreview}>
              <ColorBox hexCode={item.hexCode} boxStyle={styles.colorBox} />
              <Switch
                value={
                  !!selectedColors.find(
                    (color) => color.colorName === item.colorName,
                  )
                }
                onValueChange={(selected) => {
                  handleSwitchValue(selected, item);
                }}
              />
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  button: {
    height: 40,
    backgroundColor: 'teal',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    marginBottom: 10,
  },
  color: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  colorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBox: {
    marginRight: 20,
  },
});

export default ColorPaletteModal;
