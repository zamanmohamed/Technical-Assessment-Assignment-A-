import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as any;
  res.status(404);
  next(error);
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode: number =
    res.statusCode === 200 ? 500 : (res.statusCode as number);
  res.status(statusCode);
  res.json({
    message: err.message,
    stack:
      process.env.NODE_ENV === "production"
        ? null
        : (err.stack as string | undefined),
  });
};

export { notFound, errorHandler };
