import AsyncStorage from "@react-native-async-storage/async-storage";
import { DiaryType } from "../Home/util";

//AsyncStorage keys.
export const USERS = "users";
export const CURRENT_USER = "current_user";

export type UserType = {
  name: string;
  email: string;
  password: string;
  diaries: DiaryType[];
};

export type LoginUserType = {
  email: string;
  password: string;
};

export const registerNewUser = async (user: UserType) => {
  try {
    const s_currentUsers = await AsyncStorage.getItem(USERS);
    if (!s_currentUsers) {
      const newUsers = [];
      newUsers.push(user);
      await AsyncStorage.setItem(USERS, JSON.stringify(newUsers));
      await AsyncStorage.multiSet([
        [USERS, JSON.stringify(newUsers)],
        [CURRENT_USER, "0"],
      ]);
      return "SUCCESS";
    }
    const currentUsers: UserType[] = JSON.parse(s_currentUsers);
    if (currentUsers.findIndex((e) => e.email === user.email) === -1) {
      currentUsers.push(user);
      await AsyncStorage.multiSet([
        [USERS, JSON.stringify(currentUsers)],
        [CURRENT_USER, (currentUsers.length - 1).toString()],
      ]);
      return "SUCCESS";
    } else return "DUPLICATED_USER";
  } catch (error) {
    console.error(error);
    return "FAILED";
  }
};

export const login = async (user: LoginUserType) => {
  try {
    const s_currentUsers = await AsyncStorage.getItem(USERS);
    if (!s_currentUsers) return "NOT_FOUND";
    const currentUsers: UserType[] = JSON.parse(s_currentUsers);
    const currentUserIndex = currentUsers.findIndex(
      (e) => e.email === user.email
    );
    if (currentUserIndex === -1) return "NOT_FOUND";
    const currentUser = currentUsers[currentUserIndex];
    if (
      currentUser.email === user.email &&
      currentUser.password === user.password
    ) {
      await AsyncStorage.setItem(CURRENT_USER, currentUserIndex.toString());
      return "SUCCESS";
    } else return "INVALID_USER_PASS";
  } catch (error) {
    console.error(error);
    return "FAILED";
  }
};
