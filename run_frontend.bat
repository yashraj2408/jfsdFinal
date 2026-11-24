@echo off
title JFSD React Frontend
color 0B
cls
echo ===================================================
echo   Starting JFSD React Frontend (Port 3000)...
echo ===================================================
cd frontend
call npm install
call npm start
pause
