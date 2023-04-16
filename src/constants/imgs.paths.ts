import path from "path";

export const photosPath = (args: string[]): string => path.resolve(process.cwd(), 'src', 'images', ...args)