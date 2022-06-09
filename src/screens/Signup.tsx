import React, { useState } from 'react';
import { Center, Box, Heading, VStack, Button } from 'native-base';
import { FormInput } from 'components/user-input';
import { KeyboardBehaviorWrapper } from 'components/wrappers';
import { signUpWithEmail } from 'src/firebase/api';

export interface SignupScreenProps {
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

export const SignupScreen: React.FC<SignupScreenProps> = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        console.log('pressed');
        let user = signUpWithEmail(email, password);
        console.log(user);
        props.onSubmit && props.onSubmit();
    }
    return (
        <KeyboardBehaviorWrapper>
            <Center w="100%">
                <Box safeArea p="2" w="90%" maxW="290" py="8">
                    <Heading
                        size="lg"
                        color="coolGray.800"
                        _dark={{
                            color: 'warmGray.50',
                        }}
                        fontWeight="semibold">
                        Welcome
                    </Heading>
                    <Heading
                        mt="1"
                        color="coolGray.600"
                        _dark={{
                            color: 'warmGray.200',
                        }}
                        fontWeight="medium"
                        size="xs">
                        Sign up to continue!
                    </Heading>
                    <VStack space={3} mt="5">
                        <FormInput label="Email" isModalOpen={props.isModalOpen} onEndEditing={props.onEndEditing} onChangeText={(text: string) => setEmail(text)} />
                        <FormInput label="Password" password={true} isModalOpen={props.isModalOpen} onEndEditing={props.onEndEditing} onChangeText={(text: string) => setPassword(text)} />
                        <FormInput label="Confirm Password" password={true} isModalOpen={props.isModalOpen} onEndEditing={props.onEndEditing} />
                        <Button mt="2" colorScheme="indigo" onPress={handleSignUp} >
                            Sign up
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </KeyboardBehaviorWrapper>
        
    );
}
