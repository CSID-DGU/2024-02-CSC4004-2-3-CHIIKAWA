package com.chiikawa.ricefriend.controller;

import java.util.List;

import com.chiikawa.ricefriend.data.dto.ChatRoomDto;
import com.chiikawa.ricefriend.service.ChatRoomService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatrooms")
public class ChatRoomController {

    private final ChatRoomService chatroomService;

    // 유저 등록
    @PostMapping
    public ResponseEntity<ChatRoomDto.ChatRoomSaveDto> saveChatRoom(@RequestBody ChatRoomDto.ChatRoomSaveDto requestDto) {
        chatroomService.saveChatRoom(requestDto);

        //return ResponseEntity.status(HttpStatus.CREATED).build();
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 유저 수정
    @PatchMapping("/{id}")
    public ResponseEntity<ChatRoomDto.ChatRoomUpdateDto> updateChatRoom(@PathVariable int id, @RequestBody ChatRoomDto.ChatRoomUpdateDto requestDto) {
        chatroomService.updateChatRoom(id, requestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 유저 조회
    @GetMapping("/{id}")
    public ResponseEntity<ChatRoomDto.ChatRoomResponseDto> getChatRoomById(@PathVariable int id) {
        ChatRoomDto.ChatRoomResponseDto responseDto = chatroomService.getChatRoomById(id);

        return ResponseEntity.ok(responseDto);
    }

    // 전체 유저 조회
    @GetMapping
    public ResponseEntity<List<ChatRoomDto.ChatRoomResponseDto>> getRoomList() {
        List<ChatRoomDto.ChatRoomResponseDto> roomList = chatroomService.getAllChatRooms();

        return ResponseEntity.ok(roomList);
    }

    // 유저 삭제
    @DeleteMapping("/delete/{id}")
    public void deleteChatRoomById(@PathVariable int id) {
        chatroomService.deleteChatRoom(id);
    }
}