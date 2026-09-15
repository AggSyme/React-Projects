import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

// CORS
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.get('/places', async (req, res) => {
  const fileContent = await fs.readFile('./data/places.json');

  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

app.get('/user-places', async (req, res) => {
  const fileContent = await fs.readFile('./data/user-places.json');

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put('/user-places', async (req, res) => {
  const places = req.body.places;

  await fs.writeFile('./data/user-places.json', JSON.stringify(places));

  res.status(200).json({ message: 'User places updated!' });
});

app.delete('/delete-place/:id', async (req, res) => {

  const id = req.params.id;
  console.log(id);
  // 1. Read the existing places file
  const fileContent = await fs.readFile('./data/user-places.json');
  const userPlaces = JSON.parse(fileContent);

  // 2. Filter out the record with the matching id
  const updatedPlaces = userPlaces.filter((place) => place.id !== id);

  // 3. Write the updated array back to the file
  await fs.writeFile('./data/user-places.json', JSON.stringify(updatedPlaces));

  res.status(200).json({message: "Deleted successgully!"});
});


// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000);
