import React from 'react';
import { MapView, Marker } from 'react-native-maps';
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

class Map extends React.Component {
	
	constructor(props) {
		super(props);
		this.props.getMapMarkers();
		// this.myPosition = {};
		let initRegion = {
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		};
		this.state = {
			region: initRegion
		}
		//this.onRegionChange = this.onRegionChange.bind(this);
	}
	
	static navigationOptions = {
		header: null
	};
	componentDidUpdate = (nextProps) => {
		this.props.markers = nextProps.markers ? nextProps.markers : null;
		this.props.region = nextProps.region ? nextProps.region : null;
		this.props.myPosition = nextProps.myPosition ? nextProps.myPosition : null;
	}
	onRegionChange = (region) => {
		if(region)this.setState({ region });
	}
	render() {
		return (
			
				<MapView
					region={this.state.region}
					onRegionChange={this.onRegionChange.bind(this)}>
					{this.props.markers.map(marker => (
						<Marker
							coordinate={{latitude: marker.latlng.lat, longitude: marker.latlng.lng}}
							title={marker.title}
							description={marker.description}
						/>
					))}

				</MapView>
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

Map.propTypes = {
	getMapMarkers: PropTypes.func.isRequired,
	markers: PropTypes.array.isRequired,
	myPosition: PropTypes.any
};

const mapStateToProps = state => ({
	markers: state.mapData.markers,
	myPosition: state.mapData.myPosition
});

export default connect(mapStateToProps, { getMapMarkers })(Map);
