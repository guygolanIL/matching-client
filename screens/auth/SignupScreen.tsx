import React from 'react';
import { Text, View } from 'react-native';

import { Button } from '../../components/design-system/Button/Button';
import { ClickableText } from '../../components/design-system/ClickableText/ClickableText';
import { FormTextField } from '../../components/design-system/FormTextField/FormTextField';
import { useAuth } from '../../contexts/auth';
import { useFormValues } from '../../hooks/useFormValues';
import { AuthScreenProps } from '../../navigation/auth/AuthNavigator';
import { AuthFormFields } from './types';
import * as Styling from '../../components/design-system/style';

const useStyles = Styling.createStyles(() => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
}));

export function SignupScreen({ navigation }: AuthScreenProps<'Signup'>) {
  const styles = useStyles();
  const { signUp: {
    isLoading,
    mutate
  } } = useAuth();

  const { values, change } = useFormValues<AuthFormFields>({
    email: '',
    password: ''
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <View style={styles.separator} />

      <FormTextField
        keyboardType="email-address"
        placeholder='Email'
        onChange={e => change('email', e.nativeEvent.text)}
      />

      <FormTextField
        secureTextEntry
        placeholder='Password'
        onChange={e => change('password', e.nativeEvent.text)}
      />

      <Button
        loading={isLoading}
        label='Sign up'
        onPress={
          () => mutate(
            { email: values.email, password: values.password },
            () => navigation.navigate('Signin')
          )
        } />
      <ClickableText onPress={() => navigation.navigate('Signin')}>Already signed up? Sign in!</ClickableText>
    </View>
  );
}