import express from 'express';
import employeeRoutes from './routes/employeeRoutes';
import cors from 'cors';


const port = 5000;
const app = express();

app.use(cors());

app.use(express.json());
app.use('/', employeeRoutes);

app.listen(port, '0.0.0.0', () => console.log('Server running'));



export default app;
