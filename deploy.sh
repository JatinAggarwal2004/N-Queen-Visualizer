#!/bin/bash

# Deploy Script for N-Queens Visualizer

echo "🚀 Starting deployment process..."

# Step 1: Clean and build
echo "📦 Building the application..."
mvn clean package -DskipTests

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Step 2: Check if Docker is available
if command -v docker &> /dev/null; then
    echo "🐳 Docker detected. Building Docker image..."
    docker build -t nqueens-visualizer:latest .
    
    if [ $? -eq 0 ]; then
        echo "✅ Docker image built successfully!"
        echo "To run with Docker: docker-compose up -d"
    fi
else
    echo "⚠️  Docker not found. Skipping Docker build."
fi

# Step 3: Display JAR location
echo ""
echo "📍 Deployment artifacts:"
echo "   JAR file: target/nqueens-visualizer-1.0.0.jar"
echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "To run locally:"
echo "   java -jar target/nqueens-visualizer-1.0.0.jar"
echo ""
echo "To deploy to Heroku:"
echo "   git init"
echo "   heroku create your-app-name"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git push heroku main"
echo ""
echo "To deploy with Docker:"
echo "   docker-compose up -d"
