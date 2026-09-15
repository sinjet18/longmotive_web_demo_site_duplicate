param (
    [int]$Port = 8080
)

$currentDir = $PSScriptRoot
Write-Host "Checking for Node runtime..." -ForegroundColor Cyan

$electronExe = "$env:LOCALAPPDATA\Programs\Antigravity IDE\Antigravity IDE.exe"
if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "Launching via node server.cjs..." -ForegroundColor Green
    node "$currentDir\server.cjs"
    exit
} elseif (Test-Path $electronExe) {
    Write-Host "Launching via IDE Node runtime..." -ForegroundColor Green
    $env:ELECTRON_RUN_AS_NODE = "1"
    & $electronExe "$currentDir\server.cjs"
    exit
}

Write-Host "Falling back to native PowerShell HttpListener on port $Port..." -ForegroundColor Yellow
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://*:$Port/")
try {
    $listener.Start()
} catch {
    $listener.Prefixes.Clear()
    $listener.Prefixes.Add("http://localhost:$Port/")
    $listener.Start()
}

Write-Host "Server started at http://localhost:$Port/" -ForegroundColor Green

$mimeTypes = @{
    ".html" = "text/html"; ".htm" = "text/html"; ".css" = "text/css";
    ".js" = "application/javascript"; ".json" = "application/json";
    ".png" = "image/png"; ".jpg" = "image/jpeg"; ".jpeg" = "image/jpeg";
    ".webp" = "image/webp"; ".svg" = "image/svg+xml"; ".ico" = "image/x-icon";
    ".glb" = "model/gltf-binary"; ".gltf" = "model/gltf+json"; ".mp4" = "video/mp4"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawUrl = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath)
        $relPath = $rawUrl.TrimStart('/')
        if ([string]::IsNullOrEmpty($relPath)) { $relPath = "index.html" }

        $filePath = Join-Path $currentDir $relPath
        if (Test-Path $filePath -PathType Container) {
            $filePath = Join-Path $filePath "index.html"
        }
        if (-not (Test-Path $filePath)) {
            if (Test-Path "$filePath.html") { $filePath = "$filePath.html" }
            elseif (Test-Path "$filePath.dc.html") { $filePath = "$filePath.dc.html" }
        }

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $response.ContentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $buffer = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        } else {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
}
