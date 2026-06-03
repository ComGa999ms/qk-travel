import React from "react";

const FAQList = ({ faqs = [] }) => {
  if (!faqs || faqs.length === 0)
    return <div className="text-gray-600">Chưa có FAQ.</div>;

  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <details key={i} className="bg-white rounded-md p-3 shadow-sm">
          <summary className="font-medium cursor-pointer">{f.question}</summary>
          <div className="mt-2 text-gray-700 text-sm">{f.answer}</div>
        </details>
      ))}
    </div>
  );
};

export default FAQList;
