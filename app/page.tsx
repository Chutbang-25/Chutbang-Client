import { Header } from '@/components/common/Header';
import landingImage from '@/public/assets/landing-image.svg';
import Image from 'next/image';
import { LandingLayout } from '@/components/layout/LandingLayout';
import heroImageKitchen from '@/public/assets/content/hero-image1.svg';
import heroImageLivingRoom from '@/public/assets/content/hero-image2.svg';
import heroImageBathroom from '@/public/assets/content/hero-image3.svg';
import heroImageOneRoom from '@/public/assets/content/hero-image4.svg';
import heroImageOneRoomWithStair from '@/public/assets/content/hero-image5.svg';
import whyImage1 from '@/public/assets/why/dollar.svg';
import whyImage2 from '@/public/assets/why/spot.svg';
import whyImage3 from '@/public/assets/why/home.svg';
import whyImage4 from '@/public/assets/why/document.svg';
import Card from '@/components/Card';
import TestimonialCard from '@/components/TestimonialCard';
import CTASection from '@/components/CTASection';
import Footer from '@/components/layout/Footer';

export default function Home() {
    const heroImages = [
        heroImageKitchen,
        heroImageLivingRoom,
        heroImageBathroom,
    ];

    const heroImagesTwo = [heroImageOneRoom, heroImageOneRoomWithStair];

    const whyImages = [whyImage1, whyImage2, whyImage3, whyImage4];
    const whyTitles = [
        '예산 맞춤 추천',
        '지역 분석',
        '공공임대 매칭',
        '계약 가이드',
    ];
    const whyDescriptions = [
        '내 월급과 저축액에\n 딱 맞는 주거 유형을 추천해드려요',
        '직장 위치 기준으로\n 최적의 거주 지역을 분석해요',
        '놓치기 쉬운 행복주택,\n 청년주택 정보를 한눈에',
        '처음 계약하는 사람도 안전하게,\n 단계별 체크리스트 제공',
    ];

    const whyBackgroundColors: ('300' | '500' | '700' | '900')[] = [
        '300',
        '500',
        '700',
        '900',
    ];

    const testimonials = [
        {
            name: '김**님',
            age: '21세',
            company: 'IT기업',
            salary: '3200만원',
            testimonial:
                '전세 가능할 줄 몰랐는데 첫방 덕분에 알게 됐어요.\n이제 분당에서 출퇴근 30분!',
        },
        {
            name: '박**님',
            age: '24세',
            company: '중소기업',
            salary: '2800만원',
            testimonial:
                '행복주택이 이렇게 저렴한 줄 몰랐어요.\n월세 23만원으로 독립 성공!',
        },
        {
            name: '이**님',
            age: '27세',
            company: '대기업',
            salary: '5000만원',
            testimonial:
                '전세와 월세 비교 분석이 정말 유용했어요.\n체계적으로 준비할 수 있었습니다.',
        },
    ];

    return (
        <div>
            <Header />
            {/* Hero Section */}
            <main className="relative">
                <div className="absolute top-1/2 left-1/2 flex-col items-center justify-center translate-x-[-50%] translate-y-[-50%]">
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-4xl text-center letter-spacing-base font-semibold mb-1">
                            독립이 막막할 땐, 첫방
                        </h3>
                        <p className="text-sm font-regular text-grey-400">
                            월 60만원 월세부터 2억 전세, 행복주택 그리고 계약
                            가이드까지
                        </p>
                    </div>
                    <div className="flex items-center justify-center mt-6 gap-3">
                        <button className="px-7 py-3 text-base font-semibold rounded-full border border-primary-500 text-primary-500 hover:cursor-pointer hover:scale-105 transition-all duration-300">
                            지금 시작하기
                        </button>
                        <button className="px-7 py-3 text-base font-semibold rounded-full border border-grey-500 text-grey-500 hover:cursor-pointer hover:scale-105 transition-all duration-300">
                            더 알아보기
                        </button>
                    </div>
                </div>
                <Image
                    src={landingImage}
                    alt="landing image"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                />
            </main>
            {/* Content Section */}
            <LandingLayout>
                <div className="flex flex-row items-center justify-center mb-[200px] w-full">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-semibold text-black">
                            100,000+ 부동산 매물
                        </h3>
                        <p className="text-sm text-grey-500">
                            공공데이터포털에서 제공하는 매물로 <br />
                            인증받은 매물만 제공해요.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 flex-1 justify-end items-end">
                        <p className="text-xs text-grey-500">
                            *예시 이미지입니다.
                        </p>
                        <div className="flex flex-1 flex-row gap-6">
                            {heroImages.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    alt={`hero image ${index}`}
                                    width={313}
                                    height={469}
                                    className="w-full h-full object-cover"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-center mb-[200px] w-full">
                    <div className="flex flex-col gap-2 flex-1 justify-start items-start">
                        <p className="text-xs text-grey-500">
                            *예시 이미지입니다.
                        </p>
                        <div className="flex flex-1 flex-row gap-6">
                            {heroImagesTwo.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    alt={`hero image ${index}`}
                                    width={313}
                                    height={469}
                                    className="w-full h-full object-cover"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-end items-end">
                        <h3 className="text-2xl font-semibold text-right text-black">
                            라이프스타일 기반 맞춤 주거 형태 추천
                        </h3>
                        <p className="text-sm text-grey-500 text-right">
                            간단한 질문으로 개인 상황 파악하고, <br />
                            소득, 저축, 직장 위치, 라이프스타일 분석해요.
                        </p>
                    </div>
                </div>
                {/* Why Section */}
                <h3 className="text-3xl font-semibold text-center text-black">
                    왜 <span className="text-primary-500">첫방</span>을 선택해야
                    할까요?
                </h3>
                <div className="flex flex-row gap-8 w-full mt-12 justify-center mb-[200px]">
                    {whyImages.map((image, index) => (
                        <Card
                            key={index}
                            title={whyTitles[index]}
                            description={whyDescriptions[index]}
                            image={image}
                            backgroundColor={whyBackgroundColors[index]}
                        />
                    ))}
                </div>
            </LandingLayout>
            {/* Testimonials Section */}
            <div className="w-full bg-[#EDEDED] py-16">
                <div className="flex flex-col items-center gap-12 max-w-[1440px] mx-auto px-16">
                    <h3 className="text-3xl font-semibold text-black text-center">
                        이미 많은 분들이{' '}
                        <span className="text-primary-500">첫방</span>으로
                        독립했어요
                    </h3>
                    <div className="flex flex-row gap-8 justify-center">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                name={testimonial.name}
                                age={testimonial.age}
                                company={testimonial.company}
                                salary={testimonial.salary}
                                testimonial={testimonial.testimonial}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* CTA Section */}
            <CTASection />
            {/* Footer */}
            <Footer />
        </div>
    );
}
