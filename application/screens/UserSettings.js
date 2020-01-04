import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    ImageBackground,
    Dimensions,
    Text, Icon
} from 'react-native';
import { Button, Content } from 'native-base';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserData, setUserData } from '../redux/actions/UserActions';
class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        this.props.getUserData();
    }
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <Content styles={styles.container}>
                <Button full >
                    <Text style={styles.icon}>&#xf142;</Text>
                    <Text>Back</Text>
                </Button>
                <Button  >
                    <Text style={styles.icon}>&#xf142;</Text>
                    <Text>Back</Text>
                </Button>
                <Button light>
                    <Text style={styles.icon}>&#xf142;</Text>
                    <Text>Back</Text>
                </Button>
                <Button  >
                    <Text style={styles.icon}>&#xf142;</Text>
                    <Text>Back</Text>
                </Button>
                <Button  >
                    <Text>Back</Text>
                    <Text style={styles.icon}>&#xf142;</Text>

                </Button>
                <Button  >
                    <Text style={styles.icon}>&#xf142;</Text>
                    <Text>Back</Text>
                </Button>
                <Button  >
                    <Text style={styles.icon}>&#xf142;</Text>
                    <Text>Back</Text>
                </Button>
            
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    container: { paddingTop: 30, marginHorizontal: 0 },
    bg: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    photo: {
        width: Dimensions.get('window').width,
        height: 450
    },
    top: {
        paddingTop: 50,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topIconLeft: {
        fontFamily: 'tinderclone',
        fontSize: 20,
        color: '#FFF',
        paddingLeft: 20,
        marginTop: -20,
        transform: [{ rotate: '90deg' }]
    },
    topIconRight: {
        fontFamily: 'tinderclone',
        fontSize: 20,
        color: '#FFF',
        paddingRight: 20
    },
    actions: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconButton: { fontFamily: 'tinderclone', fontSize: 20, color: '#FFF' },
    textButton: {
        fontFamily: 'tinderclone',
        fontSize: 15,
        color: '#FFF',
        paddingLeft: 5
    },
    circledButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#7444C0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    roundedButton: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#5636B8',
        paddingHorizontal: 20
    },
    icon: {
        fontFamily: 'tinderclone',
        fontSize: 20,
        color: '#363636',
        paddingRight: 10
    }
});
Map.propTypes = {
    setUserData: PropTypes.func.isRequired,
    getUserData: PropTypes.func.isRequired,
    userImages: PropTypes.array.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    friends: PropTypes.array,
    cars: PropTypes.array,
    address: PropTypes.string,
    description: PropTypes.string

};

const mapStateToProps = state => ({
    userImages: state.userData.userImages,
    firstName: state.userData.firstName,
    lastName: state.userData.lastName,
    email: state.userData.email,
    friends: state.userData.friends,
    cars: state.userData.cars,
    address: state.userData.address,
    description: state.userData.description
});

export default connect(mapStateToProps, { setUserData, getUserData })(UserSettings);
