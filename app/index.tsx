import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Stack as ExpoStack } from "expo-router";
import EmployeeForm from "./components/EmployeeForm";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <>

      <ExpoStack.Screen options={{ headerShown: false }} /> 
      

      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignIn} options={{ title: "Login" }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Create Account" }} />
            <Stack.Screen name="EmployeeForm" component={EmployeeForm} options={{ title: "Employee Onboarding" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </>
  );
}