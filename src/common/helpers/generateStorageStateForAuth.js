export function generateStorageStateForAuth(user) {
  return {
    storageState: {
      cookies: [
        {
          name: 'auth',
          value: user.token,
          domain: 'conduit.mate.academy',
          path: '/',
          expires: -1,
          httpOnly: false,
          secure: false,
          sameSite: 'Lax',
        },
      ],
      origins: [
        {
          origin: 'https://conduit.mate.academy',
          localStorage: [
            {
              name: 'user',
              // eslint-disable-next-line max-len
              value: `{"username":"${user.username}","email":"${user.email}","token":"${user.token}","bio":null,"image":null,"effectiveImage":"https://static.productionready.io/images/smiley-cyrus.jpg"}`,
            },
          ],
        },
      ],
    },
  };
}
