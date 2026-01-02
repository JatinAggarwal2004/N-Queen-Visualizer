package com.nqueens.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NQueensResponse {
    private List<BoardState> iterations;
    private int totalQueens;
    private int totalIterations;
    private boolean solutionFound;
    private String message;
}
