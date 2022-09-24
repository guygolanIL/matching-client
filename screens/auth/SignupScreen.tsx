import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Button } from '../../components/Button/Button';
import { ClickableText } from '../../components/ClickableText/ClickableText';
import { FormTextField } from '../../components/FormTextField/FormTextField';

import { Text, View } from '../../components/Themed';
import { useAuth } from '../../contexts/auth';
import { useRegisterMutation } from '../../data/user/hooks/useRegisterMutation';
import { useFormValues } from '../../hooks/useFormValues';
import { AuthScreenProps } from '../../navigation/auth/AuthNavigator';
import { AuthFormFields } from './types';

export function SignupScreen({ navigation }: AuthScreenProps<'Signup'>) {
  const { mutate, isLoading } = useRegisterMutation({
    onSuccess: () => navigation.navigate('Signin')
  });
  const { values, change } = useFormValues<AuthFormFields>({
    email: '',
    password: ''
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

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

      <Button loading={isLoading} label='Sign up' onPress={() => mutate({ email: values.email, password: values.password })} />
      <ClickableText onPress={() => navigation.navigate('Signin')}>Already signed up? Sign in!</ClickableText>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
