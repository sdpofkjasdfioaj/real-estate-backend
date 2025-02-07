const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint to process agent's inputs and calculate attractiveness & competition
app.post('/calculate', (req, res) => {
    const { comparables, marketAppeal, priceRange, peakPresentation, advertisedPrice } = req.body;

    let attractiveness = 50;
    let competition = 50;

    // Adjust based on comparable properties
    if (comparables === 'none') {
        competition -= 15;
    } else if (comparables === 'some') {
        competition += 5;
    } else if (comparables === 'plenty') {
        competition += 15;
    }

    // Adjust based on market appeal
    if (marketAppeal === 'niche') {
        competition -= 20;
    } else if (marketAppeal === 'broad') {
        competition += 20;
    }

    // Adjust based on peak presentation potential
    if (peakPresentation === 'fair') {
        attractiveness += 10;
    } else if (peakPresentation === 'shine') {
        attractiveness += 20;
    }

    // Adjust based on advertised price vs expected range
    if (advertisedPrice < priceRange.min) {
        competition += 10;
        attractiveness += 5;
    } else if (advertisedPrice > priceRange.max) {
        competition -= 10;
        attractiveness -= 5;
    }

    // Ensure values stay within range 0-100
    attractiveness = Math.max(0, Math.min(100, attractiveness));
    competition = Math.max(0, Math.min(100, competition));

    res.json({ attractiveness, competition });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
