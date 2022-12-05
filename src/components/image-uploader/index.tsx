import React from 'react';
import { Box, Actionsheet, Pressable, useDisclose, Avatar, IconButton, Icon } from 'native-base';
import { takePhoto, pickImage } from 'src/utils/upload-image';
import { PrivateUserData } from 'src/types';
import { InterfaceAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar/types';
import { MaterialIcons } from '@expo/vector-icons';

export interface ImageArgProps extends InterfaceAvatarProps {
    uri?: string | null;
    // setImageState: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleImageUri: (uri: string | undefined) => void;
    user?: PrivateUserData;
}

export const ImageUploader: React.FC<ImageArgProps> = ({
    uri,
    handleImageUri,
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
                        uri: uri || undefined,
                    }}
                    {...avatarParams}>
                    {user?.firstName?.length &&
                        user?.lastName?.length &&
                        `${user?.firstName[0]?.toUpperCase()}${user?.lastName[0]?.toUpperCase()}`}
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
                    <Actionsheet.Item
                        startIcon={<Icon size={6} as={MaterialIcons} name="linked-camera" />}
                        onPress={async () => {
                            handleImageUri(await takePhoto());
                            onClose();
                        }}>
                        Take Photo
                    </Actionsheet.Item>
                    <Actionsheet.Item
                        startIcon={<Icon size={6} as={MaterialIcons} name="file-upload" />}
                        onPress={async () => {
                            handleImageUri(await pickImage());
                            onClose();
                        }}>
                        Upload Image
                    </Actionsheet.Item>
                    <Actionsheet.Item
                        startIcon={<Icon size={6} as={MaterialIcons} name="cancel" />}
                        onPress={onClose}>
                        Cancel
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    );
};

ImageUploader.defaultProps = {
    uri: undefined,
    user: undefined,
};
