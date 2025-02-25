import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: { id: number }; // Extend as per your user model
}
