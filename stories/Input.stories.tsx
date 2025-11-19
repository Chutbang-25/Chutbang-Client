import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/common/ui/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '입력 필드 컴포넌트입니다. 라벨, 에러 메시지, 도움말 텍스트를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '입력 필드 라벨',
    },
    error: {
      control: 'text',
      description: '에러 메시지',
    },
    helperText: {
      control: 'text',
      description: '도움말 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: '입력 필드 타입',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '입력하세요...',
  },
};

export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '이메일',
    type: 'email',
    placeholder: 'example@email.com',
    helperText: '올바른 이메일 형식을 입력해주세요',
  },
};

export const WithError: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    error: '비밀번호는 8자 이상이어야 합니다',
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화된 입력',
    placeholder: '입력할 수 없습니다',
    disabled: true,
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="텍스트" type="text" placeholder="텍스트 입력" />
      <Input label="이메일" type="email" placeholder="email@example.com" />
      <Input label="비밀번호" type="password" placeholder="비밀번호 입력" />
      <Input label="숫자" type="number" placeholder="숫자 입력" />
      <Input label="전화번호" type="tel" placeholder="010-1234-5678" />
      <Input label="URL" type="url" placeholder="https://example.com" />
    </div>
  ),
};

