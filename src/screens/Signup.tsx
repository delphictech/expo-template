import React from 'react';
import { useState } from 'react';
import { Center, Box, Heading, VStack, FormControl, Input, Button, Icon } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
import { FormInput } from 'components/user-input';

export default function SignupScreen() {
    const [showPassword, setShowPassword] = useState(false);

    return (
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
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormInput label="Password" />
                    <FormControl>
                        <FormControl.Label>Confirm Password</FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <Button mt="2" colorScheme="indigo">
                        Sign up
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
}
