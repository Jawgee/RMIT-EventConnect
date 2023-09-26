const lists = {
    Profile: {
        tags: ['Entrepreneur', 'Corporate', 'Investor', 'Startup', 'Academy', 'Ecosystem Facilitator', 'Accelerator', 'Incubator', 'SME', 'Agency', 'NGO'],
        required: true
    },
    Sector: {
        tags: ["Pitch", "Metaverse", "Online", "Stand", "Round_table", "Tourism", "Tech", "Bio", "Health", "Sustainability", "Agro", "Fintech", "GreenTech", "Mobility", "Logistic", "Food", "Smart_cities", "Blue_economy", "Space"],
        required: true
    },
    Category: {
        tags: ["State of the art", "Round table", "Living test", "Stand", "Pitch", "Showroom"],
        required: true
    },
    Frequency: {
        tags: ["Unique", "Monthly", "Yearly"],
        required: true,
    },
    Environment: {
        tags: ["Red carpet", "Informal", "Cocktail", "Party", "Prize"],
        required: true,
    },  
    Privacy: {
        tags: ["Private", "Public"],
        required: true,
    },
    Entrance: {
        tags: ["Free", "Paid"],
        required: true,
    },
    Accessibility: {
        tags: ["In-person", "Online", "Hybrid"],
        required: true,
    },  
    Motivation: {
        tags: ["Validation", "Investor", "Partner", "Scouting"],
        required : true,    
    },
};

module.exports = lists;
