export const computeCandidateScore = (candidate, job) => {
  if (!job) return candidate.aiScore || 0;
  const requiredSet = new Set(job.requiredSkills.map((skill) => skill.toLowerCase()));
  const preferredSet = new Set(job.preferredSkills.map((skill) => skill.toLowerCase()));
  const candidateSkills = candidate.skills.map((skill) => skill.toLowerCase());

  const skillMatch = candidateSkills.filter((skill) => requiredSet.has(skill)).length / Math.max(requiredSet.size, 1);
  const preferredMatch = candidateSkills.filter((skill) => preferredSet.has(skill)).length / Math.max(preferredSet.size, 1);
  const experienceMatch = Math.min(candidate.experience / Math.max(job.minExperience, 1), 1);
  const resumeScore = candidate.bio ? Math.min(candidate.bio.length / 400, 1) : 0.5;

  const score = Math.round((skillMatch * 50 + experienceMatch * 20 + preferredMatch * 20 + resumeScore * 10) * 100) / 100;
  return score;
};
