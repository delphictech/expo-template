import React from "react";
import type { RootState } from "~/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "~/redux/slices/counterSlice";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { View } from "react-native";

export default function TabThreeScreen() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View className="w-100 flex justify-between">
      <Button variant="destructive" onPress={() => dispatch(increment())}>
        <Text>Increment</Text>
      </Button>
      <View>
        <Text className="text-red-400">{count.toString()}</Text>
      </View>
      <Button onPress={() => dispatch(decrement())}>
        <Text>Decrement</Text>
      </Button>

      <View>
        <Text>
          mply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s, when
          an unknown printer took a galley of type and scrambled it to make a
          type specimen book. It has survived not only five centuries, but also
          the leap into electron
        </Text>
      </View>
    </View>
  );
}
