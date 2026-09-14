import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_EMPLOYEES, DEPARTMENTS } from '../data/mockEmployees';

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Fetch employees from MongoDB backend API
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/employees');
      if (res.ok) {
        const data = await res.json();
        if (data.employees && data.employees.length > 0) {
          setEmployees(data.employees);
          return;
        }
      }
      // Graceful fallback if database is empty or not yet seeded
      // setEmployees(INITIAL_EMPLOYEES);
    } catch (err) {
      console.warn('Could not fetch from /api/employees, using fallback data:', err);
      // setEmployees(INITIAL_EMPLOYEES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesDept =
        selectedDepartment === 'All' ||
        emp.department?.toLowerCase() === selectedDepartment.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        emp.name?.toLowerCase().includes(query) ||
        emp.position?.toLowerCase().includes(query) ||
        emp.department?.toLowerCase().includes(query) ||
        emp.email?.toLowerCase().includes(query);

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
        loading,
        refreshEmployees: fetchEmployees,
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
