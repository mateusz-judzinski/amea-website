# AMÉA – strona one-page

Strona dla **AMÉA – Przestrzeń Piękna i Harmonii** (Beauty & Wellbeing, ul. Marszałka Józefa Piłsudskiego 65, 41-902 Bytom; właścicielka Renata Judzińska). Jedna strona: kosmetologia, fizjoterapia, zajęcia ruchowe, masaże i rytuały. Rezerwacje wyłącznie przez Booksy.

Komunikacja z użytkownikiem: po polsku. Treść strony: po polsku.

## Stack i uruchamianie

- Czysty statyczny HTML/CSS/JS, **bez build stepu i bez zależności**. Node.js jest na maszynie tylko dla narzędzi (Playwright MCP), strona go nie używa; Pythona brak. Jeśli kiedyś pojawi się potrzeba (np. podstrony, CMS), migracja do Astro jest naturalnym krokiem.
- **Bez testów automatycznych** – decyzja użytkownika. **Playwright MCP** (`.mcp.json`) służy wyłącznie do podglądu: zrzuty całej strony na 1280 px i 375 px, konsola. Wbudowana przeglądarka aplikacji też działa, ale jej zrzuty mają rozmiar panelu.
- Podgląd lokalny: `.claude/launch.json` → konfiguracja `amea` uruchamia `tools/serve.ps1` (serwer statyczny w PowerShellu) na http://localhost:5500. Ręcznie: `powershell -NoProfile -ExecutionPolicy Bypass -File tools/serve.ps1`.

## Struktura

```
index.html                 cała strona (sekcje w kolejności jak w nawigacji)
assets/css/styles.css      style; tokeny kolorów i fontów na górze w :root
assets/js/main.js          menu mobilne, zakładki oferty (ARIA tabs), odsłanianie zdjęć, rok w stopce
assets/img/brand/          logo-original.png + maski: logo-full, logo-word, emblem
assets/img/photos/         zdjęcia robocze (do wymiany po sesji)
tools/serve.ps1            lokalny serwer
tools/logo-masks.ps1       generuje maski logo z logo-original.png
tools/color-match.ps1      dopasowuje kolorystykę zdjęcia do zdjęć referencyjnych
.mcp.json                  Playwright MCP (podgląd, nie testy)
docs/TODO.md               brakujące treści, lista ujęć do sesji, zadania techniczne
```

## Design (ustalony na etapie szkicu)

- Paleta **„Karmel”**: porcelana `#FCF9F6`, blush `#F5EDE6`, espresso `#3A2E28`, karmel `#9A6B42` (przyciski/akcenty), jasny karmel `#DDBF9F`. Tylko jasny motyw.
- Fonty: **Playfair Display** (nagłówki, nawiązuje do liter logo) + **Jost 300** (tekst; rozstrzelone wersaliki jak hasło w logo).
- Logo: pliki w `brand/` to **maski alfa** – kolor nadaje CSS (`.mask` + `background: var(--ink)`). Nie wstawiać ich jako `<img>`. Po zmianie logo uruchom `tools/logo-masks.ps1` (współrzędne wycięć są w skrypcie).
- Favicon: czarny emblemat na białym kafelku. `favicon.ico` (w katalogu głównym, 16/32/48 px) i `brand/favicon-32.png` mają zaokrąglony biały kwadrat, `brand/apple-touch-icon.png` (180 px) pełny biały kwadrat (system sam zaokrągla rogi). Odtworzenie po zmianie emblematu, z katalogu `assets/img/brand`:
  `magick -size 128x128 xc:none -fill white -draw "roundrectangle 0,0 127,127 24,24" ( emblem.png -resize 100x100 ) -gravity center -composite f128.png`, potem `magick f128.png -define icon:auto-resize=48,32,16 ../../../favicon.ico`, `magick f128.png -resize 32x32 favicon-32.png` oraz `magick -size 180x180 xc:white ( emblem.png -resize 118x118 ) -gravity center -composite -alpha remove apple-touch-icon.png` (w PowerShellu nawiasy w cudzysłowach: `'('` `')'`).
