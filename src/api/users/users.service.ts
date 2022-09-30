import { Injectable, HttpException, HttpStatus, InternalServerErrorException, BadRequestException, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs'
import { ValidateEmail } from 'src/utils/utils';
import { JwtService } from '@nestjs/jwt';
// import { EmailConfirmationService } from '../email-confirmation/email-confirmation.service';

@Injectable()
export class UsersService {
  private jwtService;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    jwtService: JwtService
    // @Inject(forwardRef(() => JwtService)) private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const validationResult = ValidateEmail(email);
    if (!validationResult) {
      throw new HttpException("Email format is incorrect", HttpStatus.BAD_REQUEST);
    }
    const exist = await this.usersRepository.findOne({ where: { email } });
    let userAlreadyExists = exist !== null
    if (userAlreadyExists) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    createUserDto.password = passwordHash

    const user = this.usersRepository.create(createUserDto);
    try {
      await this.usersRepository.save(user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }

    return {
      email: user.email,
      id: user.id,
    };
  }

  async login(userLoginDto) {
    const { email, password } = userLoginDto
    const validationResult = ValidateEmail(email);
    if (!validationResult) {
      throw new BadRequestException('Email format is not correct');
    }
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User Not found');
    // if (!user.phone) throw new BadRequestException('Your email address has not been verified');
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;

      const payload = { email: user.email, sub: user.id };
      // const { accessToken, refreshToken } = await this.getTokens(payload);
      // // await this.usersService.setRefreshToken(refreshToken, user._id);
      // return {
      //   msg: accessToken,
      //   status: 1,
      //   refresh_token: refreshToken,
      //   token_type: "Bearer",
      //   expires_in: process.env.JWT_EXPIRATION_TIME,
      //   user
      // };
    } else {
      throw new BadRequestException('Password not matched');
    }
  }

  async getTokens(payload: any) {
    // const [accessToken, refreshToken] = await Promise.all([
    //   this.jwtService.signAsync(
    //     payload,
    //     {
    //       secret: process.env.JWT_SECRET_KEY,
    //       expiresIn: process.env.JWT_EXPIRATION_TIME
    //     },
    //   ),
    //   this.jwtService.signAsync(
    //     payload,
    //     {
    //       secret: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
    //       expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    //     },
    //   ),
    // ]);

    // return {
    //   accessToken,
    //   refreshToken,
    // };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
