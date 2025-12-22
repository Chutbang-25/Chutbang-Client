import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables FIRST
dotenv.config({ path: '.env.local' });

const housingCoordinates = [
    {
        name: '강남 역삼 행복주택',
        lat: 37.498095,
        lng: 127.02761,
    },
    {
        name: '서초 청년주택',
        lat: 37.483569,
        lng: 127.032598,
    },
    {
        name: '송파 잠실 행복주택',
        lat: 37.513294,
        lng: 127.100116,
    },
    {
        name: '마포 상암 청년주택',
        lat: 37.579617,
        lng: 126.889691,
    },
    {
        name: '영등포 여의도 행복주택',
        lat: 37.526436,
        lng: 126.924329,
    },
];

async function updateCoordinates() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !serviceKey) {
            console.error('❌ Missing environment variables');
            process.exit(1);
        }

        const supabase = createClient(supabaseUrl, serviceKey, {
            auth: { persistSession: false },
        });

        console.log('🔄 Updating coordinates...\n');

        for (const housing of housingCoordinates) {
            const { data, error } = await supabase
                .from('public_housing')
                .update({ lat: housing.lat, lng: housing.lng })
                .eq('name', housing.name)
                .select();

            if (error) {
                console.error(`❌ Error updating ${housing.name}:`, error);
            } else if (data && data.length > 0) {
                console.log(`✅ Updated ${housing.name} → (${housing.lat}, ${housing.lng})`);
            } else {
                console.log(`⚠️  No record found for ${housing.name}`);
            }
        }

        console.log('\n✅ Coordinate update complete!');
        process.exit(0);
    } catch (e) {
        console.error('❌ Unexpected error:', e);
        process.exit(1);
    }
}

updateCoordinates();
