import React from 'react';
import { Text, Box, Actionsheet, Pressable, useDisclose, Avatar } from 'native-base';
import { takePhoto, pickImage } from 'src/utils/upload-image';
import { PrivateUserData } from 'src/types';
import { InterfaceAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar/types';

export interface ImageArgProps extends InterfaceAvatarProps {
    imageProp?: string | null;
    setImageState: React.Dispatch<React.SetStateAction<string | undefined>>;
    user?: PrivateUserData;
}

export const ImageUploader: React.FC<ImageArgProps> = ({
    imageProp,
    setImageState,
    user,
    ...avatarParams
}) => {
    const { isOpen, onOpen, onClose } = useDisclose();

    return (
        <Box alignItems="center" backgroundColor="blue.700">
            <Pressable mt={10} onPress={onOpen}>
                <Avatar
                    backgroundColor="primary.500"
                    source={{
                        uri: imageProp || undefined,
                    }}
                    {...avatarParams}>
                    {`${user?.firstName?.at(0)}${user?.lastName?.at(0)}`}
                </Avatar>
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
        </Box>
    );
};

ImageUploader.defaultProps = {
    imageProp: undefined,
    user: undefined,
};
