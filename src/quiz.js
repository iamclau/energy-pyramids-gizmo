// ================= QUIZ =================
// Question bank: [question, [correct, wrong, wrong, wrong], explanation]. Options are shuffled when shown.
const Quiz = (() => {
  const BANK = [
    // ---- Levels of organization ----
    ['Which level of organization is a group of organisms of the same species living in the same place at the same time?', ['Population', 'Community', 'Ecosystem', 'Organism'], 'A population is one species in one place at one time. A community has many interacting populations.'],
    ['Which list is in order from SMALLEST to LARGEST?', ['Quark → atom → molecule → cell', 'Atom → quark → cell → molecule', 'Cell → molecule → atom → quark', 'Molecule → atom → quark → cell'], 'Quarks build subatomic particles, which build atoms, which bond into molecules, which make up cells.'],
    ['Which list is in order from LARGEST to SMALLEST?', ['Ecosystem → community → population → organism', 'Organism → population → community → ecosystem', 'Community → ecosystem → organism → population', 'Population → organism → community → ecosystem'], 'An ecosystem contains communities, which contain populations, which are made of individual organisms.'],
    ['The stomach is an example of which level of organization?', ['Organ', 'Tissue', 'System', 'Cell'], 'An organ is made of different kinds of tissues working together for one function.'],
    ['What makes an ecosystem different from a community?', ['An ecosystem includes the non-living (abiotic) parts of the environment', 'An ecosystem has only one species', 'An ecosystem has only producers', 'An ecosystem is smaller than a population'], 'Ecosystem = living communities interacting with non-living parts like sunlight, water and soil.'],
    ['Protons and neutrons are made of smaller particles called…', ['Quarks', 'Atoms', 'Molecules', 'Cells'], 'Quarks are the smallest bits of matter known to science.'],
    ['A group of cells of the same kind, like muscle cells, is called a(n)…', ['Tissue', 'Organ', 'System', 'Population'], 'A tissue is a collection of cells of the same kind.'],
    ['A collection of organs that work together to perform a common function is a(n)…', ['System', 'Tissue', 'Organism', 'Community'], 'Organs working together (like the stomach, liver and intestines) form a system.'],
    ['A collection of systems that work together is a(n)…', ['Organism', 'Population', 'Organ', 'Ecosystem'], 'An organism, like one field mouse, is made of many systems working together.'],
    ['A collection of atoms that are chemically bonded together is a(n)…', ['Molecule', 'Cell', 'Tissue', 'Subatomic particle'], 'Molecules, like glucose and carbon dioxide, are atoms bonded together.'],
    ['Which level of organization is called the basic unit of life?', ['Cell', 'Atom', 'Molecule', 'Tissue'], 'The cell is the basic unit of structure and function in living things.'],
    ['What are the smallest bits of matter known to science at this time?', ['Quarks', 'Atoms', 'Electrons', 'Cells'], 'Quarks are smaller than protons and neutrons — they are the smallest known bits of matter.'],
    ['A collection of populations that are interacting with one another is a(n)…', ['Community', 'Ecosystem', 'Biosphere', 'Species'], 'A community is made of different populations living and interacting in the same area.'],
    ['According to our notes, a collection of all the communities on planet Earth is the…', ['Biosphere', 'Ecosphere', 'Ecosystem', 'Population'], 'The biosphere is all of the communities on Earth — all combined living things.'],
    ['According to our notes, a collection of all the ecosystems of the world is the…', ['Ecosphere', 'Biosphere', 'Community', 'Population'], 'The ecosphere is the largest level: all of the world\'s ecosystems together.'],
    ['Glucose and carbon dioxide are examples of which level of organization?', ['Molecules', 'Atoms', 'Cells', 'Tissues'], 'Both are made of atoms chemically bonded together, so they are molecules.'],
    ['Muscle, nerve and fat are examples of which level of organization?', ['Tissues', 'Organs', 'Systems', 'Cells'], 'Each is a group of cells of the same kind — a tissue.'],
    ['Red blood cells, white blood cells and osteocytes (bone cells) are examples of…', ['Cells', 'Tissues', 'Organs', 'Molecules'], 'These are all types of individual cells.'],
    ['Hydrogen (H) and oxygen (O) are examples of which level of organization?', ['Atoms', 'Molecules', 'Quarks', 'Cells'], 'H and O are elements — single atoms made of subatomic particles.'],
    ['The digestive system is an example of which level?', ['System', 'Organ', 'Tissue', 'Organism'], 'The digestive system is several organs working together to break down food.'],
    ['All of the bluegill fish living in one pond make up a…', ['Population', 'Community', 'Ecosystem', 'Organism'], 'They are all one species in one place at one time.'],
    ['Bluegill, frogs, algae and turtles all interacting in one pond make up a…', ['Community', 'Population', 'Organism', 'Species'], 'Several different populations interacting form a community.'],
    ['A pond\'s fish, frogs and algae PLUS its water, sunlight and rocks make up a(n)…', ['Ecosystem', 'Community', 'Population', 'Organ'], 'Adding the non-living (abiotic) parts to a community makes an ecosystem.'],
    ['Which level of organization is the next level LARGER than a tissue?', ['Organ', 'System', 'Cell', 'Organism'], 'Cells → tissues → organs → systems. Organs are made of different tissues.'],
    ['Which level of organization is the next level SMALLER than an atom?', ['Subatomic particles', 'Quarks', 'Molecules', 'Cells'], 'Atoms are made of subatomic particles: protons, neutrons and electrons.'],
    ['What is a species?', ['A group of organisms so similar that they can breed and produce fertile offspring', 'All of the organisms living in the same place at the same time', 'All of the populations in a community', 'Organisms that eat the same food'], 'Members of a species can breed and produce fertile offspring.'],
    ['A proton is made of…', ['2 up quarks and 1 down quark', '1 up quark and 2 down quarks', '3 up quarks', '2 electrons and 1 neutron'], 'A proton = 2 up + 1 down. A neutron = 1 up + 2 down.'],
    ['One single field mouse is an example of which level of organization?', ['Organism', 'Population', 'Organ', 'Community'], 'One individual living thing is an organism.'],
    ['The biosphere (the layer of life on Earth) reaches from about…', ['8 km above the surface to 11 km below it', 'The ground surface only', '100 km up into space', 'The ocean surface only'], 'Life is found from about 8 km up in the air to about 11 km down at deep-sea vents.'],
    ['Ecology is the study of…', ['Interactions among organisms and between organisms and their nonliving surroundings', 'Only animals and their behavior', 'Rocks and minerals', 'Only the weather'], 'Ecology looks at how organisms interact with each other and with their environment.'],
    ['Which particle is found circling outside the nucleus of an atom?', ['Electron', 'Proton', 'Neutron', 'Quark'], 'Protons and neutrons are in the nucleus. Electrons move around outside it.'],
    ['Which of these levels contains ALL of the others?', ['Ecosystem', 'Population', 'Organism', 'Cell'], 'An ecosystem contains populations, which contain organisms, which are made of cells.'],

    // ---- Biotic and abiotic ----
    ['Which of these is an ABIOTIC factor?', ['Sunlight', 'Grass', 'Bacteria in the soil', 'A fallen log'], 'Abiotic factors are nonliving. A fallen log was once living, so it is biotic.'],
    ['Which of these is a BIOTIC factor?', ['A rotting log', 'Rainfall', 'Rocks', 'Air temperature'], 'Biotic factors are living or once-living. A rotting log was once part of a tree.'],
    ['Biotic factors are…', ['The living or once-living parts of an ecosystem', 'The nonliving parts of an ecosystem', 'Only the animals in an ecosystem', 'Only the plants in an ecosystem'], 'Biotic = living or once-living: plants, animals, fungi, bacteria, dead leaves.'],
    ['Which of these is NOT an abiotic factor?', ['Earthworms', 'Soil pH', 'Water currents', 'Air temperature'], 'Earthworms are living, so they are biotic.'],
    ['Trees shade the forest floor and lower its temperature. This shows that…', ['Biotic and abiotic factors affect each other', 'Only abiotic factors matter', 'Biotic factors never interact', 'Temperature is a biotic factor'], 'Trees (biotic) change temperature (abiotic) — the two constantly affect each other.'],
    ['Why do ecologists use models?', ['To study things too large or long to test directly, like the effects of global warming', 'To count bacteria in a petri dish', 'To measure one leaf', 'To avoid ever making observations'], 'Models help scientists study big, long-term problems on a smaller scale.'],

    // ---- Energy basics ----
    ['Almost all of the energy in living things originally comes from…', ['The Sun', 'The soil', 'Water', 'Decomposers'], 'Producers capture light energy from the Sun and store it as chemical energy.'],
    ['About how much of the Sun\'s energy is used by living things?', ['Less than 1%', 'About 10%', 'About 50%', 'About 90%'], 'Less than 1% of the Sun\'s energy is captured and used by living things.'],
    ['Photosynthesis changes…', ['Light energy into chemical energy stored in glucose', 'Chemical energy into light energy', 'Heat energy into light energy', 'Glucose into sunlight'], 'Producers store the Sun\'s light energy as chemical energy in glucose.'],
    ['What are the products of photosynthesis?', ['Glucose and oxygen', 'Carbon dioxide and water', 'ATP and heat only', 'Nitrogen and phosphorus'], 'light energy + CO₂ + H₂O → glucose + O₂'],
    ['What does cellular respiration do?', ['Breaks down glucose to release usable energy (ATP)', 'Makes glucose from sunlight', 'Captures light energy', 'Turns heat into glucose'], 'glucose + O₂ → CO₂ + H₂O + energy (ATP)'],
    ['Bacteria at deep-sea vents make food without sunlight. This process is called…', ['Chemosynthesis', 'Photosynthesis', 'Cellular respiration', 'Decomposition'], 'Chemosynthesis uses energy stored in chemicals instead of light.'],
    ['Where would you most likely find producers that use chemosynthesis?', ['At deep-sea vents', 'In a sunny meadow', 'At the tops of trees', 'On a desert cactus'], 'Deep-sea vents have no sunlight, so producers there use chemical energy.'],
    ['The Law of Conservation of Energy says that energy…', ['Cannot be created or destroyed — only changed from one form to another', 'Is created by plants', 'Is destroyed when organisms use it', 'Only exists as heat'], 'Energy changes form, but the total amount stays the same.'],
    ['Every time energy changes form, some energy is "lost" as…', ['Heat', 'Light', 'Sound', 'Matter'], 'Every energy transformation gives off some heat.'],
    ['Food energy is usually measured in…', ['Calories (kcal)', 'Grams', 'Meters', 'Degrees'], 'Food energy is measured in Calories (kilocalories, kcal). Scientists also use joules.'],
    ['Which part of a cell breaks down glucose to release energy?', ['Mitochondria', 'Nucleus', 'Cell membrane', 'Cell wall'], 'Mitochondria carry out cellular respiration.'],
    ['Chemical energy is stored in…', ['The bonds of molecules like glucose', 'The nucleus of an atom', 'Moving electrons', 'Sound waves'], 'Chemical energy is stored in the bonds between atoms.'],
    ['Which organisms can carry out photosynthesis?', ['Plants, algae and some bacteria', 'Only animals', 'Only fungi', 'Only decomposers'], 'Plants, algae and some bacteria capture light energy.'],

    // ---- Producers and consumers ----
    ['Organisms that capture energy and make their own food are called…', ['Producers (autotrophs)', 'Consumers (heterotrophs)', 'Detritivores', 'Carnivores'], 'Producers (autotrophs) make their own food.'],
    ['Heterotrophs are organisms that…', ['Cannot make their own food and must eat other organisms', 'Make their own food from sunlight', 'Are always plants', 'Only live at deep-sea vents'], 'Heterotrophs (consumers) rely on other organisms for food.'],
    ['A bear eats berries, fish and insects. A bear is a(n)…', ['Omnivore', 'Herbivore', 'Carnivore', 'Producer'], 'Omnivores eat both plants and animals.'],
    ['Cows and deer are examples of…', ['Herbivores', 'Carnivores', 'Omnivores', 'Detritivores'], 'Herbivores obtain energy by eating plants.'],
    ['Snakes and owls are examples of…', ['Carnivores', 'Herbivores', 'Producers', 'Detritivores'], 'Carnivores obtain energy by eating animals.'],
    ['Which organism is a detritivore?', ['Earthworm', 'Hawk', 'Grass', 'Deer'], 'Detritivores like earthworms, mites, snails and crabs feed on dead matter.'],
    ['Detritivores feed on…', ['Animal remains and other dead matter', 'Only living plants', 'Sunlight', 'Only live prey'], 'Detritivores eat remains and other dead matter.'],
    ['What is the role of decomposers?', ['They break down dead matter at every trophic level', 'They capture sunlight to make food', 'They are always the top predators', 'They make glucose for herbivores'], 'Decomposers break down dead matter and return nutrients to the soil.'],
    ['Fungi that live off the nutrients inside a tree are…', ['Consumers (heterotrophs)', 'Producers (autotrophs)', 'Abiotic factors', 'Photosynthetic'], 'Fungi cannot make their own food, so they are consumers.'],
    ['Which of these is a producer?', ['Algae', 'Mushroom', 'Snail', 'Owl'], 'Algae make their own food by photosynthesis. Mushrooms are fungi (consumers).'],
    ['Which of these is an autotroph?', ['Oak tree', 'Earthworm', 'Human', 'E. coli bacteria in the colon'], 'An oak tree makes its own food through photosynthesis.'],
    ['Humans eat both plants and animals, so humans are…', ['Omnivores', 'Herbivores', 'Carnivores', 'Producers'], 'Omnivores obtain energy from plants and animals.'],
    ['An organism that eats ONLY animals is a(n)…', ['Carnivore', 'Herbivore', 'Omnivore', 'Autotroph'], 'Carnivores obtain energy by eating other animals.'],
    ['Phytoplankton (microscopic algae) at the start of an ocean food chain are…', ['Producers', 'Primary consumers', 'Decomposers', 'Carnivores'], 'Phytoplankton make their own food by photosynthesis.'],
    ['E. coli bacteria living in the colon feed off digested food. They are…', ['Consumers (heterotrophs)', 'Producers (autotrophs)', 'Abiotic factors', 'Photosynthetic'], 'They cannot make their own food, so they are consumers.'],

    // ---- Food chains and trophic levels ----
    ['In a food chain, the arrows point…', ['In the direction energy flows, from the organism eaten to the organism that eats it', 'From the predator to its prey', 'From the top predator down to the producer', 'Back toward the Sun'], 'Arrows show the direction energy flows.'],
    ['In grass → cricket → mouse → snake → hawk, the snake is the…', ['Tertiary consumer (4th trophic level)', 'Secondary consumer (3rd trophic level)', 'Primary consumer (2nd trophic level)', 'Quaternary consumer (5th trophic level)'], 'Grass (1st), cricket (2nd), mouse (3rd), snake (4th), hawk (5th).'],
    ['In grass → cricket → mouse → snake → hawk, the mouse is the…', ['Secondary consumer (3rd trophic level)', 'Primary consumer (2nd trophic level)', 'Tertiary consumer (4th trophic level)', 'Producer (1st trophic level)'], 'The mouse eats crickets, which eat grass, so it is the 3rd level.'],
    ['In grass → cricket → mouse → snake → hawk, the hawk is the…', ['Quaternary consumer (5th trophic level)', 'Tertiary consumer (4th trophic level)', 'Secondary consumer (3rd trophic level)', 'Producer'], 'The hawk is 5 steps up — a quaternary consumer.'],
    ['In grass → cricket → mouse → snake → hawk, the cricket is the…', ['Primary consumer (2nd trophic level)', 'Producer (1st trophic level)', 'Secondary consumer (3rd trophic level)', 'Decomposer'], 'Crickets eat the producer (grass), so they are primary consumers.'],
    ['A trophic level is…', ['Each feeding step in a food chain or food web', 'A type of habitat', 'The amount of sunlight in an area', 'The size of an organism'], 'Trophic levels are the steps in a food chain: producers, primary consumers, and so on.'],
    ['Producers always make up which trophic level?', ['The 1st trophic level', 'The 2nd trophic level', 'The top trophic level', 'They are not part of a trophic level'], 'Producers form the base — the 1st trophic level.'],
    ['Primary consumers are…', ['Herbivores that eat producers (2nd trophic level)', 'Producers that make their own food', 'Carnivores that eat other carnivores', 'Decomposers that break down dead matter'], 'Primary consumers eat producers.'],
    ['A food web is…', ['Many food chains linked together in an ecosystem', 'A single straight food chain', 'A diagram of only producers', 'The path of the water cycle'], 'A food web connects all of the food chains in an ecosystem.'],
    ['Energy in an ecosystem flows…', ['In one direction: Sun → autotrophs → heterotrophs', 'In a circle back to the Sun', 'From top predators down to producers', 'Randomly in every direction'], 'Energy flows one way, starting with the Sun.'],
    ['In algae → zooplankton → minnow → bass, the bass is the…', ['Tertiary consumer (4th level)', 'Secondary consumer (3rd level)', 'Primary consumer (2nd level)', 'Producer (1st level)'], 'Algae (1st), zooplankton (2nd), minnow (3rd), bass (4th).'],
    ['In clover → rabbit → fox, the fox is the…', ['Secondary consumer', 'Primary consumer', 'Producer', 'Tertiary consumer'], 'The fox eats the rabbit (primary consumer), so it is a secondary consumer.'],
    ['Which food chain is in the correct order?', ['Sun → producer → primary consumer → secondary consumer', 'Sun → secondary consumer → primary consumer → producer', 'Producer → Sun → primary consumer → secondary consumer', 'Primary consumer → producer → Sun → secondary consumer'], 'Energy starts at the Sun and moves to producers, then consumers.'],
    ['In a food chain, an arrow goes from "mouse" to "snake." This means…', ['Energy flows from the mouse to the snake (the snake eats the mouse)', 'The mouse eats the snake', 'Energy flows from the snake to the mouse', 'The two never interact'], 'The arrow points to the eater.'],
    ['The first organism in a food chain is always a…', ['Producer', 'Carnivore', 'Decomposer', 'Top predator'], 'Every food chain starts with a producer that captures energy.'],
    ['Which organisms break down dead matter at EVERY trophic level?', ['Decomposers and detritivores', 'Producers', 'Herbivores', 'Top predators'], 'Decomposers and detritivores work on dead matter from every level.'],

    // ---- 10% rule ----
    ['About what percent of the energy at one trophic level is passed on to the next level?', ['10%', '90%', '50%', '1%'], 'This is the 10% rule.'],
    ['The producers in a pond capture 50,000 kcal. How much energy is available to the SECONDARY consumers?', ['500 kcal', '5,000 kcal', '50 kcal', '45,000 kcal'], '50,000 × 0.10 = 5,000 (primary) → × 0.10 = 500 kcal (secondary).'],
    ['The producers in a pond capture 50,000 kcal. How much energy is available to the PRIMARY consumers?', ['5,000 kcal', '500 kcal', '45,000 kcal', '50,000 kcal'], '50,000 × 0.10 = 5,000 kcal.'],
    ['In grass → rabbit → fox, the fox receives 30 kcal. How much energy did the grass contain?', ['3,000 kcal', '300 kcal', '30,000 kcal', '3 kcal'], '30 × 10 = 300 (rabbit) → × 10 = 3,000 kcal (grass).'],
    ['A hawk (tertiary consumer) gets 6 kcal from its food. How much energy was in the producer level?', ['6,000 kcal', '600 kcal', '60 kcal', '60,000 kcal'], '6 → 60 → 600 → 6,000 kcal.'],
    ['In grass → mouse → snake → hawk, the grass has 10,000 kcal. How much reaches the hawk?', ['10 kcal', '100 kcal', '1,000 kcal', '1 kcal'], '10,000 → 1,000 → 100 → 10 kcal.'],
    ['To find the energy at the NEXT LEVEL UP, you…', ['Multiply by 0.10 (move the decimal one place left)', 'Multiply by 10', 'Divide by 0.10', 'Subtract 10'], 'Going up keeps only 10%, so multiply by 0.10.'],
    ['To find the energy at the LEVEL BELOW, you…', ['Divide by 0.10 (the same as multiplying by 10)', 'Multiply by 0.10', 'Subtract 90', 'Divide by 100'], 'Going down, each level has 10 times more energy.'],
    ['Primary consumers have 2,500 kcal. How much energy did the producers have?', ['25,000 kcal', '250 kcal', '2,750 kcal', '250,000 kcal'], '2,500 × 10 = 25,000 kcal.'],
    ['Producers capture 80,000 kcal. How much energy reaches the TERTIARY consumers?', ['80 kcal', '800 kcal', '8,000 kcal', '8 kcal'], '80,000 → 8,000 → 800 → 80 kcal (3 steps up).'],
    ['Secondary consumers receive 400 kcal. How much energy did the primary consumers have?', ['4,000 kcal', '40 kcal', '440 kcal', '40,000 kcal'], 'One level down: 400 × 10 = 4,000 kcal.'],
    ['A trophic level has 1,000 kcal. About how much of that is used or lost as heat instead of being passed up?', ['About 900 kcal', 'About 100 kcal', 'About 10 kcal', 'All 1,000 kcal'], 'About 90% (900 kcal) is used or lost. About 10% (100 kcal) moves up.'],
    ['Phytoplankton capture 200,000 kcal. In phytoplankton → krill → herring, how much reaches the herring?', ['2,000 kcal', '20,000 kcal', '200 kcal', '180,000 kcal'], '200,000 → 20,000 (krill) → 2,000 kcal (herring).'],
    ['A trophic level has 70 kcal. About how much energy is available to the next level up?', ['7 kcal', '63 kcal', '700 kcal', '0.7 kcal'], '70 × 0.10 = 7 kcal.'],
    ['A snake (tertiary consumer) receives 15 kcal. How much energy was in the primary consumer level?', ['1,500 kcal', '150 kcal', '15,000 kcal', '1.5 kcal'], 'Snake (4th) 15 → secondary (3rd) 150 → primary (2nd) 1,500 kcal.'],

    // ---- Where the 90% goes, energy vs matter ----
    ['What happens to most (about 90%) of the energy at each trophic level?', ['It is used for life processes or lost as heat', 'It is stored in the top predator forever', 'It is recycled back to the producers', 'It is passed on to the next level'], 'About 90% is used for movement, growth, reproduction and other life processes, or lost as heat.'],
    ['Energy flows ______ through an ecosystem, while matter ______.', ['one way; cycles', 'in a cycle; flows one way', 'one way; also flows one way', 'in a cycle; also cycles'], 'Energy enters as sunlight and leaves as heat. Matter is recycled.'],
    ['Why must energy be constantly resupplied to an ecosystem by the Sun?', ['Energy is lost as heat at every step and cannot be recycled', 'Producers eat the Sun\'s energy', 'Matter is destroyed at each level', 'Consumers make new energy'], 'Energy flows one way and leaves as heat, so the Sun must keep supplying it.'],
    ['Energy leaves an ecosystem mainly as…', ['Heat', 'Glucose', 'Oxygen', 'Soil'], 'Energy enters as sunlight and leaves as heat.'],
    ['Which is an example of energy being USED UP instead of passed to the next level?', ['A hawk flapping its wings to fly', 'Energy stored in a mouse\'s muscles when a snake eats it', 'Energy stored in grass leaves eaten by a cricket', 'Energy in krill eaten by a herring'], 'Movement uses energy — it is not stored for the next level.'],
    ['Which energy actually gets PASSED UP to the next trophic level?', ['Energy stored in body tissue that gets eaten', 'Body heat given off to the air', 'Energy used for running', 'Energy in fur and bones passed out as waste'], 'Only energy stored in the organism\'s body moves up when it is eaten.'],
    ['A snake cannot digest a mouse\'s fur and bones, so they pass out as waste. That energy…', ['Is not passed up to the snake — it goes to decomposers', 'Is passed up to the snake', 'Goes back to the Sun', 'Is turned into sunlight'], 'Waste is not absorbed by the consumer, so it is not passed up.'],
    ['Which process releases heat inside every living cell?', ['Cellular respiration', 'Photosynthesis', 'Chemosynthesis', 'Decomposition of rocks'], 'Cellular respiration releases usable energy and some heat.'],

    // ---- Ecological pyramids ----
    ['Which ecological pyramid shows the total amount of living tissue at each trophic level?', ['Biomass pyramid', 'Energy pyramid', 'Pyramid of numbers', 'Food web'], 'Biomass = the total amount of living tissue in a trophic level.'],
    ['An energy pyramid shows…', ['The amount of energy available at each trophic level', 'The number of organisms at each level', 'The mass of living tissue at each level', 'How water cycles in an ecosystem'], 'An energy pyramid shows energy at each level — only about 10% moves up.'],
    ['A pyramid of numbers shows…', ['The number of individual organisms at each trophic level', 'The energy at each trophic level', 'The mass of living tissue at each level', 'The temperature at each level'], 'It counts individuals at each level.'],
    ['Biomass is measured in…', ['Grams per unit area', 'Kilocalories per organism', 'Number of individuals', 'Degrees Celsius'], 'Biomass is the mass of living tissue per area (for example, g/m²).'],
    ['In a biomass pyramid, where is the greatest mass found?', ['At the base, with the producers', 'At the top, with the top predators', 'In the middle levels', 'It is the same at every level'], 'Most of the mass of living things is producers.'],
    ['Why are there far fewer hawks than mice in a meadow?', ['Only about 10% of the mice\'s energy reaches the hawks, so there is only enough energy for a few hawks', 'Hawks reproduce faster than mice', 'Hawks do not need energy to survive', 'Mice get their energy from the hawks'], 'Energy shrinks at every step up, so the top can support only a few individuals.'],
    ['Why do food chains rarely have more than 4 or 5 trophic levels?', ['There is not enough energy left at the top to support another level', 'Animals cannot eat more than 4 kinds of food', 'Producers stop growing after 5 levels', 'Decomposers eat the top level'], 'After 4–5 steps of losing ~90%, too little energy remains.'],
    ['What are the three kinds of ecological pyramids?', ['Energy, biomass and numbers', 'Energy, water and carbon', 'Food chain, food web and cycle', 'Producers, consumers and decomposers'], 'The three ecological pyramids show energy, biomass and numbers.'],
    ['A pyramid of numbers usually…', ['Has the same shape as the energy and biomass pyramids — more producers, fewer consumers', 'Is upside down — more consumers than producers', 'Has the same number at every level', 'Only shows decomposers'], 'Usually there are many producers and fewer consumers at each level up.'],
    ['If all of the producers in an ecosystem were destroyed, what would happen?', ['Every level above them would lose its energy supply', 'Only the top predators would be affected', 'Nothing would change', 'Consumers would start making their own food'], 'Every consumer depends on energy that producers capture.'],
    ['Which trophic level in an energy pyramid has the LEAST energy?', ['The top level (top predators)', 'The producers', 'The primary consumers', 'All levels have the same energy'], 'Energy decreases at every step, so the top has the least.'],
    ['Which trophic level in an energy pyramid has the MOST energy?', ['The producers at the base', 'The top predators', 'The secondary consumers', 'The decomposers only'], 'Producers capture the energy that every other level depends on.']
  ];

  const PER_QUIZ = 20;
  let s = null;
  function pickQuestions() {
    let seen = store.get('quizSeen', []);
    let fresh = BANK.map((_, i) => i).filter(i => !seen.includes(i));
    if (fresh.length < PER_QUIZ) { seen = []; fresh = BANK.map((_, i) => i); }
    const chosen = shuffle(fresh).slice(0, PER_QUIZ);
    store.set('quizSeen', seen.concat(chosen));
    return chosen;
  }
  function startScreen() {
    const st = store.get('quizStats', { attempts: 0, best: null });
    $('#quizBox').innerHTML = `<h3>Ready?</h3><p>Each quiz pulls <b>${PER_QUIZ} random questions</b> from a bank of <b>${BANK.length}</b>. Take it as many times as you want — you'll get new questions each time until you've seen them all.</p>
      ${st.attempts ? `<p class="muted">Quizzes taken: <b>${st.attempts}</b> · Best score: <b>${st.best}/${PER_QUIZ}</b></p>` : ''}
      <div class="row" style="margin-top:12px"><button class="btn sun big" id="qStart">Start quiz →</button></div>`;
    $('#qStart').onclick = begin;
  }
  function begin() {
    s = { qs: pickQuestions().map(i => ({ b: BANK[i], order: shuffle([0, 1, 2, 3]) })), ans: {}, cur: 0 };
    show();
  }
  function show() {
    const n = s.qs.length, q = s.qs[s.cur], a = s.ans[s.cur], answered = Object.keys(s.ans).length;
    $('#quizBox').innerHTML = `<div class="row" style="justify-content:space-between"><b>Question ${s.cur + 1} of ${n}</b><span class="muted small">${answered} answered</span></div><div class="qprog"><i style="width:${answered / n * 100}%"></i></div>
      <p class="qtext">${q.b[0]}</p><div class="opts">${q.order.map(k => `<button class="opt ${a === k ? 'sel' : ''}" data-k="${k}">${q.b[1][k]}</button>`).join('')}</div>
      <div class="lesson-nav"><button class="btn ghost" id="qPrev" ${s.cur === 0 ? 'disabled' : ''}>← Back</button>${s.cur < n - 1 ? `<button class="btn" id="qNext" ${a == null ? 'disabled' : ''}>Next →</button>` : `<button class="btn sun" id="qSubmit" ${answered < n ? 'disabled' : ''}>Finish &amp; see answers ✓</button>`}</div>
      ${s.cur === n - 1 && answered < n ? `<p class="small muted" style="text-align:right">Answer every question to finish (${n - answered} left).</p>` : ''}`;
    $$('#quizBox .opt').forEach(b => b.onclick = () => { s.ans[s.cur] = +b.dataset.k; show(); if (s.cur < n - 1) setTimeout(() => { s.cur++; show(); }, 220); });
    $('#qPrev').onclick = () => { s.cur--; show(); };
    const nx = $('#qNext'); if (nx) nx.onclick = () => { s.cur++; show(); };
    const sb = $('#qSubmit'); if (sb) sb.onclick = finish;
  }
  function finish() {
    const n = s.qs.length; let right = 0;
    s.qs.forEach((q, k) => { if (s.ans[k] === 0) right++; });
    const pct = Math.round(right / n * 100);
    const st = store.get('quizStats', { attempts: 0, best: null });
    const newBest = st.best == null || right > st.best;
    st.attempts++; st.best = newBest ? right : st.best; store.set('quizStats', st);
    markDone('quiz'); addXP(right * 5, 'quiz');
    $('#quizBox').innerHTML = `<div class="end-card"><div class="score-big">${right}/${n}</div><p style="font-size:1.2rem;font-weight:600">${pct}% — ${pct >= 90 ? '🌟 Excellent!' : pct >= 75 ? '👍 Good job!' : pct >= 60 ? '📘 Getting there — check the answers below.' : '💪 Review the answers below and try a new quiz.'}</p>
      ${newBest && st.attempts > 1 ? '<p><b>🏆 New best score!</b></p>' : ''}<p class="small muted">Quizzes taken: ${st.attempts} · Best: ${st.best}/${n}</p>
      <div class="row" style="justify-content:center"><button class="btn sun big" id="qNew">↻ New quiz (20 new questions)</button></div></div>
      <div class="review"><h3>Answers</h3>${s.qs.map((q, k) => { const ok = s.ans[k] === 0; return `<div class="rv ${ok ? 'ok' : 'no'}"><b>${k + 1}. ${q.b[0]}</b><br>${ok ? '✅' : '❌'} Your answer: ${q.b[1][s.ans[k]]}${ok ? '' : `<br>✔️ Correct answer: <b>${q.b[1][0]}</b>`}<br><span class="muted">${q.b[2]}</span></div>`; }).join('')}</div>
      <div class="row" style="justify-content:center;margin-top:14px"><button class="btn sun" id="qNew2">↻ New quiz</button></div>`;
    $('#qNew').onclick = begin; $('#qNew2').onclick = begin;
    $('#quizBox').scrollIntoView({ block: 'start' });
  }
  return { init: startScreen, size: BANK.length };
})();
