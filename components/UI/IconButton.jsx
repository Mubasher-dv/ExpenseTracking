import { Pressable, View, StyleSheet } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const IconButton = ({icon, size, color, onpress}) => {
  return (
    <Pressable onPress={onpress} style={({pressed}) => pressed && styles.pressed}>
        <View style={styles.buttonContainer}>
            <MaterialIcons name={icon} size={size} color={color} />
        </View>
    </Pressable>
  )
}

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed:  {
        opacity: 0.75
    }
})