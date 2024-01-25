import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '../enums/rol.enum';
import { Roles } from './roles.decorator';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { RoleGuard } from '../guard/role.guard';

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(JwtAuthGuard, RoleGuard));
}
