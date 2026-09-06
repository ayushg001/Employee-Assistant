import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import Card from '../common/Card';
import { DEPARTMENT_DATA } from '../../data/mockAnalytics';
import { useTheme } from '../../context/ThemeContext';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-lg text-xs">
        <p className="font-bold text-slate-900 dark:text-slate-100">{label}</p>
        <p className="text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
          {payload[0].value} team members
        </p>
      </div>
    );
  }
  return null;
}

export default function DepartmentBarChart() {
  const { isDark } = useTheme();

  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Headcount by Department
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Active team distribution across company divisions
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
          7 Divisions
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DEPARTMENT_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDark ? '#334155' : '#f1f5f9'}
            />
            <XAxis
              dataKey="department"
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#334155' : '#e2e8f0' }}
              interval={0}
              angle={-25}
              textAnchor="end"
            />
            <YAxis
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? '#1e293b' : '#f8fafc' }} />
            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            >
              {DEPARTMENT_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
