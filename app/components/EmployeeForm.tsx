import { Formik } from "formik";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
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
    .min(2, "Too Short")
    .required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  position: Yup.string().min(3).required("Position is required"),
});

const EmployeeForm: React.FC = () => {
  return (
    <Formik<EmployeeFormValues>
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
      }}
      validationSchema={employeeSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched, isValid }) => (
        <View style={styles.container}>
          <Text>First Name</Text>
          <TextInput
            placeholder="First Name"
            style={styles.input}
            onChangeText={handleChange("firstName")}
            value={values.firstName}
          />
          {touched.firstName && (
            <Text style={styles.error}>{errors.firstName}</Text>
          )}

          <Text>Last Name</Text>
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            onChangeText={handleChange("lastName")}
            value={values.lastName}
          />
          {touched.lastName && (
            <Text style={styles.error}>{errors.lastName}</Text>
          )}

          <Text>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={handleChange("email")}
            value={values.email}
          />
          {touched.email && <Text style={styles.error}>{errors.email}</Text>}

          <Text>Phone</Text>
          <TextInput
            placeholder="Phone"
            style={styles.input}
            onChangeText={handleChange("phone")}
            value={values.phone}
            keyboardType="numeric"
          />
          {touched.phone && <Text style={styles.error}>{errors.phone}</Text>}

          <Text>Position</Text>
          <TextInput
            placeholder="Position"
            style={styles.input}
            onChangeText={handleChange("position")}
            value={values.position}
          />
          {touched.position && (
            <Text style={styles.error}>{errors.position}</Text>
          )}

          <Button
            title="Submit"
            onPress={() => handleSubmit()}
            disabled={!isValid}
          />
        </View>
      )}
    </Formik>
  );
};

export default EmployeeForm;

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
    marginBottom: 5,
  },
});
