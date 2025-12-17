// 매물 타입 정의
export interface House {
    id: number;
    name: string;
    x: number;
    y: number;
    price: string;
    time?: number; // API 응답에서 추가되는 통근 시간
}
