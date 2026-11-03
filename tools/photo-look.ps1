# Wspólny wygląd zdjęć AMÉA (ImageMagick): balans bieli z neutralnego fragmentu + jedna tablica kolorów (CLUT) dla wszystkich.
#  1. Balans bieli w liniowym RGB: fragment, który powinien być biały (sufit, ściana, obudowa urządzenia), dostaje odcień
#     ciepłego kremu #F3E8D8; zmienia się tylko barwa, jasność zostaje. -WB 0..1 = siła (przy mieszanym świetle mniej, np. 0.4).
#  2. CLUT: miękki kontrast z uniesioną czernią, przygaszone pomarańcze i zielenie, mocno przygaszone błękity/cyjany/magenty,
#     lekkie wspólne ocieplenie (a* +1,3, b* +3), żeby każde zdjęcie przechylało się w tę samą stronę.
#  3. Kadr, skalowanie do rozmiaru miejsca na stronie, WebP.
# Przykład (strefa relaksu, 3.11.2026):
#   tools/photo-look.ps1 -Src surowe/IMG-20261103-WA0021.jpg -Out assets/img/photos/strefa-relaksu.webp -Patch 480x200+960+1790 -WB 0.4 -Size 1200x1600
# Współrzędne -Patch / -Crop / -Mute są w pikselach oryginału. Zawsze porównaj wynik z oryginałem, zanim trafi na stronę.
param(
  [Parameter(Mandatory = $true)] [string]$Src,
  [Parameter(Mandatory = $true)] [string]$Out,
  [string]$Patch = '',     # WxH+X+Y neutralnego fragmentu; puste = bez balansu bieli
  [double]$WB = 0.7,       # siła balansu bieli 0..1
  [string]$Crop = '',      # WxH+X+Y kadru
  [string]$Size = '',      # WxH wyniku (wypełnia i przycina środek)
  [string]$Mute = '',      # wielokąt "x,y x,y ..." do przygaszenia (np. świecący ekran)
  [int]$Quality = 78
)
$ErrorActionPreference = 'Stop'
$env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User')

$target = @(243, 232, 216)   # #F3E8D8
$tmp = Join-Path ([IO.Path]::GetTempPath()) ('amea-look-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Force $tmp | Out-Null
try {
  # Saturation by HSL hue (0..1): oranges .88, greens .85, cyans/blues .55, magentas .72, the rest .95
  $clut = Join-Path $tmp 'clut.png'
  $f = 'g*0.95*(1-0.12*exp(-((r-0.08)^2)/0.0018))*(1-0.15*exp(-((r-0.28)^2)/0.004))*(1-0.45*exp(-((r-0.56)^2)/0.006))*(1-0.28*exp(-((r-0.88)^2)/0.003))'
  magick hald:8 -colorspace HSL -channel G -fx $f +channel -colorspace sRGB `
    -sigmoidal-contrast 2.2,48% +level 3.5%,98.5% `
    -colorspace Lab -channel G -evaluate add 0.5% -channel B -evaluate add 1.2% +channel -colorspace sRGB $clut

  $in = $Src
  if ($Mute) {
    # muted copy takes the polygon as its alpha and goes over the original (a 3-image -composite flips the mask in IM7)
    $wh = magick identify -format '%wx%h' $Src
    $in = Join-Path $tmp 'muted.png'
    magick $Src '(' +clone -modulate 90,30 '(' -size $wh xc:black -fill white -draw "polygon $Mute" -blur 0x2 ')' -alpha off -compose CopyOpacity -composite ')' -compose Over -composite $in
  }

  $gains = @(1.0, 1.0, 1.0)
  if ($Patch) {
    function Lin([double]$v) { $c = $v / 255; if ($c -le 0.04045) { $c / 12.92 } else { [Math]::Pow(($c + 0.055) / 1.055, 2.4) } }
    function Luma($c) { 0.2126 * $c[0] + 0.7152 * $c[1] + 0.0722 * $c[2] }
    $t = $target | ForEach-Object { Lin $_ }
    $m = (magick $Src -crop $Patch +repage -colorspace RGB -format '%[fx:mean.r] %[fx:mean.g] %[fx:mean.b]' info:) -split ' ' | ForEach-Object { [double]$_ }
    $k = (Luma $m) / (Luma $t)   # keep the patch's luminance, take only the target's tint
    $gains = for ($i = 0; $i -lt 3; $i++) { [Math]::Pow($t[$i] * $k / $m[$i], $WB) }
  }

  # -clamp before the CLUT: gains push the brightest pixels (lamps, white plastic) above white, and -hald-clut
  # maps out-of-range values to wrong colours (a lamp came out solid blue)
  $cropArgs = if ($Crop) { @('-crop', $Crop, '+repage') } else { @() }
  $sizeArgs = if ($Size) { @('-filter', 'Lanczos', '-resize', "$Size^", '-gravity', 'center', '-extent', $Size) } else { @() }
  magick $in @cropArgs -colorspace RGB `
    -channel R -evaluate multiply $gains[0] -channel G -evaluate multiply $gains[1] -channel B -evaluate multiply $gains[2] +channel `
    -colorspace sRGB -clamp $clut -hald-clut @sizeArgs -unsharp 0x0.6+0.5+0.02 `
    -quality $Quality -define webp:method=6 $Out

  $lab = (magick $Out -resize x400 -colorspace Lab -format '%[fx:mean.r*100] %[fx:(mean.g-0.5)*255] %[fx:(mean.b-0.5)*255]' info:) -split ' ' | ForEach-Object { [double]$_ }
  '{0}  {1}  gains R {2:N2} G {3:N2} B {4:N2}  mean L {5:N1} a {6:N1} b {7:N1}' -f $Out, (magick identify -format '%wx%h' $Out), $gains[0], $gains[1], $gains[2], $lab[0], $lab[1], $lab[2]
}
finally { Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue }
