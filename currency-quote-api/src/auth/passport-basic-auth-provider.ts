import { AuthenticationBindings, AuthenticationStrategy, UserProfileFactory } from '@loopback/authentication';
import { StrategyAdapter } from '@loopback/authentication-passport';
import { inject, Provider } from '@loopback/core';
import { BasicStrategy, BasicVerifyFunction } from 'passport-http';
import { User } from '../models';

export const AUTH_STRATEGY_NAME = 'basic'

export class PassportBasicAuthProvider implements Provider<AuthenticationStrategy> {

    constructor(
        @inject('authentication.basic.verify')
        private verifyFn: BasicVerifyFunction,
        @inject(AuthenticationBindings.USER_PROFILE_FACTORY)
        private myUserProfileFactory: UserProfileFactory<User>,
    ) { }

    value(): AuthenticationStrategy {
        const basicStrategy = this.configuredBasicStrategy(this.verifyFn);
        return this.convertToAuthStrategy(basicStrategy);
    }

    configuredBasicStrategy(verifyFn: BasicVerifyFunction): BasicStrategy {
        return new BasicStrategy(verifyFn);
    }

    convertToAuthStrategy(basic: BasicStrategy): AuthenticationStrategy {
        return new StrategyAdapter(
            basic,
            AUTH_STRATEGY_NAME,
            this.myUserProfileFactory,
        );
    }
}