import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    try {
        const saltRounds = 5;
        const hasshedpassword = await bcrypt.hash(password, saltRounds);
        return hasshedpassword;
    }
    catch (error) {
        console.log(error);
    }
};


export const comparePassword = async (password, hasshedpassword) => {
    return bcrypt.compare(password, hasshedpassword);
};