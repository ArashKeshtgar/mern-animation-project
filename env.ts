import path from 'path';
import dotenv from 'dotenv';

// process.cwd() (not __dirname) so this resolves to the project root .env
// whether running from source (tsx) or from the compiled dist/ output.
dotenv.config({ path: path.join(process.cwd(), '.env') });
