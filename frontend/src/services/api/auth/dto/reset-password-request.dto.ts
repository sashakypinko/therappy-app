export interface ResetPasswordRequestDto {
  email: string;
  reset_password_token: string;
  password: string;
  confirm_password: string;
}
