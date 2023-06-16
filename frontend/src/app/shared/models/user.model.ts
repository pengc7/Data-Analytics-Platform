import {Type} from "./type.model";

export interface User{
  username: string;
  password:string;
  types?: Type[];
}
