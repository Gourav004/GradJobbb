import React from "react";

const JobDetailSkeleton = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-[#0B1324] rounded-2xl shadow-[0_0_50px_#00FFFF20] flex flex-col md:flex-row overflow-hidden">
        {/* Left Side */}
        <div className="w-full md:w-2/3 p-8 space-y-6">
          {/* Job Title and Badge */}
          <div className="flex items-center justify-between">
            <div className="h-10 w-2/3 shimmer rounded-md"></div>
            <div className="h-7 w-24 shimmer rounded-full"></div>
          </div>

          {/* Company and Location */}
          <div className="flex items-center gap-6 mt-3">
            <div className="h-5 w-28 shimmer rounded-md"></div>
            <div className="h-5 w-28 shimmer rounded-md"></div>
          </div>

          {/* Job Description */}
          <div className="space-y-3 mt-8">
            <div className="h-6 w-1/4 shimmer rounded-md"></div>
            <div className="h-4 w-full shimmer rounded"></div>
            <div className="h-4 w-[90%] shimmer rounded"></div>
            <div className="h-4 w-[80%] shimmer rounded"></div>
          </div>

          {/* Skills Required */}
          <div className="mt-8">
            <div className="h-6 w-1/4 shimmer rounded-md mb-4"></div>
            <div className="flex flex-wrap gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-7 w-20 shimmer rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Eligible Branches */}
          <div className="mt-8">
            <div className="h-6 w-1/4 shimmer rounded-md mb-4"></div>
            <div className="flex flex-wrap gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-7 w-20 shimmer rounded-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/3 bg-[#0F1A2E] p-8 border-t md:border-t-0 md:border-l border-cyan-900/30 flex flex-col justify-between">
          {/* Info Rows */}
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-5 w-24 shimmer rounded-md"></div>
                <div className="h-5 w-32 shimmer rounded-md"></div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center space-y-5">
            <div className="h-12 w-full shimmer rounded-lg"></div>
            <div className="h-12 w-full shimmer rounded-lg"></div>
            <div className="h-4 w-1/2 shimmer rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Shimmer Effect */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -468px 0; }
          100% { background-position: 468px 0; }
        }

        .shimmer {
          background: linear-gradient(
            to right,
            #1f2937 0%,
            #374151 20%,
            #1f2937 40%,
            #1f2937 100%
          );
          background-size: 800px 104px;
          animation: shimmer 1.4s infinite linear;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default JobDetailSkeleton;
