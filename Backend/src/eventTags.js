const lists = {
    profile: {
        tags: ['entrepreneur', 'corporate', 'investor', 'startup', 'academy', 'ecosystem facilitator', 'accelerator', 'incubator', 'sme', 'agency', 'ngo'],
        required: true
    },
    sector: {
        tags: ["triple_impact", "art_and_multimedia", "social_impact", "tourism", "biotech", "health", "sustainability", "agro_tech", "fintech", "green_tech", "mobility","clean_tech", "logistic", "food_tech", "smart_cities", "green_cities"],
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
