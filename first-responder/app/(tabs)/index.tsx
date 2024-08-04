import { StyleSheet, Platform, Text, View } from 'react-native';
import { useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ViewButton from '@/components/ViewButton';
import FireModelDisplay from '@/components/FireModelDisplay';

export default function HomeScreen() {

  const [fireList, setFireList] = useState([{ location: 'Fire 1', severity: 'Fire 1 severity' },
  { location: 'Fire 2', severity: 'Fire 2 severity' }]);

  const [showFireModel, setShowFireModel] = useState(false);

  const closeModel = () => {
    setShowFireModel(false);
}

  return (
    <View style={styles.container}>
      <FireModelDisplay isVisible={showFireModel} onClose={closeModel}>
        {/* A list of emoji component will go here */}
      </FireModelDisplay>
      <View style={styles.titleContainer}>
        <View style={{ flex: 0.5 }} />
        <Text style={styles.titleText}>Current Dispatches</Text>
      </View>
      <View style={styles.firesListContainer}>
        {fireList.map((fire, index) => (
          <View key={index} style={styles.fireContainer}>
            <View style={{ ...styles.fireTextContainer, flex: 1.3 }}>
              <Text style={{...styles.fireText, fontWeight: 'bold'}}>{fire.location}</Text>
              <Text style={styles.fireText}>{fire.severity}</Text>
            </View>
            <ViewButton setShowFire={setShowFireModel}/>
          </View>
        ))}
      </View>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e2dd',
  },
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
    marginTop: 8,
    flexDirection: 'column',
    gap: 8,
  },
  fireText: {
    fontSize: 18,
    fontFamily: 'Montserrat',
  },
});

export { styles };
