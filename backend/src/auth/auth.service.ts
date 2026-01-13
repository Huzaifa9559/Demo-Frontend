import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';
import { LoginInput, SignupInput, AuthPayload } from './auth.graphql.types';
import * as bcrypt from 'bcrypt';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(input: LoginInput): Promise<AuthPayload> {
    const user = await this.usersService.findByEmail(input.email);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid email or password. Please check your credentials and try again.',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      input.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid email or password. Please check your credentials and try again.',
      );
    }

    const payload: CurrentUserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    // Map entity UserRole to GraphQL UserRole
    const graphqlRole = user.role === UserRole.ADMIN ? 'admin' : 'user';

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: graphqlRole,
        createdAt: user.createdAt || undefined,
        updatedAt: user.updatedAt || undefined,
      },
    };
  }

  async validateUser(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async signup(input: SignupInput): Promise<AuthPayload> {
    const existingUser = await this.usersService.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Map GraphQL UserRole to entity UserRole
    const entityRole = input.role === 'admin' ? UserRole.ADMIN : UserRole.USER;

    const user = await this.usersService.create({
      email: input.email,
      password: hashedPassword,
      name: input.name,
      role: entityRole,
    });

    const payload: CurrentUserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    // Map entity UserRole to GraphQL UserRole
    const graphqlRole = user.role === UserRole.ADMIN ? 'admin' : 'user';

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: graphqlRole,
        createdAt: user.createdAt || undefined,
        updatedAt: user.updatedAt || undefined,
      },
    };
  }

  async requestOtp(input: { email: string }) {
    const user = await this.usersService.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('User with this email does not exist');
    }

    // Generate a constant OTP for mock implementation
    const OTP = '123456';
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP valid for 10 minutes

    // Save OTP to user
    await this.usersService.update(user.id, {
      otp: OTP,
      otpExpiry: otpExpiry,
    });

    // In a real implementation, you would send this OTP via email
    // For mock implementation, we'll just log it
    console.log(`[MOCK EMAIL] OTP for ${user.email}: ${OTP}`);
    console.log(
      `This is a mock implementation. In production, this OTP would be sent to the user's email.`,
    );

    return {
      message: 'OTP has been sent to your email address',
      // In development, we can return the OTP for testing
      ...(process.env.NODE_ENV === 'development' && { otp: OTP }),
    };
  }

  async verifyOtp(input: { email: string; otp: string }) {
    const user = await this.usersService.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('User with this email does not exist');
    }

    if (!user.otp || !user.otpExpiry) {
      throw new BadRequestException('No OTP found. Please request a new OTP');
    }

    if (new Date() > user.otpExpiry) {
      throw new BadRequestException(
        'OTP has expired. Please request a new OTP',
      );
    }

    if (user.otp !== input.otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    return {
      message: 'OTP verified successfully',
    };
  }

  async resetPassword(input: { email: string; otp: string; newPassword: string }) {
    const user = await this.usersService.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('User with this email does not exist');
    }

    if (!user.otp || !user.otpExpiry) {
      throw new BadRequestException('No OTP found. Please request a new OTP');
    }

    if (new Date() > user.otpExpiry) {
      throw new BadRequestException(
        'OTP has expired. Please request a new OTP',
      );
    }

    if (user.otp !== input.otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const hashedPassword = await bcrypt.hash(input.newPassword, 10);

    await this.usersService.update(user.id, {
      password: hashedPassword,
      otp: null,
      otpExpiry: null,
    });

    return {
      message: 'Password has been reset successfully',
    };
  }
}
