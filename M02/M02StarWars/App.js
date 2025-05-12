import { NavigationContainer } from 
  "@react-navigation/native";
import { createDrawerNavigator } from 
  "@react-navigation/drawer";
import { createBottomTabNavigator } from 
  "@react-navigation/bottom-tabs";
  import { createStackNavigator } from 
  "@react-navigation/stack";
import { Platform } from "react-native";
import Planets from "./Planets";
import Films from './Films';
import Spaceships from './Spaceships';
import FilmDetails from "./FilmDetails";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainNavigator() {
  return Platform.OS === 'ios' ? (
    <Tab.Navigator>
      <Tab.Screen name='Planets' component={Planets} />
      <Tab.Screen name='Films' component={Films} />
      <Tab.Screen name='Spaceships' component={Spaceships} />
    </Tab.Navigator>
  ) : (
    <Drawer.Navigator>
      <Drawer.Screen name='Planets' component={Planets} />
      <Drawer.Screen name='Films' component={Films} />
      <Drawer.Screen name='Spaceships' component={Spaceships} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="FilmDetails" component={FilmDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}