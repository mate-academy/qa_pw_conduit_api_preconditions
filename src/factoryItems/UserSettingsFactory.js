import { UserFactory } from './UserFactory';
import { faker } from '@faker-js/faker';

export class UserSettingsFactory extends UserFactory {
  generateUserSettings(options = {}) {
    let userSettings = options.user ?? this.generateUser(options);

    userSettings.profilPictureUrl =
      options.profilePictureUrl ?? this.generateProfilePictureUrl();
    userSettings.bio = options.bio ?? this.generateBio();

    return userSettings;
  }

  generateProfilePictureUrl() {
    return faker.image.avatar();
  }

  generateBio() {
    return faker.lorem.sentences(2);
  }
}
