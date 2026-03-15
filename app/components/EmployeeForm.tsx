import { Formik } from "formik";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";

interface EmployeeFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
}

const employeeSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
    .required("Phone is required"),
  position: Yup.string().min(3, "Must be at least 3 characters").required("Position is required"),
});

const EmployeeForm: React.FC = () => {
  // Local state for our styling and mock API loading
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik<EmployeeFormValues>
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          position: "",
        }}
        validationSchema={employeeSchema}
        onSubmit={(values, { resetForm }) => {
          setIsLoading(true); // Start the loading spinner
          
          // Mock API !!!!!!!!!!!
          setTimeout(() => {
            console.log("Employee Data Submitted:", values);
            Alert.alert("Success", "Employee successfully onboarded!");
            setIsLoading(false); // Stop the spinner
            resetForm(); // Form reset functionality (Bonus Mark!)
          }, 2000); // 2-second fake delay
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, handleReset, values, errors, touched, isValid, dirty }) => (
          <View>
            {/* First Name */}
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="Enter first name"
              style={[
                styles.input,
                focusedInput === "firstName" && styles.inputFocused,
                touched.firstName && errors.firstName && styles.inputError,
              ]}
              onChangeText={handleChange("firstName")}
              onBlur={() => { handleBlur("firstName"); setFocusedInput(null); }}
              onFocus={() => setFocusedInput("firstName")}
              value={values.firstName}
            />
            {touched.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

            {/* Last Name */}
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              placeholder="Enter last name"
              style={[
                styles.input,
                focusedInput === "lastName" && styles.inputFocused,
                touched.lastName && errors.lastName && styles.inputError,
              ]}
              onChangeText={handleChange("lastName")}
              onBlur={() => { handleBlur("lastName"); setFocusedInput(null); }}
              onFocus={() => setFocusedInput("lastName")}
              value={values.lastName}
            />
            {touched.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter email"
              style={[
                styles.input,
                focusedInput === "email" && styles.inputFocused,
                touched.email && errors.email && styles.inputError,
              ]}
              onChangeText={handleChange("email")}
              onBlur={() => { handleBlur("email"); setFocusedInput(null); }}
              onFocus={() => setFocusedInput("email")}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Phone */}
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              placeholder="Enter 10-digit phone number"
              style={[
                styles.input,
                focusedInput === "phone" && styles.inputFocused,
                touched.phone && errors.phone && styles.inputError,
              ]}
              onChangeText={handleChange("phone")}
              onBlur={() => { handleBlur("phone"); setFocusedInput(null); }}
              onFocus={() => setFocusedInput("phone")}
              value={values.phone}
              keyboardType="numeric"
            />
            {touched.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            {/* Position */}
            <Text style={styles.label}>Position</Text>
            <TextInput
              placeholder="Enter job position"
              style={[
                styles.input,
                focusedInput === "position" && styles.inputFocused,
                touched.position && errors.position && styles.inputError,
              ]}
              onChangeText={handleChange("position")}
              onBlur={() => { handleBlur("position"); setFocusedInput(null); }}
              onFocus={() => setFocusedInput("position")}
              value={values.position}
            />
            {touched.position && <Text style={styles.errorText}>{errors.position}</Text>}

            {/* Submit & Reset Buttons */}
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#007BFF" />
              ) : (
                <>
                  <View style={styles.buttonWrapper}>
                    <Button
                      title="Submit Employee"
                      onPress={() => handleSubmit()}
                      disabled={!(isValid && dirty)}
                      color="#007BFF"
                    />
                  </View>
                  <View style={styles.buttonWrapper}>
                    <Button
                      title="Reset Form"
                      onPress={() => handleReset()}
                      color="#dc3545" // Red color for reset button
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default EmployeeForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
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
  buttonContainer: {
    marginTop: 15,
  },
  buttonWrapper: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden", 
  },
});