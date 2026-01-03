import { FaqHeader, FaqItem } from "@/components/faq";
import { FAQ_ITEMS } from "@/constants/faq";

function FaqPage() {
  return (
    <div className="lg:w-[40%] my-16 mx-auto md:w-[60%] w-[80%]">
      <FaqHeader />
      <div className="flex flex-col gap-4 mt-8">
        {FAQ_ITEMS.map((item, index) => (
          <FaqItem key={index} item={item} index={index + 1} />
        ))}
      </div>
      <div>
        <p className="text-sm text-gray-500 mt-8 text-center">
          For further inquiries or to report a bug, please submit an issue via
          our repository
          <a
            href="https://github.com/git-mastery/git-mastery/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline ml-1"
          >
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default FaqPage;
