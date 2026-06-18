import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
// 用于标记接口需要的角色权限，例如 @Roles('admin', 'super_admin')
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);