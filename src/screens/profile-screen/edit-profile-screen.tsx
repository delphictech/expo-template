import React, { useState, useEffect, useRef } from 'react';
import { Button, Text, Image } from 'native-base';
import { ImageUploader } from 'src/components/image-uploader';
import { FormInput } from 'src/components/user-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema } from 'src/utils/schemas';
import { useGetUserImageQuery } from 'src/services/image-api';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { ImageOBJ } from 'src/types/profile-image';

// Temporary imports
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from 'src/firebase/config';
import { upLoadFile } from 'src/utils/upload-image';
// end temp imports

export interface EditProfileProps {}

export const EditProfileScreen: React.FC<EditProfileProps> = () => {
    const user = useAppSelector((state) => state.user);

    const timeStampRef = useRef(String(Date.now())).current;

    const [imageState, setImageState] = useState<string>();
    const [imageDispalyed, setImageDisplayed] = useState<string>();
    const [queryState, setQueryState] = useState<ImageOBJ>({
        userID: user.id,
        imageUri: undefined,
        time: timeStampRef,
    });

    // console.log(timeStampRef);

    // useEffect(() => {
    //     const storageRef = ref(storage, `user-profile-img/${user.id}`);

    //     getDownloadURL(storageRef).then((url) => {
    //         console.log('url from mount useEffect', url);
    //         setImageState(url);
    //     });

    //     console.log(user);
    // }, []);

    const { data, isFetching, isLoading, isError, error, isSuccess, refetch } =
        useGetUserImageQuery(queryState);

    // useEffect(() => {
    //     setImageState(data);
    // }, []);

    useEffect(() => {
        const input = {
            userID: user.id,
            imageUri: imageState,
        };
        console.log('input', input);
        setQueryState(input);
    }, [imageState]);

    // useEffect(() => {
    //     setImageState(data);
    //     console.log('data', data);
    //     console.log(error);
    // }, [data]);

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

    if (isLoading) {
        return <Text>Loading</Text>;
    }

    return (
        <>
            {data && <ImageUploader setImageState={setImageState} imageProp={data} />}
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
            {/* {data && (
                <Image
                    source={{
                        uri: data,
                    }}
                    alt="Alternate Text"
                />
            )} */}
            <Button onPress={handleSubmit(handleSubmitF)}>Save Changes</Button>
        </>
    );
};
