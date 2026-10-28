import { TeachTokVideo, Teacher, VisualStyle, GradeBand, TeachingStrategy } from '../types';

// Curated Kenyan teacher roster representing diverse CBC & KCSE disciplines and premier institutions
export const KENYAN_TEACHERS: Teacher[] = [
  {
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
  {
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
  {
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
  {
    id: 't-amina',
    name: 'Tr. Amina Hassan',
    handle: '@AminaPrimaryTech',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    role: 'Kiswahili & Primary Tech Specialist',
    school: 'Olympic Primary School, Kibera',
    subjects: ['Kiswahili', 'Computer Studies'],
    gradeBand: 'Lower Primary (Grade 1-3)',
    badge: 'CBC Lead Facilitator',
    stolenIdeasCount: 3150,
  },
  {
    id: 't-mwangi',
    name: 'Mwalimu David Mwangi',
    handle: '@MwangiScienceKE',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    role: 'Chemistry Specialist',
    school: "Starehe Boys' Centre, Nairobi",
    subjects: ['Science'],
    gradeBand: 'Senior School (Grade 10-12)',
    badge: 'TSC Excellence Teacher',
    stolenIdeasCount: 2640,
  },
  {
    id: 't-chebet',
    name: 'Tr. Mercy Chebet',
    handle: '@ChebetBioAgriculture',
    avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
    role: 'Junior School Integrated Science & Agriculture',
    school: 'Moi Forces Academy, Nairobi',
    subjects: ['Science'],
    gradeBand: 'Junior School (Grade 7-9)',
    badge: 'CBC Lead Facilitator',
    stolenIdeasCount: 2120,
  },
  {
    id: 't-mutua',
    name: 'Mwalimu Joseph Mutua',
    handle: '@MutuaPreTech',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Pre-Technical Studies & Computing Mentor',
    school: 'Machakos Academy, Eastern',
    subjects: ['Computer Studies'],
    gradeBand: 'Junior School (Grade 7-9)',
    badge: 'STEM Lead',
    stolenIdeasCount: 1980,
  },
  {
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
  {
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
  {
    id: 't-halima',
    name: 'Tr. Halima Abdi',
    handle: '@HalimaCBCJunior',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80',
    role: 'Upper Primary Grade 4-6 CBC Coordinator',
    school: 'Garissa Primary School',
    subjects: ['Computer Studies', 'Kiswahili'],
    gradeBand: 'Upper Primary (Grade 4-6)',
    badge: 'Instructional Coach',
    stolenIdeasCount: 2200,
  }
];

export interface RawConceptSeed {
  title: string;
  concept: string;
  subject: 'Computer Studies' | 'Math' | 'Science' | 'Kiswahili' | 'English & ELA' | 'History & Social Studies' | 'Classroom Management';
  subdiscipline: string;
  gradeBand: GradeBand;
  teachingStrategy: 'Direct Instruction' | 'Inquiry-Based' | 'Gamification' | 'Peer Review';
  standardCode: string;
  pedagogyTag: string;
  hook: string;
  analogy: string;
  misconception: string;
  visualStyle: VisualStyle;
}

// Curated conceptual demonstration seeds spanning all Kenyan Curriculum levels
// Includes dedicated Computer Studies lessons for Grade 1 through Grade 12
export const CONCEPT_SEEDS: RawConceptSeed[] = [
  // =========================================================================
  // --- COMPUTER STUDIES / ICT: GRADES 1 THROUGH 12 COMPLETE SERIES ---
  // =========================================================================
  {
    title: 'Grade 1 Computer Studies: The Monitor Face, Mouse Tail & Alphabet Keys',
    concept: 'Identifying Basic Parts of a Digital Device',
    subject: 'Computer Studies',
    subdiscipline: 'Hardware & Literacy',
    gradeBand: 'Lower Primary (Grade 1-3)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'KICD.CBC.COMP.G1.01',
    pedagogyTag: 'Sensory Object Identification',
    hook: 'Hujambo darasa! Hold up a tablet screen and then a small pocket mirror. Ask: "Is this television screen alive or is it showing us what our tablet is thinking?"',
    analogy: 'The monitor is the computer face showing pictures; the mouse is a tiny friendly pet with two ears to click; and the keyboard is your typewriter full of alphabet buttons to send it messages!',
    misconception: 'Little learners think pressing the mouse button harder makes the computer type faster.',
    visualStyle: 'computer_studies_visualizer',
  },
  {
    title: 'Grade 2 Computer Studies: Input vs Output (Mouth Eating vs Speaker Singing)',
    concept: 'Input and Output Distinction',
    subject: 'Computer Studies',
    subdiscipline: 'Computer Architecture',
    gradeBand: 'Lower Primary (Grade 1-3)',
    teachingStrategy: 'Gamification',
    standardCode: 'KICD.CBC.COMP.G2.02',
    pedagogyTag: 'Body Metaphor Game',
    hook: 'Ask pupils: "When you eat hot mandazi and tea, does food go INTO your mouth or come OUT? Into your mouth! That is INPUT!"',
    analogy: 'Input is what we feed the machine (typing keys, clicking the mouse, speaking into the microphone). Output is what the computer sings back or shows us (the screen picture, radio song, or printer page).',
    misconception: 'Pupils assume looking at the screen counts as input because their eyes are looking at it.',
    visualStyle: 'computer_studies_visualizer',
  },
  {
    title: 'Grade 3 Computer Studies: Caring for Digital Devices & Clean Keyboard Hands',
    concept: 'Safe Device Handling & Hygiene',
    subject: 'Computer Studies',
    subdiscipline: 'Device Care & Ethics',
    gradeBand: 'Lower Primary (Grade 1-3)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'KICD.CBC.COMP.G3.01',
    pedagogyTag: 'Physical Care Roleplay',
    hook: 'What happens if you eat mandazi with oily sugar fingers and touch the school tablet? Let us shine a torch to see the greasy fingerprints blocking the sensor!',
    analogy: 'A tablet or laptop keyboard is as delicate as fresh eggs from the shamba. We keep dust away, wash hands before touching, and never bring water, soda, or tea near the keys!',
    misconception: 'Pupils think washing a dusty tablet with a wet soapy sponge cleans it safely.',
    visualStyle: 'running_words_visualizer',
  },
  {
    title: 'Grade 4 Computer Studies: The CPU Brain vs Storage (The School Desk & Metal Trunk)',
    concept: 'Processor vs RAM vs Secondary Storage',
    subject: 'Computer Studies',
    subdiscipline: 'Computer Systems',
    gradeBand: 'Upper Primary (Grade 4-6)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KICD.CBC.COMP.G4.02',
    pedagogyTag: 'Classroom Furniture Contrast',
    hook: 'Open an old desktop CPU case and show the small processor chip. "Can something the size of a postage stamp solve 10,000 math sums before you even blink?"',
    analogy: 'The CPU is the sharp brain doing the thinking; RAM is your open classroom desk holding the books you read right now; and the Hard Drive is your metal trunk at home where all your past exercise books sleep safely!',
    misconception: 'Learners assume the big monitor screen is the computer and the CPU box is just a heavy battery.',
    visualStyle: 'computer_studies_visualizer',
  },
  {
    title: 'Grade 5 Computer Studies: Algorithms as Making Kenyan Chai Step-by-Step',
    concept: 'Sequential Algorithms and Flow of Control',
    subject: 'Computer Studies',
    subdiscipline: 'Computational Thinking',
    gradeBand: 'Upper Primary (Grade 4-6)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KICD.CBC.COMP.G5.01',
    pedagogyTag: 'Authentic Kitchen Protocol',
    hook: 'Ask a learner to instruct the teacher to make chai, but if they forget to say "light the jiko", the teacher pours cold milk straight into dry leaves without heat!',
    analogy: 'An algorithm is an exact recipe. Just like brewing authentic Kenyan chai—pour water in the sufuria, light fire, boil, add tea leaves, add milk, stir, sieve into a thermos. If you swap step 2 and step 6, you get cold mud! Computers execute instructions in strict order.',
    misconception: 'Thinking computers can guess what you meant when you leave out a crucial instruction step.',
    visualStyle: 'running_words_visualizer',
  },
  {
    title: 'Grade 6 Computer Studies: Scratch Block Coding & Maasai Mara Sprite Animation',
    concept: 'Event-Driven Block Programming & Loops',
    subject: 'Computer Studies',
    subdiscipline: 'Programming & Logic',
    gradeBand: 'Upper Primary (Grade 4-6)',
    teachingStrategy: 'Gamification',
    standardCode: 'KICD.CBC.COMP.G6.03',
    pedagogyTag: 'Visual Block Construction',
    hook: 'Display a Scratch sprite of a cheetah in the Maasai Mara savannah. "How do we make our cheetah sprint across the screen when we tap the Green Flag?"',
    analogy: 'Scratch blocks are interlocking Lego bricks. When you snap "When Green Flag Clicked" to "Repeat 10" and "Move 15 Steps", you are directing an actor on a theater stage. No syntax errors, pure logical flow!',
    misconception: 'Learners assume computer programming requires typing cryptic punctuation rather than arranging logical sequences.',
    visualStyle: 'computer_studies_visualizer',
  },
  {
    title: 'Grade 7 Computer Studies (JSS): The IPO Cycle (Input-Processing-Output-Storage)',
    concept: 'The Information Processing Cycle in Modern Hardware',
    subject: 'Computer Studies',
    subdiscipline: 'System Architecture',
    gradeBand: 'Junior School (Grade 7-9)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'KICD.JSS.COMP.G7.01',
    pedagogyTag: 'Posho Mill Data Model',
    hook: 'Show dry maize cobs entering a diesel posho mill and coming out as fine unga flour. What happened in between?',
    analogy: 'Every digital device on earth runs the IPO cycle: Input (dry maize / keyboard taps), Processing (the spinning mill stones / CPU calculations), Output (fresh maize flour / screen pixels), and Storage (sacks packed in the store / SSD).',
    misconception: 'Students confuse permanent storage with temporary RAM memory.',
    visualStyle: 'computer_studies_visualizer',
  },
  {
    title: 'Grade 8 Computer Studies (JSS): Spreadsheets & School Trip Cost Modeling',
    concept: 'Formulas, Functions (=SUM, =AVERAGE) and Cell Coordinates',
    subject: 'Computer Studies',
    subdiscipline: 'Data Analysis',
    gradeBand: 'Junior School (Grade 7-9)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KICD.JSS.COMP.G8.02',
    pedagogyTag: 'Dynamic Grid Ledger',
    hook: 'Hand out a paper budget for a school bus trip to Lake Nakuru National Park. Change the diesel price from KSh 180 to KSh 210. Who wants to recalculate 30 student shares by hand?',
    analogy: 'A spreadsheet is an army of lightning-fast accountants in a grid. When you write =SUM(B2:B30), you are telling the computer: "Any time fuel changes, recompute the total cost instantly for everyone!"',
    misconception: 'Typing pre-calculated numbers directly into spreadsheet cells instead of writing dynamic cell formulas.',
    visualStyle: 'computer_studies_visualizer',
  },
  {
    title: 'Grade 9 Computer Studies (JSS): Digital Safety & Kenya Cybercrimes Act 2018',
    concept: 'Cybersecurity, Phishing Traps & Digital Footprints',
    subject: 'Computer Studies',
    subdiscipline: 'Cybersecurity & Ethics',
    gradeBand: 'Junior School (Grade 7-9)',
    teachingStrategy: 'Peer Review',
    standardCode: 'KICD.JSS.COMP.G9.04',
    pedagogyTag: 'Forensic Phishing Audit',
    hook: 'Display a fake SMS: "Hongera! Safaricom promo has selected your number to win KSh 50,000. Send your M-Pesa PIN and ID number to claim." Who clicks? Who reports?',
    analogy: 'A phishing link is a counterfeit key. Your password and M-Pesa PIN are like your house keys; you never hand them to a stranger knocking on your window. Under the Kenya Computer Misuse and Cybercrimes Act, unauthorized access and online fraud carry severe penalties.',
    misconception: 'Students assume that if a website has a colorful official logo, it is automatically authentic.',
    visualStyle: 'running_words_visualizer',
  },
  {
    title: 'Grade 10 Computer Studies (KCSE F1): Relational Databases & M-Pesa Tables',
    concept: 'Primary Keys, Foreign Keys and Table Normalization',
    subject: 'Computer Studies',
    subdiscipline: 'Database Management',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KCSE.COMP.F1.03',
    pedagogyTag: 'Entity Relational Mapping',
    hook: 'How does Safaricom know which of 30 million Kenyans sent KSh 2,500 to a mama mboga in Nakuru in under two seconds? They never store all data in one giant sheet!',
    analogy: 'A relational database uses Primary Keys (like your National ID or Phone Number) and Foreign Keys (Transaction ID) across tables. It links Customer, Agent, and Balance tables without ever duplicating user addresses.',
    misconception: 'Students think databases are merely large Excel worksheets without understanding foreign key relationships and atomic transactions.',
    visualStyle: 'computer_studies_visualizer',
  },
  {
    title: 'Grade 11 Computer Studies (KCSE F2): Binary Logic & Olkaria Current Switches',
    concept: 'Binary Representation, Logic Gates (AND, OR, NOT) & Truth Tables',
    subject: 'Computer Studies',
    subdiscipline: 'Digital Logic',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Gamification',
    standardCode: 'KCSE.COMP.F2.01',
    pedagogyTag: 'Physical Switch Circuit',
    hook: 'Wire two light switches in series on the lab table. The lamp lights only if Switch A AND Switch B are closed. That is an AND gate built with physical switches!',
    analogy: 'Computers do not understand letters or colors; they only see electric currents: 1 (switch closed, current flowing like Olkaria geothermal power) or 0 (switch open, zero voltage). Billions of microscopic transistor switches combined create videos, games, and AI.',
    misconception: 'Students believe binary 0 means the wire is broken or dead rather than a low voltage signal state.',
    visualStyle: 'computer_studies_visualizer',
  },
  {
    title: 'Grade 12 Computer Studies (KCSE F4): Networking, IP Packets & The Matatu Route',
    concept: 'Packet Switching, Routers, TCP/IP and Network Topologies',
    subject: 'Computer Studies',
    subdiscipline: 'Networking & Telecommunications',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'KCSE.COMP.F4.02',
    pedagogyTag: 'Transport Route Analogy',
    hook: 'When you send a WhatsApp video from Nairobi to your grandmother in Kisumu, does the entire video file travel as one unbroken block along the highway?',
    analogy: 'Your video is sliced into numbered data packets. Like passengers entering 10 different matatus at Nairobi Country Bus stage: some take the Mai Mahiu route, others take Nakuru highway. When they arrive in Kisumu, the router reassembles packets 1 to 10. If packet 4 is delayed, TCP requests an immediate re-send!',
    misconception: 'Believing internet data flows through a single dedicated physical wire directly between two phones.',
    visualStyle: 'computer_studies_visualizer',
  },

  // =========================================================================
  // --- KISWAHILI SANIFU: SARUFI, NAFASI YA NOMINO & FASIHI SIMULIZI ---
  // =========================================================================
  {
    title: 'Kiswahili Sanifu: Ngeli za Nomino (A-WA, KI-VI, I-ZI, LI-YA) na Upatanisho wa Kisintaksia',
    concept: 'Upatanisho wa Kisintaksia na Mfumo wa Ngeli za Kiswahili',
    subject: 'Kiswahili',
    subdiscipline: 'Sarufi',
    gradeBand: 'Junior School (Grade 7-9)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KICD.JSS.KISW.G7.02',
    pedagogyTag: 'Upatanisho wa Viambishi',
    hook: 'Andika ubaoni: "Kiti kile kimevunjika." Uliza wanafunzi: Tukibadilisha neno "kiti" liwe "meza", sentensi inakuwaje? Meza ile imevunjika!',
    analogy: 'Ngeli ni kama familia. Kila familia ina mavazi na viambishi vyake maalum vya kiupatanisho vinavyounganisha nomino, kivumishi, na kitenzi.',
    misconception: 'Wanafunzi huchanganya ngeli ya I-ZI na LI-YA na kuandika sentensi zisizo na upatanisho.',
    visualStyle: 'kiswahili_visualizer',
  },
  {
    title: 'Kiswahili Vitendawili na Mafumbo: Kukuza Umakini na Fasihi Simulizi',
    concept: 'Sitiari, Mafumbo na Uhusiano wa Mazingira Katika Vitendawili',
    subject: 'Kiswahili',
    subdiscipline: 'Fasihi Simulizi',
    gradeBand: 'Upper Primary (Grade 4-6)',
    teachingStrategy: 'Gamification',
    standardCode: 'KICD.CBC.KISW.G5.04',
    pedagogyTag: 'Ulinganishaji wa Kifasihi',
    hook: '"Kitendawili! Tega! Bakari amevaa kofia nyeupe lakini hana kichwa? Jibu: Uyoga!"',
    analogy: 'Vitendawili ni darubini ya mazingira. Vinamfunza mwanafunzi kutazama uyoga, yai, kivuli, au moshi kwa jicho la kiubunifu na sitiari.',
    misconception: 'Kudhani vitendawili ni michezo ya watoto tu badala ya zana za kujenga lugha ya picha.',
    visualStyle: 'kiswahili_visualizer',
  },
  {
    title: 'Kiswahili Sarufi: Unyambulishaji wa Vitenzi (Kutenda, Kutendea, Kutendeka na Kutendana)',
    concept: 'Mnyambuliko wa Vitenzi na Viambishi vya Kauli',
    subject: 'Kiswahili',
    subdiscipline: 'Sarufi',
    gradeBand: 'Junior School (Grade 7-9)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'KICD.JSS.KISW.G8.01',
    pedagogyTag: 'Jedwali la Mnyambuliko',
    hook: 'Chukua neno "Pika". Je, mama anapika, chakula kimepikika, au mama anampikia mtoto? Maana inabadilika vipi?',
    analogy: 'Shina la kitenzi ni kama shina la mti. Viambishi tamati vinavyoongezwa vinakuza matawi tofauti ya maana (kutendea = kusaidia, kutendeka = kukamilika).',
    misconception: 'Kuchanganya kauli ya kutendeka na kutendwa.',
    visualStyle: 'kiswahili_visualizer',
  },

  // =========================================================================
  // --- KENYAN MATHEMATICS: CBC & KCSE ---
  // =========================================================================
  {
    title: 'M-Pesa Tariff Step Functions: Why Math Governs Transaction Fees',
    concept: 'Piecewise Step Functions & Percentage Rates',
    subject: 'Math',
    subdiscipline: 'Algebra',
    gradeBand: 'Junior School (Grade 7-9)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KICD.JSS.MATH.G8.04',
    pedagogyTag: 'Mobile Money Math Model',
    hook: 'Why does sending KSh 100 cost KSh 0, but sending KSh 101 suddenly jumps to KSh 7? Show the Safaricom tariff poster on the screen!',
    analogy: 'A step function is like climbing stairs in a multi-story building. You cannot stand between step 2 and 3; you pay the flat bracket fee until your transaction crosses the threshold into the next tier.',
    misconception: 'Students assume transaction fees are a continuous smooth linear percentage (y = mx) instead of discrete steps.',
    visualStyle: 'fractions_visualizer',
  },
  {
    title: 'Nairobi Matatu Fare Matrices: Linear Algebra & Fleet Revenue',
    concept: 'Matrix Multiplication & Route Revenue Modeling',
    subject: 'Math',
    subdiscipline: 'Linear Algebra',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Gamification',
    standardCode: 'KCSE.MATH.F3.06',
    pedagogyTag: 'Fleet Matrix Operations',
    hook: 'A 14-seater matatu plies the Ngong Road route 6 times a day. Morning peak fare is KSh 100, off-peak is KSh 50. How does the Sacco accountant calculate total daily income in one single matrix multiplication?',
    analogy: 'A matrix is an organized spreadsheet table. Multiplying the passenger count row by the fare column sums each journey into total cash automatically without doing 12 separate manual additions.',
    misconception: 'Students try to multiply matrices by multiplying matching elements instead of the dot product (row times column).',
    visualStyle: 'pythagorean_visualizer',
  },
  {
    title: 'Measuring Triangular Shambas: Heron\'s Formula in Land Surveying',
    concept: 'Heron\'s Formula for Irregular Plots',
    subject: 'Math',
    subdiscipline: 'Geometry',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'KCSE.MATH.F4.03',
    pedagogyTag: 'Surveyor Field Demonstration',
    hook: 'Your family buys an irregular triangular shamba in Eldoret with sides 60m, 80m, and 120m. You have no right angles and no laser level. How do you find the acreage?',
    analogy: 'Heron\'s formula is the land surveyor\'s Swiss Army knife. Find the semi-perimeter s = (a+b+c)/2, then calculate √[s(s-a)(s-b)(s-c)]. It gives the exact area without dropping a perpendicular height line!',
    misconception: 'Students blindly use 1/2 × base × height on triangles where the given side is not perpendicular to the base.',
    visualStyle: 'pythagorean_visualizer',
  },

  // =========================================================================
  // --- KENYAN SCIENCE: CHEMISTRY, PHYSICS & BIOLOGY ---
  // =========================================================================
  {
    title: 'Lake Magadi Trona: Mining and Calcination of Sodium Carbonate (Soda Ash)',
    concept: 'Thermal Decomposition & Industrial Salts Extraction',
    subject: 'Science',
    subdiscipline: 'Chemistry',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'KCSE.CHEM.F4.02',
    pedagogyTag: 'Industrial Chemistry Case Study',
    hook: 'Hold up a chunk of pink trona crust from Lake Magadi in the southern Rift Valley. "How does this evaporite rock become the glass windows and Omo soap used in Kenya?"',
    analogy: 'Trona is sodium sesquicarbonate [Na2CO3·NaHCO3·2H2O]. In the rotary kilns at Magadi, it is heated (calcined) to drive off water vapor and carbon dioxide gas, leaving pure white sodium carbonate powder!',
    misconception: 'Students assume soda ash is formed by simply dissolving table salt (NaCl) in water.',
    visualStyle: 'chemical_bonds_visualizer',
  },
  {
    title: 'Natural Acid-Base Indicators: Market Hibiscus & Purple Cabbage',
    concept: 'Anthocyanin Indicators & pH Scale',
    subject: 'Science',
    subdiscipline: 'Chemistry',
    gradeBand: 'Junior School (Grade 7-9)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KICD.JSS.SCI.G7.03',
    pedagogyTag: 'Local Botanical Chemistry',
    hook: 'Crush purple hibiscus petals in warm water to get a deep purple juice. Add lemon juice—it turns bright red! Add wood ash water—it turns emerald green!',
    analogy: 'Natural pigments like anthocyanin are molecular chameleons. In acidic environments (lemon juice), hydrogen ions latch on and reflect red light; in basic alkaline environments (wood ash), hydrogen ions detach, turning green!',
    misconception: 'Believing synthetic lab indicators like litmus or phenolphthalein are the only chemicals capable of detecting acids.',
    visualStyle: 'chemical_bonds_visualizer',
  },
  {
    title: 'Olkaria Geothermal Power: Harnessing High-Pressure Steam Turbines',
    concept: 'Thermodynamics & Electrical Energy Conversion',
    subject: 'Science',
    subdiscipline: 'Physics',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KCSE.PHY.F3.04',
    pedagogyTag: 'Rift Valley Geothermal Model',
    hook: 'Boil water in a kettle on a Bunsen burner with a pinwheel held above the spout. The steam spins the pinwheel at high speed. "Now scale this pinwheel to 100 meters across at Olkaria!"',
    analogy: 'Underneath the Great Rift Valley, magma heats groundwater into superheated steam. Piped up under immense pressure, the steam blasts giant turbine blades connected to copper dynamos, converting subterranean earth heat into Nairobi city electricity!',
    misconception: 'Students think geothermal plants burn coal or oil underground to make steam.',
    visualStyle: 'gravity_visualizer',
  },
  {
    title: 'SEACOM & TEAMS Undersea Fiber Optics: Total Internal Reflection at Mombasa',
    concept: 'Optics, Critical Angle & Total Internal Reflection',
    subject: 'Science',
    subdiscipline: 'Physics',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'KCSE.PHY.F4.01',
    pedagogyTag: 'Laser Water Jet Demonstration',
    hook: 'Shine a green laser pointer through a curved stream of water leaking from a plastic bottle. The laser light bends and stays trapped inside the falling water stream!',
    analogy: 'Under the Indian Ocean from Djibouti to Mombasa, glass cables thinner than human hair carry internet pulses. Light bounces inside the glass core without escaping because the angle of incidence exceeds the critical angle—100% reflection with zero light leakage!',
    misconception: 'Students assume light always travels straight through glass and out into the surrounding water.',
    visualStyle: 'gravity_visualizer',
  },
  {
    title: 'Malaria Vector Transmission: Anopheles Mosquito & Plasmodium in Lake Basin',
    concept: 'Parasitology, Vectors and Pathogen Life Cycles',
    subject: 'Science',
    subdiscipline: 'Biology',
    gradeBand: 'Junior School (Grade 7-9)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'KICD.JSS.SCI.G8.01',
    pedagogyTag: 'Epidemiological Life Cycle',
    hook: 'Show a mosquito resting at a 45-degree angle vs a flat culicine mosquito. "Which one is carrying the malaria parasite in Kisumu?"',
    analogy: 'The female Anopheles mosquito is a hypodermic needle. When she injects saliva to prevent blood clotting, sporozoites enter the bloodstream, multiply silently inside human liver cells, and burst into red blood cells, causing chills and fever.',
    misconception: 'Believing drinking dirty borehole water directly causes malaria infection.',
    visualStyle: 'mitosis_visualizer',
  },
  {
    title: 'Kitale Maize Crops: C4 Photosynthesis & Drought Adaptation',
    concept: 'Kranz Anatomy, PEP Carboxylase & Photorespiration Avoidance',
    subject: 'Science',
    subdiscipline: 'Biology',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Inquiry-Based',
    standardCode: 'KCSE.BIO.F4.05',
    pedagogyTag: 'Agricultural Plant Anatomy',
    hook: 'Why does a Kitale maize stalk grow 8 feet tall under scorching tropical sun while European wheat wilts and stops producing glucose?',
    analogy: 'Maize uses C4 photosynthesis with Kranz anatomy. It has a supercharged CO2 pump called PEP Carboxylase that traps carbon without wasting energy on photorespiration, even when stomata are partially closed to save water!',
    misconception: 'Assuming all green plants carry out identical carbon fixation pathways.',
    visualStyle: 'mitosis_visualizer',
  },

  // =========================================================================
  // --- KENYAN HUMANITIES, LITERATURE & SOCIAL STUDIES ---
  // =========================================================================
  {
    title: 'Margaret Ogola\'s "The River and the Source": Tracing Akoko\'s Resilience',
    concept: 'Character Arc & Thematic Analysis in Kenyan Literature',
    subject: 'English & ELA',
    subdiscipline: 'Literature',
    gradeBand: 'Senior School (Grade 10-12)',
    teachingStrategy: 'Peer Review',
    standardCode: 'KCSE.ENG.F3.01',
    pedagogyTag: 'Set Book Character Matrix',
    hook: 'Quote Akoko facing the tribal council: "A river does not forget its source." How does one determined woman alter four generations of Kenyan history?',
    analogy: 'Akoko is the headwaters of a great river. Each generation—Nyabera, Awiti, and Wandia—expands the river wider into modern education, medicine, and social courage, while remaining rooted in the original ancestral spring.',
    misconception: 'Viewing Akoko as simply stubborn rather than a strategic champion of traditional justice and modern progress.',
    visualStyle: 'running_words_visualizer',
  },
  {
    title: 'Kenyan Devolution & The 47 Counties: Separation of Powers in Constitution 2010',
    concept: 'Devolved Governance, County Assemblies and National Senate',
    subject: 'History & Social Studies',
    subdiscipline: 'Civics',
    gradeBand: 'Junior School (Grade 7-9)',
    teachingStrategy: 'Gamification',
    standardCode: 'KICD.JSS.SST.G8.03',
    pedagogyTag: 'County Budget Simulation',
    hook: 'Before 2010, if a borehole in Mandera needed fixing, the approval had to come from Nairobi. Today, who allocates the repair budget? The Mandera County Government!',
    analogy: 'Devolution is like giving each homestead its own cooking pot. National Government builds highways and defends borders, while 47 County Governments manage local hospitals, village markets, and agricultural extension services.',
    misconception: 'Students think County Governors take orders directly from Cabinet Secretaries.',
    visualStyle: 'running_words_visualizer',
  },
  {
    title: 'CBC Pre-Technical Workshop Safety: Color Coding & Hand Tool Discipline',
    concept: 'Occupational Safety, Personal Protective Equipment (PPE) & Maintenance',
    subject: 'Classroom Management',
    subdiscipline: 'Pre-Technical Studies',
    gradeBand: 'Junior School (Grade 7-9)',
    teachingStrategy: 'Direct Instruction',
    standardCode: 'KICD.JSS.PRETECH.G7.01',
    pedagogyTag: 'Workshop Safety Protocol',
    hook: 'Hold up a chisel with a mushroomed metal head and ask: "What flies into your eye when the mallet strikes this burred steel?"',
    analogy: 'A technical workshop is like an operating theater. Color-coded floor lines (Yellow for caution zones, Red for danger stops) and sharp tool discipline ensure every student builds projects safely and returns home intact!',
    misconception: 'Thinking blunt tools are safer to handle than properly sharpened tools (blunt tools slip and cause severe injuries).',
    visualStyle: 'running_words_visualizer',
  }
];

// Matrix of 75 systematic Kenyan curriculum topics spanning all subjects
export const KENYAN_TOPIC_TEMPLATES = [
  // Computer Studies & ICT (Grades 1 to 12)
  { topic: 'Computer Peripherals (Keyboard, Mouse, Barcode Scanner)', sub: 'Computer Studies', subdis: 'Hardware', grade: 'Lower Primary (Grade 1-3)', strat: 'Direct Instruction', standard: 'KICD.CBC.COMP.G1.02', visual: 'computer_studies_visualizer' },
  { topic: 'Digital Painting & Drawing Shapes on Touchscreens', sub: 'Computer Studies', subdis: 'Creative Tech', grade: 'Lower Primary (Grade 1-3)', strat: 'Gamification', standard: 'KICD.CBC.COMP.G2.03', visual: 'computer_studies_visualizer' },
  { topic: 'Keyboarding Finger Positioning (Home Row ASDF JKL;)', sub: 'Computer Studies', subdis: 'Typing Skills', grade: 'Lower Primary (Grade 1-3)', strat: 'Gamification', standard: 'KICD.CBC.COMP.G3.02', visual: 'computer_studies_visualizer' },
  { topic: 'File Organization: Folders, Filenames & Flash Drives', sub: 'Computer Studies', subdis: 'Data Management', grade: 'Upper Primary (Grade 4-6)', strat: 'Direct Instruction', standard: 'KICD.CBC.COMP.G4.01', visual: 'computer_studies_visualizer' },
  { topic: 'Word Processing: Formatting Font, Margins & Bullet Lists', sub: 'Computer Studies', subdis: 'Applications', grade: 'Upper Primary (Grade 4-6)', strat: 'Direct Instruction', standard: 'KICD.CBC.COMP.G5.02', visual: 'computer_studies_visualizer' },
  { topic: 'Presentation Slides: Storyboarding School Projects in PowerPoint', sub: 'Computer Studies', subdis: 'Multimedia', grade: 'Upper Primary (Grade 4-6)', strat: 'Inquiry-Based', standard: 'KICD.CBC.COMP.G6.01', visual: 'computer_studies_visualizer' },
  { topic: 'Operating Systems: Windows & Android as the School Principal', sub: 'Computer Studies', subdis: 'System Software', grade: 'Junior School (Grade 7-9)', strat: 'Inquiry-Based', standard: 'KICD.JSS.COMP.G7.02', visual: 'computer_studies_visualizer' },
  { topic: 'Flowcharts: Decision Diamonds & Nairobi Traffic Logic', sub: 'Computer Studies', subdis: 'Algorithms', grade: 'Junior School (Grade 7-9)', strat: 'Inquiry-Based', standard: 'KICD.JSS.COMP.G8.01', visual: 'computer_studies_visualizer' },
  { topic: 'Python Variables as Named Sukuma Wiki Storage Baskets', sub: 'Computer Studies', subdis: 'Programming', grade: 'Junior School (Grade 7-9)', strat: 'Gamification', standard: 'KICD.JSS.COMP.G8.03', visual: 'computer_studies_visualizer' },
  { topic: 'Conditional Statements (if-else): M-Pesa Balance Sufficient Check', sub: 'Computer Studies', subdis: 'Programming', grade: 'Junior School (Grade 7-9)', strat: 'Inquiry-Based', standard: 'KICD.JSS.COMP.G9.01', visual: 'computer_studies_visualizer' },
  { topic: 'Loops (For & While): Sending SMS Alerts to 500 Sacco Members', sub: 'Computer Studies', subdis: 'Programming', grade: 'Junior School (Grade 7-9)', strat: 'Gamification', standard: 'KICD.JSS.COMP.G9.02', visual: 'computer_studies_visualizer' },
  { topic: 'Computer Generations: From Vacuum Tubes to Silicon Microchips', sub: 'Computer Studies', subdis: 'History of Tech', grade: 'Senior School (Grade 10-12)', strat: 'Direct Instruction', standard: 'KCSE.COMP.F1.01', visual: 'computer_studies_visualizer' },
  { topic: 'Number Systems: Converting Decimal to Binary & Hexadecimal', sub: 'Computer Studies', subdis: 'Data Representation', grade: 'Senior School (Grade 10-12)', strat: 'Direct Instruction', standard: 'KCSE.COMP.F2.02', visual: 'computer_studies_visualizer' },
  { topic: 'System Development Life Cycle (SDLC) for School Portals', sub: 'Computer Studies', subdis: 'Software Engineering', grade: 'Senior School (Grade 10-12)', strat: 'Peer Review', standard: 'KCSE.COMP.F3.01', visual: 'computer_studies_visualizer' },
  { topic: 'Data Security: Encryption Keys, Hashes & Digital Signatures', sub: 'Computer Studies', subdis: 'Cybersecurity', grade: 'Senior School (Grade 10-12)', strat: 'Inquiry-Based', standard: 'KCSE.COMP.F3.04', visual: 'computer_studies_visualizer' },
  { topic: 'Artificial Intelligence: Teaching Computers to Grade Coffee Beans', sub: 'Computer Studies', subdis: 'Emerging Tech', grade: 'Senior School (Grade 10-12)', strat: 'Inquiry-Based', standard: 'KCSE.COMP.F4.04', visual: 'computer_studies_visualizer' },

  // Kiswahili Sanifu (CBC & KCSE)
  { topic: 'Ngeli za Nomino (A-WA, KI-VI, I-ZI, LI-YA) na Upatanisho wa Sarufi', sub: 'Kiswahili', subdis: 'Sarufi', grade: 'Junior School (Grade 7-9)', strat: 'Direct Instruction', standard: 'KICD.JSS.KISW.G7.02', visual: 'kiswahili_visualizer' },
  { topic: 'Unyambulishaji wa Vitenzi: Kauli ya Kutenda, Kutendewa na Kutendeka', sub: 'Kiswahili', subdis: 'Sarufi', grade: 'Junior School (Grade 7-9)', strat: 'Inquiry-Based', standard: 'KICD.JSS.KISW.G8.01', visual: 'kiswahili_visualizer' },
  { topic: 'Vitendawili na Mafumbo ya Kiswahili: Kukuza Ubunifu wa Wanafunzi', sub: 'Kiswahili', subdis: 'Fasihi Simulizi', grade: 'Upper Primary (Grade 4-6)', strat: 'Gamification', standard: 'KICD.CBC.KISW.G5.04', visual: 'kiswahili_visualizer' },
  { topic: 'Ushairi wa Kiswahili: Bahari na Arudhi Katika Mashairi ya Kisasa', sub: 'Kiswahili', subdis: 'Ushairi', grade: 'Senior School (Grade 10-12)', strat: 'Peer Review', standard: 'KCSE.KISW.F3.02', visual: 'kiswahili_visualizer' },
  { topic: 'Methali za Kiswahili na Mafunzo Yake: Heshima na Uadilifu Jamani', sub: 'Kiswahili', subdis: 'Fasihi Simulizi', grade: 'Junior School (Grade 7-9)', strat: 'Gamification', standard: 'KICD.JSS.KISW.G7.03', visual: 'kiswahili_visualizer' },
  { topic: 'Matumizi Sahihi ya Alama za Uakifishi: Kikomo, Koma na Nukuu', sub: 'Kiswahili', subdis: 'Uandishi', grade: 'Upper Primary (Grade 4-6)', strat: 'Direct Instruction', standard: 'KICD.CBC.KISW.G6.01', visual: 'kiswahili_visualizer' },

  // Mathematics (CBC & KCSE)
  { topic: 'Fraction Sharing with Kenyan Chapatis & Mandazis', sub: 'Math', subdis: 'Number Sense', grade: 'Lower Primary (Grade 1-3)', strat: 'Direct Instruction', standard: 'KICD.CBC.MATH.G2.01', visual: 'fractions_visualizer' },
  { topic: 'Place Value Bundles: Counting 10 Sticks in the Shamba', sub: 'Math', subdis: 'Number Sense', grade: 'Lower Primary (Grade 1-3)', strat: 'Gamification', standard: 'KICD.CBC.MATH.G1.03', visual: 'fractions_visualizer' },
  { topic: 'Long Division as Fair Mango Distribution to Cousins', sub: 'Math', subdis: 'Arithmetic', grade: 'Upper Primary (Grade 4-6)', strat: 'Direct Instruction', standard: 'KICD.CBC.MATH.G4.04', visual: 'fractions_visualizer' },
  { topic: 'Perimeter of a Fenced Grazing Field in Kajiado', sub: 'Math', subdis: 'Measurement', grade: 'Upper Primary (Grade 4-6)', strat: 'Inquiry-Based', standard: 'KICD.CBC.MATH.G5.03', visual: 'pythagorean_visualizer' },
  { topic: 'Angles on a Straight Line (180° Flat Table Edge)', sub: 'Math', subdis: 'Geometry', grade: 'Upper Primary (Grade 4-6)', strat: 'Gamification', standard: 'KICD.CBC.MATH.G6.02', visual: 'pythagorean_visualizer' },
  { topic: 'Integers on a Number Line: Lake Victoria Depth vs Mt Kenya Peak', sub: 'Math', subdis: 'Algebra', grade: 'Junior School (Grade 7-9)', strat: 'Direct Instruction', standard: 'KICD.JSS.MATH.G7.01', visual: 'running_words_visualizer' },
  { topic: 'Ratio & Proportions: Mixing Cement, Sand and Ballast for Construction', sub: 'Math', subdis: 'Arithmetic', grade: 'Junior School (Grade 7-9)', strat: 'Inquiry-Based', standard: 'KICD.JSS.MATH.G7.02', visual: 'fractions_visualizer' },
  { topic: 'Pythagorean Theorem: Measuring Roofing Timber Trusses', sub: 'Math', subdis: 'Geometry', grade: 'Junior School (Grade 7-9)', strat: 'Inquiry-Based', standard: 'KICD.JSS.MATH.G8.01', visual: 'pythagorean_visualizer' },
  { topic: 'Simultaneous Equations: Matatu Fare and Bus Fare Mystery', sub: 'Math', subdis: 'Algebra', grade: 'Junior School (Grade 7-9)', strat: 'Gamification', standard: 'KICD.JSS.MATH.G9.01', visual: 'running_words_visualizer' },
  { topic: 'Quadratic Curves & Projectile Arc of a Javelin Throw', sub: 'Math', subdis: 'Algebra', grade: 'Senior School (Grade 10-12)', strat: 'Inquiry-Based', standard: 'KCSE.MATH.F2.03', visual: 'running_words_visualizer' },
  { topic: 'Trigonometric Heights: Clinometer Angle to Mt. Kenya Peak', sub: 'Math', subdis: 'Trigonometry', grade: 'Senior School (Grade 10-12)', strat: 'Inquiry-Based', standard: 'KCSE.MATH.F3.02', visual: 'pythagorean_visualizer' },
  { topic: 'Circle Theorems: Angle Subtended at the Center vs Circumference', sub: 'Math', subdis: 'Geometry', grade: 'Senior School (Grade 10-12)', strat: 'Direct Instruction', standard: 'KCSE.MATH.F3.04', visual: 'pythagorean_visualizer' },
  { topic: 'Calculus Differentiation: Instant Fuel Burn Rate of a Matatu', sub: 'Math', subdis: 'Calculus', grade: 'Senior School (Grade 10-12)', strat: 'Direct Instruction', standard: 'KCSE.MATH.F4.01', visual: 'running_words_visualizer' },
  { topic: 'Probability Trees: Predicting Rain in the Long Rains Season', sub: 'Math', subdis: 'Probability', grade: 'Senior School (Grade 10-12)', strat: 'Gamification', standard: 'KCSE.MATH.F4.05', visual: 'running_words_visualizer' },

  // Science: Chemistry
  { topic: 'Lake Magadi Trona: Extraction of Sodium Carbonate', sub: 'Science', subdis: 'Chemistry', grade: 'Senior School (Grade 10-12)', strat: 'Direct Instruction', standard: 'KCSE.CHEM.F4.02', visual: 'chemical_bonds_visualizer' },
  { topic: 'Mombasa Oil Refinery: Fractional Distillation of Crude Petroleum', sub: 'Science', subdis: 'Chemistry', grade: 'Senior School (Grade 10-12)', strat: 'Direct Instruction', standard: 'KCSE.CHEM.F2.04', visual: 'chemical_bonds_visualizer' },
  { topic: 'Electrolysis of Brine: Generating Chlorine & Caustic Soda', sub: 'Science', subdis: 'Chemistry', grade: 'Senior School (Grade 10-12)', strat: 'Inquiry-Based', standard: 'KCSE.CHEM.F3.03', visual: 'chemical_bonds_visualizer' },
  { topic: 'Hard Water in Rift Valley Boreholes: Limescale & Boiling Remedies', sub: 'Science', subdis: 'Chemistry', grade: 'Junior School (Grade 7-9)', strat: 'Direct Instruction', standard: 'KICD.JSS.SCI.G9.02', visual: 'chemical_bonds_visualizer' },
  { topic: 'Natural Acid-Base Indicators: Market Hibiscus Anthocyanin pH', sub: 'Science', subdis: 'Chemistry', grade: 'Junior School (Grade 7-9)', strat: 'Inquiry-Based', standard: 'KICD.JSS.SCI.G7.03', visual: 'chemical_bonds_visualizer' },
  { topic: 'States of Matter: Ice Melting in Nairobi Warmth', sub: 'Science', subdis: 'Chemistry', grade: 'Lower Primary (Grade 1-3)', strat: 'Inquiry-Based', standard: 'KICD.CBC.SCI.G3.01', visual: 'chemical_bonds_visualizer' },

  // Science: Physics
  { topic: 'Seven Forks Hydroelectric Dams: Gravitational Potential to Watts', sub: 'Science', subdis: 'Physics', grade: 'Junior School (Grade 7-9)', strat: 'Inquiry-Based', standard: 'KICD.JSS.SCI.G8.02', visual: 'gravity_visualizer' },
  { topic: 'Buoyancy & Archimedes Principle: Why Steel Dhows Float on Lake Victoria', sub: 'Science', subdis: 'Physics', grade: 'Junior School (Grade 7-9)', strat: 'Inquiry-Based', standard: 'KICD.JSS.SCI.G8.04', visual: 'gravity_visualizer' },
  { topic: 'Newton\'s Third Law: Jet Propulsion of an Inflated Balloon', sub: 'Science', subdis: 'Physics', grade: 'Senior School (Grade 10-12)', strat: 'Gamification', standard: 'KCSE.PHY.F2.02', visual: 'gravity_visualizer' },
  { topic: 'Light Reflection in Plane Mirrors: Symmetrical Periscope', sub: 'Science', subdis: 'Physics', grade: 'Upper Primary (Grade 4-6)', strat: 'Gamification', standard: 'KICD.CBC.SCI.G5.04', visual: 'gravity_visualizer' },
  { topic: 'Olkaria Geothermal Power: High-Pressure Steam Turbines', sub: 'Science', subdis: 'Physics', grade: 'Senior School (Grade 10-12)', strat: 'Inquiry-Based', standard: 'KCSE.PHY.F3.04', visual: 'gravity_visualizer' },

  // Science: Biology
  { topic: 'Human Heart & Blood Circulation: The Double Pump Pipeline', sub: 'Science', subdis: 'Biology', grade: 'Upper Primary (Grade 4-6)', strat: 'Inquiry-Based', standard: 'KICD.CBC.SCI.G6.01', visual: 'mitosis_visualizer' },
  { topic: 'Plant Roots & Shoots: Germinating Green Grams (Ndengu)', sub: 'Science', subdis: 'Biology', grade: 'Lower Primary (Grade 1-3)', strat: 'Inquiry-Based', standard: 'KICD.CBC.SCI.G2.02', visual: 'mitosis_visualizer' },
  { topic: 'Digestive Enzymes: Salivary Amylase Breaking Down Sweet Potatoes', sub: 'Science', subdis: 'Biology', grade: 'Junior School (Grade 7-9)', strat: 'Direct Instruction', standard: 'KICD.JSS.SCI.G7.04', visual: 'mitosis_visualizer' },
  { topic: 'Meiosis & Genetic Crossing Over: Why Siblings Look Different', sub: 'Science', subdis: 'Biology', grade: 'Senior School (Grade 10-12)', strat: 'Direct Instruction', standard: 'KCSE.BIO.F3.01', visual: 'mitosis_visualizer' },
  { topic: 'Transpiration Stream in Kakamega Rainforest Trees', sub: 'Science', subdis: 'Biology', grade: 'Senior School (Grade 10-12)', strat: 'Inquiry-Based', standard: 'KCSE.BIO.F2.03', visual: 'mitosis_visualizer' },

  // English & ELA
  { topic: 'Phonics Sound Blending in Grade 1 Reading Circles', sub: 'English & ELA', subdis: 'Early Literacy', grade: 'Lower Primary (Grade 1-3)', strat: 'Direct Instruction', standard: 'KICD.CBC.ENG.G1.01', visual: 'running_words_visualizer' },
  { topic: 'Parts of Speech: Noun, Verb and Adjective Color Coding', sub: 'English & ELA', subdis: 'Grammar', grade: 'Upper Primary (Grade 4-6)', strat: 'Gamification', standard: 'KICD.CBC.ENG.G4.02', visual: 'zombie_grammar_visualizer' },
  { topic: 'Active to Passive Voice Transformation in Scientific Lab Reports', sub: 'English & ELA', subdis: 'Grammar', grade: 'Junior School (Grade 7-9)', strat: 'Peer Review', standard: 'KICD.JSS.ENG.G8.02', visual: 'zombie_grammar_visualizer' },
  { topic: 'Direct to Indirect Speech in Kenyan Parliamentary Reporting', sub: 'English & ELA', subdis: 'Grammar', grade: 'Senior School (Grade 10-12)', strat: 'Direct Instruction', standard: 'KCSE.ENG.F2.02', visual: 'zombie_grammar_visualizer' },
  { topic: 'Style & Devices: Symbolism in Henrik Ibsen\'s "A Doll\'s House"', sub: 'English & ELA', subdis: 'Literature', grade: 'Senior School (Grade 10-12)', strat: 'Peer Review', standard: 'KCSE.ENG.F3.03', visual: 'running_words_visualizer' },

  // History, Geography & Social Studies
  { topic: 'Our School Neighborhood Map: Compass Directions & Symbols', sub: 'History & Social Studies', subdis: 'Geography', grade: 'Lower Primary (Grade 1-3)', strat: 'Inquiry-Based', standard: 'KICD.CBC.SST.G2.01', visual: 'running_words_visualizer' },
  { topic: 'Physical Features of Kenya: Mt Kenya, Rift Valley and Lake Turkana', sub: 'History & Social Studies', subdis: 'Geography', grade: 'Upper Primary (Grade 4-6)', strat: 'Inquiry-Based', standard: 'KICD.CBC.SST.G5.01', visual: 'running_words_visualizer' },
  { topic: 'Wangari Maathai & The Green Belt Movement: Civic Environmental Action', sub: 'History & Social Studies', subdis: 'Civics', grade: 'Junior School (Grade 7-9)', strat: 'Direct Instruction', standard: 'KICD.JSS.SST.G7.04', visual: 'running_words_visualizer' },
  { topic: 'Indian Ocean Dhow Trade & Swahili City-States (Kilwa to Mombasa)', sub: 'History & Social Studies', subdis: 'History', grade: 'Junior School (Grade 7-9)', strat: 'Gamification', standard: 'KICD.JSS.SST.G8.01', visual: 'running_words_visualizer' },
  { topic: 'The Scramble for Africa & The 1884 Berlin Partition Boundaries', sub: 'History & Social Studies', subdis: 'History', grade: 'Senior School (Grade 10-12)', strat: 'Inquiry-Based', standard: 'KCSE.HIST.F3.01', visual: 'running_words_visualizer' },

  // CBC Pedagogy & Facilitation
  { topic: 'CBC Core Competency Check: Critical Thinking & Problem Solving', sub: 'Classroom Management', subdis: 'CBC Pedagogy', grade: 'Junior School (Grade 7-9)', strat: 'Peer Review', standard: 'KICD.CBC.PED.CORE.01', visual: 'running_words_visualizer' },
  { topic: 'Formative Assessment Rubrics: Assessing Learning in Real-Time', sub: 'Classroom Management', subdis: 'Assessment', grade: 'Upper Primary (Grade 4-6)', strat: 'Peer Review', standard: 'KICD.CBC.PED.ASSESS.02', visual: 'running_words_visualizer' }
];

/**
 * Builds a comprehensive library of 325+ distinct educational concepts
 * strictly aligned to the Kenyan Competency-Based Curriculum (CBC) and KCSE Senior Secondary.
 * Contains dedicated Computer Studies / ICT lessons spanning Grade 1 to Grade 12,
 * and pure authentic Kiswahili Sanifu lessons with running words or interactive labs.
 */
export function generateComprehensiveConcepts(): TeachTokVideo[] {
  const result: TeachTokVideo[] = [];
  let idCounter = 1;

  // 1. Add curated Kenyan seeds
  for (const s of CONCEPT_SEEDS) {
    const teacher = KENYAN_TEACHERS[(idCounter - 1) % KENYAN_TEACHERS.length];
    const likes = 3200 + ((idCounter * 7919) % 18000);
    const bookmarks = Math.floor(likes * 0.44);
    const shares = Math.floor(likes * 0.17);
    const remixes = 5 + (idCounter % 28);

    result.push({
      id: `seed-ke-${idCounter}`,
      title: s.title,
      concept: s.concept,
      subject: s.subject,
      gradeBand: s.gradeBand,
      teachingStrategy: s.teachingStrategy,
      standardCode: s.standardCode,
      pedagogyTag: s.pedagogyTag,
      summary: `${s.concept}: ${s.analogy.slice(0, 110)}...`,
      teacher,
      videoDuration: 36 + ((idCounter * 7) % 32),
      visualStyle: s.visualStyle || 'running_words_visualizer',
      likes,
      bookmarks,
      shares,
      remixesCount: remixes,
      keyAnalogy: s.analogy,
      classroomHook: s.hook,
      misconceptionBuster: s.misconception,
      resources: [
        {
          id: `res-ke-hook-${idCounter}`,
          type: 'hook_script',
          title: '3-Minute Kenyan CBC Bellringer Cue Script',
          description: 'Step-by-step whiteboard and dialogue script for walimu.',
          gradeSuitability: s.gradeBand,
          timeEstimate: '3 mins',
          content: {
            steps: [
              {
                stepNumber: 1,
                title: 'The Engaging Hook',
                dialogueScript: s.hook,
                teacherNote: 'Wait for learners to volunteer ideas before writing the topic name on the board.',
              },
              {
                stepNumber: 2,
                title: 'The Contextual Analogy',
                dialogueScript: s.analogy,
                teacherNote: 'Prompt two learners to re-explain using their own local shamba or market example.',
              },
            ],
          },
        },
        {
          id: `res-ke-check-${idCounter}`,
          type: 'concept_check',
          title: 'CBC Competency Formative Check',
          description: 'Formative assessment check for understanding.',
          gradeSuitability: s.gradeBand,
          timeEstimate: '2 mins',
          content: {
            quiz: [
              {
                question: `In teaching ${s.concept}, which instructional approach best resolves the common misconception?`,
                options: [
                  `Directly grounding the mechanism with "${s.analogy.slice(0, 60)}..."`,
                  'Forcing learners to memorize definitions without tactile examples',
                  'Skipping practical tasks and immediately giving tests',
                  'Using abstract formulas without explaining the local application',
                ],
                correctAnswer: 0,
                explanation: 'Concrete analogies rooted in everyday Kenyan life build long-term schemas before abstract formulas.',
                whyStudentsGetItWrong: 'Learners often memorize without connecting abstract concepts to physical reality.',
              },
            ],
          },
        },
      ],
      comments: [
        {
          id: `comm-ke-${idCounter}-1`,
          authorName: KENYAN_TEACHERS[(idCounter + 2) % KENYAN_TEACHERS.length].name,
          authorRole: KENYAN_TEACHERS[(idCounter + 2) % KENYAN_TEACHERS.length].role,
          avatar: KENYAN_TEACHERS[(idCounter + 2) % KENYAN_TEACHERS.length].avatar,
          text: `Implemented this in our lesson study with Form 2 / Grade 8 walimu today. The students connected with the Kenyan example immediately!`,
          timestamp: '2 hours ago',
          classroomSuccessRating: 5,
          upvotes: 48 + (idCounter % 50),
          verifiedTeacher: true,
        },
      ],
    });
    idCounter++;
  }

  // 2. Synthesize additional topics to reach 330+ total concepts
  const targetCount = 330;
  const strategies: ('Direct Instruction' | 'Inquiry-Based' | 'Gamification' | 'Peer Review')[] = [
    'Direct Instruction',
    'Inquiry-Based',
    'Gamification',
    'Peer Review',
  ];
  const kenyanGradeBands: GradeBand[] = [
    'Lower Primary (Grade 1-3)',
    'Upper Primary (Grade 4-6)',
    'Junior School (Grade 7-9)',
    'Senior School (Grade 10-12)',
  ];

  let templateIdx = 0;
  while (result.length < targetCount) {
    const tmpl = KENYAN_TOPIC_TEMPLATES[templateIdx % KENYAN_TOPIC_TEMPLATES.length];
    const teacher = KENYAN_TEACHERS[result.length % KENYAN_TEACHERS.length];
    const strat = strategies[result.length % strategies.length];
    const grade = (tmpl.grade as GradeBand) || kenyanGradeBands[result.length % kenyanGradeBands.length];
    const cycle = Math.floor(result.length / KENYAN_TOPIC_TEMPLATES.length) + 1;

    const isKiswahili = tmpl.sub === 'Kiswahili';
    const conceptName = cycle === 1 ? tmpl.topic : `${tmpl.topic} (Mfululizo wa ${cycle}: Mazoezi Zaidi)`;
    const title = isKiswahili
      ? `Kufundisha ${conceptName}: Mbinu Shirikishi ya Darasani`
      : `Teaching ${conceptName}: The Kenyan Classroom Model`;
    
    const analogy = isKiswahili
      ? `Eleza dhana hii kwa kutumia mbinu ya upatanisho wa kisintaksia na methali za jamii ili wanafunzi waelewe sarufi na fasihi kwa urahisi darasani.`
      : `Explain this concept using tangible Kenyan models (such as M-Pesa transactions, posho mills, Olkaria turbines, or market trade) where each variable directly corresponds to an everyday physical item learners interact with.`;
      
    const hook = isKiswahili
      ? `Anza somo kwa kitendawili au changamoto ubaoni: "Kabla ya kuandika maelezo yoyote, nani anayeweza kubaini tofauti ya kiambishi katika sentensi hii?"`
      : `Start class with a local challenge on the front desk: "Before writing any notes, how would you solve this practical challenge using items found in our local community?"`;
      
    const misconception = isKiswahili
      ? `Wanafunzi mara nyingi huchanganya upatanisho wa ngeli moja na nyingine wanapotunga sentensi.`
      : `Learners often confuse the instantaneous rate of change with the cumulative total over time.`;

    const likes = 2100 + ((result.length * 6133) % 15000);
    const bookmarks = Math.floor(likes * 0.42);
    const shares = Math.floor(likes * 0.16);

    result.push({
      id: `concept-ke-${result.length + 1}`,
      title,
      concept: conceptName,
      subject: tmpl.sub as any,
      gradeBand: grade,
      teachingStrategy: strat,
      standardCode: tmpl.standard,
      pedagogyTag: `${tmpl.subdis} Model`,
      summary: `${conceptName}: ${analogy.slice(0, 110)}...`,
      teacher,
      videoDuration: 32 + ((result.length * 5) % 38),
      visualStyle: (tmpl.visual as VisualStyle) || 'running_words_visualizer',
      likes,
      bookmarks,
      shares,
      remixesCount: 4 + (result.length % 22),
      keyAnalogy: analogy,
      classroomHook: hook,
      misconceptionBuster: misconception,
      resources: [
        {
          id: `res-gen-hook-${result.length}`,
          type: 'hook_script',
          title: isKiswahili ? 'Mwongozo wa Dakika 3 wa Ualimu' : '3-Minute Kenyan Bellringer Hook Script',
          description: isKiswahili ? 'Mwongozo wa mwalimu wa ubaoni.' : 'Whiteboard cue and teacher dialogue.',
          gradeSuitability: grade,
          timeEstimate: '3 mins',
          content: {
            steps: [
              {
                stepNumber: 1,
                title: isKiswahili ? 'Ufunguzi wa Somo' : 'The Challenge',
                dialogueScript: hook,
                teacherNote: isKiswahili ? 'Wape wanafunzi sekunde 20 za kutafakari kimya kabla ya kujibu.' : 'Give 20 seconds of quiet think time before calling on a learner.',
              },
              {
                stepNumber: 2,
                title: isKiswahili ? 'Sitiari Kuu' : 'The Connection',
                dialogueScript: analogy,
                teacherNote: isKiswahili ? 'Andika msamiati muhimu ubaoni.' : 'Write key vocabulary on the chalkboard.',
              },
            ],
          },
        },
        {
          id: `res-gen-check-${result.length}`,
          type: 'concept_check',
          title: isKiswahili ? 'Tathmini ya Ufahamu' : 'Exit Ticket Mastery Check',
          description: isKiswahili ? 'Kipimo cha haraka cha kuelewa mada.' : 'Quick formative check for understanding.',
          gradeSuitability: grade,
          timeEstimate: '2 mins',
          content: {
            quiz: [
              {
                question: isKiswahili
                  ? `Katika kufundisha ${conceptName}, ni njia ipi inayowasaidia wanafunzi zaidi?`
                  : `In the context of ${conceptName}, which pedagogical method provides the strongest learning foundation?`,
                options: isKiswahili
                  ? [
                      'Kutumia mifano halisi na mifumo ya upatanisho wa sentensi',
                      'Kukariri kanuni bila kuelewa mifano ya vitendo',
                      'Kupuuza mazoezi ya darasani kabisa',
                      'Kuzingatia mtihani tu bila kuelewa maana ya lugha',
                    ]
                  : [
                      'Grounding abstract ideas in familiar local objects and practical demonstrations',
                      'Relying purely on mechanical rote memorization without intuition',
                      'Skipping practical application exercises entirely',
                      'Focusing only on passing exams without conceptual understanding',
                    ],
                correctAnswer: 0,
                explanation: isKiswahili
                  ? 'Kuhusisha lugha na maisha halisi hujenga ufahamu thabiti wa muda mrefu.'
                  : 'Connecting concepts to concrete local experiences creates strong mental schemas and enduring understanding.',
                whyStudentsGetItWrong: isKiswahili
                  ? 'Wanafunzi mara nyingi hukariri bila kuelewa kanuni za sarufi.'
                  : 'Learners jump straight to symbol manipulation without grasping the underlying physical principle.',
              },
            ],
          },
        },
      ],
      comments: [
        {
          id: `comm-gen-${result.length}`,
          authorName: KENYAN_TEACHERS[(result.length + 1) % KENYAN_TEACHERS.length].name,
          authorRole: KENYAN_TEACHERS[(result.length + 1) % KENYAN_TEACHERS.length].role,
          avatar: KENYAN_TEACHERS[(result.length + 1) % KENYAN_TEACHERS.length].avatar,
          text: isKiswahili
            ? `Nilitumia mbinu hii katika kikao cha idara ya Kiswahili. Wanafunzi wetu walionyesha mabadiliko makubwa sana!`
            : `Used this framing in our departmental subject cluster meeting. Our learners showed impressive improvement in their formative tasks!`,
          timestamp: 'Yesterday',
          classroomSuccessRating: 5,
          upvotes: 38 + (result.length % 42),
          verifiedTeacher: true,
        },
      ],
    });

    templateIdx++;
  }

  return result;
}
