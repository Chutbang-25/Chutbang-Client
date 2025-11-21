interface TestimonialCardProps {
    name: string;
    age: string;
    company: string;
    salary: string;
    testimonial: string;
}

const TestimonialCard = ({
    name,
    age,
    company,
    salary,
    testimonial,
}: TestimonialCardProps) => {
    return (
        <div className="w-[319px] h-[144px] px-6 py-6 rounded-lg bg-white border border-grey-100">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-2">
                        <h4 className="text-xl font-semibold text-foreground">
                            {name}
                        </h4>
                        <div className="w-[1px] h-6 bg-foreground" />
                        <span className="text-xl font-semibold text-foreground">
                            {age}
                        </span>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <span className="text-xs font-regular text-grey-500">
                            {company}
                        </span>
                        <span className="text-xs font-regular text-grey-500">
                            ·
                        </span>
                        <span className="text-xs font-regular text-grey-500">
                            {salary}
                        </span>
                    </div>
                </div>
                <p className="text-sm font-regular text-foreground leading-[16.7px] whitespace-pre-line">
                    {testimonial}
                </p>
            </div>
        </div>
    );
};

export default TestimonialCard;
