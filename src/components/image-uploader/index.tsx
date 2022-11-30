import React from 'react';
import { Text, Box, Image, Actionsheet, Pressable, useDisclose } from 'native-base';
import { takePhoto, pickImage } from 'src/utils/upload-image';
import { PrivateUserData } from 'src/types';

export interface ImageArgProps {
    imageProp: string | undefined | null;
    setImageState: React.Dispatch<React.SetStateAction<string | undefined>>;
    stylingProps?: {
        bRadius?: number;
    };
    size?: 'lg' | 'xl' | '2xl';
    user: PrivateUserData;
}

export const ImageUploader: React.FC<ImageArgProps> = ({
    stylingProps,
    imageProp,
    size,
    setImageState,
    user,
}) => {
    const { isOpen, onOpen, onClose } = useDisclose();

    return (
        <Box alignItems="center" backgroundColor="blue.700">
            <Pressable mt={10} onPress={onOpen}>
                {imageProp ? (
                    <Image
                        borderRadius={stylingProps?.bRadius}
                        source={{
                            uri: imageProp,
                        }}
                        alt="Alternate Text"
                        size={size}
                    />
                ) : (
                    <Image
                        borderRadius={stylingProps?.bRadius}
                        source={{
                            uri: `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&size=214`,
                        }}
                        alt="Alternate Text"
                        size={size}
                    />
                )}
            </Pressable>

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
