import React from 'react';
import HomeScreen from '../modules/home/screens/home';
import {PATH} from './paths.config';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import MaIcon from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from '../modules/auth/screens/login';
import LikesScreen from '../modules/likes/screens/likes';
import GroupsScreen from '../modules/groups/screens/groups';
import PostsScreen from '../modules/posts/screens/posts';

type TScreen = {
  name: string;
  component: React.FC;
  icon: () => React.ReactElement;
};

export const privateScreens: TScreen[] = [
  {
    name: PATH.HOME,
    component: HomeScreen,
    icon: () => <FaIcon name="home" size={20} />,
  },
  {
    name: PATH.LIKES,
    component: LikesScreen,
    icon: () => <FaIcon name="heart" size={20} />,
  },
  {
    name: PATH.GROUPS,
    component: GroupsScreen,
    icon: () => <FaIcon name="users" size={20} />,
  },
  {
    name: PATH.POSTS,
    component: PostsScreen,
    icon: () => <MaIcon name="article" size={20} />,
  },
];

export const publicScreens: TScreen[] = [
  {
    name: PATH.LOGIN,
    component: LoginScreen,
    icon: () => <FaIcon name="user" size={20} />,
  },
];
