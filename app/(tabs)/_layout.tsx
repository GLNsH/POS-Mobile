import React, {useContext} from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { MenuContext } from '@/context/menuContext';
import { MenuContextType } from '@/@types';

export default function TabLayout() {
  const {categoryLookup} = useContext(MenuContext) as MenuContextType;
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: '#f37b2d' }}
      screenListeners={{tabPress: () => categoryLookup('all')}}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerRight: () => (
              <Link href={"/cart"} asChild>
                  <Pressable>
                      {({ pressed }) => (
                          <FontAwesome
                          name="shopping-cart"
                          size={25}
                          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                          />
                      )}
                  </Pressable>
              </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="money" color={color} />,
        }}
      />
      <Tabs.Screen
        name="items"
        options={{
          title: 'Items',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cutlery" color={color} />,
        }}
      />
    </Tabs>
  );
}
