import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { Cart } from '@/interfaces/cart.interface';

class UserService {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await userModel.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await userModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await userModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await userModel.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async AddToCart(userId: string, cartData: Cart[] | []): Promise<User> {
    const user: User | null = await userModel.findById(userId);

    if (user === null) throw new Error('No encontramos sus datos.');

    const updated = await userModel.findByIdAndUpdate(userId, { cart: cartData });

    if (updated) return updated;

    throw new Error('No se pudo conectar con el carrito de compras.');
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    if (userData.email) {
      const findUser: User = await userModel.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await userModel.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await userModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }

  public async cart(id: string, cart: Cart): Promise<User> {
    const user: User | null = await userModel.findById(id);
    if (user === null) throw new Error("No encontramos sus datos.");

    const cartItems: Cart[] = user?.cart as Cart[];
    for (let item of cartItems) {
      if (item.title === cart.title ) {
        const updated = await userModel.findByIdAndUpdate(id, { $pull: { cart } }, {new: true});
        if (updated) return updated;
      }
    }
    const added = await userModel.findByIdAndUpdate(id, { $push: { cart } }, {new: true});
    if (added) return added;
    throw new Error ('No se pudo conectar con el carrito de compras.');
  }
}

export default UserService;
