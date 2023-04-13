import path from 'path';
import { promises as fs } from 'fs';

const filename = 'quotes.json'

export default async function handler(req: any, res: any) {
    const jsonDirectory = path.join(process.cwd(), 'json');
    const fileContents = await fs.readFile(jsonDirectory + '/' + filename, 'utf8');
    res.status(200).json(JSON.parse(fileContents));
}