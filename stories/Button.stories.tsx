import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/common/ui/Button';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    '버튼 컴포넌트입니다. 다양한 variant와 size를 지원합니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
            description: '버튼의 스타일 변형',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: '버튼의 크기',
        },
        isLoading: {
            control: 'boolean',
            description: '로딩 상태 표시',
        },
        disabled: {
            control: 'boolean',
            description: '비활성화 상태',
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Button',
        variant: 'primary',
        size: 'md',
    },
};

export const Variants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
        </div>
    ),
};

export const Loading: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button isLoading>Loading</Button>
            <Button variant="secondary" isLoading>
                Loading
            </Button>
            <Button variant="outline" isLoading>
                Loading
            </Button>
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>
                Disabled
            </Button>
            <Button variant="outline" disabled>
                Disabled
            </Button>
        </div>
    ),
};
