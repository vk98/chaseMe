import React, { memo } from 'react';
import Background from '../../components/login/Background';
import Logo from '../../components/login/Logo';
import Header from '../../components/login/Header';
import Paragraph from '../../components/login/Paragraph';
import Button from '../../components/login/Button';

const Dashboard = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
      Log in and connect with other car fans.
    </Paragraph>
    <Button mode="outlined" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
  </Background>
);

export default memo(Dashboard);
