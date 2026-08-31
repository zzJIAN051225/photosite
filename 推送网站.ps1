# 推送网站到 GitHub（PowerShell 版，无编码问题）
# 用法：右键本文件 -> "使用 PowerShell 运行"

$ErrorActionPreference = "Continue"
$git = "D:\Downloads\Git\cmd\git.exe"
if (-not (Test-Path $git)) { $git = "git" }

Set-Location $PSScriptRoot

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  推送网站到 GitHub" -ForegroundColor Cyan
Write-Host "  目标: github.com/zzJIAN051225/photosite" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# 1. 初始化（如果还没初始化）
if (-not (Test-Path ".git")) {
    Write-Host "[1/4] 初始化仓库..." -ForegroundColor Yellow
    & $git init
    & $git branch -M main
} else {
    Write-Host "[1/4] 仓库已存在，跳过初始化" -ForegroundColor Green
}

# 2. 配置身份
Write-Host "[2/4] 配置身份..." -ForegroundColor Yellow
& $git config user.name "zzJIAN051225"
& $git config user.email "3509821317@qq.com"

# 3. 添加并提交
Write-Host "[3/4] 添加文件并提交..." -ForegroundColor Yellow
& $git add -A
& $git commit -m "deploy: photography portfolio"

# 4. 推送
Write-Host "[4/4] 推送到 GitHub..." -ForegroundColor Yellow
& $git remote remove origin 2>$null
& $git remote add origin "https://github.com/zzJIAN051225/photosite.git"
& $git push -u origin main

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
if ($LASTEXITCODE -eq 0) {
    Write-Host "  推送完成！" -ForegroundColor Green
} else {
    Write-Host "  推送未完成 - 请看上方错误信息" -ForegroundColor Red
    Write-Host ""
    Write-Host "  如果提示输入用户名密码:" -ForegroundColor Yellow
    Write-Host "    用户名: zzJIAN051225"
    Write-Host "    密码:   粘贴 PAT token（ghp_ 开头）"
    Write-Host "    获取 token: GitHub -> Settings -> Developer settings -> Personal access tokens"
}
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "按任意键关闭..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
