const fs = require("fs");
const path = require("path");

// Specify the image path (Update this path to match your file location)
const imagePath = path.join("i1");

// Read the image file and convert to Base64
fs.readFile(imagePath, (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  const base64Image = data.toString("base64");
  console.log(base64Image); // Copy this output to use in the next step
});
