import React, { memo } from 'react';
import { Box, Text } from 'native-base';
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
    image?: string | null;
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
        <Box m={1} flex={1} bgColor="primary.400" {...boxParams}>
            <Text fontWeight="black" fontSize="lg" p={10}>
                {firstName}
            </Text>
            <Text fontWeight="black" fontSize="lg" p={10}>
                {lastName}
            </Text>
            <Text fontWeight="black" fontSize="lg" p={10}>
                {count}
            </Text>
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
