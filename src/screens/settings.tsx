/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Text, Box, FormControl, KeyboardAvoidingView, useToast } from 'native-base';
import { ImageUploader } from 'src/components/image-uploader';
import { FormInput } from 'src/components/form-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema } from 'src/utils/schemas';
import { useSetUserImageMutation, useUpdateUserFieldsMutation } from 'src/services/user-api';
import { useLazySendPasswordResetQuery } from 'src/services/auth-api';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { Keyboard, Platform } from 'react-native';
import { AlertToast } from 'src/components/alert-toast';
import { SettingStackParams } from 'src/navigation/settings-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

export interface EditProfileProps {}

type SettingScreenProps = StackNavigationProp<SettingStackParams, 'settings'>;

export const SettingsScreen: React.FC<EditProfileProps> = () => {
    const navigation = useNavigation<SettingScreenProps>();

    const initialUserData = useAppSelector((state) => state.user);

    // user image fields mutation
    const [
        updateUser,
        {
            data: user = initialUserData,
            isLoading: userLoading,
            isSuccess: userSuccess,
            error: userError,
        },
    ] = useUpdateUserFieldsMutation();

    // user image mutation
    const [setUserImage, { isLoading: imageLoading, isSuccess: imageSuccess, error: imageError }] =
        useSetUserImageMutation();

    // password reset query hook
    const [
        triggerPasswordReset,
        { isFetching: sendingEmail, isSuccess: emailSuccess, error: emailError },
    ] = useLazySendPasswordResetQuery();

    // declare toast
    const toast = useToast();

    // For more items that be destructured  https://react-hook-form.com/api/useform
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
    } = useForm({
        resolver: yupResolver(editProfileSchema),
        // Need these default values for dirty fields
        // defaultValues: {
        //     firstName: '',
        //     lastName: '',
        //     email: '',
        // },
    });

    // useEffect(() => {
    //     refetch();
    // }, [data, refetch]);

    // used for testing form validation
    // const handleSubmitF = async (e: any) => {
    //     console.log(e);

    //     const userObject: PrivateUserData = {
    //         id: user.id,
    //         isAnonymous: user.isAnonymous,
    //         emailVerified: user.emailVerified,
    //         loggedIn: user.loggedIn,
    //     };

    //     // console.log('dirty', dirtyFields.firstName);

    //     // Object.keys(e).forEach((items) => {
    //     //     if (e[items] !== '' || e[items] == null) {
    //     //         userObject[items] = e[items];
    //     //     }
    //     // });

    //     console.log(userObject);
    //     await triggerUpdateUser(userObject);
    // };

    const handleUserUpdate = () => {
        toast.show({
            placement: 'bottom',
            render: () => (
                <AlertToast
                    title={userSuccess ? 'Settings Updated' : 'Error with updating settings.'}
                    type={userSuccess ? 'success' : 'danger'}
                    message={
                        userSuccess
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
                    <FormInput
                        key="email"
                        name="email"
                        control={control}
                        isInvalid={'email' in errors}
                        label="Enter your email"
                        placeholder="Email"
                        defaultValue={user.email ? user.email : ''}
                        errorMessage={errors?.email?.message}
                    />
                    <Button
                        isLoading={isSubmitting}
                        isDisabled={!isDirty}
                        mt={8}
                        my={3}
                        onPress={handleSubmit(handleUserUpdate)}>
                        Save Changes
                    </Button>
                </FormControl>
                <Button
                    variant="ghost"
                    isLoading={sendingEmail}
                    my={3}
                    onPress={() => navigation.navigate('password')}>
                    Change Password
                </Button>
            </Box>
        </KeyboardAvoidingView>
    );
};
