import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getPaths() {
    const isDev = process.env.NODE_ENV === 'development' || process.argv[1]?.includes('tsx');

    const themesDir = isDev
        ? path.join(process.cwd(), 'themes')
        : path.join(os.homedir(), '.config', 'rice', 'themes');

    const templatesDir = isDev
        ? path.join(process.cwd(), 'templates')
        : path.join(__dirname, '..', 'templates');

    const configDir = isDev
        ? path.join(process.cwd(), '.config')
        : path.join(os.homedir(), '.config');

    return {
        themesDir,
        templatesDir,
        configDir,
    };
}