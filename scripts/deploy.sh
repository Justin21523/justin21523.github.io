#!/bin/bash
# deploy.sh — 部署作品集到 GitHub Pages / Vercel / Netlify
# Usage: bash scripts/deploy.sh [provider]
# Providers: github-pages (default), vercel, netlify

set -euo pipefail

PROVIDER="${1:-github-pages}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "🚀 Deploying portfolio via $PROVIDER..."

case "$PROVIDER" in
  github-pages)
    echo "📦 Deploying to GitHub Pages..."
    echo "   (Requires GitHub Pages to be enabled for this repo)"
    echo "   Push to main/master branch — GitHub Actions will auto-deploy)"
    echo ""
    echo "   To enable GitHub Pages:"
    echo "   1. Go to repo Settings → Pages"
    echo "   2. Source: Deploy from a branch"
    echo "   3. Branch: main / / (root)"
    echo ""
    echo "✅ GitHub Actions workflow configured at .github/workflows/deploy.yml"
    echo "   Push your changes to trigger deployment."
    ;;
  vercel)
    if command -v vercel &>/dev/null; then
      echo "📦 Deploying to Vercel..."
      cd "$PROJECT_DIR"
      vercel --prod --confirm
      echo "✅ Deployed to Vercel!"
    else
      echo "❌ Vercel CLI not installed. Install with: npm i -g vercel"
      echo "   Or deploy manually at https://vercel.com"
    fi
    ;;
  netlify)
    if command -v netlify &>/dev/null; then
      echo "📦 Deploying to Netlify..."
      cd "$PROJECT_DIR"
      netlify deploy --prod --dir=dist
      echo "✅ Deployed to Netlify!"
    else
      echo "❌ Netlify CLI not installed. Install with: npm i -g netlify-cli"
      echo "   Or deploy manually at https://app.netlify.com"
    fi
    ;;
  *)
    echo "❌ Unknown provider: $PROVIDER"
    echo "   Supported: github-pages, vercel, netlify"
    exit 1
    ;;
esac
