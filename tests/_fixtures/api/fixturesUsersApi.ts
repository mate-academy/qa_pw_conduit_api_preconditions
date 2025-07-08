import { test as base } from '@playwright/test';
import { request as apiRequest } from '@playwright/test';
import { UsersApi } from '../../../src/api/resources/UsersApi';
import { ApiClientFacade } from '../../../src/api/ApiClientFacade';

export const test = base.extend<{
  usersApi;
  registeredUser;
  registeredUserInBrowserContext;
  registeredUsers;
  userRequests;
}>({
  usersApi: async ({ request, logger }, use) => {
    const apiClientFacade = new ApiClientFacade({ request, logger });
    const client = new UsersApi(apiClientFacade);

    await use(client);
  },
  registeredUser: async ({ usersApi, user }, use) => {
    const response = await usersApi.registerNewUser(user);

    await usersApi.assertSuccessResponseCode(response);

    user['token'] = await usersApi.parseTokenFromBody(response);

    await use(user);
  },
  registeredUserInBrowserContext: async ({ request, users, browser }, use) => {
    const usersApi = new UsersApi(request);
    const response = await usersApi.registerNewUser(users[0]);

    await usersApi.assertSuccessResponseCode(response);

    users[0]['token'] = await usersApi.parseTokenFromBody(response);

    const context = await browser.newContext({
      storageState: {
        cookies: [
          {
            name: 'auth',
            value: await usersApi.parseTokenFromBody(response),
            domain: 'conduit.mate.academy',
            path: '/',
            expires: -1,
          },
        ],
        origins: [
          {
            origin: 'https://conduit.mate.academy',
            localStorage: [{ name: 'user', value: users[0] }],
          },
        ],
      },
    });

    const page = await context.newPage();

    await page.context().storageState({ path: 'userNEW.json' });

    await use(users[1]);
  },
  registeredUsers: async ({ usersApi, users, usersNumber }, use) => {
    for (let i = 0; i < usersNumber; i++) {
      const response = await usersApi.registerNewUser(users[i]);

      await usersApi.assertSuccessResponseCode(response);

      users[i]['token'] = await usersApi.parseTokenFromBody(response);
    }
    await use(users);
  },
  userRequests: async ({ registeredUsers, usersNumber }, use) => {
    const userRequests = Array(usersNumber);

    for (let i = 0; i < usersNumber; i++) {
      userRequests[i] = await apiRequest.newContext({
        extraHTTPHeaders: {
          authorization: `Token ${registeredUsers[i].token}`,
          'content-type': 'application/json',
        },
      });
    }
    await use(userRequests);
  },
});
