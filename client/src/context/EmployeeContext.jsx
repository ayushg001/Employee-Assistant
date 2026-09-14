import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_EMPLOYEES, DEPARTMENTS } from '../data/mockEmployees';
import { API_BASE_URL, parseResponse } from '../config/api';

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Fetch employees from MongoDB backend API
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/employees`);
      if (res.ok) {
        const data = await parseResponse(res);
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

      const matchesStatus =
        selectedStatus === 'All' ||
        emp.status?.toLowerCase() === selectedStatus.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        emp.name?.toLowerCase().includes(query) ||
        emp.position?.toLowerCase().includes(query) ||
        emp.department?.toLowerCase().includes(query) ||
        emp.email?.toLowerCase().includes(query);

      return matchesDept && matchesStatus && matchesSearch;
    });
  }, [employees, searchQuery, selectedDepartment, selectedStatus]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All');
    setSelectedStatus('All');
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        filteredEmployees,
        departments: DEPARTMENTS,
        statuses: ['All', 'Active', 'On Leave', 'Remote', 'Inactive'],
        searchQuery,
        setSearchQuery,
        selectedDepartment,
        setSelectedDepartment,
        selectedStatus,
        setSelectedStatus,
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
