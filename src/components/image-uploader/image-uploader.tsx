import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Box, Image, Actionsheet, Button, Pressable, useDisclose } from 'native-base';
import { takePhoto, pickImage } from 'src/utils/upload-image';
import { imageArgProps } from 'src/types/component/image-uploader';

export const ImageUploader: React.FC<imageArgProps> = (imageProps) => {
    const { isOpen, onOpen, onClose } = useDisclose();

    const [imageState, setImageState] = useState<string>();

    return (
        <Box alignItems="center" backgroundColor={'blue.700'} >

            {/* <Text style={styles.red} color={'red.500'}>
                {props}
            </Text>
            <Text>{otherprops}</Text> */}
            <Pressable mt={10} onPress={onOpen}>
                <Image
                    borderRadius={imageProps.stylingProps ? imageProps.stylingProps.bRadius : 0}
                    source={{
                        uri: imageProps.imageProp,
                    }}
                    alt="Alternate Text"
                    size={imageProps.stylingProps ? imageProps.size : 'xl'}
                />
            </Pressable>
            {/* <Button>Actionsheet</Button> */}

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Actionsheet.Item onPress={() => takePhoto(setImageState)}>
                        Take Photo
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={() => pickImage(setImageState)}>
                        Upload Image
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>

            {imageState && <Text>{imageState}</Text>}
            <Text>Hello World</Text>
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
