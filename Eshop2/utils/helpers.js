import bcrypt from 'bcrypt';

const saltRounds = 10; //recomended by documentation is 10

export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain,hashed) => {
    return bcrypt.compareSync(plain, hashed); //returns true if plain pass == hashed pass
}