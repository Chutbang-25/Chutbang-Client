import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="w-full bg-[#FAFAFA] py-12 text-black">
            <div className="max-w-[1440px] mx-auto px-16">
                <div className="flex flex-col gap-8">
                    {/* 회사 정보 및 주요 링크 */}
                    <div className="flex flex-row justify-between items-start">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-2xl font-semibold text-black">
                                첫방
                            </h4>
                            <p className="text-sm font-regular text-grey-400">
                                독립이 막막할 땐, 첫방
                            </p>
                        </div>
                        <div className="flex flex-row gap-8">
                            <div className="flex flex-col gap-2">
                                <h5 className="text-sm font-semibold text-black">
                                    서비스
                                </h5>
                                <ul className="flex flex-col gap-1">
                                    <li>
                                        <Link
                                            href="/terms"
                                            className="text-xs font-regular text-grey-400 hover:text-grey-50 transition-colors"
                                        >
                                            이용약관
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/privacy"
                                            className="text-xs font-regular text-grey-400 hover:text-grey-50 transition-colors"
                                        >
                                            개인정보 처리방침
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h5 className="text-sm font-semibold text-black">
                                    문의
                                </h5>
                                <ul className="flex flex-col gap-1">
                                    <li>
                                        <Link
                                            href="/support"
                                            className="text-xs font-regular text-grey-400 hover:text-grey-50 transition-colors"
                                        >
                                            고객센터
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/partnership"
                                            className="text-xs font-regular text-grey-400 hover:text-grey-50 transition-colors"
                                        >
                                            제휴 문의
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 법적 고지사항 */}
                    <div className="flex flex-col gap-4 pt-8 border-t border-grey-800 dark:border-grey-700">
                        <div className="flex flex-col gap-3">
                            <h5 className="text-sm font-semibold text-black">
                                법적 고지사항
                            </h5>
                            <div className="flex flex-col gap-2 text-xs font-regular text-grey-400 leading-relaxed">
                                <div>
                                    <p className="font-semibold text-grey-300 mb-1">
                                        1. 정보 정확성 책임
                                    </p>
                                    <p>
                                        본 서비스에서 제공하는 모든 정보는
                                        참고용이며, 최종 결정은 사용자 및
                                        전문가(공인중개사, 변호사 등)와 상의 후
                                        진행하시기 바랍니다. 본 서비스는 제공된
                                        정보의 정확성에 대해 책임을 지지
                                        않습니다.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold text-grey-300 mb-1">
                                        2. 개인정보 보호
                                    </p>
                                    <p>
                                        본 서비스는 최소한의 정보만 수집하며,
                                        수집된 개인정보는 암호화하여 안전하게
                                        보관합니다. 개인정보 처리방침을
                                        확인하시기 바랍니다.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold text-grey-300 mb-1">
                                        3. 중개업법 관련 안내
                                    </p>
                                    <p>
                                        본 서비스는 부동산 중개 서비스를 직접
                                        제공하지 않으며, 정보 제공 플랫폼입니다.
                                        실제 부동산 계약은 반드시 공인중개사를
                                        통해 진행하시기 바랍니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 법적 참고 자료 */}
                        <div className="flex flex-col gap-2 pt-4 border-t border-grey-800">
                            <h5 className="text-sm font-semibold text-grey-50 dark:text-grey-100">
                                법적 참고 자료
                            </h5>
                            <div className="flex flex-wrap gap-4 text-xs font-regular text-grey-400">
                                <span>주택임대차보호법</span>
                                <span>·</span>
                                <span>공인중개사법</span>
                                <span>·</span>
                                <span>개인정보보호법</span>
                                <span>·</span>
                                <span>
                                    정보통신망 이용촉진 및 정보보호 등에 관한
                                    법률
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 저작권 정보 */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-grey-800">
                        <p className="text-xs font-regular text-grey-500 text-center">
                            © 2024 첫방. All rights reserved.
                        </p>
                        <p className="text-xs font-regular text-grey-500 text-center">
                            본 서비스는 참고용 정보 제공 플랫폼이며, 실제 부동산
                            거래는 공인중개사를 통해 진행하시기 바랍니다.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
