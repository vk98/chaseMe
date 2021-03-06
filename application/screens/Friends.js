import React from 'react';
import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	Dimensions,
	FlatList
} from 'react-native';
import CardItem from '../components/CardItem';
import Demo from '../assets/data/demo.js';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsersFriends } from '../redux/actions/UserActions';
import { Button } from 'react-native-paper';
import UsersServiceAPI from '../services/User.service';
import { Ionicons } from '@expo/vector-icons';


class Friends extends React.Component {
	static navigationOptions = {
		header: null
	};
	constructor(props){
		super(props);
		this.props.getUsersFriends();
	}
	render() {
		return (
			<ImageBackground
				source={require('../assets/images/bg.png')}
				style={styles.bg}
			>
				<View style={styles.container}>
					<ScrollView>
						<View style={styles.top}>
						<TouchableOpacity onPress={()=> this.props.navigation.navigate('Explore')}>
										<Ionicons name="ios-arrow-back" style={styles.topIconLeft}></Ionicons>
									</TouchableOpacity>
							<Text style={styles.title}>Friends</Text>
							<TouchableOpacity>
								<Text style={styles.icon}>&#xf142;</Text>
							</TouchableOpacity>
						</View>

						<FlatList
							numColumns={2}
							data={this.props.friends}
							renderItem={({ item }) => (
								<TouchableOpacity onPress={()=> this._onItemPressed(item._id)}>
									<CardItem
										image={{uri:item.images[0]}}
										name={item.name}
										status={"Online"}
										variant
									/>
								</TouchableOpacity>
							)}
							keyExtractor={(item, index) => index.toString()}
						/>
						<FlatList
							numColumns={2}
							data={this.props.awaitingRequests}
							renderItem={({ item }) => (
								<TouchableOpacity onPress={()=> this._onItemPressed(item._id)}>
									<CardItem
										image={{uri:item.images[0]}}
										name={item.name}
										status={"Online"}
										variant
									/>
									<TouchableOpacity onPress={()=> UsersServiceAPI.acceptFriendRequest(this.props.userData._id, item._id)}>
										<Button>Accept</Button>
									</TouchableOpacity>
									<TouchableOpacity onPress={()=> UsersServiceAPI.declineFriendRequest(this.props.userData._id, item._id)}>
										<Button>Decline</Button>
									</TouchableOpacity>
									

								</TouchableOpacity>
							)}
							keyExtractor={(item, index) => index.toString()}
						/>
					</ScrollView>
				</View>
			</ImageBackground>
		);
	}

	_onItemPressed(id){
		this.props.navigation.navigate('Profile',{
			userId: id
		});
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
	topIconLeft: {
		fontFamily: 'tinderclone',
		fontSize: 20,
		color: '#000',
		paddingLeft: 20,
	},
});

Friends.propTypes = {
	friends: PropTypes.array.isRequired,
	getUsersFriends: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ 
	userData: state.userData,
	friends: state.friendsData.friends,
	awaitingRequests: state.friendsData.awaitingRequests 
});

export default connect(mapStateToProps, { getUsersFriends })(Friends);
