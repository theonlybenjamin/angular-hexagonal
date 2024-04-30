import { Observable } from "../../mask/observable.mask";
import { IUserSession } from "../../models/user-session.interface";
import { AuthDto } from "./auth.dto";

export interface AuthPort {
    login(loginUserInformation: IUserSession): Observable<AuthDto>;
}