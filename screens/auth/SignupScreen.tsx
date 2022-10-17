import React, { useRef } from 'react';
import { Text, TextInput, View } from 'react-native';

import { Button } from '../../components/design-system/Button/Button';
import { ClickableText } from '../../components/design-system/ClickableText/ClickableText';
import { FormTextField } from '../../components/design-system/FormTextField/FormTextField';
import { useAuth } from '../../contexts/auth';
import { useFormValues } from '../../hooks/useFormValues';
import { AuthScreenProps } from '../../navigation/auth/AuthStackNavigator';
import * as Styling from '../../components/design-system/style';
import { RegisterRequestPayload } from '../../data/auth/api';

const useStyles = Styling.createStyles(({ theme }) => ({
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
    borderBottomColor: theme.palette.grey.light,
    borderBottomWidth: 1,
  },
}));

export function SignupScreen({ navigation }: AuthScreenProps<'Signup'>) {
  const styles = useStyles();
  const { signUp: {
    isLoading,
    mutate
  } } = useAuth();

  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const { values, change } = useFormValues<RegisterRequestPayload>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const submitHandler = () => mutate(
    { email: values.email, password: values.password, confirmPassword: values.confirmPassword },
    () => navigation.navigate('Signin')
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <View style={styles.separator} />

      <FormTextField
        returnKeyType='next'
        blurOnSubmit={false}
        onSubmitEditing={() => passwordRef.current?.focus()}
        keyboardType="email-address"
        placeholder='Email'
        onChange={e => change('email', e.nativeEvent.text)}
      />

      <FormTextField
        ref={passwordRef}

        returnKeyType='next'
        blurOnSubmit={false}
        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        secureTextEntry
        placeholder='Password'
        onChange={e => change('password', e.nativeEvent.text)}
      />

      <FormTextField
        ref={confirmPasswordRef}

        returnKeyType='done'
        secureTextEntry
        placeholder='Confirm password'
        onChange={e => change('confirmPassword', e.nativeEvent.text)}
        onSubmitEditing={submitHandler}
      />

      <Button
        loading={isLoading}
        label='Sign up'
        onPress={submitHandler} />
      <ClickableText onPress={() => navigation.navigate('Signin')}>Already signed up? Sign in!</ClickableText>
    </View>
  );
}