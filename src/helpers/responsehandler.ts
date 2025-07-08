import { Response } from 'express';

interface ApiResponse {
  status: boolean;
  message: string;
  data?: any;
}

export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: any
) => {
  const response: ApiResponse = {
    status: success,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};
