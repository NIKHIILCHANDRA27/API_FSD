import fs from 'fs/promises';

export const parseResume = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const skills = Array.from(new Set((content.match(/\b(React|Node|MongoDB|GraphQL|Docker|AWS|TypeScript|Python|Java|SQL|NoSQL)\b/gi) || []).map((item) => item.trim())));
    const experienceMatch = content.match(/(\d+)\s+years?/i);
    const experience = experienceMatch ? Number(experienceMatch[1]) : 0;
    const projects = content.match(/Project[s]?:\s*([^\n]+)/i);
    return {
      skills,
      experience,
      projects: projects ? [{ title: projects[1].trim(), description: '' }] : [],
      summary: content.slice(0, 220)
    };
  } catch (error) {
    return { skills: [], experience: 0, projects: [], summary: '' };
  }
};
