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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("./entities/customer.entity");
let CustomersService = class CustomersService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async create(createCustomerDto) {
        const lastCustomer = await this.customerRepository.findOne({
            order: { id: 'DESC' },
        });
        const nextNumber = lastCustomer ? lastCustomer.id + 1 : 1;
        const customerNumber = `C${String(nextNumber).padStart(3, '0')}`;
        const customer = this.customerRepository.create(Object.assign(Object.assign({}, createCustomerDto), { customerNumber, status: 'active' }));
        return await this.customerRepository.save(customer);
    }
    async findAll(page = 1, limit = 10) {
        const [data, total] = await this.customerRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createTime: 'DESC' },
        });
        return {
            data,
            total,
            page,
            limit,
        };
    }
    async search(searchDto) {
        const queryBuilder = this.customerRepository.createQueryBuilder('customer');
        if (searchDto.customerNumber) {
            queryBuilder.andWhere('customer.customerNumber LIKE :customerNumber', {
                customerNumber: `%${searchDto.customerNumber}%`,
            });
        }
        if (searchDto.customerName) {
            queryBuilder.andWhere('customer.customerName LIKE :customerName', {
                customerName: `%${searchDto.customerName}%`,
            });
        }
        if (searchDto.customerAddress) {
            queryBuilder.andWhere('customer.customerAddress LIKE :customerAddress', {
                customerAddress: `%${searchDto.customerAddress}%`,
            });
        }
        if (searchDto.area) {
            queryBuilder.andWhere('customer.area = :area', {
                area: searchDto.area,
            });
        }
        if (searchDto.contactPerson) {
            queryBuilder.andWhere('customer.contactPerson LIKE :contactPerson', {
                contactPerson: `%${searchDto.contactPerson}%`,
            });
        }
        const data = await queryBuilder
            .orderBy('customer.createTime', 'DESC')
            .getMany();
        return {
            data,
            total: data.length,
        };
    }
    async findOne(id) {
        return await this.customerRepository.findOne({
            where: { id },
        });
    }
    async update(id, updateCustomerDto) {
        await this.customerRepository.update(id, updateCustomerDto);
        return await this.findOne(id);
    }
    async remove(id) {
        const customer = await this.findOne(id);
        if (customer) {
            await this.customerRepository.delete(id);
        }
        return customer;
    }
    async getCustomerDetail(id) {
        return await this.findOne(id);
    }
    async generateNavigationUrl(customerIds) {
        const customers = await this.customerRepository.findByIds(customerIds);
        if (customers.length === 0) {
            throw new common_1.NotFoundException('未找到有效的客户地址');
        }
        let url = 'https://uri.amap.com/navigation?';
        customers.forEach((customer, index) => {
            if (index === 0) {
                url += `to=${customer.longitude},${customer.latitude}`;
            }
            else {
                url += `&mid=${customer.longitude},${customer.latitude}`;
            }
        });
        url += '&dev=0&t=0';
        return url;
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomersService);
//# sourceMappingURL=customers.service.js.map