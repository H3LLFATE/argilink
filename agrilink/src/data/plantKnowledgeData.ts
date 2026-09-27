import { IMAGE_PATHS } from '../config/imageMasterConfig';
import { PlantKnowledge } from '../types';

export const PLANT_KNOWLEDGE_LIBRARY: PlantKnowledge[] = [
  // 1. CHILI (Capsicum annuum)
  {
    id: 'chili',
    name: 'Chili Pepper',
    commonLocalName: 'Cili Kulai / Cabai',
    scientificName: 'Capsicum annuum',
    category: 'vegetables',
    categoryLabel: 'Solanaceous Vegetable',
    image: IMAGE_PATHS.chiliHealthy,
    typicalGrowingPeriod: '80 – 120 Days',
    packageSize: '2.4 MB',
    packageSizeBytes: 2450000,
    description: 'High-value tropical solanaceous crop widely cultivated across Malaysia for fresh markets and processing. Thrives in fertile, well-draining soils with steady warm sunshine and scheduled micro-fertigation.',
    growingConditions: {
      sunlight: 'Full Sun (6 – 8 hours direct daily sunlight)',
      temperature: '24°C – 32°C (Sensitive to prolonged temperatures below 18°C)',
      waterDemand: 'Moderate to High; steady soil moisture without waterlogging',
      spacing: '50 – 60 cm between plants, 90 cm between raised beds',
    },
    growingGuide: [
      {
        stepNumber: 1,
        title: 'Preparing the Land & Raised Beds',
        summary: 'Deep tillage and bed mounding to prevent water accumulation during tropical rains.',
        instructions: [
          'Plow and loosen soil to a depth of 25–30 cm to allow deep root penetration.',
          'Form raised planting beds (20–30 cm height, 90 cm width) with drainage furrows.',
          'Incorporate aged organic compost or well-rotted cattle manure (1–2 kg per square meter).',
          'Lay silver-black plastic mulch over beds to suppress weeds, retain moisture, and repel thrips with reflective light.',
        ],
        tips: 'Always punch planting holes 3–4 days before transplanting to let trapped soil heat dissipate.',
      },
      {
        stepNumber: 2,
        title: 'Seed & Seedling Selection',
        summary: 'Choose certified F1 hybrid seed stock free from seed-borne viral pathogens.',
        instructions: [
          'Select high-yielding varieties such as Kulai F1, Centil, or Semerah known for bacterial wilt tolerance.',
          'Germinate seeds in 104-cell seedling trays using pre-moistened peat moss.',
          'Maintain seedling nursery under 50% shading cloth for the first 14 days.',
        ],
        tips: 'Only transplant sturdy seedlings with 4–6 true leaves and thick stem collars (around 25–30 days after sowing).',
      },
      {
        stepNumber: 3,
        title: 'Transplanting to the Field',
        summary: 'Gentle root-ball transfer into prepared mulch planting holes.',
        instructions: [
          'Transplant in late afternoon or on overcast days to minimize foliar transpiration shock.',
          'Drench seedling plug with mild rooting bio-stimulant or mycorrhizal solution prior to transplanting.',
          'Firm soil gently around root collar without burying the stem too deep.',
        ],
        tips: 'Provide immediate light watering right after seedlings are set in place.',
      },
      {
        stepNumber: 4,
        title: 'Watering & Irrigation Schedule',
        summary: 'Balanced drip irrigation targeting the rootzone rather than overhead foliage.',
        instructions: [
          'Deliver 1.2 to 2.0 liters of water per mature plant per day, split into 3–4 micro-cycles.',
          'Increase volume during dry windy spells and hot midday periods.',
          'Ensure furrows drain completely within 30 minutes after heavy monsoon downpours.',
        ],
        tips: 'Avoid wetting leaves late in the evening to prevent spore germination of Anthracnose.',
      },
      {
        stepNumber: 5,
        title: 'Fertilization & Plant Nutrition',
        summary: 'Phased macro and micronutrient supply aligned with vegetative and reproductive flushes.',
        instructions: [
          'Early vegetative stage: Balanced NPK (15-15-15) or Fertigation Solution A&B at EC 1.5–1.8 mS/cm.',
          'Flowering stage: Increase phosphorus and boron to promote flower retention and prevent blossom drop.',
          'Fruiting flush: Elevate potassium (e.g., potassium nitrate 13-0-46) and calcium at EC 2.2–2.5 mS/cm.',
        ],
        tips: 'Foliar calcium sprays prevent blossom end rot during rapid pod expansion.',
      },
      {
        stepNumber: 6,
        title: 'Weed Management',
        summary: 'Maintain clean weed-free furrows to eliminate secondary viral insect reservoirs.',
        instructions: [
          'Plastic mulch eliminates weeds on bed tops.',
          'Manual hoeing or mowing of inter-bed furrows prevents weeds like goosegrass and morning glory.',
          'Never spray systemic non-selective herbicides near chili foliage.',
        ],
      },
      {
        stepNumber: 7,
        title: 'Canopy Pruning & Staking Support',
        summary: 'Remove lower suckers up to first "Y" junction and install sturdy trellising.',
        instructions: [
          'Prune all lateral shoots below the first main stem bifurcation (the Y fork) at week 3–4.',
          'Drive wooden or bamboo stakes every 3–4 plants and run supportive nylon twine along rows.',
          'Regularly remove older yellowing leaves from lower canopy to maximize air movement.',
        ],
        tips: 'Sanitize pruning shears with 70% alcohol between plant rows to stop virus transmission.',
      },
      {
        stepNumber: 8,
        title: 'Harvesting Practices',
        summary: 'Harvest firm glossy pods with intact green calyx stems.',
        instructions: [
          'First harvest starts roughly 75–85 days after transplanting, repeating every 4–6 days.',
          'Clip or snap stems cleanly without tearing the fruit branch.',
          'Pick red ripe fruit or mature dark-green fruit depending on target market requirements.',
        ],
        tips: 'Harvest early in the morning when pods are fully turgid and cool.',
      },
      {
        stepNumber: 9,
        title: 'Post-Harvest Handling & Storage',
        summary: 'Sort, grade, and pre-cool to preserve post-harvest shelf life.',
        instructions: [
          'Sort out diseased, sunburned, or cracked pods immediately.',
          'Store in ventilated plastic crates away from direct sunlight.',
          'Optimal holding temperature is 10°C–12°C with 85–90% relative humidity.',
        ],
      },
    ],
    watering: {
      requirements: 'Moderate to high steady moisture. Root zone must stay moist without soggy saturation.',
      recommendedFrequency: '2 to 4 micro-drip pulses daily, totaling 1.5–2.0 L per mature plant per day.',
      signsOfUnderWatering: [
        'Midday foliar wilting where leaf tips droop and curl downwards.',
        'Premature blossom and tiny fruitlet drop.',
        'Dull, non-glossy appearance on pod skin.',
      ],
      signsOfOverWatering: [
        'Lower leaves turn pale yellow and drop while still plump.',
        'Stagnant standing water in furrows; root rot (black, foul-smelling roots).',
        'Stunted chlorotic growth and severe leaf edema.',
      ],
      practicalTips: 'Drip fertigation lines should run under the mulch film for direct root-zone moisture delivery.',
    },
    soil: {
      suitableSoilConditions: 'Loose, friable sandy loam or alluvial clay-loam rich in decomposed organic matter.',
      drainageRequirements: 'Excellent internal drainage essential. Chili roots die quickly under 24 hours of waterlogging.',
      phRange: 'pH 5.8 – 6.8 (Liming with agricultural dolomite recommended if soil pH drops below 5.5).',
      soilPreparation: [
        'Broadcast agricultural lime (dolomite) 2 weeks before planting if soil is acidic.',
        'Incorporate 20 tonnes/ha of well-cured compost or bio-fertilizer during bed formation.',
        'Install deep perimeter discharge trenches around the field plot.',
      ],
      basicSoilManagement: [
        'Avoid continuous monoculture of solanaceous crops (chili, tomato, brinjal, tobacco) in the same soil.',
        'Practice crop rotation with legumes or sweet corn every 2 seasons to break soil-borne bacterial wilt cycles.',
      ],
    },
    nutrition: {
      generalRequirements: 'Balanced supply of Nitrogen (N) for canopy, Phosphorus (P) for root/bud establishment, and high Potassium (K) with Calcium (Ca) for pod firmness and hot capsaicin development.',
      timingGuidance: [
        'Basal (Day 0): Organic compost + NPK 12-12-17 + TE.',
        'Vegetative (Weeks 2–5): High nitrogen formulation to expand foliar leaf area.',
        'Flowering to Harvest (Week 6 onwards): High potassium (K) ratio 1:1:2 (N:P:K) plus foliar calcium-boron sprays.',
      ],
      deficiencies: [
        {
          nutrient: 'Nitrogen (N)',
          symptoms: 'Older lower leaves turn pale green to uniform yellow. Overall plant stunted and spindly.',
          treatment: 'Apply side-dressing of calcium nitrate or balanced soluble fertigation solution.',
        },
        {
          nutrient: 'Calcium (Ca)',
          symptoms: 'Sunken water-soaked necrotic brown patches at the blossom end tip of chili pods (Blossom End Rot). Youngest leaf margins cup downward.',
          treatment: 'Foliar spray with chelated calcium or calcium nitrate (20g / 10L) and regulate uniform irrigation.',
        },
        {
          nutrient: 'Magnesium (Mg)',
          symptoms: 'Interveinal chlorosis on older mature leaves (veins remain dark green while tissue between turns yellow).',
          treatment: 'Apply agricultural Epsom salts (magnesium sulfate) as a soil drench or foliar spray at 2g/L.',
        },
      ],
    },
    diseases: [
      {
        id: 'chili-anthracnose',
        name: 'Anthracnose Fruit & Foliar Rot',
        scientificPathogen: 'Colletotrichum capsici / gloeosporioides',
        whatItIs: 'A destructive fungal pathogen that attacks both chili foliage and ripening fruit pods, flourishing during warm humid monsoon seasons.',
        symptoms: [
          'Concentric circular sunken lesions with dark brown or black centers.',
          'Rings of tiny black acervuli (spore-bearing fruiting bodies) inside spots.',
          'Infected ripening peppers develop soft, leathery rotten depressions.',
        ],
        whatFarmerMayNotice: 'Dark target-like circular sunken spots on leaves and fruit pods after heavy rain and warm sunshine.',
        possibleCauses: [
          'High relative humidity (>80%) and temperatures between 26°C–32°C.',
          'Overhead sprinkler irrigation splashing fungal conidia from infected plants.',
          'Dense canopy with restricted ventilation.',
        ],
        prevention: [
          'Use certified disease-free seed stock.',
          'Prune lower 30 cm canopy suckers to optimize airflow and sunlight penetration.',
          'Use ground drip irrigation instead of overhead sprinklers.',
          'Apply preventive bio-copper fungicide (e.g. Nordox 75 WG) prior to heavy rainy periods.',
        ],
        management: [
          'Immediately harvest and bag infected fruit and diseased foliage; remove from the plot.',
          'Apply registered protective fungicides according to Malaysian Department of Agriculture (DOA) guidelines.',
          'Maintain clean weed-free borders.',
        ],
        whenToSeekMentor: 'If concentric lesions spread to more than 10% of fruiting branches within 48 hours or when chemical diagnosis is uncertain.',
        image: IMAGE_PATHS.chiliAnthracnose,
      },
      {
        id: 'chili-bacterial-wilt',
        name: 'Bacterial Wilt',
        scientificPathogen: 'Ralstonia solanacearum',
        whatItIs: 'A lethal soil-borne vascular bacterium that clogs water-conducting xylem vessels, causing rapid collapse of healthy green plants.',
        symptoms: [
          'Sudden wilting of the entire plant while foliage remains green (no initial yellowing).',
          'Vascular browning inside stem when cut lengthwise near soil line.',
          'Milky bacterial ooze streams out when cut stem is suspended in clear water.',
        ],
        whatFarmerMayNotice: 'A healthy looking green chili bush wilts completely within 24 to 48 hours and never recovers.',
        possibleCauses: [
          'Soil-borne Ralstonia bacteria entering through root wounds caused by nematodes, weeding, or transplanting.',
          'Warm soil temperatures (>30°C) with waterlogged soil pockets.',
        ],
        prevention: [
          'Plant on raised beds with impeccable furrow drainage.',
          'Rotate with non-solanaceous crops such as sweet corn, paddy, or mucuna cover crops for 2+ seasons.',
          'Graft onto resistant rootstocks (e.g., wild brinjal Solanum torvum).',
        ],
        management: [
          'Uproot and burn wilted plants immediately with surrounding root ball soil.',
          'Drench the infected hole with agricultural hydrated lime to prevent lateral spread.',
          'Avoid moving machinery or boots from infected plots to clean blocks.',
        ],
        whenToSeekMentor: 'Whenever multiple bushes collapse simultaneously to perform a stem vascular stream test.',
      },
      {
        id: 'chili-leaf-curl-virus',
        name: 'Chili Leaf Curl Disease',
        scientificPathogen: 'Begomovirus (vectored by Bemisia tabaci whiteflies)',
        whatItIs: 'A systemic plant virus transmitted by whiteflies that severely distorts new shoot growth and halts flowering.',
        symptoms: [
          'Upward curling and puckering of leaf margins.',
          'Thickening and vein enation on leaf undersides.',
          'Severe stunting of terminal growing points; bush appears bunched like a witches broom.',
        ],
        whatFarmerMayNotice: 'Young leaves curl tightly upward, turn leathery and brittle, and flower buds drop completely.',
        possibleCauses: [
          'Presence of silverleaf whiteflies (Bemisia tabaci) feeding on young foliar tissue.',
          'Dry, warm weather fostering explosive whitefly reproduction.',
        ],
        prevention: [
          'Install yellow sticky traps (20–30 traps per acre) to monitor and catch whitefly vectors.',
          'Erect 40-mesh insect netting around nursery tunnels.',
          'Intercrop with companion barrier crops such as sweet corn or marigold.',
        ],
        management: [
          'Rogue out and destroy infected viral plants immediately before vectors spread the virus.',
          'Apply organic neem oil extract or bio-insecticide to suppress whitefly nymphs on leaf undersides.',
        ],
        whenToSeekMentor: 'To distinguish between broad mite feeding damage and viral begomovirus symptoms.',
        image: IMAGE_PATHS.chiliCurled,
      },
    ],
    pests: [
      {
        id: 'pest-chili-mites',
        name: 'Broad Mites & Yellow Mites',
        scientificName: 'Polyphagotarsonemus latus',
        symptoms: [
          'Leaves curl downward at margins into inverted spoon or boat shapes.',
          'Terminal shoots turn bronzed, leathery, and brittle.',
          'Flower bud abortion.',
        ],
        damageSigns: 'Microscopic mites feed on sap from cell layers of young leaf buds, releasing toxic saliva.',
        prevention: [
          'Regularly inspect undersides of terminal leaves with 15x hand loupe.',
          'Avoid excessive synthetic pyrethroids that destroy predatory phytoseiid mites.',
        ],
        management: [
          'Spray wettable sulfur or bio-acaricides during cool morning hours.',
          'Introduce or conserve beneficial predatory mites.',
        ],
        whenToSeekMentor: 'When downward foliar curl persists despite pest spraying.',
      },
      {
        id: 'pest-fruit-borer',
        name: 'Chili Fruit Borer / Cotton Bollworm',
        scientificName: 'Helicoverpa armigera',
        symptoms: [
          'Circular bore holes on fruit pods with dark caterpillar frass pellets.',
          'Premature pod coloring and secondary bacterial soft rot.',
        ],
        damageSigns: 'Caterpillars bore into ripening pods and feed on interior seeds and placenta.',
        prevention: [
          'Install light traps or pheromone delta traps to catch adult moths.',
          'Hand-pick young caterpillars during early morning scouting.',
        ],
        management: [
          'Apply Bacillus thuringiensis (Bt) bio-spray when caterpillars are small (<5 mm).',
        ],
        whenToSeekMentor: 'If fruit damage exceeds 5% of commercial harvest yield.',
      },
    ],
  },

  // 2. PADDY RICE (Oryza sativa)
  {
    id: 'rice',
    name: 'Paddy Rice',
    commonLocalName: 'Padi Sawah / MR297',
    scientificName: 'Oryza sativa',
    category: 'grains',
    categoryLabel: 'Staple Cereal Grain',
    image: IMAGE_PATHS.riceBlast,
    typicalGrowingPeriod: '105 – 125 Days',
    packageSize: '2.8 MB',
    packageSizeBytes: 2850000,
    description: 'The foundation of Malaysian food security, cultivated primarily in the granary plains of Kedah, Perlis, Sekinchan, and Kelantan. Modern management emphasizes water-saving Alternate Wetting & Drying (AWD) and balanced nutrient input.',
    growingConditions: {
      sunlight: 'Full direct tropical sunshine (minimum 6 hours daily for tillering and grain filling)',
      temperature: '25°C – 34°C (Night temperature >20°C ensures optimal grain set)',
      waterDemand: 'High water requirement; managed shallow inundation (3–5 cm) during critical stages',
      spacing: 'Direct seeded or mechanical transplanted at 20 cm x 20 cm hill grid',
    },
    growingGuide: [
      {
        stepNumber: 1,
        title: 'Land Leveling & Puddling',
        summary: 'Thorough rototilling, water soaking, and laser leveling of paddy parcels.',
        instructions: [
          'Flood parcel with 5–10 cm water 2 weeks prior to plowing to soften hardpan and rot stubble.',
          'Puddle soil with rotary tiller to create an impermeable plow-sole layer that retains water.',
          'Perform fine leveling to ensure uniform 3 cm water distribution and prevent weed patches on high spots.',
        ],
        tips: 'A level field cuts water consumption by 30% and ensures uniform herbicide efficacy.',
      },
      {
        stepNumber: 2,
        title: 'Seed Soaking & Incubation',
        summary: 'Pre-germinate high-purity certified seed (e.g. MR297 or MR269).',
        instructions: [
          'Soak seeds in clean running water for 24 hours to initiate enzymatic imbibition.',
          'Incubate moist seeds in breathable jute bags under shade for 24–36 hours until white radicles emerge (1–2 mm).',
        ],
      },
      {
        stepNumber: 3,
        title: 'Direct Seeding or Transplanting',
        summary: 'Uniform distribution by drone broadcast, motorized blower, or walk-behind transplanter.',
        instructions: [
          'Drain field to soft muddy mud (saturated, no standing water) prior to direct wet seeding.',
          'Broadcast 100–120 kg/ha of pre-germinated seed uniformly across parcel.',
          'Maintain saturated soil for 5–7 days until roots anchor firmly into mud.',
        ],
      },
      {
        stepNumber: 4,
        title: 'Water Management (AWD)',
        summary: 'Practice Alternate Wetting and Drying to strengthen root systems and save canal water.',
        instructions: [
          'After seedling establishment (Day 10), introduce shallow 3–5 cm water layer.',
          'Allow water to naturally recede to 10 cm below soil surface (monitored via perforated field tube) before reflooding.',
          'Keep continuous 5 cm water layer from panicle initiation through flowering (Days 55–85).',
        ],
        tips: 'Drain field completely 10–12 days before anticipated combine harvester date.',
      },
      {
        stepNumber: 5,
        title: 'Nutrient & Fertilizer Split',
        summary: 'Precise 3-split nitrogen, phosphorus, and potassium strategy based on leaf color chart (LCC).',
        instructions: [
          'Basal (Day 12–15): Complete NPK + Trace minerals.',
          'Active Tillering (Day 30–35): Urea top-dressing according to Leaf Color Chart reading.',
          'Panicle Initiation (Day 50–55): Potassium-rich fertilizer (e.g., Muriate of Potash) for grain weight.',
        ],
      },
      {
        stepNumber: 6,
        title: 'Weed Control in Early Sward',
        summary: 'Target grassy weeds (Echinochloa) and sedges early before canopy closure.',
        instructions: [
          'Apply pre-emergence or early post-emergence herbicide at Days 6–10.',
          'Introduce shallow water layer promptly after herbicide application to prevent secondary weed flushes.',
        ],
      },
      {
        stepNumber: 7,
        title: 'Panicle & Heading Inspection',
        summary: 'Protect emerging flag leaves and flowering panicles from stem borers and neck blast.',
        instructions: [
          'Scout for whitehead symptoms caused by stem borer larvae.',
          'Avoid applying excessive nitrogen after panicle initiation which makes leaves succulent and prone to blast.',
        ],
      },
      {
        stepNumber: 8,
        title: 'Harvest Timing',
        summary: 'Combine harvest when 85–90% of panicle grains turn golden yellow.',
        instructions: [
          'Harvest when grain moisture is between 20–24%.',
          'Coordinate canal sluice closure and combine contractor 10 days in advance.',
        ],
      },
      {
        stepNumber: 9,
        title: 'Post-Harvest Drying & Delivery',
        summary: 'Immediate delivery to BERNAS or registered rice mills within 24 hours.',
        instructions: [
          'Weigh and deliver fresh paddy immediately to prevent microbial fermentation and discoloration.',
          'Dry to 13–14% moisture content for safe long-term granary storage.',
        ],
      },
    ],
    watering: {
      requirements: 'High water requirement throughout vegetative and reproductive stages; managed drainage pre-harvest.',
      recommendedFrequency: 'Controlled sluice gate canal intake keeping 3–5 cm shallow depth; AWD cycle between tillering.',
      signsOfUnderWatering: [
        'Soil cracks develop in parcel; tillering stops prematurely.',
        'Leaf blade margins roll inward longitudinally during morning hours.',
        'High rate of empty, chaffy grains (spikelet sterility) during flowering.',
      ],
      signsOfOverWatering: [
        'Prolonged deep water (>10 cm) suppresses tiller count and weakens stem lodging resistance.',
        'Anaerobic root sulfide toxicity (blackened roots smelling of rotten eggs).',
      ],
      practicalTips: 'Install an inexpensive perforated PVC field water tube (pani pipe) to monitor below-ground water table.',
    },
    soil: {
      suitableSoilConditions: 'Heavy clay or silty clay soils with high water retention capacity and stable plow pan layer.',
      drainageRequirements: 'Good external drainage gates needed for timely pre-harvest field drying and machine traction.',
      phRange: 'pH 5.5 – 6.5 (Neutral to slightly acidic).',
      soilPreparation: [
        'Incorporate rice straw stubble back into soil at least 3 weeks before plowing to allow aerobic breakdown.',
        'Apply ground agricultural limestone or compost if soil test shows extreme acidity.',
      ],
      basicSoilManagement: [
        'Maintain the hardpan plow sole (20 cm depth) by avoiding overly heavy non-tracked tractors on wet fields.',
      ],
    },
    nutrition: {
      generalRequirements: 'High demand for Nitrogen during tillering, steady Phosphorus for root development, and substantial Potassium and Silica for sturdy lodging-resistant straw.',
      timingGuidance: [
        'Split 1 (Day 15): 30% of total N + 100% P2O5.',
        'Split 2 (Day 35): 40% of total N + 50% K2O.',
        'Split 3 (Day 55 - Panicle Initiation): 30% of total N + 50% K2O.',
      ],
      deficiencies: [
        {
          nutrient: 'Nitrogen (N)',
          symptoms: 'Older leaves turn yellow starting at tips; low tiller count; short erect leaves.',
          treatment: 'Top-dress with urea (46% N) guided by Leaf Color Chart (LCC) index.',
        },
        {
          nutrient: 'Potassium (K)',
          symptoms: 'Dark green plants with yellowish-brown leaf tips; rusty brown necrotic speckles on older leaves; lodging.',
          treatment: 'Apply Muriate of Potash (MOP 0-0-60) at panicle initiation.',
        },
        {
          nutrient: 'Silica (Si)',
          symptoms: 'Soft, floppy leaf blades susceptible to blast lesions and insect chewing damage; severe stem lodging.',
          treatment: 'Apply rice husk ash, silicate slag, or soluble potassium silicate foliar sprays.',
        },
      ],
    },
    diseases: [
      {
        id: 'rice-blast',
        name: 'Rice Leaf & Neck Blast',
        scientificPathogen: 'Magnaporthe oryzae (Pyricularia oryzae)',
        whatItIs: 'A devastating fungal disease attacking rice leaves, nodes, and panicle necks under humid conditions and excessive nitrogen fertilization.',
        symptoms: [
          'Spindle-shaped or diamond-shaped lesions with grayish-white centers and reddish-brown borders.',
          'Spots enlarge and coalesce, causing entire tillering leaves to desiccate and die.',
          'Neck blast: Black necrotic ring around the panicle stem base causing white, unfilled empty heads.',
        ],
        whatFarmerMayNotice: 'Diamond-shaped spots with gray centers along tillering blades, followed by drooping empty white panicles.',
        possibleCauses: [
          'Excessive urea / nitrogen application causing succulent, soft cell walls.',
          'Extended periods of dew, high humidity (>90%), and foggy morning temperatures (25°C–28°C).',
        ],
        prevention: [
          'Avoid excessive nitrogen rates; apply potassium to harden stem epidermis.',
          'Practice Alternate Wetting and Drying (AWD) to aerate root beds.',
          'Use resistant varieties approved by MARDI (e.g. MR297).',
        ],
        management: [
          'Apply registered protective bio-fungicide or systemic blast treatments at early spotting or 5% heading.',
          'Drain field for 3–5 days to interrupt fungal sporulation.',
        ],
        whenToSeekMentor: 'When blast spots spread across more than 20% of canopy during tillering or at first sign of panicle neck discoloration.',
        image: IMAGE_PATHS.riceBlast,
      },
      {
        id: 'rice-bacterial-leaf-blight',
        name: 'Bacterial Leaf Blight (BLB)',
        scientificPathogen: 'Xanthomonas oryzae pv. oryzae',
        whatItIs: 'A systemic vascular bacterial disease causing water-soaked wavy lesions running along leaf margins from tip downward.',
        symptoms: [
          'Wavy, water-soaked translucent stripes along leaf margins turning yellow then bleach-white.',
          'Bacterial milky dew droplets visible on young leaf lesions in early morning.',
        ],
        whatFarmerMayNotice: 'Leaf edges look scalded or scorched yellow-white, progressing down from the blade tip.',
        possibleCauses: [
          'Rainstorms with strong winds creating micro-abrasions that allow bacteria to enter.',
          'Deep stagnant water in paddy parcels.',
        ],
        prevention: [
          'Plant resistant cultivars; maintain balanced NPK ratios.',
          'Ensure drainage channels prevent cross-field flooding from infected parcels.',
        ],
        management: [
          'Drain flood water temporarily to lower humidity within canopy.',
          'Avoid applying top-dress urea while blight is actively spreading.',
        ],
        whenToSeekMentor: 'When leaf blight advances rapidly after monsoon thunderstorms.',
      },
    ],
    pests: [
      {
        id: 'pest-brown-planthopper',
        name: 'Brown Planthopper (BPH)',
        scientificName: 'Nilaparvata lugens',
        symptoms: [
          'Circular patches of paddy plants turn yellow, dry out, and turn brown ("hopperburn").',
          'Large colonies of small brown sap-sucking nymphs and adults clustered at the base of rice stems.',
        ],
        damageSigns: 'Insects suck plant sap from tillers and transmit grassy stunt and ragged stunt viruses.',
        prevention: [
          'Conserve natural predators such as wolf spiders (Lycosa), mirid bugs, and water striders.',
          'Avoid prophylactic broad-spectrum insecticide sprays that kill beneficial spiders.',
        ],
        management: [
          'Drain parcel water for 3–4 days to expose hopper clusters to predators.',
          'Apply targeted selective insect growth regulators (IGR) if hopper counts exceed economic threshold (10–15 hoppers/hill).',
        ],
        whenToSeekMentor: 'At first detection of localized circular yellowing hopperburn patches.',
      },
    ],
  },

  // 3. TOMATO (Solanum lycopersicum)
  {
    id: 'tomato',
    name: 'Tomato',
    commonLocalName: 'Tomato Sayur / Tomato Cameron',
    scientificName: 'Solanum lycopersicum',
    category: 'vegetables',
    categoryLabel: 'Solanaceous Fruit Vegetable',
    image: IMAGE_PATHS.plantTomato,
    typicalGrowingPeriod: '90 – 110 Days',
    packageSize: '3.1 MB',
    packageSizeBytes: 3100000,
    description: 'Popular culinary vegetable cultivated in highland rain-shelters (Cameron Highlands, Lojing) and lowland climate-controlled greenhouses across Malaysia. Highly sensitive to foliar blights and calcium deficiency.',
    growingConditions: {
      sunlight: 'Full Sun (6 – 8 hours bright light daily; transparent UV roof in rain shelters)',
      temperature: '18°C – 26°C (High daytime temperatures above 33°C cause flower pollen sterility)',
      waterDemand: 'Steady, uniform rootzone moisture; strictly avoids wetting foliar canopy',
      spacing: '45 – 50 cm between plants, 100 cm between row trellises',
    },
    growingGuide: [
      {
        stepNumber: 1,
        title: 'Rain Shelter & Bed Preparation',
        summary: 'Highland or lowland rain shelter with cocopeat grow bags or raised organic beds.',
        instructions: [
          'Under tropical Malaysian conditions, rain shelters or net-houses prevent rain-splash fungal blights.',
          'Use 100% aged cocopeat substrate in 16x16 polybags or prepare well-aerated raised mounds.',
        ],
      },
      {
        stepNumber: 2,
        title: 'Seedling Raising & Grafting',
        summary: 'Certified hybrid seeds germinated in sterile plug trays.',
        instructions: [
          'Select vigorous hybrids such as Red Ruby or Platinum.',
          'Transplant strong 21-day seedlings with established white root systems.',
        ],
      },
      {
        stepNumber: 3,
        title: 'Transplanting & Drip Setup',
        summary: 'Position seedling plugs and insert 2L/h drip button emitters.',
        instructions: [
          'Set polybags or plants 45 cm apart in double rows.',
          'Insert drip needle emitter directly beside root plug.',
        ],
      },
      {
        stepNumber: 4,
        title: 'Watering & EC Management',
        summary: 'Deliver timed nutrient fertigation pulses matched to solar radiation.',
        instructions: [
          'Deliver 1.5 to 2.5 L per plant daily in 6–8 small pulses between 8:00 AM and 4:30 PM.',
          'Maintain 15–20% runoff drainage to prevent salt accumulation in the rootzone.',
        ],
      },
      {
        stepNumber: 5,
        title: 'Fertigation Nutrition Formulation',
        summary: 'Adjust Cooper formulation targeting high potassium and calcium during fruit swell.',
        instructions: [
          'Vegetative EC: 1.6–1.8 mS/cm.',
          'Flowering and fruit truss expansion EC: 2.2–2.5 mS/cm, pH 5.8–6.2.',
        ],
      },
      {
        stepNumber: 6,
        title: 'Weed & Mulch Barrier',
        summary: 'Geotextile weed mats cover the entire floor in modern greenhouse setups.',
        instructions: [
          'Install woven polypropylene ground cover to eliminate weeds and maintain hygienic paths.',
        ],
      },
      {
        stepNumber: 7,
        title: 'Single-Stem Trellising & De-suckering',
        summary: 'Prune all side axillary suckers to maintain a single productive vertical vine.',
        instructions: [
          'Support main stem with overhead vertical string and tomato clips, winding clockwise weekly.',
          'Snap off all side suckers (axillary shoots) when they reach 3–5 cm.',
          'De-leaf lower canopy below harvesting trusses to optimize airflow.',
        ],
      },
      {
        stepNumber: 8,
        title: 'Harvesting at Breaker Stage',
        summary: 'Harvest when fruit starts turning pink or orange for commercial transport durability.',
        instructions: [
          'Harvest fruit with green calyx intact using clean scissors.',
          'Sort into standard grading crates (Grade A, B, C).',
        ],
      },
      {
        stepNumber: 9,
        title: 'Post-Harvest Sorting & Pre-cooling',
        summary: 'Hold at 12°C–15°C to allow uniform ripening without losing firmness.',
        instructions: [
          'Do not store unripe tomatoes below 10°C as chilling injury prevents normal red color development.',
        ],
      },
    ],
    watering: {
      requirements: 'Strictly consistent soil moisture. Fluctuating wet-and-dry cycles cause fruit cracking and blossom end rot.',
      recommendedFrequency: 'Timed micro-drip pulses (5 to 8 times daily during daylight hours).',
      signsOfUnderWatering: [
        'Wilting foliage, leaf margins rolling upwards.',
        'Small, dull-colored fruit; premature flower drop.',
      ],
      signsOfOverWatering: [
        'Sudden radial fruit skin cracking and split skins.',
        'Root suffocation and sudden bacterial wilt.',
      ],
      practicalTips: 'Never water late in the evening. Last drip pulse should occur 2 hours before sunset.',
    },
    soil: {
      suitableSoilConditions: 'Cocopeat substrate slabs or light, loose sandy-loam with high cation exchange capacity.',
      drainageRequirements: 'Fast free drainage with zero standing water.',
      phRange: 'pH 5.8 – 6.5.',
      soilPreparation: [
        'Wash raw cocopeat with calcium nitrate buffer solution to displace excess sodium and potassium salts.',
      ],
      basicSoilManagement: [
        'Check runoff EC and pH daily to ensure rootzone salt levels remain optimal.',
      ],
    },
    nutrition: {
      generalRequirements: 'High demand for Potassium (K) for sugar brix and fruit density, Calcium (Ca) for skin elasticity, and balanced Nitrogen.',
      timingGuidance: [
        'Seedling stage: Balanced N:P:K 1:1:1.',
        'Truss flowering: Increase K and ensure continuous calcium nitrate feed.',
      ],
      deficiencies: [
        {
          nutrient: 'Calcium (Ca)',
          symptoms: 'Blossom End Rot (BER) — Dark, leathery, sunken flat spot at the bottom end of developing green fruit.',
          treatment: 'Balance irrigation uniformity and increase calcium ratio in fertigation.',
        },
        {
          nutrient: 'Magnesium (Mg)',
          symptoms: 'Vivid yellowing between leaf veins on middle and lower leaves, margins remain green.',
          treatment: 'Foliar spray with magnesium sulfate (Epsom salt) at 2g/L.',
        },
      ],
    },
    diseases: [
      {
        id: 'tomato-early-blight',
        name: 'Early Blight (Target Spot)',
        scientificPathogen: 'Alternaria solani',
        whatItIs: 'A common fungal leaf and fruit disease characterized by concentric target-like rings on older leaves.',
        symptoms: [
          'Circular brown-black spots with concentric rings resembling a target board.',
          'Spots surrounded by prominent chlorotic yellow halos.',
          'Lower leaves turn yellow, wither, and drop prematurely.',
        ],
        whatFarmerMayNotice: 'Bullseye target rings on lower mature leaves that cause progressive defoliation upward.',
        possibleCauses: [
          'High humidity combined with warm temperatures (24°C–29°C).',
          'Water splashing soil or spores onto bottom foliage.',
        ],
        prevention: [
          'Prune off all lower foliage touching soil or mulch (at least 30 cm clearance).',
          'Use rain shelters to keep foliage completely dry.',
          'Apply preventive bio-fungicide or copper hydroxide spray early in season.',
        ],
        management: [
          'Carefully prune out infected leaves and dispose of in sealed bags.',
          'Apply certified protective fungicides following Malaysian DOA guidelines.',
        ],
        whenToSeekMentor: 'If defoliation reaches the middle fruiting truss.',
      },
      {
        id: 'tomato-late-blight',
        name: 'Late Blight',
        scientificPathogen: 'Phytophthora infestans',
        whatItIs: 'A catastrophic water-mold disease that destroys foliage and green fruit rapidly under cool, wet highland weather.',
        symptoms: [
          'Large, irregular water-soaked greasy brown lesions on leaves and stems.',
          'White downy fungal growth visible on lesion undersides during humid mornings.',
          'Green tomatoes develop greasy, firm, mottled brown rot.',
        ],
        whatFarmerMayNotice: 'Plants look like they were scalded by boiling water; rapid canopy collapse within days.',
        possibleCauses: [
          'Cool misty weather (16°C–22°C) with persistent leaf wetness and high relative humidity (>90%).',
        ],
        prevention: [
          'Ensure strong rain shelter roof coverage with good ventilation.',
          'Space plants generously to allow rapid canopy drying.',
        ],
        management: [
          'Apply systemic anti-oomycete fungicides immediately upon first detection.',
          'Destroy severely infected plants to prevent airborne spore plumes.',
        ],
        whenToSeekMentor: 'Immediately upon first suspected lesion — late blight can decimate an entire greenhouse in 72 hours.',
      },
    ],
    pests: [
      {
        id: 'pest-whitefly',
        name: 'Silverleaf Whitefly',
        scientificName: 'Bemisia tabaci',
        symptoms: [
          'Clouds of tiny white moths fluttering when plants are disturbed.',
          'Sticky honeydew on foliage leading to black sooty mold growth.',
          'Transmission of Tomato Yellow Leaf Curl Virus (TYLCV).',
        ],
        damageSigns: 'Nymphs and adults suck phloem sap and vector viral diseases.',
        prevention: [
          'Install 50-mesh insect screening on all greenhouse side vents.',
          'Hang yellow sticky boards (1 trap per 50 square meters).',
        ],
        management: [
          'Apply organic horticultural oils, neem extracts, or bio-pesticides.',
        ],
        whenToSeekMentor: 'If whitefly populations cause yellow leaf curl viral symptoms.',
      },
    ],
  },

  // 4. DURIAN (Durio zibethinus)
  {
    id: 'durian',
    name: 'Musang King Durian',
    commonLocalName: 'Durian Raja Kunyit (D197)',
    scientificName: 'Durio zibethinus',
    category: 'fruits',
    categoryLabel: 'Premium Tropical Fruit Tree',
    image: IMAGE_PATHS.farmOverview,
    typicalGrowingPeriod: '4 – 6 Years to First Bearing',
    packageSize: '3.4 MB',
    packageSizeBytes: 3400000,
    description: 'The king of tropical fruits in Southeast Asia, with clones such as Musang King (D197) and Black Thorn (D200) demanding premium market value. Requires undulating hill slopes, strict drainage, and managed water stress for flower bud induction.',
    growingConditions: {
      sunlight: 'Full Sun (Requires open canopy illumination for flower budding and sugar development)',
      temperature: '26°C – 32°C (Year-round tropical warmth; sensitive to cold drafts)',
      waterDemand: 'High during vegetative flush and fruit swell; requires 10–14 days dry stress for flower induction',
      spacing: '9 m x 9 m or 10 m x 10 m triangular grid (40–48 trees per acre)',
    },
    growingGuide: [
      {
        stepNumber: 1,
        title: 'Site Selection & Mound Planting',
        summary: 'Undulating gentle slopes with high raised planting mounds (busut).',
        instructions: [
          'Choose well-draining hill slopes with no stagnant groundwater.',
          'Construct planting mounds (busut) 60 cm high and 2 meters wide to ensure root collar remains above water during monsoons.',
        ],
      },
      {
        stepNumber: 2,
        title: 'Selecting Quality Grafted Saplings',
        summary: 'Verified authentic D197 rootstock with straight single taproot.',
        instructions: [
          'Procure grafted saplings from certified Malaysian Department of Agriculture (DOA) nurseries.',
          'Ensure graft union is healed and root bag has no coiled root strangulation.',
        ],
      },
      {
        stepNumber: 3,
        title: 'Field Planting & Shading',
        summary: 'Careful mound transplanting with temporary 50% shade netting.',
        instructions: [
          'Plant in center of mound without burying the graft union.',
          'Provide temporary coconut frond or shade net umbrella for young saplings for the first 6 months.',
        ],
      },
      {
        stepNumber: 4,
        title: 'Micro-Sprinkler Irrigation System',
        summary: 'Under-canopy rotary micro-sprinklers delivering 60–100 L per tree daily.',
        instructions: [
          'Install 2–3 micro-sprinklers per tree positioned along the canopy drip line.',
          'Deliver 80–120 liters daily per mature tree during fruit swell.',
        ],
      },
      {
        stepNumber: 5,
        title: 'Seasonal Fertilization Cycle',
        summary: 'Phased application based on vegetative flush, water stress, flowering, and fruit fill.',
        instructions: [
          'Post-harvest recovery: High nitrogen organic compost + NPK 15-15-15 + Magnesium.',
          'Flower induction: High phosphorus NPK 10-50-10 or 12-24-12.',
          'Fruit expansion: High potassium sulfate (SOP) NPK 12-12-17-2 + TE (zero chloride).',
        ],
      },
      {
        stepNumber: 6,
        title: 'Weed Control & Under-Canopy Mulching',
        summary: 'Keep grass cut short under canopy; never use non-selective glyphosate near trunks.',
        instructions: [
          'Mow orchard floor to encourage soft carpet grass that prevents soil erosion on slopes.',
          'Keep trunk collar 50 cm clear of weeds and mulches to avoid Phytophthora harboring.',
        ],
      },
      {
        stepNumber: 7,
        title: 'Canopy Pruning & Branch Training',
        summary: 'Central leader system with horizontal horizontal bearing branches.',
        instructions: [
          'Maintain single strong central leader trunk.',
          'Prune vertical water shoots (tunas air) inside canopy to encourage horizontal scaffold branches.',
          'Thin flowers leaving 2–3 best clusters per branch; thin fruitlets to 1–2 per cluster at day 45.',
        ],
      },
      {
        stepNumber: 8,
        title: 'Fruit Tying & Harvesting',
        summary: 'Tie ripening fruit with raffia string to prevent tree drop damage; harvest naturally fallen fruit.',
        instructions: [
          'In Malaysia, Musang King is harvested when fruit naturally drops at 100% ripeness, caught by safety netting or branch ties.',
          'Fruit shelf-life is 2–4 days at ambient temperature.',
        ],
      },
      {
        stepNumber: 9,
        title: 'Post-Harvest Orchard Rehabilitation',
        summary: 'Pruning old fruit stalks, liming, and root drenching with Trichoderma.',
        instructions: [
          'Prune dead wood and spent pedicels immediately after harvest.',
          'Apply 5 kg dolomite and 25 kg compost per tree to replenish depleted carbohydrate reserves.',
        ],
      },
    ],
    watering: {
      requirements: 'Generous irrigation during fruit filling, but mandatory 10–14 days total dry spell required to trigger floral budding.',
      recommendedFrequency: 'Daily under-canopy micro-sprinkling (60–100 L per tree); shut off during flower induction window.',
      signsOfUnderWatering: [
        'Curling leaf tips, leaf scorch, premature dropping of developing fruitlets.',
      ],
      signsOfOverWatering: [
        'Root hypoxia, excessive new vegetative leaf flush that causes tree to abort developing flowers or young fruit.',
        'Trunk patch canker (Phytophthora) flares up.',
      ],
      practicalTips: 'Always place micro-sprinklers at the outer dripline of the canopy where active feeder roots reside.',
    },
    soil: {
      suitableSoilConditions: 'Deep, well-aerated sandy clay loam with open gravelly structure on undulating slopes.',
      drainageRequirements: 'Paramount importance. Durian roots cannot tolerate any saturated standing water.',
      phRange: 'pH 5.5 – 6.5.',
      soilPreparation: [
        'Build planting busut (mounds) on all tree spots.',
        'Incorporate bio-char and beneficial mycorrhiza in planting hole.',
      ],
      basicSoilManagement: [
        'Apply agricultural dolomite annually to neutralize tropical subsoil acidity.',
      ],
    },
    nutrition: {
      generalRequirements: 'Careful balance of Nitrogen for leaf flushes, Phosphorus for flower bud differentiation, and pure Potassium Sulfate (SOP) for creamy yellow fruit pulp texture and bittersweet aroma.',
      timingGuidance: [
        'Post-harvest (Month 1): Organic compost + NPK 15-15-15.',
        'Pre-flower (Month 3): NPK 10-50-10.',
        'Fruit swell (Month 5–6): NPK 12-12-17 + TE (SOP formulation, avoid MOP).',
      ],
      deficiencies: [
        {
          nutrient: 'Potassium (K)',
          symptoms: 'Fruit pulp is pale, watery, and bland without characteristic creamy sticky texture; leaf edges scorch brown.',
          treatment: 'Apply potassium sulfate (0-0-50) along canopy dripline.',
        },
        {
          nutrient: 'Boron (B)',
          symptoms: 'Hard lumpy nodules inside fruit flesh; deformed fruit chambers.',
          treatment: 'Foliar spray with solubor boron during pre-bloom stage.',
        },
      ],
    },
    diseases: [
      {
        id: 'durian-phytophthora',
        name: 'Phytophthora Trunk Canker & Patch Rot',
        scientificPathogen: 'Phytophthora palmivora',
        whatItIs: 'The single most lethal disease of durian trees, causing weeping dark bark cankers, foliar blight, and root rot.',
        symptoms: [
          'Dark, water-soaked bark lesions weeping reddish-brown resinous sap (gummosis).',
          'Yellowing, thinning canopy with dieback of branch tips.',
          'Bark when shaved reveals dark purple-brown rotting cambium underneath.',
        ],
        whatFarmerMayNotice: 'Brown resinous sap bleeding from lower trunk bark, followed by sudden yellowing and leaf fall across branches.',
        possibleCauses: [
          'Waterlogged soil around trunk base; rain splashing soil-borne oomycete spores onto lower bark.',
          'Injuries from grass trimmers or machinery near trunk base.',
        ],
        prevention: [
          'Plant on raised mounds (busut) and keep trunk collar completely dry and clean.',
          'Avoid mechanical injuries to trunk bark during weeding.',
          'Apply preventive trunk paint with copper hydroxide or beneficial Trichoderma bio-agent.',
        ],
        management: [
          'Carefully scrape away necrotic infected bark until healthy green cambium is exposed.',
          'Paint scraped area immediately with systemic fungicide (e.g. Metalaxyl or Phosphonic acid paste).',
          'Perform targeted trunk injection with potassium phosphite by certified agronomist.',
        ],
        whenToSeekMentor: 'Whenever resinous weeping cankers appear on main scaffold trunks.',
      },
    ],
    pests: [
      {
        id: 'pest-durian-borer',
        name: 'Durian Fruit Borer',
        scientificName: 'Mudaria luteileprosa / Conogethes punctiferalis',
        symptoms: [
          'Holes bored through thorny fruit rind with reddish-brown frass accumulating between spines.',
          'Damaged seed pulp inside fruit.',
        ],
        damageSigns: 'Larvae hatch from eggs laid on spines and tunnel deep into fruit chambers.',
        prevention: [
          'Wrap individual high-value fruit with nylon mesh bags at 45 days after bloom.',
          'Conserve natural parasitic wasps.',
        ],
        management: [
          'Apply bio-pesticide or registered selective insect growth regulator during early fruit set.',
        ],
        whenToSeekMentor: 'If fruit boring damage is detected in commercial export orchard.',
      },
    ],
  },

  // 5. POTATO (Solanum tuberosum)
  {
    id: 'potato',
    name: 'Potato',
    commonLocalName: 'Ubi Kentang',
    scientificName: 'Solanum tuberosum',
    category: 'tubers',
    categoryLabel: 'Tuber Root Crop',
    image: IMAGE_PATHS.potatoImage,
    typicalGrowingPeriod: '90 – 120 Days',
    packageSize: '2.6 MB',
    packageSizeBytes: 2600000,
    description: 'Starchy tuber crop suited for highland climates (Cameron Highlands, Kundasang Sabah). Demands loose, stone-free raised beds, hilling-up, and strict late blight surveillance.',
    growingConditions: {
      sunlight: 'Full Sun (Highland sunshine)',
      temperature: '15°C – 22°C (Tuber initiation requires cool night temperatures below 18°C)',
      waterDemand: 'Consistent, moderate soil moisture; avoid waterlogged or bone-dry extremes',
      spacing: '30 cm between seed tubers, 75 cm between hilled ridges',
    },
    growingGuide: [
      {
        stepNumber: 1,
        title: 'Deep Ridge & Hill Preparation',
        summary: 'Plow deeply and form loose, stone-free raised ridges.',
        instructions: [
          'Loosen soil to 35 cm depth and remove all rocks and clods to prevent misshapen tubers.',
          'Form prominent ridges into which seed tubers will be set.',
        ],
      },
      {
        stepNumber: 2,
        title: 'Chitting Certified Seed Tubers',
        summary: 'Sprout certified virus-free seed tubers in indirect light.',
        instructions: [
          'Store seed tubers in cool, diffused light for 2 weeks until short, sturdy green sprouts (1–2 cm) emerge.',
        ],
      },
      {
        stepNumber: 3,
        title: 'Planting & Hilling Up (Earthing Up)',
        summary: 'Bury sprouted seed tubers 10 cm deep; hill up soil around stems as they grow.',
        instructions: [
          'Place seed tubers sprout-side up in furrows and cover with 10 cm of friable soil.',
          'Hill up soil around stems twice (when plants are 15 cm and 25 cm tall) to keep developing tubers covered from sunlight.',
        ],
        tips: 'Exposing tubers to sunlight causes greening and toxic solanine accumulation.',
      },
      {
        stepNumber: 4,
        title: 'Watering Guidelines',
        summary: 'Maintain steady moisture from tuber initiation through bulking.',
        instructions: [
          'Water evenly to ensure uniform tuber expansion without growth cracks.',
          'Cease irrigation 10 days before harvest to allow tuber skins to cure and harden.',
        ],
      },
      {
        stepNumber: 5,
        title: 'Fertilization Schedule',
        summary: 'High phosphorus and potassium with moderate nitrogen.',
        instructions: [
          'Basal: High phosphorus organic manure + NPK 10-20-20.',
          'Side-dress with potassium sulfate during tuber bulking.',
        ],
      },
      {
        stepNumber: 6,
        title: 'Weed Suppression',
        summary: 'Weeding coincides with earthing up ridges.',
        instructions: [
          'Carefully hand-weed ridges without disturbing shallow developing stolons.',
        ],
      },
      {
        stepNumber: 7,
        title: 'Foliar Blight Scouting',
        summary: 'Inspect daily for late blight lesions in cool foggy morning conditions.',
        instructions: [
          'Scout lower leaves for greasy water-soaked spots.',
        ],
      },
      {
        stepNumber: 8,
        title: 'Harvesting & Skin Curing',
        summary: 'Dig tubers carefully after foliage naturally dies back.',
        instructions: [
          'Wait 10–14 days after vine senescence so tuber skin sets firmly.',
          'Use flat-tined fork to lift ridges without slicing tubers.',
        ],
      },
      {
        stepNumber: 9,
        title: 'Post-Harvest Curing & Storage',
        summary: 'Cure at 15°C and 90% humidity for 10 days, then store in darkness.',
        instructions: [
          'Allow minor cuts to heal during curing before moving to dark, ventilated storage.',
        ],
      },
    ],
    watering: {
      requirements: 'Moderate, steady moisture. Water stress during tuber formation leads to knobby, cracked tubers.',
      recommendedFrequency: '2–3 deep waterings per week; cut off before harvest.',
      signsOfUnderWatering: ['Stunted haulms, small marble-sized tubers.'],
      signsOfOverWatering: ['Tuber rot, enlarged lenticels (corky white bumps on skin) allowing pathogen entry.'],
      practicalTips: 'Drip lines placed under ridge soil keep foliage dry and minimize late blight.',
    },
    soil: {
      suitableSoilConditions: 'Deep, fertile, well-aerated sandy loam with pH 5.2 – 6.0.',
      drainageRequirements: 'Excellent drainage essential to prevent tuber rot.',
      phRange: 'pH 5.0 – 6.0 (Slightly acidic soil suppresses Common Scab).',
      soilPreparation: ['Deep tilling with incorporation of aged compost.'],
      basicSoilManagement: ['Rotate with sweet corn or brassicas; avoid planting after tomatoes.'],
    },
    nutrition: {
      generalRequirements: 'Phosphorus for stolon initiation, Potassium for tuber starch bulking, moderate Nitrogen.',
      timingGuidance: ['All P and half K at planting; remaining K during second hilling up.'],
      deficiencies: [
        {
          nutrient: 'Potassium (K)',
          symptoms: 'Older leaves develop dark bronze margins; tubers suffer internal blackspot bruising.',
          treatment: 'Side-dress with sulfate of potash.',
        },
      ],
    },
    diseases: [
      {
        id: 'potato-late-blight',
        name: 'Potato Late Blight',
        scientificPathogen: 'Phytophthora infestans',
        whatItIs: 'Rapidly spreading foliar and tuber rot disease triggered by cool, wet weather.',
        symptoms: ['Greasy dark green-brown lesions with white mildew fringe on leaf undersides.'],
        whatFarmerMayNotice: 'Canopy looks blackened and burnt within 48 hours after foggy rains.',
        possibleCauses: ['Cool humid weather with poor air circulation.'],
        prevention: ['Use certified disease-free seed; maintain broad ridges; apply protective fungicides.'],
        management: ['Cut and destroy infected foliage before spores wash down into tubers.'],
        whenToSeekMentor: 'At first detection in highland farm blocks.',
      },
    ],
    pests: [
      {
        id: 'pest-potato-tuber-moth',
        name: 'Potato Tuber Moth',
        scientificName: 'Phthorimaea operculella',
        symptoms: ['Larval tunnels in leaf mines and deep galleries in stored tubers.'],
        damageSigns: 'Caterpillars mine leaves and tunnel into tubers, leaving brown silk frass.',
        prevention: ['Keep tubers well covered with soil ridges; store in moth-proof netting.'],
        management: ['Apply Bacillus thuringiensis (Bt) or pheromone mating disruption.'],
        whenToSeekMentor: 'If tuber damage appears in storage sheds.',
      },
    ],
  },

  // 6. SWEET CORN (Zea mays)
  {
    id: 'corn',
    name: 'Sweet Corn',
    commonLocalName: 'Jagung Manis',
    scientificName: 'Zea mays',
    category: 'grains',
    categoryLabel: 'Cereal / Vegetable Grain',
    image: IMAGE_PATHS.plantCorn,
    typicalGrowingPeriod: '68 – 75 Days',
    packageSize: '2.5 MB',
    packageSizeBytes: 2500000,
    description: 'Fast-cycle cash crop widely planted across Malaysia as a cash crop or rotation option. Known for sweet, tender kernels (e.g. Honey Jean, F1 hybrids) with high nitrogen demands and strict fall armyworm vigilance.',
    growingConditions: {
      sunlight: 'Full Sun (Needs maximum solar radiation for sugar synthesis)',
      temperature: '24°C – 32°C',
      waterDemand: 'High during tasseling and silking (critical pollination window)',
      spacing: '25 – 30 cm between plants in rows, 75 cm between rows (block planting for pollination)',
    },
    growingGuide: [
      {
        stepNumber: 1,
        title: 'Land Preparation & Furrowing',
        summary: 'Deep plowing and formation of parallel planting ridges.',
        instructions: [
          'Plow to 25 cm depth and incorporate 10 tonnes/ha organic compost.',
          'Form ridges 75 cm apart to facilitate furrow or drip irrigation.',
        ],
      },
      {
        stepNumber: 2,
        title: 'Direct Seeding in Blocks',
        summary: 'Plant seeds directly in rectangular grid blocks for wind pollination.',
        instructions: [
          'Plant seeds 3 cm deep in blocks rather than single long rows to ensure wind transfers pollen effectively.',
        ],
      },
      {
        stepNumber: 3,
        title: 'Seedling Emergence & Thinning',
        summary: 'Thin to one vigorous seedling per planting hill at 10 days.',
        instructions: [
          'Remove weaker seedlings leaving 1 healthy stalk every 25 cm.',
        ],
      },
      {
        stepNumber: 4,
        title: 'Irrigation Management',
        summary: 'Ensure steady moisture, especially during tasseling and silk emergence.',
        instructions: [
          'Water stress during silking causes incomplete kernel filling (blank cob tips).',
        ],
      },
      {
        stepNumber: 5,
        title: 'Fertilization (High Nitrogen Feed)',
        summary: 'Heavy nitrogen consumer applied in 2 main side-dressings.',
        instructions: [
          'Basal: NPK 15-15-15.',
          'Side-dress 1 (Day 21, Knee-high stage): Urea + NPK 15-15-15.',
          'Side-dress 2 (Day 45, Tasseling): Potassium chloride or potassium nitrate for cob weight.',
        ],
      },
      {
        stepNumber: 6,
        title: 'Weed Control & Earthing Up',
        summary: 'Hill up soil around base to stabilize brace roots and smother weeds.',
        instructions: [
          'Hoe weeds early; hill soil around stalk base at knee-high stage to anchor plants against wind lodging.',
        ],
      },
      {
        stepNumber: 7,
        title: 'Silk & Tassel Monitoring',
        summary: 'Monitor pollination and check for Fall Armyworm in the whorl.',
        instructions: [
          'Inspect leaf whorls for caterpillar frass.',
        ],
      },
      {
        stepNumber: 8,
        title: 'Harvesting at Milk Stage',
        summary: 'Harvest when silks turn brown and kernels release milky sap when punctured.',
        instructions: [
          'Harvest early in the morning when ambient temperature is cool.',
          'Snap ears downward with a firm twist.',
        ],
      },
      {
        stepNumber: 9,
        title: 'Post-Harvest Cold Chain',
        summary: 'Rapid cooling to prevent sugars from converting into starch.',
        instructions: [
          'Pre-cool ears immediately with chilled water or ice to maintain sweet brix levels.',
        ],
      },
    ],
    watering: {
      requirements: 'High water requirement, particularly during tasseling, silking, and kernel milking.',
      recommendedFrequency: '2–3 times weekly, targeting 30–40 mm per week.',
      signsOfUnderWatering: ['Grayish-green leaf curling, poor cob tip filling, stunted stalks.'],
      signsOfOverWatering: ['Yellowing lower leaves, root suffocation on poorly drained clays.'],
      practicalTips: 'Never allow soil to dry out between tassel emergence and silk browning.',
    },
    soil: {
      suitableSoilConditions: 'Deep, fertile alluvial loam or clay loam with high organic content.',
      drainageRequirements: 'Good furrow drainage; temporary puddling tolerated for under 12 hours.',
      phRange: 'pH 5.8 – 6.8.',
      soilPreparation: ['Plowing with incorporation of well-rotted animal manure.'],
      basicSoilManagement: ['Excellent rotation crop after chili or tomato to break solanaceous disease cycles.'],
    },
    nutrition: {
      generalRequirements: 'Heavy feeder demanding substantial Nitrogen and Potassium.',
      timingGuidance: ['Split application at planting, 3 weeks, and pre-tasseling.'],
      deficiencies: [
        {
          nutrient: 'Nitrogen (N)',
          symptoms: 'V-shaped yellowing starting at leaf tips and advancing along central midrib.',
          treatment: 'Side-dress with urea or ammonium nitrate immediately.',
        },
      ],
    },
    diseases: [
      {
        id: 'corn-northern-leaf-blight',
        name: 'Northern Corn Leaf Blight',
        scientificPathogen: 'Exserohilum turcicum',
        whatItIs: 'Foliar fungal disease producing elongated grayish-tan cigar-shaped lesions on leaves.',
        symptoms: ['Cigar-shaped elliptical tan lesions 3–15 cm long running parallel to veins.'],
        whatFarmerMayNotice: 'Large tan cigar-shaped dry patches on ear leaves reducing photosynthesis.',
        possibleCauses: ['Prolonged dew periods and moderate warm temperatures.'],
        prevention: ['Plant resistant hybrid varieties; maintain good row ventilation.'],
        management: ['Apply registered bio-fungicides or azoxystrobin early upon detection.'],
        whenToSeekMentor: 'If lesions appear before tasseling on upper leaves.',
      },
    ],
    pests: [
      {
        id: 'pest-fall-armyworm',
        name: 'Fall Armyworm (FAW)',
        scientificName: 'Spodoptera frugiperda',
        symptoms: [
          'Ragged, windowpaned leaves with large irregular holes.',
          'Abundant coarse sawdust-like yellowish frass inside the central leaf whorl.',
          'Larva features an inverted white "Y" on its dark head capsule.',
        ],
        damageSigns: 'Caterpillars feed deep inside whorl and burrow into developing ear tips.',
        prevention: ['Scout leaf whorls twice weekly starting 10 days after germination.'],
        management: ['Apply Bacillus thuringiensis (Bt) or registered bio-control agents directly into whorl.'],
        whenToSeekMentor: 'When FAW infestation exceeds 10% of field plants.',
      },
    ],
  },

  // 7. APPLE / HIGHLAND APPLE (Malus domestica)
  {
    id: 'apple',
    name: 'Highland Apple',
    commonLocalName: 'Epal Tanah Tinggi',
    scientificName: 'Malus domestica',
    category: 'fruits',
    categoryLabel: 'Temperate / Highland Fruit Tree',
    image: IMAGE_PATHS.appleCrop,
    typicalGrowingPeriod: 'Annual Pruning to Harvest (120–150 Days)',
    packageSize: '2.9 MB',
    packageSizeBytes: 2900000,
    description: 'Cultivated in high-altitude microclimates (Cameron Highlands, Kundasang Sabah) using artificial defoliation to overcome lack of winter chilling. Known for specialized training and apple scab prevention.',
    growingConditions: {
      sunlight: 'Full Sun (High UV intensity in equatorial highlands)',
      temperature: '14°C – 22°C (Requires altitude above 1,200m to prevent heat dormancy)',
      waterDemand: 'Steady, moderate moisture; drip irrigated under rain shelter or open orchard',
      spacing: '3 m between trees, 4.5 m between rows (central leader spindle system)',
    },
    growingGuide: [
      {
        stepNumber: 1,
        title: 'Highland Orchard Terracing',
        summary: 'Construct contoured slope terraces with deep drainage swales.',
        instructions: [
          'Terrace slopes to prevent erosion and create level tree platforms.',
          'Install sub-surface drainage pipes to manage heavy monsoon rainfall.',
        ],
      },
      {
        stepNumber: 2,
        title: 'Rootstock & Variety Selection',
        summary: 'Low-chill varieties (e.g. Anna, Dorsett Golden, Rome Beauty) grafted on semi-dwarf rootstocks.',
        instructions: [
          'Choose low-chill hour cultivars adapted to tropical highland cycles.',
        ],
      },
      {
        stepNumber: 3,
        title: 'Planting & Trellis Spindle Setup',
        summary: 'Plant saplings with graft union 10 cm above ground.',
        instructions: [
          'Install post-and-wire trellis system to support heavy fruit load.',
        ],
      },
      {
        stepNumber: 4,
        title: 'Irrigation & Drainage',
        summary: 'Controlled micro-drip irrigation along tree rows.',
        instructions: [
          'Deliver 15–25 L per tree daily during fruit expansion.',
        ],
      },
      {
        stepNumber: 5,
        title: 'Fertilization Schedule',
        summary: 'Balanced organic compost supplemented with potassium sulfate and micronutrients.',
        instructions: [
          'Apply compost after harvest pruning; feed potassium and boron during fruit set.',
        ],
      },
      {
        stepNumber: 6,
        title: 'Orchard Floor Management',
        summary: 'Maintain low clover or dwarf grass ground cover between tree rows.',
        instructions: [
          'Keep tree base mulched with compost; mow inter-row grass.',
        ],
      },
      {
        stepNumber: 7,
        title: 'Manual Defoliation & Branch Bending',
        summary: 'Special tropical technique: strip all leaves and bend branches horizontally to induce flowering.',
        instructions: [
          'In tropical highlands without freezing winters, manually strip leaves after harvest.',
          'Tie branches down to horizontal angle to break apical dominance and trigger flower bud break.',
        ],
      },
      {
        stepNumber: 8,
        title: 'Fruit Thinning & Bagging',
        summary: 'Thin to 1 fruit per spur and bag fruit to prevent fruit fly stinging.',
        instructions: [
          'Thin clusters to a single central king blossom fruitlet.',
          'Bag individual apples with paper bags at 30 days after petal fall.',
        ],
      },
      {
        stepNumber: 9,
        title: 'Harvesting & Cold Storage',
        summary: 'Harvest when ground color shifts from green to creamy yellow with characteristic red blush.',
        instructions: [
          'Lift and twist fruit stem gently; store in cool room at 1°C–4°C.',
        ],
      },
    ],
    watering: {
      requirements: 'Moderate steady moisture; reduce water prior to artificial defoliation.',
      recommendedFrequency: 'Drip irrigation 2–3 times per week based on soil tensiometer readings.',
      signsOfUnderWatering: ['Small fruit size, premature fruit drop, dull skin.'],
      signsOfOverWatering: ['Root collar rot, fruit split, pale washed-out flavor.'],
      practicalTips: 'Drip lines keep foliage dry and reduce Apple Scab fungal pressure.',
    },
    soil: {
      suitableSoilConditions: 'Deep, rich, well-aerated sandy clay loam with high organic humus.',
      drainageRequirements: 'Strict free drainage on slopes or raised terraces.',
      phRange: 'pH 6.0 – 6.8.',
      soilPreparation: ['Deep ripping and incorporation of aged farmyard manure and agricultural lime.'],
      basicSoilManagement: ['Annual soil testing to maintain balance of calcium, magnesium, and potassium.'],
    },
    nutrition: {
      generalRequirements: 'Balanced NPK with emphasis on Calcium for crisp fruit texture and storage longevity.',
      timingGuidance: ['Early spring flush: Nitrogen; Fruit development: Calcium and Potassium.'],
      deficiencies: [
        {
          nutrient: 'Calcium (Ca)',
          symptoms: 'Bitter Pit — Small, sunken, bitter brown corky spots in the apple flesh and skin.',
          treatment: 'Apply 4–6 foliar sprays of calcium chloride or chelated calcium during fruit growth.',
        },
      ],
    },
    diseases: [
      {
        id: 'apple-scab',
        name: 'Apple Scab',
        scientificPathogen: 'Venturia inaequalis',
        whatItIs: 'Severe fungal foliar and fruit disease causing velvety olive-green to black scabby lesions.',
        symptoms: ['Velvety olive-green spots on leaves turning corky, scabby, and cracked on fruit skins.'],
        whatFarmerMayNotice: 'Deformed, cracked apples with rough brown scabs and early leaf drop.',
        possibleCauses: ['High relative humidity, misty rain, and prolonged leaf wetness.'],
        prevention: ['Prune canopy to promote rapid wind drying; collect and compost fallen leaves.'],
        management: ['Apply protective bio-copper or sulfur fungicides before infection periods.'],
        whenToSeekMentor: 'If scab lesions appear on developing fruitlets.',
      },
    ],
    pests: [
      {
        id: 'pest-oriental-fruit-fly',
        name: 'Oriental Fruit Fly',
        scientificName: 'Bactrocera dorsalis',
        symptoms: ['Pin-prick oviposition sting marks on apple skin; maggots feeding inside rotting flesh.'],
        damageSigns: 'Female flies inject eggs under skin; maggots liquefy the pulp.',
        prevention: ['Enclose developing apples in protective paper bags; hang methyl eugenol pheromone traps.'],
        management: ['Sanitize fallen fruit daily into sealed bags; install protein bait sprays.'],
        whenToSeekMentor: 'When fruit fly trap counts spike during ripening.',
      },
    ],
  },
];
