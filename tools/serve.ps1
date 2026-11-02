# Minimal static file server for local preview (no Node/Python needed).
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File tools/serve.ps1 [-Port 5500]
param(
  [int]$Port = 5500,
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

$mime = @{
  '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'
  '.json' = 'application/json'; '.svg' = 'image/svg+xml'; '.png' = 'image/png'; '.jpg' = 'image/jpeg'
  '.jpeg' = 'image/jpeg'; '.webp' = 'image/webp'; '.avif' = 'image/avif'; '.ico' = 'image/x-icon'
  '.woff2' = 'font/woff2'; '.txt' = 'text/plain; charset=utf-8'; '.xml' = 'application/xml'
}

$rootFull = [System.IO.Path]::GetFullPath($Root)
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $rootFull at http://localhost:$Port/ (Ctrl+C to stop)"

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $res = $ctx.Response
    try {
      $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
      if ($rel -eq '' -or $rel.EndsWith('/')) { $rel += 'index.html' }
      $path = [System.IO.Path]::GetFullPath((Join-Path $rootFull $rel))

      if (-not $path.StartsWith($rootFull) -or -not (Test-Path $path -PathType Leaf)) {
        $res.StatusCode = 404
        $body = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
      } else {
        $ext = [System.IO.Path]::GetExtension($path).ToLower()
        $res.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
        $res.Headers.Add('Cache-Control', 'no-store')
        $body = [System.IO.File]::ReadAllBytes($path)
      }
      $res.ContentLength64 = $body.Length
      $res.OutputStream.Write($body, 0, $body.Length)
      Write-Host "$($res.StatusCode) /$rel"
    } catch {
      Write-Host "500 $($_.Exception.Message)"
      $res.StatusCode = 500
    } finally {
      $res.OutputStream.Close()
    }
  }
} finally {
  $listener.Stop()
}
