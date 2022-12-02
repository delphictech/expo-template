import React, { useState, useEffect } from 'react';
import { Button, Text, Box, FormControl, KeyboardAvoidingView, useToast } from 'native-base';
import { ImageUploader } from 'src/components/image-uploader';
import { FormInput } from 'src/components/form-input';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema } from 'src/utils/schemas';
import { useGetUserImageQuery, useUpdateUserFieldMutation } from 'src/services/user-api';
import { useLazySendPasswordResetQuery } from 'src/services/auth-api';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { ImageOBJ } from 'src/types/profile-image';
// Imports for navigation to password screen
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { SettingStackParams } from 'src/navigation/settings-stack';
import { Keyboard, Platform } from 'react-native';
import { AlertToast } from 'src/components/alert-toast';
import { PrivateUserData } from 'src/types/user';

export interface EditProfileProps {}

// type SettingScreenProps = StackNavigationProp<SettingStackParams, 'Setting-Screen'>;

export const SettingsScreen: React.FC<EditProfileProps> = () => {
    // const navigation = useNavigation<SettingScreenProps>();

    const user = useAppSelector((state) => state.user);
    const [imageState, setImageState] = useState<string>();
    const [queryState, setQueryState] = useState<ImageOBJ>({
        userID: user.id,
        imageUri: undefined,
    });

    const [triggerUpdateUser] = useUpdateUserFieldMutation();
    const [triggerPasswordReset, { isFetching: sendingEmail }] = useLazySendPasswordResetQuery();

    // For more items that be destructured  https://redux-toolkit.js.org/rtk-query/usage/queries
    const { data, isFetching, isLoading, isError, error, refetch } =
        useGetUserImageQuery(queryState);

    const toast = useToast();

    const renderPasswordToast = () => (
        <AlertToast
            title="Email Sent!"
            type="success"
            message={`Password reset instructions sent to ${user.email}.`}
            toExit={() => toast.close('resetToast')}
        />
    );

    // For more items that be destructured  https://react-hook-form.com/api/useform
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editProfileSchema),
        // Need these default values for dirty fields
        // defaultValues: {
        //     firstName: '',
        //     lastName: '',
        //     email: '',
        // },
    });

    // Setting up dirty fields
    // const { dirtyFields } = useFormState({
    //     control,
    // });

    useEffect(() => {
        refetch();
    }, [data, refetch]);

    useEffect(() => {
        const input = {
            userID: user.id,
            imageUri: imageState,
        };

        setQueryState(input);
    }, [imageState]);

    // used for testing form validation
    const handleSubmitF = async (e: any) => {
        console.log(e);

        const userObject: PrivateUserData = {
            id: user.id,
            isAnonymous: user.isAnonymous,
            emailVerified: user.emailVerified,
            loggedIn: user.loggedIn,
        };

        // console.log('dirty', dirtyFields.firstName);

        Object.keys(e).forEach((items) => {
            if (e[items] !== '' || e[items] == null) {
                userObject[items] = e[items];
            }
        });

        console.log(userObject);
        await triggerUpdateUser(userObject);
    };

    const handlePasswordReset = async () => {
        const { isSuccess } = await triggerPasswordReset(user.email);

        if (isSuccess) {
            toast.show({
                placement: 'bottom',
                render: renderPasswordToast,
                id: 'resetToast',
            });
        }
    };

    if (isLoading || isFetching) {
        return <Text>Loading</Text>;
    }

    if (isError) {
        return <Text>{error}</Text>;
    }

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
                    handleImageUri={(uri) => console.log(uri)}
                    imageProp={data}
                    user={user}
                />
                <FormControl>
                    <FormInput
                        key="firstName"
                        name="firstName"
                        control={control}
                        isInvalid={'firstName' in errors}
                        label="Enter your first name"
                        placeholder="first name"
                        defaultValue=""
                        errorMessage={errors?.firstName?.message}
                    />
                    <FormInput
                        key="lastName"
                        name="lastName"
                        control={control}
                        isInvalid={'lastName' in errors}
                        label="Enter your last name"
                        placeholder="last name"
                        defaultValue=""
                        errorMessage={errors?.lastName?.message}
                    />
                    <FormInput
                        key="email"
                        name="email"
                        control={control}
                        isInvalid={'email' in errors}
                        label="Enter your email"
                        placeholder="email"
                        defaultValue=""
                        errorMessage={errors?.email?.message}
                    />

                    <Button my={5} onPress={handleSubmit(handleSubmitF)}>
                        Save Changes
                    </Button>
                </FormControl>
                {/* <Button my={3} onPress={() => navigation.navigate('Setting-Pass-Screen')}>
                    Change password
                </Button> */}
                <Button isLoading={sendingEmail} my={3} onPress={() => handlePasswordReset()}>
                    Change password
                </Button>
            </Box>
        </KeyboardAvoidingView>
    );
};
