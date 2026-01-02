package com.nqueens.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NQueensRequest {
    private int boardSize;
    private int startRow;
    private int startCol;
}
