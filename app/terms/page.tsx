import { Header } from '@/components/common/Header';
import { LandingLayout } from '@/components/layout/LandingLayout';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
    return (
        <div>
            <Header />
            <LandingLayout>
                <div className="flex flex-col gap-8 py-16 text-black">
                    <h1 className="text-4xl font-semibold text-center">
                        이용약관
                    </h1>
                    <div className="flex flex-col gap-6 text-sm font-regular leading-relaxed">
                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제1조 (목적)
                            </h2>
                            <p>
                                본 약관은 첫방(이하 "회사")이 제공하는 서비스의
                                이용과 관련하여 회사와 이용자 간의 권리, 의무 및
                                책임사항, 기타 필요한 사항을 규정함을 목적으로
                                합니다.
                            </p>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제2조 (정의)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    1. "서비스"란 회사가 제공하는 부동산 정보
                                    제공 플랫폼 및 관련 서비스를 의미합니다.
                                </p>
                                <p>
                                    2. "이용자"란 본 약관에 동의하고 회사가
                                    제공하는 서비스를 이용하는 자를 의미합니다.
                                </p>
                                <p>
                                    3. "콘텐츠"란 서비스를 통해 제공되는 모든
                                    정보, 데이터, 텍스트, 이미지 등을
                                    의미합니다.
                                </p>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제3조 (약관의 효력 및 변경)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    1. 본 약관은 서비스를 이용하고자 하는 모든
                                    이용자에 대하여 그 효력을 발생합니다.
                                </p>
                                <p>
                                    2. 회사는 필요한 경우 관련 법령에 위배되지
                                    않는 범위 내에서 본 약관을 변경할 수
                                    있습니다.
                                </p>
                                <p>
                                    3. 변경된 약관은 서비스 내 공지사항을 통해
                                    공지함으로써 효력이 발생합니다.
                                </p>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제4조 (서비스의 제공 및 변경)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    1. 회사는 다음과 같은 서비스를 제공합니다:
                                </p>
                                <ul className="list-disc list-inside ml-4 flex flex-col gap-1">
                                    <li>부동산 정보 제공</li>
                                    <li>예산 맞춤 추천</li>
                                    <li>지역 분석</li>
                                    <li>공공임대 매칭 정보</li>
                                    <li>계약 가이드 제공</li>
                                </ul>
                                <p>
                                    2. 회사는 서비스의 내용을 변경할 수 있으며,
                                    변경 시 사전에 공지합니다.
                                </p>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제5조 (정보의 정확성)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    1. 회사는 서비스를 통해 제공되는 모든 정보가
                                    참고용임을 명확히 합니다.
                                </p>
                                <p>
                                    2. 이용자는 부동산 거래와 관련된 최종 결정을
                                    내리기 전에 반드시 공인중개사, 변호사 등
                                    전문가와 상의해야 합니다.
                                </p>
                                <p>
                                    3. 회사는 제공된 정보의 정확성, 완전성,
                                    신뢰성에 대해 보장하지 않으며, 정보 오류로
                                    인한 손해에 대해 책임을 지지 않습니다.
                                </p>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제6조 (중개 서비스의 제한)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    1. 회사는 부동산 중개 서비스를 직접 제공하지
                                    않으며, 정보 제공 플랫폼으로서의 역할만을
                                    수행합니다.
                                </p>
                                <p>
                                    2. 실제 부동산 계약은 반드시 공인중개사를
                                    통해 진행해야 합니다.
                                </p>
                                <p>
                                    3. 회사는 이용자와 부동산 소유자 간의 직접
                                    거래를 중개하지 않습니다.
                                </p>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제7조 (이용자의 의무)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    1. 이용자는 서비스를 이용함에 있어 관련
                                    법령을 준수해야 합니다.
                                </p>
                                <p>
                                    2. 이용자는 타인의 정보를 무단으로 수집,
                                    이용하거나 제3자에게 제공해서는 안 됩니다.
                                </p>
                                <p>
                                    3. 이용자는 서비스의 안정적 운영을 방해하는
                                    행위를 해서는 안 됩니다.
                                </p>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제8조 (면책 조항)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    1. 회사는 천재지변, 전쟁, 기간통신사업자의
                                    서비스 중지 등 불가항력으로 인한 서비스
                                    중단에 대해 책임을 지지 않습니다.
                                </p>
                                <p>
                                    2. 회사는 이용자가 서비스 내 정보를 기반으로
                                    내린 결정으로 인한 손해에 대해 책임을 지지
                                    않습니다.
                                </p>
                                <p>
                                    3. 회사는 이용자 간 또는 이용자와 제3자 간의
                                    분쟁에 개입하지 않으며, 이에 대한 책임을
                                    지지 않습니다.
                                </p>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제9조 (준거법 및 관할법원)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    1. 본 약관은 대한민국 법률에 따라 해석되고
                                    적용됩니다.
                                </p>
                                <p>
                                    2. 서비스 이용과 관련하여 발생한 분쟁에
                                    대해서는 회사의 본사 소재지를 관할하는
                                    법원을 관할법원으로 합니다.
                                </p>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4 pt-4 border-t border-grey-200">
                            <p className="text-xs text-grey-500">
                                본 약관은 2025년 11월 20일부터 시행됩니다.
                            </p>
                        </section>
                    </div>
                </div>
            </LandingLayout>
            <Footer />
        </div>
    );
}
