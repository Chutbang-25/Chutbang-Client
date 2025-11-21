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
}: InputProps) => {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                {...register}
                className="p-2 border border-gray-300 rounded text-black transition-colors transition-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
};

export { Input };
