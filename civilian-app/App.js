import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, Platform, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const cameraRef = useRef(null);

  // Request permissions for camera and media library
  React.useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestPermissionsAsync();
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraStatus === 'granted' && mediaStatus === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedMedia(result.uri);
    }
  };

  const uploadMedia = async () => {
    // Implement your upload logic here
    alert('Upload functionality not yet implemented.');
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera or media library</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Camera App</Text>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={cameraType} ref={cameraRef} />
      </View>
      <Button title="Take Photo" onPress={takePicture} />
      <Button title="Pick Image" onPress={pickImage} />
      {capturedPhoto && <Image source={{ uri: capturedPhoto }} style={styles.image} />}
      {selectedMedia && <Image source={{ uri: selectedMedia }} style={styles.image} />}
      <Button title="Upload Media" onPress={uploadMedia} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cameraContainer: {
    width: '100%',
    height: 400,
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

