import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Building2, BarChart3, RefreshCw } from 'lucide-react';
import MetricCard from '../components/analytics/MetricCard';
import DepartmentBarChart from '../components/analytics/DepartmentBarChart';
import StatusPieChart from '../components/analytics/StatusPieChart';
import { KPI_METRICS as FALLBACK_KPI } from '../data/mockAnalytics';

export default function AnalyticsPage() {
  const [kpi, setKpi] = useState(FALLBACK_KPI);
  const [departmentData, setDepartmentData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/employees/analytics');
      if (res.ok) {
        const data = await res.json();
        if (data.kpi) {
          setKpi(data.kpi);
        }
        if (data.departmentData) {
          setDepartmentData(data.departmentData);
        }
        if (data.statusData) {
          setStatusData(data.statusData);
        }
      }
    } catch (err) {
      console.warn('Could not fetch live analytics from API, using fallback data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Analytics Dashboard</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Workplace statistics, department headcounts, and employee status.
          </p>
        </div>

        <button
          onClick={fetchAnalytics}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          title="Refresh analytics"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <MetricCard
          title="Total Employees"
          value={kpi.totalEmployees}
          subtitle="Registered staff members"
          icon={Users}
          color="indigo"
        />

        <MetricCard
          title="Active Employees"
          value={kpi.activeEmployees}
          subtitle="Currently working"
          icon={UserCheck}
          color="emerald"
        />

        <MetricCard
          title="Departments"
          value={kpi.totalDepartments}
          subtitle="Operational divisions"
          icon={Building2}
          color="violet"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentBarChart data={departmentData} />
        <StatusPieChart data={statusData} />
      </div>
    </motion.div>
  );
}
