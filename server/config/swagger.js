// Swagger API documentation specification (OpenAPI 3.0)
export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'PulseAI - Employee Assistant API',
    version: '1.0.0',
    description:
      'Interactive REST API documentation for PulseAI Workplace Assistant. Includes authentication, employee management, and company contact features.',
  },
  servers: [
    {
      url: '/api',
      description: 'API Base URL',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/health': {
      get: {
        summary: 'Server Health Check',
        responses: {
          200: {
            description: 'Server is running',
          },
        },
      },
    },
    '/auth/register': {
      post: {
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'Jane Doe' },
                  email: { type: 'string', example: 'jane@example.com' },
                  password: { type: 'string', example: 'Password123!' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Registration successful, returns JWT token and user profile' },
          400: { description: 'Bad request or duplicate email' },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'User Login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'admin@pulseai.com' },
                  password: { type: 'string', example: 'AdminPassword123!' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Login successful, returns JWT token and user' },
          400: { description: 'Invalid email or password' },
        },
      },
    },
    '/auth/profile': {
      get: {
        summary: 'Get current user profile',
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'User profile returned' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/employees': {
      get: {
        summary: 'Get employees (with Advanced Search & Pagination)',
        parameters: [
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search name, position, email, department' },
          { name: 'department', in: 'query', schema: { type: 'string' }, description: 'Filter by department' },
          { name: 'status', in: 'query', schema: { type: 'string' }, description: 'Filter by status (Active, On Leave, Remote)' },
          { name: 'page', in: 'query', schema: { type: 'integer', example: 1 }, description: 'Page number for pagination' },
          { name: 'limit', in: 'query', schema: { type: 'integer', example: 10 }, description: 'Results per page' },
        ],
        responses: {
          200: { description: 'List of employees' },
        },
      },
      post: {
        summary: 'Create an employee (Admin only)',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'position', 'department', 'email'],
                properties: {
                  name: { type: 'string', example: 'John Smith' },
                  position: { type: 'string', example: 'Senior Engineer' },
                  department: { type: 'string', example: 'Engineering' },
                  email: { type: 'string', example: 'john.smith@company.com' },
                  status: { type: 'string', example: 'Active' },
                  avatar: { type: 'string', example: 'https://images.unsplash.com/...' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Employee created successfully' },
          400: { description: 'Duplicate email or validation error' },
          401: { description: 'Admin privileges required' },
        },
      },
    },
    '/employees/{id}': {
      get: {
        summary: 'Get single employee by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Employee details' },
          400: { description: 'Invalid employee ID format' },
          404: { description: 'Employee not found' },
        },
      },
      put: {
        summary: 'Update employee (Admin only)',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Employee updated successfully' },
          400: { description: 'Invalid employee ID format' },
          401: { description: 'Admin privileges required' },
          404: { description: 'Employee not found' },
        },
      },
      delete: {
        summary: 'Delete employee (Admin only)',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Employee deleted successfully' },
          400: { description: 'Invalid employee ID format' },
          401: { description: 'Admin privileges required' },
          404: { description: 'Employee not found' },
        },
      },
    },
    '/employees/analytics': {
      get: {
        summary: 'Live organizational analytics aggregation',
        responses: {
          200: { description: 'KPI counts, department breakdown, and status distribution' },
        },
      },
    },
    '/contact': {
      post: {
        summary: 'Submit contact message',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'message'],
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  phone: { type: 'string' },
                  subject: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Message stored in MongoDB' },
        },
      },
    },
    '/quote': {
      post: {
        summary: 'Submit customized quote request',
        responses: {
          201: { description: 'Quote request stored in MongoDB' },
        },
      },
    },
    '/newsletter/subscribe': {
      post: {
        summary: 'Subscribe to newsletter',
        responses: {
          201: { description: 'Subscribed successfully' },
          400: { description: 'Already subscribed' },
        },
      },
    },
  },
};
