import { useMemo, useState } from "react";
import { FaqItemType } from "@/constants/faq";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface FaqItemProps {
  item: FaqItemType;
  index: number;
}

function FaqItem({ item, index: number }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(true);

  const answerContent = useMemo(() => {
    if (Array.isArray(item.answer)) {
      return (
        <div className="flex flex-col gap-3">
          {item.answer.map((line, index) => (
            <p
              key={index}
              className="text-wrap break-words text-gray-900 leading-relaxed"
            >
              {line}
            </p>
          ))}
        </div>
      );
    }
    return (
      <p className="text-wrap break-words text-gray-900 leading-relaxed">
        {item.answer}
      </p>
    );
  }, [item.answer]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="duration-300 border border-emerald-700 flex flex-col gap-4">
      <button
        onClick={handleToggle}
        className="w-full px-6 py-2 flex items-center justify-between text-left cursor-pointer group bg-emerald-700"
      >
        <span className="font-semibold text-white pr-4 group-hover:text-emerald-100 transition-colors duration-200">
          {number}. {item.question}
        </span>
        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center transition-all duration-300">
          {isOpen ? (
            <FaAngleUp className="w-4 h-4 text-white group-hover:text-emerald-100 transition-colors duration-200" />
          ) : (
            <FaAngleDown className="w-4 h-4 text-white group-hover:text-emerald-100 transition-colors duration-200" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 pt-0">{answerContent}</div>
      )}
    </div>
  );
}

export default FaqItem;
