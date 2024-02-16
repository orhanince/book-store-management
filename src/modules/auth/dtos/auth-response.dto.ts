export type AuthResponse = {
  name: string;
  email: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
};
