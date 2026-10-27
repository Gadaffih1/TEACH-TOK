import { TeachTokVideo } from '../types';

export const INITIAL_VIDEOS: TeachTokVideo[] = [
  {
    id: 'vid-zombie-passive',
    title: 'The Zombie Test: Fix Passive Voice in 30 Seconds',
    concept: 'Identifying & Rewriting Passive Voice',
    subject: 'English & ELA',
    gradeBand: 'Middle School (6-8)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'CCSS.ELA-LITERACY.L.8.1.D',
    pedagogyTag: 'Instant Diagnostic Trick',
    summary: 'Stop lecturing kids about subject-verb inverted syntax. Use the Zombie Test: if you can append "...by zombies" right after the verb, it is passive voice!',
    teacher: {
      id: 't-rebecca',
      name: 'Ms. Rebecca Rivera',
      handle: '@RiveraEnglish',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
      role: '8th Grade ELA Department Head',
      school: 'Oakridge Middle School',
      subjects: ['ELA', 'Creative Writing'],
      gradeBand: 'Middle School (6-8)',
      badge: 'Instructional Coach',
      stolenIdeasCount: 1420,
    },
    videoDuration: 42,
    visualStyle: 'zombie_grammar_visualizer',
    likes: 8420,
    bookmarks: 3912,
    shares: 1240,
    remixesCount: 18,
    keyAnalogy: 'If inserting "...by zombies" makes grammatical sense, the subject is getting acted upon instead of taking action!',
    classroomHook: 'Write on the whiteboard: "The classroom door was slowly opened... by zombies." Watch their eyes immediately light up.',
    misconceptionBuster: 'Students think passive voice is always "bad grammar" — teach them that news reports & crime fiction intentionally use it when the actor is unknown.',
    resources: [
      {
        id: 'res-zombie-hook',
        type: 'hook_script',
        title: '3-Minute Bellringer Hook Script',
        description: 'Word-for-word teacher script with whiteboard trigger points.',
        gradeSuitability: 'Grades 6-12',
        timeEstimate: '3 mins',
        content: {
          steps: [
            {
              stepNumber: 1,
              title: 'The Mystery Sentence',
              dialogueScript: '"Class, pencils down. Look at this sentence on the board: \'The chocolate cake was eaten.\' Who did it? We have no clue."',
              teacherNote: 'Pause for 3 seconds. Let them guess the dog, mom, etc.'
            },
            {
              stepNumber: 2,
              title: 'Drop the Zombie Clause',
              dialogueScript: '"Now add: \'...by zombies.\' \'The chocolate cake was eaten BY ZOMBIES.\' Does it make grammatical sense? Yes! That proves the sentence is PASSIVE."',
              teacherNote: 'Write "...by zombies" in bright green or red marker.'
            },
            {
              stepNumber: 3,
              title: 'The Active Contrast Test',
              dialogueScript: '"Now test an active sentence: \'Zack ate the cake BY ZOMBIES.\' Gibberish! That is active voice."',
              teacherNote: 'Have the entire class recite the test aloud.'
            }
          ]
        }
      },
      {
        id: 'res-zombie-misconception',
        type: 'misconception_guide',
        title: 'Common Student Traps & Teacher Responses',
        description: 'How to handle common false positives and confusion.',
        gradeSuitability: 'Grades 6-10',
        timeEstimate: '5 mins reference',
        content: {
          misconceptions: [
            {
              trap: 'Assuming past tense automatically means passive voice',
              whatStudentSays: '"\'She ran to the bus\' is in the past, so it must be passive!"',
              howToRedirect: '"Apply the zombie test: \'She ran by zombies to the bus\' — no, she performed the action! Tense is when it happened; voice is who did it."'
            },
            {
              trap: 'Believing passive voice is grammatically illegal',
              whatStudentSays: '"My teacher last year said I can NEVER use passive voice in an essay."',
              howToRedirect: '"Tell them: When the actor is unknown or unimportant (\'The artifact was discovered in 1922\'), passive voice is actually professional!"'
            }
          ]
        }
      },
      {
        id: 'res-zombie-quiz',
        type: 'concept_check',
        title: 'Quick 4-Question Exit Ticket',
        description: 'Check for mastery in 2 minutes before the bell rings.',
        gradeSuitability: 'Grades 7-10',
        timeEstimate: '2 mins',
        content: {
          quiz: [
            {
              question: 'Which of the following sentences is in PASSIVE voice?',
              options: [
                'The scientist calculated the velocity precisely.',
                'The beaker was broken during the chemistry lab.',
                'The students walked into the auditorium.',
                'Lightning struck the old oak tree.'
              ],
              correctAnswer: 1,
              explanation: 'Adding "...by zombies" yields: "The beaker was broken [by zombies] during the chemistry lab." The actor performing the breaking is omitted.',
              whyStudentsGetItWrong: 'Students confuse action verbs with who is receiving vs performing the action.'
            },
            {
              question: 'Why does "Zack ran three miles by zombies" fail the test?',
              options: [
                'Because Zack is an improper noun',
                'Because it is gibberish; Zack actively performed the running himself',
                'Because miles cannot be plural',
                'Because the sentence lacks a comma'
              ],
              correctAnswer: 1,
              explanation: 'Active voice sentences make nonsense phrases when forced into "...by zombies".',
              whyStudentsGetItWrong: 'Students think any sentence can just accept a prepositional phrase.'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-1',
        authorName: 'Mr. David Chang',
        authorRole: '7th Grade English, Chicago',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: 'Used this today in Period 3 with 32 students. Even my most reluctant writer was cackling and fixing their sentences. Best 5-minute teaching trick I have seen this year!',
        timestamp: '2 hours ago',
        classroomSuccessRating: 5,
        adaptedFor: 'Adapted for English Language Learners (ELL)',
        upvotes: 89,
        verifiedTeacher: true
      },
      {
        id: 'c-2',
        authorName: 'Sarah Jenkins',
        authorRole: 'High School AP Lang',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        text: 'I extended this for AP Lang: we look at police press releases and political speeches to see where passive voice is deliberately deployed to avoid accountability!',
        timestamp: '5 hours ago',
        classroomSuccessRating: 5,
        upvotes: 45,
        verifiedTeacher: true
      }
    ]
  },
  {
    id: 'vid-fractions-divide',
    title: 'Stop Saying "Keep-Change-Flip" Without Showing THIS First',
    concept: 'Dividing Fractions with Concrete Meaning',
    subject: 'Math',
    gradeBand: 'Elementary (K-5)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'CCSS.MATH.CONTENT.5.NF.B.7',
    pedagogyTag: 'CRA (Concrete-Representational-Abstract)',
    summary: 'When kids just memorize Keep-Change-Flip, they forget which fraction flips on the test. Use measuring scoops of sugar: "How many 1/4 cups make 3 whole cups?"',
    teacher: {
      id: 't-marcus',
      name: 'Marcus Sterling',
      handle: '@MathWithMarcus',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: '5th Grade Lead Math Specialist',
      school: 'Lincoln Elementary',
      subjects: ['Math', 'Algebra Prep'],
      gradeBand: 'Elementary (K-5)',
      badge: 'STEM Lead',
      stolenIdeasCount: 2310,
    },
    videoDuration: 54,
    visualStyle: 'fractions_visualizer',
    likes: 12540,
    bookmarks: 7210,
    shares: 3410,
    remixesCount: 31,
    keyAnalogy: 'Division always answers: "How many of the second quantity can I fit inside the first quantity?"',
    classroomHook: 'Bring an actual 1/4 measuring cup and 3 empty jars into class. Ask a student to fill the 3 jars using only the 1/4 scoop.',
    misconceptionBuster: 'Kids think division always makes numbers smaller. When you divide by a fraction less than 1, you get MORE pieces, not fewer!',
    resources: [
      {
        id: 'res-frac-hook',
        type: 'hook_script',
        title: 'Physical Measuring Cup Demo Guide',
        description: 'Hands-on tangible setup using kitchen scoops or fraction tiles.',
        gradeSuitability: 'Grades 4-6',
        timeEstimate: '5 mins',
        content: {
          steps: [
            {
              stepNumber: 1,
              title: 'The "Division Makes Things Smaller" Lie',
              dialogueScript: '"Who taught you that division ALWAYS gives you a smaller number? Raise your hand. Today, we are going to break that myth with pancakes."',
              teacherNote: 'Draw 2 giant pancakes on the board or use foam circle manipulatives.'
            },
            {
              stepNumber: 2,
              title: 'Slice into Halves',
              dialogueScript: '"If I have 2 pancakes, and each serving is 1/2 a pancake... how many servings can I give out? Count with me: 1, 2, 3, 4! So 2 ÷ 1/2 = 4."',
              teacherNote: 'Highlight that 4 is GREATER than 2. Let them gasp.'
            }
          ]
        }
      },
      {
        id: 'res-frac-quiz',
        type: 'concept_check',
        title: 'Diagnostic Check: Understanding Fraction Quotients',
        description: 'Ensure students understand WHY the number grew.',
        gradeSuitability: 'Grade 5',
        timeEstimate: '3 mins',
        content: {
          quiz: [
            {
              question: 'In real-world terms, what is 3 ÷ 1/3 calculating?',
              options: [
                'Taking 3 objects and breaking each into thirds, counting total parts (9)',
                'Multiplying 3 by 1/3 to get 1',
                'Subtracting 1/3 three times to get 2',
                'Dividing 3 people among 3 groups'
              ],
              correctAnswer: 0,
              explanation: 'Division asks "How many thirds fit inside 3 whole units?" Since each 1 whole has 3 thirds, 3 wholes have 3 × 3 = 9 thirds.',
              whyStudentsGetItWrong: 'Conditioned reflex to compute 3 * 1/3 = 1.'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-3',
        authorName: 'Elena Rostova',
        authorRole: 'Middle School Interventionist',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'This was the lightbulb moment for my tier-3 intervention students. They finally stopped asking "which one do I invert?!" because they could visualize the scoops.',
        timestamp: '1 day ago',
        classroomSuccessRating: 5,
        upvotes: 112,
        verifiedTeacher: true
      }
    ]
  },
  {
    id: 'vid-gravity-trampoline',
    title: 'Gravity is NOT a Pull: The Spacetime Trampoline',
    concept: 'General Relativity & Gravitational Well',
    subject: 'Science',
    gradeBand: 'High School (9-12)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'NGSS HS-PS2-4',
    pedagogyTag: 'Kinesthetic Fabric Model',
    summary: 'Ditch the idea that Earth has an invisible tractor beam. Stretch spandex over an embroidery hoop, place a billiard ball in the center, and roll a marble. The marble orbits because the floor is curved!',
    teacher: {
      id: 't-anita',
      name: 'Dr. Anita Patel',
      handle: '@PhysicsWithAnita',
      avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
      role: 'AP Physics & Astronomy Teacher',
      school: 'Horizon Science Academy',
      subjects: ['Physics', 'Astronomy'],
      gradeBand: 'High School (9-12)',
      badge: 'AP Master',
      stolenIdeasCount: 3120,
    },
    videoDuration: 62,
    visualStyle: 'gravity_visualizer',
    likes: 18920,
    bookmarks: 9400,
    shares: 4800,
    remixesCount: 24,
    keyAnalogy: 'Mass tells spacetime how to curve, and curved spacetime tells mass how to move!',
    classroomHook: 'Place a heavy 10-lb dumbbell on a foam mattress in front of class. Watch a tennis ball immediately roll toward it without anyone touching it.',
    misconceptionBuster: 'Students believe astronauts on the ISS float because there is "zero gravity" in space. There is actually ~90% of Earth\'s gravity in low orbit — they are simply in continuous freefall!',
    resources: [
      {
        id: 'res-grav-guide',
        type: 'misconception_guide',
        title: 'The ISS Zero-G Myth Buster Card',
        description: 'How to explain why astronauts float in low earth orbit.',
        gradeSuitability: 'Grades 8-12',
        timeEstimate: '4 mins',
        content: {
          misconceptions: [
            {
              trap: 'Believing space has no gravity at all',
              whatStudentSays: '"In space there is no gravity, that is why they float."',
              howToRedirect: '"If Earth had no gravity in space, the Moon would fly off in a straight line! At the ISS altitude, gravity is still 89% as strong. They float because they are falling AROUND the Earth at 17,500 mph."'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-4',
        authorName: 'Brian Miller',
        authorRole: '9th Grade Earth Science',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        text: 'Built the $15 PVC pipe + Lycra fabric gravity well you demonstrated here. My students spent the entire lunch period rolling marbles into planetary orbits!',
        timestamp: '3 days ago',
        classroomSuccessRating: 5,
        upvotes: 67,
        verifiedTeacher: true
      }
    ]
  },
  {
    id: 'vid-mitosis-dance',
    title: 'The Hand-Sign Dance for Mitosis (IPMATC Trick)',
    concept: 'Stages of Cellular Division',
    subject: 'Science',
    gradeBand: 'High School (9-12)',
    teachingStrategy: 'Gamification',
    standardCode: 'NGSS HS-LS1-4',
    pedagogyTag: 'Kinesthetic Muscle Memory',
    summary: 'Never let kids mix up Anaphase and Metaphase again. Use physical hand choreography: M = Middle (hands clasp center), A = Apart (hands pull away).',
    teacher: {
      id: 't-clara',
      name: 'Clara Oswald-Smith',
      handle: '@BioWithClara',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      role: 'Biology Educator of the Year',
      school: 'St. Jude STEM Magnet',
      subjects: ['Biology', 'Genetics'],
      gradeBand: 'High School (9-12)',
      badge: 'National Board Certified',
      stolenIdeasCount: 1890,
    },
    videoDuration: 45,
    visualStyle: 'mitosis_visualizer',
    likes: 9140,
    bookmarks: 5120,
    shares: 2190,
    remixesCount: 12,
    keyAnalogy: 'Think of chromosome chromatids like dancers at a formal ball: pairing up, meeting at the center aisle, and parting ways at midnight.',
    classroomHook: 'Stand in front of class in total silence and do the 6 hand signs in 10 seconds. Ask: "Can anyone decipher what I just enacted?"',
    misconceptionBuster: 'Students think chromosomes copy during Mitosis. Reiterate that DNA duplication happens in Interphase BEFORE mitosis starts!',
    resources: [
      {
        id: 'res-mitosis-worksheet',
        type: 'student_worksheet',
        title: 'Flash Hand Choreography & Micrograph Identifier',
        description: 'Microscope slide identification checklist with mnemonic anchors.',
        gradeSuitability: 'Grades 9-11',
        timeEstimate: '10 mins',
        content: {
          worksheetPrompts: [
            {
              prompt: 'In a real onion root tip cell micrograph, chromosomes are lined up directly down the equatorial plate. Which phase is this?',
              scaffoldHint: 'Remember M = Middle!',
              answerKey: 'Metaphase'
            },
            {
              prompt: 'Sister chromatids have separated into individual chromosomes and are moving toward opposite poles. Which phase?',
              scaffoldHint: 'Remember A = Apart!',
              answerKey: 'Anaphase'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-5',
        authorName: 'Kenji Sato',
        authorRole: 'Honors Bio, Seattle',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        text: 'During the midterm exam today, I looked up from my desk and saw 25 students quietly doing the hand dance to themselves while answering question #14. It works 100%!',
        timestamp: '4 hours ago',
        classroomSuccessRating: 5,
        upvotes: 142,
        verifiedTeacher: true
      }
    ]
  },
  {
    id: 'vid-pythagoras-water',
    title: 'Visual Proof of a² + b² = c² (Liquid Volume Model)',
    concept: 'Pythagorean Theorem Geometric Meaning',
    subject: 'Math',
    gradeBand: 'Middle School (6-8)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'CCSS.MATH.CONTENT.8.G.B.6',
    pedagogyTag: 'Geometric Area Equivalence',
    summary: 'Do not just teach formula plug-and-chug. Show that the actual physical area (square of side A plus square of side B) equals the square of side C using water or Cheez-Its!',
    teacher: {
      id: 't-amira',
      name: 'Amira Vance',
      handle: '@MathArtVance',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
      role: '8th Grade Math & Coding',
      school: 'Westwood Academy',
      subjects: ['Math', 'Geometry'],
      gradeBand: 'Middle School (6-8)',
      badge: 'Mentor Teacher',
      stolenIdeasCount: 1650,
    },
    videoDuration: 48,
    visualStyle: 'pythagorean_visualizer',
    likes: 11200,
    bookmarks: 6400,
    shares: 2890,
    remixesCount: 15,
    keyAnalogy: 'a² and b² are not abstract variables — they are literally the literal area of two physical squares glued to the legs of the right triangle!',
    classroomHook: 'Give every pair of students a box of square Cheez-It crackers and an index card right triangle. Have them tile the squares on each side.',
    misconceptionBuster: 'Students try to use Pythagorean theorem on non-right triangles. Emphasize that the 90° angle is the strict key.',
    resources: [
      {
        id: 'res-pyth-hook',
        type: 'hook_script',
        title: 'The Cheez-It Cracker Geometry Proof',
        description: 'Hands-on edible proof that cements area equivalence.',
        gradeSuitability: 'Grades 7-9',
        timeEstimate: '15 mins',
        content: {
          steps: [
            {
              stepNumber: 1,
              title: 'Build the Leg Squares',
              dialogueScript: '"Build a 3x3 square of Cheez-Its on leg A (that is 9). Now build a 4x4 square on leg B (that is 16). How many total crackers are on the legs? 9 + 16 = 25."',
              teacherNote: 'Check that every table has 25 total crackers.'
            },
            {
              stepNumber: 2,
              title: 'Move crackers to Hypotenuse',
              dialogueScript: '"Now take those exact 25 crackers and arrange them along the long diagonal side. Lo and behold: a perfect 5x5 square!"',
              teacherNote: 'Allow students to eat the crackers after completing the proof!'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-6',
        authorName: 'Rachel Green',
        authorRole: 'Middle School Math Coach',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        text: 'The Cheez-It method is immortal. Even my high school geometry students who were struggling remembered this lesson 2 years later.',
        timestamp: '2 days ago',
        classroomSuccessRating: 5,
        upvotes: 95,
        verifiedTeacher: true
      }
    ]
  },
  {
    id: 'vid-chemical-bonds',
    title: 'Ionic vs Covalent: The Generous Giver vs The Tug-of-War',
    concept: 'Types of Chemical Bonding',
    subject: 'Science',
    gradeBand: 'High School (9-12)',
    teachingStrategy: 'Peer Review',
    standardCode: 'NGSS HS-PS1-1',
    pedagogyTag: 'Character Personification',
    summary: 'Electronegativity values bore kids to tears. Personify the elements: Sodium is practically begging to give away its lone outer electron, while two Chlorine atoms have a mutual tug-of-war!',
    teacher: {
      id: 't-jamal',
      name: 'Jamal Washington',
      handle: '@ChemistryJamal',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      role: 'Chemistry & AP Chem Teacher',
      school: 'Northside High School',
      subjects: ['Chemistry', 'Physical Science'],
      gradeBand: 'High School (9-12)',
      badge: 'AP Master',
      stolenIdeasCount: 1980,
    },
    videoDuration: 51,
    visualStyle: 'chemical_bonds_visualizer',
    likes: 7850,
    bookmarks: 4210,
    shares: 1920,
    remixesCount: 9,
    keyAnalogy: 'Ionic bonding is like giving your friend your old skateboard forever. Covalent bonding is sharing a Nintendo Switch where both of you keep your hands on the controllers.',
    classroomHook: 'Bring a tennis ball labeled "Electron" and two students to the front. Play out both scenarios with dramatic acting.',
    misconceptionBuster: 'Students think ionic compounds are molecules. Teach them that salt is a repeating crystal lattice, not a standalone Na-Cl duo!',
    resources: [
      {
        id: 'res-chem-quiz',
        type: 'concept_check',
        title: 'Bonding Character Persona Diagnostic',
        description: 'Test understanding through relatable analogical scenarios.',
        gradeSuitability: 'Grades 9-11',
        timeEstimate: '3 mins',
        content: {
          quiz: [
            {
              question: 'Why do two Oxygen atoms form a covalent bond instead of an ionic bond?',
              options: [
                'Neither atom is strong enough to completely steal electrons from the other; their electronegativities are identical, forcing mutual sharing.',
                'Oxygen has too many protons to allow electron transfer.',
                'They repel each other and never actually touch.',
                'Ionic bonds only exist in liquids.'
              ],
              correctAnswer: 0,
              explanation: 'Because both Oxygen atoms have equal electronegativity (pulling power), they are locked in a cooperative sharing arrangement (covalent).',
              whyStudentsGetItWrong: 'Students forget that equal electronegativity prevents electron theft.'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-7',
        authorName: 'Dr. Teresa Boyd',
        authorRole: 'Science Specialist',
        avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80',
        text: 'The Nintendo Switch analogy is pure gold. My sophomore chemistry class immediately grasped nonpolar covalent vs polar covalent with this!',
        timestamp: '1 day ago',
        classroomSuccessRating: 5,
        upvotes: 53,
        verifiedTeacher: true
      }
    ]
  }
];
