import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { numberWithCommas } from "../../utils/util";
import "./Chart.scss";
export default function Chart({ aspect, title, data, isFeedback }) {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      {isFeedback ? (
        <ResponsiveContainer width="100%" aspect={aspect}>
          <BarChart
            width={550}
            height={600}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Dịch vụ" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Đánh giá" fill="#8884d8" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" aspect={aspect}>
          <BarChart
            width={550}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 50,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              tickFormatter={(tick) => {
                return numberWithCommas(tick);
              }}
            />
            <Tooltip
              formatter={(value) => new Intl.NumberFormat("en").format(value)}
            />
            <Legend />
            <Bar dataKey="Doanh thu" fill="#8884d8" barSize={30} />
            <Bar dataKey="Doanh thu hủy" fill="#82ca9d" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
