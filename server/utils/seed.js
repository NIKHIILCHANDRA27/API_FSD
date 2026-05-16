import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Recruiter from '../models/Recruiter.js';
import Candidate from '../models/Candidate.js';
import Job from '../models/Job.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seed = async () => {
  await connectDB();
  await Recruiter.deleteMany();
  await Candidate.deleteMany();
  await Job.deleteMany();

  const password = await bcrypt.hash('SecureP@ssw0rd', 12);
  const recruiter = await Recruiter.create({ name: 'Ava Patel', email: 'ava@hiregenius.ai', password, company: 'HireGenius', role: 'Recruiter' });

  await Candidate.create([
    {
      name: 'Noah Chen',
      email: 'noah.chen@example.com',
      phone: '+1 555 0142',
      skills: ['React', 'Node', 'MongoDB', 'TypeScript'],
      experience: 5,
      github: 'https://github.com/noahchen',
      linkedin: 'https://linkedin.com/in/noahchen',
      portfolio: 'https://noahdev.app',
      bio: 'Full-stack developer focused on scalable SaaS products and clean engineering.',
      projects: [{ title: 'TalentPulse', description: 'AI-enabled recruiter dashboard' }],
      aiScore: 92,
      shortlist: true
    },
    {
      name: 'Maya Ruiz',
      email: 'maya.ruiz@example.com',
      phone: '+1 555 0198',
      skills: ['Python', 'Django', 'AWS', 'SQL'],
      experience: 7,
      github: 'https://github.com/mayaruiz',
      linkedin: 'https://linkedin.com/in/mayaruiz',
      portfolio: 'https://mayadev.co',
      bio: 'Engineering leader with strong domain experience in backend architecture.',
      projects: [{ title: 'RecruitStream', description: 'Automated resume parsing and analytics' }],
      aiScore: 88,
      shortlist: false
    }
  ]);

  await Job.create([
    {
      title: 'Senior React Developer',
      requiredSkills: ['React', 'JavaScript', 'TypeScript'],
      preferredSkills: ['Next.js', 'GraphQL', 'Tailwind CSS'],
      minExperience: 4,
      salary: '$90k - $120k',
      location: 'Remote',
      type: 'Remote',
      description: 'Build premium UI experiences and AI-enabled candidate platforms.'
    }
  ]);

  console.log('Seed data created. Recruiter login: ava@hiregenius.ai / SecureP@ssw0rd');
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
