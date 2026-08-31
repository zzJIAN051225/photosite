@echo off
setlocal
title Push to GitHub
cd /d "%~dp0"

set "GIT=D:\Downloads\Git\cmd\git.exe"
if not exist "%GIT%" set "GIT=git"

echo ============================================
echo   Push site to GitHub
echo   Repo: github.com/zzJIAN051225/photosite
echo ============================================
echo.

if not exist ".git" (
    echo [1/4] init...
    "%GIT%" init >nul
    "%GIT%" branch -M main
) else (
    echo [1/4] repo exists, skip init
)

echo [2/4] config...
"%GIT%" config user.name "zzJIAN051225"
"%GIT%" config user.email "3509821317@qq.com"

echo [3/4] add + commit...
"%GIT%" add -A
"%GIT%" commit -m "deploy photography portfolio"

echo [4/4] push...
"%GIT%" remote remove origin 2>nul
"%GIT%" remote add origin "https://github.com/zzJIAN051225/photosite.git"
"%GIT%" push -u origin main

echo.
echo ============================================
if %errorlevel% equ 0 (
    echo   PUSH OK!
) else (
    echo   PUSH FAILED - see errors above
    echo.
    echo   If asked for credentials:
    echo     Username: zzJIAN051225
    echo     Password: paste your PAT token (starts with ghp_)
)
echo ============================================
echo.
pause
