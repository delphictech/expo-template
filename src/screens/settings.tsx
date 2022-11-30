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
    const handleSubmitF = (e: any) => {
        console.warn(e);
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
                key="name"
                name="name"
                control={control}
                isInvalid={'name' in errors}
                label="Enter your name"
                placeholder="name"
                defaultValue=""
                errorMessage={errors?.name?.message}
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
            <FormInput
                key="password"
                name="password"
                control={control}
                isInvalid={'password' in errors}
                password
                label="Enter your password"
                placeholder="Password"
                defaultValue=""
                errorMessage={errors?.password?.message}
            />
            <Button my={5} onPress={handleSubmit(handleSubmitF)}>
                Save Changes
            </Button>
        </Box>
    );
};
