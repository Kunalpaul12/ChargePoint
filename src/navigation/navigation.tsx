import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Search, Details} from '../screens';
import StaticImage from '../assets/icons';

const {homeActive, homeDisable, searchActive, searchDisable} = StaticImage;
const Tab = createBottomTabNavigator();
const headerShown: boolean = false;
const tabBarHideOnKeyboard = true;

type TabBarIconProps = {
  image: any;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({image}) => {
  return <Image source={image} />;
};

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

function HomeNavigation() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown,
        }}
      />
      <HomeStack.Screen
        name="Details"
        component={Details}
        options={{headerBackTitleVisible: false, headerTitleAlign: 'center'}}
      />
    </HomeStack.Navigator>
  );
}

function SearchNavigation() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown,
        }}
      />
      <SearchStack.Screen
        name="Details"
        component={Details}
        options={{headerBackTitleVisible: false, headerTitleAlign: 'center'}}
      />
    </SearchStack.Navigator>
  );
}

function RootNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Books"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon image={focused ? homeActive : homeDisable} />
          ),
          headerShown,
          tabBarHideOnKeyboard,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon image={focused ? searchActive : searchDisable} />
          ),
          headerShown,
          tabBarHideOnKeyboard,
        }}
      />
    </Tab.Navigator>
  );
}

export default RootNavigation;
