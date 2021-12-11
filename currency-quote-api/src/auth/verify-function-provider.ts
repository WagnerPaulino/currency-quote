import { Provider } from "@loopback/context";
import { repository } from "@loopback/repository";
import { BasicVerifyFunction } from "passport-http";
import { INVALID_USER_CREDENTIALS_MESSAGE } from "../messages/messages";
import { User } from "../models";
import { UserRepository } from "../repositories";

export class VerifyFunctionProvider
    implements Provider<BasicVerifyFunction>
{
    constructor(@repository(UserRepository) private userRepo: UserRepository) { }

    value(): BasicVerifyFunction {
        const myThis = this;
        return async function (
            username: string,
            password: string,
            cb: Function,
        ) {
            let user: User;
            try {
                const users: User[] = await myThis.userRepo.find({
                    where: { username: username },
                });
                if (users.length < 1) {
                    let error = new Error(INVALID_USER_CREDENTIALS_MESSAGE);
                    throw error;
                }
                user = users[0];
                if (user.password !== password) {
                    let error = new Error(INVALID_USER_CREDENTIALS_MESSAGE);
                    throw error;
                }
                cb(null, user);
            } catch (error) {
                cb(error, null);
            }
        };
    }
}