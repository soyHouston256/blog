import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants/roles.constant';
import { Role } from '../enums/rol.enum';

export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
