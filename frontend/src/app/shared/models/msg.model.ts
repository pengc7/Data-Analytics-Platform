import {Time} from "@angular/common";

export interface Msg{
  id?: number;
  username: string;
  email: string;
  message: string;
  timestmp: number;
}
