import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity } from 'react-native';

import AIAdvisorScreen from '../screens/AIAdvisorScreen';
import CareerScreen from '../screens/CareerScreen';
import FinanceScreen from '../screens/FinanceScreen';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: 'home-outline',
  Finance: 'wallet-outline',
  Advisor: 'sparkles-outline',
  Career: 'briefcase-outline',
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerLeft: () => (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.getParent()?.openDrawer()}>
            <Ionicons name="menu-outline" size={26} color="#0F172A" />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={TAB_ICONS[route.name]} size={size} color={color} />
        ),
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', headerTitle: 'AI Life Advisor' }}
      />
      <Tab.Screen
        name="Finance"
        component={FinanceScreen}
        options={{ title: 'Finance', headerTitle: 'Finance Overview' }}
      />
      <Tab.Screen
        name="Advisor"
        component={AIAdvisorScreen}
        options={{ title: 'Advisor', headerTitle: 'AI Advisor' }}
      />
      <Tab.Screen
        name="Career"
        component={CareerScreen}
        options={{ title: 'Career', headerTitle: 'Career Options' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 4,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  menuButton: {
    marginLeft: 16,
    padding: 4,
  },
});
