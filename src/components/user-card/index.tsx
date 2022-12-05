import React, { memo } from 'react';
import { Avatar, Box, HStack, Text } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';

/**
 * Params extended from InterfaceBoxProps
 *
 * @export
 * @interface UserCardParams
 * @extends {InterfaceBoxProps}
 */
export interface UserCardParams extends InterfaceBoxProps {
    firstName?: string | null;
    lastName?: string | null;
    count?: number | null;
    image?: string;
}

/**
 * User card component, exported using memoized component
 * https://blog.logrocket.com/what-are-react-pure-functional-components/
 * @param {*} {
 *     firstName,
 *     lastName,
 *     count,
 *     image,
 *     ...boxParams
 * }
 * @return {*}
 */
const UserCardComp: React.FC<UserCardParams> = ({
    firstName,
    lastName,
    count,
    image,
    ...boxParams
}) => {
    return (
        <Box
            m={1}
            justifyContent="center"
            alignContent="center"
            flex={1}
            bgColor="muted.200"
            borderRadius={7}
            {...boxParams}>
            <HStack p={3} justifyContent="space-between" alignItems="center" flex={1} w="100%">
                <HStack alignItems="center">
                    <Avatar
                        backgroundColor="primary.500"
                        source={{
                            uri: image,
                        }}>
                        {firstName &&
                            lastName &&
                            `${firstName[0]?.toUpperCase()}${lastName[0]?.toUpperCase()}`}
                    </Avatar>
                    <Text fontWeight="black" fontSize="lg" px={2}>
                        {firstName} {lastName}
                    </Text>
                </HStack>
                <Text pr={5} fontWeight="black" fontSize="lg">
                    Count: {count || 0}
                </Text>
            </HStack>
        </Box>
    );
};

UserCardComp.defaultProps = {
    firstName: undefined,
    lastName: undefined,
    count: undefined,
    image: undefined,
};

/**
 * User card component, exported using memoized component
 * https://blog.logrocket.com/what-are-react-pure-functional-components/
 * @param {*} {
 *     firstName - string,
 *     lastName - string,
 *     count - number,
 *     image - string uri,
 *     ...boxParams
 * }
 * @return {*}
 */
export const UserCard = memo(UserCardComp);
