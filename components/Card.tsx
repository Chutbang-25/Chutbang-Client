import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface CardProps {
    title: string;
    description: string;
    image?: StaticImageData;
    backgroundColor: '300' | '500' | '700' | '900';
}

const backgroundColorMap = {
    '300': 'bg-primary-300',
    '500': 'bg-primary-500',
    '700': 'bg-primary-700',
    '900': 'bg-primary-900',
};

const Card = ({ title, description, image, backgroundColor }: CardProps) => {
    return (
        <div
            className={`relative w-[304px] h-[133px] px-6 py-8 rounded-3xl ${backgroundColorMap[backgroundColor]} overflow-hidden`}
        >
            <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-semibold text-grey-50 leading-[28.64px]">
                    {title}
                </h3>
                <p className="text-sm font-regular text-grey-100 leading-[16.7px] whitespace-pre-line">
                    {description}
                </p>
            </div>
            {image && (
                <Image
                    src={image}
                    alt={title}
                    width={171}
                    height={171}
                    className="absolute right-[-22px] top-[-22px]"
                />
            )}
        </div>
    );
};

export default Card;
