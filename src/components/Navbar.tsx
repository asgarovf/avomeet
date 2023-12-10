import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="py-4 bg-gray-800 sm:py-6" x-data="{expanded: false}">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="shrink-0">
            <Link to="/" title="" className="flex">
              <img className="w-auto h-9" src="/logo.png" alt="" />
            </Link>
          </div>

          <nav className="hidden space-x-10 md:flex md:items-center md:justify-center lg:space-x-12"></nav>
          <div className="relative md:justify-center md:items-center md:inline-flex group">
            <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
            <Link
              to="/meeting"
              title=""
              className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
              role="button"
            >
              Meet now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
