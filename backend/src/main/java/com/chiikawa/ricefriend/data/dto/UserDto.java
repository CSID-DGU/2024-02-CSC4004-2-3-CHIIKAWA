package com.chiikawa.ricefriend.data.dto;

import java.sql.Blob;

import com.chiikawa.ricefriend.data.entity.FoodCategory;
import com.chiikawa.ricefriend.data.entity.User;

import lombok.*;
import com.fasterxml.jackson.annotation.JsonInclude;

public class UserDto {
    @Builder
    @Getter
    @Setter
    public static class UserSaveDto{
        private String email;
        private String password;
        private String name;
        private Blob profileimg;
        private FoodCategory food1;
        private FoodCategory food2;
        private FoodCategory food3;

        public User toEntity() {
            return User.builder()
                    .email(email)
                    .password(password)
                    .name(name)
                    .profileimg(profileimg)
                    .food1(food1)
                    .food2(food2)
                    .food3(food3)
                    .build();
        }
    }

    @Getter
    @Builder
    public static class UserUpdateDto{
        private String password;
        private String name;

        private String state;

        private Blob profileimg;

        private FoodCategory food1;
        private FoodCategory food2;
        private FoodCategory food3;
    }

// ===================요청, 응답 구분선 ================

    @Getter
    @Builder
    @AllArgsConstructor
    public static class UserResponseDto{
        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        private int id;
        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        private String email;
        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        private String name;

        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        private String state;

        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        private Blob profileimg;

        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        private FoodCategory food1;
        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        private FoodCategory food2;
        @JsonInclude(JsonInclude.Include.NON_DEFAULT)
        private FoodCategory food3;

        public UserResponseDto(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.name = user.getName();
            this.state = user.getState();
            this.profileimg = user.getProfileimg();
            this.food1 = user.getFood1();
            this.food2 = user.getFood2();
            this.food3 = user.getFood3();
        }
    }
}