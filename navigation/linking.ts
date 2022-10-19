/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { RootStackParamList } from '.';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Auth: {
        screens: {
          Signin: 'signin',
          Signup: 'signup',
        },
      },
      App: {
        screens: {
          Main: {
            screens: {
              Feed: 'feed',
              Profile: 'profile',
              Settings: 'settings',
              Chats: {
                screens: {
                  Main: 'chats',
                  Chat: 'chat'
                }
              }
            }
          },
          Loading: 'loading',
          OnboardingWizard: {
            screens: {
              Name: 'name',
              Avatar: 'avatar',
              Loading: 'loading'
            }
          }
        }
      }
    },
  },
};

