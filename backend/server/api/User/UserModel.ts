import mongoose from 'mongoose';
import { ICarModel } from '../Car/CarModel';
const Schema = mongoose.Schema;

export interface IUserModel extends mongoose.Document {
  _id: string;
  name: string;
  cars: ICarModel[];
  password?: string;
  email: string;
  socialNetworkId: string;
  awaitingFriendResponse: [];
  hasNewFriendRequest: boolean;
  friendRequests: [];
  friends: string[];
  address: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

const schema = new Schema({
  name: String,
  cars: Array,
  password: String,
  awaitingFriendResponse: Array,
  hasNewFriendRequest: Boolean,
  friendRequests: Array,
  email: String,
  socialNetworkId: String,
  friends: Array,
  address: String,
  description: String
},
  {
    timestamps: true
  });

export const UserModel = mongoose.model<IUserModel>("users", schema);