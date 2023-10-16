const fs = require('fs');
const path = require('path');

function directoryToTree(rootPath, maxDepth) {
  const fullPath = path.join(process.cwd(), rootPath);

  function createNode(nodePath, nodeType) {
    const stats = fs.statSync(nodePath);
    return {
      name: path.basename(nodePath),
      path: path.relative(fullPath, nodePath),
      type: nodeType,
      size: stats.size,
      children: [],
    };
  }

  function buildTree(currentPath, currentDepth) {
    if (currentDepth > maxDepth) {
      return null;
    }

    const node = createNode(currentPath, 'dir');

    if (currentDepth < maxDepth) {
      const filesAndDirs = fs.readdirSync(currentPath);

      for (const name of filesAndDirs) {
        const childPath = path.join(currentPath, name);
        if (fs.statSync(childPath).isDirectory()) {
          const childNode = buildTree(childPath, currentDepth + 1);
          if (childNode) {
            node.children.push(childNode);
          }
        } else {
          node.children.push(createNode(childPath, 'file'));
        }
      }
    }

    return node;
  }

  return buildTree(fullPath, 0);
}


