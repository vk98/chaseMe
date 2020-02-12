import React from 'react';
import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	ImageBackground,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import ProfileItem from '../components/ProfileItem';
import Demo from '../assets/data/demo.js';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserData, setUserData } from '../redux/actions/UserActions';

class UserProfile extends React.Component {
    constructor(props){
        super(props);
        this.props.getUserData();
    }
	static navigationOptions = {
		header: null
	};
	render() {
		return (
			<ImageBackground
				source={{uri: this.props.images[0]}}
				style={styles.bg}
			>
				<ScrollView style={styles.container}>
					<ImageBackground source={Demo[7].image} style={styles.photo}>
						<View style={styles.top}>
							<TouchableOpacity onPress={()=> this.props.navigation.navigate('Explore')}>
								<Text style={styles.topIconLeft}>&#xf004;</Text>
							</TouchableOpacity>

							<TouchableOpacity>
								<Text style={styles.topIconRight}>&#xf142;</Text>
							</TouchableOpacity>
						</View>
					</ImageBackground>

					<ProfileItem
						name={this.props.name}
						age={''}
						location={this.props.address}
						info1={this.props.description}
						info2={''}
						info3={''}
						info4={''}
					/>

					<View style={styles.actions}>
						<TouchableOpacity style={styles.circledButton}>
							<Text style={styles.iconButton}>&#xf141;</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.roundedButton}>
							<Text style={styles.iconButton}>&#xf4ac;</Text>
							<Text style={styles.textButton}>Start chatting</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: { marginHorizontal: 0 },
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
	}
});
Map.propTypes = {
    setUserData: PropTypes.func.isRequired,
	getUserData: PropTypes.func.isRequired,
	images: PropTypes.array.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    friends: PropTypes.array,
    cars: PropTypes.array,
    address: PropTypes.string,
    description: PropTypes.string

};

const mapStateToProps = state => ({
	images: state.userData.images,
    name: state.userData.name,
	email: state.userData.email,
	friends: state.userData.friends,
    cars: state.userData.cars,
    address: state.userData.address,
    description: state.userData.description
});

export default connect(mapStateToProps, { setUserData, getUserData })(UserProfile);
