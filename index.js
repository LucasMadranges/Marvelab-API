const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require("axios");
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config()

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Sample data based on the provided structure
const marvelabData = {
  notes: [
    {
      id: 1,
      content: "Plusieurs études ont montré qu'une exposition régulière aux espaces verts est associée à une réduction du stress et à une amélioration des fonctions cognitives chez les adultes."
    },
    {
      id: 2,
      content: "Dans une expérience contrôlée, les participants ayant marché 20 minutes dans un parc ont présenté une baisse de 15 % du taux de cortisol, comparé à ceux ayant marché en milieu urbain."
    },
    {
      id: 3,
      content: "Les bienfaits de la nature sur la santé mentale sont particulièrement prononcés chez les populations urbaines souffrant d'un accès limité aux espaces verts."
    }
  ],
  interpretations: [
    {
      id: 1,
      content: "Le lien constant entre l'exposition à la nature et les bénéfices cognitifs suggère que l'intégration d'environnements naturels dans l'aménagement urbain pourrait avoir des effets positifs à long terme sur la santé publique."
    },
    {
      id: 2,
      content: "La diminution mesurable du cortisol implique qu'une exposition même de courte durée à la nature peut avoir des effets physiologiques immédiats, ce qui soutient l'utilisation d'interventions basées sur la nature dans la gestion du stress."
    },
    {
      id: 3,
      content: "Les résultats suggèrent que l'intégration de pauses nature dans les environnements de travail pourrait améliorer la productivité et réduire l'absentéisme lié au stress."
    }
  ],
  resources: [
    {
      id: 1,
      title: "Plan de travail en laboratoire",
      type: "image",
      url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      description: "Une image d'un plan de travail en laboratoire avec plusieurs boites de pétri."
    },
    {
      id: 2,
      title: "Graphique d'analyse",
      type: "image",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Une image d'un graphique d'analyse."
    },
    {
      id: 3,
      title: "Environnement naturel",
      type: "image",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      description: "Une image d'un environnement forestier utilisé dans les études."
    }
  ],
  methodologies: [
    {
      id: 1,
      title: "Étude comparative en milieu urbain et naturel",
      description: "Étude randomisée contrôlée comparant les niveaux de stress et les performances cognitives de participants exposés à des environnements urbains versus naturels pendant 20 minutes."
    },
    {
      id: 2,
      title: "Analyse longitudinale d'exposition à la nature",
      description: "Suivi sur 6 mois de participants ayant accès à différents niveaux d'espaces verts, avec mesures régulières des biomarqueurs de stress et tests cognitifs."
    }
  ],
  experiments: [
    {
      id: 1,
      title: "Protocole d'exposition contrôlée",
      description: "Les participants (n=120) ont été répartis aléatoirement entre une marche de 20 minutes dans un parc urbain ou dans une rue à forte circulation. Des échantillons de salive ont été prélevés avant et après pour mesurer le cortisol."
    },
    {
      id: 2,
      title: "Tests cognitifs post-exposition",
      description: "Suite à l'exposition, les participants ont complété une batterie de tests cognitifs standardisés mesurant l'attention, la mémoire de travail et les fonctions exécutives."
    }
  ]
};

// API Endpoints
// Get all notes
app.get('/api/notes', (req, res) => {
  res.json(marvelabData.notes);
});

// Get a specific note
app.get('/api/notes/:id', (req, res) => {
  const note = marvelabData.notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
});

// Get all interpretations
app.get('/api/interpretations', (req, res) => {
  res.json(marvelabData.interpretations);
});

// Get a specific interpretation
app.get('/api/interpretations/:id', (req, res) => {
  const interpretation = marvelabData.interpretations.find(i => i.id === parseInt(req.params.id));
  if (!interpretation) return res.status(404).json({ message: 'Interpretation not found' });
  res.json(interpretation);
});

// Get all resources
app.get('/api/resources', (req, res) => {
  res.json(marvelabData.resources);
});

// Get a specific resource
app.get('/api/resources/:id', (req, res) => {
  const resource = marvelabData.resources.find(r => r.id === parseInt(req.params.id));
  if (!resource) return res.status(404).json({ message: 'Resource not found' });
  res.json(resource);
});

// Get all methodologies
app.get('/api/methodologies', (req, res) => {
  res.json(marvelabData.methodologies);
});

// Get a specific methodology
app.get('/api/methodologies/:id', (req, res) => {
  const methodology = marvelabData.methodologies.find(m => m.id === parseInt(req.params.id));
  if (!methodology) return res.status(404).json({ message: 'Methodology not found' });
  res.json(methodology);
});

// Get all experiments
app.get('/api/experiments', (req, res) => {
  res.json(marvelabData.experiments);
});

// Get a specific experiment
app.get('/api/experiments/:id', (req, res) => {
  const experiment = marvelabData.experiments.find(e => e.id === parseInt(req.params.id));
  if (!experiment) return res.status(404).json({ message: 'Experiment not found' });
  res.json(experiment);
});

// Get all data (for convenience)
app.get('/api/all', (req, res) => {
  res.json(marvelabData);
});

app.post('/api/gemini', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Le champ "prompt" est requis.' });
  }

  try {
    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API}`,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 512,
          },
        }
    );

    const generatedText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ text: generatedText });

  } catch (error) {
    console.error('Erreur Gemini:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erreur lors de la génération Gemini.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Marvelab API server running on port ${PORT} ✨`);
});
