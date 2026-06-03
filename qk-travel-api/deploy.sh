#!/bin/bash
# =============================================================
# deploy.sh — Build, push, and deploy QkTravelApi to GCP VM
# Run this from your LOCAL machine every time you want to deploy
#
# Usage:
#   chmod +x deploy.sh
#   ./deploy.sh
# =============================================================

set -e

# ─── CONFIG — Edit these once ────────────────────────────────
GITHUB_USERNAME="ComGa999ms"
VM_NAME="qktravel-vm"
VM_ZONE="asia-southeast1-a"
IMAGE="ghcr.io/$GITHUB_USERNAME/qk-travel-api:latest"

# Set to "true" if your ghcr.io image is public (no token needed)
# Set to "false" if private (requires GITHUB_PAT below)
PUBLIC_IMAGE="false"

# Only needed if PUBLIC_IMAGE="false".
# Set this in your shell before running: export GITHUB_PAT="your-token"
GITHUB_PAT="${GITHUB_PAT:-}"
# ─────────────────────────────────────────────────────────────

echo "🚀 Starting deployment..."

# Step 1 — Login to GitHub Container Registry (skip if image is public)
if [ "$PUBLIC_IMAGE" = "false" ]; then
  if [ -z "$GITHUB_PAT" ]; then
    echo "❌ GITHUB_PAT is required when PUBLIC_IMAGE=false."
    exit 1
  fi
  echo ""
  echo "🔐 [1/4] Logging in to GitHub Container Registry..."
  echo "$GITHUB_PAT" | docker login ghcr.io -u "$GITHUB_USERNAME" --password-stdin
  echo "✅ Login successful."
else
  echo ""
  echo "🌐 [1/4] Skipping login (image is public)."
fi

# Step 2 — Build Docker image
echo ""
echo "📦 [2/4] Building Docker image..."
docker build -t "$IMAGE" .
echo "✅ Build complete."

# Step 3 — Push image to GitHub Container Registry
echo ""
echo "⬆️  [3/4] Pushing image to registry..."
docker push "$IMAGE"
echo "✅ Push complete."

# Step 4 — SSH into VM: pull latest image and restart
echo ""
echo "🔄 [4/4] Updating and restarting on VM..."
gcloud compute ssh "$VM_NAME" --zone="$VM_ZONE" --command="
  cd ~/QkTravel
  docker compose pull api
  docker compose up -d --no-deps api
"
echo "✅ API restarted."

# Done — show status
echo ""
echo "📋 Container status:"
gcloud compute ssh "$VM_NAME" --zone="$VM_ZONE" --command="
  cd ~/QkTravel && docker compose ps
"

echo ""
echo "🎉 Deployment complete! API is live at:"
gcloud compute instances describe "$VM_NAME" \
  --zone="$VM_ZONE" \
  --format="value(networkInterfaces[0].accessConfigs[0].natIP)" | \
  awk '{print "   http://" $1 ":8080"}'
