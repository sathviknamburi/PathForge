/**
 * 🌱 Seed Data — All content for PathForge
 * 
 * Contains roadmaps, branch subjects, quiz questions, and achievement definitions.
 * Used by mock database AND can be used to seed MongoDB.
 */

// ═══════════════════════════════════════════
// 🏆 ACHIEVEMENT DEFINITIONS
// ═══════════════════════════════════════════
export const achievementDefinitions = [
  { badgeId: 'streak_7', title: '7 Day Streak 🔥', description: 'Maintained a 7-day learning streak', icon: '🔥' },
  { badgeId: 'streak_30', title: 'Monthly Warrior 🏆', description: 'Maintained a 30-day learning streak', icon: '🏆' },
  { badgeId: 'first_quiz', title: 'Quiz Starter 🧠', description: 'Completed your first quiz', icon: '🧠' },
  { badgeId: 'quiz_master', title: 'Quiz Master 💯', description: 'Scored 100% on any quiz', icon: '💯' },
  { badgeId: 'topics_10', title: 'Getting Started 🌱', description: 'Completed 10 topics', icon: '🌱' },
  { badgeId: 'topics_50', title: 'Knowledge Seeker 📖', description: 'Completed 50 topics', icon: '📖' },
  { badgeId: 'topics_100', title: '100 Topics Completed 🎯', description: 'Completed 100 topics', icon: '🎯' },
  { badgeId: 'roadmap_master', title: 'Roadmap Master 🗺️', description: 'Completed an entire roadmap', icon: '🗺️' },
  { badgeId: 'first_note', title: 'Note Taker ✏️', description: 'Created your first note', icon: '✏️' },
  { badgeId: 'night_owl', title: 'Night Owl 🦉', description: 'Studied after midnight', icon: '🦉' },
];

