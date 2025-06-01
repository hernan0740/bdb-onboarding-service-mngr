import express from 'express';
import employeeRoutes from './routes/employeeRoutes';


const port = 5000;
const app = express();


app.use(express.json());
app.use('/employees', employeeRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


export default app;
