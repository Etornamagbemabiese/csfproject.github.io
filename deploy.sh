#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Create gh-pages branch if it doesn't exist
echo "Creating gh-pages branch..."
git checkout --orphan gh-pages 2>/dev/null || git checkout gh-pages

# Remove all files except build
echo "Cleaning gh-pages branch..."
git rm -rf . 2>/dev/null || true

# Copy build files
echo "Copying build files..."
cp -r build/* .

# Add all files
echo "Adding files to git..."
git add .

# Commit
echo "Committing changes..."
git commit -m "Deploy Disney AI Concierge to GitHub Pages"

# Push to gh-pages branch
echo "Pushing to GitHub..."
git push origin gh-pages --force

# Switch back to main
echo "Switching back to main branch..."
git checkout main

echo "Deployment complete! Your site should be live at:"
echo "https://etornamagbemabiese.github.io/csfproject"
