import { Formik } from "formik";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

interface LoginValues {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password required"),
});

const SignIn: React.FC<any> = ({ navigation }) => {
  return (
    <Formik<LoginValues>
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        console.log(values);
        navigation.navigate("EmployeeForm");
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched, isValid }) => (
        <View style={styles.container}>
          <Text>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={handleChange("email")}
            value={values.email}
          />
          {touched.email && <Text style={styles.error}>{errors.email}</Text>}

          <Text>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            onChangeText={handleChange("password")}
            value={values.password}
          />
          {touched.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          <Button
            title="Sign In"
            onPress={() => handleSubmit()}
            disabled={!isValid}
          />

          <Button
            title="Create Account"
            onPress={() => navigation.navigate("SignUp")}
          />
        </View>
      )}
    </Formik>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
