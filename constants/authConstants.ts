export const PASSWORD_VALIDATION_MESSAGES = {
    TYPE_ERROR: "Password must be a string",
    LENGTH_ERROR: "Password must be at least 8 characters long",
    WHITESPACE_ERROR: "Password cannot contain whitespace",
    UPPERCASE_ERROR: "Password must contain at least one uppercase letter",
    LOWERCASE_ERROR: "Password must contain at least one lowercase letter",
    NUMERIC_ERROR: "Password must contain at least one number",
    SPECIAL_CHAR_ERROR: "Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>))",
    CONFIRMATION_MATCH_ERROR: "Passwords do not match"
} as const;
