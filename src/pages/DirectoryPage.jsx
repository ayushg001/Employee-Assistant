import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterBar from '../components/directory/FilterBar';
import EmployeeCard from '../components/directory/EmployeeCard';
import EmptyState from '../components/common/EmptyState';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { useEmployees } from '../context/EmployeeContext';
import { Users } from 'lucide-react';

export default function DirectoryPage() {
  const {
    filteredEmployees,
    resetFilters,
    searchQuery,
    selectedDepartment,
  } = useEmployees();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Employee Directory</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Search and filter team members by department.
        </p>
      </div>

      <FilterBar />

      {isLoading ? (
        <SkeletonLoader type="card" count={6} />
      ) : filteredEmployees.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredEmployees.map((employee) => (
              <motion.div
                key={employee.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <EmployeeCard employee={employee} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <EmptyState
          title="No employees found"
          description={`No results found for "${searchQuery || selectedDepartment}". Try searching with a different name or clearing the department filter.`}
          actionLabel="Reset Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
}
