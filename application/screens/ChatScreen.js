import React from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'native-base';
import { getChatHistory, sendMessage, createChatRoom, getChatRooms } from '../redux/actions/ChatActions';

class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.receiverId = this.props.navigation.getParam('receiverId', null)
        if (this.props.roomId) {
            console.warn("gei");
            this.props.getChatHistory(this.props.roomId);
        }
        else if (this.receiverId) {
            this.props.getChatRooms(this.props.userData._id).then(() => {

                let chatRoomIndex = this.props.chatRooms.indexOf(elem => elem.participants.some(e => e == this.props.userData._id)
                    && elem.participants.some(e => e == this.receiverId) && elem.participants.length == 2);
                if (chatRoomIndex > -1) {
    
                    this.props.getChatHistory(this.props.chatRooms(chatRoomIndex)._id);
                }
                else {
    
                    this.props.createChatRoom({
                        "name": "Test Room2",
                        "participants": [this.receiverId, this.props.userData._id]
                    }).then(() => {
        
                        let chatRoomIndex = this.props.chatRooms.indexOf(elem => elem.participants.some(e => e == this.props.userData._id)
                            && elem.participants.some(e => e == this.receiverId) && elem.participants.length == 2);
                        this.props.getChatHistory(this.props.getChatRooms(chatRoomIndex)._id);
                    })
                }
            })

        }

    }

    onSend(messages = []) {
        // console.warn(messages);
        this.props.sendMessage({
            message: messages[0],
             roomId: this.props.currentRoom.roomId,
            senderId: this.props.userData._id
        })
    }

    render() {
        return (
            <View style={styles.container}>
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
    }
});
// ChatScreen.propTypes = {
//     setUserData: PropTypes.func.isRequired,
// 	getUserData: PropTypes.func.isRequired,
// 	images: PropTypes.array.isRequired,
//     name: PropTypes.string,
//     email: PropTypes.string,
//     friends: PropTypes.array,
//     cars: PropTypes.array,
//     address: PropTypes.string,
//     description: PropTypes.string

// };

const mapStateToProps = state => ({
    currentRoom: state.chatData.currentRoom,
    chatRooms: state.chatData.chatRooms,
    userData: state.userData
});

export default connect(mapStateToProps, { getChatHistory, sendMessage, createChatRoom, getChatRooms })(ChatScreen);