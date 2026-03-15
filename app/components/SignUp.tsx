import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

interface SignupValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signupSchema = Yup.object().shape({
  fullName: Yup.string().min(3, "Must be at least 3 characters").required("Full name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(6, "Must be at least 6 characters").required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password required"),
});

const SignUp: React.FC = () => {
  // Local state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik<SignupValues>
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signupSchema}
        onSubmit={(values) => console.log("Account created:", values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <View>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              style={[
                styles.input,
                focusedInput === 'fullName' && styles.inputFocused,
                touched.fullName && errors.fullName && styles.inputError
              ]}
              onChangeText={handleChange("fullName")}
              onBlur={() => { handleBlur("fullName"); setFocusedInput(null); }}
              onFocus={() => setFocusedInput('fullName')}
              value={values.fullName}
            />
            {touched.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

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
              <TextInput
                placeholder="Create a password"
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
                onChangeText={handleChange("password")}
                onBlur={() => { handleBlur("password"); setFocusedInput(null); }}
                onFocus={() => setFocusedInput('password')}
                value={values.password}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="gray" />
              </TouchableOpacity>
            </View>
            {touched.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <Text style={styles.label}>Confirm Password</Text>
            <View style={[
                styles.passwordContainer,
                focusedInput === 'confirmPassword' && styles.inputFocused,
                touched.confirmPassword && errors.confirmPassword && styles.inputError
              ]}>
              <TextInput
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
                style={styles.passwordInput}
                onChangeText={handleChange("confirmPassword")}
                onBlur={() => { handleBlur("confirmPassword"); setFocusedInput(null); }}
                onFocus={() => setFocusedInput('confirmPassword')}
                value={values.confirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="gray" />
              </TouchableOpacity>
            </View>
            {touched.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            <View style={styles.buttonWrapper}>
              <Button
                title="Register"
                onPress={() => handleSubmit()}
                disabled={!isValid}
                color="#007BFF"
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: 'center',
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
    borderColor: "#007BFF", 
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#dc3545", 
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginBottom: 10,
  },
  buttonWrapper: {
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden", 
  }
});