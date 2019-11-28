import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router'
import CarRoutes from './api/Car/CarRoutes';
import LocationRoutes from './api/Location/LocationRoutes';
import UserRoutes from './api/User/UserRoutes';
export default function routes(app: Application): void {
  app.use('/api/examples', examplesRouter);
  app.use('/api/cars', CarRoutes);
  app.use('/api/locations', LocationRoutes);
  app.use('/api/users', UserRoutes);
};