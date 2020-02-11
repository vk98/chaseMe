import React from 'react'
import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'native-base';
import { getChatHistory, sendMessage, createChatRoom, getChatRooms } from '../redux/actions/ChatActions';
import { Ionicons } from '@expo/vector-icons';
class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.receiverId = this.props.navigation.getParam('receiverId', null)
        let roomId = this.props.navigation.getParam('roomId', null);
        if (roomId) {
            this.props.getChatHistory(roomId);
        }
        else if (this.receiverId) {
            this.props.getChatRooms(this.props.userData._id).then(() => {
                let chatRoomIndex = this.props.chatRooms.findIndex(elem => elem.participants.some(e => e._id == this.props.userData._id)
                    && elem.participants.some(e => e._id == this.receiverId) && elem.participants.length == 2);
                if (chatRoomIndex > -1) {
                    this.props.getChatHistory(this.props.chatRooms[chatRoomIndex]._id);
                }
                else {

                    this.props.createChatRoom({
                        "name": "Chat",
                        "participants": [this.receiverId, this.props.userData._id]
                    }).then(() => {

                        let chatRoomIndex = this.props.chatRooms.findIndex(elem => elem.participants.some(e => e._id == this.props.userData._id)
                            && elem.participants.some(e => e._id == this.receiverId) && elem.participants.length == 2);
                        this.props.getChatHistory(this.props.chatRooms[chatRoomIndex]._id);
                    })
                }
            })

        }

    }

    onSend(messages = []) {
        this.props.sendMessage({
            message: messages[0],
            roomId: this.props.currentRoom.roomId,
            senderId: this.props.userData._id
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat')}>
                        <Ionicons name="ios-arrow-back" style={styles.topIconLeft}></Ionicons>
                    </TouchableOpacity>
                    <Text style={styles.title}>Name</Text>
                    <TouchableOpacity>
                        <Text style={styles.icon}>&#xf142;</Text>
                    </TouchableOpacity>
                </View>
                <GiftedChat
                    messages={this.props.currentRoom.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.props.userData._id,
                        name: this.props.userData.name,
                        avatar: 'https://placeimg.com/140/140/any'
                    }}
                />
                {
                    Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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


const mapStateToProps = state => ({
    currentRoom: state.chatData.currentRoom,
    chatRooms: state.chatData.chatRooms,
    userData: {
        _id: state.userData._id,
        name: state.userData._id
    }
});

export default connect(mapStateToProps, { getChatHistory, sendMessage, createChatRoom, getChatRooms })(ChatScreen);