import React from 'react';
import { Box, Text, Button, KeyboardAvoidingView } from 'native-base';
import { FormInput } from 'src/components/form-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editPasswordSchema } from 'src/utils/schemas';
import { Keyboard, Platform } from 'react-native';

export const SettingsPassScreen = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editPasswordSchema),
    });

    const handleSubmitF = async (e: any) => {
        console.log(e);
    };
    return (
        <KeyboardAvoidingView
            h={{
                lg: 'auto',
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            onTouchStart={() => Keyboard.dismiss()}
            w="100%">
            <Box mt={5}>
                <Text fontSize="2xl">Change your password</Text>
                <FormInput
                    mt={1}
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
        </KeyboardAvoidingView>
    );
};
