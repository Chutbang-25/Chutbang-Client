import { Header } from '@/components/layout/Header';
import Image from 'next/image';
import Link from 'next/link';
import { LandingLayout } from '@/components/layout/LandingLayout';
import whyImage1 from '@/public/assets/why/dollar.svg';
import whyImage2 from '@/public/assets/why/spot.svg';
import whyImage3 from '@/public/assets/why/home.svg';
import whyImage4 from '@/public/assets/why/document.svg';
import Card from '@/components/Card';
import TestimonialCard from '@/components/TestimonialCard';
import { Button } from '@/components/common/ui/Button';
import Footer from '@/components/layout/Footer';

export default function Home() {
    const heroImages = [
        '/assets/content/hero-image1.jpg',
        '/assets/content/hero-image2.jpg',
        '/assets/content/hero-image3.jpg',
    ];

    const heroImagesTwo = [
        '/assets/content/hero-image4.jpg',
        '/assets/content/hero-image5.jpg',
    ];

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
            {/* Hero Section: Semantic Tag로 변경, 높이 설정 최적화 */}
            <section className="relative w-full h-[600px] md:h-[calc(100vh-80px)] max-h-[400px] flex items-center justify-center overflow-hidden">
                {/* 배경 이미지: Next.js 'fill' 속성 사용하여 반응형 완벽 대응 */}
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/assets/landing-image.jpg"
                        alt="사회초년생을 위한 첫 독립 가이드 배경" // alt 태그 구체화 (SEO)
                        fill
                        priority // LCP(로딩 속도) 최적화
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/20" />{' '}
                    {/* 이미지 어둡게 처리 */}
                </div>

                {/* 텍스트 컨텐츠: z-index로 위로 올림 */}
                <div className="z-10 flex flex-col items-center justify-center px-4 text-center text-white">
                    {/* H1 태그 사용 (SEO 핵심) */}
                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 drop-shadow-md">
                        독립이 막막할 땐,{' '}
                        <span className="text-primary-500">첫방</span>
                    </h1>

                    <p className="text-base md:text-lg font-medium text-grey-200 mb-8 max-w-[600px] drop-shadow-sm">
                        월 60만원 월세부터 2억 전세, 행복주택 그리고
                        <br className="md:hidden" /> 계약 가이드까지 한 번에
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        {/* 버튼 크기 및 터치 영역 모바일 최적화 */}
                        <Link href="/search" className="w-full md:w-auto">
                            <Button
                                variant="primary"
                                className="w-full md:w-auto min-w-[160px] h-12 text-lg rounded-full shadow-lg cursor-pointer"
                            >
                                내 맞춤 집 찾기
                            </Button>
                        </Link>
                        <Button
                            variant="outline" // ghost보다 outline이 배경 위에서 더 잘 보임
                            className="w-full md:w-auto min-w-[160px] h-12 text-lg rounded-full border-white text-white cursor-pointer"
                        >
                            더 알아보기
                        </Button>
                    </div>
                </div>
            </section>
            {/* Content Section */}
            <LandingLayout>
                <div className="flex flex-col md:flex-row items-center justify-center mb-16 md:mb-[200px] w-full px-4 md:px-0">
                    <div className="flex flex-col gap-2 mb-8 md:mb-0 w-full md:w-full">
                        <h3 className="text-2xl md:text-2xl font-semibold text-black">
                            국가가 인증한 <br className="md:hidden" /> 100% 안전
                            매물
                        </h3>
                        <p className="text-base text-grey-500">
                            공공데이터포털에서 제공하는 매물로{' '}
                            <br className="hidden md:block" />
                            인증받은 매물만 제공해요.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:flex-1 justify-end items-end">
                        <p className="text-xs text-grey-500 self-start md:self-end">
                            *예시 이미지입니다.
                        </p>
                        <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-6 w-full">
                            {heroImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative w-full aspect-[313/469] md:w-[313] md:h-[469]"
                                >
                                    <Image
                                        src={image}
                                        alt={`안심 전세 매물 예시 ${index + 1}`}
                                        fill
                                        className="object-cover rounded-lg"
                                        sizes="(max-width: 768px) 50vw, 313px"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center mb-16 md:mb-[200px] w-full px-4 md:px-0">
                    <div className="flex flex-col gap-2 mb-8 md:mb-0 w-full md:w-full md:order-2">
                        <h3 className="text-2xl md:text-2xl font-semibold text-black md:text-right">
                            라이프스타일 기반 <br className="md:hidden" /> 맞춤
                            주거 형태 추천
                        </h3>
                        <p className="text-base text-grey-500 md:text-right">
                            간단한 질문으로 개인 상황 파악하고,{' '}
                            <br className="hidden md:block" />
                            소득, 저축, 직장 위치, 라이프스타일 분석해요.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:flex-1 justify-start items-start md:order-1">
                        <p className="text-xs text-grey-500">
                            *예시 이미지입니다.
                        </p>
                        <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-6 w-full">
                            {heroImagesTwo.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative w-full aspect-[430/332] md:w-[430px] md:h-[332px]"
                                >
                                    <Image
                                        src={image}
                                        alt={`맞춤 주거 형태 예시 ${index + 1}`}
                                        fill
                                        className="object-cover rounded-lg"
                                        sizes="(max-width: 768px) 50vw, 430px"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Why Section */}
                <h3 className="text-2xl md:text-3xl font-semibold text-center text-black px-4">
                    왜 <span className="text-primary-500">첫방</span>을 선택해야
                    할까요?
                </h3>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full mt-8 md:mt-12 justify-center mb-16 md:mb-[200px] px-4">
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
            <div className="w-full bg-[#FAFAFA] py-16">
                <div className="flex flex-col items-center gap-12 max-w-[1440px] mx-auto px-4 md:px-16">
                    <h3 className="text-3xl font-semibold text-black text-center">
                        이미 많은 분들이{' '}
                        <span className="text-primary-500">첫방</span>으로
                        독립했어요
                    </h3>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center w-full">
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
            <div className="w-full py-16">
                <div className="flex flex-col items-center gap-1">
                    <h3 className="text-3xl font-semibold text-center text-black">
                        첫 독립, 첫방으로 시작하세요
                    </h3>
                    <p className="text-sm font-regular text-grey-500 dark:text-grey-300 text-center mb-6">
                        3분이면 당신에게 딱 맞는 집을 찾을 수 있어요
                    </p>
                    <Link href="/search" className="w-full md:w-auto px-4">
                        <button className="w-full md:w-[190px] h-[64px] bg-primary-500 text-white text-xl font-bold rounded-lg cursor-pointer">
                            무료로 시작하기
                        </button>
                    </Link>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
}
