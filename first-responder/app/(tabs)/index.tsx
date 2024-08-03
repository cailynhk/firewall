import { StyleSheet, Platform, Text, View } from 'react-native';
import { useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ViewButton from '@/components/ViewButton';

export default function HomeScreen() {

  const [fireList, setFireList] = useState([{ location: 'Fire 1', severity: 'Fire 1 severity' },
  { location: 'Fire 2', severity: 'Fire 2 description' }]);

  return (
    <View>
      <View style={styles.titleContainer}>
        <View style={{ flex: 0.5 }} />
        <Text style={styles.titleText}>Current Dispatches</Text>
      </View>
      <View style={styles.firesListContainer}>
        {fireList.map((fire, index) => (
          <View key={index} style={styles.fireContainer}>
            <View style={{...styles.fireTextContainer, flex:1.3}}>
              <ThemedText type="defaultSemiBold">{fire.location}</ThemedText>
              <ThemedText>{fire.severity}</ThemedText>
            </View>
            <ViewButton/>
          </View>
        ))}
      </View>
    </View>


  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 16,
    marginTop: Platform.OS === 'ios' ? 80 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  firesListContainer: {
    padding: 16,
    flexDirection: 'column',
    gap: 8,
  },
  fireContainer: {
    display: 'flex',
    padding: 16,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  fireTextContainer: {
    flexDirection: 'column',
    gap: 8,
  },
});

export { styles };
