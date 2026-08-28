# Vishnu Dharan — Cybernetic AI Developer Portfolio

A premium, high-art developer portfolio website designed for **Vishnu Dharan K (AI & Data Science Engineer / Systems Architect)**. The interface showcases an interactive cybernetic developer workspace with advanced particle physics, dynamic grid warping, and holographic terminal frames.

---

## 🚀 Live Demo & Development

This project is built using **React 18** and **Vite** for fast hot module replacement (HMR) and optimized production bundles.

### Local Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd portfolio
   ```

2. Install the node dependencies:
   ```bash
   npm install
   ```

3. Launch the local hot-reloading development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

### Building for Production

To compile optimized, minified static assets for deployment:
```bash
npm run build
```
This generates production-ready assets inside the `dist/` directory, copying static assets (like your resume PDF) automatically. You can preview the compiled assets locally using:
```bash
npm run preview
```

---

## 🛠️ Tech Stack & Key Features

### 🌌 Interactive 3D/2D Coding Background
Located in [`src/components/AnimeBackground.jsx`](file:///d:/NavigateAi/portfolio/src/components/AnimeBackground.jsx), the canvas-based background operates a custom-built high-performance render loop with the following visual mechanics:
- **3D Grid Warp (Gravitational Lens)**: The coordinates grid dynamically bends and pulls toward the mouse cursor on movement.
- **SONAR Click Shockwaves**: Clicking anywhere triggers an expanding sonar ripple that pushes the grid lines and tech nodes outward in a wave, lighting up grid junctions.
- **Connection Data Flow Pulses**: Neon packets of data travel dynamically along connection lines between nodes.
- **Holographic Terminal Panels**: Code snippets (React hooks, Express setups, PyTorch models) float upward in monospace font inside blurred glass terminal panel frames. Hovering over a panel highlights its borders and slows its drift speed.
- **Tech Hub Orbit Rings**: Large tech nodes feature persistent orbit paths with rotating data points.

### ✍️ Hero Typing Loop Subtitle
An optimized React typing loop in [`src/components/Hero.jsx`](file:///d:/NavigateAi/portfolio/src/components/Hero.jsx) loops through your engineering specializations, pausing to display each title before deleting and transitioning.

### 🗃️ Modular Data-Driven Setup
All text, stats, skills, projects, and contact info are separated into a single configuration file at [`src/data/portfolioData.js`](file:///d:/NavigateAi/portfolio/src/data/portfolioData.js). To update details on the portfolio, simply edit the arrays and strings in this file.

---

## 📂 Project Directory Structure

```markdown
├── public/                 # Static assets folder (served at root URL)
│   └── resume.pdf          # Your verified curriculum vitae
├── src/
│   ├── components/         # Modular React view components
│   │   ├── About.jsx       # About panel & stats counter nodes
│   │   ├── AnimeBackground.jsx # Canvas grid warp & particle loop
│   │   ├── Contact.jsx     # Contact cards (email, github, LinkedIn)
│   │   ├── Experience.jsx  # Career timeline nodes
│   │   ├── Footer.jsx      # Bottom cyber signature bar
│   │   ├── Hero.jsx        # Name presentation & subtitle typing loop
│   │   ├── Loader.jsx      # Holographic initial boot screen
│   │   ├── Navbar.jsx      # Navigation bar scroll reactive status
│   │   ├── ProjectModal.jsx # Case study popups showing solutions
│   │   └── Projects.jsx    # Projects grid layout
│   ├── data/
│   │   └── portfolioData.js # Main JSON config containing all portfolio text
│   ├── App.jsx             # Main layout assembly
│   ├── main.jsx            # DOM mounting script
│   └── style.css           # Premium cyber CSS variables & styling definitions
├── package.json            # Node project configuration
├── vite.config.js          # Vite server and bundler settings
└── README.md               # Documentation guide
```

---

## 🔧 Personalizing the Portfolio

To update your contact details, resume path, skills list, or projects log:

1. Open [`src/data/portfolioData.js`](file:///d:/NavigateAi/portfolio/src/data/portfolioData.js) in your text editor.
2. Edit the relevant values inside:
   - `personalInfo`: email, phone, social handles, resume URL, typing loop subtitle titles.
   - `aboutData`: stats values and descriptions.
   - `skillsData`: add or delete skills within specific generative AI, backend, and vector database sections.
   - `projectsData`: add custom modal details (problems solved, tech stack logs, solution details) for your engineering work.
3. Save the file. Vite's HMR will apply the updates on your local development screen instantly.
