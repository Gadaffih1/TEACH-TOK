import { TeachTokVideo } from '../types';
import { generateComprehensiveConcepts } from './conceptsData';

const BASE_VIDEOS: TeachTokVideo[] = [
  {
    id: 'vid-cs-mpesa-db',
    title: 'Grade 10 Computer Studies: How M-Pesa Links 30 Million Accounts in 2 Seconds (Relational Database Magic)',
    concept: 'Relational Database Architecture, Primary Keys & ACID Transactions',
    subject: 'Computer Studies',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KCSE.COMP.F1.03',
    pedagogyTag: 'Real-World Fintech Database Model',
    summary: 'How does Safaricom confirm your KSh 1,500 payment to a mama mboga in Nakuru in under two seconds? Walk students through Primary Keys, Foreign Keys, and why flat spreadsheets fail at national scale.',
    teacher: {
      id: 't-otieno',
      name: 'Mwalimu Kevin Otieno',
      handle: '@OtienoTechCBC',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Senior School ICT & Physics Lead',
      school: 'Alliance High School, Kikuyu',
      subjects: ['Computer Studies', 'Science'],
      gradeBand: 'Senior School (Grade 10-12)',
      badge: 'KICD Curriculum Champion',
      stolenIdeasCount: 3420,
    },
    videoDuration: 48,
    visualStyle: 'computer_studies_visualizer',
    likes: 14850,
    bookmarks: 6920,
    shares: 2840,
    remixesCount: 38,
    keyAnalogy: 'A relational database uses unique Primary Keys (like your National ID or Phone Number) to link Customer, Agent, and Transaction tables without ever duplicating account records!',
    classroomHook: 'Hold up your phone and show an M-Pesa transaction confirmation SMS: "When you tap SEND, how does the system ensure money leaves your balance and lands in the vendor\'s wallet without vanishing in the middle?"',
    misconceptionBuster: 'Students think databases are just giant Excel worksheets; explain that flat sheets cause catastrophic duplication, locks, and data corruption under concurrent access.',
    resources: [
      {
        id: 'res-mpesa-hook',
        type: 'hook_script',
        title: '3-Minute Fintech Bellringer Hook Script',
        description: 'Classroom simulation where 3 students roleplay Sender, Telco Database Engine, and Merchant.',
        gradeSuitability: 'Grade 10 - 12 (KCSE)',
        timeEstimate: '3 mins',
        content: {
          steps: [
            {
              stepNumber: 1,
              title: 'The SMS Arrival Hook',
              dialogueScript: '"Class, listen to this M-Pesa chime. You sent KSh 500 for textbooks. Where was your balance stored before this message beeped?"',
              teacherNote: 'Wait 10 seconds for students to volunteer "in the SIM card", "on the phone", or "in the cloud".'
            },
            {
              stepNumber: 2,
              title: 'The Entity Relationship Link',
              dialogueScript: '"If Safaricom stored your name and address inside every single transaction line, their storage servers would catch fire! Instead, they use a Primary Key to point to you in one microsecond."',
              teacherNote: 'Draw two tables on the chalkboard: CUSTOMERS and TRANSACTIONS, connected with an arrow line.'
            }
          ]
        }
      },
      {
        id: 'res-mpesa-quiz',
        type: 'concept_check',
        title: 'Database Normalization Exit Ticket',
        description: 'Verify understanding of Primary Keys and Foreign Keys.',
        gradeSuitability: 'Grade 10 - 12',
        timeEstimate: '2 mins',
        content: {
          quiz: [
            {
              question: 'Why is a National ID Number or Phone Number an ideal Primary Key in a Kenyan database?',
              options: [
                'Because it is guaranteed to be unique for each individual record',
                'Because it contains letters and special symbols',
                'Because it changes every calendar month',
                'Because it saves battery life on the server'
              ],
              correctAnswer: 0,
              explanation: 'A Primary Key must uniquely identify each entity row without ambiguity.',
              whyStudentsGetItWrong: 'Students confuse attributes that can be shared (like first names or home counties) with unique identifiers.'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-mpesa-1',
        authorName: 'Tr. Faith Wanjiku',
        authorRole: 'JSS Digital Literacy Lead',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        text: 'Mwalimu Otieno, this M-Pesa analogy made my Grade 9 students understand table relationships instantly! They designed their own school tuck shop database schema today.',
        timestamp: '1 hour ago',
        classroomSuccessRating: 5,
        upvotes: 94,
        verifiedTeacher: true
      }
    ]
  },
  {
    id: 'vid-kiswahili-ngeli',
    title: 'Kiswahili Sanifu: Ngeli za Nomino (A-WA, KI-VI, I-ZI) na Upatanisho wa Kisintaksia Katika Sentensi',
    concept: 'Upatanisho wa Kisintaksia na Mfumo wa Ngeli za Kiswahili',
    subject: 'Kiswahili',
    gradeBand: 'Junior School (Grade 7-9)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KICD.JSS.KISW.G7.02',
    pedagogyTag: 'Upatanisho wa Kisintaksia',
    summary: 'Wanafunzi wengi hukanganywa na viambishi vya ngeli mbalimbali. Mfano: "Mwanafunzi anasoma" inabadilika vipi ikiwa wingi au ikiwa ni ngeli ya KI-VI? Tumia mbinu shirikishi ya upatanisho wa kisintaksia.',
    teacher: {
      id: 't-amina',
      name: 'Tr. Amina Hassan',
      handle: '@AminaPrimaryTech',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      role: 'Kiswahili & Digital Literacy Facilitator',
      school: 'Olympic Primary School, Kibera',
      subjects: ['Kiswahili', 'Computer Studies'],
      gradeBand: 'Junior School (Grade 7-9)',
      badge: 'CBC Lead Facilitator',
      stolenIdeasCount: 3150,
    },
    videoDuration: 45,
    visualStyle: 'kiswahili_visualizer',
    likes: 13240,
    bookmarks: 6410,
    shares: 2680,
    remixesCount: 34,
    keyAnalogy: 'Ngeli za nomino ni kama familia za kijamii. Kila familia ina mavazi na viambishi vyake maalum. Huwezi kuvalisha nomino ya A-WA viambishi vya KI-VI!',
    classroomHook: 'Andika ubaoni: "Kiti kile kimevunjika" kisha uliza: "Ikiwa tutabadilisha kiti kiwe meza, je sentensi itakuwaje? Meza ile imevunjika!"',
    misconceptionBuster: 'Wanafunzi hudhani ngeli zote hubadilisha herufi za mwanzo za nomino; katika ngeli ya I-ZI (k.m. nyumba), umbo la nomino halibadiliki bali viambishi vya vitenzi hubadilika.',
    resources: [
      {
        id: 'res-kisw-hook',
        type: 'hook_script',
        title: 'Mwongozo wa Ufundishaji wa Ngeli Darasani',
        description: 'Hatua kwa hatua jinsi ya kuelekeza wanafunzi kulinganisha ngeli za nomino.',
        gradeSuitability: 'Gredi ya 7 - 9 (JSS)',
        timeEstimate: '3 mins',
        content: {
          steps: [
            {
              stepNumber: 1,
              title: 'Mchezo wa Kadi za Ngeli',
              dialogueScript: '"Darasa, tazama kadi hii: Nomino \'Mtu\'. Ni ngeli gani? A-WA! Sentensi ya umoja na wingi ni zipi?"',
              teacherNote: 'Wape wanafunzi nafasi ya kutaja viambishi vya vitenzi kwa sauti.'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-kisw-1',
        authorName: 'Tr. Brenda Nekesa',
        authorRole: 'Loreto High School Limuru',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
        text: 'Hii mbinu ya Kiswahili Visualizer imenisaidia sana kuwafunza wanafunzi wa Gredi ya 8 tofauti kati ya ngeli ya I-ZI na LI-YA. Hongera Mwalimu Amina!',
        timestamp: '3 hours ago',
        classroomSuccessRating: 5,
        upvotes: 82,
        verifiedTeacher: true
      }
    ]
  },
  {
    id: 'vid-cs-jss-ipo',
    title: 'Grade 7 JSS Computer Studies: The IPO Cycle is Just Like a Diesel Posho Mill!',
    concept: 'Input-Processing-Output-Storage Cycle & Hardware Peripherals',
    subject: 'Computer Studies',
    gradeBand: 'Junior School (Grade 7-9)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'KICD.JSS.COMP.G7.01',
    pedagogyTag: 'Posho Mill Data Flow Model',
    summary: 'Every digital device on earth runs the IPO cycle: Input from keyboards, Processing inside the CPU, Output on screens, and Storage on disk. Make it click with the posho mill of data!',
    teacher: {
      id: 't-wanjiku',
      name: 'Tr. Faith Wanjiku',
      handle: '@WanjikuDigitalKE',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'JSS Digital Literacy & Coding Champion',
      school: 'The Kenya High School, Nairobi',
      subjects: ['Computer Studies'],
      gradeBand: 'Junior School (Grade 7-9)',
      badge: 'CBC Lead Facilitator',
      stolenIdeasCount: 4210,
    },
    videoDuration: 44,
    visualStyle: 'computer_studies_visualizer',
    likes: 11200,
    bookmarks: 5410,
    shares: 2190,
    remixesCount: 26,
    keyAnalogy: 'Input is pouring dry maize into the hopper; Processing is the diesel motor crushing grains; Output is clean white unga flour filling the bucket; and Storage is the granary sacks stacked for the dry season!',
    classroomHook: 'Bring a handful of dry maize grains and a small bowl of maize flour to the front desk. Ask: "How did this cob transform into this flour? Can the computer do the same with raw letters and photos?"',
    misconceptionBuster: 'Learners think RAM is storage; teach them that RAM is the miller\'s temporary measuring scoop, whereas the hard drive is the granary sack in the store room.',
    resources: [
      {
        id: 'res-ipo-hook',
        type: 'hook_script',
        title: 'Interactive Posho Mill Data Walk',
        description: 'Four student stations representing Input, CPU, Output, and Storage.',
        gradeSuitability: 'Junior School Grade 7',
        timeEstimate: '4 mins',
        content: {
          steps: [
            {
              stepNumber: 1,
              title: 'The Four Stations',
              dialogueScript: '"Student 1 types a number. Student 2 multiplies it by 2. Student 3 writes the answer on a placard. Student 4 files the index card into a binder. You have built a physical computer!"',
              teacherNote: 'Assign roles to 4 energetic students in front of the classroom.'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-ipo-1',
        authorName: 'Mwalimu Joseph Mutua',
        authorRole: 'Machakos Academy',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Brilliant demonstration Tr. Faith! In our pre-technical workshop we connected this directly to mechanical power transmission as well.',
        timestamp: '3 hours ago',
        classroomSuccessRating: 5,
        upvotes: 62,
        verifiedTeacher: true
      }
    ]
  },
  {
    id: 'vid-cs-cbc-algo',
    title: 'Grade 5 CBC Digital Literacy: Algorithms as Brewing Authentic Kenyan Chai Step-by-Step',
    concept: 'Sequential Algorithms, Syntax & Error Handling',
    subject: 'Computer Studies',
    gradeBand: 'Upper Primary (Grade 4-6)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KICD.CBC.COMP.G5.01',
    pedagogyTag: 'Kitchen Protocol Algorithm',
    summary: 'Teach algorithms without computers first! Have a student direct the teacher to brew morning tea. If they skip "light the jiko", the teacher pours cold milk straight into dry leaves!',
    teacher: {
      id: 't-halima',
      name: 'Tr. Halima Abdi',
      handle: '@HalimaCBCJunior',
      avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80',
      role: 'Upper Primary Grade 4-6 CBC Coordinator',
      school: 'Garissa Primary School',
      subjects: ['Computer Studies', 'Math'],
      gradeBand: 'Upper Primary (Grade 4-6)',
      badge: 'Instructional Coach',
      stolenIdeasCount: 2200,
    },
    videoDuration: 40,
    visualStyle: 'running_words_visualizer',
    likes: 9870,
    bookmarks: 4890,
    shares: 1670,
    remixesCount: 19,
    keyAnalogy: 'An algorithm is an exact kitchen recipe. Miss step 2 (lighting the fire), and your computer serves you cold milk and dry leaves. Step-by-step logic is everything!',
    classroomHook: 'Place a clean sufuria, dry tea leaves, a cup of water, and milk on the desk. "I am a computer robot. Instruct me step-by-step to make chai, but if you omit a step, I will execute literally!"',
    misconceptionBuster: 'Learners assume computers possess common sense and can guess what you intended when an algorithm instruction is missing.',
    resources: [
      {
        id: 'res-chai-algo',
        type: 'hook_script',
        title: 'Chai Algorithm Flowchart Activity',
        description: 'Pupils draw start, process, decision, and end symbols for their tea routine.',
        gradeSuitability: 'Upper Primary (Grade 4-6)',
        timeEstimate: '5 mins',
        content: {
          steps: [
            {
              stepNumber: 1,
              title: 'The Robot Teacher Acting',
              dialogueScript: '"Learner says: Put milk in the cup! Teacher pours milk directly onto the table because the cup was upside down. The class laughs and learns precision!"',
              teacherNote: 'Keep it humorous and highlight the value of explicit instructions.'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-chai-1',
        authorName: 'Tr. Amina Hassan',
        authorRole: 'Olympic Primary Kibera',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        text: 'My Grade 5 pupils were laughing so hard when I pretended to drink cold tea leaves. They wrote their Scratch code algorithms with zero missing steps afterwards!',
        timestamp: '4 hours ago',
        classroomSuccessRating: 5,
        upvotes: 78,
        verifiedTeacher: true
      }
    ]
  },
  {
    id: 'vid-fractions-chapati',
    title: 'CBC Upper Primary Math: Dividing Fractions with Concrete Meaning (Chapatis & Measuring Cups)',
    concept: 'Dividing Fractions with Concrete Tangible Meaning',
    subject: 'Math',
    gradeBand: 'Upper Primary (Grade 4-6)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'KICD.CBC.MATH.G5.02',
    pedagogyTag: 'Concrete-Representational-Abstract (CRA)',
    summary: 'When pupils just memorize Keep-Change-Flip, they flip the wrong fraction on the national exam. Use freshly cut quarters of chapati: "How many 1/4 quarters can you cut out of 3 whole chapatis?"',
    teacher: {
      id: 't-kiprop',
      name: 'Mwalimu Kiprop Cheruiyot',
      handle: '@KipropMathsKE',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'Mathematics & Algorithms HOD',
      school: "Mang'u High School, Thika",
      subjects: ['Math', 'Computer Studies'],
      gradeBand: 'Senior School (Grade 10-12)',
      badge: 'TSC Excellence Teacher',
      stolenIdeasCount: 2890,
    },
    videoDuration: 52,
    visualStyle: 'fractions_visualizer',
    likes: 12540,
    bookmarks: 7210,
    shares: 3410,
    remixesCount: 31,
    keyAnalogy: 'Division always asks: "How many slices of size 1/4 can you fit inside 3 whole chapatis?" 3 divided by 1/4 gives 12 slices! Dividing by a fraction makes MORE pieces, not fewer.',
    classroomHook: 'Hold up 3 circular paper chapatis and scissors: "If I cut these 3 chapatis into quarter slices for visiting guests, do I end up with more food portions or fewer portions?"',
    misconceptionBuster: 'Learners believe division must always produce a smaller number; dividing by a fraction less than 1 produces a larger count of pieces!',
    resources: [
      {
        id: 'res-chapati-hook',
        type: 'hook_script',
        title: 'Chapati Fraction Division Protocol',
        description: 'Paper folding and cutting guide for concrete modeling.',
        gradeSuitability: 'Upper Primary Grade 4 - 6',
        timeEstimate: '4 mins',
        content: {
          steps: [
            {
              stepNumber: 1,
              title: 'The Counter-Intuitive Reveal',
              dialogueScript: '"How can 3 divided by 1/4 equal twelve? Count the slices on the table! 1, 2, 3... 12!"',
              teacherNote: 'Have pupils cut paper circles into halves and quarters in pairs.'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-chapati-1',
        authorName: 'Tr. Brenda Nekesa',
        authorRole: 'Loreto High School Limuru',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
        text: 'This completely eliminated fraction division errors in our primary bridge classes! The visualizer on TeachTok reinforces it so well.',
        timestamp: '6 hours ago',
        classroomSuccessRating: 5,
        upvotes: 56,
        verifiedTeacher: true
      }
    ]
  },
  {
    id: 'vid-chem-magadi-bonds',
    title: 'KCSE Chemistry: Lake Magadi Trona & Why Covalent Bonds Share Electrons Like Friends in the Rain',
    concept: 'Ionic vs Covalent Bonding & Electronegativity Tug-of-War',
    subject: 'Science',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KCSE.CHEM.F2.01',
    pedagogyTag: 'Electronegativity Tug-of-War',
    summary: 'Ionic is an electron robbery; covalent is a shared umbrella during a heavy Nairobi downpour! Contrast the ionic extraction of sodium chloride and soda ash at Lake Magadi with the covalent bonds in diatomic oxygen gas.',
    teacher: {
      id: 't-mwangi',
      name: 'Mwalimu David Mwangi',
      handle: '@MwangiScienceKE',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      role: 'Chemistry & Integrated Science Specialist',
      school: "Starehe Boys' Centre, Nairobi",
      subjects: ['Science'],
      gradeBand: 'Senior School (Grade 10-12)',
      badge: 'TSC Excellence Teacher',
      stolenIdeasCount: 2640,
    },
    videoDuration: 46,
    visualStyle: 'chemical_bonds_visualizer',
    likes: 8930,
    bookmarks: 4120,
    shares: 1830,
    remixesCount: 22,
    keyAnalogy: 'In ionic bonding, the greedy chlorine atom completely snatches an electron from sodium (mugging). In covalent bonding, two oxygen atoms have equal pulling power, so they share electrons like two friends walking together under one umbrella!',
    classroomHook: 'Bring two students to the front and give one an umbrella during a drizzle simulation: "If both need to stay dry, do they fight to the death or share the middle space?"',
    misconceptionBuster: 'Students think ionic bonds involve shared electrons rather than electrostatic attraction between opposite charges created by complete transfer.',
    resources: [
      {
        id: 'res-chem-hook',
        type: 'hook_script',
        title: 'Chemical Bonding Interactive Tug-of-War',
        description: 'Rope demonstration illustrating electronegativity differences.',
        gradeSuitability: 'Form 2 / Grade 10',
        timeEstimate: '3 mins',
        content: {
          steps: [
            {
              stepNumber: 1,
              title: 'The Equal Tug-of-War',
              dialogueScript: '"When both atoms are equally strong, the knot in the center stays balanced. That is non-polar covalent sharing!"',
              teacherNote: 'Use two students of identical strength holding a rope with a colored ribbon tied in the center.'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-chem-1',
        authorName: 'Mwalimu Evans Ochieng',
        authorRole: 'Maseno School',
        avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
        text: 'The umbrella analogy is unforgettable. My Form 2 students scored 92% on their bonding cat exam!',
        timestamp: '5 hours ago',
        classroomSuccessRating: 5,
        upvotes: 43,
        verifiedTeacher: true
      }
    ]
  },
  {
    id: 'vid-phy-olkaria-energy',
    title: 'KCSE Physics: Olkaria Geothermal Power & Gravitational Potential Energy Spacetime Well',
    concept: 'Conservation of Energy, Work Done & Geothermal Steam Turbines',
    subject: 'Science',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KCSE.PHY.F3.04',
    pedagogyTag: 'Geothermal Energy Conversion',
    summary: 'How does subterranean volcanic heat in Hell\'s Gate Olkaria turn into the electricity lighting school dormitories in Nairobi? Connect mechanical work, thermodynamics, and dynamos seamlessly.',
    teacher: {
      id: 't-ochieng',
      name: 'Mwalimu Evans Ochieng',
      handle: '@OchiengPhysics',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
      role: 'KCSE Physics & Electronics Instructor',
      school: 'Maseno School, Kisumu',
      subjects: ['Science', 'Computer Studies'],
      gradeBand: 'Senior School (Grade 10-12)',
      badge: 'TSC Excellence Teacher',
      stolenIdeasCount: 3310,
    },
    videoDuration: 49,
    visualStyle: 'gravity_visualizer',
    likes: 10420,
    bookmarks: 5190,
    shares: 2480,
    remixesCount: 27,
    keyAnalogy: 'Energy cannot be created or destroyed; it merely changes clothes. Subterranean heat energy boils pressurized water into kinetic steam energy, which spins turbine generator blades into electrical potential flowing along KPLC transmission cables!',
    classroomHook: 'Hold up an ordinary bicycle dynamo against a spinning tire: "Notice how your leg muscle work instantly becomes a bright headlight beam? Now imagine steam doing the pedaling at Olkaria!"',
    misconceptionBuster: 'Students often believe power stations generate energy out of nothing, violating the First Law of Thermodynamics.',
    resources: [
      {
        id: 'res-phy-hook',
        type: 'hook_script',
        title: 'Geothermal Pinwheel Energy Demo',
        description: 'Using boiling kettle steam to power a miniature toy generator.',
        gradeSuitability: 'Senior Secondary Form 3 / Grade 11',
        timeEstimate: '4 mins',
        content: {
          steps: [
            {
              stepNumber: 1,
              title: 'The Energy Chain',
              dialogueScript: '"Trace the energy from the magma chamber deep beneath Naivasha all the way into the bulb in your desk lamp!"',
              teacherNote: 'Diagram the energy chain on the board with arrows: Thermal -> Kinetic -> Electrical.'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-phy-1',
        authorName: 'Mwalimu Kevin Otieno',
        authorRole: 'Alliance High School',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: 'Superb pedagogical grounding Mwalimu Evans. Combining this with actual field trips to Olkaria creates lifelong scientific curiosity.',
        timestamp: '1 day ago',
        classroomSuccessRating: 5,
        upvotes: 67,
        verifiedTeacher: true
      }
    ]
  },
  {
    id: 'vid-bio-mitosis-cells',
    title: 'KCSE Biology: Mitosis Cell Division IPMAT Mnemonic & Chromosome Dance',
    concept: 'Mitotic Cell Division, Spindle Fibers & Cytokinesis',
    subject: 'Science',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Gamification',
    standardCode: 'KCSE.BIO.F3.01',
    pedagogyTag: 'IPMAT Hand Gesture Choreography',
    summary: 'Teach the stages of mitosis with hand gestures so students never confuse Anaphase with Metaphase: I-P-M-A-T! Watch chromosomes line up and split under the cellular microscope.',
    teacher: {
      id: 't-nekesa',
      name: 'Tr. Brenda Nekesa',
      handle: '@NekesaBiology',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
      role: 'Biology & Genetics Lead Educator',
      school: 'Loreto High School Limuru',
      subjects: ['Science'],
      gradeBand: 'Senior School (Grade 10-12)',
      badge: 'KICD Curriculum Champion',
      stolenIdeasCount: 2780,
    },
    videoDuration: 44,
    visualStyle: 'mitosis_visualizer',
    likes: 11450,
    bookmarks: 5620,
    shares: 2310,
    remixesCount: 29,
    keyAnalogy: 'Prophase is packing suitcases; Metaphase is meeting in the middle of the dance floor; Anaphase is walking apart to opposite corners; and Telophase is building two separate houses!',
    classroomHook: 'Have the entire class hold their fists together: "Meet in Middle (Metaphase)... Pull Apart (Anaphase)! You just performed cell division with your hands!"',
    misconceptionBuster: 'Students confuse mitosis (produces 2 identical diploid daughter cells for body growth) with meiosis (produces 4 haploid gamete cells with genetic variation).',
    resources: [
      {
        id: 'res-mitosis-hook',
        type: 'hook_script',
        title: 'IPMAT Hand Gesture Warm-Up',
        description: 'Physical warm-up routine for cellular biology lessons.',
        gradeSuitability: 'Form 3 Biology / Grade 11',
        timeEstimate: '3 mins',
        content: {
          steps: [
            {
              stepNumber: 1,
              title: 'The IPMAT Chant',
              dialogueScript: '"P: Pack bags! M: Meet in middle! A: Away! T: Two nuclei! Chant with me three times!"',
              teacherNote: 'Demonstrate each hand gesture standing on the podium.'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-mitosis-1',
        authorName: 'Tr. Mercy Chebet',
        authorRole: 'Moi Forces Academy',
        avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
        text: 'The hand gestures stuck with my students all the way through their mock national exams. Zero confusion between Anaphase and Metaphase!',
        timestamp: '4 hours ago',
        classroomSuccessRating: 5,
        upvotes: 72,
        verifiedTeacher: true
      }
    ]
  },
  {
    id: 'vid-eng-zombie-passive',
    title: 'The Zombie Test in English Writing & Scientific Lab Reports: Fix Passive Voice in 30 Seconds',
    concept: 'Identifying & Transforming Passive Voice in Kenyan CBC Writing',
    subject: 'English & ELA',
    gradeBand: 'Junior School (Grade 7-9)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'KICD.JSS.ENG.G8.02',
    pedagogyTag: 'Instant Diagnostic Test',
    summary: 'Stop lecturing learners about complex inverted syntax rules. Use the Zombie Test: if you can append "...by zombies" right after the main verb, it is passive voice!',
    teacher: {
      id: 't-nekesa',
      name: 'Tr. Brenda Nekesa',
      handle: '@NekesaBiology',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
      role: 'Biology & Language Facilitator',
      school: 'Loreto High School Limuru',
      subjects: ['English & ELA', 'Science'],
      gradeBand: 'Senior School (Grade 10-12)',
      badge: 'KICD Curriculum Champion',
      stolenIdeasCount: 2780,
    },
    videoDuration: 42,
    visualStyle: 'zombie_grammar_visualizer',
    likes: 8420,
    bookmarks: 3912,
    shares: 1240,
    remixesCount: 18,
    keyAnalogy: 'If inserting "...by zombies" makes grammatical sense, the subject is getting acted upon rather than taking action! In science lab reports, passive voice is intentionally chosen ("The test tube was heated") to preserve scientific objectivity.',
    classroomHook: 'Write on the chalkboard: "The school laboratory window was broken... by zombies." Watch their faces light up with laughter and instant recognition!',
    misconceptionBuster: 'Students think passive voice is always "bad grammar" — teach them that investigative reports and scientific papers intentionally use it when the performer is unknown or unimportant.',
    resources: [
      {
        id: 'res-zombie-hook',
        type: 'hook_script',
        title: '3-Minute Zombie Grammar Bellringer',
        description: 'Chalkboard prompt with rapid diagnostic call-and-response.',
        gradeSuitability: 'Grade 7 - 12',
        timeEstimate: '3 mins',
        content: {
          steps: [
            {
              stepNumber: 1,
              title: 'The Test Sentence',
              dialogueScript: '"Class, listen: \'The mandate was signed.\' Add: \'...by zombies.\' Does it make sense? Yes! Passive voice identified!"',
              teacherNote: 'Have the whole class chant "...by zombies!" together.'
            }
          ]
        }
      }
    ],
    comments: [
      {
        id: 'c-zombie-1',
        authorName: 'Tr. Mercy Chebet',
        authorRole: 'Moi Forces Academy',
        avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
        text: 'Used this with my Grade 8 class before writing their integrated science project reports. Total game changer!',
        timestamp: '2 hours ago',
        classroomSuccessRating: 5,
        upvotes: 51,
        verifiedTeacher: true
      }
    ]
  }
];

export const INITIAL_VIDEOS: TeachTokVideo[] = [
  ...BASE_VIDEOS,
  ...generateComprehensiveConcepts(),
];
