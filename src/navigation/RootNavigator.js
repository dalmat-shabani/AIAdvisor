import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CareerDetailsScreen from '../screens/CareerDetailsScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CareerDetails"
        component={CareerDetailsScreen}
        options={({ route }) => ({
          title: route.params.career.title,
          headerBackTitle: 'Back',
        })}
      />
    </Stack.Navigator>
  );
}
