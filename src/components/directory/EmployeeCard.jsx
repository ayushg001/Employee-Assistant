import React from 'react';
import { Mail, Briefcase, Building2 } from 'lucide-react';
import Badge from '../common/Badge';

export default function EmployeeCard({ employee }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 rounded-2xl p-5 shadow-xs transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3.5 mb-4">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800"
            loading="lazy"
          />
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">
              {employee.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{employee.position}</span>
            </p>
          </div>
        </div>

        <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-indigo-500" /> Department
            </span>
            <Badge variant="primary" size="sm">
              {employee.department}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> Email
            </span>
            <a
              href={`mailto:${employee.email}`}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium truncate max-w-[170px]"
            >
              {employee.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
