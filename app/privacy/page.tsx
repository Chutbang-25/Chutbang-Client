import { Header } from '@/components/common/Header';
import { LandingLayout } from '@/components/layout/LandingLayout';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
    return (
        <div>
            <Header />
            <LandingLayout>
                <div className="flex flex-col gap-8 py-16 text-black">
                    <h1 className="text-4xl font-semibold text-center">
                        개인정보 처리방침
                    </h1>
                    <div className="flex flex-col gap-6 text-sm font-regular leading-relaxed">
                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제1조 (개인정보의 처리 목적)
                            </h2>
                            <p>
                                첫방(이하 "회사")은 다음의 목적을 위하여
                                개인정보를 처리합니다. 처리하고 있는 개인정보는
                                다음의 목적 이외의 용도로는 이용되지 않으며,
                                이용 목적이 변경되는 경우에는 개인정보보호법
                                제18조에 따라 별도의 동의를 받는 등 필요한
                                조치를 이행할 예정입니다.
                            </p>
                            <div className="flex flex-col gap-2 ml-4">
                                <p>
                                    1. 서비스 제공: 부동산 정보 제공, 맞춤형
                                    추천 서비스 제공
                                </p>
                                <p>
                                    2. 회원 관리: 회원 가입, 본인 확인, 회원
                                    식별, 부정 이용 방지
                                </p>
                                <p>
                                    3. 서비스 개선: 서비스 이용 통계 분석, 신규
                                    서비스 개발
                                </p>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제2조 (개인정보의 처리 및 보유기간)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    1. 회사는 법령에 따른 개인정보 보유·이용기간
                                    또는 정보주체로부터 개인정보를 수집 시에
                                    동의받은 개인정보 보유·이용기간 내에서
                                    개인정보를 처리·보유합니다.
                                </p>
                                <p>
                                    2. 각각의 개인정보 처리 및 보유 기간은
                                    다음과 같습니다:
                                </p>
                                <ul className="list-disc list-inside ml-4 flex flex-col gap-1">
                                    <li>회원 가입 및 관리: 회원 탈퇴 시까지</li>
                                    <li>
                                        서비스 이용 기록: 3년 (통신비밀보호법)
                                    </li>
                                    <li>
                                        계약 또는 청약철회 등에 관한 기록: 5년
                                        (전자상거래법)
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제3조 (처리하는 개인정보의 항목)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    회사는 다음의 개인정보 항목을 처리하고
                                    있습니다:
                                </p>
                                <div className="ml-4">
                                    <p className="font-semibold mb-2">
                                        필수 항목:
                                    </p>
                                    <ul className="list-disc list-inside flex flex-col gap-1">
                                        <li>이름, 이메일 주소</li>
                                        <li>비밀번호 (암호화 저장)</li>
                                        <li>서비스 이용 기록</li>
                                    </ul>
                                    <p className="font-semibold mb-2 mt-4">
                                        선택 항목:
                                    </p>
                                    <ul className="list-disc list-inside flex flex-col gap-1">
                                        <li>전화번호</li>
                                        <li>소득 정보 (맞춤형 추천을 위한)</li>
                                        <li>저축액 정보</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제4조 (개인정보의 제3자 제공)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    1. 회사는 정보주체의 개인정보를 제1조
                                    (개인정보의 처리 목적)에서 명시한 범위
                                    내에서만 처리하며, 정보주체의 동의, 법률의
                                    특별한 규정 등 개인정보보호법 제17조 및
                                    제18조에 해당하는 경우에만 개인정보를
                                    제3자에게 제공합니다.
                                </p>
                                <p>
                                    2. 회사는 원칙적으로 이용자의 개인정보를
                                    외부에 제공하지 않습니다.
                                </p>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제5조 (개인정보처리의 위탁)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    1. 회사는 원활한 개인정보 업무처리를 위하여
                                    다음과 같이 개인정보 처리업무를 위탁하고
                                    있습니다:
                                </p>
                                <ul className="list-disc list-inside ml-4 flex flex-col gap-1">
                                    <li>
                                        클라우드 서비스 제공업체: 서버 운영 및
                                        데이터 저장
                                    </li>
                                </ul>
                                <p>
                                    2. 회사는 위탁계약 체결 시 개인정보보호법
                                    제26조에 따라 위탁업무 수행목적 외 개인정보
                                    처리금지, 기술적·관리적 보호조치, 재위탁
                                    제한, 수탁자에 대한 관리·감독, 손해배상 등에
                                    관한 사항을 계약서 등 문서에 명시하고,
                                    수탁자가 개인정보를 안전하게 처리하는지를
                                    감독하고 있습니다.
                                </p>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제6조 (정보주체의 권리·의무 및 그 행사방법)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    정보주체는 회사에 대해 언제든지 다음 각 호의
                                    개인정보 보호 관련 권리를 행사할 수
                                    있습니다:
                                </p>
                                <ul className="list-disc list-inside ml-4 flex flex-col gap-1">
                                    <li>개인정보 처리정지 요구권</li>
                                    <li>개인정보 열람 요구권</li>
                                    <li>개인정보 정정·삭제 요구권</li>
                                    <li>개인정보 처리정지 요구권</li>
                                </ul>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제7조 (개인정보의 파기)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    1. 회사는 개인정보 보유기간의 경과, 처리목적
                                    달성 등 개인정보가 불필요하게 되었을 때에는
                                    지체없이 해당 개인정보를 파기합니다.
                                </p>
                                <p>
                                    2. 개인정보 파기의 절차 및 방법은 다음과
                                    같습니다:
                                </p>
                                <ul className="list-disc list-inside ml-4 flex flex-col gap-1">
                                    <li>
                                        파기절차: 회사는 파기 사유가 발생한
                                        개인정보를 선정하고, 회사의 개인정보
                                        보호책임자의 승인을 받아 개인정보를
                                        파기합니다.
                                    </li>
                                    <li>
                                        파기방법: 전자적 파일 형태의 정보는
                                        기록을 재생할 수 없는 기술적 방법을
                                        사용하여 삭제합니다.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제8조 (개인정보 보호책임자)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    회사는 개인정보 처리에 관한 업무를 총괄해서
                                    책임지고, 개인정보 처리와 관련한 정보주체의
                                    불만처리 및 피해구제 등을 위하여 아래와 같이
                                    개인정보 보호책임자를 지정하고 있습니다.
                                </p>
                                <div className="ml-4 flex flex-col gap-1">
                                    <p>개인정보 보호책임자</p>
                                    <p>이메일: haminni.dev@gmail.com</p>
                                </div>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold">
                                제9조 (개인정보의 안전성 확보 조치)
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p>
                                    회사는 개인정보의 안전성 확보를 위해 다음과
                                    같은 조치를 취하고 있습니다:
                                </p>
                                <ul className="list-disc list-inside ml-4 flex flex-col gap-1">
                                    <li>
                                        관리적 조치: 내부관리계획 수립·시행,
                                        정기적 직원 교육 등
                                    </li>
                                    <li>
                                        기술적 조치: 개인정보처리시스템 등의
                                        접근권한 관리, 접근통제시스템 설치,
                                        고유식별정보 등의 암호화, 보안프로그램
                                        설치
                                    </li>
                                    <li>
                                        물리적 조치: 전산실, 자료보관실 등의
                                        접근통제
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="flex flex-col gap-4 pt-4 border-t border-grey-200">
                            <p className="text-xs text-grey-500">
                                본 방침은 2024년 1월 1일부터 시행됩니다.
                            </p>
                        </section>
                    </div>
                </div>
            </LandingLayout>
            <Footer />
        </div>
    );
}
