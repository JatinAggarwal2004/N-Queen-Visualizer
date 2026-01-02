# N-Queens Visualizer

A beautiful, interactive Spring Boot application that visualizes the N-Queens problem solving algorithm with smooth animations and a vibrant UI.

## Features

✨ **Dynamic Board Size** - Support for board sizes from 4x4 to 20x20
🎯 **Custom Starting Position** - Choose where to place the first queen
🎨 **Vibrant UI** - Beautiful green-themed design with smooth animations
🎵 **Background Music** - Soft music to enhance the experience
⚡ **Real-time Visualization** - Watch every step of the backtracking algorithm
🎮 **Game-like Feel** - Interactive and engaging user experience
📊 **Live Statistics** - Track queens placed, iterations, and status
⌨️ **Keyboard Shortcuts** - Space (Start/Pause), R (Reset), M (Music)
🔄 **Animation Controls** - Pause, resume, and adjust speed
📱 **Responsive Design** - Works on all screen sizes

## Technology Stack

- **Backend**: Spring Boot 3.2.1
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Build Tool**: Maven
- **Java Version**: 17

## Project Structure

```
NQueensViusalizer/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/nqueens/
│   │   │       ├── NQueensVisualizerApplication.java
│   │   │       ├── config/
│   │   │       │   └── WebConfig.java
│   │   │       ├── controller/
│   │   │       │   ├── HomeController.java
│   │   │       │   └── NQueensController.java
│   │   │       ├── model/
│   │   │       │   ├── BoardState.java
│   │   │       │   ├── NQueensRequest.java
│   │   │       │   └── NQueensResponse.java
│   │   │       └── service/
│   │   │           └── NQueensService.java
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── css/
│   │       │   │   └── style.css
│   │       │   ├── js/
│   │       │   │   └── app.js
│   │       │   └── audio/
│   │       │       └── MUSIC_INSTRUCTIONS.md
│   │       ├── templates/
│   │       │   └── index.html
│   │       └── application.properties
├── pom.xml
└── README.md
```

## Installation & Setup

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd /home/jatin/Desktop_Backup/NQueensViusalizer
   ```

2. **Add Background Music** (Optional)
   - Follow instructions in `src/main/resources/static/audio/MUSIC_INSTRUCTIONS.md`
   - Download a royalty-free soft music track
   - Save it as `background-music.mp3` in the audio folder

3. **Build the project**
   ```bash
   mvn clean install
   ```

4. **Run the application**
   ```bash
   mvn spring-boot:run
   ```
   
   Or run the JAR file:
   ```bash
   java -jar target/nqueens-visualizer-1.0.0.jar
   ```

5. **Access the application**
   - Open your browser and navigate to: `http://localhost:8080`

## How to Use

1. **Set Board Size** - Choose a board size between 4 and 20
2. **Set Starting Position** - Click on a cell or use the input fields
3. **Adjust Animation Speed** - Use the slider to control visualization speed
4. **Click Start** - Watch the algorithm solve the puzzle!
5. **Use Controls**:
   - **Pause** - Stop the animation temporarily
   - **Resume** - Continue from where you paused
   - **Reset** - Clear the board and start over
   - **Music Toggle** - Turn background music on/off

### Keyboard Shortcuts
- `Space` - Start/Pause visualization
- `R` - Reset the board
- `M` - Toggle background music

## API Endpoints

### Solve N-Queens
```
POST /api/nqueens/solve
Content-Type: application/json

{
  "boardSize": 8,
  "startRow": 0,
  "startCol": 0
}
```

**Response:**
```json
{
  "iterations": [...],
  "totalQueens": 8,
  "totalIterations": 156,
  "solutionFound": true,
  "message": "Solution found!"
}
```

### Get Safe Positions
```
GET /api/nqueens/safe-positions?boardSize=8&row=0&col=0
```

## Deployment

### Deploy to Production

1. **Build for production**
   ```bash
   mvn clean package -DskipTests
   ```

2. **The JAR file will be in**: `target/nqueens-visualizer-1.0.0.jar`

3. **Deploy to any cloud platform**:
   - **Heroku**: Create Procfile with `web: java -jar target/nqueens-visualizer-1.0.0.jar`
   - **AWS Elastic Beanstalk**: Upload the JAR file directly
   - **Azure App Service**: Deploy using Maven plugin
   - **Google Cloud Platform**: Use App Engine or Cloud Run
   - **Docker**: Build and deploy with the Dockerfile

### Environment Variables
```properties
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

## Algorithm Explanation

The application uses a **backtracking algorithm** to solve the N-Queens problem:

1. Start by placing a queen at the user-specified position
2. For each subsequent row:
   - Try placing a queen in each column
   - Check if the position is safe (no conflicts with existing queens)
   - If safe, place the queen and move to the next row
   - If no safe position exists, backtrack to the previous row
3. Continue until all queens are placed or no solution exists

The visualization shows:
- **Yellow cells**: Positions being tried
- **Pink cells**: Queens successfully placed
- **Red cells**: Backtracking positions
- **Blue cells**: Safe positions (when available)

## Customization

### Change Color Theme
Edit `src/main/resources/static/css/style.css`:
```css
:root {
    --primary-green: #00ff88;
    --secondary-green: #00cc6f;
    /* Modify these values */
}
```

### Change Animation Speed Range
Edit `src/main/resources/templates/index.html`:
```html
<input type="range" id="speed" min="10" max="1000" value="300">
```

### Modify Board Size Limits
Edit `src/main/java/com/nqueens/controller/NQueensController.java`:
```java
if (request.getBoardSize() < 4 || request.getBoardSize() > 20) {
    // Change these values
}
```

## Performance Notes

- Larger boards (>12) may take longer to solve
- Animation speed can be increased for faster visualization
- The algorithm may take significantly longer for boards >15
- Consider increasing timeout values for very large boards

## Troubleshooting

**Port Already in Use**
```bash
# Change port in application.properties
server.port=8081
```

**Out of Memory for Large Boards**
```bash
# Increase JVM memory
java -Xmx2G -jar target/nqueens-visualizer-1.0.0.jar
```

**Music Not Playing**
- Ensure the audio file exists in the correct location
- Check browser console for errors
- Try clicking the music button twice (browser autoplay restrictions)

## Contributing

Feel free to fork this project and submit pull requests for:
- New themes and color schemes
- Additional visualization modes
- Performance optimizations
- New features

## License

This project is open source and available under the MIT License.

## Author

Created with ❤️ for interactive algorithm visualization

## Acknowledgments

- Spring Boot team for the excellent framework
- Font Awesome for the icons
- Google Fonts for Poppins font family

---

**Enjoy exploring the N-Queens problem! 👑**
