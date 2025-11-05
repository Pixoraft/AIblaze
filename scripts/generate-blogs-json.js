import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function generateBlogsJson() {
  try {
    const blogsDir = join(__dirname, '../blogs');
    const outputPath = join(__dirname, '../client/public/blogs-data.json');
    
    const files = readdirSync(blogsDir).filter(file => file.endsWith('.json'));
    
    const blogs = [];
    
    for (const file of files) {
      try {
        const filePath = join(blogsDir, file);
        const fileContent = readFileSync(filePath, 'utf-8');
        const blogData = JSON.parse(fileContent);
        blogs.push(blogData);
      } catch (error) {
        console.error(`Error loading blog file ${file}:`, error);
      }
    }
    
    writeFileSync(outputPath, JSON.stringify(blogs, null, 2), 'utf-8');
    console.log(`✅ Generated blogs-data.json with ${blogs.length} blogs`);
  } catch (error) {
    console.error('❌ Error generating blogs-data.json:', error);
    process.exit(1);
  }
}

generateBlogsJson();
