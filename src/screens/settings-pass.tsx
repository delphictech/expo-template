import React from 'react';
import { Box, Text, Button } from 'native-base';
import { FormInput } from 'src/components/form-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema } from 'src/utils/schemas';

export const SettingsPassScreen = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editProfileSchema),
    });

    const handleSubmitF = async (e: any) => {
        console.log(e);
    };
    return (
        <Box>
            <Text>Setting Pass Screen</Text>
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
