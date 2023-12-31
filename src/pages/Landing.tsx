import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Button } from "../ui/Button";

export const Landing = () => {
  return (
    <div className="min-h-[95vh] bg-gray-800">
      <Navbar />

      <section className="relative pt-12 pb-12">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col justify-center items-center">
              <img
                src={"/logo-sm.png"}
                className="w-[64px] h-[64px] mb-2"
                alt="logo small"
              />
              <h1 className="mt-8 text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Connect & collaborate with your team, friends, and family.
              </h1>
            </div>

            <div className="flex flex-col items-center justify-center px-8 mt-12 space-y-5 sm:space-y-0 sm:px-0 sm:space-x-5 sm:flex-row">
              <div className="relative inline-flex items-center justify-center w-full sm:w-auto group">
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <Link to="/meeting">
                  <Button>Get started</Button>
                </Link>
              </div>

              <a
                href="mailto:fasgarov2002@gmail.com"
                title=""
                className="inline-flex items-center justify-center w-full px-8 py-3 text-base font-normal text-white transition-all duration-200 bg-black border border-gray-600 rounded-full sm:w-auto hover:border-white"
                role="button"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="relative mt-12 -mb-4 sm:-mb-10 lg:-mb-12 sm:mt-16 lg:mt-24">
            <div className="absolute top-0 transform -translate-x-1/2 left-1/2">
              <svg
                className="blur-3xl filter"
                width="645"
                height="413"
                viewBox="0 0 645 413"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M181.316 218.778C86.2529 123.715 -63.7045 134.94 31.3589 39.8762C126.422 -55.1873 528.427 41.1918 623.49 136.255C718.554 231.319 470.678 289.068 375.614 384.131C280.551 479.195 276.38 313.842 181.316 218.778Z"
                  fill="url(#d)"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
      <section id="frame" className="relative pt-12 pb-12">
        <div className="flex justify-center">
          <img
            src={"/landing/frame.png"}
            className="w-[75%] h-full"
            alt="frame"
          />
        </div>
      </section>
    </div>
  );
};
