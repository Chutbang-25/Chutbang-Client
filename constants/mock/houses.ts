import { House } from '@/types/house';

// 1. 가짜 매물 데이터 (나중에는 DB에서 가져올 부분)
// 관악구, 동작구 쪽 좌표입니다.
const MOCK_HOUSES: House[] = [
    { id: 1, name: '신림동 옥탑방', x: 126.929, y: 37.482, price: '500/40' }, // 신림역 부근
    {
        id: 2,
        name: '상도동 신축 빌라',
        x: 126.945,
        y: 37.502,
        price: '2000/60',
    }, // 상도역 부근
    { id: 3, name: '봉천동 반지하', x: 126.952, y: 37.481, price: '300/30' }, // 서울대입구 부근
];

export default MOCK_HOUSES;
