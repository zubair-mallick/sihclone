import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-6 text-gray-300 bg-gray-900">
      <div className="max-w-screen-lg px-6 mx-auto">
        <div className="flex flex-wrap justify-between mb-10">
          <div className="w-full mb-4 text-center md:w-1/3 md:mb-0 md:text-left">
            <h3 className="mb-3 text-xl font-bold text-white">Impower Hub</h3>
            <ul className="mb-4 list-none">
              <li className="mb-2">
                <a
                  href="/education"
                  className="transition-colors hover:text-blue-400"
                >
                  Education
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/counseling"
                  className="transition-colors hover:text-blue-400"
                >
                  Counseling
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/chatbot"
                  className="transition-colors hover:text-blue-400"
                >
                  AI Chatbot
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-bold text-white">Connect</h3>
            <div className="flex justify-center mb-4 space-x-4">
              <a
                href="https://github.com/zubair-mallick"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-gray-600"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/zubair-mallik/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-blue-600"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-blue-600"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-pink-600"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          <div className="w-full mb-4 text-center md:w-1/3 md:mb-0">
            <h3 className="mb-3 text-xl font-bold text-white">Quick Links</h3>
            <ul className="list-none">
              <li className="mb-2">
                <a
                  href="/education"
                  className="transition-colors hover:text-blue-400"
                >
                  Career Suggestor
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/education"
                  className="transition-colors hover:text-blue-400"
                >
                  AI Roadmap Maker
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/counseling"
                  className="transition-colors hover:text-blue-400"
                >
                  Resource Finder
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full mt-6 text-center md:w-full md:text-left">
            <h3 className="mb-3 text-xl font-bold text-white">About Us</h3>
            <p>
              Impower Hub is a project dedicated to providing comprehensive
              guidance and support for education, career development, and AI
              chatbot services.
            </p>
          </div>
        </div>

        <div className="pt-4 mt-6 text-center border-t border-gray-700">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Impower Hub. All rights reserved.
            | This is a project and not an official service.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
