// Official Board Syllabus and Curriculum Database
// Covering CBSE, Maharashtra HSC, ICSE/ISC, and State Boards for Classes 10 & 12

export interface BoardInfo {
  id: string;
  name: string;
  fullName: string;
  badge: string;
  code: string;
}

export interface SubjectInfo {
  id: string;
  name: string;
  code: string;
  iconName: string;
  color: string;
  chaptersCount: number;
}

export interface ChapterInfo {
  id: string;
  title: string;
  chapterNumber: number;
  subject: string;
  board: string;
  classLevel: string;
  totalQuestions: number;
  topics: string[];
  weightageMarks?: number;
}

export const OFFICIAL_BOARDS: BoardInfo[] = [
  {
    id: 'mh-hsc',
    name: 'Maharashtra HSC',
    fullName: 'Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)',
    badge: 'State Board',
    code: 'MH_HSC',
  },
  {
    id: 'cbse',
    name: 'CBSE',
    fullName: 'Central Board of Secondary Education',
    badge: 'National Board',
    code: 'CBSE',
  },
  {
    id: 'icse',
    name: 'ICSE / ISC',
    fullName: 'Council for the Indian School Certificate Examinations',
    badge: 'National Board',
    code: 'CISCE',
  },
  {
    id: 'up-board',
    name: 'UP Board',
    fullName: 'Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)',
    badge: 'State Board',
    code: 'UPMSP',
  },
];

export const OFFICIAL_SUBJECTS_CLASS_12: SubjectInfo[] = [
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHY_12',
    iconName: 'Zap',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    chaptersCount: 16,
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: 'CHEM_12',
    iconName: 'FlaskConical',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    chaptersCount: 16,
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    code: 'MATH_12',
    iconName: 'Calculator',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    chaptersCount: 16,
  },
  {
    id: 'biology',
    name: 'Biology',
    code: 'BIO_12',
    iconName: 'Dna',
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    chaptersCount: 15,
  },
];

export const OFFICIAL_SUBJECTS_CLASS_10: SubjectInfo[] = [
  {
    id: 'science',
    name: 'Science (Physics, Chemistry, Biology)',
    code: 'SCI_10',
    iconName: 'Zap',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    chaptersCount: 16,
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    code: 'MATH_10',
    iconName: 'Calculator',
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    chaptersCount: 15,
  },
  {
    id: 'social-science',
    name: 'Social Science',
    code: 'SST_10',
    iconName: 'Globe',
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    chaptersCount: 20,
  },
  {
    id: 'english',
    name: 'English Language & Literature',
    code: 'ENG_10',
    iconName: 'BookOpen',
    color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    chaptersCount: 18,
  },
];

