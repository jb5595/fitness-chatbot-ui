import { PASSWORD_VALIDATION_MESSAGES } from "@/constants/authConstants";

export const containsWhiteSpace = (str: string): boolean => {
    return /\s/.test(str);
};

export const containsUpperCaseLetter = (str: string): boolean => {
    return /[A-Z]/.test(str);
};

export const containsLowerCaseLetter = (str: string): boolean => {
    return /[a-z]/.test(str);
};

export const containsNumeric = (str: string): boolean => {
    return /[0-9]/.test(str);
};

export const containsSpecialCharacter = (str: string): boolean => {
    console.log(str)
    // Check for at least one special character
    return /[!@#$%^&*(),.?":{}|<>]/.test(str);
};

export const validatePassword = (password: string): string | null => {
    if (typeof password !== 'string') {
        return PASSWORD_VALIDATION_MESSAGES.TYPE_ERROR;
    }

    if (password.length < 8) {
        return PASSWORD_VALIDATION_MESSAGES.LENGTH_ERROR;
    }

    if (containsWhiteSpace(password)) {
        return PASSWORD_VALIDATION_MESSAGES.WHITESPACE_ERROR;
    }

    if (!containsUpperCaseLetter(password)) {
        return PASSWORD_VALIDATION_MESSAGES.UPPERCASE_ERROR;
    }

    if (!containsLowerCaseLetter(password)) {
        return PASSWORD_VALIDATION_MESSAGES.LOWERCASE_ERROR;
    }

    if (!containsNumeric(password)) {
        return PASSWORD_VALIDATION_MESSAGES.NUMERIC_ERROR;
    }

    if (!containsSpecialCharacter(password)) {
        return PASSWORD_VALIDATION_MESSAGES.SPECIAL_CHAR_ERROR;
    }

    return null;
};

export const validatePasswordConfirmation = (password: string, confirmation: string): string | null => {
    if (password !== confirmation) {
        return PASSWORD_VALIDATION_MESSAGES.CONFIRMATION_MATCH_ERROR;
    }
    return null;
};

export const validatePasswordForLogin = (password: string, confirmation: string): string | null => {
    // First check password format
    const passwordError = validatePassword(password);
    if (passwordError) {
        return passwordError;
    }

    // Then check confirmation
    const confirmationError = validatePasswordConfirmation(password, confirmation);
    if (confirmationError) {
        return confirmationError;
    }

    // If we get here, both validations passed
    return null;
};
