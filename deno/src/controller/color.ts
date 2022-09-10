import { getColors, getColorByName, getColorByUser, addColor } from "../dao/color.ts";
import { Context, helpers } from '../../deps.ts';

export const getColorHandler = async (ctx: Context) => {
    const { name, user } = await helpers.getQuery(ctx, {mergeParams: true})
    try {
        if (name) ctx.response.body = await getColorByName(name);
        if (user) ctx.response.body = await getColorByUser(user);
        else ctx.response.body = await getColors();
    } catch (err) {
        ctx.response.status = 400;
        ctx.response.body = {err: err.message}
    }
}

export const addColorHandler = async (ctx: Context) => {
    const { name, user } = await ctx.request.body().value;

    try{
        if (!name || !user) throw new Error('Unable to create a new color without a user or name!');
        ctx.response.body = await addColor(name, user);
    } catch (err) {
        ctx.response.status = 400;
        ctx.response.body = {err: err.message}
    }
}