import React from 'react';
import { FaGithub, FaCode, FaTimes } from 'react-icons/fa';

const StatsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse"></div>
            </div>
            Coding Stats Dashboard
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all duration-300"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Your existing Leetcode.js component content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            
            {/* LeetCode Status */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-4">
                <FaCode className="text-orange-400 text-3xl" />
                <h3 className="text-2xl font-semibold text-white">LeetCode Status</h3>
              </div>
              <img
                src="https://leetcard.jacoblin.cool/Aadhithya_Rathakrishnan?theme=dark&animation=true&ext=heatmap"
                alt="LeetCode Stats"
                className="rounded-xl border border-gray-600 hover:scale-105 transition-transform duration-300 max-w-sm w-full shadow-lg"
              />
            </div>

            {/* GitHub Contributions */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-4">
                <FaGithub className="text-red-400 text-3xl" />
                <h3 className="text-2xl font-semibold text-red-400">GitHub Contributions</h3>
              </div>
              <img
                src="https://ghchart.rshah.org/8b5cf6/aadhithyafullfur"
                alt="GitHub Contribution Chart"
                className="rounded-xl border border-gray-600 w-full max-w-xl hover:scale-105 transition-transform duration-300 shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700/50 text-center">
          <p className="text-gray-400 text-sm">
            Real-time stats from GitHub and LeetCode • Updated automatically
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;