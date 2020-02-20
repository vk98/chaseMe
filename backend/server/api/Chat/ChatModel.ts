import mongoose from 'mongoose';
import { IUserModel } from '../User/UserModel';

const Schema = mongoose.Schema;

export interface IChatSimpleModel{
    _id: string;
    senderId: string
    roomId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
};
export interface IChatModel extends mongoose.Document {
    _id: string;
    senderId: string
    roomId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
};
export interface IChatModelWithUser extends IChatSimpleModel{
    user: {
        _id: String
    }
}
const schema = new Schema({
    senderId: String,
    roomId: String,
    text: String,
    createdAt: Date,
    updatedAt: Date
},
{
    timestamps: true
});

export const ChatModel = mongoose.model<IChatModel>("chats", schema);