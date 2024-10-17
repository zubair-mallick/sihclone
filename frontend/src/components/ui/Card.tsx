import Link from "next/link";

const Card = ({
  title,
  desc,
  link,
}: {
  title: string;
  desc: string;
  link: string;
}) => {
  return (
    <div className="flex flex-col max-w-md p-6 my-8 overflow-hidden text-left text-white transition-transform duration-75 transform bg-gray-900 rounded-lg shadow-glow justify-evenly">
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p>{desc}</p>
      <Link
        href={link}
        className="flex items-center self-end justify-center w-32 max-w-md mt-4 mr-6 gradient-btn"
      >
        Try it
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="ml-1 size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Card;
