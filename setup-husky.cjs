const fs = require("fs");
const path = require("path");

const huskyDir = path.join(".husky/_");
const hookFile = path.join(huskyDir, "pre-commit");
const content = `#!/bin/sh\n. "$(dirname "$0")/husky.sh"

npx lint-staged `;

if (!fs.existsSync(huskyDir)) {
    fs.mkdirSync(huskyDir);
}

fs.writeFileSync(hookFile, content, { mode: 0o755 });
console.log("✅ Success");
