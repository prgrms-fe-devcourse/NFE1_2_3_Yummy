"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreatePostDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger"); // Swagger 데코레이터 임포트
var CreatePostDto = /** @class */ (function () {
    function CreatePostDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ description: '게시글 제목', example: '제목 예시' }) // Swagger에 설명과 예시 추가
        ,
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CreatePostDto.prototype, "title");
    __decorate([
        swagger_1.ApiProperty({ description: '게시글 내용', example: '내용 예시' }) // Swagger에 설명과 예시 추가
        ,
        class_validator_1.IsNotEmpty(),
        class_validator_1.IsString()
    ], CreatePostDto.prototype, "content");
    __decorate([
        swagger_1.ApiProperty({
            description: '게시글 카테고리',
            example: '일상',
            required: false
        }) // Swagger에 설명과 예시 추가
        ,
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreatePostDto.prototype, "category");
    __decorate([
        swagger_1.ApiProperty({
            description: '게시글 이미지 URL',
            example: 'http://example.com/image.jpg',
            required: false
        }) // Swagger에 설명과 예시 추가
        ,
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreatePostDto.prototype, "image_url");
    return CreatePostDto;
}());
exports.CreatePostDto = CreatePostDto;
