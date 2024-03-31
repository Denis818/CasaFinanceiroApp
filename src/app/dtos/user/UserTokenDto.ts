export interface UserTokenDto {
  authenticated: boolean;
  expiration: Date;
  token: string;
}
