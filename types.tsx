/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */


import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HomeScreen from "./src/screens/HomeScreen";
import ViewItem from "./src/screens/ViewItem";


declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  OnBoarding: undefined;
  ViewItem: {
    item:{
      idMeal: string; strMeal: string; strMealThumb: string
    }
  };
  HomeScreen: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;


