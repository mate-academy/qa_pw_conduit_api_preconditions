import { test as base } from '@playwright/test';
import { request as apiRequest } from '@playwright/test';
import { UsersApi } from '../../../src/api/endpoints/UsersApi';

export const test = base.extend<{
  usersApi;
  registeredUser;
  registeredUserInBrowserContext;
  registeredUsers;
  userRequests;
}>({
  usersApi: async ({ request }, use) => {
    const client = new UsersApi(request);

    await use(client);
  },
  registeredUser: async ({ usersApi, newUserData }, use) => {
    const response = await usersApi.registerNewUser(newUserData);

    await usersApi.assertSuccessResponseCode(response);

    newUserData['token'] = await usersApi.parseTokenFromBody(response);

    await use(newUserData);
  },
  registeredUserInBrowserContext: async (
    { request, newUsersData, browser },
    use,
  ) => {
    const usersApi = new UsersApi(request);
    const response = await usersApi.registerNewUser(newUsersData[0]);

    await usersApi.assertSuccessResponseCode(response);

    newUsersData[0]['token'] = await usersApi.parseTokenFromBody(response);

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
            localStorage: [{ name: 'user', value: newUsersData[0] }],
          },
        ],
      },
    });

    const page = await context.newPage();

    await page.context().storageState({ path: 'userNEW.json' });

    await use(newUsersData[1]);
  },
  registeredUsers: async ({ usersApi, newUsersData, usersNumber }, use) => {
    for (let i = 0; i < usersNumber; i++) {
      const response = await usersApi.registerNewUser(newUsersData[i]);

      await usersApi.assertSuccessResponseCode(response);

      newUsersData[i]['token'] = await usersApi.parseTokenFromBody(response);
    }
    await use(newUsersData);
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
