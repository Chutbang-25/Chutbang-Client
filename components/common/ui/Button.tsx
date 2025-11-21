'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?:
        | 'primary'
        | 'secondary'
        | 'ghost'
        | 'outline'
        | 'link'
        | 'disabled';
    size?: 'lg' | 'md' | 'sm';
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    disabled,
    onClick,
    ...props
}: ButtonProps) => {
    const baseStyles =
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border';

    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
        primary:
            'bg-primary-500 text-white hover:bg-primary-600 border-transparent',
        secondary:
            'bg-secondary-500 text-white hover:bg-secondary-600 border-transparent',
        ghost: 'bg-transparent text-grey-700 hover:bg-grey-100 hover:text-grey-900 border-transparent',
        outline:
            'bg-transparent border-grey-300 text-grey-700 hover:bg-grey-50 hover:text-grey-900',
        link: 'bg-transparent text-primary-500 underline-offset-4 hover:underline p-0 h-auto border-transparent',
        disabled:
            'bg-grey-200 text-grey-400 cursor-not-allowed hover:bg-grey-200 border-transparent',
    };

    const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
        sm: 'h-9 px-3 rounded-md text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 rounded-md text-lg',
    };

    const variantStyles = disabled ? variants.disabled : variants[variant];

    return (
        <button
            className={cn(
                baseStyles,
                sizes[size],
                variantStyles,
                className ?? ''
            )}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export { Button };
