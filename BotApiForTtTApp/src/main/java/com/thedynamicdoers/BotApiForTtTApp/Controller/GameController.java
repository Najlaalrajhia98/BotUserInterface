package com.thedynamicdoers.BotApiForTtTApp.Controller;

import com.thedynamicdoers.BotApiForTtTApp.Model.MoveResponse;
import com.thedynamicdoers.BotApiForTtTApp.Service.BotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class GameController {

    @Autowired
    public BotService botService;
    @GetMapping("/computer-move")
    public ResponseEntity<MoveResponse> getComputerMove() {
        // Return response with computer's move
        int computerMove =botService.getComputerOpponentMove();
        botService.makeMove(computerMove, "O");
        MoveResponse response = new MoveResponse(computerMove);
        return ResponseEntity.ok().body(response);
    }
}
