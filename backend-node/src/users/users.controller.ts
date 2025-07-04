import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('👤 用户管理')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ 
    summary: '创建用户',
    description: '创建新的系统用户，用户创建后可以分配角色获得相应权限。密码会自动加密存储，返回数据不包含密码字段。'
  })
  @ApiBody({
    description: '用户创建数据',
    schema: {
      type: 'object',
      required: ['username', 'password', 'nickname'],
      properties: {
        username: {
          type: 'string',
          description: '用户名，系统内唯一',
          example: 'admin'
        },
        password: {
          type: 'string',
          description: '登录密码，最少6位',
          minLength: 6,
          example: 'admin123'
        },
        nickname: {
          type: 'string',
          description: '用户昵称',
          example: '管理员'
        },
        gender: {
          type: 'string',
          enum: ['male', 'female'],
          description: '性别',
          example: 'male'
        },
        phone: {
          type: 'string',
          description: '手机号码',
          example: '13800138000'
        },
        email: {
          type: 'string',
          description: '邮箱地址',
          format: 'email',
          example: 'admin@example.com'
        },
        status: {
          type: 'string',
          enum: ['normal', 'disabled'],
          description: '用户状态',
          example: 'normal'
        },
        roleIds: {
          type: 'array',
          items: { type: 'number' },
          description: '角色ID数组',
          example: [1, 2]
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: '用户创建成功',
    schema: {
      type: 'object',
      properties: {
        code: { type: 'number', example: 200 },
        message: { type: 'string', example: '创建成功' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            username: { type: 'string', example: 'admin' },
            nickname: { type: 'string', example: '管理员' },
            gender: { type: 'string', example: 'male' },
            phone: { type: 'string', example: '13800138000' },
            email: { type: 'string', example: 'admin@example.com' },
            status: { type: 'string', example: 'normal' },
            createTime: { type: 'string', example: '2024-01-20T10:30:00.000Z' },
            updateTime: { type: 'string', example: '2024-01-20T10:30:00.000Z' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 409, description: '用户名已存在' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    // 移除密码字段
    const { password, ...result } = user;
    return {
      code: 200,
      message: '创建成功',
      data: result
    };
  }

  @Get()
  @ApiOperation({ 
    summary: '获取用户列表',
    description: '分页查询用户列表，支持按用户名、昵称、手机号、邮箱、性别、状态进行筛选。返回数据不包含密码字段。'
  })
  @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
  @ApiQuery({ name: 'size', required: false, description: '每页数量', example: 10 })
  @ApiQuery({ name: 'username', required: false, description: '用户名（模糊匹配）', example: 'admin' })
  @ApiQuery({ name: 'nickname', required: false, description: '昵称（模糊匹配）', example: '管理员' })
  @ApiQuery({ name: 'phone', required: false, description: '手机号（模糊匹配）', example: '138' })
  @ApiQuery({ name: 'email', required: false, description: '邮箱（模糊匹配）', example: 'admin' })
  @ApiQuery({ name: 'gender', required: false, description: '性别', enum: ['male', 'female'] })
  @ApiQuery({ name: 'status', required: false, description: '用户状态', enum: ['normal', 'disabled'] })
  @ApiResponse({ 
    status: 200, 
    description: '获取成功',
    schema: {
      type: 'object',
      properties: {
        code: { type: 'number', example: 200 },
        message: { type: 'string', example: '获取成功' },
        data: {
          type: 'object',
          properties: {
            list: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  username: { type: 'string', example: 'admin' },
                  nickname: { type: 'string', example: '管理员' },
                  gender: { type: 'string', example: 'male' },
                  phone: { type: 'string', example: '13800138000' },
                  email: { type: 'string', example: 'admin@example.com' },
                  status: { type: 'string', example: 'normal' },
                  createTime: { type: 'string', example: '2024-01-20T10:30:00.000Z' },
                  updateTime: { type: 'string', example: '2024-01-20T10:30:00.000Z' }
                }
              }
            },
            total: { type: 'number', example: 50 },
            page: { type: 'number', example: 1 },
            size: { type: 'number', example: 10 }
          }
        }
      }
    }
  })
  async findAll(@Query() searchDto: SearchUserDto) {
    const { users, total } = await this.usersService.findAll(searchDto);
    // 移除密码字段
    const safeUsers = users.map(user => {
      const { password, ...safeUser } = user;
      return safeUser;
    });
    
    return {
      code: 200,
      message: '获取成功',
      data: {
        list: safeUsers,
        total,
        page: searchDto.page || 1,
        size: searchDto.size || 10
      }
    };
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户详情' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    // 移除密码字段
    const { password, ...result } = user;
    return {
      code: 200,
      message: '获取成功',
      data: result
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiResponse({ status: 200, description: '更新成功' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    // 移除密码字段
    const { password, ...result } = user;
    return {
      code: 200,
      message: '更新成功',
      data: result
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return {
      code: 200,
      message: '删除成功'
    };
  }
} 