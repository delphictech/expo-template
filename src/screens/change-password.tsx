import React, { useEffect } from 'react';
import { Box, Button, KeyboardAvoidingView, Text, useToast } from 'native-base';
import { FormInput } from 'src/components/form-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newPasswordSchema, NewPasswordSchemaType } from 'src/utils/schemas';
import { Keyboard, Platform } from 'react-native';
import { SettingStackParams } from 'src/navigation/settings-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { useUpdatePasswordMutation } from 'src/services';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { AlertToast } from 'src/components/alert-toast';

type ChangePasswordScreenProps = StackScreenProps<SettingStackParams, 'Password'>;

export /**
 * Change password screen, form that allows users to change password.
 *
 * @param {*} { navigation }
 * @return {*}
 */
const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ navigation }) => {
    // declare hooks
    const userEmail = useAppSelector((state) => state.user.email);
    const [setNewPassword, { isLoading, isSuccess, isError, error }] = useUpdatePasswordMutation();
    // form validation
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<NewPasswordSchemaType>({
        resolver: yupResolver(newPasswordSchema),
    });
    // declare toast
    const toast = useToast();

    // effect hook for navigating back to the setting screen
    useEffect(() => {
        if (!isLoading && isSuccess) {
            toast.show({
                placement: 'bottom',
                render: () => (
                    <AlertToast
                        title="Password Changed!"
                        type="success"
                        message="Your password has been successfully changed."
                        toExit={() => toast.close('pw-toast')}
                    />
                ),
                id: 'pw-toast',
            });
            navigation.goBack();
        }
    }, [isLoading, isSuccess, navigation, toast]);

    const updatePassword = async ({ password, newPassword }: NewPasswordSchemaType) => {
        if (userEmail) setNewPassword({ email: userEmail, oldPassword: password, newPassword });
    };

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
                {isError ? (
                    <Text color="danger.600" textAlign="center" mt={5}>
                        {error?.message}
                    </Text>
                ) : null}
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
