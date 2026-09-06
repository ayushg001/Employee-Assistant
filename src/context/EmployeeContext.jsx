import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_EMPLOYEES, DEPARTMENTS } from '../data/mockEmployees';

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employees] = useState(INITIAL_EMPLOYEES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesDept =
        selectedDepartment === 'All' ||
        emp.department.toLowerCase() === selectedDepartment.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        emp.name.toLowerCase().includes(query) ||
        emp.position.toLowerCase().includes(query) ||
        emp.department.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query);

      return matchesDept && matchesSearch;
    });
  }, [employees, searchQuery, selectedDepartment]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All');
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        filteredEmployees,
        departments: DEPARTMENTS,
        searchQuery,
        setSearchQuery,
        selectedDepartment,
        setSelectedDepartment,
        resetFilters,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
}
