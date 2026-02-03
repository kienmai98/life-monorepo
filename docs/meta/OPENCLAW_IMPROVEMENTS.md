# OpenClaw Workspace Improvements

This directory contains utilities to enhance the OpenClaw experience.

## 📁 Files

### openclaw-helpers.sh
Bash helper functions for common OpenClaw tasks.

**Usage:**
```bash
source openclaw-helpers.sh
oc-status      # Show OpenClaw status
oc-clean       # Clean session logs
oc-backup      # Backup config
oc-model kimi  # Switch model
oc-workspace   # Show workspace info
```

### openclaw-utils/
Node.js scripts for workspace management.

**Usage:**
```bash
cd openclaw-utils
npm run oc:status       # Check status
npm run workspace:clean # Clean node_modules
npm run sessions:list   # List active sessions
npm run models:list     # List configured models
```

## 🔧 Recommended OpenClaw Improvements

### 1. Config Validation
Add schema validation to prevent malformed configs.

### 2. Session Management
Better session cleanup and archiving.

### 3. Model Aliases
Shorter aliases for common models:
- `kimi` → `kimi-coding/k2p5`
- `grok` → `xai/grok-2`
- `claude` → `anthropic/claude-3-opus`

### 4. Workspace Templates
Quick-start templates for common project types.

### 5. Better Error Messages
More actionable error messages with suggested fixes.

## 💡 Tips

1. **Use `/status` frequently** to check token usage
2. **Set up cron jobs** for periodic tasks
3. **Use `sessions_spawn`** for parallel work
4. **Commit often** via git in workspace

## 📝 Notes

OpenClaw core is at: `/home/ec2-user/.npm-global/lib/node_modules/openclaw/`

Config location: `~/.openclaw/openclaw.json`

Workspace location: `~/.openclaw/workspace/` (or as configured)
