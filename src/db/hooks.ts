import type { Document, Error as MongooseError } from "mongoose";

type MongooseErrorWithStatus = MongooseError & { status?: number };

type MongooseNext = (err?: MongooseError) => void;

export const handleSaveError = (
  error: MongooseErrorWithStatus,
  doc: Document,
  next: MongooseNext,
) => {
  if (error?.name === "ValidationError") {
    error.status = 400;
  }

  if (error?.name === "MongoServerError") {
    error.status = 409;
  }

  next(error);
};

export const setUpdateSettings = function (next: MongooseNext) {
  //@ts-expect-error
  this.options.new = true;
  //@ts-expect-error
  this.options.runValidators = true;
  // next();
};
