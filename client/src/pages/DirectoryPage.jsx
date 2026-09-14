import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterBar from '../components/directory/FilterBar';
import EmployeeCard from '../components/directory/EmployeeCard';
import EmptyState from '../components/common/EmptyState';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { useEmployees } from '../context/EmployeeContext';
import { Users, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DirectoryPage() {
  const {
    filteredEmployees,
    resetFilters,
    searchQuery,
    selectedDepartment,
  } = useEmployees();

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Reset to page 1 whenever search or department filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDepartment]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <span>Employee Directory</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Search and filter team members by department and active status.
        </p>
      </div>

      <FilterBar />

      {isLoading ? (
        <SkeletonLoader type="card" count={6} />
      ) : filteredEmployees.length > 0 ? (
        <>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {currentEmployees.map((employee) => (
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Showing{' '}
                <strong className="text-slate-700 dark:text-slate-300">
                  {startIndex + 1}
                </strong>{' '}
                to{' '}
                <strong className="text-slate-700 dark:text-slate-300">
                  {Math.min(startIndex + itemsPerPage, filteredEmployees.length)}
                </strong>{' '}
                of{' '}
                <strong className="text-slate-700 dark:text-slate-300">
                  {filteredEmployees.length}
                </strong>{' '}
                employees
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                      currentPage === pageNum
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title="No employees found"
          description={`No results found for "${searchQuery || selectedDepartment}". Try searching with a different keyword or clearing the filters.`}
          actionLabel="Reset Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
}
