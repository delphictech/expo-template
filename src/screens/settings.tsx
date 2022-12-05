/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Button, Box, FormControl, KeyboardAvoidingView, useToast, Icon } from 'native-base';
import { ImageUploader } from 'src/components/image-uploader';
import { FormInput } from 'src/components/form-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema, EditProfileSchemaType } from 'src/utils/schemas';
import { useSetUserImageMutation, useUpdateUserFieldsMutation } from 'src/services/user-api';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { Keyboard, Platform } from 'react-native';
import { AlertToast } from 'src/components/alert-toast';
import { SettingStackParams } from 'src/navigation/settings-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

type SettingScreenProps = StackScreenProps<SettingStackParams, 'Settings'>;

export /**
 * Settings Screen, used for allowing users to change their information
 *
 * @param {*} { navigation }
 * @return {*}
 */
const SettingsScreen: React.FC<SettingScreenProps> = ({ navigation }) => {
    const initialUserData = useAppSelector((state) => state.user);

    // user image fields mutation
    const [updateUser, { data: user = initialUserData, isLoading: userLoading, error: userError }] =
        useUpdateUserFieldsMutation();

    // user image mutation
    const [setUserImage, { error: imageError }] = useSetUserImageMutation();

    // declare toast
    const toast = useToast();

    // For more items that be destructured  https://react-hook-form.com/api/useform
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<EditProfileSchemaType>({
        resolver: yupResolver(editProfileSchema),
    });

    const handleUserUpdate = async ({ firstName, lastName }: EditProfileSchemaType) => {
        const data = await updateUser({ id: user.id, firstName, lastName }).unwrap();
        toast.show({
            placement: 'bottom',
            render: () => (
                <AlertToast
                    title={data.id ? 'Settings Updated' : 'Error with updating settings.'}
                    type={data.id ? 'success' : 'danger'}
                    message={
                        data.id
                            ? 'Your settings have been updated successfully.'
                            : userError?.message
                    }
                    toExit={() => toast.close('user-toast')}
                />
            ),
            id: 'user-toast',
        });
    };

    const handleImageUpload = async (imageUri: string | undefined) => {
        if (imageUri) {
            const data = await setUserImage(imageUri).unwrap();
            toast.show({
                placement: 'bottom',
                render: () => (
                    <AlertToast
                        title={data.length ? 'Image Uploaded' : 'Error with image upload.'}
                        type={data.length ? 'success' : 'danger'}
                        message={
                            data.length
                                ? 'Your profile image has been successfull changed.'
                                : imageError?.message
                        }
                        toExit={() => toast.close('im-toast')}
                    />
                ),
                id: 'im-toast',
            });
        }
    };

    return (
        <KeyboardAvoidingView
            h={{
                lg: 'auto',
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            onTouchStart={() => Keyboard.dismiss()}
            w="100%">
            <Box px={5}>
                <ImageUploader
                    handleImageUri={(uri) => handleImageUpload(uri)}
                    uri={user.image}
                    user={user}
                />
                <FormControl>
                    <FormInput
                        key="firstName"
                        name="firstName"
                        control={control}
                        isInvalid={'firstName' in errors}
                        label="Enter your first name"
                        placeholder="First Name"
                        defaultValue={user.firstName ? user.firstName : ''}
                        errorMessage={errors?.firstName?.message}
                    />
                    <FormInput
                        key="lastName"
                        name="lastName"
                        control={control}
                        isInvalid={'lastName' in errors}
                        label="Enter your last name"
                        placeholder="Last Name"
                        defaultValue={user.lastName ? user.lastName : ''}
                        errorMessage={errors?.lastName?.message}
                    />
                    <Button
                        isLoading={isSubmitting || userLoading}
                        isDisabled={!isDirty}
                        mt={8}
                        my={3}
                        onPress={handleSubmit(handleUserUpdate)}>
                        Save Changes
                    </Button>
                </FormControl>
                <Button
                    variant="subtle"
                    my={2}
                    endIcon={<Icon as={MaterialIcons} name="arrow-forward-ios" />}
                    onPress={() => navigation.navigate('Password')}>
                    Change Password
                </Button>
                <Button
                    variant="subtle"
                    mb={7}
                    endIcon={<Icon as={MaterialIcons} name="arrow-forward-ios" />}
                    onPress={() => navigation.navigate('Email')}>
                    Change Email
                </Button>
                <Button
                    variant="ghost"
                    colorScheme="danger"
                    endIcon={<Icon as={MaterialIcons} name="arrow-forward-ios" />}
                    onPress={() => navigation.navigate('DeleteAccount')}>
                    Delete Account
                </Button>
            </Box>
        </KeyboardAvoidingView>
    );
};
