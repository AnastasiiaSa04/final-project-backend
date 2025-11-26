import type { Request, Response, NextFunction } from "express";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { status = 500, message = "Server error" } = error;

  res.status(status).json({ message });
};

export default errorHandler;
