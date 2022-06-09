import React from 'react';
import {
    Center,
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    HStack,
    Text,
} from 'native-base';
import { FormInput } from 'components/user-input';
import { KeyboardBehaviorWrapper } from 'components/wrappers';
import { signInWithEmail } from 'firebase-api';

export interface LoginScreenProps {
    /*
        Function to call on the submit of the button
    */
    onSubmit?: () => void;
    /* 
        Boolean for when screen nested in modal, used to clear user inputs
    */
    isModalOpen?: boolean | null;
    /*
        Callback for when an input has been actively edited
    */
   onEndEditing?: () => void;
};

/*
Using error codes, signIn with the email: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
*/

export const LoginScreen:React.FC<LoginScreenProps> = (props) => {


    return (
        <KeyboardBehaviorWrapper>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading
                        size="lg"
                        fontWeight="600"
                        color="primary.800"
                        _dark={{
                            color: 'warmGray.50',
                        }}>
                        Welcome
                    </Heading>
                    <Heading
                        mt="1"
                        _dark={{
                            color: 'warmGray.200',
                        }}
                        color="coolGray.600"
                        fontWeight="medium"
                        size="xs">
                        Sign in to continue!
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormInput label="Email" />
                        <FormInput label="Password" password={true} />
                        <Button mt="2" colorScheme="indigo">
                            Sign in
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text
                                fontSize="sm"
                                color="coolGray.600"
                                _dark={{
                                    color: 'warmGray.200',
                                }}>
                                I'm a new user.
                            </Text>
                            <Link
                                _text={{
                                    color: 'indigo.500',
                                    fontWeight: 'medium',
                                    fontSize: 'sm',
                                }}
                                href="#">
                                Sign Up
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </KeyboardBehaviorWrapper>
    );
}
