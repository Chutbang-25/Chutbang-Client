const CTASection = () => {
    return (
        <div className="w-full py-16">
            <div className="flex flex-col items-center gap-1">
                <h3 className="text-3xl font-semibold text-center text-black">
                    첫 독립, 첫방으로 시작하세요
                </h3>
                <p className="text-xs font-regular text-grey-500 dark:text-grey-300 text-center mb-6">
                    3분이면 당신에게 딱 맞는 집을 찾을 수 있어요
                </p>
                <button className="w-[190px] h-[64px] bg-primary-500 text-grey-50 text-xl font-bold rounded-lg hover:cursor-pointer hover:scale-105 transition-all duration-300">
                    무료로 시작하기
                </button>
            </div>
        </div>
    );
};

export default CTASection;
