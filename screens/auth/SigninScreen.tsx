import { StyleSheet } from 'react-native';
import { Button } from '../../components/Button/Button';
import { ClickableText } from '../../components/ClickableText/ClickableText';
import { FormTextField } from '../../components/FormTextField/FormTextField';
import { Text, View } from '../../components/Themed';
import { useAuth } from '../../contexts/auth';
import { useFormValues } from '../../hooks/useFormValues';
import { AuthScreenProps } from '../../navigation/auth/AuthNavigator';
import { AuthFormFields } from './types';

export function SigninScreen({ navigation }: AuthScreenProps<'Signin'>) {
  const { signIn: {
    isLoading,
    mutate
  } } = useAuth();

  const { values, change } = useFormValues<AuthFormFields>({
    email: '',
    password: ''
  });


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
            latitude: 0,
            longitude: 0
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
