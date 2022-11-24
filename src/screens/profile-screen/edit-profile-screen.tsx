import React, { useState, useEffect } from 'react';
import { Button, Text } from 'native-base';
import { ImageUploader } from 'src/components/image-uploader';
import { FormInput } from 'src/components/user-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema } from 'src/utils/schemas';
import { useGetUserImageQuery } from 'src/services/image-api';
import { useAppSelector } from 'src/ducks/useful-hooks';

export interface EditProfileProps {}

interface imageOBJ {
    userID: string;
    imageUri?: string | undefined;
}

export const EditProfileScreen: React.FC<EditProfileProps> = () => {
    const user = useAppSelector((state) => state.user);

    const [imageState, setImageState] = useState(
        'https://carta.fiu.edu/kopenhavercenter/wp-content/uploads/sites/17/2021/01/depositphotos_29387653-stock-photo-facebook-profile.jpg',
    );
    const [queryState, setQueryState] = useState<imageOBJ>({
        userID: user.id,
        imageUri: imageState,
    });

    const { data, isFetching, isLoading, isError, error, isSuccess, refetch } =
        useGetUserImageQuery(queryState);

    useEffect(() => {
        setImageState(data);
    }, [data]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(editProfileSchema),
    });

    const handleSubmitF = (e: any) => {
        console.log(e);
        console.log('console from submit');
    };

    return (
        <>
            <ImageUploader imageProp={imageState} />
            <Text>dwawdwada</Text>
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
            <Button onPress={handleSubmit(handleSubmitF)}>Save Changes</Button>
        </>
    );
};
