const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

let questions = [
  { id: 1, subtest: 'PU', text: 'Jika semua A adalah B, dan sebagian B adalah C, maka...', options: ['Semua A adalah C', 'Sebagian A adalah C', 'Tidak dapat disimpulkan', 'Semua C adalah A'], answer: 2, weight: 2.5, explanation: 'Tidak ada hubungan langsung antara A dan C.' },
  { id: 2, subtest: 'PK', text: 'Nilai dari 2^3 + 3^2 adalah...', options: ['12', '17', '25', '14'], answer: 1, weight: 1.8, explanation: '8 + 9 = 17.' }
  ];

let tryouts = [];

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'nusa-utbk-snbt' });
});

app.get('/api/questions', (req, res) => {
    res.json(questions);
});

app.post('/api/questions', (req, res) => {
    const q = { id: Date.now(), ...req.body };
    questions.push(q);
    res.status(201).json(q);
});

app.get('/api/tryouts', (req, res) => {
    res.json(tryouts);
});

app.post('/api/tryouts', (req, res) => {
    const t = { id: Date.now(), ...req.body };
    tryouts.push(t);
    res.status(201).json(t);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server NusaUTBK berjalan di port ${PORT}`);
});
