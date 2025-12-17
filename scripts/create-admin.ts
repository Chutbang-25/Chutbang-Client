import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// .env.local 파일 로드
dotenv.config({ path: resolve(__dirname, '../.env.local') });

async function createAdminUser() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!supabaseUrl || !supabaseServiceKey || !adminEmail || !adminPassword) {
        console.error('❌ 환경 변수가 설정되지 않았습니다.');
        console.log('필요한 환경 변수:');
        console.log('- NEXT_PUBLIC_SUPABASE_URL');
        console.log('- SUPABASE_SERVICE_ROLE_KEY');
        console.log('- ADMIN_EMAIL');
        console.log('- ADMIN_PASSWORD');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });

    console.log('🚀 관리자 계정 생성 중...');
    console.log(`📧 이메일: ${adminEmail}`);

    try {
        // 1. 관리자 계정 생성
        const { data, error } = await supabase.auth.admin.createUser({
            email: adminEmail,
            password: adminPassword,
            email_confirm: true, // 이메일 인증 자동 확인
            user_metadata: {
                role: 'admin',
                nickname: 'Admin',
            },
        });

        if (error) {
            // 이미 존재하는 계정인 경우
            if (error.message.includes('already registered')) {
                console.log(
                    '⚠️  이미 존재하는 계정입니다. 메타데이터를 업데이트합니다...'
                );

                // 기존 사용자 찾기
                const { data: users } = await supabase.auth.admin.listUsers();
                const existingUser = users?.users.find(
                    (u) => u.email === adminEmail
                );

                if (existingUser) {
                    // 메타데이터 업데이트
                    const { error: updateError } =
                        await supabase.auth.admin.updateUserById(
                            existingUser.id,
                            {
                                user_metadata: {
                                    role: 'admin',
                                    nickname: 'Admin',
                                },
                            }
                        );

                    if (updateError) {
                        console.error(
                            '❌ 메타데이터 업데이트 실패:',
                            updateError
                        );
                        process.exit(1);
                    }

                    console.log('✅ 관리자 권한이 부여되었습니다!');
                    console.log(`👤 사용자 ID: ${existingUser.id}`);
                }
            } else {
                console.error('❌ 계정 생성 실패:', error);
                process.exit(1);
            }
        } else {
            console.log('✅ 관리자 계정이 생성되었습니다!');
            console.log(`👤 사용자 ID: ${data.user.id}`);
        }

        console.log('\n📋 관리자 계정 정보:');
        console.log(`이메일: ${adminEmail}`);
        console.log(`비밀번호: ${adminPassword}`);
        console.log('\n🎉 설정이 완료되었습니다!');
    } catch (err) {
        console.error('❌ 오류 발생:', err);
        process.exit(1);
    }
}

createAdminUser();
