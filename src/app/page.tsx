"use client";

import { useState } from "react";
import { Copy, Droplets, Lock, Key } from "lucide-react";

export default function PromptifyPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ original: string; optimized: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "MrLuong135") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Mật khẩu không đúng. Vui lòng thử lại.");
    }
  };

  const handleOptimize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");

    // Simulate API processing
    setTimeout(() => {
      // Mock logic for demonstration
      // In a real app, this would call an API using apiKeyInput
      const optimized = `Hãy đóng vai một chuyên gia trong lĩnh vực này. Tôi muốn bạn thực hiện yêu cầu sau một cách chi tiết và sáng tạo:

"${input}"

Vui lòng bao gồm các ví dụ cụ thể, phân tích bối cảnh và đưa ra các bước thực hiện rõ ràng.`;

      setResult({ original: input, optimized });
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#051e3e] text-white font-sans flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#112d52] border border-blue-800/30 rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-100">Promptify</h1>
            <p className="text-gray-400 text-sm">Vui lòng đăng nhập để tiếp tục</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 pl-1">
                Mật khẩu truy cập
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#0a1f3b] border border-blue-800/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="Nhập mật khẩu..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 pl-1">
                Gemini API Key (Tùy chọn)
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="w-full bg-[#0a1f3b] border border-blue-800/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="sk-..."
                />
              </div>
            </div>

            {loginError && (
              <p className="text-red-400 text-sm text-center font-medium bg-red-900/20 py-2 rounded-lg border border-red-500/20">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5"
            >
              Truy cập
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-blue-400/60 text-xs font-medium tracking-wide uppercase">Tác giả: MrLuong</p>
            <p className="text-gray-500 text-[10px] mt-1 font-mono">Zalo: 0907 654 137</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#051e3e] text-white font-sans flex flex-col items-center py-20 px-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-3 text-gray-100 tracking-tight">Promptify</h1>
          <p className="text-gray-400 text-lg">Nâng tầm ý tưởng, Khai phá AI.</p>
          <p className="text-blue-400/60 text-sm mt-3 font-medium tracking-wide uppercase">Tác giả: MrLuong</p>
          <p className="text-gray-500 text-xs mt-1 font-mono">Zalo: 0907 654 137</p>
        </div>

        {!result ? (
          /* Input View */
          <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500">
            <label className="block text-base font-semibold mb-4 text-gray-200 pl-1">
              Nhập ý tưởng của bạn ở đây:
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ví dụ: tạo một logo cho quán cà phê mèo..."
              className="w-full h-64 bg-[#112d52] border border-blue-800/30 rounded-xl p-6 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none text-lg shadow-xl"
            />
            <div className="flex justify-center mt-10">
              <button
                onClick={handleOptimize}
                disabled={loading || !input.trim()}
                className="flex items-center gap-2 bg-[#5c6b7f] hover:bg-[#6d7e94] text-white px-10 py-3 rounded-lg font-medium transition-all disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Droplets className="w-5 h-5" />
                )}
                <span>{loading ? "Đang xử lý..." : "Cải thiện"}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Original */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-4 text-gray-200 pl-1">Prompt Gốc</h3>
              <div className="flex-1 bg-[#112d52] border border-blue-800/30 rounded-xl p-6 text-gray-300 text-lg shadow-xl min-h-[400px]">
                {result.original}
              </div>
            </div>

            {/* Optimized */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4 pl-1 pr-1">
                <h3 className="text-xl font-bold text-blue-400">Prompt Nâng Cao</h3>
                <button
                  onClick={() => copyToClipboard(result.optimized)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                  title="Sao chép"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 bg-[#112d52] border border-blue-800/30 rounded-xl p-6 text-gray-300 text-lg shadow-xl min-h-[400px] whitespace-pre-wrap leading-relaxed">
                {result.optimized}
              </div>
            </div>

            {/* Error Message (Simulated based on user request image, though logic above is success) */}
            {error && (
              <div className="col-span-full text-center mt-6 text-red-400 font-medium">
                {error}
              </div>
            )}

            <div className="col-span-full text-center mt-12">
              <button
                onClick={() => { setResult(null); setInput(""); }}
                className="text-gray-400 hover:text-white hover:underline transition-colors"
              >
                Thử lại với ý tưởng khác
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
