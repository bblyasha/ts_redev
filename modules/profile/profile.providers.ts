import { Profile } from './profile.model';

export const profileProviders = [
  {
    provide: 'PROFILE_REPOSITORY',
    useValue: Profile,
  },
];
