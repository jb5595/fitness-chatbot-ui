import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps<T = string> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: T) => void
  errorMessage?: string
}

function Input<T = string>({ className, type, errorMessage, ...props }: InputProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    props.onChange(value as T)
  }
  return (
    <div className="flex flex-col gap-1">
      <input
        {...props}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          errorMessage && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/50",
          className
        )}
        onChange={handleChange}
      />
      {errorMessage && (
        <span className="text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  )
}

export { Input }
