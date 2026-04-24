import { useKakaoLoader as useKakaoLaoderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
    useKakaoLaoderOrigin({
        appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY ?? '',
        libraries: ['services', 'drawing', 'clusterer'],
    });
}
