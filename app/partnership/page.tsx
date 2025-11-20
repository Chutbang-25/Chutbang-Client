import { Header } from '@/components/common/Header';
import { LandingLayout } from '@/components/layout/LandingLayout';
import Footer from '@/components/layout/Footer';

export default function PartnershipPage() {
    return (
        <div>
            <Header />
            <LandingLayout>
                <div className="flex flex-col gap-8 py-16 text-black">
                    <h1 className="text-4xl font-semibold text-center">
                        제휴 문의
                    </h1>
                    <div className="flex flex-col gap-8">
                        {/* 제휴 안내 */}
                        <section className="flex flex-col gap-6">
                            <h2 className="text-2xl font-semibold">
                                제휴 안내
                            </h2>
                            <p className="text-sm leading-relaxed">
                                첫방은 다양한 파트너와의 협력을 통해 더 나은
                                서비스를 제공하고자 합니다. 부동산 관련 기관,
                                공인중개사, 금융기관, IT 기업 등 다양한 분야의
                                제휴를 환영합니다.
                            </p>
                        </section>

                        {/* 제휴 분야 */}
                        <section className="flex flex-col gap-6">
                            <h2 className="text-2xl font-semibold">
                                제휴 분야
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2 p-6 border border-grey-200 rounded-lg">
                                    <h3 className="text-lg font-semibold">
                                        부동산 관련 기관
                                    </h3>
                                    <p className="text-sm text-grey-600">
                                        공인중개사, 부동산 중개업체, 부동산 정보
                                        제공 업체 등
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 p-6 border border-grey-200 rounded-lg">
                                    <h3 className="text-lg font-semibold">
                                        금융기관
                                    </h3>
                                    <p className="text-sm text-grey-600">
                                        은행, 저축은행, 보험사, 대출 상담사 등
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 p-6 border border-grey-200 rounded-lg">
                                    <h3 className="text-lg font-semibold">
                                        IT 기업
                                    </h3>
                                    <p className="text-sm text-grey-600">
                                        기술 협력, 플랫폼 연동, 데이터 제공 등
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 p-6 border border-grey-200 rounded-lg">
                                    <h3 className="text-lg font-semibold">
                                        공공기관
                                    </h3>
                                    <p className="text-sm text-grey-600">
                                        지자체, 공공기관, 정부 부처 등
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 제휴 절차 */}
                        <section className="flex flex-col gap-6">
                            <h2 className="text-2xl font-semibold">
                                제휴 절차
                            </h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row gap-4">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-grey-50 font-semibold">
                                        1
                                    </div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <h3 className="text-lg font-semibold">
                                            제휴 문의
                                        </h3>
                                        <p className="text-sm text-grey-600">
                                            이메일 또는 전화를 통해 제휴 문의를
                                            주시면 담당자가 연락드립니다.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-grey-50 font-semibold">
                                        2
                                    </div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <h3 className="text-lg font-semibold">
                                            상담 및 검토
                                        </h3>
                                        <p className="text-sm text-grey-600">
                                            제휴 내용에 대해 상세히 상담하고,
                                            양사에 도움이 되는 방안을
                                            검토합니다.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-grey-50 font-semibold">
                                        3
                                    </div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <h3 className="text-lg font-semibold">
                                            제휴 협약
                                        </h3>
                                        <p className="text-sm text-grey-600">
                                            제휴 조건을 협의하고, 제휴 협약서를
                                            체결합니다.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-grey-50 font-semibold">
                                        4
                                    </div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <h3 className="text-lg font-semibold">
                                            제휴 실행
                                        </h3>
                                        <p className="text-sm text-grey-600">
                                            협약된 내용에 따라 제휴를 실행하고,
                                            지속적으로 모니터링합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 문의하기 */}
                        <section className="flex flex-col gap-6 pt-8 border-t border-grey-200">
                            <h2 className="text-2xl font-semibold">문의하기</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold">
                                        제휴 담당자
                                    </h3>
                                    <p className="text-sm text-grey-600">
                                        이메일: haminni.dev@gmail.com
                                    </p>
                                    <p className="text-sm text-grey-600">
                                        전화: 1588-0000 (내선 2번)
                                    </p>
                                    <p className="text-xs text-grey-500">
                                        평일 09:00 - 18:00 (주말 및 공휴일 제외)
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 p-6 bg-grey-50 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2">
                                        제휴 문의 시 포함해주세요
                                    </h3>
                                    <ul className="list-disc list-inside flex flex-col gap-1 text-sm text-grey-600">
                                        <li>회사명 및 담당자 정보</li>
                                        <li>제휴 목적 및 내용</li>
                                        <li>희망하는 제휴 형태</li>
                                        <li>기대 효과</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </LandingLayout>
            <Footer />
        </div>
    );
}
