import { User } from '../../users/entities/user.entity';

const mockedUser: User = {
  id: 1,
  email: 'ryandils@buffalo.edu',
  password: 'hash',
  isAuthenticated: true,
  isPremiumUser: true,
  isStudent: true,
  isActive: true,
  age: 22,
  bio: 'test bio',
};

export default mockedUser;
