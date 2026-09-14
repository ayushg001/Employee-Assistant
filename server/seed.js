import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from './models/User.js';
import Contact from './models/Contact.js';
import Newsletter from './models/Newsletter.js';
import Quote from './models/Quote.js';
import Employee from './models/Employee.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pulseai';

const INITIAL_EMPLOYEES = [
  {
    name: 'Aarav Sharma',
    position: 'VP of Engineering',
    department: 'Engineering',
    email: 'aarav.sharma@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Priya Patel',
    position: 'Lead UI/UX Designer',
    department: 'Design',
    email: 'priya.patel@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Rohan Verma',
    position: 'Senior Product Manager',
    department: 'Product',
    email: 'rohan.verma@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Ananya Iyer',
    position: 'HR Manager',
    department: 'Human Resources',
    email: 'ananya.iyer@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Vikram Malhotra',
    position: 'Full Stack Developer',
    department: 'Engineering',
    email: 'vikram.malhotra@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Sneha Kulkarni',
    position: 'Frontend Architect',
    department: 'Engineering',
    email: 'sneha.kulkarni@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Kabir Mehta',
    position: 'DevOps Lead',
    department: 'Engineering',
    email: 'kabir.mehta@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Neha Kapoor',
    position: 'Financial Analyst',
    department: 'Finance',
    email: 'neha.kapoor@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Arjun Nair',
    position: 'Growth Marketing Lead',
    department: 'Marketing',
    email: 'arjun.nair@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Meera Joshi',
    position: 'Product Designer',
    department: 'Design',
    email: 'meera.joshi@company.com',
    status: 'On Leave',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Aditya Rao',
    position: 'Enterprise Account Executive',
    department: 'Sales',
    email: 'aditya.rao@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Tara Singhania',
    position: 'Talent Acquisition Partner',
    department: 'Human Resources',
    email: 'tara.singhania@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Siddharth Roy',
    position: 'Backend Specialist',
    department: 'Engineering',
    email: 'siddharth.roy@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Pooja Bhatt',
    position: 'Content Strategist',
    department: 'Marketing',
    email: 'pooja.bhatt@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Kunal Saxena',
    position: 'Sales Operations Analyst',
    department: 'Sales',
    email: 'kunal.saxena@company.com',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Ishaan Sen',
    position: 'VP of Finance',
    department: 'Finance',
    email: 'ishaan.sen@company.com',
    status: 'On Leave',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=160&auto=format&fit=crop&q=80',
  },
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.');

    // 1. Seed Admin User
    const adminEmail = 'admin@pulseai.com';
    const adminPasswordPlain = 'AdminPassword123!';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPasswordPlain, salt);

      const adminUser = new User({
        name: 'PulseAI Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      await adminUser.save();
      console.log(` Admin user created: ${adminEmail} (password: ${adminPasswordPlain})`);
    } else {
      console.log(` Admin user already exists: ${adminEmail}`);
    }

    // 2. Seed Sample Regular User
    const demoEmail = 'user@pulseai.com';
    const existingDemoUser = await User.findOne({ email: demoEmail });
    if (!existingDemoUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('UserPassword123!', salt);
      const demoUser = new User({
        name: 'Alex Johnson',
        email: demoEmail,
        password: hashedPassword,
        role: 'user',
      });
      await demoUser.save();
      console.log(` Demo regular user created: ${demoEmail}`);
    }

    // 3. Seed Employees to MongoDB Atlas
    const employeeCount = await Employee.countDocuments();
    if (employeeCount === 0) {
      await Employee.insertMany(INITIAL_EMPLOYEES);
      console.log(` ${INITIAL_EMPLOYEES.length} employees pushed to MongoDB!`);
    } else {
      console.log(` Employees collection already populated (${employeeCount} records).`);
    }

    // 4. Seed Sample Contact if none exist
    const contactCount = await Contact.countDocuments();
    if (contactCount === 0) {
      await Contact.create([
        {
          name: 'Sarah Connor',
          email: 'sarah.connor@example.com',
          phone: '+1 555-0192',
          subject: 'AI Integration Question',
          message: 'Hello, we would like to explore integrating PulseAI with our internal Slack workspace.',
        },
        {
          name: 'Michael Scott',
          email: 'm.scott@dundermifflin.com',
          phone: '+1 555-0144',
          subject: 'Team Productivity Suite',
          message: 'Looking for a comprehensive employee directory and HR assistant for our regional office.',
        },
      ]);
      console.log(' Sample contacts created.');
    }

    // 5. Seed Sample Newsletter subscriber if none exist
    const newsletterCount = await Newsletter.countDocuments();
    if (newsletterCount === 0) {
      await Newsletter.create([
        { email: 'newsletter.reader@example.com' },
        { email: 'tech.lead@company.io' },
      ]);
      console.log(' Sample newsletter subscribers created.');
    }

    // 6. Seed Sample Quote if none exist
    const quoteCount = await Quote.countDocuments();
    if (quoteCount === 0) {
      await Quote.create([
        {
          name: 'David Wallace',
          email: 'david@cfo-advisors.com',
          phone: '+1 555-0188',
          serviceRequired: 'Enterprise Copilot & Directory',
          budget: '$5,000 - $10,000',
          message: 'Need a complete workspace assistant deployment with tailored directory access.',
        },
      ]);
      console.log(' Sample quotes created.');
    }

    console.log('\n Database seeding finished successfully!');
    console.log('----------------------------------------------------');
    console.log('ADMIN CREDENTIALS:');
    console.log('Email:    admin@pulseai.com');
    console.log('Password: AdminPassword123!');
    console.log('----------------------------------------------------');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
