export type AuthResponse = {
  name: string;
  email: string;
  role: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
};
