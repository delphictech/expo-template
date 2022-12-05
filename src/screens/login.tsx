import React from 'react';
import {
    Box,
    VStack,
    Button,
    Text,
    useToast,
    FormControl,
    Heading,
    HStack,
    Icon,
    KeyboardAvoidingView,
} from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, signupSchema } from 'src/utils/schemas';
import { FormInput } from 'src/components/form-input';
import { AuthStackParams } from 'src/navigation/auth-stack';
import { AlertToast } from 'src/components/alert-toast';
import { MaterialIcons } from '@expo/vector-icons';
import {
    useLazySendPasswordResetQuery,
    useLazySignInQuery,
    useLazySignUpQuery,
} from 'src/services/auth-api';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { Keyboard, Platform } from 'react-native';

type LoginScreenProps = StackScreenProps<AuthStackParams, 'Login'>;

export /**
 * Login Screen, used for letting users login
 *
 * @param {*} { route, navigation }
 * @return {*}
 */
const LoginScreen: React.FC<LoginScreenProps> = ({ route, navigation }) => {
    // route params
    const { signInMethods, email, title } = route.params;
    const isSignInScreen = signInMethods ? Boolean(signInMethods.length) : false;

    // hooks
    const toast = useToast();
    const schema = isSignInScreen ? loginSchema : signupSchema;
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const user = useAppSelector((state) => state.user);

    // redux query hooks
    const queryHook = isSignInScreen ? useLazySignInQuery : useLazySignUpQuery;
    const [triggerLogin, { isFetching, error }] = queryHook();
    const [triggerPasswordReset, { isFetching: sendingEmail }] = useLazySendPasswordResetQuery();

    // rendering functions
    const renderPasswordToast = () => (
        <AlertToast
            title="Email Sent!"
            type="success"
            message={`Password reset instructions sent to ${email}.`}
            toExit={() => toast.close('resetToast')}
        />
    );
    const renderVerificationToast = () => (
        <AlertToast
            title="Email Sent!"
            type="success"
            message={`Verification email sent to ${email}.`}
            toExit={() => toast.close('verificationToast')}
        />
    );

    // navigate back if not root auth screen
    const navigateBack = () => {
        const parentNavigator = navigation.getParent();
        if (parentNavigator?.getId() && parentNavigator?.getId() !== 'root') {
            parentNavigator?.goBack();
        }
    };

    // handle sign up
    const handleLogin = async ({ password, firstName, lastName }: any) => {
        const { isSuccess } = await triggerLogin({
            email,
            password,
            firstName,
            lastName,
        });

        // navigate back screen if in stack
        if (isSuccess) {
            toast.show({
                placement: 'bottom',
                render: renderVerificationToast,
                id: 'verificationToast',
            });
            navigateBack();
            reset();
        }
    };

    // handle password reset
    const handlePasswordReset = async () => {
        const { isSuccess } = await triggerPasswordReset(email);
        if (isSuccess) {
            toast.show({
                placement: 'bottom',
                render: renderPasswordToast,
                id: 'resetToast',
            });
        }
        reset();
    };

    return (
        <KeyboardAvoidingView
            h={{
                lg: 'auto',
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            onTouchStart={() => Keyboard.dismiss()}
            w="100%">
            <Box
                px="10"
                w="100%"
                h="100%"
                bgColor="background.100"
                safeArea={user.loggedIn ? undefined : true}>
                <VStack space={3} w="100%">
                    <FormControl>
                        <HStack alignItems="center" justifyContent="space-between" w="100%" py={5}>
                            <Box pr={3}>
                                <Icon
                                    as={MaterialIcons}
                                    name="lock-outline"
                                    size={50}
                                    color="plainText.800"
                                />
                            </Box>
                            <Heading
                                flex={1}
                                textAlign="left"
                                color="plainText.800"
                                alignSelf="center">
                                {title ||
                                    (!isSignInScreen
                                        ? 'Please create your account password.'
                                        : 'Enter your password to login.')}
                            </Heading>
                        </HStack>
                        {!isSignInScreen ? (
                            <VStack pb={3}>
                                <FormInput
                                    key="password"
                                    name="password"
                                    control={control}
                                    isInvalid={'password' in errors}
                                    password
                                    label="Enter your password"
                                    placeholder="Password"
                                    defaultValue=""
                                    errorMessage={String(errors?.password?.message)}
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
                                    errorMessage={String(errors?.confirmPassword?.message)}
                                    py={1}
                                />
                                <FormInput
                                    key="firstName"
                                    name="firstName"
                                    control={control}
                                    isInvalid={'firstName' in errors}
                                    label="Enter your first name"
                                    placeholder="First name"
                                    defaultValue=""
                                    errorMessage={String(errors?.firstName?.message)}
                                    py={1}
                                />
                                <FormInput
                                    key="lastName"
                                    name="lastName"
                                    control={control}
                                    isInvalid={'lastName' in errors}
                                    label="Enter your last name"
                                    placeholder="Last name"
                                    defaultValue=""
                                    errorMessage={String(errors?.lastName?.message)}
                                    py={1}
                                />
                            </VStack>
                        ) : null}
                        {signInMethods && signInMethods.includes('password') ? (
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
                                    errorMessage={String(errors?.password?.message)}
                                />
                                <Button
                                    alignSelf="flex-end"
                                    variant="link"
                                    mb={6}
                                    isLoading={sendingEmail}
                                    isLoadingText="Sending Email"
                                    onPress={handlePasswordReset}>
                                    Forget Password?
                                </Button>
                            </>
                        ) : null}
                        <Button
                            key="submit-button"
                            w="100%"
                            mt={isSignInScreen ? 0 : 3}
                            colorScheme="primary"
                            onPress={handleSubmit(handleLogin)}
                            isLoading={isFetching}
                            isLoadingText={isSignInScreen ? 'Logging In' : 'Signing Up'}>
                            {isSignInScreen ? 'Login' : 'Sign Up'}
                        </Button>
                        {/* <Button mt="3" colorScheme="primary" w="100%" disabled>
                        Send me a sign-in link
                    </Button> */}
                    </FormControl>
                    <Box w="100%" alignItems="center" justifyContent="center">
                        <Text textAlign="center" color="danger.600">
                            {error?.message}
                        </Text>
                    </Box>
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
        </KeyboardAvoidingView>
    );
};
