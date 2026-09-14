import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';

export default function FilterBar() {
  const {
    departments,
    statuses,
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    selectedStatus,
    setSelectedStatus,
    filteredEmployees,
    resetFilters,
  } = useEmployees();

  const hasActiveFilters =
    searchQuery !== '' || selectedDepartment !== 'All' || selectedStatus !== 'All';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search employees by name, role, department or email..."
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 pl-10 pr-9 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter rows: Department and Status */}
      <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        {/* Department Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Department:
          </span>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                selectedDepartment === dept
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Status Pills and Results Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100/60 dark:border-slate-800/60">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mr-1 shrink-0">
              Status:
            </span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 shrink-0">
            <span>{filteredEmployees.length} employees</span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
