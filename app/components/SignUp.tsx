import { Formik } from "formik";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

interface SignupValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signupSchema = Yup.object().shape({
  fullName: Yup.string().min(3).required("Full name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(6).required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password required"),
});

const SignUp: React.FC = () => {
  return (
    <Formik<SignupValues>
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={signupSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleSubmit, values, errors, touched, isValid }) => (
        <View style={styles.container}>
          <Text>Full name</Text>
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            onChangeText={handleChange("fullName")}
            value={values.fullName}
          />
          {touched.fullName && (
            <Text style={styles.error}>{errors.fullName}</Text>
          )}

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

          <Text>Confirm Password</Text>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            style={styles.input}
            onChangeText={handleChange("confirmPassword")}
            value={values.confirmPassword}
          />
          {touched.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          )}

          <Button
            title="Register"
            onPress={() => handleSubmit()}
            disabled={!isValid}
          />
        </View>
      )}
    </Formik>
  );
};

export default SignUp;

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
});
