import { mergeTests } from '@playwright/test';
import { test as authTest } from './ui/fixturesAuth';
import { test as genericTest } from './fixturesGeneric';
import { test as articleTest } from './ui/fixturesArticle';
import { test as homeTest } from './ui/fixturesHome';
import { test as usersApiTest } from './api/fixturesUsersApi';

export const test = mergeTests(
  authTest,
  genericTest,
  articleTest,
  homeTest,
  usersApiTest,
);
