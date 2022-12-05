import React from 'react';
import { Box, Button, KeyboardAvoidingView } from 'native-base';
import { FormInput } from 'src/components/form-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newPasswordSchema, NewPasswordSchemaType } from 'src/utils/schemas';
import { Keyboard, Platform } from 'react-native';
import { SettingStackParams } from 'src/navigation/settings-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { useUpdatePasswordMutation } from 'src/services';
import { useAppSelector } from 'src/ducks/useful-hooks';

type ChangePasswordScreenProps = StackScreenProps<SettingStackParams, 'password'>;

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ navigation }) => {
    // declare hooks
    const userEmail = useAppSelector((state) => state.user.email);
    const [setNewPassword, { isLoading }] = useUpdatePasswordMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<NewPasswordSchemaType>({
        resolver: yupResolver(newPasswordSchema),
    });

    // const updatePassword = async ({ password, newPassword }) => {
    //     setNewPassword({ userEmail, password, newPassword });
    //     console.log(e);
    // };

    return (
        <KeyboardAvoidingView
            h={{
                lg: 'auto',
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            onTouchStart={() => Keyboard.dismiss()}
            w="100%">
            <Box px={5} mt={5}>
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
                    label="Confirm your new password"
                    placeholder="Confirm Password"
                    defaultValue=""
                    errorMessage={errors?.confirmPassword?.message}
                />
                <Button isLoading={isLoading} mt={8} onPress={handleSubmit(updatePassword)}>
                    Update Password
                </Button>
                <Button colorScheme="danger" variant="ghost" my={5} onPress={navigation.goBack}>
                    Cancel
                </Button>
            </Box>
        </KeyboardAvoidingView>
    );
};
