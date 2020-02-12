import React from 'react';
import MapView, { Marker, Circle } from 'react-native-maps';
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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMapMarkers, onRegionChange, changeUserLocationMarkerAcitvity, updateUserLocationMarker } from '../redux/actions/MapActions';
import { loginUser } from '../redux/actions/UserActions';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class Map extends React.Component {
	constructor(props) {
		super(props);
		
	}

	componentDidMount(){
		let locationObserver = setInterval(() => {
			this.props.updateUserLocationMarker(this.props.userData._id)
			this.props.getMapMarkers(this.props.userData._id);
		}, 10000);
		this.setState({
			locationObserver: locationObserver
		})
	}
	componentWillUnmount() {
		clearInterval(this.state.locationObserver)
	}
	static navigationOptions = {
		header: null
	};
	onPressMarker(userId) {
		this.props.navigation.navigate('Profile', {
			userId: userId
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					provider="google"
					region={this.props.mapData.region}
					onRegionChangeComplete={this.props.onRegionChange}
					showsUserLocation={true}
					followUserLocation={true}>
					<Circle
						center={{ latitude: this.props.mapData.myPosition.lastLat || 42, longitude: this.props.mapData.myPosition.lastLong || 23 }}
						radius={3000}
						strokeWidth={1}
						strokeColor={'#1a66ff'}
						fillColor={'rgba(230,238,255,0.5)'}

					/>
					{/* <Marker
						coordinate={{
							latitude: (this.props.mapData.myPosition.lastLat + 0.00050) || -36.82339,
							longitude: (this.props.mapData.myPosition.lastLong + 0.00050) || -73.03569,
						}}>
						<View>
							<Text style={{ color: '#000' }}>
								{this.props.mapData.myPosition.lastLong} / {this.props.mapData.myPosition.lastLat}
							</Text>
						</View>
					</Marker> */}
					{this.props.mapData.markers.map((marker, index) => (
						<Marker
							key="index"
							coordinate={{ latitude: marker.latlng.lat, longitude: marker.latlng.lng }}
							userId={marker.userId}
							onPress={this.onPressMarker.bind(this, marker.userId)}
						// onCalloutPress={this.onCalloutPressMarker.bind(marker.userId)}
						// title={marker.title}
						// description={marker.description}
						>

						</Marker>
					))}

				</MapView>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
		flex: 1
	},
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
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
	markerView: {
		backgroundColor: "#FFF",
		width: 150,
		height: 150,

	}
});


const mapStateToProps = state => ({
	mapData: state.mapData,
	userData: state.userData
});

export default connect(mapStateToProps, { getMapMarkers, loginUser, onRegionChange, changeUserLocationMarkerAcitvity, updateUserLocationMarker })(Map);
