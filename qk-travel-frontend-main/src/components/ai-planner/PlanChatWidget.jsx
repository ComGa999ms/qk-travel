import React, { useState, useRef, useEffect } from "react";
import planService from "../../services/planService";

// Floating chat widget that lets a Premium user ask follow-up questions about
// the plan they just generated. History lives in component state only (not persisted).
const PlanChatWidget = ({ planId, isPremium, onUpgradeClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { role: "user"|"assistant", content }
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || isSending) return;

    setError("");
    const nextMessages = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const { answer } = await planService.chatAboutPlan(planId, {
        question,
        history: messages.slice(-10),
      });
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Không gửi được câu hỏi. Vui lòng thử lại.",
      );
      // Roll back the optimistic user message so they can retry.
      setMessages(messages);
      setInput(question);
    } finally {
      setIsSending(false);
    }
  };

  if (!planId) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Panel */}
      {isOpen && (
        <div className="mb-4 w-[360px] max-w-[calc(100vw-3rem)] h-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <i className="fas fa-robot"></i>
              <span className="font-bold">Trợ lý kế hoạch</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Premium gate */}
          {!isPremium ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-crown text-white text-xl"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">
                Tính năng dành cho Premium
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Nâng cấp Premium để hỏi đáp trực tiếp về kế hoạch du lịch của bạn.
              </p>
              <button
                onClick={onUpgradeClick}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
              >
                <i className="fas fa-crown mr-2"></i> Nâng cấp ngay
              </button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
              >
                {messages.length === 0 && (
                  <div className="text-center text-gray-400 text-sm mt-8">
                    <i className="fas fa-comments text-3xl mb-2 block"></i>
                    Hỏi mình bất cứ điều gì về kế hoạch này nhé!
                    <div className="mt-3 space-y-1.5 text-xs text-gray-500">
                      <p>Ví dụ: "Ngày 1 nên mang gì?"</p>
                      <p>"Có món chay nào không?"</p>
                      <p>"Đổi giúp lịch trình ngày 2 cho thư thả hơn"</p>
                    </div>
                  </div>
                )}
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-br-sm"
                          : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isSending && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm">
                      <i className="fas fa-spinner fa-spin text-gray-400"></i>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="px-4 py-2 text-xs text-red-600 bg-red-50 border-t border-red-100">
                  {error}
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={handleSend}
                className="p-3 border-t border-gray-100 flex gap-2 shrink-0"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập câu hỏi..."
                  disabled={isSending}
                  className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                />
                <button
                  type="submit"
                  disabled={isSending || !input.trim()}
                  className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl transition-colors shrink-0"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
        title="Hỏi về kế hoạch"
      >
        <i className={`fas ${isOpen ? "fa-times" : "fa-comments"} text-xl`}></i>
      </button>
    </div>
  );
};

export default PlanChatWidget;
