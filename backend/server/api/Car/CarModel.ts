import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ICarModel extends mongoose.Document {
    _id: string;
    name: string;
    brand: string;
    carModel: string;
    hp: number;
    createdAt: Date;
    updatedAt: Date;
};

const schema = new Schema({
  name: String,
  brand: String,
  model: String,
  hp: Number
},
{
    timestamps: true
});

export const CarModel = mongoose.model<ICarModel>("cars", schema);