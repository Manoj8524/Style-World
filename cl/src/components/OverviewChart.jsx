import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
  ResponsiveContainer
} from "recharts";
import "../components/css/OverviewChart.css"; // CSS file import panren

const OverviewChart = (props) => {
  const data = [
    { name: "Customer Order", orders: props.order > 0 ? props.order : 0 }
  ];

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 10, right:10, left: 10, bottom: 0 }}
          barSize={window.innerWidth > 600 ? 50 : 30}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 40, right: 40 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="orders" fill="#495C83" background={{ fill: "#eee" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;
