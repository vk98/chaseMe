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
      Your amazing app starts here. Open you favourite code editor and start
      editing this project.
    </Paragraph>
    <Button mode="outlined" onPress={() => navigation.navigate('Swipe')}>
      Logout
    </Button>
  </Background>
);

export default memo(Dashboard);
