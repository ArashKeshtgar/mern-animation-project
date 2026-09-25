import app from './app';
import keys from './config/keys';

app.listen(keys.port, () => console.log(`Server started on port ${keys.port}`));
