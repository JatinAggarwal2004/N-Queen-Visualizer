package com.nqueens.controller;

import com.nqueens.model.NQueensRequest;
import com.nqueens.model.NQueensResponse;
import com.nqueens.service.NQueensService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nqueens")
@CrossOrigin(origins = "*")
public class NQueensController {
    
    @Autowired
    private NQueensService nQueensService;
    
    @PostMapping("/solve")
    public ResponseEntity<NQueensResponse> solveNQueens(@RequestBody NQueensRequest request) {
        if (request.getBoardSize() < 4 || request.getBoardSize() > 20) {
            return ResponseEntity.badRequest().body(
                new NQueensResponse(null, 0, 0, false, 
                "Board size must be between 4 and 20")
            );
        }
        
        if (request.getStartRow() < 0 || request.getStartRow() >= request.getBoardSize() ||
            request.getStartCol() < 0 || request.getStartCol() >= request.getBoardSize()) {
            return ResponseEntity.badRequest().body(
                new NQueensResponse(null, 0, 0, false, 
                "Starting position is out of bounds")
            );
        }
        
        NQueensResponse response = nQueensService.solveNQueens(request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/safe-positions")
    public ResponseEntity<Map<String, Object>> getSafePositions(
            @RequestParam int boardSize,
            @RequestParam int row,
            @RequestParam int col) {
        
        List<int[]> safePositions = nQueensService.getSafePositions(boardSize, row, col);
        
        Map<String, Object> response = new HashMap<>();
        response.put("safePositions", safePositions);
        response.put("count", safePositions.size());
        
        return ResponseEntity.ok(response);
    }
}
