"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.PostController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var swagger_1 = require("@nestjs/swagger");
var PostController = /** @class */ (function () {
    function PostController(postService) {
        this.postService = postService;
    }
    PostController.prototype.create = function (createPostDto, req) {
        var userId = req.user._id; // JWT 토큰에서 사용자 ID 추출
        return this.postService.create(createPostDto, userId);
    };
    PostController.prototype.findAll = function () {
        return this.postService.findAll();
    };
    PostController.prototype.findOne = function (id) {
        return this.postService.findOne(id);
    };
    PostController.prototype.update = function (id, updatePostDto, req) {
        var userId = req.user._id; // JWT 토큰에서 사용자 ID 추출
        return this.postService.update(id, updatePostDto, userId);
    };
    PostController.prototype.remove = function (id, req) {
        var userId = req.user._id; // JWT 토큰에서 사용자 ID 추출
        return this.postService.remove(id, userId);
    };
    __decorate([
        common_1.Post(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        swagger_1.ApiOperation({ summary: '게시글 생성' }),
        __param(0, common_1.Body()), __param(1, common_1.Req())
    ], PostController.prototype, "create");
    __decorate([
        common_1.Get(),
        swagger_1.ApiOperation({ summary: '전체 게시글 조회' })
    ], PostController.prototype, "findAll");
    __decorate([
        common_1.Get(':id'),
        swagger_1.ApiOperation({ summary: '특정 게시글 조회' }),
        __param(0, common_1.Param('id'))
    ], PostController.prototype, "findOne");
    __decorate([
        common_1.Put(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        swagger_1.ApiOperation({ summary: '게시글 업데이트' }),
        common_1.UsePipes(new common_1.ValidationPipe({ whitelist: true })) // 유효성 검사 파이프 추가
        ,
        __param(0, common_1.Param('id')),
        __param(1, common_1.Body()),
        __param(2, common_1.Req())
    ], PostController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        swagger_1.ApiOperation({ summary: '특정 게시글 삭제' }),
        __param(0, common_1.Param('id')), __param(1, common_1.Req())
    ], PostController.prototype, "remove");
    PostController = __decorate([
        swagger_1.ApiTags('post'),
        swagger_1.ApiBearerAuth() // JWT 토큰을 사용하는 API
        ,
        common_1.Controller('post')
    ], PostController);
    return PostController;
}());
exports.PostController = PostController;
