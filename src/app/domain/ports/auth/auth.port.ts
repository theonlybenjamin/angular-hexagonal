import { IUserSession } from "../../models/user-session.interface";
import { AuthDto } from "./auth.dto";

export interface AuthPort {
    login(loginUserInformation: IUserSession): Promise<AuthDto>;
}