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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CommentController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var mongoose_1 = require("mongoose");
var CommentController = /** @class */ (function () {
    function CommentController(commentService, usersService) {
        this.commentService = commentService;
        this.usersService = usersService;
    }
    // UsersService 주입
    // 댓글 생성
    CommentController.prototype.createComment = function (postId, createCommentDto, // DTO 사용
    req) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.user._id;
                        return [4 /*yield*/, this.usersService.findById(userId)];
                    case 1:
                        user = _a.sent();
                        createCommentDto.author = user.nickname;
                        return [2 /*return*/, this.commentService.create(new mongoose_1.Types.ObjectId(postId), createCommentDto.content, userId, createCommentDto.author)];
                }
            });
        });
    };
    // 특정 게시글의 댓글 조회
    CommentController.prototype.getComments = function (postId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.commentService.findByPostId(postId)];
            });
        });
    };
    // 댓글 수정
    CommentController.prototype.updateComment = function (postId, commentId, updateCommentDto, // DTO 사용
    req) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.user._id;
                        return [4 /*yield*/, this.commentService.findById(commentId)];
                    case 1:
                        comment = _a.sent();
                        if (!comment) {
                            throw new common_1.NotFoundException('댓글을 찾을 수 없습니다.');
                        }
                        // 작성자 ID 비교
                        if (!comment.userId.equals(userId)) {
                            throw new common_1.ForbiddenException('자신의 댓글만 수정할 수 있습니다.'); // 권한이 없는 경우
                        }
                        return [2 /*return*/, this.commentService.update(commentId, updateCommentDto.content)];
                }
            });
        });
    };
    // 댓글 삭제
    CommentController.prototype.deleteComment = function (postId, commentId, req) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.user._id;
                        return [4 /*yield*/, this.commentService.findById(commentId)];
                    case 1:
                        comment = _a.sent();
                        if (!comment) {
                            throw new common_1.NotFoundException('댓글을 찾을 수 없습니다.');
                        }
                        // 작성자 ID 비교
                        if (!comment.userId.equals(userId)) {
                            throw new common_1.ForbiddenException('자신의 댓글만 삭제할 수 있습니다.'); // 권한이 없는 경우
                        }
                        return [2 /*return*/, this.commentService["delete"](commentId)];
                }
            });
        });
    };
    __decorate([
        common_1.Post(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard) // 생성 시 JWT 검증 가드 적용
        ,
        swagger_1.ApiOperation({ summary: '댓글 생성' }),
        swagger_1.ApiResponse({
            status: 201,
            description: '댓글이 성공적으로 생성되었습니다.'
        }),
        swagger_1.ApiResponse({ status: 400, description: '잘못된 요청' }),
        __param(0, common_1.Param('postId')),
        __param(1, common_1.Body()),
        __param(2, common_1.Req())
    ], CommentController.prototype, "createComment");
    __decorate([
        common_1.Get(),
        swagger_1.ApiOperation({ summary: '특정 게시글의 댓글 조회' }),
        swagger_1.ApiResponse({ status: 200, description: '댓글 목록 반환' }),
        __param(0, common_1.Param('postId'))
    ], CommentController.prototype, "getComments");
    __decorate([
        common_1.Put(':commentId'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard) // 생성 시 JWT 검증 가드 적용
        ,
        swagger_1.ApiOperation({ summary: '댓글 수정' }),
        swagger_1.ApiParam({ name: 'commentId', description: '수정할 댓글 ID' }),
        swagger_1.ApiResponse({
            status: 200,
            description: '댓글이 성공적으로 수정되었습니다.'
        }),
        swagger_1.ApiResponse({ status: 404, description: '댓글을 찾을 수 없습니다.' }),
        __param(0, common_1.Param('postId')),
        __param(1, common_1.Param('commentId')),
        __param(2, common_1.Body()),
        __param(3, common_1.Req())
    ], CommentController.prototype, "updateComment");
    __decorate([
        common_1.Delete(':commentId'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard) // 생성 시 JWT 검증 가드 적용
        ,
        swagger_1.ApiOperation({ summary: '댓글 삭제' }),
        swagger_1.ApiParam({ name: 'commentId', description: '삭제할 댓글 ID' }),
        swagger_1.ApiResponse({
            status: 200,
            description: '댓글이 성공적으로 삭제되었습니다.'
        }),
        swagger_1.ApiResponse({ status: 404, description: '댓글을 찾을 수 없습니다.' }),
        __param(0, common_1.Param('postId')),
        __param(1, common_1.Param('commentId')),
        __param(2, common_1.Req())
    ], CommentController.prototype, "deleteComment");
    CommentController = __decorate([
        swagger_1.ApiTags('comments') // 태그 설정
        ,
        swagger_1.ApiBearerAuth() // JWT 토큰을 사용하는 API
        ,
        common_1.Controller('post/:postId/comment')
    ], CommentController);
    return CommentController;
}());
exports.CommentController = CommentController;
