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
import { getUserData, setUserData, logoutUser } from '../redux/actions/UserActions';
import Demo from '../assets/data/demo.js';
import {theme} from '../core/theme';

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
                            <Image source={{uri: this.props.images[0]}} style={styles.avatar} />
                            <Text style={styles.userShowupName}>{this.props.name}</Text>
                        </View>
                        <SettingsButton icon={{name: "ios-person"}} name="Personal details" navigation={this.props.navigation} goTo='Explore'></SettingsButton>
                        <SettingsButton icon={{name: "logo-model-s"}} name="Cars" navigation={this.props.navigation} goTo='Swipe'></SettingsButton>
                        <SettingsButton icon={{name: "ios-people"}} name="Friends" navigation={this.props.navigation} goTo='Friends'></SettingsButton>
                        <TouchableOpacity onPress={()=>{this.props.logoutUser()}}>
                            <SettingsButton icon={{name: "ios-log-out"}} name="Logout" navigation={this.props.navigation} goTo='LoginScreen'></SettingsButton>
                        </TouchableOpacity>
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
//     images: PropTypes.array.isRequired,
//     firstName: PropTypes.string,
//     lastName: PropTypes.string,
//     email: PropTypes.string,
//     friends: PropTypes.array,
//     cars: PropTypes.array,
//     address: PropTypes.string,
//     description: PropTypes.string

// };

const mapStateToProps = state => ({
    images: state.userData.images,
    name: state.userData.name,
    email: state.userData.email,
    friends: state.userData.friends,
    cars: state.userData.cars,
    address: state.userData.address,
    description: state.userData.description
});

export default connect(mapStateToProps, { setUserData, getUserData, logoutUser })(UserSettings);
