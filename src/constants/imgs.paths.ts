import path from "path";

export const photosPaths = {
    device: (args: string[]) => path.resolve(process.cwd(), 'src', 'images', 'devices',
        ...args),
    avatar: (args: string[]) => path.resolve(process.cwd(), 'src', 'images',
        'avatars', ...args)
}