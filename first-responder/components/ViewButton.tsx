// import { styles } from '@/app/(tabs)/index';
import { ThemedText } from '@/components/ThemedText';
import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';
import { Link } from 'expo-router';
import FireModelDisplay from './FireModelDisplay';
import { router } from 'expo-router';
import React from 'react';
import { useState } from 'react';

export default function ViewButton(props: { setShowFire: React.Dispatch<React.SetStateAction<boolean>> }) {

    const showModel = () => {
        props.setShowFire(true);
      }
      const closeModel = () => {
        props.setShowFire(false);
      }

    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={showModel}>
                <Text style={styles.buttonLabel}>{"View 3D Model"}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 170,
        height: 68,
        paddingHorizontal: 4,
        justifyContent: 'flex-end',
        alignSelf: 'flex-start',
        padding: 3,
        display: 'flex',
    },
    button: {
        borderRadius: 10,
        backgroundColor: '#a83260',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});