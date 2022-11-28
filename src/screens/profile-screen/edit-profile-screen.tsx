import React, { useState, useEffect } from 'react';
import { Button, Text } from 'native-base';
import { ImageUploader } from 'src/components/image-uploader';
import { FormInput } from 'src/components/user-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema } from 'src/utils/schemas';
import { useGetUserImageQuery } from 'src/services/image-api';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { ImageOBJ } from 'src/types/profile-image';

export interface EditProfileProps {}

export const EditProfileScreen: React.FC<EditProfileProps> = () => {
    const user = useAppSelector((state) => state.user);

    // const timeStampRef = useRef(String(Date.now())).current;

    const [imageState, setImageState] = useState<string>();
    // const [imageDispalyed, setImageDisplayed] = useState<string>();
    const [queryState, setQueryState] = useState<ImageOBJ>({
        userID: user.id,
        imageUri: undefined,
        // time: timeStampRef,
    });

    const { data, isFetching, isLoading, isError, error, isSuccess, refetch } =
        useGetUserImageQuery(queryState);

    useEffect(() => {
        console.log('data back from RTK', data);
        refetch();
    }, [data]);

    useEffect(() => {
        const input = {
            userID: user.id,
            imageUri: imageState,
        };
        console.log('input', input);
        setQueryState(input);
    }, [imageState]);

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

    if (isLoading || isFetching) {
        return <Text>Loading</Text>;
    }

    if (isError) {
        return <Text>{error}</Text>;
    }

    return (
        <>
            {data && isSuccess && <ImageUploader setImageState={setImageState} imageProp={data} />}

            {/* <Image
                source={{
                    uri: data,
                }}
                alt="Alternate Text"
                size="2xl"
            /> */}

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
