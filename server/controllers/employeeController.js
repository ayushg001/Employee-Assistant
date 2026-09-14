import mongoose from 'mongoose';
import Employee from '../models/Employee.js';

// Department color map for analytics charts
const DEPARTMENT_COLORS = {
  Engineering: '#6366f1',
  Design: '#8b5cf6',
  Product: '#ec4899',
  Marketing: '#f43f5e',
  Sales: '#f97316',
  'Human Resources': '#10b981',
  Finance: '#06b6d4',
};

// 1. GET /api/employees - Get all employees with search & filters
export const getEmployees = async (req, res) => {
  try {
    const { department, status, name, email, search } = req.query;
    let query = {};

    // Filter by department
    if (department && department !== 'All') {
      query.department = department;
    }

    // Filter by status
    if (status && status !== 'All') {
      query.status = status;
    }

    // Search by name
    if (name) {
      query.name = new RegExp(name, 'i');
    }

    // Search by email
    if (email) {
      query.email = new RegExp(email, 'i');
    }

    // General search across all fields
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { position: searchRegex },
        { department: searchRegex },
        { email: searchRegex },
      ];
    }

    const employees = await Employee.find(query).sort({ name: 1 });

    res.json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
};

// 2. GET /api/employees/:id - Get single employee
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid employee ID format' });
    }

    const employee = await Employee.findById(id);

    // If employee does not exist, return 404 instead of letting it throw 500
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error('Error fetching single employee:', error);
    res.status(500).json({ message: 'Failed to fetch employee' });
  }
};

// 3. POST /api/employees - Create employee
export const createEmployee = async (req, res) => {
  try {
    const { name, position, department, email, status, avatar } = req.body;

    // Validation
    if (!name || !position || !department || !email) {
      return res.status(400).json({ message: 'Name, position, department, and email are required' });
    }

    // Check duplicate email
    const existing = await Employee.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'An employee with this email already exists' });
    }

    const employee = new Employee({
      name: name.trim(),
      position: position.trim(),
      department: department.trim(),
      email: email.trim().toLowerCase(),
      status: status || 'Active',
      avatar: avatar || '',
    });

    await employee.save();

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      employee,
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Failed to create employee' });
  }
};

// 4. PUT /api/employees/:id - Update employee
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid employee ID format' });
    }

    const employee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({
      success: true,
      message: 'Employee updated successfully',
      employee,
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Failed to update employee' });
  }
};

// 5. DELETE /api/employees/:id - Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid employee ID format' });
    }

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({
      success: true,
      message: 'Employee deleted successfully',
      id,
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Failed to delete employee' });
  }
};

// 6. GET /api/employees/analytics - Live organizational analytics
export const getAnalytics = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: 'Active' });

    const departments = await Employee.distinct('department');
    const totalDepartments = departments.length;

    const deptAggregation = await Employee.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const departmentData = deptAggregation.map((item) => ({
      department: item._id,
      count: item.count,
      fill: DEPARTMENT_COLORS[item._id] || '#64748b',
    }));

    const statusAggregation = await Employee.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const statusColors = {
      Active: '#10b981',
      'On Leave': '#f59e0b',
      Remote: '#6366f1',
      Inactive: '#ef4444',
    };

    const statusData = statusAggregation.map((item) => ({
      name: item._id,
      value: item.count,
      color: statusColors[item._id] || '#94a3b8',
    }));

    res.json({
      success: true,
      kpi: {
        totalEmployees,
        activeEmployees,
        totalDepartments,
      },
      departmentData,
      statusData,
    });
  } catch (error) {
    console.error('Error calculating analytics:', error);
    res.status(500).json({ message: 'Failed to generate analytics' });
  }
};
