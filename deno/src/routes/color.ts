import { getColorHandler, addColorHandler } from "../controller/color.ts";
import { Router, Context } from '../../deps.ts';

export const router = new Router()
    .get('/', (ctx: Context) => ctx.response.body = 'Welcome, get the list of colors with GET /api/colors and add new colors with POST /api/colors')
    .get('/api/colors', getColorHandler)
    .post('/api/colors', addColorHandler);