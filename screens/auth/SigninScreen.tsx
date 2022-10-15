import { View, Text, TextInput } from 'react-native';

import { Button } from '../../components/design-system/Button/Button';
import { ClickableText } from '../../components/design-system/ClickableText/ClickableText';
import { FormTextField } from '../../components/design-system/FormTextField/FormTextField';
import { useAuth } from '../../contexts/auth';
import { useFormValues } from '../../hooks/useFormValues';
import { AuthScreenProps } from '../../navigation/auth/AuthNavigator';
import { AuthFormFields } from './types';
import { useLocation } from '../../hooks/useLocation';
import { Spinner } from '../../components/design-system/Spinner/Spinner';
import { Error } from '../../components/design-system/Error/Error';
import * as Styling from '../../components/design-system/style';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

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

export function SigninScreen() {
  const navigation = useNavigation();
  const styles = useStyles();
  const { signIn: {
    isLoading,
    mutate
  } } = useAuth();

  const passwordRef = useRef<TextInput>(null);

  const { values, change } = useFormValues<AuthFormFields>({
    email: '',
    password: ''
  });

  const { location, isLoading: isLocationLoading, error } = useLocation();

  if (error) {
    return <Error message={error} />;
  }

  if (isLocationLoading) {
    return (
      <Spinner />
    );
  }

  const submitHandler = () => {
    mutate({
      email: values.email,
      password: values.password,
      latitude: location?.coords.latitude || 0,
      longitude: location?.coords.longitude || 0
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.separator} />
      <FormTextField

        returnKeyType='next'
        blurOnSubmit={false}
        onSubmitEditing={() => passwordRef.current?.focus()}
        textContentType='emailAddress'
        autoComplete='email'
        keyboardType='email-address'
        placeholder='Email'
        onChange={e => change('email', e.nativeEvent.text)}
      />

      <FormTextField
        ref={passwordRef}

        returnKeyType='done'
        onSubmitEditing={submitHandler}
        textContentType='password'
        autoComplete='password'
        secureTextEntry
        placeholder='Password'
        onChange={e => change('password', e.nativeEvent.text)}
      />

      <Button
        label='Sign in'
        loading={isLoading}
        onPress={submitHandler} />
      <ClickableText onPress={() => navigation.navigate('Auth', { screen: 'Signup' })}>Not signed up? Sign up!</ClickableText>

    </View>
  );
}