export interface TokenResponse {
  authenticated: boolean;
  expiration: Date;
  token: string;
}
