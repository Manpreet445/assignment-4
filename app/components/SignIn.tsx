import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
  // Local state 
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  return (
    <Formik<LoginValues>
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        console.log("Signing in with:", values);
        navigation.navigate("EmployeeForm");
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            style={[
              styles.input,
              focusedInput === 'email' && styles.inputFocused,
              touched.email && errors.email && styles.inputError
            ]}
            onChangeText={handleChange("email")}
            onBlur={() => { handleBlur("email"); setFocusedInput(null); }}
            onFocus={() => setFocusedInput('email')}
            value={values.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={styles.label}>Password</Text>
          <View style={[
              styles.passwordContainer,
              focusedInput === 'password' && styles.inputFocused,
              touched.password && errors.password && styles.inputError
            ]}>
            <TextInputs
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              onChangeText={handleChange("password")}
              onBlur={() => { handleBlur("password"); setFocusedInput(null); }}
              onFocus={() => setFocusedInput('password')}
              value={values.password}
            />
            {/* The Bonus Toggle! */}
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="gray" />
            </TouchableOpacity>
          </View>
          {touched.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <View style={styles.buttonWrapper}>
            <Button
              title="Sign In"
              onPress={() => handleSubmit()}
              disabled={!isValid}
              color="#007BFF"
            />
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              title="Create Account"
              onPress={() => navigation.navigate("SignUp")}
              color="#6c757d"
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 5,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  eyeIcon: {
    padding: 10,
  },
  inputFocused: {
    borderColor: "#007BFF", // Blue highlight when focused
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#dc3545", // Red outline on error
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginBottom: 10,
  },
  buttonWrapper: {
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden", // Keeps the border radius clean 
  }
});