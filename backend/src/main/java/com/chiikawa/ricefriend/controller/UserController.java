package com.chiikawa.ricefriend.controller;

import java.util.List;

import com.chiikawa.ricefriend.data.dto.UserDto;
import com.chiikawa.ricefriend.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/{email}/{pw}")
    public ResponseEntity<UserDto.UserResponseDto> login(@PathVariable String email, @PathVariable String pw) {
        UserDto.UserResponseDto responseDto = userService.login(email, pw);

        return ResponseEntity.ok(responseDto);
    }

    // 유저 등록
    @PostMapping
    public ResponseEntity<UserDto.UserSaveDto> saveUser(@RequestBody UserDto.UserSaveDto requestDto) {
        userService.saveUser(requestDto);

        //return ResponseEntity.status(HttpStatus.CREATED).build();
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 유저 수정
    @PatchMapping("/{id}")
    public ResponseEntity<UserDto.UserUpdateDto> updateUser(@PathVariable int id, @RequestBody UserDto.UserUpdateDto requestDto) {
        userService.updateUser(id, requestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 유저 조회
    @GetMapping("/{id}")
    public ResponseEntity<UserDto.UserResponseDto> getUserById(@PathVariable int id) {
        UserDto.UserResponseDto responseDto = userService.getUserById(id);

        return ResponseEntity.ok(responseDto);
    }

    // 전체 유저 조회
    @GetMapping
    public ResponseEntity<List<UserDto.UserResponseDto>> getUserList() {
        List<UserDto.UserResponseDto> userList = userService.getAllUsers();

        return ResponseEntity.ok(userList);
    }

    // 유저 삭제
    @DeleteMapping("/delete/{id}")
    public void deleteUserById(@PathVariable int id) {
        userService.deleteUser(id);
    }
}