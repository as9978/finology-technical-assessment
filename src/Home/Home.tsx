import React, { Fragment, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { UserType } from "../Authentication/utils";
import {
  Alert,
  AlertType,
  Box,
  Button,
  RoundedIconButton,
  Text,
  useTheme,
} from "../components";
import { HomeNavigationProps } from "../components/Navigation";
import { DiaryType, getDiaries, deleteDiary as delete_diary } from "./util";

type diariesType = {
  title: string;
  body: string;
  date: string;
};

const Home = ({ navigation }: HomeNavigationProps<"Home">) => {
  const theme = useTheme();

  const [data, setData] = useState<DiaryType[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const [alert, setAlert] = useState<AlertType | null>(null);

  const getData = async () => {
    const res = await getDiaries();
    if (res === "INVALID_USER")
      setAlert({
        variant: "ERROR",
        message: "Please login into your account.",
      });
    else if (res === "FAILED")
      setAlert({
        variant: "ERROR",
        message: "There is an error please try again.",
      });
    else {
      setUser(res);
      setData(res.diaries);
    }
  };

  const deleteDiary = async (diaryIndex: number) => {
    const newDiaries = data;
    newDiaries.splice(diaryIndex, 1);
    setData(newDiaries);
    const res = await delete_diary(diaryIndex);
    if (res === "SUCCESS")
      setAlert({
        variant: "SUCCESS",
        message: "Diary have been deleted successfully!",
      });
    else if (res === "INVALID_USER")
      setAlert({
        variant: "ERROR",
        message: "Please login into your account.",
      });
    else if (res === "FAILED")
      setAlert({
        variant: "ERROR",
        message: "There is an error please try again!",
      });
    try {
    } catch (error) {
      console.error(error);
      setAlert({
        variant: "ERROR",
        message: "There is an error please try again!",
      });
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: diariesType;
    index: number;
  }) => (
    <Swipeable
      renderRightActions={() => (
        <Box
          justifyContent="center"
          alignItems="center"
          paddingHorizontal="m"
          backgroundColor="lightBlue"
          flexDirection="row"
        >
          <RoundedIconButton
            name="delete"
            color="red"
            backgroundColor="transparent"
            size={24}
            onPress={() => deleteDiary(index)}
            iconRatio={1}
          />
        </Box>
      )}
      renderLeftActions={() => (
        <Box
          justifyContent="center"
          alignItems="center"
          paddingHorizontal="m"
          backgroundColor="lightBlue"
          flexDirection="row"
        >
          <RoundedIconButton
            name="edit-2"
            color="orange"
            backgroundColor="transparent"
            size={24}
            onPress={() =>
              navigation.navigate("AddNewDiary", { diary: item, index })
            }
            iconRatio={1}
          />
        </Box>
      )}
      containerStyle={{
        marginBottom: index === data.length - 1 ? undefined : theme.spacing.m,
      }}
    >
      <Box
        flex={1}
        borderBottomWidth={index === data.length - 1 ? undefined : 0.5}
        borderColor="dark"
        paddingBottom="s"
        backgroundColor="white"
        paddingHorizontal="xs"
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="largeTextBold" color="blue">
            {item.title}
          </Text>
          <Text variant="smallTextBold">{item.date}</Text>
        </Box>
        <Text variant="mediumTextBold" color="dark">
          {item.body}
        </Text>
      </Box>
    </Swipeable>
  );

  const keyExtractor = (_: diariesType, index: number) => index.toString();

  useEffect(() => {
    getData();
  }, [data]);

  if (data.length === 0) {
    return (
      <Box flex={1} paddingTop="xl">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="heading2" color="dark">
            Hi, {user?.name}
          </Text>
          <RoundedIconButton
            name="plus"
            color="blue"
            backgroundColor="lightBlue"
            size={50}
            iconRatio={0.61}
            onPress={() =>
              navigation.navigate("AddNewDiary", { diary: undefined })
            }
          />
        </Box>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text variant="heading5">You dont have any diary !</Text>
          <Button
            variant="primary"
            title="Create New Diary"
            onPress={() =>
              navigation.navigate("AddNewDiary", { diary: undefined })
            }
            containerProps={{
              marginTop: "m",
            }}
          />
        </Box>
      </Box>
    );
  }

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
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop="xl"
          marginBottom="m"
        >
          <Text variant="heading2" color="dark">
            Hi, {user?.name}
          </Text>
          <RoundedIconButton
            name="plus"
            color="blue"
            backgroundColor="lightBlue"
            size={50}
            iconRatio={0.61}
            onPress={() =>
              navigation.navigate("AddNewDiary", { diary: undefined })
            }
          />
        </Box>
        <FlatList
          style={{ marginTop: theme.spacing.m }}
          showsVerticalScrollIndicator={false}
          bounces={false}
          {...{ data, renderItem, keyExtractor }}
        />
      </Box>
    </Fragment>
  );
};

export default Home;