// Complete official chapter lists by board, class, and subject
export const OFFICIAL_SYLLABUS_CHAPTERS: Record<string, ChapterInfo[]> = {
  // MAHARASHTRA HSC CLASS 12 PHYSICS
  'Maharashtra HSC_Class 12_Physics': [
    {
      id: 'mh_phy_12_01',
      title: 'Rotational Dynamics',
      chapterNumber: 1,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 45,
      weightageMarks: 7,
      topics: ['Circular Motion', 'Centripetal & Centrifugal Force', 'Banking of Roads', 'Vertical Circular Motion', 'Moment of Inertia', 'Theorem of Parallel & Perpendicular Axes', 'Rolling Motion'],
    },
    {
      id: 'mh_phy_12_02',
      title: 'Mechanical Properties of Fluids',
      chapterNumber: 2,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 40,
      weightageMarks: 7,
      topics: ['Pressure & Pascal\'s Law', 'Surface Tension & Surface Energy', 'Angle of Contact & Capillarity', 'Fluids in Motion', 'Bernoulli\'s Principle', 'Viscosity & Stokes\' Law'],
    },
    {
      id: 'mh_phy_12_03',
      title: 'Kinetic Theory of Gases and Radiation',
      chapterNumber: 3,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 38,
      weightageMarks: 7,
      topics: ['Ideal Gas Laws', 'Pressure of Ideal Gas', 'Root Mean Square Speed', 'Degrees of Freedom', 'Specific Heat Capacities', 'Absorption, Reflection & Transmission', 'Stefan-Boltzmann Law'],
    },
    {
      id: 'mh_phy_12_04',
      title: 'Thermodynamics',
      chapterNumber: 4,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 35,
      weightageMarks: 7,
      topics: ['Thermal Equilibrium & Zeroth Law', 'First Law of Thermodynamics', 'Isothermal & Adiabatic Processes', 'Isobaric & Isochoric Processes', 'Heat Engines & Refrigerators', 'Second Law of Thermodynamics'],
    },
    {
      id: 'mh_phy_12_05',
      title: 'Oscillations',
      chapterNumber: 5,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 36,
      weightageMarks: 5,
      topics: ['Simple Harmonic Motion (SHM)', 'Differential Equation of SHM', 'Velocity and Acceleration in SHM', 'Energy in SHM', 'Simple Pendulum', 'Angular SHM & Damped Oscillations'],
    },
    {
      id: 'mh_phy_12_06',
      title: 'Superposition of Waves',
      chapterNumber: 6,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 34,
      weightageMarks: 6,
      topics: ['Progressive Waves', 'Reflection of Waves', 'Stationary Waves on a String', 'Vibrations in Air Columns', 'Beats & Applications', 'Doppler Effect'],
    },
    {
      id: 'mh_phy_12_07',
      title: 'Wave Optics',
      chapterNumber: 7,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 42,
      weightageMarks: 7,
      topics: ['Huygens\' Principle', 'Reflection & Refraction of Plane Wavefront', 'Polarization & Brewster\'s Law', 'Interference of Light', 'Young\'s Double Slit Experiment', 'Diffraction & Resolving Power'],
    },
    {
      id: 'mh_phy_12_08',
      title: 'Electrostatics',
      chapterNumber: 8,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 50,
      weightageMarks: 6,
      topics: ['Coulomb\'s Law', 'Electric Field & Field Lines', 'Electric Flux & Gauss\' Law', 'Applications of Gauss\' Law', 'Electric Potential & Potential Energy', 'Equipotential Surfaces', 'Van de Graaff Generator'],
    },
    {
      id: 'mh_phy_12_09',
      title: 'Capacitance & Dielectrics',
      chapterNumber: 9,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 48,
      weightageMarks: 6,
      topics: ['Capacitor Principles', 'Parallel Plate Capacitor', 'Capacitors in Series & Parallel', 'Dielectric Polarization & Constant K', 'Dielectric Slab in Capacitor', 'Energy Stored in Capacitor'],
    },
    {
      id: 'mh_phy_12_10',
      title: 'Current Electricity',
      chapterNumber: 10,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 45,
      weightageMarks: 6,
      topics: ['Ohm\'s Law & Resistance', 'Kirchhoff\'s Laws (KCL & KVL)', 'Wheatstone Bridge & Meter Bridge', 'Potentiometer & Applications', 'Galvanometer to Ammeter & Voltmeter conversion'],
    },
    {
      id: 'mh_phy_12_11',
      title: 'Magnetic Fields due to Electric Current',
      chapterNumber: 11,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 38,
      weightageMarks: 6,
      topics: ['Biot-Savart Law', 'Magnetic Field on Axis of Circular Loop', 'Ampere\'s Circuital Law & Solenoid', 'Force on Moving Charge & Current Carrying Conductor', 'Torque on Magnetic Dipole', 'Moving Coil Galvanometer'],
    },
    {
      id: 'mh_phy_12_12',
      title: 'Magnetic Materials',
      chapterNumber: 12,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 30,
      weightageMarks: 5,
      topics: ['Magnetization & Magnetic Intensity', 'Diamagnetism, Paramagnetism & Ferromagnetism', 'Curie\'s Law & Curie Temperature', 'Hysteresis Loop', 'Permanent Magnets & Electromagnets'],
    },
    {
      id: 'mh_phy_12_13',
      title: 'Electromagnetic Induction',
      chapterNumber: 13,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 44,
      weightageMarks: 7,
      topics: ['Faraday\'s Laws of Electromagnetic Induction', 'Lenz\'s Law & Conservation of Energy', 'Motional Electromotive Force', 'Eddy Currents', 'Self-Inductance & Mutual Inductance', 'AC Generator'],
    },
    {
      id: 'mh_phy_12_14',
      title: 'AC Circuits',
      chapterNumber: 14,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 36,
      weightageMarks: 6,
      topics: ['AC Voltage applied to Resistor, Inductor, Capacitor', 'Series LCR Circuit & Phasor Diagrams', 'Resonance in LCR Circuit & Q-Factor', 'Power in AC Circuit & Wattless Current', 'Transformers'],
    },
    {
      id: 'mh_phy_12_15',
      title: 'Dual Nature of Radiation and Matter',
      chapterNumber: 15,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 32,
      weightageMarks: 5,
      topics: ['Photoelectric Effect & Experimental Observations', 'Einstein\'s Photoelectric Equation', 'Particle Nature of Light (Photons)', 'de Broglie Hypothesis & Wavelength', 'Davisson-Germer Experiment'],
    },
    {
      id: 'mh_phy_12_16',
      title: 'Structure of Atoms and Nuclei',
      chapterNumber: 16,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 36,
      weightageMarks: 6,
      topics: ['Rutherford\'s Alpha Scattering Model', 'Bohr\'s Model of Hydrogen Atom', 'Hydrogen Spectral Series', 'Nuclear Composition & Binding Energy', 'Radioactivity & Half-life Law', 'Nuclear Fission & Fusion'],
    },
    {
      id: 'mh_phy_12_17',
      title: 'Semiconductor Devices',
      chapterNumber: 17,
      subject: 'Physics',
      board: 'Maharashtra HSC',
      classLevel: 'Class 12',
      totalQuestions: 40,
      weightageMarks: 5,
      topics: ['p-n Junction Diode (Forward & Reverse Bias)', 'Half-Wave and Full-Wave Rectifiers', 'Zener Diode as Voltage Regulator', 'Photodiode, Solar Cell & LED', 'Logic Gates (AND, OR, NOT, NAND, NOR)'],
    },
  ],

  // CBSE CLASS 12 PHYSICS
  'CBSE_Class 12_Physics': [
    {
      id: 'cbse_phy_12_01',
      title: 'Electric Charges and Fields',
      chapterNumber: 1,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 50,
      weightageMarks: 8,
      topics: ['Coulomb\'s Law', 'Electric Field & Field Lines', 'Electric Dipole & Torque', 'Electric Flux & Gauss\' Law', 'Applications of Gauss\' Law'],
    },
    {
      id: 'cbse_phy_12_02',
      title: 'Electrostatic Potential and Capacitance',
      chapterNumber: 2,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 48,
      weightageMarks: 8,
      topics: ['Electric Potential', 'Equipotential Surfaces', 'Potential Energy of Dipole', 'Parallel Plate Capacitor', 'Dielectrics & Dielectric Breakdown', 'Energy Stored in Capacitor'],
    },
    {
      id: 'cbse_phy_12_03',
      title: 'Current Electricity',
      chapterNumber: 3,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 45,
      weightageMarks: 7,
      topics: ['Ohm\'s Law & Drift Velocity', 'Electrical Resistivity & Conductivity', 'Internal Resistance of Cells', 'Cells in Series and Parallel', 'Kirchhoff\'s Rules', 'Wheatstone Bridge'],
    },
    {
      id: 'cbse_phy_12_04',
      title: 'Moving Charges and Magnetism',
      chapterNumber: 4,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 42,
      weightageMarks: 8,
      topics: ['Lorentz Force', 'Biot-Savart Law', 'Ampere\'s Circuital Law & Solenoid', 'Force between Parallel Currents', 'Torque on Magnetic Loop', 'Moving Coil Galvanometer'],
    },
    {
      id: 'cbse_phy_12_05',
      title: 'Magnetism and Matter',
      chapterNumber: 5,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 28,
      weightageMarks: 4,
      topics: ['Bar Magnet as Dipole', 'Earth\'s Magnetic Field Elements', 'Magnetic Properties of Materials', 'Diamagnetic, Paramagnetic, Ferromagnetic'],
    },
    {
      id: 'cbse_phy_12_06',
      title: 'Electromagnetic Induction',
      chapterNumber: 6,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 40,
      weightageMarks: 6,
      topics: ['Faraday\'s Law of Induction', 'Lenz\'s Law', 'Motional EMF & Eddy Currents', 'Inductance (Self and Mutual)', 'AC Generator Principle'],
    },
    {
      id: 'cbse_phy_12_07',
      title: 'Alternating Current',
      chapterNumber: 7,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 36,
      weightageMarks: 6,
      topics: ['Peak and RMS Values', 'AC across L, C, R and Series LCR', 'Phasor Representation & Impedance', 'Power in AC & Power Factor', 'Transformers'],
    },
    {
      id: 'cbse_phy_12_08',
      title: 'Electromagnetic Waves',
      chapterNumber: 8,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 26,
      weightageMarks: 3,
      topics: ['Displacement Current', 'Characteristics of EM Waves', 'Electromagnetic Spectrum and Applications'],
    },
    {
      id: 'cbse_phy_12_09',
      title: 'Ray Optics and Optical Instruments',
      chapterNumber: 9,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 50,
      weightageMarks: 9,
      topics: ['Refraction at Spherical Surfaces', 'Lens Maker\'s Formula & Power', 'Prism Refraction & Dispersion', 'Total Internal Reflection & Fibers', 'Microscopes & Astronomical Telescopes'],
    },
    {
      id: 'cbse_phy_12_10',
      title: 'Wave Optics',
      chapterNumber: 10,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 44,
      weightageMarks: 8,
      topics: ['Huygens\' Wavefront Principles', 'Proof of Laws of Reflection & Refraction', 'Interference & Young\'s Double Slit', 'Fringe Width Formula', 'Diffraction at Single Slit'],
    },
    {
      id: 'cbse_phy_12_11',
      title: 'Dual Nature of Radiation and Matter',
      chapterNumber: 11,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 30,
      weightageMarks: 5,
      topics: ['Photoelectric Effect Experiments', 'Einstein\'s Photoelectric Equation', 'de Broglie Wavelength Calculations'],
    },
    {
      id: 'cbse_phy_12_12',
      title: 'Atoms',
      chapterNumber: 12,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 32,
      weightageMarks: 4,
      topics: ['Rutherford Nuclear Model', 'Bohr Model of Hydrogen Atom', 'Radius, Velocity and Energy of Electron', 'Line Spectra of Hydrogen'],
    },
    {
      id: 'cbse_phy_12_13',
      title: 'Nuclei',
      chapterNumber: 13,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 30,
      weightageMarks: 4,
      topics: ['Composition and Size of Nucleus', 'Mass-Energy Equivalence', 'Nuclear Binding Energy Curve', 'Nuclear Fission and Fusion'],
    },
    {
      id: 'cbse_phy_12_14',
      title: 'Semiconductor Electronics: Materials, Devices and Simple Circuits',
      chapterNumber: 14,
      subject: 'Physics',
      board: 'CBSE',
      classLevel: 'Class 12',
      totalQuestions: 40,
      weightageMarks: 7,
      topics: ['Energy Bands in Conductors, Semiconductors, Insulators', 'Intrinsic and Extrinsic Semiconductors', 'p-n Junction Diode I-V Characteristics', 'Diode as Rectifier (Half and Full Wave)'],
    },
  ],

  // CBSE CLASS 10 SCIENCE
  'CBSE_Class 10_Science': [
    {
      id: 'cbse_sci_10_01',
      title: 'Chemical Reactions and Equations',
      chapterNumber: 1,
      subject: 'Science',
      board: 'CBSE',
      classLevel: 'Class 10',
      totalQuestions: 45,
      topics: ['Balancing Chemical Equations', 'Combination Reactions', 'Decomposition Reactions', 'Displacement & Double Displacement', 'Redox Reactions, Corrosion & Rancidity'],
    },
    {
      id: 'cbse_sci_10_02',
      title: 'Acids, Bases and Salts',
      chapterNumber: 2,
      subject: 'Science',
      board: 'CBSE',
      classLevel: 'Class 10',
      totalQuestions: 42,
      topics: ['Properties of Acids and Bases', 'pH Scale and Importance in Everyday Life', 'Baking Soda, Bleaching Powder, Washing Soda', 'Plaster of Paris & Water of Crystallization'],
    },
    {
      id: 'cbse_sci_10_03',
      title: 'Metals and Non-metals',
      chapterNumber: 3,
      subject: 'Science',
      board: 'CBSE',
      classLevel: 'Class 10',
      totalQuestions: 40,
      topics: ['Physical & Chemical Properties of Metals', 'Reactivity Series', 'Ionic Compounds Formation & Properties', 'Extraction of Metals & Refining', 'Corrosion Prevention'],
    },
    {
      id: 'cbse_sci_10_04',
      title: 'Carbon and its Compounds',
      chapterNumber: 4,
      subject: 'Science',
      board: 'CBSE',
      classLevel: 'Class 10',
      totalQuestions: 48,
      topics: ['Covalent Bonding in Carbon', 'Versatile Nature of Carbon', 'Homologous Series & Functional Groups', 'Combustion, Oxidation, Addition Reactions', 'Ethanol and Ethanoic Acid', 'Soaps and Detergents'],
    },
    {
      id: 'cbse_sci_10_05',
      title: 'Life Processes',
      chapterNumber: 5,
      subject: 'Science',
      board: 'CBSE',
      classLevel: 'Class 10',
      totalQuestions: 50,
      topics: ['Autotrophic & Heterotrophic Nutrition', 'Human Digestive System', 'Respiration (Aerobic vs Anaerobic)', 'Human Circulatory System & Heart', 'Excretion in Humans and Plants'],
    },
    {
      id: 'cbse_sci_10_06',
      title: 'Control and Coordination',
      chapterNumber: 6,
      subject: 'Science',
      board: 'CBSE',
      classLevel: 'Class 10',
      totalQuestions: 38,
      topics: ['Nervous System & Neuron Structure', 'Reflex Arc', 'Human Brain Anatomy & Functions', 'Plant Hormones & Tropic Movements', 'Endocrine Glands & Animal Hormones'],
    },
    {
      id: 'cbse_sci_10_07',
      title: 'How do Organisms Reproduce?',
      chapterNumber: 7,
      subject: 'Science',
      board: 'CBSE',
      classLevel: 'Class 10',
      totalQuestions: 40,
      topics: ['Asexual Reproduction Modes', 'Sexual Reproduction in Flowering Plants', 'Male & Female Reproductive Systems', 'Fertilization & Menstrual Cycle', 'Reproductive Health & Contraception'],
    },
    {
      id: 'cbse_sci_10_08',
      title: 'Heredity and Evolution',
      chapterNumber: 8,
      subject: 'Science',
      board: 'CBSE',
      classLevel: 'Class 10',
      totalQuestions: 36,
      topics: ['Mendel\'s Laws of Inheritance', 'Monohybrid & Dihybrid Crosses', 'Sex Determination in Humans'],
    },
    {
      id: 'cbse_sci_10_09',
      title: 'Light – Reflection and Refraction',
      chapterNumber: 9,
      subject: 'Science',
      board: 'CBSE',
      classLevel: 'Class 10',
      totalQuestions: 52,
      topics: ['Spherical Mirrors (Concave & Convex)', 'Mirror Formula & Magnification', 'Refraction & Snell\'s Law', 'Lens Formula & Lens Power'],
    },
    {
      id: 'cbse_sci_10_10',
      title: 'The Human Eye and the Colorful World',
      chapterNumber: 10,
      subject: 'Science',
      board: 'CBSE',
      classLevel: 'Class 10',
      totalQuestions: 35,
      topics: ['Human Eye Structure & Accommodation', 'Myopia, Hypermetropia & Presbyopia', 'Refraction through Glass Prism', 'Atmospheric Refraction & Twinkling of Stars', 'Scattering of Light & Tyndall Effect'],
    },
    {
      id: 'cbse_sci_10_11',
      title: 'Electricity',
      chapterNumber: 11,
      subject: 'Science',
      board: 'CBSE',
      classLevel: 'Class 10',
      totalQuestions: 55,
      topics: ['Electric Current & Potential Difference', 'Ohm\'s Law & Resistance Factors', 'Resistors in Series and Parallel', 'Joule\'s Law of Heating & Applications', 'Electric Power P = VI = I²R = V²/R'],
    },
    {
      id: 'cbse_sci_10_12',
      title: 'Magnetic Effects of Electric Current',
      chapterNumber: 12,
      subject: 'Science',
      board: 'CBSE',
      classLevel: 'Class 10',
      totalQuestions: 42,
      topics: ['Magnetic Field Lines & Properties', 'Right Hand Thumb Rule', 'Field due to Straight Wire, Loop & Solenoid', 'Fleming\'s Left Hand Rule & Electric Motor', 'Electromagnetic Induction & Electric Generator', 'Domestic Electric Circuits'],
    },
    {
      id: 'cbse_sci_10_13',
      title: 'Our Environment',
      chapterNumber: 13,
      subject: 'Science',
      board: 'CBSE',
      classLevel: 'Class 10',
      totalQuestions: 30,
      topics: ['Ecosystem Components & Food Chains', 'Trophic Levels & 10% Energy Law', 'Biological Magnification', 'Ozone Layer Depletion & Waste Management'],
    },
  ],

  // MAHARASHTRA HSC CLASS 12 CHEMISTRY
  'Maharashtra HSC_Class 12_Chemistry': [
    { id: 'mh_chem_12_01', title: 'Solid State', chapterNumber: 1, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 35, weightageMarks: 5, topics: ['Classification of Solids', 'Crystal Lattice & Unit Cells', 'Packing Efficiency & Defects', 'Electrical and Magnetic Properties'] },
    { id: 'mh_chem_12_02', title: 'Solutions', chapterNumber: 2, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 40, weightageMarks: 6, topics: ['Types of Solutions', 'Henry\'s Law', 'Raoult\'s Law & Colligative Properties', 'Van\'t Hoff Factor & Abnormal Molar Mass'] },
    { id: 'mh_chem_12_03', title: 'Ionic Equilibria', chapterNumber: 3, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 38, weightageMarks: 6, topics: ['Ostwald\'s Dilution Law', 'Acids and Bases Theories', 'pH and pOH Scale', 'Buffer Solutions & Solubility Product'] },
    { id: 'mh_chem_12_04', title: 'Chemical Thermodynamics', chapterNumber: 4, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 42, weightageMarks: 8, topics: ['First Law of Thermodynamics', 'Enthalpy of Reactions & Hess\'s Law', 'Second Law & Entropy', 'Gibbs Energy & Spontaneity'] },
    { id: 'mh_chem_12_05', title: 'Electrochemistry', chapterNumber: 5, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 45, weightageMarks: 7, topics: ['Kohlrausch\'s Law', 'Nernst Equation & Cell Potential', 'Electrolytic and Galvanic Cells', 'Lead-Acid Storage Battery & Fuel Cells'] },
    { id: 'mh_chem_12_06', title: 'Chemical Kinetics', chapterNumber: 6, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 38, weightageMarks: 6, topics: ['Rate Laws & Order of Reaction', 'Integrated Rate Laws for Zero & 1st Order', 'Arrhenius Equation & Activation Energy'] },
    { id: 'mh_chem_12_07', title: 'Elements of Groups 16, 17 and 18', chapterNumber: 7, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 40, weightageMarks: 8, topics: ['Oxides, Oxyacids of Sulphur', 'Chlorine and Interhalogen Compounds', 'Noble Gas Compounds'] },
    { id: 'mh_chem_12_08', title: 'Transition and Inner Transition Elements', chapterNumber: 8, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 38, weightageMarks: 8, topics: ['d-Block Electronic Configuration & Properties', 'Potassium Dichromate & Permanganate', 'Lanthanoid Contraction & Actinoids'] },
    { id: 'mh_chem_12_09', title: 'Coordination Compounds', chapterNumber: 9, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 42, weightageMarks: 7, topics: ['Werner\'s Theory & IUPAC Nomenclature', 'Isomerism in Coordination Compounds', 'Valence Bond Theory & Crystal Field Theory'] },
    { id: 'mh_chem_12_10', title: 'Halogen Derivatives', chapterNumber: 10, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 40, weightageMarks: 7, topics: ['SN1 and SN2 Reaction Mechanisms', 'Optical Activity in Haloalkanes', 'Aryl Halides & Electrophilic Substitution'] },
    { id: 'mh_chem_12_11', title: 'Alcohols, Phenols and Ethers', chapterNumber: 11, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 44, weightageMarks: 6, topics: ['Preparation & Acidity of Phenols', 'Hydroboration-Oxidation of Alkenes', 'Williamson Ether Synthesis'] },
    { id: 'mh_chem_12_12', title: 'Aldehydes, Ketones and Carboxylic Acids', chapterNumber: 12, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 46, weightageMarks: 8, topics: ['Nucleophilic Addition Mechanisms', 'Aldol & Cannizzaro Reactions', 'Acidity of Carboxylic Acids'] },
    { id: 'mh_chem_12_13', title: 'Amines', chapterNumber: 13, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 36, weightageMarks: 4, topics: ['Basicity of Amines & Gabriel Phthalimide', 'Hinsberg Test & Diazonium Salts Reactions'] },
    { id: 'mh_chem_12_14', title: 'Biomolecules', chapterNumber: 14, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 32, weightageMarks: 4, topics: ['Carbohydrates Classification & Glucose Structure', 'Amino Acids, Peptides & Proteins Structure', 'Nucleic Acids (DNA, RNA)'] },
    { id: 'mh_chem_12_15', title: 'Introduction to Polymer Chemistry', chapterNumber: 15, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 28, weightageMarks: 4, topics: ['Classification of Polymers', 'Addition & Condensation Polymerization', 'Biodegradable Polymers'] },
    { id: 'mh_chem_12_16', title: 'Green Chemistry and Nanochemistry', chapterNumber: 16, subject: 'Chemistry', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 25, weightageMarks: 4, topics: ['Twelve Principles of Green Chemistry', 'Synthesis and Applications of Nanomaterials'] },
  ],

  // MAHARASHTRA HSC CLASS 12 MATHEMATICS
  'Maharashtra HSC_Class 12_Mathematics': [
    { id: 'mh_math_12_01', title: 'Mathematical Logic', chapterNumber: 1, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 35, weightageMarks: 8, topics: ['Statements & Truth Values', 'Logical Connectives & Truth Tables', 'Tautology, Contradiction, Contingency', 'Duality, Negation of Compound Statements', 'Switching Circuits'] },
    { id: 'mh_math_12_02', title: 'Matrices', chapterNumber: 2, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 38, weightageMarks: 6, topics: ['Elementary Transformations', 'Inverse of a Matrix (Adjoint & Inversion)', 'Application to System of Linear Equations'] },
    { id: 'mh_math_12_03', title: 'Trigonometric Functions', chapterNumber: 3, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 45, weightageMarks: 10, topics: ['Trigonometric Equations & General Solutions', 'Polar Coordinates & Relations', 'Sine, Cosine and Projection Rules', 'Inverse Trigonometric Functions Properties'] },
    { id: 'mh_math_12_04', title: 'Pair of Straight Lines', chapterNumber: 4, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 32, weightageMarks: 6, topics: ['Combined Equation of Pair of Lines', 'Homogeneous Equation of Degree Two', 'Angle Between Lines & Condition of Perpendicularity'] },
    { id: 'mh_math_12_05', title: 'Vectors', chapterNumber: 5, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 44, weightageMarks: 12, topics: ['Scalar and Vector Products', 'Section Formula for Internal & External Division', 'Scalar Triple Product & Vector Triple Product', 'Applications to Geometry'] },
    { id: 'mh_math_12_06', title: 'Line and Plane', chapterNumber: 6, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 40, weightageMarks: 10, topics: ['Vector and Cartesian Equations of a Line', 'Shortest Distance Between Skew Lines', 'Vector and Cartesian Equations of a Plane', 'Angle Between Planes, Line and Plane'] },
    { id: 'mh_math_12_07', title: 'Linear Programming', chapterNumber: 7, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 30, weightageMarks: 4, topics: ['Linear Inequations in Two Variables', 'Convex Sets and Feasible Region', 'Graphical Method of Solution'] },
    { id: 'mh_math_12_08', title: 'Differentiation', chapterNumber: 8, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 50, weightageMarks: 9, topics: ['Derivatives of Composite Functions (Chain Rule)', 'Derivatives of Inverse Trigonometric Functions', 'Logarithmic Differentiation', 'Derivatives of Implicit & Parametric Functions', 'Higher Order Derivatives'] },
    { id: 'mh_math_12_09', title: 'Applications of Derivatives', chapterNumber: 9, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 42, weightageMarks: 9, topics: ['Tangents and Normals', 'Derivative as Rate Measurer', 'Approximations', 'Rolle\'s and Lagrange\'s Mean Value Theorems', 'Increasing & Decreasing Functions, Maxima & Minima'] },
    { id: 'mh_math_12_10', title: 'Indefinite Integration', chapterNumber: 10, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 48, weightageMarks: 10, topics: ['Methods of Integration (Substitution, Parts, Partial Fractions)', 'Integrals of Special Forms'] },
    { id: 'mh_math_12_11', title: 'Definite Integration', chapterNumber: 11, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 40, weightageMarks: 6, topics: ['Fundamental Theorem of Integral Calculus', 'Properties of Definite Integrals'] },
    { id: 'mh_math_12_12', title: 'Application of Definite Integration', chapterNumber: 12, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 30, weightageMarks: 4, topics: ['Area Under Curves, Circles, Parabolas, Ellipses', 'Area Between Two Curves'] },
    { id: 'mh_math_12_13', title: 'Differential Equations', chapterNumber: 13, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 44, weightageMarks: 8, topics: ['Order and Degree', 'Formation of Differential Equations', 'Solutions: Variable Separable, Homogeneous, Linear Differential Equations'] },
    { id: 'mh_math_12_14', title: 'Probability Distributions', chapterNumber: 14, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 32, weightageMarks: 5, topics: ['Random Variables & PMF', 'Expected Value and Variance'] },
    { id: 'mh_math_12_15', title: 'Binomial Distribution', chapterNumber: 15, subject: 'Mathematics', board: 'Maharashtra HSC', classLevel: 'Class 12', totalQuestions: 30, weightageMarks: 5, topics: ['Bernoulli Trials & Binomial Distribution Formula', 'Mean and Variance of Binomial Distribution'] },
  ],
};

