import { Types as mongooseTypes } from 'mongoose';
import L from '../../common/logger'
import * as HttpStatus from 'http-status-codes';
import * as errors from "../../common/errors";

import { ChatRoomModel as ChatRoom, IChatRoomModel } from './ChatRoomModel';

export class ChatRoomsService {

    async getRoomsForId(id: string): Promise<IChatRoomModel[]> {
        L.info(`Geting rooms for user: ${id}`);
        const docs = await ChatRoom
            .find({ participants: { $in: [id] } })
            .populate({
                path: 'participants',
                select: 'name images _id'
            })
            .lean()
            .exec() as IChatRoomModel[];

        console.log(docs);
        return docs;
    }

    async updateLastText(message) {
        try {
            await ChatRoom.update({ _id: message.roomId }, { $set: { lastMessage: message.text } })
        } catch (err) {
            L.error(`Error while trying to update last text for: ${message}`);
        }
    }

    async byId(id: string): Promise<IChatRoomModel> {
        L.info(`fetch chatRoom with id ${id}`);

        if (!mongooseTypes.ObjectId.isValid(id)) throw new errors.HttpError(HttpStatus.BAD_REQUEST);

        const doc = await ChatRoom
            .findOne({ $or: { senderId: id, receiverId: id } })
            .lean()
            .exec() as IChatRoomModel;

        if (!doc) throw new errors.HttpError(HttpStatus.NOT_FOUND);

        return doc;
    }

    async create(chatRoomData: IChatRoomModel): Promise<IChatRoomModel> {
        L.info(`Created new chatRoom message with data: ${chatRoomData}`);

        const chatRoom = new ChatRoom(chatRoomData);

        const doc = await chatRoom.save() as IChatRoomModel;

        return doc;
    }

    async patch(id: string, chatRoomData: IChatRoomModel): Promise<IChatRoomModel> {
        L.info(`update chatRoom with id ${id} with data ${chatRoomData}`);

        const doc = await ChatRoom
            .findOneAndUpdate({ _id: id }, { $set: chatRoomData }, { new: true })
            .lean()
            .exec() as IChatRoomModel;

        return doc;
    }

    async remove(id: string): Promise<void> {
        L.info(`delete chatRoom with id ${id}`);

        return await ChatRoom
            .findOneAndRemove({ _id: id })
            .lean()
            .exec();
    }
}

export default new ChatRoomsService();