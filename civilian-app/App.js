import { StyleSheet, Text, View, Button, SafeAreaView, ActivityIndicator } from 'react-native';
import { useState, useRef } from 'react';
import { Video } from 'expo-av';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from 'firebase/analytics';

import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID, MONGO_CRE } from '@env';

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, requestCameraPermission] = useCameraPermissions();
  const [hasMicrophonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [hasMediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState(false); // Loading state for geolocation

 
  const uploadFileFromURI = async (video) => {
    if (!video?.uri) {
      console.error("File DNE");
      return;
    }

    // Firebase configuration
    const firebaseConfig = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID,
      appId: APP_ID,
      measurementId: MEASUREMENT_ID
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);
    const storage = getStorage(app);

    try {
      // Fetch video as a blob
      const response = await fetch(video.uri);
      const blob = await response.blob();

      // Create a reference to the file in Firebase Storage
      const videoRef = ref(storage, `video/${new Date().toISOString()}.mp4`);

      // Upload the blob to Firebase Storage
      await uploadBytes(videoRef, blob);

      // Get the download URL
      const url = await getDownloadURL(videoRef);
      return  url;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    return null;
  };
  

  if (!(hasCameraPermission && hasMicrophonePermission && hasMediaLibraryPermission)) {
    return <View />;
  }

  if (!hasCameraPermission.granted || !hasMicrophonePermission.granted || !hasMediaLibraryPermission) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        {!hasCameraPermission && <Button onPress={requestCameraPermission} title="Grant Camera Permission" />}
        {!hasMicrophonePermission && <Button onPress={requestMicrophonePermission} title="Grant Microphone Permission" />}
        {!hasMediaLibraryPermission && <Button onPress={requestMediaLibraryPermission} title="Grant Media Library Permission" />}
      </View>
    );
  }

  const recordVideo = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        const options = {
          maxDuration: 10,
        };
        const recordedVideo = await cameraRef.current.recordAsync(options);
        setLoading(true); // Start loading

        const coords = await getCoordinates(); // Get coordinates
        setLoading(false); // Stop loading

        setVideo({ uri: recordedVideo.uri, coords }); // Store video URI and coordinates
      } catch (error) {
        console.error('Failed to record video:', error);
      }
    } else {
      console.error('Camera reference is not set');
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try {
        await cameraRef.current.stopRecording();
        setIsRecording(false);
      } catch (error) {
        console.error('Failed to stop video recording:', error);
      }
    } else {
      console.error('Cannot stop recording; camera reference is not set or not recording');
    }
  };

// Function to get coordinates
  const getCoordinates = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return null;
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    return coords; // Returns { latitude, longitude }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Fetching location...</Text>
      </View>
    );
  }

  if (video) {
    let uploadVideo = async () => {
      const url = await uploadFileFromURI(video);
      console.log('Video coordinates:', video.coords); // Access coordinates
      const longtidue = video.coords.longtitude
      const lattitude = video.coords.lattitude
      const downloadUrl = url
      const uploadVideo = async () => {
        const url = await uploadFileFromURI(video);
        console.log('Video coordinates:', video.coords); // Access coordinates
        const longitude = video.coords.longitude;
        const latitude = video.coords.latitude;
        const downloadUrl = url;

        // Send POST request to localhost:5000/add-fire
        try {
          const response = await fetch('http://localhost:5000/add-fire', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              latitude,
              longitude,
              download_url: downloadUrl,
            }),
          });

          if (response.ok) {
            console.log('Fire added successfully');
          } else {
            console.error('Failed to add fire');
          }
        } catch (error) {
          console.error('Error sending POST request:', error);
        }

        setVideo(null);
      };
      setVideo(null);  
    };

    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{ uri: video.uri }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
        <Button title="Upload" onPress={uploadVideo} />
        <Button title="Cancel" onPress={() => setVideo(null)} />
      </SafeAreaView>
    );
  }

  return (
    <CameraView style={styles.container} ref={cameraRef} mode="video">
      <View style={styles.buttonContainer}>
        <Button title={isRecording ? "Stop Recording" : "Record Video"} onPress={isRecording ? stopRecording : recordVideo} />
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end"
  },
  video: {
    flex: 1,
    alignSelf: "stretch"
  }
});