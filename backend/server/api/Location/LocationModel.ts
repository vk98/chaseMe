import mongoose from 'mongoose';
import { Double } from 'bson';

const Schema = mongoose.Schema;

export interface ILocationModel extends mongoose.Document {
    _id: string;
    lat: Double;
    lng: Double;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

const schema = new Schema({
  lat: Number,
  lon: Number,
  userId: String,
  createdAt: Date,
  updatedAt: Date
},
{
    timestamps: true
});

export const LocationModel = mongoose.model<ILocationModel>("locations", schema);