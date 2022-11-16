import React from 'react';
import { Box, VStack, Button, Heading, Text, useToast, HStack } from 'native-base';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema } from 'src/utils/schemas';
import { FormInput } from 'src/components/user-input';
import { KeyboardBehaviorWrapper } from 'src/components/wrappers';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { AuthStackParams } from 'src/navigation/auth-stack';
import MaetSvg from 'assets/MaetSvg.svg';
import { AlertToast } from 'src/components/feedback/alert-toast';
import {
    useLazyFetchSignInMethodsQuery,
    useLazySignOutQuery,
    useLazySignUpQuery,
} from 'src/services/auth-api';
import { LogoIcon } from 'src/components/logo-icon';

// define navigation props
type LoginScreenProps = StackNavigationProp<AuthStackParams, 'Email'>;

export const WelcomeScreen: React.FC<{}> = () => {
    // hooks
    const navigation = useNavigation<LoginScreenProps>();
    const isAnonymous = useAppSelector((state) => state.user.isAnonymous);
    const iconColor = useTheme().colors.text;
    const toast = useToast();

    // form schema hooks
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(emailSchema),
    });

    // redux query hooks
    const [getSignInMethods, { isFetching: emailFetching, error: fetchingError }] =
        useLazyFetchSignInMethodsQuery();
    const [triggerSignUp, { isFetching: guestFetching }] = useLazySignUpQuery();
    const [triggerSignOut] = useLazySignOutQuery();

    // toast component for guest
    const renderGuestToast = () => (
        <AlertToast
            title="Using Maet as a Guest."
            type="primary"
            toExit={() => toast.close('guestToast')}
        />
    );

    // handling button presses
    const handleEmail = async (data: any) => {
        // updating variables within function, since they need to be sent to new screen
        try {
            const emailSignInMethods = await getSignInMethods(data.email).unwrap();
            navigation.navigate('AuthEmail', {
                signInMethods: emailSignInMethods,
                email: data.email,
            });
        } catch (e: any) {
            console.log('Error with email, caught by outer hook fetchingError');
        }
        reset();
    };

    const handleAnonymous = async () => {
        await triggerSignUp('guest');
        toast.show({
            placement: 'top',
            render: renderGuestToast,
            id: 'guestToast',
        });
    };

    return (
        <KeyboardBehaviorWrapper bounces={false} centerVertically>
            <Box
                px="10"
                w="100%"
                h="100%"
                bg="background.100"
                justifyContent={!isAnonymous ? 'center' : 'flex-start'}
                alignItems="center"
                safeArea={!isAnonymous ? true : undefined}>
                <VStack space={3} alignItems="center" w="100%">
                    {!isAnonymous ? (
                        <>
                            <MaetSvg height={150} width={150} fill={iconColor} />
                            <Heading mb={3} color="plainText.900">
                                Welcome to the Maet template!
                            </Heading>
                        </>
                    ) : (
                        <HStack
                            alignItems="center"
                            justifyContent="space-between"
                            w="100%"
                            flex={1}
                            pt={5}>
                            <Box pr={3}>
                                <LogoIcon size={50} color="plainText.800" />
                            </Box>
                            <Heading
                                flex={1}
                                textAlign="left"
                                color="plainText.800"
                                alignSelf="center">
                                Create an account to view this template!
                            </Heading>
                        </HStack>
                    )}
                    <FormInput
                        key="login-email"
                        name="email"
                        control={control}
                        isInvalid={'email' in errors}
                        label="Input your email"
                        placeholder="name@example.com"
                        defaultValue=""
                        errorMessage={String(errors?.email?.message)}
                    />
                    {/* <Button mt="3" colorScheme="primary" w="100%" >
                        Send me a sign-in link
                    </Button> */}
                    <Button
                        key="Password-Button"
                        w="100%"
                        colorScheme="primary"
                        onPress={handleSubmit(handleEmail)}
                        isLoading={emailFetching}
                        isLoadingText="Submitting">
                        Submit
                    </Button>
                    {!isAnonymous ? (
                        <Button
                            w="100%"
                            colorScheme="primary"
                            variant="link"
                            onPress={handleAnonymous}
                            isLoading={guestFetching}
                            isLoadingText="Continuing">
                            Continue as guest
                        </Button>
                    ) : null}
                    <Text color="danger.600">{fetchingError?.message}</Text>
                    {isAnonymous ? (
                        <Button
                            w="100%"
                            colorScheme="primary"
                            variant="link"
                            onPress={() => triggerSignOut(undefined)}
                            isLoading={guestFetching}
                            isLoadingText="Continuing">
                            Logout of Guest
                        </Button>
                    ) : null}
                </VStack>
            </Box>
        </KeyboardBehaviorWrapper>
    );
};
