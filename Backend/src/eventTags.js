const lists = {
    Profile: {
        tags: ['entrepreneur', 'corporate', 'investor', 'startup', 'academy', 'ecosystem facilitator', 'accelerator', 'incubator', 'sme', 'agency', 'ngo'],
        required: true
    },
    Sector: {
        tags: ["pitch", "metaverse", "online", "stand", "round_table", "tourism", "tech", "bio", "health", "sustainability", "agro", "fintech", "greenTech", "mobility", "logistic", "food", "smart_cities", "blue_economy", "space"],
        required: true
    },
    Category: {
        tags: ["state of the art", "round table", "living test", "stand", "pitch", "showroom"],
        required: true
    },
    Frequency: {
        tags: ["unique", "monthly", "yearly"],
        required: true,
    },
    Environment: {
        tags: ["red carpet", "informal", "cocktail", "party", "prize"],
        required: true,
    },
    Privacy: {
        tags: ["private", "public"],
        required: true,
    },
    Entrance: {
        tags: ["free", "paid"],
        required: true,
    },
    Accessibility: {
        tags: ["in-person", "online", "hybrid"],
        required: true,
    },
    Motivation: {
        tags: ["validation", "investor", "partner", "scouting"],
        required: true,
    },
};

module.exports = lists;
