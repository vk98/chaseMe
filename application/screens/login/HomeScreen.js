import React, { memo } from 'react';
import Background from '../../components/login/Background';
import Logo from '../../components/login/Logo';
import Header from '../../components/login/Header';
import Button from '../../components/login/Button';
import Paragraph from '../../components/login/Paragraph';

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Chase Me</Header>

    <Paragraph>
      Challenge. Race. Win.
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Sign Up
    </Button>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Facebook
    </Button>
  </Background>
);

export default memo(HomeScreen);
