import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Box, Image, Actionsheet, Button, Pressable, useDisclose } from 'native-base';
import { takePhoto, pickImage } from 'src/utils/upload-image';

export const ImageUploader: React.FC<any> = ({ props, otherprops }) => {
    const { isOpen, onOpen, onClose } = useDisclose();

    const [imageState, setImageState] = useState<string>();

    return (
        <Box flex={1} alignItems="center" backgroundColor={'blue.700'}>
            <Text style={styles.red} color={'red.500'}>
                {props}
            </Text>
            <Text>{otherprops}</Text>
            <Pressable onPress={onOpen}>
                <Image
                    borderRadius={20}
                    source={{
                        uri: 'https://wallpaperaccess.com/full/317501.jpg',
                    }}
                    alt="Alternate Text"
                    size="xl"
                />
            </Pressable>
            {/* <Button>Actionsheet</Button> */}

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Actionsheet.Item onPress={() => takePhoto(setImageState)}>
                        Upload Image
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={() => pickImage(setImageState)}>
                        Take Image
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>

            {imageState && <Text>{imageState}</Text>}
        </Box>
    );
};

const styles = StyleSheet.create({
    image: {
        // height: 100,
        // width: 'fit-content',
    },
    container: {
        marginTop: 50,
    },
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
});
