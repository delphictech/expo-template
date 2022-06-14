import React from 'react';
import { Center, Box, Square, Heading, VStack, Button, Pressable, HStack, Spacer, Text, Avatar, FlatList } from 'native-base';
import { ItemClick } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';

export interface PlayerProps {
    image?: string | undefined;
    name?: string | undefined;
};

export const Player: React.FC<PlayerProps> = (props) => {
    return (
        <Pressable onPress={() => console.log("You touched me")} >
            <Square size='140' margin={1} p="3" bg="white" >
                <VStack alignItems="center" space={2} width="100%" height='100%'>
                    <Text fontSize="xs" color="coolGray.800" 
                        alignSelf="flex-start">
                        C 9.9
                    </Text>
                    <Avatar size="48px" source={{uri: props.image}} />
                    <VStack>
                        <Text color="coolGray.800" bold>{props.name}
                        </Text>
                        <Text color="coolGray.600" >
                            Rating
                        </Text>
                    </VStack>
                    <Spacer />
                </VStack>
            </Square>
        </Pressable>
    );
}

export interface PickupSessionProps {
    /* 
        Boolean for when screen nested in modal, used to clear user inputs
    */
    isModalOpen?: boolean | null;
    /*
        Callback for when an input has been actively edited
    */
   onEndEditing?: () => void;
};


export const PickupSession: React.FC<PickupSessionProps> = (props) => {

    const renderItem = (iterable: any) => {
        return (
            <Player name={iterable.item.text} image={iterable.item.image} />
        );
    };

    return (
        <Center w="100%" h="full">
            <FlatList data={Object.values(data)} 
                renderItem={renderItem}
                keyExtractor={item => String(item.id)}
            />
            <VStack space={3} mt="5">
                <Text>HI pickup players</Text>
            </VStack>
        </Center>
        
    );
};

const data = [
    {
        id: 0,
        image: 'https://placekitten.com/200/240',
        text: 'Chloe',
    },
    {
        id: 1,
        image: 'https://placekitten.com/200/201',
        text: 'Jasper',
    },
    {
        id: 2,
        image: 'https://placekitten.com/200/202',
        text: 'Pepper',
    },
    {
        id: 3,
        image: 'https://placekitten.com/200/203',
        text: 'Oscar',
    },
    {
        id: 4,
        image: 'https://placekitten.com/200/204',
        text: 'Dusty',
    },
    {
        id: 5,
        image: 'https://placekitten.com/200/205',
        text: 'Spooky',
    },
    {
        id: 6,
        image: 'https://placekitten.com/200/210',
        text: 'Kiki',
    },
    {
        id: 7,
        image: 'https://placekitten.com/200/215',
        text: 'Smokey',
    },
    {
        id: 8,
        image: 'https://placekitten.com/200/220',
        text: 'Gizmo',
    },
    {
        id: 9,
        image: 'https://placekitten.com/220/239',
        text: 'Kitty',
    },
];