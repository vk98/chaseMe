import { Types as mongooseTypes } from 'mongoose';
import L from '../../common/logger'
import * as HttpStatus from 'http-status-codes';
import * as errors from "../../common/errors";

import { LocationModel as Location, ILocationModel } from './LocationModel';

export class LocationsService {

  async all(): Promise<ILocationModel[]> {
    L.info('fetch all locations');

    const docs = await Location
      .find()
      .lean()
      .exec() as ILocationModel[];

    return docs;
  }

  async byId(id: string): Promise<ILocationModel> {
    L.info(`fetch location with id ${id}`);

    if (!mongooseTypes.ObjectId.isValid(id)) throw new errors.HttpError(HttpStatus.BAD_REQUEST);

    const doc = await Location
      .findOne({ _id: id })
      .lean()
      .exec() as ILocationModel;

    if (!doc) throw new errors.HttpError(HttpStatus.NOT_FOUND);

    return doc;
  }

  async create(locationData: ILocationModel): Promise<ILocationModel> {
    L.info(`create location with data ${locationData}`);

    const location = new Location(locationData);

    const doc = await location.save() as ILocationModel;

    return doc;
  }

  async patch(id: string, locationData: ILocationModel): Promise<ILocationModel> {
    L.info(`update location with id ${id} with data ${locationData}`);

    const doc = await Location
      .findOneAndUpdate({ _id: id }, { $set: locationData }, { new: true })
      .lean()
      .exec() as ILocationModel;

    return doc;
  }

  async remove(id: string): Promise<void> {
    L.info(`delete location with id ${id}`);

    return await Location
      .findOneAndRemove({ _id: id })
      .lean()
      .exec();
  }
}

export default new LocationsService();