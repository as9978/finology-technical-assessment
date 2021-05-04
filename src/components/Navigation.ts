import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DiaryType } from "../Home/util";

export interface AuthNavigationProps<
  RouteName extends keyof AuthenticationRoutes
> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AppRoutes, "Home">,
    StackNavigationProp<AuthenticationRoutes, RouteName>
  >;
  route: RouteProp<AuthenticationRoutes, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: StackNavigationProp<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
}

export type AppRoutes = {
  Authentication: undefined;
  Home: undefined;
};

export type AuthenticationRoutes = {
  Login: undefined;
  Register: undefined;
};

export type HomeRoutes = {
  Home: undefined;
  AddNewDiary: {
    diary?: DiaryType;
    index?: number;
  };
};

// export type ExploreRoutes = {
//   Explore: undefined;
//   Search: undefined;
//   FavoriteProducts: {
//     title: string;
//   };
//   Notification: undefined;
//   SearchResults: undefined;
//   ProductDetails: ProductDetailsProps;
// };

// export type TabRoutes = {
//   Home: undefined;
//   Explore: undefined;
//   Cart: undefined;
//   Offer: undefined;
//   Account: undefined;
// };
