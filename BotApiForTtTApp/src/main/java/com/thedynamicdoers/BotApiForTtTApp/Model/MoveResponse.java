/**

 This package contains the Model class that defines the response object for the computer opponent's move.
 */
package com.thedynamicdoers.BotApiForTtTApp.Model;

public class MoveResponse {
    private int index;

    public MoveResponse(int index) {
        this.index = index;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }
}