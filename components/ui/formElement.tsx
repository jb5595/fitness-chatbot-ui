import { Label } from "./label"
import { cn } from "@/lib/utils"
import { ReactElement, cloneElement } from "react"

interface FormElementProps {
    children: ReactElement<{ errorMessage?: string }>
    label: string
    htmlFor: string
    errorMessage?: string
}

const FormElement = ({ children, label, htmlFor, errorMessage }: FormElementProps) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={htmlFor} className={cn(errorMessage && "text-red-500")}>
                {label}
            </Label>
            {cloneElement(children, { errorMessage })}
        </div>
    )
}

export { FormElement }