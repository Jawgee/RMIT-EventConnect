const lists = {
    profile: {
        tags: ['entrepreneur', 'corporate', 'investor', 'startup', 'academy', 'ecosystem facilitator', 'accelerator', 'incubator', 'sme', 'agency', 'ngo'],
        required: true
    },
    sector: {
        tags: ["pitch", "metaverse", "online", "stand", "round_table", "tourism", "tech", "bio", "health", "sustainability", "agro", "fintech", "greenTech", "mobility", "logistic", "food", "smart_cities", "blue_economy", "space"],
        required: true
    },
    category: {
        tags: ["state of the art", "round table", "living test", "stand", "pitch", "showroom"],
        required: true
    },
    frequency: {
        tags: ["unique", "monthly", "yearly"],
        required: true,
    },
    environment: {
        tags: ["red carpet", "informal", "cocktail", "party", "prize"],
        required: true,
    },
    privacy: {
        tags: ["private", "public"],
        required: true,
    },
    entrance: {
        tags: ["free", "paid"],
        required: true,
    },
    accessibility: {
        tags: ["in-person", "online", "hybrid"],
        required: true,
    },
    motivation: {
        tags: ["validation", "investor", "partner", "scouting"],
        required: true,
    },
};

module.exports = lists;
