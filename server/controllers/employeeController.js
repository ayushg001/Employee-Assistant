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

// GET /api/employees - Get all employees with optional department and search query
export const getEmployees = async (req, res) => {
  try {
    const { department, search } = req.query;
    let query = {};

    if (department && department !== 'All') {
      query.department = department;
    }

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

// GET /api/employees/analytics - Live organizational analytics calculated from MongoDB
export const getAnalytics = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: 'Active' });

    // Distinct departments count
    const departments = await Employee.distinct('department');
    const totalDepartments = departments.length;

    // Aggregate headcount per department
    const deptAggregation = await Employee.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const departmentData = deptAggregation.map((item) => ({
      department: item._id,
      count: item.count,
      fill: DEPARTMENT_COLORS[item._id] || '#64748b',
    }));

    // Aggregate count per status
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
