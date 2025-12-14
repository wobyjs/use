import { isPrimitive } from "woby"

export const wrap = (o: any) => isPrimitive(o) ? (o as any) + '' : JSON.stringify(o)