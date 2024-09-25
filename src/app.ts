import cors from 'cors';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';


const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))

// app.use(express.static(path.join(__dirname, 'client/build')));
// Routes
app.use('/api/', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });
// Error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;
