import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public async signup(userData: CreateUserDto): Promise<{ cookie: string; createUserData: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "No se ingresaron los datos de usuario.");

    const findUser: User = await userModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `El correo electrónico ${userData.email} ya se encuentra registrado.`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await userModel.create({ ...userData, password: hashedPassword });
    
    const tokenData = this.createToken(createUserData);
    const cookie = this.createCookie(tokenData);

    return { cookie, createUserData };
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "No se ingresaron los datos de usuario.");

    const findUser: User = await userModel.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `No se encontró el correo electrónico ${userData.email}.`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "La contraseña no coincide.");
    
    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "No se ingresaron los datos de usuario.");

    const findUser: User = await userModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `No se encontró el correo electrónico ${userData.email}.`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60 * 24;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Secure; SameSite=Lax; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
