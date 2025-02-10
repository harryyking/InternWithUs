import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

enum JobStatus {
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
    CLOSED = 'CLOSED',
    EXPIRED = 'EXPIRED'
}

async function main() {
  // Create mock jobs
  const jobs = [
    {
      position: 'Senior React Developer',
      description: `We are looking for a highly skilled and experienced Senior React Developer to join our dynamic team. 
        The ideal candidate will have a strong background in building scalable, high-performance web applications 
        using React.js. You will be responsible for developing and maintaining user interfaces, collaborating with 
        cross-functional teams, and ensuring the technical feasibility of UI/UX designs.`,
      companyName: 'Tech Corp',
      companyLogo: null,
      employmentType: ['FULL_TIME', 'REMOTE'],
      location: 'Accra, Ghana',
      locationType: ['REMOTE'],
      tags: ['react', 'javascript', 'frontend', 'redux', 'typescript'],
      salary: { 
        min: 5000, 
        max: 10000, 
        currency: 'GH₵', 
        period: 'month' 
      },
      email: 'careers@techcorp.com',
      link: 'https://techcorp.com/careers/react-developer',
      region: ['Africa'],
      status: JobStatus.ACTIVE,
      featured: true,
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
    {
      position: 'Junior Backend Developer',
      description: `We are seeking a motivated Junior Backend Developer to join our growing team. In this role, 
        you will work closely with senior developers to design, develop, and maintain backend systems that power 
        our applications.`,
      companyName: 'Code Masters',
      companyLogo: null,
      employmentType: ['FULL_TIME', 'HYBRID'],
      location: 'Kumasi, Ghana',
      locationType: ['HYBRID'],
      tags: ['nodejs', 'typescript', 'backend', 'express', 'postgresql'],
      salary: { 
        min: 2000, 
        max: 5000, 
        currency: 'GH₵', 
        period: 'month' 
      },
      email: 'hr@codemasters.com',
      link: 'https://codemasters.com/careers/backend-developer',
      region: ['Africa'],
      status: JobStatus.ACTIVE,
      featured: false,
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    }
  ];

  // Seed jobs into the database
  for (const job of jobs) {
    await prisma.job.create({
      data: {
        ...job,
        companyLogo: job.companyLogo ? job.companyLogo : undefined,
        salary: {
          create: job.salary
        }
      }
    });
  }

  console.log('Mock data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });