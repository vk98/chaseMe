import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {theme} from '../core/theme';
class SettingsButton extends React.Component {
    constructor(props){
        super(props);
    }
	render() {
		return (
			<TouchableOpacity style={styles.container}  onPress={() => this.props.navigation.navigate(this.props.goTo)}>
				<Ionicons color={theme.iconColors.primary} name={this.props.icon.name} size={40} />
                <Text style={styles.message}>{this.props.name}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		paddingHorizontal: 10,
        width: Dimensions.get('window').width - 100,
        paddingTop: 30,
        paddingBottom: 10
	},
	message: {
		color: theme.textColors.primary,
		fontSize: 20,
        paddingTop: 5,
        paddingLeft: 30
	}
});

export default SettingsButton;
