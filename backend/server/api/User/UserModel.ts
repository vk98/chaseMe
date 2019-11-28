import mongoose from 'mongoose';
import {ICarModel} from '../Car/CarModel';
const Schema = mongoose.Schema;

export interface IUserModel extends mongoose.Document {
    _id: string;
    name: string;
    cars: ICarModel[];
    password?: string;
    email: string;
    socialNetworkId: string;
    friends: string[];
    createdAt: Date;
    updatedAt: Date;
};

const schema = new Schema({
  name: String,
  cars: Array,
  password: String,
  email: String,
  socialNetworkId: String,
  friends: Array
},
{
    timestamps: true
});

export const UserModel = mongoose.model<IUserModel>("users", schema);