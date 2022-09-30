import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ValidateEmail } from 'src/utils/utils';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        // private jwtService: JwtService,
        // private configService: ConfigService,
        // @InjectModel('User') private userModel: Model<User>
    ) {

    }

    async create(createUserDto) {
        this.usersService.create(createUserDto)
    }

    async login(loginUserDto) {
        this.usersService.login(loginUserDto)
    }
    
}