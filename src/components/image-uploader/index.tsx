import React, { useState, useEffect } from 'react';
import { Text, Box, Image, Actionsheet, Pressable, useDisclose } from 'native-base';
import { takePhoto, pickImage } from 'src/utils/upload-image';

export interface ImageArgProps {
    imageProp: string;
    setImageState: React.Dispatch<React.SetStateAction<string | undefined>>;
    stylingProps?: {
        bRadius?: number;
    };
    size?: 'lg' | 'xl' | '2xl';
}

export const ImageUploader: React.FC<ImageArgProps> = ({
    stylingProps,
    imageProp,
    size,
    setImageState,
}) => {
    // const [newState, setNewState] = useState<string>();
    // useEffect(() => {
    //     setNewState(imageProp);
    // }, [imageProp]);

    useEffect(() => {
        setImageState(imageProp);
    }, []);
    useEffect(() => {
        setImageState(imageProp);
    }, [imageProp]);
    // const { stylingProps, imageProp, size } = imageProps;

    const { isOpen, onOpen, onClose } = useDisclose();

    // const [imageState, setImageStates] = useState<string>();

    return (
        <Box alignItems="center" backgroundColor="blue.700">
            <Pressable mt={10} onPress={onOpen}>
                <Image
                    borderRadius={stylingProps?.bRadius}
                    source={{
                        uri: imageProp,
                    }}
                    alt="Alternate Text"
                    size={size}
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

            {imageProp && <Text>{imageProp}</Text>}
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
