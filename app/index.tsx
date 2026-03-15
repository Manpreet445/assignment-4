import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmployeeForm from "./components/EmployeeForm";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const Stack = createNativeStackNavigator();
export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="EmployeeForm" component={EmployeeForm} />
    </Stack.Navigator>
  );
}
