import { faker } from '@faker-js/faker';

export class UserFactory {
  generateUser(options = {}) {
    const user = {};
    const firstName = this.generateFirstName();
    const lastName = this.generateLastName();

    user.username =
      options.username ?? this.generateUsername(firstName, lastName);
    user.email = options.email ?? this.generateEmail(firstName);
    user.password = options.password ?? this.generatePassword();

    return user;
  }

  generateFirstName() {
    return faker.person.firstName();
  }

  generateLastName() {
    return faker.person.lastName();
  }

  generateUsername(firstName, lastName) {
    return `${firstName}_${lastName}`.replaceAll(`'`).toLowerCase();
  }

  generateEmail(firstName) {
    return `${firstName}_${faker.internet.email()}`.toLowerCase();
  }

  generatePassword() {
    return faker.internet.password();
  }
}
