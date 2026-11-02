# Regenerates the tintable logo masks in assets/img/brand from the original logo.
# Each output is black with alpha = darkness, so CSS can recolor it via mask-image.
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File tools/logo-masks.ps1
param(
  [string]$Src = (Join-Path (Split-Path -Parent $PSScriptRoot) 'assets\img\brand\logo-original.png'),
  [string]$OutDir = (Join-Path (Split-Path -Parent $PSScriptRoot) 'assets\img\brand')
)
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System; using System.Drawing; using System.Drawing.Imaging; using System.Runtime.InteropServices;
public static class Masker {
  public static void Make(string src, string dst, int x, int y, int w, int h) {
    using (var b = new Bitmap(src))
    using (var c = b.Clone(new Rectangle(x, y, w, h), PixelFormat.Format32bppArgb)) {
      var d = c.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
      int n = d.Stride * h; var px = new byte[n]; Marshal.Copy(d.Scan0, px, 0, n);
      for (int i = 0; i < n; i += 4) {
        double lum = 0.114 * px[i] + 0.587 * px[i + 1] + 0.299 * px[i + 2];
        double a = (255 - lum) / 225.0 * 255; if (a > 255) a = 255; if (a < 8) a = 0;
        px[i] = 0; px[i + 1] = 0; px[i + 2] = 0; px[i + 3] = (byte)a;
      }
      Marshal.Copy(px, 0, d.Scan0, n); c.UnlockBits(d); c.Save(dst, ImageFormat.Png);
    }
  }
}
"@
[Masker]::Make($Src, "$OutDir\logo-full.png", 70, 508, 1456, 426)
[Masker]::Make($Src, "$OutDir\logo-word.png", 495, 508, 610, 200)
[Masker]::Make($Src, "$OutDir\emblem.png", 741, 738, 128, 134)
Get-ChildItem $OutDir -Filter *.png | ForEach-Object { "{0} {1}KB" -f $_.Name, [int]($_.Length/1KB) }
