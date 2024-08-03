// import { styles } from '@/app/(tabs)/index';
import { ThemedText } from '@/components/ThemedText';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function ViewButton(props: { }) {
    return (
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
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