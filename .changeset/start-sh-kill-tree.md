---
"stock-tracker": patch
---

Fix start.sh stop to kill entire process tree, preventing orphaned child processes from holding ports.
