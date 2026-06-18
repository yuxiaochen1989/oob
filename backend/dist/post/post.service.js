"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const user_entity_1 = require("../user/entities/user.entity");
const bcrypt = __importStar(require("bcryptjs"));
let PostService = class PostService {
    postRepository;
    userRepository;
    constructor(postRepository, userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    async onModuleInit() {
        const count = await this.postRepository.count();
        if (count === 0) {
            let admin = await this.userRepository.findOne({ where: { username: 'admin' } });
            if (!admin) {
                const salt = bcrypt.genSaltSync(10);
                admin = this.userRepository.create({
                    username: 'admin',
                    phone: '13800000000',
                    password: bcrypt.hashSync('123456', salt),
                    nickname: '手工帮官方',
                    avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
                });
                await this.userRepository.save(admin);
            }
            await this.postRepository.save([
                {
                    userId: admin.id,
                    title: '【图文教程】零基础制作复古小牛皮钱包',
                    content: '第一步：准备好皮料和工具；第二步：打孔；第三步：缝线...',
                    type: 3,
                    media_urls: ['https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'],
                    audit_status: 1,
                    like_count: 120,
                    collect_count: 50,
                },
                {
                    userId: admin.id,
                    title: '【视频教程】10分钟学会毛线编织小熊',
                    content: '今天教大家用钩针编织一只可爱的小熊，非常适合新手哦！',
                    type: 4,
                    media_urls: ['https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'],
                    audit_status: 1,
                    like_count: 340,
                    collect_count: 210,
                }
            ]);
        }
    }
    async create(userId, createPostDto) {
        const post = this.postRepository.create({
            ...createPostDto,
            userId,
            audit_status: 1,
        });
        await this.postRepository.save(post);
        return { message: '发布成功', id: post.id };
    }
    async findAll(type) {
        const query = this.postRepository.createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .where('post.audit_status = :status', { status: 1 })
            .orderBy('post.create_time', 'DESC');
        if (type) {
            query.andWhere('post.type = :type', { type });
        }
        query.select({
            post: {
                id: true,
                title: true,
                content: true,
                type: true,
                media_urls: true,
                like_count: true,
                collect_count: true,
                comment_count: true,
                create_time: true,
            },
            user: {
                id: true,
                nickname: true,
                avatar: true,
            }
        });
        return await query.getMany();
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map