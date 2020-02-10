import React from 'react';
import {
	StyleSheet,
	ScrollView,
	Text,
	TouchableOpacity,
	ImageBackground,
	Dimensions,
	View,
	FlatList
} from 'react-native';
import Message from '../components/Message';
import Demo from '../assets/data/demo.js';
import { getChatRooms } from '../redux/actions/ChatActions';
import { connect } from 'react-redux';


class Messages extends React.Component {
	constructor(props){
		super(props);
		this.props.getChatRooms(this.props.userData._id);
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
							<Text style={styles.title}>Messages</Text>
							<TouchableOpacity>
								<Text style={styles.icon}>&#xf142;</Text>
							</TouchableOpacity>
						</View>

						<FlatList
							data={this.props.chatRooms}
							renderItem={({ item }) => (
								<TouchableOpacity onPress={()=> this.props.navigation.navigate('ChatScreen',{roomId: item._id})}>
									<Message
										// image={}
										name={item.name}
										lastMessage={item.lastMessage}
									/>
								</TouchableOpacity>
							)}
							keyExtractor={(item, index) => index.toString()}
						/>
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
	}
});

const mapStateToProps = state => ({
	chatRooms: state.chatData.chatRooms,
	userData: {
		_id: state.userData._id
	}
});

export default connect(mapStateToProps, { getChatRooms })(Messages);
