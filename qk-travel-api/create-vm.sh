#!/bin/bash
# =============================================================
# create-vm.sh — Provision GCP VM and bootstrap the full setup
# Run this from your LOCAL machine ONE TIME to create the VM
#
# Prerequisites:
#   - gcloud CLI installed & authenticated: gcloud auth login
#   - gcloud project set: gcloud config set project YOUR_PROJECT_ID
#
# Usage:
#   chmod +x create-vm.sh
#   ./create-vm.sh
# =============================================================

set -e

# ─── CONFIG — Edit these once ────────────────────────────────
PROJECT_ID="qk-travel"
VM_NAME="qktravel-vm"
ZONE="asia-southeast1-a"
MACHINE_TYPE="e2-medium"
DISK_SIZE="30GB"
GITHUB_USERNAME="ComGa999ms"
# ─────────────────────────────────────────────────────────────

echo "☁️  Starting GCP VM provisioning..."
echo "   Project : $PROJECT_ID"
echo "   VM Name : $VM_NAME"
echo "   Zone    : $ZONE"
echo ""

# Step 1 — Set active project
echo "🔧 [1/6] Setting active GCP project..."
gcloud config set project "$PROJECT_ID"
echo "✅ Project set."

# Step 2 — Create the VM
echo ""
echo "🖥️  [2/6] Creating Compute Engine VM..."
gcloud compute instances create "$VM_NAME" \
  --zone="$ZONE" \
  --machine-type="$MACHINE_TYPE" \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size="$DISK_SIZE" \
  --boot-disk-type=pd-ssd \
  --tags=http-server,https-server
echo "✅ VM created."

# Step 3 — Open firewall: HTTP + HTTPS
echo ""
echo "🔓 [3/6] Opening firewall — HTTP/HTTPS (port 80, 443)..."
gcloud compute firewall-rules create allow-http-https \
  --allow=tcp:80,tcp:443 \
  --target-tags=http-server,https-server \
  --direction=INGRESS \
  --description="Allow HTTP and HTTPS traffic" 2>/dev/null || \
  echo "   (Rule already exists, skipping)"
echo "✅ HTTP/HTTPS open."

# Step 4 — Open firewall: API port 8080
echo ""
echo "🔓 [4/6] Opening firewall — API port 8080..."
gcloud compute firewall-rules create allow-api-8080 \
  --allow=tcp:8080 \
  --target-tags=http-server \
  --direction=INGRESS \
  --description="Allow direct API access on port 8080" 2>/dev/null || \
  echo "   (Rule already exists, skipping)"
echo "✅ Port 8080 open."

# Step 5 — Copy setup-vm.sh to the VM
echo ""
echo "📤 [5/6] Copying setup-vm.sh to VM..."
# Wait a few seconds for the VM to be fully ready
sleep 10
gcloud compute scp ./setup-vm.sh "$VM_NAME":~/setup-vm.sh \
  --zone="$ZONE" --extra-add-ssh-keys
echo "✅ File copied."

# Step 6 — SSH in and run setup-vm.sh automatically
echo ""
echo "🚀 [6/6] Running setup on the VM..."
gcloud compute ssh "$VM_NAME" --zone="$ZONE" --command="
  chmod +x ~/setup-vm.sh
  bash ~/setup-vm.sh
"

# Done — print VM external IP
echo ""
echo "══════════════════════════════════════════════════════════"
VM_IP=$(gcloud compute instances describe "$VM_NAME" \
  --zone="$ZONE" \
  --format="value(networkInterfaces[0].accessConfigs[0].natIP)")

echo "🎉 VM is ready!"
echo ""
echo "   External IP : $VM_IP"
echo "   API URL     : http://$VM_IP:8080"
echo ""
echo "  NEXT STEPS:"
echo ""
echo "  1. SSH into the VM:"
echo "       gcloud compute ssh $VM_NAME --zone=$ZONE"
echo ""
echo "  2. Fill in credentials:"
echo "       cd ~/QkTravel"
echo "       cp .env.example .env"
echo "       nano .env"
echo ""
echo "  3. Start all services:"
echo "       docker compose up -d"
echo ""
echo "  4. Check logs:"
echo "       docker compose logs api --tail=50"
echo "══════════════════════════════════════════════════════════"
