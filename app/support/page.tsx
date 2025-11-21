import { Header } from '@/components/layout/Header';
import { LandingLayout } from '@/components/layout/LandingLayout';
import Footer from '@/components/layout/Footer';

export default function SupportPage() {
    return (
        <div>
            <Header />
            <LandingLayout>
                <div className="flex flex-col gap-8 py-16 text-black">
                    <h1 className="text-4xl font-semibold text-center">
                        고객센터
                    </h1>
                    <div className="flex flex-col gap-8">
                        {/* 자주 묻는 질문 */}
                        <section className="flex flex-col gap-6">
                            <h2 className="text-2xl font-semibold">
                                자주 묻는 질문
                            </h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2 p-6 border border-grey-200 rounded-lg">
                                    <h3 className="text-lg font-semibold">
                                        Q. 첫방은 어떤 서비스인가요?
                                    </h3>
                                    <p className="text-sm text-grey-600">
                                        A. 첫방은 독립을 준비하는 분들을 위한
                                        부동산 정보 제공 플랫폼입니다. 예산 맞춤
                                        추천, 지역 분석, 공공임대 매칭 정보,
                                        계약 가이드 등을 제공합니다.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 p-6 border border-grey-200 rounded-lg">
                                    <h3 className="text-lg font-semibold">
                                        Q. 실제 부동산 거래를 중개하나요?
                                    </h3>
                                    <p className="text-sm text-grey-600">
                                        A. 아니요. 첫방은 부동산 중개 서비스를
                                        제공하지 않으며, 정보 제공 플랫폼입니다.
                                        실제 부동산 계약은 반드시 공인중개사를
                                        통해 진행하시기 바랍니다.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 p-6 border border-grey-200 rounded-lg">
                                    <h3 className="text-lg font-semibold">
                                        Q. 제공되는 정보의 정확성은 보장되나요?
                                    </h3>
                                    <p className="text-sm text-grey-600">
                                        A. 첫방에서 제공하는 모든 정보는
                                        참고용입니다. 최종 결정을 내리기 전에는
                                        반드시 공인중개사나 변호사 등 전문가와
                                        상의하시기 바랍니다.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 p-6 border border-grey-200 rounded-lg">
                                    <h3 className="text-lg font-semibold">
                                        Q. 회원가입이 필수인가요?
                                    </h3>
                                    <p className="text-sm text-grey-600">
                                        A. 기본 정보 조회는 회원가입 없이
                                        가능하지만, 맞춤형 추천 서비스를
                                        이용하시려면 회원가입이 필요합니다.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 p-6 border border-grey-200 rounded-lg">
                                    <h3 className="text-lg font-semibold">
                                        Q. 개인정보는 안전하게 보호되나요?
                                    </h3>
                                    <p className="text-sm text-grey-600">
                                        A. 네, 첫방은 개인정보보호법을 준수하며,
                                        수집된 개인정보는 암호화하여 안전하게
                                        보관합니다. 자세한 내용은 개인정보
                                        처리방침을 참고해주세요.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 문의하기 */}
                        <section className="flex flex-col gap-6 pt-8 border-t border-grey-200">
                            <h2 className="text-2xl font-semibold">문의하기</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold">
                                        이메일 문의
                                    </h3>
                                    <p className="text-sm text-grey-600">
                                        haminni.dev@gmail.com
                                    </p>
                                    <p className="text-xs text-grey-500">
                                        평일 09:00 - 18:00 (주말 및 공휴일 제외)
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold">
                                        전화 문의
                                    </h3>
                                    <p className="text-sm text-grey-600">
                                        1588-0000
                                    </p>
                                    <p className="text-xs text-grey-500">
                                        평일 09:00 - 18:00 (주말 및 공휴일 제외)
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 공지사항 */}
                        <section className="flex flex-col gap-6 pt-8 border-t border-grey-200">
                            <h2 className="text-2xl font-semibold">공지사항</h2>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1 p-4 border-b border-grey-200">
                                    <div className="flex flex-row justify-between items-center">
                                        <h3 className="text-base font-semibold">
                                            서비스 이용 안내
                                        </h3>
                                        <span className="text-xs text-grey-500">
                                            2024.01.15
                                        </span>
                                    </div>
                                    <p className="text-sm text-grey-600">
                                        첫방 서비스 이용 시 주의사항을
                                        안내드립니다.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1 p-4 border-b border-grey-200">
                                    <div className="flex flex-row justify-between items-center">
                                        <h3 className="text-base font-semibold">
                                            개인정보 처리방침 변경 안내
                                        </h3>
                                        <span className="text-xs text-grey-500">
                                            2024.01.01
                                        </span>
                                    </div>
                                    <p className="text-sm text-grey-600">
                                        개인정보 처리방침이 변경되었습니다.
                                    </p>
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
