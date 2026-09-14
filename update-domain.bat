@echo off
title JUJCO Site Configuration Synchronizer
echo ========================================================
echo Synchronizing site configuration across all HTML pages...
echo Reading site.config.json...
echo ========================================================
python "%~dp0update_config.py"
echo ========================================================
echo Done!
echo ========================================================
pause
