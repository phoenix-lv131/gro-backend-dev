import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginResponseDTO, SignupResponseDTO, UserLoginDto } from './auth.dto';
import { ErrorResponseDTO } from 'src/shared/dto/error.response.dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {

    }
    @Post('register')
    @ApiOperation({
        summary: "User register endpoint.",
        description: "User signup"
    })
    @ApiResponse({ status: 200, type: SignupResponseDTO, description: "Verify your email" })
    @ApiResponse({ status: 400, type: ErrorResponseDTO, description: "Validation error" })
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        this.authService.create(createUserDto)
        return res.json({ success: 'true' })
    }

    @Post('login')
    @ApiOperation({
        summary: "User login endpoint.",
        description: "User login"
    })
    @ApiResponse({ status: 200, type: LoginResponseDTO, description: "Verify your email" })
    @ApiResponse({ status: 400, type: ErrorResponseDTO, description: "Validation error" })
    async login(@Body() loginUserDto: UserLoginDto, @Res() res: Response) {
        this.authService.login(loginUserDto)
        return res.json({ success: 'true' })
    }
}
