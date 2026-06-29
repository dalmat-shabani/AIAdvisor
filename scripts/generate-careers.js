const fs = require('fs');

const categories = {
  Technology: 'code-slash-outline',
  Finance: 'trending-up-outline',
  Marketing: 'megaphone-outline',
  Design: 'color-palette-outline',
  Business: 'briefcase-outline',
  Healthcare: 'medkit-outline',
  Education: 'school-outline',
  Environment: 'leaf-outline',
  Legal: 'shield-checkmark-outline',
  Creative: 'brush-outline',
};

const roles = [
  { title: 'Software Developer', category: 'Technology' },
  { title: 'Front-End Developer', category: 'Technology' },
  { title: 'Back-End Developer', category: 'Technology' },
  { title: 'Full-Stack Developer', category: 'Technology' },
  { title: 'Mobile App Developer', category: 'Technology' },
  { title: 'Cloud Engineer', category: 'Technology' },
  { title: 'DevOps Engineer', category: 'Technology' },
  { title: 'Site Reliability Engineer', category: 'Technology' },
  { title: 'QA Engineer', category: 'Technology' },
  { title: 'AI Engineer', category: 'Technology' },
  { title: 'Financial Analyst', category: 'Finance' },
  { title: 'Investment Analyst', category: 'Finance' },
  { title: 'Portfolio Manager', category: 'Finance' },
  { title: 'Stock Trader', category: 'Finance' },
  { title: 'Wealth Advisor', category: 'Finance' },
  { title: 'Risk Analyst', category: 'Finance' },
  { title: 'Compliance Officer', category: 'Finance' },
  { title: 'Credit Analyst', category: 'Finance' },
  { title: 'Audit Manager', category: 'Finance' },
  { title: 'Tax Analyst', category: 'Finance' },
  { title: 'Digital Marketing Specialist', category: 'Marketing' },
  { title: 'Content Strategist', category: 'Marketing' },
  { title: 'SEO Specialist', category: 'Marketing' },
  { title: 'Social Media Manager', category: 'Marketing' },
  { title: 'Brand Manager', category: 'Marketing' },
  { title: 'Growth Marketer', category: 'Marketing' },
  { title: 'Email Marketing Specialist', category: 'Marketing' },
  { title: 'PPC Analyst', category: 'Marketing' },
  { title: 'Product Marketer', category: 'Marketing' },
  { title: 'Community Manager', category: 'Marketing' },
  { title: 'UX/UI Designer', category: 'Design' },
  { title: 'Graphic Designer', category: 'Design' },
  { title: 'Product Designer', category: 'Design' },
  { title: 'Visual Designer', category: 'Design' },
  { title: 'Motion Designer', category: 'Design' },
  { title: 'Interaction Designer', category: 'Design' },
  { title: 'Design Researcher', category: 'Design' },
  { title: 'Service Designer', category: 'Design' },
  { title: 'Architecture Designer', category: 'Design' },
  { title: 'Illustration Designer', category: 'Design' },
  { title: 'Business Analyst', category: 'Business' },
  { title: 'Operations Manager', category: 'Business' },
  { title: 'Project Manager', category: 'Business' },
  { title: 'Program Manager', category: 'Business' },
  { title: 'Change Manager', category: 'Business' },
  { title: 'Strategy Consultant', category: 'Business' },
  { title: 'Management Consultant', category: 'Business' },
  { title: 'Sales Manager', category: 'Business' },
  { title: 'Account Manager', category: 'Business' },
  { title: 'Customer Success Manager', category: 'Business' },
  { title: 'Healthcare Administrator', category: 'Healthcare' },
  { title: 'Clinical Data Analyst', category: 'Healthcare' },
  { title: 'Health Informatics Specialist', category: 'Healthcare' },
  { title: 'Medical Office Manager', category: 'Healthcare' },
  { title: 'Patient Advocate', category: 'Healthcare' },
  { title: 'Public Health Analyst', category: 'Healthcare' },
  { title: 'Wellness Coach', category: 'Healthcare' },
  { title: 'Nursing Supervisor', category: 'Healthcare' },
  { title: 'Medical Research Coordinator', category: 'Healthcare' },
  { title: 'Healthcare Consultant', category: 'Healthcare' },
  { title: 'Instructional Designer', category: 'Education' },
  { title: 'Curriculum Developer', category: 'Education' },
  { title: 'Academic Advisor', category: 'Education' },
  { title: 'Learning Experience Designer', category: 'Education' },
  { title: 'Training Specialist', category: 'Education' },
  { title: 'Education Technology Manager', category: 'Education' },
  { title: 'Corporate Trainer', category: 'Education' },
  { title: 'Career Counselor', category: 'Education' },
  { title: 'School Principal', category: 'Education' },
  { title: 'Literacy Specialist', category: 'Education' },
  { title: 'Sustainability Consultant', category: 'Environment' },
  { title: 'Energy Analyst', category: 'Environment' },
  { title: 'Environmental Engineer', category: 'Environment' },
  { title: 'Climate Policy Analyst', category: 'Environment' },
  { title: 'Conservation Scientist', category: 'Environment' },
  { title: 'Renewable Energy Specialist', category: 'Environment' },
  { title: 'Waste Reduction Planner', category: 'Environment' },
  { title: 'Green Building Consultant', category: 'Environment' },
  { title: 'Environmental Compliance Officer', category: 'Environment' },
  { title: 'Water Resources Specialist', category: 'Environment' },
  { title: 'Legal Analyst', category: 'Legal' },
  { title: 'Compliance Specialist', category: 'Legal' },
  { title: 'Contract Manager', category: 'Legal' },
  { title: 'Paralegal', category: 'Legal' },
  { title: 'Intellectual Property Specialist', category: 'Legal' },
  { title: 'Corporate Counsel', category: 'Legal' },
  { title: 'Privacy Officer', category: 'Legal' },
  { title: 'Regulatory Affairs Specialist', category: 'Legal' },
  { title: 'Litigation Support Specialist', category: 'Legal' },
  { title: 'Ethics Officer', category: 'Legal' },
  { title: 'Copywriter', category: 'Creative' },
  { title: 'Content Creator', category: 'Creative' },
  { title: 'Video Producer', category: 'Creative' },
  { title: 'Podcast Producer', category: 'Creative' },
  { title: 'Art Director', category: 'Creative' },
  { title: 'Creative Director', category: 'Creative' },
  { title: 'Motion Graphics Designer', category: 'Creative' },
  { title: 'Editorial Photographer', category: 'Creative' },
  { title: 'Event Producer', category: 'Creative' },
  { title: 'UX Copywriter', category: 'Creative' }
];

