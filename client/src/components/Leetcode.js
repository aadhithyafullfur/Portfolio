import React from 'react';
import { FaGithub, FaCode } from 'react-icons/fa';

function Leetcode() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-10 px-6">
      
      {/* LeetCode Status */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-3">
          <FaCode className="text-orange-400 text-2xl" />
          <h2 className="text-2xl font-semibold text-white">LeetCode Status</h2>
        </div>
        <img
          src="https://leetcard.jacoblin.cool/Aadhithya_Rathakrishnan?theme=dark&animation=true&ext=heatmap"
          alt="LeetCode Stats"
          className="rounded-xl border border-gray-600 hover:scale-105 transition-transform duration-300 max-w-sm w-full"
        />
      </div>

      {/* GitHub Contributions with black color */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-3">
          <FaGithub className="text-red-400 text-2xl" />
          <h2 className="text-2xl font-semibold text-red-400">GitHub Contributions</h2>
        </div>
        <img
          src="https://ghchart.rshah.org/8b5cf6/aadhithyafullfur"
          alt="GitHub Contribution Chart"
          className="rounded-xl border border-gray-600 w-full max-w-xl hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}

export default Leetcode;
