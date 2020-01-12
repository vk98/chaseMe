import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    ImageBackground,
    Dimensions,
    Text, Icon, TouchableOpacity, FlatList, Image
} from 'react-native';
import { Button, Content } from 'native-base';
import SettingsButton from '../components/SettingsButton';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserData, setUserData } from '../redux/actions/UserActions';
import Demo from '../assets/data/demo.js';
import {theme} from '../core/theme';

class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        //this.props.getUserData();
    }
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <ImageBackground
                source={require('../assets/images/bg.png')}
                style={styles.bg}
            >
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.top}>
                            <Text style={styles.title}>User Settings</Text>
                            <TouchableOpacity>
                                <Text style={styles.icon}>&#xf142;</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userShowup}>
                            <Image source={Demo[7].image} style={styles.avatar} />
                            <Text style={styles.userShowupName}>{Demo[7].name}</Text>
                        </View>
                        <SettingsButton icon={{name: "ios-person"}} name="Personal details"></SettingsButton>
                        <SettingsButton icon={{name: "logo-model-s"}} name="Cars"></SettingsButton>
                        <SettingsButton icon={{name: "ios-people"}} name="Friends"></SettingsButton>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: 10
    },
    bg: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    top: {
        paddingTop: 50,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: { paddingBottom: 10, fontSize: 22, color: '#363636' },
    icon: {
        fontFamily: 'tinderclone',
        fontSize: 20,
        color: '#363636',
        paddingRight: 10
    },
    avatar: {
		borderRadius: 30,
		width: 60,
		height: 60,
		marginRight: 20,
		marginVertical: 15
    },
    userShowup:{
        display: 'flex',
        justifyContent: "flex-start",
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "gray"
    },
    userShowupName:{
        fontSize: 25,
        paddingTop:"5%",
        color: theme.textColors.primary
    }
});
// UserSettings.propTypes = {
//     setUserData: PropTypes.func.isRequired,
//     getUserData: PropTypes.func.isRequired,
//     userImages: PropTypes.array.isRequired,
//     firstName: PropTypes.string,
//     lastName: PropTypes.string,
//     email: PropTypes.string,
//     friends: PropTypes.array,
//     cars: PropTypes.array,
//     address: PropTypes.string,
//     description: PropTypes.string

// };

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
