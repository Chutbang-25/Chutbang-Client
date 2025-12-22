import { useKakaoLoader as useKakaoLaoderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
    useKakaoLaoderOrigin({
        appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '83cb48d860c96407e382d6c3f5fbd849',
        libraries: ['services', 'drawing', 'clusterer'],
    });
}
