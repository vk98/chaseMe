import { Types as mongooseTypes } from 'mongoose';
import L from '../../common/logger'
import * as HttpStatus from 'http-status-codes';
import * as errors from "../../common/errors";

import { LocationModel as Location, ILocationModel } from './LocationModel';

export class LocationsService {
  calculateDistance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  async getAllActiveMarkers(userId: string): Promise<ILocationModel[]> {
    L.info('fetch all locations');

    let now = new Date();
    now = new Date(now.valueOf() - 300000); // 5 minutes before current time.
    console.log(now);
    let docs = await Location
      .find({ updatedAt: { $gte: now } }, { lat: 1, lon: 1, userId: 1, isActive: 1 })
      .lean()
      .exec();

    let currentMarker = docs.find(marker => marker.userId == userId);
    docs = docs
      .filter(marker => {
        let distance = this.calculateDistance(marker.lat, marker.lon, currentMarker.lat, currentMarker.lon);
        // console.log(distance, marker.userId, marker.userId != userId, distance <= 123, marker.isActive);
        return marker.userId != userId && marker.isActive && distance <= 123;
      })
      .map(marker => {
        return { latlng: { lat: marker.lat, lng: marker.lon }, userId: marker.userId };
      })

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

  async createNewMarker(locationData: ILocationModel): Promise<ILocationModel> {
    L.info(`create location with data ${locationData}`);

    const location = new Location(locationData);

    const doc = await location.save() as ILocationModel;

    return doc;
  }

  async updateExistingMarker(id: string, locationData: ILocationModel): Promise<ILocationModel> {
    L.info(`update location with userId ${id} with data ${locationData}`);

    const doc = await Location
      .findOneAndUpdate({ userId: id }, { $set: locationData }, { new: true, upsert: true })
      .lean()
      .exec() as ILocationModel;

    return doc;
  }
  async changeActivity(userId: string, data) {
    L.info(`Updating location for user: ${userId} with status: ${data.status ? 'active' : 'inactive'}`);

    const doc = await Location
      .findOneAndUpdate({ userId: userId }, { $set: { isActive: data.status } }, { new: true })
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