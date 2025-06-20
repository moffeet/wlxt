import { CreateUserDto } from './create-user.dto';
import { UserStatus } from '../entities/user.entity';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    status?: UserStatus;
    avatar?: string;
}
export {};
