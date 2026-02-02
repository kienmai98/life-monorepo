#!/bin/bash
# OpenClaw Helper Scripts
# Place in your PATH for easy OpenClaw management

# Function: Show OpenClaw status
oc-status() {
    echo "🔍 OpenClaw Status"
    echo "=================="
    openclaw status 2>/dev/null || echo "OpenClaw not running"
    echo ""
    echo "📊 Session Info:"
    ls -la ~/.openclaw/agents/main/sessions/ 2>/dev/null | grep -c "\.jsonl$" | xargs echo "Active sessions:"
    echo ""
    echo "🔧 Config:"
    cat ~/.openclaw/openclaw.json 2>/dev/null | jq -r '.gateway.port // "Not configured"' | xargs echo "Gateway port:"
}

# Function: Quick cleanup
oc-clean() {
    echo "🧹 Cleaning OpenClaw..."
    rm -rf ~/.openclaw/agents/main/sessions/*.jsonl
    echo "✅ Session logs cleaned"
}

# Function: Backup config
oc-backup() {
    local backup_dir="$HOME/.openclaw/backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    cp ~/.openclaw/openclaw.json "$backup_dir/"
    cp -r ~/.openclaw/agents/main/agent "$backup_dir/" 2>/dev/null
    echo "💾 Config backed up to: $backup_dir"
}

# Function: Model switcher
oc-model() {
    case "$1" in
        kimi)
            echo "🔄 Switching to Kimi K2.5..."
            # Note: This would need proper implementation via gateway API
            echo "Use: /status model=kimi-coding/k2p5"
            ;;
        grok)
            echo "🔄 Switching to Grok..."
            echo "Use: /status model=xai/grok-2"
            ;;
        *)
            echo "Usage: oc-model [kimi|grok]"
            ;;
    esac
}

# Function: Workspace info
oc-workspace() {
    echo "📁 Workspace: $(cat ~/.openclaw/openclaw.json | jq -r '.agents.defaults.workspace // "Not set"')"
    echo "📝 Recent files:"
    find ~/.openclaw/workspace -type f -mtime -1 2>/dev/null | head -10
}

# Aliases
alias oc='openclaw'
alias oc-s='openclaw status'
alias oc-r='openclaw restart'
alias oc-logs='tail -f ~/.openclaw/gateway.log 2>/dev/null || echo "No log file"'
