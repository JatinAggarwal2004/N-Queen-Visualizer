package com.nqueens.service;

import com.nqueens.model.BoardState;
import com.nqueens.model.NQueensRequest;
import com.nqueens.model.NQueensResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class NQueensService {
    
    private static final int MAX_ITERATIONS = 5000; // Limit iterations to prevent memory issues
    private List<BoardState> iterations;
    private int[][] board;
    private int size;
    private int queensPlaced;
    private boolean maxIterationsReached;
    
    public NQueensResponse solveNQueens(NQueensRequest request) {
        this.size = request.getBoardSize();
        this.board = new int[size][size];
        this.iterations = new ArrayList<>();
        this.queensPlaced = 0;
        this.maxIterationsReached = false;
        
        // Place the first queen at the starting position
        if (isSafe(request.getStartRow(), request.getStartCol())) {
            board[request.getStartRow()][request.getStartCol()] = 1;
            queensPlaced++;
            addIteration(request.getStartRow(), request.getStartCol(), "success", 
                        "Starting queen placed at position (" + request.getStartRow() + ", " + request.getStartCol() + ")", false);
        } else {
            return new NQueensResponse(iterations, 0, 0, false, 
                                      "Starting position is not safe!");
        }
        
        // Continue solving from the next row
        boolean solved = solveNQueensUtil(request.getStartRow() + 1);
        
        if (maxIterationsReached) {
            addIteration(-1, -1, "backtrack", "Too many iterations. Board size too large or starting position difficult!", true);
            return new NQueensResponse(
                iterations,
                queensPlaced,
                iterations.size(),
                false,
                "Computation stopped: Too complex for visualization (" + MAX_ITERATIONS + "+ iterations)"
            );
        }
        
        if (solved) {
            addIteration(-1, -1, "success", "Solution found with " + queensPlaced + " queens!", true);
        } else {
            addIteration(-1, -1, "backtrack", "No solution possible from this starting position", true);
        }
        
        return new NQueensResponse(
            iterations,
            queensPlaced,
            iterations.size(),
            solved,
            solved ? "Solution found!" : "No solution exists from this starting position"
        );
    }
    
    private boolean solveNQueensUtil(int row) {
        // Check if max iterations reached to prevent memory overflow
        if (maxIterationsReached || iterations.size() >= MAX_ITERATIONS) {
            maxIterationsReached = true;
            return false;
        }
        
        if (row >= size) {
            return true; // All queens placed successfully
        }
        
        for (int col = 0; col < size; col++) {
            addIteration(row, col, "trying", "Trying to place queen at (" + row + ", " + col + ")", false);
            
            if (isSafe(row, col)) {
                board[row][col] = 1;
                queensPlaced++;
                addIteration(row, col, "success", "Queen placed at (" + row + ", " + col + ")", false);
                
                if (solveNQueensUtil(row + 1)) {
                    return true;
                }
                
                // Backtrack
                board[row][col] = 0;
                queensPlaced--;
                addIteration(row, col, "backtrack", "Backtracking from (" + row + ", " + col + ")", false);
            }
        }
        
        return false;
    }
    
    private boolean isSafe(int row, int col) {
        // Check column
        for (int i = 0; i < size; i++) {
            if (board[i][col] == 1) {
                return false;
            }
        }
        
        // Check upper left diagonal
        for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 1) {
                return false;
            }
        }
        
        // Check upper right diagonal
        for (int i = row, j = col; i >= 0 && j < size; i--, j++) {
            if (board[i][j] == 1) {
                return false;
            }
        }
        
        // Check lower left diagonal
        for (int i = row, j = col; i < size && j >= 0; i++, j--) {
            if (board[i][j] == 1) {
                return false;
            }
        }
        
        // Check lower right diagonal
        for (int i = row, j = col; i < size && j < size; i++, j++) {
            if (board[i][j] == 1) {
                return false;
            }
        }
        
        // Check row
        for (int j = 0; j < size; j++) {
            if (board[row][j] == 1) {
                return false;
            }
        }
        
        return true;
    }
    
    private void addIteration(int row, int col, String status, String message, boolean isFinal) {
        int[][] boardCopy = new int[size][size];
        for (int i = 0; i < size; i++) {
            boardCopy[i] = Arrays.copyOf(board[i], size);
        }
        
        BoardState state = new BoardState(boardCopy, row, col, status, message, isFinal);
        iterations.add(state);
    }
    
    public List<int[]> getSafePositions(int boardSize, int row, int col) {
        this.size = boardSize;
        this.board = new int[size][size];
        board[row][col] = 1;
        
        List<int[]> safePositions = new ArrayList<>();
        
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                if (i == row && j == col) {
                    continue;
                }
                if (isSafe(i, j)) {
                    safePositions.add(new int[]{i, j});
                }
            }
        }
        
        return safePositions;
    }
}
