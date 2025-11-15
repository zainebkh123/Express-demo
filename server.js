const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let tasks = [
  { id: 1, title: 'Apprendre Express', done: false },
  { id: 2, title: 'Créer une application de démonstration', done: false },
];

app.get('/', (req, res) => {
  res.render('index', { user: 'VotreNom' }); // Remplacez par votre nom
});


app.get('/tasks', (req, res) => {
  res.render('tasks', { 
    tasks: tasks,
    totalTasks: tasks.length 
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});


app.post('/api/tasks', (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ 
      error: 'Le titre de la tâche est requis' 
    });
  }
  
  const newTask = {
    id: tasks.length + 1,
    title: title.trim(),
    done: false
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});