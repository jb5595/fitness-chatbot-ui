import { getLogout, postLogin, postSignUp } from "@/api/auth"
import { useCurrentUser } from "@/context/currentUserContext"
import AuthService from "@/services/authService"
import { useState } from "react"
import { validatePasswordForLogin } from "@/helpers/passwordValidationHelpers"
import { validateEmailFormat } from "@/helpers/emailValidationHelpers"
import router from "next/router"

type FormField = 'email' | 'password' | 'passwordConfirmation'
type ErrorMessages = { [key in FormField]?: string }

export const useLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setCurrentUser } = useCurrentUser()

    const login = async () =>{
       const data = await postLogin(email, password)
       AuthService.setAuth(data.tokens.authToken)
       AuthService.setRefresh(data.tokens.refreshToken)
       setCurrentUser(data.user)
    }

    return {
        login,
        email,
        setEmail,
        password,
        setPassword
    }
}

const getValidationErrors = ({
    email,
    password,
    passwordConfirmation,
  }: {
    email: string;
    password: string;
    passwordConfirmation: string;
  }): ErrorMessages => {
    const errors: ErrorMessages = {};
  
    const emailError = validateEmailFormat(email);
    if (emailError) errors.email = emailError;
  
    const passwordError = validatePasswordForLogin(password, passwordConfirmation);
    if (passwordError) errors.password = passwordError;
  
    return errors;
  };
  

export const useSignUp = () => {
    const { setCurrentUser } = useCurrentUser()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({})
    const [shouldValidateOnChange, setShouldValidateOnChange] = useState(false)

    const validate = (overrides: Partial<{ email: string; password: string; passwordConfirmation: string }> = {}): boolean => {
        const values = {
          email,
          password,
          passwordConfirmation,
          ...overrides,
        };
        const errors = getValidationErrors(values);
        setErrorMessages(errors);
        return Object.keys(errors).length === 0;
      };
      
      const handleSetEmail = (newEmail: string) => {
        setEmail(newEmail);
        if (shouldValidateOnChange) validate({ email: newEmail });
      };
      
      const handleSetPassword = (newPassword: string) => {
        setPassword(newPassword);
        if (shouldValidateOnChange) validate({ password: newPassword });
      };
      
      const handleSetPasswordConfirmation = (newConfirmation: string) => {
        setPasswordConfirmation(newConfirmation);
        if (shouldValidateOnChange) validate({ passwordConfirmation: newConfirmation });
      };

    const signup = async () => {
        if (!validate({})) {
            setShouldValidateOnChange(true)
            return
        }
        // TODO: Properly raise email already taken error
        const data = await postSignUp(email, password)
        AuthService.setAuth(data.tokens.authToken)
        AuthService.setRefresh(data.tokens.refreshToken)
        setCurrentUser(data.user)
        router.push(`/`)
    }


    return {
        signup,
        email,
        setEmail: handleSetEmail,
        password,
        setPassword: handleSetPassword,
        passwordConfirmation,
        setPasswordConfirmation: handleSetPasswordConfirmation,
        errorMessages
    }
}

export const useLogout = () => {
    const { setCurrentUser } = useCurrentUser()

    const logout = async () => {
        await getLogout()
        AuthService.removeAuth()
        AuthService.removeRefresh()
        setCurrentUser(null)
    }

    return { logout }
}