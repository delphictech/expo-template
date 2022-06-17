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

export const AuthEmail: React.FC<ScreenParams> = ({route}) => {

    // navigation 
    const navigation = useNavigation<AuthEmailProps>();
    
    // route params
    const signInMethods: Array<string> = route.params.signInMethods;
    console.log(`route: ${JSON.stringify(route.params)}`);
    // console.log(signInMethods.length);

    // Redux state
    const isAnonymous = useAppSelector((state) => state.user.isAnonymous);

    // react states
    const [password, setPassword] = useState<string>('');
    const [isEmailLoading, setEmailLoading] = useState<boolean>(false);


    return (
        <KeyboardBehaviorWrapper bounces={false} >
            <Box px="10" w="100%" h="100%" justifyContent="flex-start" alignItems="center" safeArea>
                <VStack space={3} alignItems="center" w="100%">
                    <FormInput key="Main-Login-Email" label="Enter your email" placeholder="name@example.com" onChangeText={(text: string) => setPassword(text)} capitalize='none'/>
                    {/* <Button mt="3" colorScheme="primary" w="100%" disabled>
                        Send me a sign-in link
                    </Button> */}
                    <Button key="Password-Button" w="100%" colorScheme="secondary" onPress={null} isLoading={isEmailLoading} isLoadingText='Submitting'>
                        Submit
                    </Button>
                </VStack>
            </Box>
        </KeyboardBehaviorWrapper>
        
    );
}
