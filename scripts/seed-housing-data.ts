import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables FIRST
dotenv.config({ path: '.env.local' });

const sampleHousingData = [
    {
        name: '강남 역삼 행복주택',
        type: '행복주택',
        location: '서울시 강남구 역삼동',
        city: '서울',
        district: '강남구',
        income_limit: 3000,
        age_limit: 39,
        application_start: '2024-01-01',
        application_end: '2025-12-31',
        official_link: 'https://www.lh.or.kr',
    },
    {
        name: '서초 청년주택',
        type: '청년주택',
        location: '서울시 서초구 서초동',
        city: '서울',
        district: '서초구',
        income_limit: 4000,
        age_limit: 39,
        application_start: '2024-01-01',
        application_end: '2025-12-31',
        official_link: 'https://www.lh.or.kr',
    },
    {
        name: '송파 잠실 행복주택',
        type: '행복주택',
        location: '서울시 송파구 잠실동',
        city: '서울',
        district: '송파구',
        income_limit: 3500,
        age_limit: 39,
        application_start: '2024-01-01',
        application_end: '2025-12-31',
        official_link: 'https://www.lh.or.kr',
    },
    {
        name: '마포 상암 청년주택',
        type: '청년주택',
        location: '서울시 마포구 상암동',
        city: '서울',
        district: '마포구',
        income_limit: 3000,
        age_limit: 39,
        application_start: '2024-01-01',
        application_end: '2025-12-31',
        official_link: 'https://www.lh.or.kr',
    },
    {
        name: '영등포 여의도 행복주택',
        type: '행복주택',
        location: '서울시 영등포구 여의도동',
        city: '서울',
        district: '영등포구',
        income_limit: 3200,
        age_limit: 39,
        application_start: '2024-01-01',
        application_end: '2025-12-31',
        official_link: 'https://www.lh.or.kr',
    },
];

async function seedData() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !serviceKey) {
            console.error('❌ Missing environment variables');
            console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl);
            console.error('SUPABASE_SERVICE_ROLE_KEY:', !!serviceKey);
            process.exit(1);
        }

        const supabase = createClient(supabaseUrl, serviceKey, {
            auth: { persistSession: false },
        });

        const { data, error } = await supabase
            .from('public_housing')
            .insert(sampleHousingData)
            .select();

        if (error) {
            console.error('❌ Error inserting data:', error);
            process.exit(1);
        }

        console.log('✅ Successfully inserted', data.length, 'housing records');
        console.log(data);
        process.exit(0);
    } catch (e) {
        console.error('❌ Unexpected error:', e);
        process.exit(1);
    }
}

seedData();
