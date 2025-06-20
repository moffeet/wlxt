"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const search_user_dto_1 = require("./dto/search-user.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const user_entity_1 = require("./entities/user.entity");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    async findAllWithPagination(query) {
        return this.usersService.findAllWithPagination(query);
    }
    async findAll() {
        return this.usersService.findAll();
    }
    async findDrivers() {
        return this.usersService.findDrivers();
    }
    async getRoles() {
        return this.usersService.getRoles();
    }
    async findOne(id) {
        return this.usersService.findById(id);
    }
    async update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    async batchRemove(body) {
        await this.usersService.batchRemove(body.ids);
        return { message: '用户批量删除成功' };
    }
    async remove(id) {
        await this.usersService.remove(id);
        return { message: '用户删除成功' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '创建用户' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '用户创建成功', type: user_entity_1.User }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '分页获取用户列表' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '获取成功' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: '页码，默认为1' }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, description: '每页数量，默认为10' }),
    (0, swagger_1.ApiQuery)({ name: 'username', required: false, description: '用户名搜索' }),
    (0, swagger_1.ApiQuery)({ name: 'realName', required: false, description: '真实姓名搜索' }),
    (0, swagger_1.ApiQuery)({ name: 'phone', required: false, description: '手机号搜索' }),
    (0, swagger_1.ApiQuery)({ name: 'userType', required: false, enum: user_entity_1.UserType, description: '用户类型筛选' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_user_dto_1.SearchUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllWithPagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取所有用户列表' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '获取成功', type: [user_entity_1.User] }),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取司机列表' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '获取成功', type: [user_entity_1.User] }),
    (0, common_1.Get)('drivers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findDrivers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取角色列表' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '获取成功' }),
    (0, common_1.Get)('roles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getRoles", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取用户详情' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '获取成功', type: user_entity_1.User }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '更新用户' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '更新成功', type: user_entity_1.User }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '批量删除用户' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '删除成功' }),
    (0, common_1.Delete)('batch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "batchRemove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '删除用户' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '删除成功' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('用户管理'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map