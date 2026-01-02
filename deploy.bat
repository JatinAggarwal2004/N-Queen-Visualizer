@echo off
REM Deploy Script for N-Queens Visualizer (Windows)

echo Starting deployment process...

REM Step 1: Clean and build
echo Building the application...
call mvn clean package -DskipTests

if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    exit /b 1
)

echo Build successful!

REM Step 2: Check if Docker is available
where docker >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Docker detected. Building Docker image...
    docker build -t nqueens-visualizer:latest .
    
    if %ERRORLEVEL% EQU 0 (
        echo Docker image built successfully!
        echo To run with Docker: docker-compose up -d
    )
) else (
    echo Docker not found. Skipping Docker build.
)

REM Step 3: Display information
echo.
echo Deployment artifacts:
echo    JAR file: target\nqueens-visualizer-1.0.0.jar
echo.
echo Deployment preparation complete!
echo.
echo To run locally:
echo    java -jar target\nqueens-visualizer-1.0.0.jar
echo.
echo To deploy with Docker:
echo    docker-compose up -d

pause
