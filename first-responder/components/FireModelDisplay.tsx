import { styles } from "@/app/(tabs)";
import { ThemedText } from "@/components/ThemedText";
import { Modal, View, Pressable, StyleSheet, Text } from "react-native";

export default function FireModelDisplay(props: { isVisible: Boolean, onClose: () => void }) {
    return (
        <Modal visible={props.isVisible}>
            <View>
                <Text style={styles.titleContainer}>RRAAAHHHH FIRREEEE!!</Text>
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