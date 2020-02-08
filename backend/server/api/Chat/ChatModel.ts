import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IChatModel extends mongoose.Document {
    _id: string;
    senderId: string
    roomId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
};

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