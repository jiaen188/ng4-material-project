import { User } from "../domain";
import { Err} from '../domain/err.model';
export interface Auth {
  user?: User;
  userId?: string;
  token?: string;
  err?: Err;
}