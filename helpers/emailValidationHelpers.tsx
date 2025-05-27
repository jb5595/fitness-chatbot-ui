export const validateEmailFormat = (email: string): string | null => {
    // Basic email format validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        return "Email is required";
    }

    if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
    }

    return null;
};
