const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'contact.html',
    'login.html',
    'menu.html'
];

let allPassed = true;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${file}`);
        allPassed = false;
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for basic HTML structure
    if (!content.includes('<!DOCTYPE html>') || !content.includes('<html') || !content.includes('</html')) {
        console.error(`❌ ${file} is missing basic HTML tags`);
        allPassed = false;
    }

    // Check for correct CSS path
    if (!content.includes('src/css/style.css')) {
        console.error(`❌ ${file} has incorrect CSS path`);
        allPassed = false;
    }

    // Check for correct JS path
    if (!content.includes('src/js/main.js')) {
        console.error(`❌ ${file} has incorrect JS path`);
        allPassed = false;
    }

    // Check for common tag mismatches (very basic)
    const openDivs = (content.match(/<div/g) || []).length;
    const closeDivs = (content.match(/<\/div>/g) || []).length;
    if (openDivs !== closeDivs) {
        console.error(`❌ ${file} has mismatched div tags: ${openDivs} open, ${closeDivs} closed`);
        allPassed = false;
    }
});

if (allPassed) {
    console.log('✅ All checks passed successfully!');
    process.exit(0);
} else {
    console.log('❌ Some checks failed.');
    process.exit(1);
}
