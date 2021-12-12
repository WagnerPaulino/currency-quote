import { AuthenticationBindings, AuthenticationComponent } from '@loopback/authentication';
import { addExtension } from '@loopback/core';
import { ApplicationConfig, CurrencyQuoteApiApplication } from './application';
import { AuthSequence } from './auth/auth-sequence';
import { PassportBasicAuthProvider } from './auth/passport-basic-auth-provider';
import { VerifyFunctionProvider } from './auth/verify-function-provider';
import { UserRepository } from './repositories';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new CurrencyQuoteApiApplication(options);
  await app.boot();
  await app.start();

  app.component(AuthenticationComponent);

  // bind the user repo
  app.bind('repositories.users').toClass(UserRepository);

  // bind the authenticated sequence (mentioned later in this document)
  app.sequence(AuthSequence);

  // the verify function for passport-http
  app.bind('authentication.basic.verify').toProvider(VerifyFunctionProvider);

  // register PassportBasicAuthProvider as a custom authentication strategy
  addExtension(
    app,
    AuthenticationBindings.AUTHENTICATION_STRATEGY_EXTENSION_POINT_NAME,
    PassportBasicAuthProvider,
    {
      namespace:
        AuthenticationBindings.AUTHENTICATION_STRATEGY_EXTENSION_POINT_NAME,
    },
  );

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
