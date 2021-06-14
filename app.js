const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 80;
const mongoURI = 'mongodb+srv://yurii:1234qwe@cluster0.uazh8.mongodb.net/app?retryWrites=true&w=majority';

async function start() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    })

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT} ...`);
    })     
  } catch (e) {
    console.log('Server error', e);
    process.exit(1);
  }
}

start();
