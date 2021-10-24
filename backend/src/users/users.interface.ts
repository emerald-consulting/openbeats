export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isAuthenticated: boolean;
  isPremiumUser: boolean;
  isStudent: boolean;
  isActive: boolean;
  age: number;
}
