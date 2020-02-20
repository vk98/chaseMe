import { Types as mongooseTypes } from 'mongoose';
import L from '../../common/logger'
import * as HttpStatus from 'http-status-codes';
import * as errors from "../../common/errors";

import { ChatModel as Chat, IChatModel, IChatModelWithUser } from './ChatModel';

export class ChatsService {

    async messagesForRoomId(roomId: string): Promise<IChatModelWithUser[]> {
        L.info(`Geting messages for room: ${roomId}`);

        const docs = await Chat
            .find({ roomId: roomId })
            .sort({createdAt: -1})
            .lean()
            .exec() as IChatModel[];

        return docs.map(message => ({
            ...message, user: { _id: message.senderId }
        }));
    }

    async byId(id: string): Promise<IChatModel> {
        L.info(`fetch chat with id ${id}`);

        if (!mongooseTypes.ObjectId.isValid(id)) throw new errors.HttpError(HttpStatus.BAD_REQUEST);

        const doc = await Chat
            .findOne({ $or: { senderId: id, receiverId: id } })
            .lean()
            .exec() as IChatModel;

        if (!doc) throw new errors.HttpError(HttpStatus.NOT_FOUND);

        return doc;
    }

    async create(chatData: IChatModel): Promise<IChatModel> {
        L.info(`Created new chat message with data: ${chatData}`);

        let doc = await Chat.create(chatData);

        return doc;
    }

    async patch(id: string, chatData: IChatModel): Promise<IChatModel> {
        L.info(`update chat with id ${id} with data ${chatData}`);

        const doc = await Chat
            .findOneAndUpdate({ _id: id }, { $set: chatData }, { new: true })
            .lean()
            .exec() as IChatModel;

        return doc;
    }

    async remove(id: string): Promise<void> {
        L.info(`delete chat with id ${id}`);

        return await Chat
            .findOneAndRemove({ _id: id })
            .lean()
            .exec();
    }
}

export default new ChatsService();