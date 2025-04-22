import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [age, setAge] = useState("");
  const [interests, setInterests] = useState("");
  const [focus, setFocus] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleGenerate = async () => {
    const prompt = `你是一位富有耐心和爱心的儿童成长顾问，善于用温暖、贴心、接地气的语言为家长提供建议。以下是家长描述的孩子情况：
- 年龄：${age}
- 兴趣：${interests}
- 家长关注的问题：${focus}
请你用自然口吻提出2-3条建议，可配合 emoji，并用温暖结尾鼓励家长。`;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setSuggestion(data.reply || "抱歉，生成失败了，请稍后重试～");
    } catch (error) {
      console.error("生成失败:", error);
      setSuggestion("抱歉，生成育儿建议时出错了 😢");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>AI 家长教育助手</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <input placeholder="请输入孩子年龄" value={age} onChange={(e) => setAge(e.target.value)} />
        <textarea placeholder="请输入孩子兴趣" value={interests} onChange={(e) => setInterests(e.target.value)} />
        <textarea placeholder="请输入关注点" value={focus} onChange={(e) => setFocus(e.target.value)} />
        <button onClick={handleGenerate} style={{ padding: '0.5rem', backgroundColor: '#4f46e5', color: '#fff' }}>
          ✨ 生成育儿建议
        </button>
        {suggestion && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <pre style={{ marginTop: '1rem', background: '#f4f4f5', padding: '1rem', borderRadius: '0.5rem' }}>
              {suggestion}
            </pre>
          </motion.div>
        )}
      </div>
    </div>
  );
}