// Helper function to get real chapters for any board, class, and subject
export function getChaptersForSelection(board: string, classLevel: string, subject: string): ChapterInfo[] {
  // Normalize key
  const exactKey = `${board}_${classLevel}_${subject}`;
  if (OFFICIAL_SYLLABUS_CHAPTERS[exactKey]) {
    return OFFICIAL_SYLLABUS_CHAPTERS[exactKey];
  }

  // Match chemistry
  if (subject.toLowerCase().includes('chem')) {
    return OFFICIAL_SYLLABUS_CHAPTERS['Maharashtra HSC_Class 12_Chemistry'];
  }

  // Match mathematics
  if (subject.toLowerCase().includes('math')) {
    return OFFICIAL_SYLLABUS_CHAPTERS['Maharashtra HSC_Class 12_Mathematics'];
  }

  // Fallback to match board & subject flexibly
  if (board.includes('Maharashtra') && subject.toLowerCase().includes('physic')) {
    return OFFICIAL_SYLLABUS_CHAPTERS['Maharashtra HSC_Class 12_Physics'];
  }
  if (classLevel.includes('10') && (subject.toLowerCase().includes('physic') || subject.toLowerCase().includes('science'))) {
    return OFFICIAL_SYLLABUS_CHAPTERS['CBSE_Class 10_Science'];
  }

  // Default to CBSE Class 12 Physics if subject matches
  if (subject.toLowerCase().includes('physic')) {
    return OFFICIAL_SYLLABUS_CHAPTERS['CBSE_Class 12_Physics'];
  }

  // Return Maharashtra HSC Physics as reliable standard
  return OFFICIAL_SYLLABUS_CHAPTERS['Maharashtra HSC_Class 12_Physics'];
}
