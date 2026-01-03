import { FaqItemType } from "@/constants/faq";

interface FaqItemProps {
  item: FaqItemType;
}

function FaqItem({ item }: FaqItemProps) {
  const renderAnswer = () => {
    if (Array.isArray(item.answer)) {
      return (
        <div className="flex flex-col gap-2">
          {item.answer.map((line, index) => (
            <p key={index} className="text-wrap break-words">
              {line}
            </p>
          ))}
        </div>
      );
    }
    return <p className="text-wrap break-words">{item.answer}</p>;
  };

  return (
    <div className="border border-gray-300 rounded-sm overflow-hidden">
      <div className="bg-emerald-700 text-white px-4 py-2 font-medium border-b border-emerald-800">
        {item.question}
      </div>
      <div className="bg-white px-4 py-4">{renderAnswer()}</div>
    </div>
  );
}

export default FaqItem;
