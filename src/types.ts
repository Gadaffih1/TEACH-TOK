export type GradeBand = 'Elementary (K-5)' | 'Middle School (6-8)' | 'High School (9-12)' | 'Higher Ed';

export interface Teacher {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  school: string;
  subjects: string[];
  gradeBand: GradeBand;
  badge: 'AP Master' | 'STEM Lead' | 'Instructional Coach' | 'National Board Certified' | 'Mentor Teacher';
  stolenIdeasCount: number;
}

export type ResourceType = 'hook_script' | 'student_worksheet' | 'misconception_guide' | 'concept_check' | 'interactive_tool';

export interface ResourceQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  whyStudentsGetItWrong: string;
}

export interface InteractiveResource {
  id: string;
  type: ResourceType;
  title: string;
  description: string;
  gradeSuitability: string;
  timeEstimate: string;
  content: {
    overview?: string;
    steps?: { stepNumber: number; title: string; dialogueScript: string; teacherNote: string }[];
    worksheetPrompts?: { prompt: string; scaffoldHint: string; answerKey: string }[];
    misconceptions?: { trap: string; whatStudentSays: string; howToRedirect: string }[];
    quiz?: ResourceQuestion[];
  };
}

export interface TeacherComment {
  id: string;
  authorName: string;
  authorRole: string;
  avatar: string;
  text: string;
  timestamp: string;
  classroomSuccessRating: number; // 1 to 5
  adaptedFor?: string;
  upvotes: number;
  verifiedTeacher: boolean;
}

export type VisualStyle = 
  | 'fractions_visualizer'
  | 'mitosis_visualizer'
  | 'gravity_visualizer'
  | 'pythagorean_visualizer'
  | 'zombie_grammar_visualizer'
  | 'chemical_bonds_visualizer'
  | 'default';

export interface TeachTokVideo {
  id: string;
  title: string;
  concept: string;
  subject: 'Math' | 'Science' | 'English & ELA' | 'History & Social Studies' | 'Arts' | 'Classroom Management';
  gradeBand: GradeBand;
  standardCode: string; // e.g. CCSS.MATH.CONTENT.5.NF.B.4
  pedagogyTag: string; // e.g. "CRA Concrete First", "Zombie Test Analogy", "Kinesthetic Modeling"
  summary: string;
  teacher: Teacher;
  videoDuration: number; // seconds
  visualStyle: VisualStyle;
  likes: number;
  isLiked?: boolean;
  bookmarks: number;
  isBookmarked?: boolean;
  shares: number;
  remixesCount: number;
  keyAnalogy: string;
  classroomHook: string;
  misconceptionBuster: string;
  resources: InteractiveResource[];
  comments: TeacherComment[];
  remixSource?: {
    id: string;
    originalTeacher: string;
    originalConcept: string;
    differentiationAngle: string;
  };
}

export type SubjectFilter = 'all' | 'Math' | 'Science' | 'English & ELA' | 'History & Social Studies' | 'Classroom Management';
