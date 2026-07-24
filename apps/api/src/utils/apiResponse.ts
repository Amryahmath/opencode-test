import type { ApiErrorResponse, ApiResponse } from '@it-master-ai/types';

export const ok = <T,>(message: string, data: T): ApiResponse<T> => ({ success: true, message, data });

export const fail = (message: string, errors: string[] = []): ApiErrorResponse => ({ success: false, message, errors });
