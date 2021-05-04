import React, { Fragment, useRef, useState } from "react";
import { StatusBar, TextInput as RNTextInput } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Box, Text } from "../components/Theme";
import { AlertType, TextInput, Alert } from "../components";
import Button from "../components/Button";
import { registerNewUser } from "./utils";
import { AuthNavigationProps } from "../components/Navigation";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(64, "Name is too long!")
    .required("Please enter your name."),
  email: Yup.string()
    .email("Email is invalid.")
    .required("Please enter your Email."),
  password: Yup.string()
    .min(4, "Password is too short!")
    .max(50, "Password is too long!")
    .required("Please enter your password."),
  confirmPassword: Yup.string()
    .equals([Yup.ref("password")], "Passwords are not same!")
    .required("Please confirm your password."),
});

const Register = ({ navigation }: AuthNavigationProps<"Register">) => {
  const [alert, setAlert] = useState<AlertType | null>(null);

  const email = useRef<RNTextInput>(null);
  const password = useRef<RNTextInput>(null);
  const confirmPassword = useRef<RNTextInput>(null);

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: RegisterSchema,
      initialValues: { name: "", email: "", password: "", confirmPassword: "" },
      onSubmit: async ({ name, email, password }) => {
        const res = await registerNewUser({
          name,
          email,
          password,
          diaries: [],
        });
        if (res === "SUCCESS") navigation.replace("Home");
        else if (res === "DUPLICATED_USER")
          setAlert({ variant: "ERROR", message: "Your email is duplicated!" });
        else
          setAlert({
            variant: "ERROR",
            message: "There is an error please try again!",
          });
      },
    }
  );
  return (
    <Fragment>
      {alert && (
        <Alert
          variant={alert.variant}
          message={alert.message}
          setAction={setAlert}
        />
      )}
      <StatusBar barStyle="dark-content" />
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
      >
        <Text variant="heading4" marginTop="m">
          Let’s Get Started
        </Text>
        <Text variant="smallTextRegular">Create an new account</Text>
        <Box width="80%" marginTop="s">
          <TextInput
            icon="user"
            placeholder="Full Name"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            error={errors.name}
            touched={touched.name}
            autoCompleteType="name"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel="next"
            onSubmitEditing={() => email.current?.focus()}
          />
          {touched.name && errors.name && (
            <Text variant="smallTextBold" color="red">
              * {errors.name}
            </Text>
          )}
        </Box>
        <Box width="80%" marginTop="s">
          <TextInput
            ref={email}
            icon="mail"
            placeholder="Your Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            autoCompleteType="email"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel="next"
            onSubmitEditing={() => password.current?.focus()}
          />
          {touched.email && errors.email && (
            <Text variant="smallTextBold" color="red">
              * {errors.email}
            </Text>
          )}
        </Box>
        <Box width="80%" marginTop="s">
          <TextInput
            ref={password}
            icon="lock"
            placeholder="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            autoCompleteType="password"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel="next"
            secureTextEntry
            onSubmitEditing={() => confirmPassword.current?.focus()}
          />
          {touched.password && errors.password && (
            <Text variant="smallTextBold" color="red">
              * {errors.password}
            </Text>
          )}
        </Box>
        <Box width="80%" marginTop="s">
          <TextInput
            ref={confirmPassword}
            icon="lock"
            placeholder="Password Again"
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            autoCompleteType="password"
            autoCapitalize="none"
            returnKeyType="done"
            returnKeyLabel="done"
            secureTextEntry
            onSubmitEditing={() => handleSubmit()}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text variant="smallTextBold" color="red">
              * {errors.confirmPassword}
            </Text>
          )}
        </Box>
        <Button
          title="Sign Up"
          variant="primary"
          large
          onPress={handleSubmit}
          containerProps={{ marginTop: "m" }}
        />
        <Button
          title="Sign In"
          variant="link"
          large
          onPress={() => navigation.navigate("Login")}
          description="have a account?"
          containerProps={{ marginTop: "m" }}
        />
      </Box>
    </Fragment>
  );
};

export default Register;
