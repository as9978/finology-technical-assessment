import AsyncStorage from "@react-native-async-storage/async-storage";
import { CURRENT_USER, USERS, UserType } from "../Authentication/utils";

export type DiaryType = {
  title: string;
  body: string;
  date: string;
};

export const addNewDaiary = async (diary: DiaryType) => {
  try {
    const s_users = await AsyncStorage.getItem(USERS);
    const s_currentUserIndex = await AsyncStorage.getItem(CURRENT_USER);
    if (!s_users || !s_currentUserIndex) return "INVALID_USER";
    const users: UserType[] = JSON.parse(s_users);
    const currentUserIndex = JSON.parse(s_currentUserIndex);
    const currentUser = users[currentUserIndex];
    const newDiaries = currentUser.diaries;
    newDiaries.unshift(diary);
    users[currentUserIndex] = {
      ...currentUser,
      diaries: newDiaries,
    };
    await AsyncStorage.setItem(USERS, JSON.stringify(users));
    return "SUCCESS";
  } catch (error) {
    console.error(error);
    return "FAILED";
  }
};

export const getDiaries = async () => {
  try {
    const s_users = await AsyncStorage.getItem(USERS);
    const s_currentUserIndex = await AsyncStorage.getItem(CURRENT_USER);
    if (!s_users || !s_currentUserIndex) return "INVALID_USER";
    const users: UserType[] = JSON.parse(s_users);
    const currentUserIndex = JSON.parse(s_currentUserIndex);
    const currentUser = users[currentUserIndex];
    return currentUser;
  } catch (error) {
    console.error(error);
    return "FAILED";
  }
};

export const deleteDiary = async (index: number) => {
  try {
    const s_users = await AsyncStorage.getItem(USERS);
    const s_currentUserIndex = await AsyncStorage.getItem(CURRENT_USER);
    if (!s_users || !s_currentUserIndex) return "INVALID_USER";
    const users: UserType[] = JSON.parse(s_users);
    const currentUserIndex = JSON.parse(s_currentUserIndex);
    const currentUser = users[currentUserIndex];
    const newDiaries = currentUser.diaries;
    newDiaries.splice(index, 1);
    users[currentUserIndex] = {
      ...currentUser,
      diaries: newDiaries,
    };
    await AsyncStorage.setItem(USERS, JSON.stringify(users));
    return "SUCCESS";
  } catch (error) {
    console.error(error);
    return "FAILED";
  }
};

export const editDiary = async (diary: DiaryType, index: number) => {
  try {
    const s_users = await AsyncStorage.getItem(USERS);
    const s_currentUserIndex = await AsyncStorage.getItem(CURRENT_USER);
    if (!s_users || !s_currentUserIndex) return "INVALID_USER";
    const users: UserType[] = JSON.parse(s_users);
    const currentUserIndex = JSON.parse(s_currentUserIndex);
    const currentUser = users[currentUserIndex];
    const newDiaries = currentUser.diaries;
    newDiaries[index] = diary;
    console.log("Edit")
    console.log(newDiaries)
    users[currentUserIndex] = {
      ...currentUser,
      diaries: newDiaries,
    };
    await AsyncStorage.setItem(USERS, JSON.stringify(users));
    return "SUCCESS";
  } catch (error) {
    console.error(error);
    return "FAILED";
  }
};
