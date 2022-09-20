import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import postsRoutes from './routes/post.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postsRoutes);

export default app;