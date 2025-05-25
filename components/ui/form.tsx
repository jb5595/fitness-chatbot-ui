
type FormProps = Omit<React.ComponentProps<"form">, "onSubmit"> & {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const Form = ({ children, onSubmit, ...props }: FormProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(e)
    }
  return <form {...props} onSubmit={handleSubmit}>{children}</form>
}

export { Form }