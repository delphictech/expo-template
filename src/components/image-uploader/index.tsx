import React from 'react';
import { Box, Actionsheet, Pressable, useDisclose, Avatar, IconButton, Icon } from 'native-base';
import { takePhoto, pickImage } from 'src/utils/upload-image';
import { PrivateUserData } from 'src/types';
import { InterfaceAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar/types';
import { MaterialIcons } from '@expo/vector-icons';

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
        <Box alignItems="center">
            <Pressable mt={10} onPress={onOpen}>
                <Avatar
                    backgroundColor="primary.500"
                    size="xl"
                    source={{
                        uri: imageProp || undefined,
                    }}
                    {...avatarParams}>
                    {`${user?.firstName?.at(0)?.toUpperCase()}${user?.lastName
                        ?.at(0)
                        ?.toUpperCase()}`}
                </Avatar>
                <IconButton
                    position="absolute"
                    alignSelf="flex-end"
                    bottom={0}
                    onPress={onOpen}
                    p={1.5}
                    size="md"
                    borderRadius="full"
                    bg="background.600:alpha.95"
                    icon={<Icon color="background.200" as={MaterialIcons} name="camera-alt" />}
                />
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
        </Box>
    );
};

ImageUploader.defaultProps = {
    imageProp: undefined,
    user: undefined,
};
