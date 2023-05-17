import { Request, Response, NextFunction } from "express";

export default (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error = {
    code: "unknown",
    status: 400,
    message: "Unknown error occurred, please try again later",
  };
  if (err instanceof Error) {
    const code = (err as any).code;
    error = {
      code: String(code) || err.name,
      status: 400,
      message: err.message,
    };
  }

  return res.status(error.status).json(error);
};
