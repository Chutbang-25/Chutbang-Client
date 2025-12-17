import { InputHTMLAttributes, ComponentProps } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    name: string;
    error?: string;
    register?: ComponentProps<'input'>;
    required?: boolean;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    wfull?: boolean;
}

const Input = ({
    label,
    id,
    name,
    error,
    register,
    required,
    placeholder,
    type,
    disabled,
    wfull,
    className,
    value,
    onChange,
    ...rest
}: InputProps) => {
    return (
        <>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                value={value}
                onChange={onChange}
                {...register}
                {...rest}
                className={
                    className ||
                    (wfull
                        ? 'w-full p-2 border border-gray-300 rounded text-black transition-colors transition-200 focus:outline-none focus:ring-2 focus:ring-primary-500'
                        : 'p-2 border border-gray-300 rounded text-black transition-colors transition-200 focus:outline-none focus:ring-2 focus:ring-primary-500')
                }
            />
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
};

export { Input };
