import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Shariful Islam',
      email: 'shariful@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Tanvir Hasan',
      email: 'tanvir@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Nusrat Jahan',
      email: 'nusrat@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Rakib Hossain',
      email: 'rakib@example.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Mehedi Rahman',
      email: 'mehedi@example.com',
      role: 'ADMIN',
    },
    { id: 6, name: 'Sadia Akter', email: 'sadia@example.com', role: 'INTERN' },
    {
      id: 7,
      name: 'Fahim Ahmed',
      email: 'fahim@example.com',
      role: 'ENGINEER',
    },
    {
      id: 8,
      name: 'Jannat Chowdhury',
      email: 'jannat@example.com',
      role: 'INTERN',
    },
    { id: 9, name: 'Imran Khan', email: 'imran@example.com', role: 'ADMIN' },
    {
      id: 10,
      name: 'Tania Sultana',
      email: 'tania@example.com',
      role: 'ENGINEER',
    },
  ];

  //   Get All Users Data
  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray?.length === 0)
        throw new NotFoundException('User Role Not Found');
      return rolesArray;
    }
    return this.users;
  }

  //   Get a single user by id
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  //   Create an user

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = this.users.length
      ? Math.max(...this.users.map((u) => u.id))
      : 0;
    const newUser = {
      id: usersByHighestId + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  //   Update an user by id
  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  //   Delete an user by id
  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
