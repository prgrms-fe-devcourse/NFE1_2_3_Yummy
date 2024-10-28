"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateCommentDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var CreateCommentDto = /** @class */ (function () {
    function CreateCommentDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ description: '댓글 내용' }) // Swagger 설명
        ,
        class_validator_1.IsNotEmpty({ message: '댓글 내용을 입력해야 합니다.' })
    ], CreateCommentDto.prototype, "content");
    __decorate([
        swagger_1.ApiProperty({ description: '작성자 이름 (회원가입 기능 구현 후 수정예정)' }) // Swagger 설명
        ,
        class_validator_1.IsNotEmpty({ message: '작성자 이름을 입력해야 합니다.' })
    ], CreateCommentDto.prototype, "author");
    return CreateCommentDto;
}());
exports.CreateCommentDto = CreateCommentDto;