const categoryDetails = {
  Technology: {
    skills: ['Problem Solving', 'Coding', 'Debugging', 'Git', 'APIs', 'Architecture'],
    tags: ['technology', 'software', 'coding', 'engineering'],
    salary: '$75,000 - $140,000',
    growth: 'High',
    outlook: 'Strong demand in digital transformation',
  },
  Finance: {
    skills: ['Analysis', 'Excel', 'Modeling', 'Risk Management', 'Research', 'Strategy'],
    tags: ['finance', 'investment', 'analysis', 'money'],
    salary: '$65,000 - $150,000',
    growth: 'Moderate',
    outlook: 'Stable demand across financial services',
  },
  Marketing: {
    skills: ['Communication', 'Analytics', 'Creativity', 'Content', 'Strategy', 'SEO'],
    tags: ['marketing', 'brand', 'growth', 'audience'],
    salary: '$50,000 - $110,000',
    growth: 'High',
    outlook: 'Growing as digital channels expand',
  },
  Design: {
    skills: ['Creativity', 'Visual Design', 'Research', 'UX', 'Prototyping', 'Typography'],
    tags: ['design', 'creativity', 'experience', 'visual'],
    salary: '$55,000 - $120,000',
    growth: 'High',
    outlook: 'Consistent need for product and service design',
  },
  Business: {
    skills: ['Leadership', 'Analysis', 'Planning', 'Organization', 'Strategy', 'Communication'],
    tags: ['business', 'operations', 'management', 'strategy'],
    salary: '$60,000 - $130,000',
    growth: 'Moderate',
    outlook: 'Reliable demand across industries',
  },
  Healthcare: {
    skills: ['Care', 'Administration', 'Research', 'Communication', 'Compliance'],
    tags: ['healthcare', 'wellness', 'medical', 'patient'],
    salary: '$55,000 - $120,000',
    growth: 'High',
    outlook: 'Growing demand in health services and wellness',
  },
  Education: {
    skills: ['Teaching', 'Instruction', 'Curriculum', 'Training', 'Coaching'],
    tags: ['education', 'learning', 'teaching', 'training'],
    salary: '$45,000 - $100,000',
    growth: 'Moderate',
    outlook: 'Ongoing need for skilled educators and trainers',
  },
  Environment: {
    skills: ['Sustainability', 'Analysis', 'Policy', 'Research', 'Engineering'],
    tags: ['environment', 'sustainability', 'climate', 'energy'],
    salary: '$60,000 - $120,000',
    growth: 'High',
    outlook: 'Increasing importance of ESG and climate planning',
  },
  Legal: {
    skills: ['Compliance', 'Research', 'Contracts', 'Ethics', 'Regulation'],
    tags: ['legal', 'compliance', 'contracts', 'regulation'],
    salary: '$60,000 - $140,000',
    growth: 'Moderate',
    outlook: 'Steady demand in corporate, tech, and government sectors',
  },
  Creative: {
    skills: ['Storytelling', 'Creativity', 'Production', 'Visual Communication', 'Editing'],
    tags: ['creative', 'content', 'media', 'storytelling'],
    salary: '$45,000 - $110,000',
    growth: 'Moderate',
    outlook: 'Growth with brands investing in digital content',
  }
};

function extractKeywords(text) {
  const source = String(text || '');
  return source
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map((word) => word.trim())
    .filter((keyword) => keyword.length > 1);
}

function makeCareer(role, index) {
  const categoryName = String(role.category || 'Technology');
  const category = categoryDetails[categoryName] || categoryDetails.Technology;
  const words = extractKeywords(role.title || `${categoryName} Role`);
  const titleSkills = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  const skills = Array.from(new Set([
    ...category.skills.slice(0, 3),
    ...titleSkills,
  ])).slice(0, 5);

  const tags = Array.from(new Set([
    categoryName.toLowerCase(),
    ...category.tags,
    ...words,
  ])).slice(0, 6);

  return {
    id: String(index + 1),
    title: role.title || `${categoryName} Role`,
    category: categoryName,
    salaryRange: category.salary,
    growth: category.growth,
    matchTags: tags,
    description: `${role.title || `${categoryName} Role`} helps organizations by applying ${categoryName.toLowerCase()} knowledge and practical skills to deliver results.`,
    skills,
    education: `${categoryName} degree or relevant experience`,
    outlook: category.outlook,
    icon: categories[categoryName] || 'ellipse-outline',
  };
}

const careers = roles.map(makeCareer);
fs.writeFileSync('src/data/careers.json', JSON.stringify({ careers }, null, 2));
console.log(`Wrote ${careers.length} careers to src/data/careers.json`);
