import { router } from './routes/color.ts';
import { Application, config } from '../deps.ts';

const { PORT } = config();

const app = new Application();

app.use(router.routes());

await app.listen({port: Number(PORT) || 8080});

console.log(`Deno server is up on http://localhost:${PORT || 8080}`)