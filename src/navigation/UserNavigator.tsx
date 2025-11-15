import { HeaderMenu } from "@/components/HeaderMenu";
import { CreateEventScreen } from "@/screens/CreateEventScreen";
import { CreateLocalScreen } from "@/screens/CreateLocalScreen";
import { EventDetailsScreen } from "@/screens/EventDetailsScreen";
import { EventListScreen } from "@/screens/EventListScreen";
import { HomeScreen } from "@/screens/HomeScreen";
import { LocationListScreen } from "@/screens/LocationListScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
  return (
    <Stack.Navigator screenOptions={{ header: () => <HeaderMenu /> }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="event-details" component={EventDetailsScreen} />
      <Stack.Screen name="event-list" component={EventListScreen} />
      <Stack.Screen name="profile" options={{ headerShown: false }} component={ProfileScreen} />
      <Stack.Screen name="create-event" component={CreateEventScreen} />
      <Stack.Screen name="locais-list" component={LocationListScreen} />
      <Stack.Screen name="create-local" component={CreateLocalScreen} />
    </Stack.Navigator>
  );
}
