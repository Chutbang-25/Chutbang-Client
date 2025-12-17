import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';

// 공공임대 삭제
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { isAdmin, supabase, response } = await requireAdmin(req);
        if (!isAdmin || !supabase) return response!;

        const { id } = await params;

        const { error } = await supabase
            .from('public_housing')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Delete error:', error);
            return NextResponse.json(
                { success: false, error: 'DB_ERROR', details: error },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Public housing deleted successfully',
        });
    } catch (e: any) {
        console.error('Unexpected error:', e);
        return NextResponse.json(
            { success: false, error: 'INTERNAL_ERROR', details: e.message },
            { status: 500 }
        );
    }
}
