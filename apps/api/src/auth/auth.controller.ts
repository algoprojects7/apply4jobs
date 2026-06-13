import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() body: any) {
    const { email, password, role } = body;
    console.log(`Registering user ${email} with role ${role}`);
    return {
      status: 'success',
      message: 'User successfully registered. Verification email triggered.',
      user: {
        id: 'mock-user-uuid-1111',
        email,
        role: role || 'Candidate',
        isVerified: false,
      },
      token: 'mock-jwt-access-token-string',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    const { email, password } = body;
    console.log(`Logging in user ${email}`);
    return {
      status: 'success',
      message: 'Logged in successfully',
      token: 'mock-jwt-access-token-string',
      user: {
        id: 'mock-user-uuid-1111',
        email,
        role: email.includes('recruiter') ? 'Recruiter' : 'Candidate',
        tenantId: email.includes('recruiter') ? 'mock-tenant-uuid' : null,
      },
    };
  }
}
