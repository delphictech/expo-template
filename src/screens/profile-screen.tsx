import React from 'react';
import { Box, Text, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParams } from 'src/navigation/profile-stack';

type ProfileScreenProps = StackNavigationProp<ProfileStackParams, 'Profile-Screen'>;

export const ProfileScreen: React.FC<{}> = () => {
    const navigation = useNavigation<ProfileScreenProps>();
    return (
        <Box>
            <Text>Profile Screen</Text>
            <Button
                onPress={() => {
                    navigation.navigate('Settings');
                }}>
                Edit Profile
            </Button>
        </Box>
    );
};
