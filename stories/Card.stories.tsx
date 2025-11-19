import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/ui/Card';
import { Button } from '../components/common/ui/Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '카드 컴포넌트입니다. 콘텐츠를 그룹화하여 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: '카드의 스타일 변형',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>카드 제목</CardTitle>
        </CardHeader>
        <CardContent>
          <p>카드 내용이 여기에 표시됩니다.</p>
        </CardContent>
      </>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>기본 스타일의 카드입니다.</p>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Outlined Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>테두리가 강조된 카드입니다.</p>
        </CardContent>
      </Card>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>그림자가 있는 카드입니다.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>액션이 있는 카드</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">카드 내부에 버튼이나 다른 액션을 추가할 수 있습니다.</p>
        <div className="flex gap-2">
          <Button size="sm">확인</Button>
          <Button size="sm" variant="outline">
            취소
          </Button>
        </div>
      </CardContent>
    </Card>
  ),
};

export const Complex: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>복잡한 카드 예제</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">설명</h4>
            <p className="text-sm text-grey-600">
              카드는 다양한 콘텐츠를 구조화하여 표시할 수 있습니다.
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-grey-200">
            <span className="text-sm text-grey-600">2024년 1월 1일</span>
            <Button size="sm">자세히 보기</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

