import { body, validationResult } from "express-validator";
import { Types } from "mongoose";

import type { NextFunction, Request, Response } from "express";

type SubmissionTagInput = {
  memberId: string;
  photoIndex: number;
  x: number;
  y: number;
};

type SubmissionRequestBody = {
  submission?: unknown;
  submissionParseError?: boolean;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isSubmissionTag = (tag: unknown): tag is SubmissionTagInput => {
  if (!isRecord(tag)) return false;

  return (
    typeof tag.memberId === "string" &&
    Types.ObjectId.isValid(tag.memberId) &&
    typeof tag.photoIndex === "number" &&
    Number.isInteger(tag.photoIndex) &&
    tag.photoIndex >= 0 &&
    typeof tag.x === "number" &&
    Number.isFinite(tag.x) &&
    tag.x >= 0 &&
    tag.x <= 100 &&
    typeof tag.y === "number" &&
    Number.isFinite(tag.y) &&
    tag.y >= 0 &&
    tag.y <= 100
  );
};

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstMsg: unknown = errors.array()[0]?.msg;
    res.status(400).json({
      error: typeof firstMsg === "string" ? firstMsg : "Invalid request.",
    });
    return;
  }
  next();
};

/**
 * Multipart requests send `submission` as a JSON string. Parse it onto req.body.submission
 * so the body() chains below can validate nested fields.
 */
const parseSubmissionBody = (req: Request, _res: Response, next: NextFunction) => {
  const bodyData = req.body as SubmissionRequestBody;
  const submission = bodyData.submission;
  if (typeof submission === "string") {
    try {
      bodyData.submission = JSON.parse(submission) as unknown;
    } catch {
      bodyData.submissionParseError = true;
    }
  }
  next();
};

export const validateSubmissionCreation = [
  parseSubmissionBody,

  body().custom((_value, { req }) => {
    const files = Array.isArray(req.files) ? req.files : [];
    if (files.length === 0) {
      throw new Error("At least one photo is required.");
    }
    return true;
  }),

  body("submission")
    .exists()
    .withMessage("Submission details are required.")
    .bail()
    .custom((_value, { req }) => {
      const bodyData = req.body as SubmissionRequestBody;
      if (bodyData.submissionParseError) {
        throw new Error("Submission details are invalid JSON.");
      }
      return true;
    })
    .bail()
    .custom((value: unknown) => {
      if (!isRecord(value) || Array.isArray(value)) {
        throw new Error("Submission details are invalid.");
      }
      return true;
    })
    .bail(),

  body("submission.eventName")
    .exists()
    .withMessage("Submission details are incomplete or invalid.")
    .bail()
    .isString()
    .withMessage("Submission details are incomplete or invalid.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Submission details are incomplete or invalid.")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Submission details are incomplete or invalid.")
    .bail(),

  body("submission.date")
    .exists()
    .withMessage("Submission details are incomplete or invalid.")
    .bail()
    .isString()
    .withMessage("Submission details are incomplete or invalid.")
    .bail()
    .custom((date: unknown) => typeof date === "string" && !Number.isNaN(Date.parse(date)))
    .withMessage("Submission details are incomplete or invalid.")
    .bail(),

  body("submission.location")
    .exists()
    .withMessage("Submission details are incomplete or invalid.")
    .bail()
    .isString()
    .withMessage("Submission details are incomplete or invalid.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Submission details are incomplete or invalid.")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Submission details are incomplete or invalid.")
    .bail(),

  body("submission.tags")
    .exists()
    .withMessage("Submission details are incomplete or invalid.")
    .bail()
    .isArray({ min: 3 })
    .withMessage("Submission details are incomplete or invalid.")
    .bail()
    .custom((tags: unknown, { req }) => {
      if (!Array.isArray(tags) || !tags.every(isSubmissionTag)) {
        throw new Error("Submission details are incomplete or invalid.");
      }

      const files = Array.isArray(req.files) ? req.files : [];
      if (
        tags.some((tag) => tag.photoIndex >= files.length) ||
        new Set(tags.map((tag) => tag.memberId)).size !== tags.length
      ) {
        throw new Error("Submission photo tags are invalid.");
      }

      return true;
    })
    .bail(),

  handleValidationErrors,
];