// ═══════════════════════════════════════════
// 🗺️ ROADMAP DATA
// ═══════════════════════════════════════════
export const roadmapData = [
  // ─── PROGRAMMING: C ───
  {
    _id: 'roadmap_c',
    title: 'C Programming',
    category: 'Programming',
    description: 'Master the fundamentals of C — the mother of all programming languages.',
    icon: '🔧',
    levels: [
      {
        title: 'Basics', order: 1,
        topics: [
          { title: 'Introduction to C', subtopics: ['History', 'Features', 'IDE Setup'], estimatedTime: '1 hour', state: 'unlocked',
            resources: { youtube: ['https://www.youtube.com/watch?v=KJgsSFOSQv0'], docs: ['https://devdocs.io/c/', 'https://www.w3schools.com/c/c_intro.php'], practice: ['https://www.hackerrank.com/domains/c'] } },
          { title: 'Variables & Data Types', subtopics: ['int', 'float', 'char', 'double'], estimatedTime: '2 hours', state: 'locked',
            resources: { youtube: ['https://www.youtube.com/watch?v=aIQk1O08zpg'], docs: ['https://en.cppreference.com/w/c/language/type', 'https://www.w3schools.com/c/c_variables.php'], practice: [] } },
          { title: 'Operators', subtopics: ['Arithmetic', 'Relational', 'Logical', 'Bitwise'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/c/c_operators.php'], practice: [] } },
          { title: 'Input & Output', subtopics: ['printf', 'scanf', 'Format Specifiers'], estimatedTime: '1 hour', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/c/c_user_input.php'], practice: [] } },
        ]
      },
      {
        title: 'Control Flow', order: 2,
        topics: [
          { title: 'If-Else Statements', subtopics: ['if', 'else if', 'else', 'nested if'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/c/c_conditions.php'], practice: [] } },
          { title: 'Switch Case', subtopics: ['switch', 'case', 'break', 'default'], estimatedTime: '1 hour', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/c/c_switch.php'], practice: [] } },
          { title: 'Loops', subtopics: ['for', 'while', 'do-while', 'nested loops'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/c/c_while_loop.php'], practice: [] } },
        ]
      },
      {
        title: 'Functions & Arrays', order: 3,
        topics: [
          { title: 'Functions', subtopics: ['Declaration', 'Call by Value', 'Call by Reference', 'Recursion'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/c/c_functions.php'], practice: [] } },
          { title: 'Arrays', subtopics: ['1D Arrays', '2D Arrays', 'String Arrays'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/c/c_arrays.php'], practice: [] } },
          { title: 'Pointers', subtopics: ['Basics', 'Pointer Arithmetic', 'Pointers & Arrays'], estimatedTime: '4 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/c/c_pointers.php'], practice: [] } },
        ]
      },
      {
        title: 'Advanced', order: 4,
        topics: [
          { title: 'Structures & Unions', subtopics: ['struct', 'union', 'typedef'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/c/c_structs.php'], practice: [] } },
          { title: 'File Handling', subtopics: ['fopen', 'fclose', 'fprintf', 'fscanf'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/c/c_files.php'], practice: [] } },
          { title: 'Dynamic Memory', subtopics: ['malloc', 'calloc', 'realloc', 'free'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/c/c_memory.php'], practice: [] } },
        ]
      }
    ]
  },

  // ─── PROGRAMMING: C++ ───
  {
    _id: 'roadmap_cpp',
    title: 'C++ Programming',
    category: 'Programming',
    description: 'Learn C++ from basics to OOP — the language of competitive programming.',
    icon: '⚡',
    levels: [
      {
        title: 'Basics', order: 1,
        topics: [
          { title: 'Introduction to C++', subtopics: ['History', 'Differences from C', 'Setup'], estimatedTime: '1 hour', state: 'unlocked', resources: { youtube: ['https://www.youtube.com/watch?v=ZzaPdXTrSb8'], docs: ['https://cplusplus.com/doc/tutorial/', 'https://www.w3schools.com/cpp/cpp_intro.asp'], practice: [] } },
          { title: 'Variables & I/O', subtopics: ['cin', 'cout', 'Data Types', 'Type Casting'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/cpp/cpp_user_input.asp'], practice: [] } },
          { title: 'Control Structures', subtopics: ['if-else', 'switch', 'loops', 'break/continue'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/cpp/cpp_conditions.asp'], practice: [] } },
        ]
      },
      {
        title: 'OOP Concepts', order: 2,
        topics: [
          { title: 'Classes & Objects', subtopics: ['Class', 'Object', 'Constructor', 'Destructor'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/cpp/cpp_oop.asp'], practice: [] } },
          { title: 'Inheritance', subtopics: ['Single', 'Multiple', 'Multilevel', 'Hybrid'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/cpp/cpp_inheritance.asp'], practice: [] } },
          { title: 'Polymorphism', subtopics: ['Function Overloading', 'Operator Overloading', 'Virtual Functions'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/cpp/cpp_polymorphism.asp'], practice: [] } },
          { title: 'Encapsulation & Abstraction', subtopics: ['Access Modifiers', 'Abstract Classes', 'Interfaces'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/cpp/cpp_encapsulation.asp'], practice: [] } },
        ]
      },
      {
        title: 'STL & Advanced', order: 3,
        topics: [
          { title: 'STL Containers', subtopics: ['vector', 'map', 'set', 'stack', 'queue'], estimatedTime: '4 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
          { title: 'STL Algorithms', subtopics: ['sort', 'find', 'binary_search', 'lower_bound'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
          { title: 'Templates', subtopics: ['Function Templates', 'Class Templates'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
        ]
      }
    ]
  },

  // ─── PROGRAMMING: Java ───
  {
    _id: 'roadmap_java',
    title: 'Java Programming',
    category: 'Programming',
    description: 'Java — write once, run anywhere. Essential for Android & enterprise development.',
    icon: '☕',
    levels: [
      {
        title: 'Fundamentals', order: 1,
        topics: [
          { title: 'Java Basics', subtopics: ['JDK Setup', 'Hello World', 'Data Types', 'Variables'], estimatedTime: '2 hours', state: 'unlocked', resources: { youtube: [], docs: ['https://docs.oracle.com/javase/tutorial/', 'https://www.w3schools.com/java/java_intro.asp'], practice: [] } },
          { title: 'Control Flow', subtopics: ['if-else', 'switch', 'for', 'while', 'do-while'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/java/java_conditions.asp'], practice: [] } },
          { title: 'Arrays & Strings', subtopics: ['1D Arrays', '2D Arrays', 'String Methods', 'StringBuilder'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/java/java_arrays.asp'], practice: [] } },
        ]
      },
      {
        title: 'OOP in Java', order: 2,
        topics: [
          { title: 'Classes & Objects', subtopics: ['Constructor', 'this keyword', 'static'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/java/java_oop.asp'], practice: [] } },
          { title: 'Inheritance & Interfaces', subtopics: ['extends', 'implements', 'super', 'abstract'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/java/java_inheritance.asp'], practice: [] } },
          { title: 'Exception Handling', subtopics: ['try-catch', 'throw', 'throws', 'finally'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/java/java_try_catch.asp'], practice: [] } },
        ]
      },
      {
        title: 'Advanced Java', order: 3,
        topics: [
          { title: 'Collections Framework', subtopics: ['ArrayList', 'HashMap', 'HashSet', 'Iterator'], estimatedTime: '4 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
          { title: 'File I/O', subtopics: ['FileReader', 'BufferedReader', 'FileWriter'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
          { title: 'Multithreading', subtopics: ['Thread class', 'Runnable', 'synchronized'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
        ]
      }
    ]
  },

  // ─── PROGRAMMING: Python ───
  {
    _id: 'roadmap_python',
    title: 'Python Programming',
    category: 'Programming',
    description: 'The most beginner-friendly language. Used in AI, Data Science, and Web Development.',
    icon: '🐍',
    levels: [
      {
        title: 'Basics', order: 1,
        topics: [
          { title: 'Python Setup & Syntax', subtopics: ['Installation', 'REPL', 'Indentation', 'Comments'], estimatedTime: '1 hour', state: 'unlocked', resources: { youtube: ['https://www.youtube.com/watch?v=_uQrJ0TkZlc'], docs: ['https://docs.python.org/3/tutorial/', 'https://www.w3schools.com/python/python_intro.asp'], practice: [] } },
          { title: 'Variables & Data Types', subtopics: ['int', 'float', 'str', 'bool', 'type()'], estimatedTime: '1 hour', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/python/python_variables.asp'], practice: [] } },
          { title: 'Operators & Control Flow', subtopics: ['if-elif-else', 'for', 'while', 'range()'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/python/python_conditions.asp'], practice: [] } },
        ]
      },
      {
        title: 'Data Structures', order: 2,
        topics: [
          { title: 'Lists & Tuples', subtopics: ['List Methods', 'Slicing', 'List Comprehension', 'Tuples'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/python/python_lists.asp'], practice: [] } },
          { title: 'Dictionaries & Sets', subtopics: ['dict methods', 'set operations', 'comprehensions'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/python/python_dictionaries.asp'], practice: [] } },
          { title: 'Functions', subtopics: ['def', 'args/kwargs', 'lambda', 'map/filter'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/python/python_functions.asp'], practice: [] } },
        ]
      },
      {
        title: 'Advanced', order: 3,
        topics: [
          { title: 'OOP in Python', subtopics: ['Classes', 'Inheritance', 'Magic Methods', 'Decorators'], estimatedTime: '4 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/python/python_classes.asp'], practice: [] } },
          { title: 'File Handling', subtopics: ['open', 'read', 'write', 'with statement', 'JSON'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/python/python_file_handling.asp'], practice: [] } },
          { title: 'Modules & Packages', subtopics: ['import', 'pip', 'virtual environments'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
        ]
      }
    ]
  },

  // ─── WEB DEV: HTML ───
  {
    _id: 'roadmap_html',
    title: 'HTML',
    category: 'Web Development',
    description: 'The backbone of every website. Learn to structure web content.',
    icon: '🌐',
    levels: [
      {
        title: 'Basics', order: 1,
        topics: [
          { title: 'HTML Introduction', subtopics: ['What is HTML', 'Browser rendering', 'Boilerplate'], estimatedTime: '1 hour', state: 'unlocked', resources: { youtube: [], docs: ['https://developer.mozilla.org/en-US/docs/Web/HTML', 'https://www.w3schools.com/html/html_intro.asp'], practice: [] } },
          { title: 'Tags & Elements', subtopics: ['Headings', 'Paragraphs', 'Links', 'Images', 'Lists'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/html/html_elements.asp'], practice: [] } },
          { title: 'Forms & Tables', subtopics: ['input', 'select', 'textarea', 'table', 'form'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/html/html_forms.asp'], practice: [] } },
          { title: 'Semantic HTML', subtopics: ['header', 'nav', 'main', 'section', 'footer', 'article'], estimatedTime: '1 hour', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/html/html5_semantic_elements.asp'], practice: [] } },
        ]
      }
    ]
  },

  // ─── WEB DEV: CSS ───
  {
    _id: 'roadmap_css',
    title: 'CSS',
    category: 'Web Development',
    description: 'Style your websites with modern CSS techniques.',
    icon: '🎨',
    levels: [
      {
        title: 'Fundamentals', order: 1,
        topics: [
          { title: 'CSS Basics', subtopics: ['Selectors', 'Properties', 'Values', 'Specificity'], estimatedTime: '2 hours', state: 'unlocked', resources: { youtube: [], docs: ['https://developer.mozilla.org/en-US/docs/Web/CSS', 'https://www.w3schools.com/css/css_intro.asp'], practice: [] } },
          { title: 'Box Model & Layout', subtopics: ['margin', 'padding', 'border', 'display', 'position'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/css/css_boxmodel.asp'], practice: [] } },
          { title: 'Flexbox', subtopics: ['flex-direction', 'justify-content', 'align-items', 'flex-wrap'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/css/css3_flexbox.asp'], practice: [] } },
          { title: 'CSS Grid', subtopics: ['grid-template', 'grid-area', 'gap', 'auto-fit'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/css/css_grid.asp'], practice: [] } },
          { title: 'Responsive Design', subtopics: ['Media Queries', 'Mobile-first', 'Viewport'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/css/css_rwd_intro.asp'], practice: [] } },
        ]
      }
    ]
  },

  // ─── WEB DEV: JavaScript ───
  {
    _id: 'roadmap_js',
    title: 'JavaScript',
    category: 'Web Development',
    description: 'The language of the web. Make your websites interactive and dynamic.',
    icon: '⚡',
    levels: [
      {
        title: 'Basics', order: 1,
        topics: [
          { title: 'JS Fundamentals', subtopics: ['Variables (let/const)', 'Data Types', 'Operators', 'Type Coercion'], estimatedTime: '2 hours', state: 'unlocked', resources: { youtube: [], docs: ['https://javascript.info/', 'https://www.w3schools.com/js/js_intro.asp'], practice: [] } },
          { title: 'Control Flow', subtopics: ['if-else', 'switch', 'for', 'while', 'ternary'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/js/js_comparisons.asp'], practice: [] } },
          { title: 'Functions', subtopics: ['Declaration', 'Expression', 'Arrow Functions', 'Callbacks'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/js/js_functions.asp'], practice: [] } },
        ]
      },
      {
        title: 'Intermediate', order: 2,
        topics: [
          { title: 'Arrays & Objects', subtopics: ['Array Methods', 'Destructuring', 'Spread/Rest', 'Object Methods'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/js/js_arrays.asp'], practice: [] } },
          { title: 'DOM Manipulation', subtopics: ['querySelector', 'addEventListener', 'createElement', 'classList'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/js/js_htmldom.asp'], practice: [] } },
          { title: 'Async JavaScript', subtopics: ['Promises', 'async/await', 'fetch API', 'Error Handling'], estimatedTime: '4 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/js/js_asynchronous.asp'], practice: [] } },
        ]
      },
      {
        title: 'Advanced', order: 3,
        topics: [
          { title: 'ES6+ Features', subtopics: ['Modules', 'Classes', 'Symbols', 'Iterators', 'Generators'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/js/js_es6.asp'], practice: [] } },
          { title: 'Closures & Scope', subtopics: ['Lexical Scope', 'Closures', 'Hoisting', 'this keyword'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
        ]
      }
    ]
  },

  // ─── WEB DEV: React ───
  {
    _id: 'roadmap_react',
    title: 'React.js',
    category: 'Web Development',
    description: 'Build modern UIs with the most popular frontend library.',
    icon: '⚛️',
    levels: [
      {
        title: 'Fundamentals', order: 1,
        topics: [
          { title: 'React Basics', subtopics: ['JSX', 'Components', 'Props', 'Virtual DOM'], estimatedTime: '3 hours', state: 'unlocked', resources: { youtube: [], docs: ['https://react.dev/learn', 'https://www.w3schools.com/react/react_intro.asp'], practice: [] } },
          { title: 'State & Events', subtopics: ['useState', 'Event Handling', 'Controlled Inputs', 'Lists & Keys'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/react/react_state.asp'], practice: [] } },
          { title: 'useEffect & Lifecycle', subtopics: ['Side Effects', 'Cleanup', 'Dependencies Array', 'Data Fetching'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/react/react_useeffect.asp'], practice: [] } },
        ]
      },
      {
        title: 'Intermediate', order: 2,
        topics: [
          { title: 'React Router', subtopics: ['Routes', 'Link', 'useNavigate', 'Dynamic Routes', 'Protected Routes'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
          { title: 'Context API', subtopics: ['createContext', 'Provider', 'useContext', 'Global State'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
          { title: 'Custom Hooks', subtopics: ['Creating Hooks', 'useFetch', 'useLocalStorage'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
        ]
      }
    ]
  },

  // ─── WEB DEV: Node.js ───
  {
    _id: 'roadmap_node',
    title: 'Node.js',
    category: 'Web Development',
    description: 'JavaScript on the server. Build APIs, CLI tools, and more.',
    icon: '🟢',
    levels: [
      {
        title: 'Basics', order: 1,
        topics: [
          { title: 'Node.js Introduction', subtopics: ['What is Node', 'Event Loop', 'npm', 'Package.json'], estimatedTime: '2 hours', state: 'unlocked', resources: { youtube: [], docs: ['https://nodejs.org/docs/latest/api/', 'https://www.w3schools.com/nodejs/nodejs_intro.asp'], practice: [] } },
          { title: 'Modules & File System', subtopics: ['require/import', 'fs module', 'path module', 'Custom Modules'], estimatedTime: '2 hours', state: 'locked', resources: { youtube: [], docs: ['https://www.w3schools.com/nodejs/nodejs_filesystem.asp'], practice: [] } },
          { title: 'Express.js', subtopics: ['Routing', 'Middleware', 'req/res', 'Error Handling'], estimatedTime: '4 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
          { title: 'REST APIs', subtopics: ['GET', 'POST', 'PUT', 'DELETE', 'Status Codes', 'JSON'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
        ]
      },
      {
        title: 'Advanced', order: 2,
        topics: [
          { title: 'Authentication', subtopics: ['JWT', 'bcrypt', 'Protected Routes', 'Middleware'], estimatedTime: '4 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
          { title: 'Database Integration', subtopics: ['Mongoose', 'CRUD', 'Schemas', 'Validation'], estimatedTime: '4 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
        ]
      }
    ]
  },

  // ─── WEB DEV: MongoDB ───
  {
    _id: 'roadmap_mongodb',
    title: 'MongoDB',
    category: 'Web Development',
    description: 'NoSQL database for modern applications.',
    icon: '🍃',
    levels: [
      {
        title: 'Fundamentals', order: 1,
        topics: [
          { title: 'MongoDB Basics', subtopics: ['NoSQL vs SQL', 'Documents', 'Collections', 'BSON'], estimatedTime: '2 hours', state: 'unlocked', resources: { youtube: [], docs: ['https://www.mongodb.com/docs/manual/', 'https://www.w3schools.com/mongodb/index.php'], practice: [] } },
          { title: 'CRUD Operations', subtopics: ['insertOne', 'find', 'updateOne', 'deleteOne', 'Filters'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
          { title: 'Mongoose ODM', subtopics: ['Schemas', 'Models', 'Validation', 'Middleware', 'Populate'], estimatedTime: '4 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
          { title: 'Aggregation & Indexes', subtopics: ['$match', '$group', '$sort', 'Indexes', 'Performance'], estimatedTime: '3 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
        ]
      }
    ]
  },

  // ─── CAREER: MERN Stack ───
  {
    _id: 'roadmap_mern',
    title: 'MERN Stack',
    category: 'Career Paths',
    description: 'Full-stack JavaScript development with MongoDB, Express, React, Node.',
    icon: '🚀',
    levels: [
      { title: 'Foundation', order: 1, topics: [
        { title: 'HTML & CSS', subtopics: ['Semantic HTML', 'Flexbox', 'Grid', 'Responsive Design'], estimatedTime: '8 hours', state: 'unlocked', resources: { youtube: [], docs: [], practice: [] } },
        { title: 'JavaScript Mastery', subtopics: ['ES6+', 'Async/Await', 'DOM', 'Closures'], estimatedTime: '12 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
      ]},
      { title: 'Frontend', order: 2, topics: [
        { title: 'React Development', subtopics: ['Components', 'Hooks', 'Router', 'State Management'], estimatedTime: '15 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
      ]},
      { title: 'Backend', order: 3, topics: [
        { title: 'Node & Express APIs', subtopics: ['REST APIs', 'Middleware', 'Authentication'], estimatedTime: '10 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
        { title: 'MongoDB & Mongoose', subtopics: ['Schemas', 'CRUD', 'Relations', 'Aggregation'], estimatedTime: '8 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
      ]},
      { title: 'Full Stack Project', order: 4, topics: [
        { title: 'Build a Complete App', subtopics: ['Planning', 'Frontend', 'Backend', 'Deployment'], estimatedTime: '20 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
      ]}
    ]
  },

  // ─── CAREER: AI/ML ───
  {
    _id: 'roadmap_aiml',
    title: 'AI / Machine Learning',
    category: 'Career Paths',
    description: 'Dive into artificial intelligence and machine learning from scratch.',
    icon: '🤖',
    levels: [
      { title: 'Prerequisites', order: 1, topics: [
        { title: 'Python for ML', subtopics: ['NumPy', 'Pandas', 'Matplotlib'], estimatedTime: '8 hours', state: 'unlocked', resources: { youtube: [], docs: [], practice: [] } },
        { title: 'Mathematics', subtopics: ['Linear Algebra', 'Probability', 'Statistics', 'Calculus'], estimatedTime: '10 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
      ]},
      { title: 'Machine Learning', order: 2, topics: [
        { title: 'Supervised Learning', subtopics: ['Regression', 'Classification', 'Decision Trees', 'SVM'], estimatedTime: '12 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
        { title: 'Unsupervised Learning', subtopics: ['Clustering', 'PCA', 'K-Means'], estimatedTime: '8 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
      ]},
      { title: 'Deep Learning', order: 3, topics: [
        { title: 'Neural Networks', subtopics: ['Perceptron', 'Backpropagation', 'TensorFlow', 'PyTorch'], estimatedTime: '15 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
      ]}
    ]
  },

  // ─── CAREER: Data Science ───
  {
    _id: 'roadmap_datascience',
    title: 'Data Science',
    category: 'Career Paths',
    description: 'Turn data into insights with statistics, visualization, and ML.',
    icon: '📊',
    levels: [
      { title: 'Foundation', order: 1, topics: [
        { title: 'Python & Libraries', subtopics: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn'], estimatedTime: '10 hours', state: 'unlocked', resources: { youtube: [], docs: [], practice: [] } },
        { title: 'Statistics', subtopics: ['Descriptive', 'Inferential', 'Hypothesis Testing'], estimatedTime: '8 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
      ]},
      { title: 'Data Analysis', order: 2, topics: [
        { title: 'Data Wrangling', subtopics: ['Cleaning', 'Transformation', 'Feature Engineering'], estimatedTime: '8 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
        { title: 'Data Visualization', subtopics: ['Charts', 'Dashboards', 'Storytelling'], estimatedTime: '6 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
      ]}
    ]
  },

  // ─── CAREER: Cyber Security ───
  {
    _id: 'roadmap_cybersecurity',
    title: 'Cyber Security',
    category: 'Career Paths',
    description: 'Protect systems and networks from digital attacks.',
    icon: '🔒',
    levels: [
      { title: 'Basics', order: 1, topics: [
        { title: 'Networking Fundamentals', subtopics: ['OSI Model', 'TCP/IP', 'DNS', 'HTTP/HTTPS'], estimatedTime: '8 hours', state: 'unlocked', resources: { youtube: [], docs: [], practice: [] } },
        { title: 'Linux Basics', subtopics: ['Terminal', 'File System', 'Permissions', 'Scripting'], estimatedTime: '6 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
      ]},
      { title: 'Security', order: 2, topics: [
        { title: 'Web Security', subtopics: ['XSS', 'SQL Injection', 'CSRF', 'OWASP Top 10'], estimatedTime: '10 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
        { title: 'Ethical Hacking', subtopics: ['Reconnaissance', 'Scanning', 'Exploitation', 'Reporting'], estimatedTime: '12 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
      ]}
    ]
  },

  // ─── CAREER: Cloud Computing ───
  {
    _id: 'roadmap_cloud',
    title: 'Cloud Computing',
    category: 'Career Paths',
    description: 'Master cloud platforms and deploy scalable applications.',
    icon: '☁️',
    levels: [
      { title: 'Fundamentals', order: 1, topics: [
        { title: 'Cloud Concepts', subtopics: ['IaaS', 'PaaS', 'SaaS', 'Public vs Private Cloud'], estimatedTime: '4 hours', state: 'unlocked', resources: { youtube: [], docs: [], practice: [] } },
        { title: 'AWS Basics', subtopics: ['EC2', 'S3', 'IAM', 'Lambda', 'RDS'], estimatedTime: '10 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
      ]},
      { title: 'DevOps', order: 2, topics: [
        { title: 'Docker', subtopics: ['Containers', 'Images', 'Dockerfile', 'Docker Compose'], estimatedTime: '8 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
        { title: 'CI/CD', subtopics: ['GitHub Actions', 'Jenkins', 'Deployment Pipelines'], estimatedTime: '6 hours', state: 'locked', resources: { youtube: [], docs: [], practice: [] } },
      ]}
    ]
  },
];


// ═══════════════════════════════════════════
// 📚 BRANCH-SPECIFIC SUBJECTS
// ═══════════════════════════════════════════
export const branchSubjects = [
  {
    _id: 'branch_cse',
    branch: 'CSE',
    subjects: [
      { title: 'DBMS', description: 'Database Management Systems', icon: '🗄️', topics: ['ER Model', 'Normalization', 'SQL', 'Transactions', 'Indexing'] },
      { title: 'OS', description: 'Operating Systems', icon: '🖥️', topics: ['Process Management', 'Memory Management', 'File Systems', 'Deadlocks', 'Scheduling'] },
      { title: 'CN', description: 'Computer Networks', icon: '🌐', topics: ['OSI Model', 'TCP/IP', 'Routing', 'DNS', 'HTTP', 'Sockets'] },
      { title: 'DSA', description: 'Data Structures & Algorithms', icon: '🧮', topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting', 'Dynamic Programming'] },
      { title: 'OOPS', description: 'Object-Oriented Programming', icon: '🧱', topics: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'] },
    ]
  },
  {
    _id: 'branch_aids',
    branch: 'AI & DS',
    subjects: [
      { title: 'Python', description: 'Python Programming', icon: '🐍', topics: ['Basics', 'Data Structures', 'OOP', 'Libraries', 'File Handling'] },
      { title: 'ML', description: 'Machine Learning', icon: '🤖', topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering'] },
      { title: 'Deep Learning', description: 'Deep Learning & Neural Networks', icon: '🧠', topics: ['Neural Networks', 'CNN', 'RNN', 'Transfer Learning', 'GANs'] },
      { title: 'Data Mining', description: 'Data Mining & Warehousing', icon: '⛏️', topics: ['Association Rules', 'Classification', 'Clustering', 'Data Warehousing'] },
    ]
  },
  {
    _id: 'branch_it',
    branch: 'IT',
    subjects: [
      { title: 'Web Technologies', description: 'Web Development', icon: '🌐', topics: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'] },
      { title: 'DBMS', description: 'Database Management', icon: '🗄️', topics: ['SQL', 'NoSQL', 'ER Model', 'Normalization'] },
      { title: 'Software Engineering', description: 'Software Development Lifecycle', icon: '⚙️', topics: ['SDLC', 'Agile', 'Testing', 'UML'] },
      { title: 'Information Security', description: 'Cyber Security Basics', icon: '🔒', topics: ['Cryptography', 'Network Security', 'Firewalls'] },
    ]
  },
  {
    _id: 'branch_ece',
    branch: 'ECE',
    subjects: [
      { title: 'Signals & Systems', description: 'Signal Processing', icon: '📡', topics: ['Fourier Transform', 'Laplace Transform', 'Z-Transform', 'Filters'] },
      { title: 'Digital Electronics', description: 'Logic Design', icon: '🔌', topics: ['Logic Gates', 'Flip-Flops', 'Counters', 'Registers'] },
      { title: 'Communication Systems', description: 'Analog & Digital Communication', icon: '📻', topics: ['AM', 'FM', 'PCM', 'Modulation'] },
      { title: 'Embedded Systems', description: 'Microcontrollers', icon: '🎛️', topics: ['Arduino', 'Raspberry Pi', 'GPIO', 'Interrupts'] },
    ]
  },
  {
    _id: 'branch_eee',
    branch: 'EEE',
    subjects: [
      { title: 'Circuit Theory', description: 'Electrical Circuits', icon: '⚡', topics: ['KVL', 'KCL', 'Thevenin', 'Norton', 'AC Circuits'] },
      { title: 'Power Systems', description: 'Electrical Power', icon: '🔋', topics: ['Generation', 'Transmission', 'Distribution', 'Protection'] },
      { title: 'Control Systems', description: 'Feedback & Control', icon: '🎛️', topics: ['Transfer Function', 'Bode Plot', 'Root Locus', 'PID'] },
    ]
  },
  {
    _id: 'branch_mech',
    branch: 'Mechanical',
    subjects: [
      { title: 'Thermodynamics', description: 'Heat & Energy', icon: '🌡️', topics: ['Laws of Thermodynamics', 'Carnot Cycle', 'Entropy'] },
      { title: 'Fluid Mechanics', description: 'Fluid Dynamics', icon: '💧', topics: ['Bernoulli', 'Viscosity', 'Turbulence', 'Pipe Flow'] },
      { title: 'Machine Design', description: 'Mechanical Design', icon: '⚙️', topics: ['Stress Analysis', 'Gears', 'Bearings', 'Shafts'] },
    ]
  },
  {
    _id: 'branch_civil',
    branch: 'Civil',
    subjects: [
      { title: 'Structural Analysis', description: 'Structural Engineering', icon: '🏗️', topics: ['Beams', 'Trusses', 'Frames', 'Deflection'] },
      { title: 'Geotechnical Engineering', description: 'Soil Mechanics', icon: '🏔️', topics: ['Soil Properties', 'Foundation', 'Retaining Walls'] },
      { title: 'Transportation Engineering', description: 'Roads & Traffic', icon: '🛣️', topics: ['Highway Design', 'Traffic Flow', 'Pavement'] },
    ]
  }
];


// ═══════════════════════════════════════════
// 🧠 QUIZ DATA
// ═══════════════════════════════════════════
export const quizData = [
  {
    _id: 'quiz_c_basics',
    roadmapId: 'roadmap_c',
    topicTitle: 'Introduction to C',
    questions: [
      { question: 'Who developed the C programming language?', options: ['James Gosling', 'Dennis Ritchie', 'Bjarne Stroustrup', 'Guido van Rossum'], correctAnswer: 1, explanation: 'Dennis Ritchie developed C at Bell Labs in 1972.' },
      { question: 'What is the file extension for C source code?', options: ['.cpp', '.java', '.c', '.py'], correctAnswer: 2, explanation: 'C source files use the .c extension.' },
      { question: 'Which function is the entry point of a C program?', options: ['start()', 'main()', 'init()', 'begin()'], correctAnswer: 1, explanation: 'main() is always the entry point of a C program.' },
      { question: 'C is a ______ level language.', options: ['High', 'Low', 'Middle', 'Assembly'], correctAnswer: 2, explanation: 'C is considered a middle-level language as it combines features of both high and low-level languages.' },
      { question: 'Which header file is needed for printf()?', options: ['<math.h>', '<string.h>', '<stdio.h>', '<stdlib.h>'], correctAnswer: 2, explanation: 'stdio.h (Standard Input Output) contains printf and scanf.' },
    ]
  },
  {
    _id: 'quiz_js_basics',
    roadmapId: 'roadmap_js',
    topicTitle: 'JS Fundamentals',
    questions: [
      { question: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'function', 'define'], correctAnswer: 1, explanation: 'let is block-scoped, while var is function-scoped.' },
      { question: 'What does typeof null return?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correctAnswer: 2, explanation: 'This is a famous JavaScript quirk — typeof null returns "object".' },
      { question: 'Which operator checks value AND type?', options: ['==', '===', '!=', '='], correctAnswer: 1, explanation: '=== is the strict equality operator checking both value and type.' },
      { question: 'What is NaN?', options: ['Not a Null', 'Not a Number', 'Null and None', 'New and Next'], correctAnswer: 1, explanation: 'NaN stands for "Not a Number" and results from invalid math operations.' },
      { question: 'How do you write a comment in JS?', options: ['# comment', '// comment', '<!-- comment -->', '% comment'], correctAnswer: 1, explanation: '// is for single-line comments, /* */ for multi-line in JavaScript.' },
    ]
  },
  {
    _id: 'quiz_react_basics',
    roadmapId: 'roadmap_react',
    topicTitle: 'React Basics',
    questions: [
      { question: 'What does JSX stand for?', options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript eXtras'], correctAnswer: 0, explanation: 'JSX stands for JavaScript XML — it lets you write HTML-like syntax in JS.' },
      { question: 'Which hook manages state in functional components?', options: ['useEffect', 'useRef', 'useState', 'useMemo'], correctAnswer: 2, explanation: 'useState is the primary hook for managing state in React functional components.' },
      { question: 'What is the Virtual DOM?', options: ['A new browser API', 'A lightweight copy of the real DOM', 'A CSS framework', 'A database'], correctAnswer: 1, explanation: 'The Virtual DOM is a JS representation of the real DOM that React uses for efficient updates.' },
      { question: 'How do you pass data from parent to child?', options: ['State', 'Context', 'Props', 'Refs'], correctAnswer: 2, explanation: 'Props (properties) are used to pass data from parent to child components.' },
      { question: 'What does useEffect do?', options: ['Manages state', 'Handles side effects', 'Renders JSX', 'Creates routes'], correctAnswer: 1, explanation: 'useEffect handles side effects like API calls, subscriptions, and DOM updates.' },
    ]
  },
  {
    _id: 'quiz_python_basics',
    roadmapId: 'roadmap_python',
    topicTitle: 'Python Setup & Syntax',
    questions: [
      { question: 'Python uses ______ for code blocks.', options: ['Curly braces', 'Parentheses', 'Indentation', 'Semicolons'], correctAnswer: 2, explanation: 'Python uses indentation (whitespace) to define code blocks instead of braces.' },
      { question: 'Which function prints output in Python?', options: ['console.log()', 'System.out.println()', 'print()', 'echo()'], correctAnswer: 2, explanation: 'print() is the built-in function for output in Python.' },
      { question: 'What is the Python REPL?', options: ['A web framework', 'An interactive interpreter', 'A package manager', 'A testing tool'], correctAnswer: 1, explanation: 'REPL stands for Read-Eval-Print-Loop — the interactive Python shell.' },
      { question: 'How do you write a single-line comment?', options: ['// comment', '/* comment */', '# comment', '-- comment'], correctAnswer: 2, explanation: 'Python uses # for single-line comments.' },
    ]
  },
  {
    _id: 'quiz_html_basics',
    roadmapId: 'roadmap_html',
    topicTitle: 'HTML Introduction',
    questions: [
      { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correctAnswer: 0, explanation: 'HTML = HyperText Markup Language, the standard for creating web pages.' },
      { question: 'Which tag is used for the largest heading?', options: ['<heading>', '<h6>', '<h1>', '<head>'], correctAnswer: 2, explanation: '<h1> is the largest heading, <h6> is the smallest.' },
      { question: 'What is the correct HTML element for inserting a line break?', options: ['<break>', '<lb>', '<br>', '<newline>'], correctAnswer: 2, explanation: '<br> is a self-closing tag that inserts a line break.' },
    ]
  },
];


// ═══════════════════════════════════════════
// HELPER: Generate mock-style ObjectIds
// ═══════════════════════════════════════════
export const generateId = () => {
  const hex = '0123456789abcdef';
  let id = '';
  for (let i = 0; i < 24; i++) id += hex[Math.floor(Math.random() * 16)];
  return id;
};