- Motyw graficzny: łukowe kadry zdjęć (`.photo.arch`, `--arch`), linia z emblematem jako przerywnik (`.divider`). Zdjęcia wyróżnione (hero, O nas, karta trasy w Kontakcie) mają klasę `.framed`: cienka linia łuku w jasnym karmelu (`outline` + `--frame-offset`, 12 px, na telefonie 10 px). Poniżej hero linia „odsuwa się” od zdjęcia przy wejściu w widok. Na telefonie takie zdjęcie ma `max-width: min(380px, calc(100% - 28px))`, żeby linia nie dotykała krawędzi ekranu.
- Zdjęcia na białym tle studyjnym dostają klasę `.studio` na ramce: `mix-blend-mode: multiply` zamienia biel w ciepły kolor ramki.
- Filary w Filozofii to linki `href="#oferta"` z `data-tab="<id zakładki>"`; `main.js` przełącza wtedy zakładkę oferty.
- **Ruch** (sekcja „Motion” na końcu `styles.css`): jeden zaplanowany moment, czyli wejście hero przy załadowaniu (samo CSS). Niżej ruszają się tylko zdjęcia (osiadają w ramce) i linie przerywnika: `main.js` dodaje im `.reveal`, a po wejściu w widok `.is-in`. Każde `.photo`/`.portrait` z `<img>` jako bezpośrednim dzieckiem dostaje to automatycznie. Tekstu, kart i cen nie animujemy; ruch w odpowiedzi na kliknięcie (zakładka, menu, `details`) jest w porządku. Wszystko pod `prefers-reduced-motion: no-preference`, a bez JS nic nie jest ukryte.
- Rogi: zdjęcia 8 px (jak dół `--arch`), karty `--radius`. Odstęp nagłówek sekcji → treść: `--head-gap`. `.eyebrow` przyklejony do tytułu. Pas wokół pojedynczej karty (Bon): `.band-tight`.
- Pełny przycisk na hover **ciemnieje** (rozjaśniony karmel daje białemu tekstowi < 4,5:1). `.link` ma podkreślenie z tła; hover rysuje na nim linię espresso.
- Odrzucone przez użytkownika (3.11.2026), nie proponować ponownie: w Przestrzeni nagłówek w dwóch kolumnach i podpisy pod zdjęciami (zostają nagłówek nad galerią i „pigułki” na zdjęciach); w Zajęciach obniżony łuk nachodzący na szerokie zdjęcie (zostają dwa równe łuki obok siebie); w O nas łuk złożony z dwóch zdjęć Beauty | Wellbeing.
- O nas: zdjęcie po lewej, bo hero tuż wyżej ma układ tekst | łuk; pierwszy akapit większy jako wstęp. Na telefonie tekst przed zdjęciem.
- Kontakt: karta trasy `.map-card` to łuk ze zdjęciem szyldu `szyld.jpg` (okrągła tablica wpisana w łuk, kadr `object-position: 0 50%`) z tabliczką adresu; link do Google Maps, bez iframe. Dane kontaktowe jako lista z cienkimi liniami, jak lista zajęć.
- Panele i inne elementy chowamy atrybutem `hidden` (w CSS jest `[hidden] { display: none !important }`, bo reguły `display` w klasach go nadpisywały).
- Szkic do porównań: https://claude.ai/artifact/QTXtHeLnmK9uoLAdXrfBeb (wersja z przełącznikiem palet; nie jest źródłem prawdy).

## Treść – zasady

- Oferta skóry pogrupowana **wg problemu** (odwodniona, poszarzała, problematyczna, zwiotczała, przebarwienia, melasma), ścieżki START / ADVANCED / PREMIUM; Diagnostyka 3D + Beauty Plan jako osobna sekcja „od czego zacząć”.
- Ceny jako **„od X zł”** = ceny regularne z Booksy, bez czasowych promocji (−15% itp.). Pełny cennik zostaje na Booksy. Przy zmianach cen edytuj `index.html` (sekcja OFERTA).
- Wszystkie przyciski rezerwacji → profil Booksy:
  `https://booksy.com/pl-pl/339658_amea-holistyczna-przestrzen-piekna-i-harmonii_salon-kosmetyczny_12355_bytom`
  (docelowo można podpiąć linki do konkretnych usług).
- Zakładka Masaże: karty masaży + blok **AMÉA Women's Ritual** (`.mini-cards`). Rytuały sezonowe (np. halloweenowe) dodawać jako osobny blok `.mini-cards` i usuwać, gdy znikną z Booksy.
- Opinie i liczba opinii (5.0 / 49, stan z 3.11.2026; liczba jest w hero i w sekcji Opinie) przepisane ręcznie z Booksy, cytaty **dosłownie** (najwyżej skrócone na granicy zdania).
- Cała oferta, godziny (pon.–sob. 8–21, potwierdzone przez salon) i realizacja bonów zsynchronizowane z Booksy 3.11.2026. Odświeżanie: Playwright MCP na profilu Booksy, rozwinąć zwinięte kategorie (część jest domyślnie zamknięta), porównać z `index.html`. Na Booksy w opisie usługi bywa „po umówionym terminie tel” – to informacja o rezerwacji, nie część nazwy.
- Kontakt: tel. **791 103 551** (`tel:+48791103551`), e-mail **kontakt@amea-beauty.pl**, Instagram `beauty_amea`, Facebook `BeautyAmea` (sekcja Kontakt, stopka, JSON-LD). Makijaż permanentny umawia się telefonicznie, więc jego karty mają „Zadzwoń” zamiast „Umów” z Booksy.
- Brakujące dane są oznaczone w HTML komentarzami `TODO(...)`; pełna lista w `docs/TODO.md`. Nie wymyślać danych kontaktowych, cen ani godzin – pytać użytkownika.

## Zdjęcia

Obecne zdjęcia są robocze; będzie selekcja lub profesjonalna sesja. Hero: portret właścicielki `renata.webp` (poziomy, kadrowany do 4:5 przez `object-position` w `.hero .photo img`). Zespół: osobne zdjęcie `renata-zespol.webp`, przycięte w pliku do 3:4 (do bioder), żeby nie powtarzać portretu z hero. Lista ujęć w `docs/TODO.md`. Przy podmianie zachowaj `width`/`height` w `<img>` zgodne z plikiem i `loading="lazy"` poza hero.

`joga-grupa.jpg` ma skorygowaną kolorystykę (było mocno pomarańczowe): `tools/color-match.ps1` z referencjami `joga.jpg` + `medytacja-prowadzaca.jpg`, siła `-StrengthL 0.5 -StrengthAB 0.7`. Ten sam skrypt przyda się do ujednolicenia zdjęć z sesji.

Na maszynie są **ImageMagick** (`magick`: kadrowanie, WebP/AVIF, wersje do `srcset`) i **ffmpeg** (klatki z wideo). Surowe pliki trzymaj poza repo, do `assets/img/photos/` trafiają tylko gotowe.
