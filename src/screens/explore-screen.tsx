import React, { useEffect, useState } from 'react';
import { Box, FlatList, Spinner, Text } from 'native-base';
import { useGetUsersQuery } from 'src/services/user-api';
import { PublicUserData } from 'src/types';

/**
 * Explore screen - where the user will be able to view other users.
 *
 * @return {*}
 */
export const ExploreScreen: React.FC<{}> = () => {
    // state and query hooks
    const [begID, setBegID] = useState<string | undefined>(undefined);
    const { data = [], isFetching, refetch } = useGetUsersQuery(begID);
    const [users, setUsers] = useState<Array<PublicUserData>>(data);

    useEffect(() => {
        // concat if there are more users, otherwise set equal to data
        if (begID) {
            setUsers(users.concat(data));
        } else {
            setUsers(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data[0]?.id]);

    return (
        <Box
            w="100%"
            h="100%"
            bgColor="background.100"
            flex={1}
            alignItems="center"
            justifyContent="center">
            <FlatList
                w="100%"
                h="100%"
                refreshing={isFetching}
                onRefresh={() => (begID ? setBegID(undefined) : refetch())}
                renderItem={({ item }) => (
                    <Box m={1} flex={1} bgColor="primary.400">
                        <Text fontWeight="black" fontSize="lg" p={10}>
                            {item.id}
                        </Text>
                        <Text fontWeight="black" fontSize="lg" p={10}>
                            {item.firstName}
                        </Text>
                        <Text fontWeight="black" fontSize="lg" p={10}>
                            {item.lastName}
                        </Text>
                        <Text fontWeight="black" fontSize="lg" p={10}>
                            {item.count}
                        </Text>
                    </Box>
                )}
                data={users}
                onEndReached={() => setBegID(users.length ? users[users.length - 1].id : begID)}
                onEndReachedThreshold={0.2}
                ListFooterComponent={
                    data.length ? (
                        <Spinner color="background.400" animating={isFetching} />
                    ) : (
                        <Text
                            pt={3}
                            pb={8}
                            color="plainText.600"
                            fontStyle="italic"
                            alignSelf="center">
                            No more players
                        </Text>
                    )
                }
            />
        </Box>
    );
};
