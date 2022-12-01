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
                label="Enter your old password"
                placeholder="Old Password"
                defaultValue=""
                errorMessage={errors?.password?.message}
            />
            <FormInput
                key="newPassword"
                name="newPassword"
                control={control}
                isInvalid={'newPassword' in errors}
                password
                label="Enter your new password"
                placeholder="New Password"
                defaultValue=""
                errorMessage={errors?.newPassword?.message}
            />
            <FormInput
                key="confirmPassword"
                name="confirmPassword"
                control={control}
                isInvalid={'confirmPassword' in errors}
                password
                label="Confirm new Password"
                placeholder="New Password"
                defaultValue=""
                errorMessage={errors?.confirmPassword?.message}
            />
            <Button my={5} onPress={handleSubmit(handleSubmitF)}>
                Save Changes
            </Button>
        </Box>
    );
};
