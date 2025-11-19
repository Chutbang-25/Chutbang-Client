import { Header } from "@/components/common/Header"
import landingImage from '@/public/assets/landing-image.svg'
import Image from 'next/image'
import { Button } from "@/components/common/ui/Button"

export default function Home() {
  return (
    <div>
      <Header />
      <main className="relative">
        <div className="absolute top-1/2 left-1/2 flex-col items-center justify-center translate-x-[-50%] translate-y-[-50%]">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl text-center letter-spacing-base font-semibold mb-1">독립이 막막할 땐, 첫방</h3>
            <p className="text-sm font-regular text-grey-400">월 60만원 월세부터 2억 전세, 행복주택 그리고 계약 가이드까지</p>
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
        <Image src={landingImage} alt="landing image" width={1000} height={1000} className="w-full h-full object-cover" />
      </main>
    </div>
  )
}