import type { Meta, StoryObj } from '@storybook/react';
import { colors } from '../lib/design-tokens';

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '디자인 시스템의 색상 팔레트입니다. Primary, Secondary, Grey 세 가지 카테고리로 구성되어 있습니다.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorSwatch = ({ name, color, hex }: { name: string; color: string; hex: string }) => {
  const isLight = ['50', '100', '200', '300', '400'].includes(name.split('-')[1] || '');
  const textColor = isLight ? 'text-grey-900' : 'text-white';
  
  return (
    <div className="flex flex-col">
      <div
        className="w-full h-24 rounded-lg mb-2 flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <span className={`text-sm font-medium ${textColor}`}>{hex}</span>
      </div>
      <div className="text-sm">
        <div className="font-semibold text-grey-900">{name}</div>
        <div className="text-grey-600">{hex}</div>
      </div>
    </div>
  );
};

export const Primary: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Primary Colors</h2>
        <p className="text-grey-600 mb-6">
          주요 브랜드 색상으로, 주요 액션과 강조에 사용됩니다.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(colors.primary).map(([key, value]) => (
            <ColorSwatch
              key={key}
              name={`primary-${key}`}
              color={value}
              hex={value}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Secondary: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Secondary Colors</h2>
        <p className="text-grey-600 mb-6">
          보조 브랜드 색상으로, 성공 상태나 보조 액션에 사용됩니다.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(colors.secondary).map(([key, value]) => (
            <ColorSwatch
              key={key}
              name={`secondary-${key}`}
              color={value}
              hex={value}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Grey: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Grey Colors</h2>
        <p className="text-grey-600 mb-6">
          중립 색상으로, 텍스트, 배경, 경계선 등에 사용됩니다.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(colors.grey).map(([key, value]) => (
            <ColorSwatch
              key={key}
              name={`grey-${key}`}
              color={value}
              hex={value}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">Primary Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(colors.primary).map(([key, value]) => (
            <ColorSwatch
              key={key}
              name={`primary-${key}`}
              color={value}
              hex={value}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Secondary Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(colors.secondary).map(([key, value]) => (
            <ColorSwatch
              key={key}
              name={`secondary-${key}`}
              color={value}
              hex={value}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Grey Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(colors.grey).map(([key, value]) => (
            <ColorSwatch
              key={key}
              name={`grey-${key}`}
              color={value}
              hex={value}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

