import React, { useState } from 'react';
import { Center, Box, VStack, Button, Image, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FormInput } from 'src/components/user-input';
import { KeyboardBehaviorWrapper } from 'src/components/wrappers';
import { anonymousSignIn, fetchSignInMethods } from 'src/firebase/api';
import { useAppSelector } from 'src/hooks/useful-ducks';
import { AuthStackParams } from 'src/navigation/auth-stack';
import { ScreenParams } from 'src/types/screen';

type AuthEmailProps = StackNavigationProp<AuthStackParams, "AuthEmail">;

export const AuthEmail: React.FC<ScreenParams> = (props: ScreenParams) => {

    // navigation 
    const navigation = useNavigation<AuthEmailProps>();

    // Redux state
    const isAnonymous = useAppSelector((state) => state.user.isAnonymous);

    // react states
    const [email, setEmail] = useState<string>('');
    const [isEmailLoading, setEmailLoading] = useState<boolean>(false);
    const [isGuestLoading, setIsGuestLoading] = useState<boolean>(false);

    const handleEmail = async () => {
        setEmailLoading(true);
        try {
            const methods = await fetchSignInMethods(email);
        } catch (e: any) {
            console.log(`Error with email ${e}`);
        }
        setEmailLoading(false);
        navigation.navigate('AuthEmail');
    }

    const handleAnonymous = async () => {
        setIsGuestLoading(true);
        try {
            const response = await anonymousSignIn();
        } catch (e: any) {
            console.log(`Error with Guest sign in ${e}`);
        }
    }

    return (
        <KeyboardBehaviorWrapper bounces={false} centerVertically={!isAnonymous} key='asdfasdfas' >
            <Box px="10" w="100%" h="100%" justifyContent={!isAnonymous ? "center" : "flex-start"} alignItems="center" safeArea={!isAnonymous ? true : undefined}>
                <VStack space={3} alignItems="center" w="100%">
                    {
                        !isAnonymous && 
                        <>
                            <Image alignSelf="center" alt='Logo' source={require('assets/icon.png')} style={{ width: 150, height: 150 }}/>
                            <Heading mb={3}>Welcome to Maet!</Heading>
                        </>
                    }
                    <FormInput key="Main-Login-Email" label="Enter your email" placeholder="name@example.com" onChangeText={(text: string) => setEmail(text)} />
                    {/* <Button mt="3" colorScheme="primary" w="100%" disabled>
                        Send me a sign-in link
                    </Button> */}
                    <Button key="Password-Button" w="100%" colorScheme="secondary" onPress={handleEmail} isLoading={isEmailLoading} isLoadingText='Submitting'>
                        Submit
                    </Button>
                    { 
                        !isAnonymous &&
                        <Button w="100%" colorScheme="primary" variant="link" onPress={handleAnonymous} isLoading={isGuestLoading} isLoadingText='Continuing' >
                            Continue as guest
                        </Button>
                    }
                </VStack>
            </Box>
        </KeyboardBehaviorWrapper>
        
    );
}
