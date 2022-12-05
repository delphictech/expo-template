import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    KeyboardAvoidingView,
    Text,
    useToast,
} from 'native-base';
import { FormInput } from 'src/components/form-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authenticateSchema, AuthenticateSchemaType } from 'src/utils/schemas';
import { Alert, Keyboard, Platform } from 'react-native';
import { SettingStackParams } from 'src/navigation/settings-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { useDeleteAccountMutation } from 'src/services';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { AlertToast } from 'src/components/alert-toast';
import { MaterialIcons } from '@expo/vector-icons';

type DeleteAccountScreenProps = StackScreenProps<SettingStackParams, 'DeleteAccount'>;

export /**
 * Delete Account Screen, used for deleting the user information from firestore and firebase auth
 *
 * @param {*} { navigation }
 * @return {*}
 */
const DeleteAccountScreen: React.FC<DeleteAccountScreenProps> = ({ navigation }) => {
    // declare hooks
    const user = useAppSelector((state) => state.user);
    const [deleteAccount, { isLoading, isSuccess, isError, error }] = useDeleteAccountMutation();
    // form validation
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthenticateSchemaType>({
        resolver: yupResolver(authenticateSchema),
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

    const confirmDeleteAccount = async ({ email, password }: AuthenticateSchemaType) => {
        Alert.alert(
            'Are you sure you want to delete your account?',
            'Your account and data will be permanently deleted.',
            [
                { text: 'Go Back', style: 'cancel' },
                {
                    text: 'Delete Account',
                    onPress: () => deleteAccount({ id: user.id, email, password }),
                    style: 'destructive',
                },
            ],
        );
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
                <HStack alignItems="center" justifyContent="space-between" w="100%" py={5}>
                    <Box pr={3}>
                        <Icon as={MaterialIcons} name="warning" size={50} color="plainText.800" />
                    </Box>
                    <Heading flex={1} textAlign="left" color="plainText.800" alignSelf="center">
                        Are you sure you want to delete your account?
                    </Heading>
                </HStack>
                <Text fontSize="md" textAlign="center" fontStyle="italic" color="plainText.800">
                    Enter the credentials associated with {user.email} to confirm.
                </Text>
                <FormInput
                    mt={1}
                    key="email"
                    name="email"
                    control={control}
                    isInvalid={'email' in errors}
                    label="Enter your email"
                    placeholder="Email"
                    defaultValue=""
                    errorMessage={errors?.email?.message}
                />
                <FormInput
                    key="password"
                    name="password"
                    control={control}
                    isInvalid={'password' in errors}
                    password
                    label="Enter your new password"
                    placeholder="Enter your password"
                    defaultValue=""
                    errorMessage={errors?.password?.message}
                />
                {isError ? (
                    <Text color="danger.600" textAlign="center" mt={5}>
                        {error?.message}
                    </Text>
                ) : null}
                <Button
                    colorScheme="danger"
                    isLoading={isLoading}
                    mt={8}
                    onPress={handleSubmit(confirmDeleteAccount)}>
                    Delete
                </Button>
                <Button variant="ghost" my={5} onPress={navigation.goBack}>
                    Cancel
                </Button>
            </Box>
        </KeyboardAvoidingView>
    );
};
