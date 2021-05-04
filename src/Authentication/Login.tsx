import React, { Fragment, useRef, useState } from "react";
import { StatusBar, TextInput as RNTextInput } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Box, Text } from "../components/Theme";
import Button from "../components/Button";
import { Alert, AlertType, TextInput } from "../components";
import { login } from "./utils";
import { AuthNavigationProps } from "../components/Navigation";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid.")
    .required("Please enter your Email."),
  password: Yup.string()
    .min(4, "Password is too short!")
    .max(50, "Password is too long!")
    .required("Please enter your password."),
});

const Seperator = () => (
  <Box
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    width="80%"
    marginTop="l"
  >
    <Box width={135} height={0.5} backgroundColor="grey"></Box>
    <Text variant="heading5" marginHorizontal="s">
      OR
    </Text>
    <Box width={135} height={0.5} backgroundColor="grey"></Box>
  </Box>
);

const Login = ({ navigation }: AuthNavigationProps<"Login">) => {
  const [alert, setAlert] = useState<AlertType | null>(null);

  const password = useRef<RNTextInput>(null);

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: LoginSchema,
      initialValues: { email: "", password: "" },
      onSubmit: async ({ email, password }) => {
        const res = await login({ email, password });
        if (res === "SUCCESS") navigation.replace("Home");
        else if (res === "NOT_FOUND")
          setAlert({
            variant: "ERROR",
            message: "There is not any user with this email.",
          });
        else if (res === "INVALID_USER_PASS")
          setAlert({
            variant: "ERROR",
            message: "Username or password is incorrect!",
          });
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
          Welcome to Finology
        </Text>
        <Text variant="smallTextRegular">Sign in to continue</Text>
        <Box width="80%" marginTop="m">
          <TextInput
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
            returnKeyType="done"
            returnKeyLabel="done"
            secureTextEntry
            onSubmitEditing={() => handleSubmit()}
          />
          {touched.password && errors.password && (
            <Text variant="smallTextBold" color="red">
              * {errors.password}
            </Text>
          )}
        </Box>
        <Button
          title="Sign In"
          variant="primary"
          large
          onPress={handleSubmit}
          containerProps={{ marginTop: "m" }}
        />
        <Seperator />
        <Button
          title="Register"
          variant="link"
          large
          description="Don’t have a account?"
          onPress={() => navigation.navigate("Register")}
        />
      </Box>
    </Fragment>
  );
};

export default Login;
