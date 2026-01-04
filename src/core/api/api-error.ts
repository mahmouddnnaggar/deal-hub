/**
 * API Error handling utilities
 */

export interface ApiErrorResponse {
  message: string;
  statusMsg?: string;
  errors?: Record<string, { message: string }>;
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly statusMsg: string;
  public readonly errors: Record<string, { message: string }>;
  public readonly isNetworkError: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    statusMsg: string = 'error',
    errors: Record<string, { message: string }> = {},
    isNetworkError: boolean = false
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.statusMsg = statusMsg;
    this.errors = errors;
    this.isNetworkError = isNetworkError;
  }

  static fromAxiosError(error: unknown): ApiError {
    // Network error (no response)
    if (error && typeof error === 'object' && 'code' in error) {
      const axiosError = error as { code?: string; message?: string };
      if (axiosError.code === 'ERR_NETWORK') {
        return new ApiError(
          'Network error. Please check your connection.',
          0,
          'error',
          {},
          true
        );
      }
    }

    // API error with response
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response?: {
          status: number;
          data?: ApiErrorResponse;
        };
      };

      const status = axiosError.response?.status ?? 500;
      const data = axiosError.response?.data;

      return new ApiError(
        data?.message ?? 'An unexpected error occurred',
        status,
        data?.statusMsg ?? 'error',
        data?.errors ?? {}
      );
    }

    // Unknown error
    if (error instanceof Error) {
      return new ApiError(error.message);
    }

    return new ApiError('An unexpected error occurred');
  }

  get isUnauthorized(): boolean {
    return this.statusCode === 401;
  }

  get isForbidden(): boolean {
    return this.statusCode === 403;
  }

  get isNotFound(): boolean {
    return this.statusCode === 404;
  }

  get isValidationError(): boolean {
    return this.statusCode === 400 || this.statusCode === 422;
  }

  get isServerError(): boolean {
    return this.statusCode >= 500;
  }

  getFieldError(field: string): string | undefined {
    return this.errors[field]?.message;
  }
}
