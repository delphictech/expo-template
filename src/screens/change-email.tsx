import React, { useEffect } from 'react';
import { Box, Button, KeyboardAvoidingView, Text, useToast } from 'native-base';
import { FormInput } from 'src/components/form-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newEmailSchema, NewEmailSchemaType } from 'src/utils/schemas';
import { Keyboard, Platform } from 'react-native';
import { SettingStackParams } from 'src/navigation/settings-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { useUpdateEmailMutation } from 'src/services';
import { useAppSelector } from 'src/ducks/useful-hooks';
import { AlertToast } from 'src/components/alert-toast';

type ChangeEmailScreenProps = StackScreenProps<SettingStackParams, 'Email'>;

export /**
 * Change Email screen, will display the form that allows user
 * to change their email
 *
 * @param {*} { navigation }
 * @return {*}
 */
const ChangeEmailScreen: React.FC<ChangeEmailScreenProps> = ({ navigation }) => {
    // declare hooks
    const user = useAppSelector((state) => state.user);
    const [setNewEmail, { isLoading, isSuccess, isError, error }] = useUpdateEmailMutation();
    // form validation
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<NewEmailSchemaType>({
        resolver: yupResolver(newEmailSchema),
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
                        title="Email Changed!"
                        type="success"
                        message="Your email has been successfully changed."
                        toExit={() => toast.close('email-toast')}
                    />
                ),
                id: 'email-toast',
            });
            navigation.goBack();
        }
    }, [isLoading, isSuccess, navigation, toast]);

    const updatePassword = async ({ oldEmail, password, newEmail }: NewEmailSchemaType) => {
        setNewEmail({ userID: user.id, oldEmail, password, newEmail });
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
                <FormInput
                    mt={1}
                    key="oldEmail"
                    name="oldEmail"
                    control={control}
                    isInvalid={'oldEmail' in errors}
                    label="Enter your old email"
                    placeholder="Old Email"
                    defaultValue={user?.email ? user.email : ''}
                    errorMessage={errors?.oldEmail?.message}
                />
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
                    key="newEmail"
                    name="newEmail"
                    control={control}
                    isInvalid={'newEmail' in errors}
                    label="Enter your new email"
                    placeholder="New Email"
                    defaultValue=""
                    errorMessage={errors?.newEmail?.message}
                />
                {isError ? (
                    <Text color="danger.600" textAlign="center" mt={5}>
                        {error?.message}
                    </Text>
                ) : null}
                <Button isLoading={isLoading} mt={8} onPress={handleSubmit(updatePassword)}>
                    Update Email
                </Button>
                <Button colorScheme="danger" variant="ghost" my={5} onPress={navigation.goBack}>
                    Cancel
                </Button>
            </Box>
        </KeyboardAvoidingView>
    );
};
