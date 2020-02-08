import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IChatRoomModel extends mongoose.Document {
    _id: string;
    name: string;
    participants: string[];
    createdAt: Date;
    updatedAt: Date;
};

const schema = new Schema({
    name: String,
    participants: [],
    createdAt: Date,
    updatedAt: Date
},
{
    timestamps: true
});

export const ChatRoomModel = mongoose.model<IChatRoomModel>("chatRooms", schema);