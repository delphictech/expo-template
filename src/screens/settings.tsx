import React, { useState, useEffect } from 'react';
import { Button, Text, Box } from 'native-base';
import { ImageUploader } from 'src/components/image-uploader';
import { FormInput } from 'src/components/form-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema } from 'src/utils/schemas';
import { useGetUserImageQuery, useUpdateUserFieldMutation } from 'src/services/user-api';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { ImageOBJ } from 'src/types/profile-image';

export interface EditProfileProps {}

export const SettingsScreen: React.FC<EditProfileProps> = () => {
    const user = useAppSelector((state) => state.user);
    const [imageState, setImageState] = useState<string>();
    const [queryState, setQueryState] = useState<ImageOBJ>({
        userID: user.id,
        imageUri: undefined,
    });

    const [triggerUpdateUser, { data: userData }] = useUpdateUserFieldMutation();

    // For more items that be destructured  https://redux-toolkit.js.org/rtk-query/usage/queries
    const { data, isFetching, isLoading, isError, error, refetch } =
        useGetUserImageQuery(queryState);

    // For more items that be destructured  https://react-hook-form.com/api/useform
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editProfileSchema),
    });

    useEffect(() => {
        refetch();
    }, [data]);

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
        // triggerUpdateUser()
        const userObject = {
            id: user.id,
            isAnonymous: user.isAnonymous,
            emailVerified: user.emailVerified,
            loggedIn: user.loggedIn,
        };

        for (const items in e) {
            if (e[items] !== '') {
                userObject[items] = e[items];
            }
        }

        // await triggerUpdateUser(userObject);
        console.log(user);
    };

    if (isLoading || isFetching) {
        return <Text>Loading</Text>;
    }

    if (isError) {
        return <Text>{error}</Text>;
    }

    return (
        <Box px={5}>
            <ImageUploader setImageState={setImageState} imageProp={data} user={user} />
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
            <Button my={3}>Change password</Button>
        </Box>
    );
};
