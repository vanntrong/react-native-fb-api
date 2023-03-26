import React from 'react';
import HomeScreen from '../modules/home/screens/home';
import {PATH} from './paths.config';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import MaIcon from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from '../modules/auth/screens/login';
import LikesScreen from '../modules/likes/screens/likes';
import GroupsScreen from '../modules/groups/screens/groups';
import PostsScreen from '../modules/posts/screens/posts';

type TRenderIconParams = {focused: boolean; color: string; size: number};

type TScreen = {
  name: string;
  component: React.FC;
  icon: (params: TRenderIconParams) => React.ReactElement;
};

export const privateScreens: TScreen[] = [
  {
    name: PATH.HOME,
    component: HomeScreen,
    icon: ({color, size}) => {
      return <FaIcon name="home" size={size} color={color} />;
    },
  },
  {
    name: PATH.LIKES,
    component: LikesScreen,
    icon: ({color, size}) => <FaIcon name="heart" size={size} color={color} />,
  },
  {
    name: PATH.GROUPS,
    component: GroupsScreen,
    icon: ({size, color}) => <FaIcon name="users" size={size} color={color} />,
  },
  {
    name: PATH.POSTS,
    component: PostsScreen,
    icon: ({size, color}) => (
      <MaIcon name="article" size={size} color={color} />
    ),
  },
];

export const publicScreens: TScreen[] = [
  {
    name: PATH.LOGIN,
    component: LoginScreen,
    icon: () => <FaIcon name="user" size={20} />,
  },
];
