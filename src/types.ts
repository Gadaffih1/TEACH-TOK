export type GradeBand = 
  | 'Lower Primary (Grade 1-3)'
  | 'Upper Primary (Grade 4-6)'
  | 'Junior School (Grade 7-9)'
  | 'Senior School (Grade 10-12)'
  | 'Elementary (K-5)'
  | 'Middle School (6-8)'
  | 'High School (9-12)'
  | 'Higher Ed';

export interface Teacher {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  school: string;
  subjects: string[];
  gradeBand: GradeBand;
  badge: 'CBC Lead Facilitator' | 'TSC Excellence Teacher' | 'KICD Curriculum Champion' | 'STEM Lead' | 'Instructional Coach' | 'AP Master' | 'National Board Certified' | 'Mentor Teacher';
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
  | 'computer_studies_visualizer'
  | 'kiswahili_visualizer'
  | 'running_words_visualizer'
  | 'default';

export type TeachingStrategy = 'all' | 'Direct Instruction' | 'Inquiry-Based' | 'Gamification' | 'Peer Review';

export interface TeachTokVideo {
  id: string;
  title: string;
  concept: string;
  subject: 'Computer Studies' | 'Math' | 'Science' | 'Kiswahili' | 'English & ELA' | 'History & Social Studies' | 'Arts' | 'Classroom Management';
  gradeBand: GradeBand;
  teachingStrategy: 'Direct Instruction' | 'Inquiry-Based' | 'Gamification' | 'Peer Review';
  standardCode: string; // e.g. KICD.CBC.COMP.G7, KICD.MATH.G8, KCSE.PHY.F3
  pedagogyTag: string; // e.g. "CBC Competency Task", "M-Pesa Algorithm Analogy", "Kinesthetic Modeling"
  summary: string;
  teacher: Teacher;
  videoDuration: number; // seconds
  visualStyle: VisualStyle;
  videoUrl?: string;
  audioUrl?: string;
  narrationScript?: string;
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

export type SubjectFilter = 'all' | 'Computer Studies' | 'Math' | 'Science' | 'Kiswahili' | 'English & ELA' | 'History & Social Studies' | 'Classroom Management';
