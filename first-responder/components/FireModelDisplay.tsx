import { styles } from "@/app/(tabs)";
import { ThemedText } from "@/components/ThemedText";
import { Modal, View, Pressable, StyleSheet, Text, Button } from "react-native";
import FireModelViewer from "./FireModelViewer";
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';

export default function FireModelDisplay(props: { isVisible: Boolean, onClose: () => void }) {

    const viewer = new GaussianSplats3D.Viewer({
        'cameraUp': [0, -1, -0.6],
        'initialCameraPosition': [-1, -4, 6],
        'initialCameraLookAt': [0, 4, 0]
    });
    viewer.addSplatScene('../data/point_cloud.ply', {
        'splatAlphaRemovalThreshold': 5,
        'showLoadingUI': true,
        'position': [0, 1, 0],
        'rotation': [0, 0, 0, 1],
        'scale': [1.5, 1.5, 1.5]
    })
    .then(() => {
        viewer.start();
    });
        
    return (
        <Modal visible={props.isVisible}>
            <View>
                <Text style={styles.titleContainer}>RRAAAHHHH FIRREEEE!!</Text>
                
                <GaussianSplats3D.ViewerComponent viewer={viewer} />
                
                <View style={buttonStyles.buttonContainer}>
                    <Pressable style={buttonStyles.button} onPress={props.onClose}>
                        <ThemedText type="default">Close</ThemedText>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const buttonStyles = StyleSheet.create({
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