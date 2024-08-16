"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// rate limiter for login attempts
const loginLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login requests per minute
    message: {
        error: "Too many login attempts from this IP, please try again after a 60 second pause",
    },
    // when the rate limit is exceeded. it handles
    handler: (req, res, next, options) => {
        res.status(options.statusCode).send(options.message); // 429 Too Many Requests
    },
    standardHeaders: true, // enable RateLimit-* headers in the response, which provide info about the rate limit
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
exports.default = loginLimiter;
