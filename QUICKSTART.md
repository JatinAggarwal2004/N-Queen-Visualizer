# 🚀 Quick Start Guide

## Get Started in 3 Steps!

### 1️⃣ Run the Application

**Option A: Using Maven (Recommended)**
```bash
mvn spring-boot:run
```

**Option B: Build and Run JAR**
```bash
mvn clean package -DskipTests
java -jar target/nqueens-visualizer-1.0.0.jar
```

**Option C: Using Docker**
```bash
docker-compose up -d
```

### 2️⃣ Open in Browser
Navigate to: **http://localhost:8080**

### 3️⃣ Start Playing!
1. Select board size (4-20)
2. Click on a cell or set starting position
3. Click "Start Visualization"
4. Watch the algorithm work! 🎉

---

## 🎵 Adding Background Music (Optional)

1. Download a royalty-free music file from:
   - https://freesound.org/
   - https://incompetech.com/

2. Save as: `src/main/resources/static/audio/background-music.mp3`

3. Restart the app and click the Music button!

---

## ⌨️ Keyboard Shortcuts

- **Space** - Start/Pause
- **R** - Reset
- **M** - Toggle Music

---

## 🎮 Features to Try

✨ Try different board sizes (8, 10, 12)
🎯 Start from different positions
⚡ Adjust animation speed
🎨 Watch the beautiful animations
📊 Monitor live statistics

---

## 🐛 Troubleshooting

**Port 8080 already in use?**
```bash
# Kill the process
sudo lsof -ti:8080 | xargs kill -9
```

**Maven not found?**
```bash
# Install Maven
sudo apt-get install maven  # Linux
brew install maven          # macOS
```

**Java not found?**
```bash
# Check Java version (need 17+)
java -version

# Install if needed
sudo apt-get install openjdk-17-jdk  # Linux
brew install openjdk@17              # macOS
```

---

## 📦 Deploy to Production

Run the deploy script:
```bash
./deploy.sh        # Linux/Mac
deploy.bat         # Windows
```

Then follow the on-screen instructions for your deployment platform!

---

**Need Help?** Check the full README.md for detailed documentation.

**Happy Visualizing! 👑**
