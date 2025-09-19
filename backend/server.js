const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/diagnose', async (req, res) => {
    const { year, make, model, code } = req.body;

    if (!year || !make || !model || !code) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    try {
        const prompt = `
            You are an automotive diagnostic assistant.
            A user has entered this vehicle: ${year} ${make} ${model}.
            And this OBD-II error code: ${code}.
            Explain in detail:
            1. What this code means
            2. Common causes
            3. Step-by-step troubleshooting
            4. Whether it’s safe to drive or not
            `;

        const response = await axios.post(
            process.env.OPENAI_API_URL,
            {
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.4
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiText = response.data.choices[0].message.content;
        res.json({ result: aiText });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running...'));