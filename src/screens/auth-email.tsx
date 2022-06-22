import React, { useState } from 'react';
import { Box, VStack, Button, Text, useToast, FormControl, Heading, HStack, Icon } from 'native-base';
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
import { AlertToast } from 'src/components/feedback/alert-toast';
import { MaterialIcons } from '@expo/vector-icons';

type AuthEmailProps = StackNavigationProp<AuthStackParams, 'AuthEmail'>;

// define schemas for form input
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
// login schema
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
        <AlertToast title='Email Sent!' type='success' message={`Password reset instructions sent to ${email}.`} toExit={() => toast.close('resetToast')} />
    );
    const renderVerificationToast = () => (
        <AlertToast title='Email Sent!' type='success' message={`Verification email sent to ${email}.`} toExit={() => toast.close('verificationToast')} />
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
                placement: 'bottom',
                render: renderVerificationToast,
                id: 'verificationToast'
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
            // await resetPassword(email);
            toast.show({
                placement: 'bottom',
                render: renderPasswordToast,
                id: 'resetToast'
            });
            reset();
        } catch (e: any) {
            console.log(`Error with password reset: ${e}`);
            setError(e.message);
            setIsLoading(false);
        }
    };

    return (
        <KeyboardBehaviorWrapper bounces={false} centerVertically>
            <Box px="10"
                w="100%"
                h="100%"
                bgColor="background.100"
                safeArea>
                <VStack space={3} w="100%" >
                    <FormControl>
                        <HStack alignItems='center' justifyContent='center' w='100%' py={3} px={7}>
                            <Box px={3} >
                                <Icon as={MaterialIcons} name='lock-outline' size={50} color="plainText.800" />
                            </Box>
                            <Heading textAlign='left' color="plainText.800" alignSelf='center'>{ !signInMethods.length ? 'Please create your account password.' : 'Enter your password to login.'}</Heading>
                        </HStack>
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
                                    py={3}
                                />
                                <Button
                                    key="Password-Button"
                                    w="100%"
                                    mt={3}
                                    colorScheme="primary"
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
                                    colorScheme="primary"
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
                    <Button
                        w="100%"
                        colorScheme="primary"
                        variant="link"
                        p={0}
                        onPress={() => navigation.goBack()}>
                        Return to previous screen
                    </Button>
                </VStack>
            </Box>
        </KeyboardBehaviorWrapper>
    );
};
