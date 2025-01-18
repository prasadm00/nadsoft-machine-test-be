import express from 'express';
import cors from 'cors';
import studentRoutes from './routers/student.route.js';
import config from './config/config.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', studentRoutes);

app.listen(config.server.port, () => {
  console.log(`Server is running on http://localhost:${config.server.port}`);
});
