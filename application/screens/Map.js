import React from 'react';
import MapView, { Marker } from 'react-native-maps';
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
import { getMapMarkers } from '../redux/actions/MapActions';
import { getCurrentUserData } from '../redux/actions/UserActions';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class Map extends React.Component {
	initRegion = {
		latitude: 37.78825,
		longitude: 42.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};
	state = {
		region: null,
		lastLat: null,
		lastLong: null
	}
	constructor(props) {
		super(props);

		this.props.getMapMarkers();
		// this.myPosition = {};
		this.props.getCurrentUserData().then(data => console.warn('data is loaded')).catch(err => console.warn(`There is error: ${err}`)); //TODO - remove
		//this.onRegionChange = this.onRegionChange.bind(this);
	}


	
	async componentDidMount() {
		this.setState({
			region: null,
			lastLat: null,
			lastLong: null
		});
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			console.warn('Permission to access location was denied')
		}
		setInterval(async()=>{
			let location = await Location.getCurrentPositionAsync({});
			let region = {
				latitude: location.latitude,
				longitude: location.longitude,
				latitudeDelta: 0.00922 * 1.5,
				longitudeDelta: 0.00421 * 1.5
			}
			this.onRegionChange(region, region.latitude, region.longitude);
		}, 5000)
		

	}

	static navigationOptions = {
		header: null
	};
	componentDidUpdate = (nextProps) => {
		// this.props.markers = nextProps.markers ? nextProps.markers : null;
		// this.props.region = nextProps.region ? nextProps.region : null;
		// this.props.myPosition = nextProps.myPosition ? nextProps.myPosition : null;
	}
	onRegionChange(region, lastLat, lastLong) {
		console.log(region, lastLat, lastLong, this.state);
		
		this.setState({
			region: region,
			// If there are no new values set the current ones
			lastLat: lastLat || this.state.lastLat,
			lastLong: lastLong || this.state.lastLong
		});
	}
	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					provider="google"
					region={this.state.region}
					onRegionChange={this.onRegionChange}
					showsUserLocation={true}
					followUserLocation={true}>
					<Marker
						coordinate={{
							latitude: (this.state.lastLat + 0.00050) || -36.82339,
							longitude: (this.state.lastLong + 0.00050) || -73.03569,
						}}>
						<View>
							<Text style={{ color: '#000' }}>
								{this.state.lastLong} / {this.state.lastLat}
							</Text>
						</View>
					</Marker>
					{this.props.markers.map((marker, index) => (
						<Marker
							key="index"
							coordinate={{ latitude: marker.latlng.lat, longitude: marker.latlng.lng }}
							title={marker.title}
							description={marker.description}
						/>
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
	}
});

Map.propTypes = {
	getMapMarkers: PropTypes.func.isRequired,
	markers: PropTypes.array.isRequired,
	myPosition: PropTypes.any
};

const mapStateToProps = state => ({
	markers: state.mapData.markers,
	myPosition: state.mapData.myPosition
});

export default connect(mapStateToProps, { getMapMarkers, getCurrentUserData })(Map);
