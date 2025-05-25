const express = require('express');
const fetch = (...args) => import('node-fetch').then(m => m.default)(...args);
const router = express.Router();

// 意图到主题的映射
function mapIntentToSubject(intent) {
    switch (intent) {
        case 'volunteer':
            return { value: 'volunteer', label: '志愿者申请' };
        case 'partnership':
            return { value: 'partnership', label: '合作意向' };
        case 'feedback':
            return { value: 'feedback', label: '意见反馈' };
        case 'general':
            return { value: 'general', label: '一般咨询' };
        default:
            return { value: '', label: '' };
    }
}

// DeepSeek API 调用
async function callDeepSeek(message) {
    const apiKey = 'sk-f40566bfe13846a9a0cb77141d845d07';
    const apiUrl = 'https://api.deepseek.com/v1/chat/completions';
    const prompt = `
请根据以下留言内容判断其主题类别，只返回类别英文代码（volunteer, partnership, feedback, general）：
留言内容：${message}
`;
    const body = {
        model: "deepseek-chat",
        messages: [
            { role: "system", content: "你是一个智能留言主题分类助手。" },
            { role: "user", content: prompt }
        ],
        temperature: 0.2
    };
    const resp = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    if (!resp.ok) throw new Error('DeepSeek API 调用失败');
    const data = await resp.json();
    // 假设返回格式为 { choices: [{ message: { content: "volunteer" } }] }
    const intent = data.choices?.[0]?.message?.content?.trim();
    return intent;
}

// 路由实现
router.post('/api/subject-suggest', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: '缺少 message 参数' });
        const intent = await callDeepSeek(message);
        const subject = mapIntentToSubject(intent);
        res.json(subject);
    } catch (e) {
        res.status(500).json({ error: '主题识别失败' });
    }
});

module.exports = router;
