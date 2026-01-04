/**
 * Auth API - All authentication-related API calls
 */

import { http, API_ENDPOINTS } from '@/core/api';
import type {
  AuthResponse,
  StatusResponse,
  SignupRequest,
  SigninRequest,
  ForgotPasswordRequest,
  VerifyResetCodeRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  UpdateProfileRequest,
} from '@/entities';

export const authApi = {
  /**
   * Register a new user
   */
  async signup(data: SignupRequest): Promise<AuthResponse> {
    return http.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNUP, data);
  },

  /**
   * Sign in with email and password
   */
  async signin(data: SigninRequest): Promise<AuthResponse> {
    return http.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNIN, data);
  },

  /**
   * Request password reset (sends email with code)
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<StatusResponse> {
    return http.post<StatusResponse>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
  },

  /**
   * Verify the reset code sent to email
   */
  async verifyResetCode(data: VerifyResetCodeRequest): Promise<StatusResponse> {
    return http.post<StatusResponse>(API_ENDPOINTS.AUTH.VERIFY_RESET_CODE, data);
  },

  /**
   * Reset password with new password
   */
  async resetPassword(data: ResetPasswordRequest): Promise<AuthResponse> {
    return http.put<AuthResponse>(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  },

  /**
   * Change password for logged in user
   */
  async changePassword(data: ChangePasswordRequest, token: string): Promise<AuthResponse> {
    return http.put<AuthResponse>(API_ENDPOINTS.USERS.CHANGE_PASSWORD, data, { token });
  },

  /**
   * Update user profile
   */
  async updateProfile(data: UpdateProfileRequest, token: string): Promise<{ user: AuthResponse['user'] }> {
    return http.put<{ user: AuthResponse['user'] }>(
      API_ENDPOINTS.USERS.UPDATE_ME,
      data,
      { token }
    );
  },

  /**
   * Verify if token is still valid
   */
  async verifyToken(token: string): Promise<{ message: string }> {
    return http.get<{ message: string }>(API_ENDPOINTS.AUTH.VERIFY_TOKEN, { token });
  },
};
