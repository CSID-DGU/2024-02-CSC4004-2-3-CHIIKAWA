package com.chiikawa.ricefriend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.chiikawa.ricefriend.data.dto.UserDto;
import com.chiikawa.ricefriend.data.entity.User;
import com.chiikawa.ricefriend.data.entity.FoodCategory;
import com.chiikawa.ricefriend.data.repository.UserRepository;
import com.chiikawa.ricefriend.data.repository.FoodCategoryRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    private FoodCategoryRepository foodRepository;

    public UserDto.UserResponseDto login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if(!user.orElseThrow(()-> new IllegalStateException("해당 이메일이 존재하지 않습니다.")).checkPassword(password)){
            throw new IllegalStateException("이메일과 비밀번호가 일치하지 않습니다.");
        }

        return new UserDto.UserResponseDto(user.orElseThrow());
    }

    public User saveUser(UserDto.UserSaveDto requestDto) {
        FoodCategory food1 = foodRepository.findById(requestDto.getFavfood_id1()).orElseThrow();
        FoodCategory food2 = foodRepository.findById(requestDto.getFavfood_id2()).orElseThrow();
        FoodCategory food3 = foodRepository.findById(requestDto.getFavfood_id3()).orElseThrow();

        User user = requestDto.toEntity(food1, food2, food3);
        return userRepository.save(user);
    }

    public void updateUser(int id, UserDto.UserUpdateDto requestDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id = "+ id + " 유저가 없습니다."));

        user.update(requestDto.getPassword()
                , requestDto.getName()
                , requestDto.getProfileimg()
                , requestDto.getFood1()
                , requestDto.getFood2()
                , requestDto.getFood3());
    }

    public List<UserDto.UserResponseDto> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(UserDto.UserResponseDto::new)
                .collect(Collectors.toList());
    }

    public UserDto.UserResponseDto getUserById(int id) {
        User entity = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다. id=" + id));

        return new UserDto.UserResponseDto(entity);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}