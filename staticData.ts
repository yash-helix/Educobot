
// CARD  CONTENTS
export const TITLES = ['Introduction to Coding', "Certificate in Python Programming", 'Certificate in Data Science'];
export const LICENSE_TYPES = ["Basic", "Intermediate", "Advanced"];
export const pricing = [
    {
        price: "INR 5,000/-",
        INR: "INR 5,000/-"
    },
    {
        price: "300 credits",
        caption: "1 credit = INR 25/-",
        INR: "INR 15,000/-"
    },
    {
        price: "470 credits",
        caption: "1 credit = INR 25/-",
        INR: "INR 20,000/-"
    }];

export const terms = [
    ["Choose to pay in installments", "Cancel within 14 days for full refund", "Access to the cource: 2 years"],
    ["Start with as low as 10 credits"],
    ["Start with as low as 10 credits"]
];

export const courceLength = [
    ["10 levels", "~70 lessons", "~108 hours of learning"],
    ["10 levels", "~120 lessons"],
    ["10 levels", "~20 lessons"]
];

export const syllabus = [
    ["Sequencing", "Variables", "Data types", "Arithmetic Operations", "Coordinate System", "Arrays", "Logical Operators", "Conditional statements", "Loops", "Events", "Logical Operations"],

    ["Python reserved words syntaxes", "Naming conventions", "Data type, conversions & comments", "String operations, basic functions", "If-else statements, While loop, for loop", "Arrays Lists tuples, sets, dictionaries", "OOPS Defining your own functions with parameters, classes & functions", "Inheretance, Super method", "Errors & exception handling", "Python applications: Tier 1, 2, 3 prgms", "File handling", "Advanced python functions", "Numpy. Matplottib & Pandas bootcamp", "Introduction to python turtle", "Learning to create patterns & shapes", "Setting up game environment & developing games"],

    ["Introduction to data science", "Mathematical & statistical skills", "Machine leaming & its algorithms", "Coding", "Statistical foundations for data science", "Data structures and algorithms", "Scientific computing", "Optimisation techniques", "Data visualisation", "Matrix computations", "Scholastic models", "Experimentation, evaluation & project deployment tools", "Predictive analytics & segmentation using clustering", "Applied mathematics & informatics", "Exploratory data analysis", "Business acumen & artificial intelligence"]
]
export const icons = ["/pricing/illustration_maintenance.svg", "/pricing/illustration_motivation.svg", "/pricing/illustration_seo.svg"];

export const _homePlans = [...Array(3)].map((_, index) => ({
    title: TITLES[index],
    LICENSE_TYPE: LICENSE_TYPES[index],
    pricing: pricing[index],
    terms: terms[index],
    courceLength: courceLength[index],
    syllabus: syllabus[index],
    commons: ['One end products', '12 months updates', '6 months of support'],
    options: [
        'JavaScript version',
        'TypeScript version',
        'Design Resources',
        'Commercial applications',
    ],
    icons: [icons[index]],
}));

const info = ["Choose to pay in 2 installments", "Cancel within 14 days for full refund", "3 year access(T & C apply)"];
export const indexcourceLength = [
    ["10 levels", "~70 lessons", "~108 hours of learning"],
    ["10 levels", "~120 lessons", "~108 hours of learning"],
    ["10 levels", "~20 lessons", "~108 hours of learning"]
];
export const _indexPlans = [...Array(3)].map((_, index) => ({
    title: TITLES[index],
    LICENSE_TYPE: LICENSE_TYPES[index],
    price: pricing[index].INR,
    terms: info,
    courceLength: indexcourceLength[index],
    syllabus: syllabus[index],
    commons: ['One end products', '12 months updates', '6 months of support'],
    options: [
        'JavaScript version',
        'TypeScript version',
        'Design Resources',
        'Commercial applications',
    ],
    icons: [icons[index]],

}));

// -------------------------------------------------------------------------------------------------


export const _pricingPlans = [
    {
        subscription: 'basic',
        //icon: <PlanFreeIcon />,
        price: 0,
        caption: 'forever',
        lists: [
            { text: '3 prototypes', isAvailable: true },
            { text: '3 boards', isAvailable: true },
            { text: 'Up to 5 team members', isAvailable: false },
            { text: 'Advanced security', isAvailable: false },
            { text: 'Permissions & workflows', isAvailable: false },
        ],
        labelAction: 'current plan',
    },
    {
        subscription: 'starter',
        //icon: <PlanStarterIcon />,
        price: 4.99,
        caption: 'saving $24 a year',
        lists: [
            { text: '3 prototypes', isAvailable: true },
            { text: '3 boards', isAvailable: true },
            { text: 'Up to 5 team members', isAvailable: true },
            { text: 'Advanced security', isAvailable: false },
            { text: 'Permissions & workflows', isAvailable: false },
        ],
        labelAction: 'choose starter',
    },
    {
        subscription: 'premium',
        //icon: <PlanPremiumIcon />,
        price: 9.99,
        caption: 'saving $124 a year',
        lists: [
            { text: '3 prototypes', isAvailable: true },
            { text: '3 boards', isAvailable: true },
            { text: 'Up to 5 team members', isAvailable: true },
            { text: 'Advanced security', isAvailable: true },
            { text: 'Permissions & workflows', isAvailable: true },
        ],
        labelAction: 'choose premium',
    },
];




//dashboard cards data
export const dashboardCardData = [
    {
        title: "Bunny & Carrot",
        tags: ["tag1", "tag2", "tag3"],
        desc: "Help bunny to eat the carrot and return home",
        ratings: 3.9,
        status: "done",
        img: "/imgs/rabbitImg.png"
    },
    {
        title: "Bunny & Carrot",
        tags: ["tag1", "tag2", "tag3"],
        desc: "Help bunny to eat the carrot and return home",
        ratings: 4,
        status: "done",
        img: "/imgs/rabbitImg.png"
    },
    {
        title: "Bunny & Carrot",
        tags: ["tag1", "tag2", "tag3"],
        desc: "Help bunny to eat the carrot and return home",
        status: "start",
        ratings: undefined,
        img: "/imgs/rabbitImg.png"
    },
    {
        title: "Bunny & Carrot",
        tags: ["tag1", "tag2", "tag3"],
        desc: "Help bunny to eat the carrot and return home",
        ratings: 0,
        status: "locked",
        img: "/imgs/rabbitImg.png"
    },
    {
        title: "Bunny & Carrot",
        tags: ["tag1", "tag2", "tag3"],
        desc: "Help bunny to eat the carrot and return home",
        ratings: undefined,
        status: "locked",
        img: "/imgs/rabbitImg.png"
    },
    {
        title: "Bunny & Carrot",
        tags: ["tag1", "tag2", "tag3"],
        desc: "Help bunny to eat the carrot and return home",
        ratings: undefined,
        status: "locked",
        img: "/imgs/rabbitImg.png"
    },
    {
        title: "Bunny & Carrot",
        tags: ["tag1", "tag2", "tag3"],
        desc: "Help bunny to eat the carrot and return home",
        ratings: undefined,
        status: "locked",
        img: "/imgs/rabbitImg.png"
    },
]
