@echo off
chcp 65001 >nul
title 推送网站到 GitHub
echo.
echo  ============================================
echo    推送网站到 GitHub（最后一步）
echo  ============================================
echo.
echo  目标仓库: github.com/zzJIAN051225/photosite
echo.

cd /d "%~dp0"

rem 使用系统 PATH 中的 git（如果没有，用固定路径）
set GIT=git
where git >nul 2>&1
if %errorlevel% neq 0 (
    set "GIT=D:\Downloads\Git\cmd\git.exe"
)

echo [1/4] 初始化仓库...
"%GIT%" init >nul 2>&1
"%GIT%" branch -M main >nul 2>&1

echo [2/4] 配置身份...
"%GIT%" config user.name "zzJIAN051225"
"%GIT%" config user.email "3509821317@qq.com"

echo [3/4] 添加文件并提交...
"%GIT%" add -A
"%GIT%" commit -m "deploy: photography portfolio" >nul 2>&1
if %errorlevel% neq 0 (
    rem 可能没有变更，继续
)

echo [4/4] 推送到 GitHub...
"%GIT%" remote remove origin >nul 2>&1
"%GIT%" remote add origin "https://github.com/zzJIAN051225/photosite.git"
"%GIT%" push -u origin main

echo.
echo  ============================================
echo    推送完成！
echo    如果提示输入用户名密码:
echo      用户名: zzJIAN051225
echo      密码:   输入 GitHub 的 PAT token（不是登录密码！）
echo.
echo    如何获取 token:
echo    1. GitHub 头像 -> Settings -> Developer settings
echo    2. Personal access tokens -> Tokens (classic) -> Generate new token
echo    3. 勾选 repo 权限 -> Generate -> 复制 token 粘贴到这里
echo  ============================================
echo.
pause
