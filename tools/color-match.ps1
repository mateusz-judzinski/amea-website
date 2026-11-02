# Dopasowuje kolorystykę zdjęcia do zdjęć referencyjnych (transfer średniej i odchylenia w Lab).
# Przykład: tools/color-match.ps1 -Src surowe.jpg -Refs assets/img/photos/joga.jpg,assets/img/photos/medytacja-prowadzaca.jpg -Out assets/img/photos/nowe.jpg
param(
  [string]$Src,
  [string[]]$Refs,
  [string]$Out,
  [double]$StrengthL = 0.6,
  [double]$StrengthAB = 0.85
)
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class ColorMatch {
  static double Lin(double c) { c /= 255.0; return c <= 0.04045 ? c / 12.92 : Math.Pow((c + 0.055) / 1.055, 2.4); }
  static double Gam(double c) { c = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.Pow(c, 1 / 2.4) - 0.055; return Math.Max(0, Math.Min(255, c * 255.0)); }
  static double F(double t) { return t > 0.008856 ? Math.Pow(t, 1.0 / 3) : 7.787 * t + 16.0 / 116; }
  static double Fi(double t) { double t3 = t * t * t; return t3 > 0.008856 ? t3 : (t - 16.0 / 116) / 7.787; }

  static void ToLab(byte r8, byte g8, byte b8, out double L, out double a, out double b) {
    double r = Lin(r8), g = Lin(g8), bl = Lin(b8);
    double x = (0.4124 * r + 0.3576 * g + 0.1805 * bl) / 0.95047;
    double y = 0.2126 * r + 0.7152 * g + 0.0722 * bl;
    double z = (0.0193 * r + 0.1192 * g + 0.9505 * bl) / 1.08883;
    double fx = F(x), fy = F(y), fz = F(z);
    L = 116 * fy - 16; a = 500 * (fx - fy); b = 200 * (fy - fz);
  }
  static void FromLab(double L, double a, double b, out byte r8, out byte g8, out byte b8) {
    double fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - b / 200;
    double x = Fi(fx) * 0.95047, y = Fi(fy), z = Fi(fz) * 1.08883;
    double r = 3.2406 * x - 1.5372 * y - 0.4986 * z;
    double g = -0.9689 * x + 1.8758 * y + 0.0415 * z;
    double bl = 0.0557 * x - 0.2040 * y + 1.0570 * z;
    r8 = (byte)Math.Round(Gam(r)); g8 = (byte)Math.Round(Gam(g)); b8 = (byte)Math.Round(Gam(bl));
  }

  static byte[] Pixels(Bitmap bmp, out int stride) {
    var d = bmp.LockBits(new Rectangle(0, 0, bmp.Width, bmp.Height), ImageLockMode.ReadOnly, PixelFormat.Format24bppRgb);
    stride = d.Stride; var buf = new byte[stride * bmp.Height];
    Marshal.Copy(d.Scan0, buf, 0, buf.Length); bmp.UnlockBits(d); return buf;
  }

  // mean and std of L, a, b (6 values); sampled every 2nd pixel
  public static double[] Stats(string path) {
    using (var src = new Bitmap(path)) using (var bmp = src.Clone(new Rectangle(0, 0, src.Width, src.Height), PixelFormat.Format24bppRgb)) {
      int stride; var p = Pixels(bmp, out stride);
      double[] s = new double[3], s2 = new double[3]; long n = 0;
      for (int y = 0; y < bmp.Height; y += 2) for (int x = 0; x < bmp.Width; x += 2) {
        int i = y * stride + x * 3; double L, a, b;
        ToLab(p[i + 2], p[i + 1], p[i], out L, out a, out b);
        s[0] += L; s[1] += a; s[2] += b; s2[0] += L * L; s2[1] += a * a; s2[2] += b * b; n++;
      }
      var r = new double[6];
      for (int c = 0; c < 3; c++) { r[c] = s[c] / n; r[c + 3] = Math.Sqrt(s2[c] / n - r[c] * r[c]); }
      return r;
    }
  }

  // Reinhard transfer in Lab, blended with the original by strength
  public static void Apply(string path, string outPath, double[] src, double[] dst, double kL, double kAB, long quality) {
    using (var orig = new Bitmap(path)) using (var bmp = orig.Clone(new Rectangle(0, 0, orig.Width, orig.Height), PixelFormat.Format24bppRgb)) {
      var d = bmp.LockBits(new Rectangle(0, 0, bmp.Width, bmp.Height), ImageLockMode.ReadWrite, PixelFormat.Format24bppRgb);
      var p = new byte[d.Stride * bmp.Height]; Marshal.Copy(d.Scan0, p, 0, p.Length);
      double[] k = { kL, kAB, kAB };
      for (int y = 0; y < bmp.Height; y++) for (int x = 0; x < bmp.Width; x++) {
        int i = y * d.Stride + x * 3; double[] v = new double[3];
        ToLab(p[i + 2], p[i + 1], p[i], out v[0], out v[1], out v[2]);
        for (int c = 0; c < 3; c++) {
          double t = (v[c] - src[c]) * (dst[c + 3] / src[c + 3]) + dst[c];
          v[c] = v[c] + (t - v[c]) * k[c];
        }
        byte r, g, b; FromLab(v[0], v[1], v[2], out r, out g, out b);
        p[i + 2] = r; p[i + 1] = g; p[i] = b;
      }
      Marshal.Copy(p, 0, d.Scan0, p.Length); bmp.UnlockBits(d);
      var enc = Array.Find(ImageCodecInfo.GetImageEncoders(), e => e.MimeType == "image/jpeg");
      var ps = new EncoderParameters(1); ps.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, quality);
      bmp.Save(outPath, enc, ps);
    }
  }
}
'@

function Fmt($s) { 'L {0:N1} sd {3:N1} | a {1:N1} sd {4:N1} | b {2:N1} sd {5:N1}' -f [object[]]$s }

$srcStats = [ColorMatch]::Stats($Src)
"source:  $(Fmt $srcStats)"
$acc = New-Object double[] 6
foreach ($r in $Refs) {
  $s = [ColorMatch]::Stats($r); "ref:     $(Fmt $s)  ($([IO.Path]::GetFileName($r)))"
  for ($c = 0; $c -lt 6; $c++) { $acc[$c] += $s[$c] / $Refs.Count }
}
"target:  $(Fmt $acc)"
if ($Out) {
  [ColorMatch]::Apply($Src, $Out, $srcStats, $acc, $StrengthL, $StrengthAB, 88)
  "result:  $(Fmt ([ColorMatch]::Stats($Out)))  -> $Out"
}
