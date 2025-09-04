import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const data = {
  labels: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "Flask", "scikit-learn"],
  datasets: [
    {
      label: "Projects Using Each Technology",
      data: [3, 2, 2, 2, 3, 1, 1],
      backgroundColor: [
        "rgba(79, 70, 229, 0.8)",
        "rgba(59, 130, 246, 0.8)",
        "rgba(6, 182, 212, 0.8)",
        "rgba(20, 184, 166, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(236, 72, 153, 0.8)",
        "rgba(16, 185, 129, 0.8)",
      ],
      borderColor: [
        "rgba(55, 48, 163, 1)",
        "rgba(29, 78, 216, 1)",
        "rgba(14, 116, 144, 1)",
        "rgba(15, 118, 110, 1)",
        "rgba(180, 83, 9, 1)",
        "rgba(190, 24, 93, 1)",
        "rgba(5, 150, 105, 1)",
      ],
      borderWidth: 1,
      hoverBackgroundColor: [
        "rgba(79, 70, 229, 1)",
        "rgba(59, 130, 246, 1)",
        "rgba(6, 182, 212, 1)",
        "rgba(20, 184, 166, 1)",
        "rgba(245, 158, 11, 1)",
        "rgba(236, 72, 153, 1)",
        "rgba(16, 185, 129, 1)",
      ],
      hoverBorderWidth: 3,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: "Number of Projects", color: "#fff", font: { size: 14 } },
      ticks: { color: "#fff" },
      grid: { color: "rgba(255, 255, 255, 0.1)" },
    },
    x: {
      title: { display: true, text: "Technology", color: "#fff", font: { size: 14 } },
      ticks: { color: "#fff" },
      grid: { color: "rgba(255, 255, 255, 0.1)" },
    },
  },
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: "Technology Usage in Projects",
      color: "#fff",
      font: { size: 20, weight: "bold" },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      titleColor: "#fff",
      bodyColor: "#fff",
    },
  },
};

function SkillsChart() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gray-900 dark:bg-gray-900 text-center"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-extrabold text-white mb-8 underline decoration-yellow-400">
          Technology Usage
        </h3>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto glass p-6 rounded-xl"
        >
          <Bar data={data} options={options} />
        </motion.div>
      </div>
    </motion.section>
  );
}

export default SkillsChart;
