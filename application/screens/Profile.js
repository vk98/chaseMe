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
import { getUserProfile } from '../redux/actions/UserActions';

class Profile extends React.Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		console.log(this.props.user);
		this.props.getUserProfile(this.props.navigation.getParam('userId', null)).then(() => { this.render(); });
	}
	_isUserLoaded() {
		return !!this.props.user;
	}

	_openDropDownMenu(){
		
	}
	render() {
		return (
					<ImageBackground
						source={{uri: this.props.user.images[0] }}
						style={styles.bg}>
						<ScrollView style={styles.container}>
							<ImageBackground source={{uri: this.props.user.images[0] }} style={styles.photo}>
								<View style={styles.top}>
									<TouchableOpacity>
										<Text style={styles.topIconLeft}>&#xf004;</Text>
									</TouchableOpacity>

									<TouchableOpacity onPress={_openDropDownMenu()}>
										<Text style={styles.topIconRight}>&#xf142;</Text>
									</TouchableOpacity>
								</View>
							</ImageBackground>

							<ProfileItem
								matches={Demo[7].match}
								name={this.props.user.name}
								age={Demo[7].age}
								location={Demo[7].location}
								info1={Demo[7].info1}
								info2={Demo[7].info2}
								info3={Demo[7].info3}
								info4={Demo[7].info4}
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

Profile.propTypes = {
	getUserProfile: PropTypes.func.isRequired,
	user: PropTypes.object
}
const mapStateToProps = state => ({
	user: state.profileData.user
});

export default connect(mapStateToProps, { getUserProfile })(Profile);
