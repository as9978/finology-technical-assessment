import React, { Fragment, useRef, useState } from "react";
import { TextInput as RNTextInput } from "react-native";
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  Alert,
  AlertType,
  Box,
  Button,
  RoundedIconButton,
  Text,
  TextInput,
} from "../components";
import { HomeNavigationProps } from "../components/Navigation";
import { addNewDaiary, editDiary } from "./util";

const newDiarySchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Title is too short!")
    .max(64, "Title is too long")
    .required("Please enter your title."),
  body: Yup.string()
    .min(4, "Your diary is too short!")
    .required("Please write a diary!"),
});

const AddNewDiary = ({
  navigation,
  route,
}: HomeNavigationProps<"AddNewDiary">) => {
  const { diary, index } = route.params;
  console.log(route.params);

  const [alert, setAlert] = useState<AlertType | null>(null);

  const body = useRef<RNTextInput>(null);

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: newDiarySchema,
      initialValues: {
        title: diary ? diary.title : "",
        body: diary ? diary.body : "",
      },
      onSubmit: async ({ title, body }) => {
        const today = new Date();
        const date =
          today.getMonth() + "-" + today.getDay() + "-" + today.getFullYear();
        if (diary && index !== undefined) {
          const res = await editDiary({ title, body, date }, index);
          if (res === "SUCCESS")
            setAlert({
              variant: "SUCCESS",
              message: "Diary edited successfully!",
            });
          else if (res === "INVALID_USER")
            setAlert({
              variant: "ERROR",
              message: "Please login into your account.",
            });
          else {
            setAlert({
              variant: "ERROR",
              message: "There is an error please try again.",
            });
          }
        } else {
          const res = await addNewDaiary({ title, body, date });
          if (res === "SUCCESS")
            setAlert({
              variant: "SUCCESS",
              message: "Diary added successfully!",
            });
          else if (res === "INVALID_USER")
            setAlert({
              variant: "ERROR",
              message: "Please login into your account.",
            });
          else {
            setAlert({
              variant: "ERROR",
              message: "There is an error please try again.",
            });
          }
        }
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
      <Box flex={1}>
        <Box marginVertical="xl" flexDirection="row" alignItems="center">
          <RoundedIconButton
            name="arrow-left"
            color="dark"
            backgroundColor="transparent"
            iconRatio={1}
            size={32}
            onPress={() => navigation.goBack()}
          />
          <Text variant="heading3" marginLeft="s">
            Add New Diary
          </Text>
        </Box>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Box>
            <TextInput
              icon="edit"
              defaultValue={diary ? diary.title : ""}
              placeholder="Title"
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              error={errors.title}
              touched={touched.title}
              autoCompleteType="off"
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() => body.current?.focus()}
            />
            {touched.title && errors.title && (
              <Text variant="smallTextBold" color="red" marginTop="s">
                * {errors.title}
              </Text>
            )}
          </Box>
          <Box marginVertical="m">
            <TextInput
              ref={body}
              defaultValue={diary ? diary.body : ""}
              icon="edit-3"
              placeholder="Write your diary ... "
              multiline
              numberOfLines={5}
              onChangeText={handleChange("body")}
              onBlur={handleBlur("body")}
              error={errors.body}
              touched={touched.body}
              autoCompleteType="off"
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() => handleSubmit()}
            />
            {touched.body && errors.body && (
              <Text variant="smallTextBold" color="red" marginTop="s">
                * {errors.body}
              </Text>
            )}
          </Box>
          <Button
            title={diary ? "Edit" : "Save"}
            variant="primary"
            containerProps={{ width: "100%" }}
            onPress={() => handleSubmit()}
          />
        </Box>
      </Box>
    </Fragment>
  );
};

export default AddNewDiary;
