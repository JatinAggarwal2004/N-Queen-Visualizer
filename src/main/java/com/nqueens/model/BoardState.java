package com.nqueens.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardState {
    private int[][] board;
    private int row;
    private int col;
    private String status; // "trying", "success", "backtrack"
    private String message;
    private boolean isFinal;
}
