const fs = require('fs');
const path = require('path');

// Define paths
const gifsDir = path.join(__dirname, 'assets/gifs');
const outputDir = path.join(__dirname, 'static_pages');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Read all GIF files in the directory
const gifFiles = fs.readdirSync(gifsDir).filter(file => file.endsWith('.gif'));

// Generate HTML files
gifFiles.forEach(gif => {
    const gifName = path.basename(gif, '.gif');
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GIF Viewer</title>
    
    <!-- Open Graph Metadata for Discord -->
    <meta property="og:type" content="image">
    <meta property="og:title" content="GIF Viewer">
    <meta property="og:image" content="https://kubalubimaslo.github.io/gifproject/assets/gifs/${gif}">
    <meta property="og:url" content="https://kubalubimaslo.github.io/gifproject/${gifName}.html">
</head>
<body>
    <h1>GIF Viewer</h1>
    <p>Displaying your GIF:</p>
    <img src="https://kubalubimaslo.github.io/gifproject/assets/gifs/${gif}" alt="GIF" width="400">
</body>
</html>
    `;
    fs.writeFileSync(path.join(outputDir, `${gifName}.html`), htmlContent);
    console.log(`Generated: ${gifName}.html`);
});

console.log('All GIF pages generated!');
