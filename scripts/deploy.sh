#!/bin/bash

# Configuration
SERVER_HOST="live.dothost.net"
SERVER_PORT="2965"
SERVER_USER="neojustin"
SERVER_PATH="/home/neojustin/justin-portfolio"
SSH_KEY="/home/justin/.ssh/school-library-lms_live_dothost_ed25519"

echo "🚀 Starting deployment to $SERVER_HOST..."

# 1. Sync Codebase (excluding large folders and git)
# We sync the 'dist' folder separately to the web root if needed, 
# BUT based on your docker-compose, the 'web' service builds from context '.'.
# So we need to sync the source code and rebuild on server, OR sync the built artifacts.
# The Dockerfile does a multi-stage build (npm run build inside docker).
# To speed things up, we can stick to that, OR change Dockerfile to just serve existing dist.
# For now, let's stick to the robust method: Sync Code -> Rebuild on Server.

echo "📦 Syncing source code..."
rsync -azvhP --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude 'dist' \
  --exclude '.env' \
  -e "ssh -p $SERVER_PORT -i $SSH_KEY" \
  ./ \
  $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

# 2. Sync Generated Media (Important!)
# The generated videos/images are in public/media and public/images.
# These need to be synced because they were generated locally by Playwright.
echo "🖼️ Syncing generated media assets..."
rsync -azvhP \
  -e "ssh -p $SERVER_PORT -i $SSH_KEY" \
  ./public/media/ \
  $SERVER_USER@$SERVER_HOST:$SERVER_PATH/public/media/

rsync -azvhP \
  -e "ssh -p $SERVER_PORT -i $SSH_KEY" \
  ./public/images/ \
  $SERVER_USER@$SERVER_HOST:$SERVER_PATH/public/images/
  
# 3. Sync Content (Markdown)
echo "📝 Syncing markdown content..."
rsync -azvhP \
  -e "ssh -p $SERVER_PORT -i $SSH_KEY" \
  ./public/content/ \
  $SERVER_USER@$SERVER_HOST:$SERVER_PATH/public/content/

# 4. Trigger Rebuild on Server
echo "🔄 Rebuilding and restarting web service on server..."
ssh -p $SERVER_PORT -i $SSH_KEY $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && docker-compose up -d --build web"

echo "✅ Deployment complete! Visit https://neojustin.dothost.net/"
