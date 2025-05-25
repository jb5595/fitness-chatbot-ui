import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form } from "../ui/form"
import router from "next/router"
import {  useSignUp } from "@/hooks/useAuth"
import { FormElement } from "../ui/formElement"

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { signup, 
        email, 
        setEmail,
        password,
        setPassword,
        passwordConfirmation,
        setPasswordConfirmation,
        errorMessages
     } = useSignUp()

    const handleSubmit = async () => {
        await signup()
    }
    
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Enter your email and password below to sign up for an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <FormElement
                label="Email"
                htmlFor="email"
                errorMessage={errorMessages.email}
              >
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(val) => setEmail(val)}
                  placeholder="m@example.com"
                  required
                />
              </FormElement>

              <FormElement
                label="Password"
                htmlFor="password"
                errorMessage={errorMessages.password}
              >
                <Input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={(val) => setPassword(val)}
                  required
                />
              </FormElement>

              <FormElement
                label="Password Confirmation"
                htmlFor="password-confirmation"
                errorMessage={errorMessages.passwordConfirmation}
              >
                <Input 
                  id="password-confirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(val) => setPasswordConfirmation(val)}
                  required
                />
              </FormElement>

              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
