import app from './app.js';
import { ENV } from './config/env.js';

app.listen(ENV.PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${ENV.PORT}`);
});