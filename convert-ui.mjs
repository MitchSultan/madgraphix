import fs from 'fs';
import path from 'path';
import babel from '@babel/core';

const dir = 'app/(admin)/admin/components/ui';

const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    try {
        const result = babel.transformSync(content, {
          filename: filePath,
          presets: [
            ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
          ],
          plugins: [
            '@babel/plugin-syntax-jsx'
          ],
          retainLines: false, // Don't enforce strict line numbers so it's prettier
        });
        
        const newExt = file.endsWith('.tsx') ? '.jsx' : '.js';
        const newFilePath = path.join(dir, file.replace(/\.ts(x?)$/, newExt));
        
        fs.writeFileSync(newFilePath, result.code);
        fs.unlinkSync(filePath);
        console.log(`Converted ${file} to ${path.basename(newFilePath)}`);
    } catch(err) {
        console.error(`Failed on ${file}: ${err.message}`);
    }
  }
}
