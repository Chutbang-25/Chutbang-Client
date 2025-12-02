export async function askClaude(question: string, context: any) {
    const systemPrompt = `
  당신은 사회초년생에게 주거를 안내하는 상담사입니다.
  ...
  소득: ${context.income}, 저축: ${context.savings}, 직장: ${context.workLocation}
  `;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_KEY!,
        },
        body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            system: systemPrompt,
            messages: [{ role: 'user', content: question }],
        }),
    });

    return res.json();
}
