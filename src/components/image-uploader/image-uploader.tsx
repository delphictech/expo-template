import React, { useState } from 'react';
// import { StyleSheet } from 'react-native';
import { Text, Box, Image, Actionsheet, Pressable, useDisclose } from 'native-base';
import { takePhoto, pickImage } from 'src/utils/upload-image';

export interface ImageArgProps {
    imageProp: string;
    stylingProps?: {
        bRadius?: number;
    };
    size?: 'lg' | 'xl' | '2xl';
}

export const ImageUploader: React.FC<ImageArgProps> = ({ stylingProps, imageProp, size }) => {
    // const { stylingProps, imageProp, size } = imageProps;

    const { isOpen, onOpen, onClose } = useDisclose();

    const [imageState, setImageState] = useState<string>();

    return (
        <Box alignItems="center" backgroundColor="blue.700">
            <Pressable mt={10} onPress={onOpen}>
                <Image
                    borderRadius={stylingProps ? stylingProps.bRadius : 0}
                    source={{
                        uri: imageProp,
                    }}
                    alt="Alternate Text"
                    size={stylingProps ? size : 'xl'}
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

ImageUploader.defaultProps = {
    stylingProps: {
        bRadius: 0,
    },
    size: 'xl',
};
