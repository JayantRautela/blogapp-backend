import bcryptjs from "bcryptjs";

export const hashPassword = (password: string): string => {
    return bcryptjs.hashSync(password, 10);
}

export const comparePassword = (hashedPassword: string, password: string): boolean => {
    return bcryptjs.compareSync(hashedPassword, password);
}