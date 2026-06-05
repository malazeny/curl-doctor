import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return(
        <Tabs
            screenOptions = {{
                headerShown: false,
                tabBarActiveTintColor: "#111",
                tabBarInactiveTintColor: "#999",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 0,
                    paddingBottom: 24,
                    paddingTop: 12,
                    height: 90,
                },
            }}
        >
        <Tabs.Screen
            name = "dashboard"
            options = {{
                title: "Home",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="home" color={color} size={size} />
                ),
            }}
          />
    
          <Tabs.Screen
            name = "profile"
            options = {{
                title: "Profile",
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="person" color={color} size={size} />
                ),
            }}
          />

            <Tabs.Screen
            name="products"
            options={{
            title: "Products",
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="bag" color={color} size={size} />
            ),
        }}
    />
        </Tabs>
      );
    }
