import React from "react";

const JobCardSkeleton = () => {
  const skeletons = Array(4).fill(0);

  return (
    <div className="bg-gray-950 w-screen min-h-screen p-8 text-white">
      {/* Heading */}
      <div className="h-8 w-full mb-6 rounded-md shimmer"></div>

      {/* Cards */}
      <div className="space-y-6">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row gap-4 animate-fade-in"
          >
            {/* Left Section */}
            <div className="flex-grow space-y-3 md:w-3/4 border-b md:border-b-0 md:border-r border-gray-800 pb-4 md:pb-0 md:pr-6">
              <div className="h-6 w-48 rounded-md shimmer"></div>
              <div className="h-4 w-40 rounded-md shimmer"></div>
              <div className="h-4 w-3/4 rounded-md shimmer"></div>
              <div className="h-4 w-5/6 rounded-md shimmer"></div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mt-3">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-6 w-20 rounded-full shimmer"
                    ></div>
                  ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-between md:w-1/4 space-y-3">
              <div className="h-5 w-32 rounded-md shimmer"></div>
              <div className="h-5 w-40 rounded-md shimmer"></div>
              <div className="h-10 w-32 rounded-md shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCardSkeleton;
