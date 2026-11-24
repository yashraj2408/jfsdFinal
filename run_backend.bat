@echo off
title JFSD Spring Boot Backend
color 0A
cls
echo ===================================================
echo   Starting JFSD Spring Boot Backend (Port 8080)...
echo ===================================================
cd backend
call mvnw.cmd spring-boot:run
pause
