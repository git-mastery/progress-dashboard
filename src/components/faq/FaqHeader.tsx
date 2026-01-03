import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router";

function FaqHeader() {
  const navigate = useNavigate();

  return (
    <header className="mb-6">
      <div className="flex flex-row justify-between items-center mb-8 text-gray-500">
        <nav>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex flex-row gap-2 items-center text-sm cursor-pointer"
          >
            <IoArrowBack size={20} />
            Back
          </button>
        </nav>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-center">
        Frequently Asked Questions
      </h1>
    </header>
  );
}

export default FaqHeader;
