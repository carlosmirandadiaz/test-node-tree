const directoryToTree = require('./directoryToTree'); // Import your function
const path = require('path');

// Define the root directory path and maximum depth
const rootPath = 'your/root/directory'; // Replace with your root directory path
const maxDepth = 1; // Replace with the desired maximum depth

// Call the directoryToTree function
const tree = directoryToTree(rootPath, maxDepth);

// Output the resulting tree structure
console.log(JSON.stringify(tree, null, 2)); //Change the depth acording to the maxDepth

