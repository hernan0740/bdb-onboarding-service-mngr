import express from 'express';
import employeeRoutes from './routes/employeeRoutes';
import cors from "cors";

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/employees', employeeRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


export default app;
