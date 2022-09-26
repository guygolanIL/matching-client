import { StyleSheet } from 'react-native';

import { Button } from '../../components/design-system/Button/Button';
import { ClickableText } from '../../components/design-system/ClickableText/ClickableText';
import { FormTextField } from '../../components/design-system/FormTextField/FormTextField';
import { Text, View } from '../../components/Themed';
import { useAuth } from '../../contexts/auth';
import { useFormValues } from '../../hooks/useFormValues';
import { AuthScreenProps } from '../../navigation/auth/AuthNavigator';
import { AuthFormFields } from './types';
import { useLocation } from '../../location/useLocation';
import { Spinner } from '../../components/design-system/Spinner/Spinner';
import { Error } from '../../components/design-system/Error/Error';

export function SigninScreen({ navigation }: AuthScreenProps<'Signin'>) {
  const { signIn: {
    isLoading,
    mutate
  } } = useAuth();

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FormTextField
        textContentType='emailAddress'
        autoComplete='email'
        keyboardType='email-address'
        placeholder='Email'
        onChange={e => change('email', e.nativeEvent.text)}
      />

      <FormTextField
        textContentType='password'
        autoComplete='password'
        secureTextEntry
        placeholder='Password'
        onChange={e => change('password', e.nativeEvent.text)}
      />

      <Button
        label='Sign in'
        loading={isLoading}
        onPress={() => {
          mutate({
            email: values.email,
            password: values.password,
            latitude: location?.coords.latitude || 0,
            longitude: location?.coords.longitude || 0
          }, () => navigation.getParent('auth')?.navigate('App'));
        }} />
      <ClickableText onPress={() => navigation.navigate('Signup')}>Not signed up? Sign up!</ClickableText>

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
