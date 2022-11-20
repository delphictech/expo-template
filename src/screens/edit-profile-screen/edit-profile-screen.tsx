import React from 'react';
import { Box, Button, Text } from 'native-base';
import { ImageUploader } from 'src/components/image-uploader/image-uploader';
import { FormInput } from 'src/components/user-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema } from 'src/utils/schemas';
import { GestureResponderEvent } from 'react-native';



export const EditProfileScreen = () => {
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
            <ImageUploader imageProp="https://wallpaperaccess.com/full/317501.jpg" />
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
