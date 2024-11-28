package com.chiikawa.ricefriend.controller;

import java.util.List;

import com.chiikawa.ricefriend.data.dto.ChatPartDto;
import com.chiikawa.ricefriend.data.dto.MessageDto;
import com.chiikawa.ricefriend.service.MessageService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;

    // 메세지 등록
    @PostMapping
    public ResponseEntity<MessageDto.MessageSaveDto> saveMessage(@RequestBody MessageDto.MessageSaveDto requestDto) {
        messageService.saveMessage(requestDto);

        //return ResponseEntity.status(HttpStatus.CREATED).build();
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 메세지 조회
    @GetMapping("/{id}")
    public ResponseEntity<MessageDto.MessageResponseDto> getMessageById(@PathVariable int id) {
        MessageDto.MessageResponseDto responseDto = messageService.getMessageById(id);

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{userid}/{roomid}")
    public ResponseEntity<List<MessageDto.MessageResponseDto>> getMessageListByCompositeId(@PathVariable int userid, @PathVariable int roomid) {
        List<MessageDto.MessageResponseDto> messageList = messageService.getMessagesByCompositeId(userid, roomid);

        return ResponseEntity.ok(messageList);
    }

    // 전체 메세지 조회
    @GetMapping
    public ResponseEntity<List<MessageDto.MessageResponseDto>> getMessageList() {
        List<MessageDto.MessageResponseDto> messageList = messageService.getAllMessages();

        return ResponseEntity.ok(messageList);
    }
}