import React, { useState } from 'react';
import { Box, VStack, Button, Text, useToast, FormControl } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from 'src/components/user-input';
import { KeyboardBehaviorWrapper } from 'src/components/wrappers';
import { resetPassword, signInWithEmail, signUpWithEmail, verifyEmail } from 'src/firebase/api';
import { AuthStackParams } from 'src/navigation/auth-stack';
import { ScreenParams } from 'src/types/screen';
import { SuccessToast } from 'src/components/feedback/success-toast';

type AuthEmailProps = StackNavigationProp<AuthStackParams, 'AuthEmail'>;

// define schema for form input
const signupSchema = yup.object().shape({
    password: yup.string().required('Password is required').min(8, 'Minimum 8 characters'),
    confirmPassword: yup.string().test({
        name: 'confirmPassword',
        message: 'Passwords must match',
        test() {
            const { password, confirmPassword } = this.parent;
            if (password && confirmPassword !== password) {
                return false;
            }
            return true;
        },
    }),
});

const loginSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
});

export const AuthEmail: React.FC<ScreenParams> = ({ route }) => {
    // route params
    const { signInMethods } = route.params;
    const { email } = route.params;

    // hooks
    const navigation = useNavigation<AuthEmailProps>();
    const toast = useToast();
    const schema = signInMethods.length ? loginSchema : signupSchema;
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // react states
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // rendering functions
    const renderPasswordToast = () => (
        <SuccessToast message={`Password reset instructions sent to ${email}.`} />
    );
    const renderVerificationToast = () => (
        <SuccessToast message={`Verification email sent to ${email}.`} />
    );

    // handle login
    const handleLogin = async (data: any) => {
        setIsLoading(true);
        try {
            await signInWithEmail(email, data.password);
            reset();
        } catch (e: any) {
            console.log(`Error with login: ${e}`);
            setError(e.message);
            setIsLoading(false);
        }
    };

    // handle sign up
    const handleSignup = async (data: any) => {
        setIsLoading(true);
        try {
            await signUpWithEmail(email, data.password);
            await verifyEmail(email);
            toast.show({
                placement: 'top',
                render: renderVerificationToast,
            });
            reset();
        } catch (e: any) {
            console.log(`Error with sign up: ${e}`);
            setError(e.message);
            setIsLoading(false);
        }
    };

    // handle password reset
    const handlePasswordReset = async () => {
        try {
            await resetPassword(email);
            toast.show({
                placement: 'top',
                render: renderPasswordToast,
            });
            reset();
        } catch (e: any) {
            console.log(`Error with password reset: ${e}`);
            setError(e.message);
            setIsLoading(false);
        }
    };

    return (
        <KeyboardBehaviorWrapper bounces={false}>
            <Box px="10" w="100%" h="100%" justifyContent="flex-start" alignItems="center">
                <VStack space={3} alignItems="center" w="100%">
                    <FormControl isInvalid>
                        {!signInMethods.length ? (
                            <>
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
                                    key="confirm-password"
                                    name="confirmPassword"
                                    control={control}
                                    isInvalid={'confirmPassword' in errors}
                                    password
                                    label="Confirm your password"
                                    placeholder="Confirm Password"
                                    defaultValue=""
                                    errorMessage={errors?.confirmPassword?.message}
                                />
                                <Button
                                    key="Password-Button"
                                    w="100%"
                                    colorScheme="secondary"
                                    onPress={handleSubmit(handleSignup)}
                                    isLoading={isLoading}
                                    isLoadingText="Signing Up">
                                    Sign Up
                                </Button>
                            </>
                        ) : null}
                        {signInMethods.includes('password') ? (
                            <>
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
                                <Button
                                    alignSelf="flex-end"
                                    variant="link"
                                    mb={6}
                                    onPress={handlePasswordReset}>
                                    Forget Password?
                                </Button>
                                <Button
                                    key="Password-Button"
                                    w="100%"
                                    colorScheme="secondary"
                                    onPress={handleSubmit(handleLogin)}
                                    isLoading={isLoading}
                                    isLoadingText="Logging In">
                                    Login
                                </Button>
                            </>
                        ) : null}
                        {/* <Button mt="3" colorScheme="primary" w="100%" disabled>
                        Send me a sign-in link
                    </Button> */}
                    </FormControl>
                    <Text color="danger.600">{error}</Text>
                </VStack>
            </Box>
        </KeyboardBehaviorWrapper>
    );
};
