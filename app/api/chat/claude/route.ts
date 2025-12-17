import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import Anthropic from '@anthropic-ai/sdk';

const chatSchema = z.object({
    sessionId: z.string().optional(),
    message: z.string().min(1),
});

export async function POST(req: NextRequest) {
    try {
        const { user, supabase, response } = await requireUser(req);
        if (!user) return response!;

        const body = await req.json();
        const { sessionId, message } = chatSchema.parse(body);

        // 사용자 프로필 조회
        const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();

        // 세션 ID가 있으면 이전 대화 내역 조회
        let chatHistory: any[] = [];
        let currentSessionId = sessionId;

        if (sessionId) {
            const { data: session } = await supabase
                .from('chat_sessions')
                .select('messages')
                .eq('session_id', sessionId)
                .eq('user_id', user.id)
                .single();

            if (session?.messages) {
                chatHistory = session.messages;
            }
        } else {
            // 새 세션 생성
            const { data: newSession, error: sessionError } = await supabase
                .from('chat_sessions')
                .insert({
                    user_id: user.id,
                    messages: [],
                    created_at: new Date().toISOString(),
                })
                .select('session_id')
                .single();

            if (sessionError || !newSession) {
                return NextResponse.json(
                    { success: false, error: 'SESSION_CREATE_FAILED' },
                    { status: 500 }
                );
            }

            currentSessionId = newSession.session_id;
        }

        // Claude API 호출
        if (!process.env.ANTHROPIC_API_KEY) {
            return NextResponse.json(
                { success: false, error: 'ANTHROPIC_API_KEY_MISSING' },
                { status: 500 }
            );
        }

        const anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });

        // 시스템 프롬프트 구성 (사용자 컨텍스트 포함)
        const systemPrompt = `당신은 청년 주거 전문 상담사입니다. 사용자의 주거 고민을 듣고 적절한 조언을 제공합니다.

사용자 정보:
- 나이: ${profile?.age ?? '미정'}세
- 월 소득: ${profile?.income ?? '미정'}만원
- 저축액: ${profile?.savings ?? '미정'}만원
- 근무지: ${profile?.work_address ?? '미정'}
- 선호 통근 시간: ${profile?.commute_max_minutes ?? '미정'}분
- 거주 형태: ${profile?.household_type ?? '미정'}
- 반려동물 유무: ${profile?.has_pet ? '있음' : '없음'}

사용자의 상황을 고려하여 주거 관련 조언을 제공해주세요.`;

        const messages = [
            ...chatHistory,
            {
                role: 'user',
                content: message,
            },
        ];

        const claudeResponse = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            system: systemPrompt,
            messages: messages,
        });

        const assistantMessage =
            claudeResponse.content[0].type === 'text'
                ? claudeResponse.content[0].text
                : '';

        // 대화 히스토리 업데이트
        const updatedMessages = [
            ...chatHistory,
            { role: 'user', content: message },
            { role: 'assistant', content: assistantMessage },
        ];

        await supabase
            .from('chat_sessions')
            .update({
                messages: updatedMessages,
                updated_at: new Date().toISOString(),
            })
            .eq('session_id', currentSessionId);

        return NextResponse.json({
            success: true,
            data: {
                sessionId: currentSessionId,
                message: assistantMessage,
            },
        });
    } catch (e: any) {
        if (e?.name === 'ZodError') {
            return NextResponse.json(
                { success: false, error: 'INVALID_BODY', details: e.format() },
                { status: 400 }
            );
        }
        console.error('Chat error:', e);
        return NextResponse.json(
            { success: false, error: 'INTERNAL_ERROR', details: e.message },
            { status: 500 }
        );
    }
}
