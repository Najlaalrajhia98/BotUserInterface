/**
 * This package contains the Service class that provides the functionality of getting the computer opponent's move
 * in a game of Tic Tac Toe.
 */
package com.thedynamicdoers.BotApiForTtTApp.Service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
@Service
public class BotService {

    private String[] gameBoard = {"", "", "", "", "", "", "", "", ""};

    /**
     * Returns the computer opponent's move.
     *
     * @return an integer representing the index of the square where the computer opponent wants to make its move.
     */
    public int getComputerOpponentMove() {
        List<Integer> availableSquares = new ArrayList<>();
        for (int i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i].isEmpty()) {
                availableSquares.add(i);
            }
        }
        return availableSquares.get(new Random().nextInt(availableSquares.size()));
    }
}
