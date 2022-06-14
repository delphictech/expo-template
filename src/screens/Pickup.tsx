import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Center, Box, Square, Heading, VStack, Button, Pressable, HStack, Spacer, Text, Avatar, FlatList, View, ScrollView, Flex, SectionList } from 'native-base';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    draggable: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        padding: 3,
        margin: 5
    },
    receiver: {
        width: 100,
        height: 100,
        backgroundColor: 'green',
    },
});

export interface PlayerProps {
    image?: string | undefined;
    name?: string | undefined;
    onLongPress?: any;
    disabled?: boolean | undefined;
};

export const Player: React.FC<PlayerProps> = (props) => {
    return (
        <Pressable onPress={() => console.log("You touched me")} onLongPress={props.onLongPress} disabled={props.disabled}>
            <Square size='140' margin={1} p="3" bg="white" >
                <VStack alignItems="center" space={2} width="100%" height='100%'>
                    <Text fontSize="xs" color="coolGray.800" 
                        alignSelf="flex-start">
                        C 9.9
                    </Text>
                    <Avatar size="48px" source={{uri: props.image}} />
                    <VStack>
                        <Text color="coolGray.800" bold isTruncated>{props.name}
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
                // <DraxView
                //     style={styles.draggable}
                //     onDragStart={() => {
                //         console.log('start drag');
                //     }}
                //     payload="world"
                //     longPressDelay={100}
                // />
             <Player name={iterable.item.text} image={iterable.item.image} />
        );
    };
    const renderItem1 = (iterable: any) => {
        return (
            <DraxView longPressDelay={0}>
            <Player name={iterable.item.text} image={iterable.item.image} 
            onLongPress={iterable.drag}
            disabled={iterable.isActive}
            />
            </DraxView>
        );
    };

    const [data1, setData1] = useState(data);
    const [data2, setData2] = useState(data);
    const [data3, setData3] = useState(data);

    return (
        <DraxProvider>
        <Center w="100%" h="100%" flex="1" >
            <VStack space={3} mt="2" flex="1" width="100%">
                <VStack w="100%" h="auto" pl={2} >
                    <HStack w="100%" justifyContent="space-between" alignItems="center" alignSelf="flex-start">
                        <Heading>Queue</Heading>
                        <Text>2 new --*</Text>
                    </HStack>
                    <View>
                    </View>

                </VStack>
                <HStack justifyContent="space-between" flexDirection="row" width="100%" px={2}>
                    <Heading w={140} textAlign="center">Team 1</Heading>
                    <Heading w={140} textAlign="center">Team 2</Heading>
                </HStack>
                <ScrollView >
                    <VStack w="100%" >
                        <HStack w="100%" justifyContent="space-between" px={2} >
                            <Square size={140} bg="white"></Square>
                            <Square size={140} bg="white"></Square>
                        </HStack>
                    </VStack>
                    <HStack w="100%" flex="1" justifyContent="space-between" >
                        <VStack mx={2}>
                        {
                            data.map((item) => <Player name={item.text} image={item.image} />)
                        }
                        </VStack>
                        <VStack flex="1" my={2}>
                            <Center h='140' w="100%" alignItems="center" ><Text>Captain</Text></Center>
                            <Center h='140' w="auto"><Text></Text></Center>
                            <Center h='140' w="auto"><Text>3v3</Text></Center>
                            <Center h='140' w="auto"><Text>4v4</Text></Center>
                            <Center h='140' w="auto"><Text>5v5</Text></Center>
                        </VStack>
                        <VStack mx={2}>
                        {
                            data.map((item) => <Player name={item.text} image={item.image} />)
                        }
                        </VStack>
                    </HStack>
                </ScrollView>
            </VStack>
        </Center>
        </DraxProvider>
    );
};

export const Draxtesting: React.FC<PickupSessionProps> = (props) => {

    return (
        <DraxProvider>
        <View style={styles.container}>
            <DraxList
            data={data}
            horizontal
            renderItemContent={({ item }) => (
                <Player name={item.text} image={item.image} />
            )}
            keyExtractor={(item: any) => item.id}
            onItemReorder={() => console.log('Reordered')}
            />
        </View>
        </DraxProvider>
    );
}

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