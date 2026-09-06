import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Building2, BarChart3 } from 'lucide-react';
import MetricCard from '../components/analytics/MetricCard';
import DepartmentBarChart from '../components/analytics/DepartmentBarChart';
import StatusPieChart from '../components/analytics/StatusPieChart';
import { KPI_METRICS } from '../data/mockAnalytics';

export default function AnalyticsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Analytics Dashboard</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Workplace statistics, department headcounts, and employee status.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <MetricCard
          title="Total Employees"
          value={KPI_METRICS.totalEmployees}
          subtitle="Registered staff members"
          icon={Users}
          color="indigo"
        />

        <MetricCard
          title="Active Employees"
          value={KPI_METRICS.activeEmployees}
          subtitle="Currently working"
          icon={UserCheck}
          color="emerald"
        />

        <MetricCard
          title="Departments"
          value={KPI_METRICS.totalDepartments}
          subtitle="Operational divisions"
          icon={Building2}
          color="violet"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentBarChart />
        <StatusPieChart />
      </div>
    </motion.div>
  );
}
