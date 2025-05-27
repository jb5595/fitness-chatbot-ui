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
import { useLogin } from "@/hooks/useAuth"
import { FormElement } from "../ui/formElement"
import Link from "next/link"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { 
      login,
      email,
      setEmail,
      password,
      setPassword
     } = useLogin()

    const handleSubmit = async () => {
        await login()
        router.push(`/`)
    }
    
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <FormElement
                label="Email"
                htmlFor="email"
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
              >
                <Input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={(val) => setPassword(val)}
                  required
                />
              </FormElement>
              <div className="flex justify-end mb-2">
                <a
                  href="#"
                  className="text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
