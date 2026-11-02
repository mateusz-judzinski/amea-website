# AMÉA – strona one-page

Strona dla **AMÉA – Przestrzeń Piękna i Harmonii** (Beauty & Wellbeing, ul. Marszałka Józefa Piłsudskiego 65, 41-902 Bytom; właścicielka Renata Judzińska). Jedna strona: kosmetologia, fizjoterapia, zajęcia ruchowe, masaże i rytuały. Rezerwacje wyłącznie przez Booksy.

Komunikacja z użytkownikiem: po polsku. Treść strony: po polsku.

## Stack i uruchamianie

- Czysty statyczny HTML/CSS/JS, **bez build stepu i bez zależności**. Na maszynie nie ma Node ani Pythona; jeśli kiedyś pojawi się potrzeba (np. podstrony, CMS), migracja do Astro jest naturalnym krokiem.
- **Bez testów automatycznych i bez Playwright** – decyzja użytkownika. Weryfikacja: ręcznie w podglądzie przeglądarki (desktop + 375 px).
- Podgląd lokalny: `.claude/launch.json` → konfiguracja `amea` uruchamia `tools/serve.ps1` (serwer statyczny w PowerShellu) na http://localhost:5500. Ręcznie: `powershell -NoProfile -ExecutionPolicy Bypass -File tools/serve.ps1`.

## Struktura

```
index.html                 cała strona (sekcje w kolejności jak w nawigacji)
assets/css/styles.css      style; tokeny kolorów i fontów na górze w :root
assets/js/main.js          menu mobilne, zakładki oferty (ARIA tabs), rok w stopce
assets/img/brand/          logo-original.png + maski: logo-full, logo-word, emblem
assets/img/photos/         zdjęcia robocze (do wymiany po sesji)
tools/serve.ps1            lokalny serwer
tools/logo-masks.ps1       generuje maski logo z logo-original.png
docs/TODO.md               brakujące treści, lista ujęć do sesji, zadania techniczne
```

## Design (ustalony na etapie szkicu)

- Paleta **„Karmel”**: porcelana `#FCF9F6`, blush `#F5EDE6`, espresso `#3A2E28`, karmel `#9A6B42` (przyciski/akcenty), jasny karmel `#DDBF9F`. Tylko jasny motyw.
- Fonty: **Playfair Display** (nagłówki, nawiązuje do liter logo) + **Jost 300** (tekst; rozstrzelone wersaliki jak hasło w logo).
- Logo: pliki w `brand/` to **maski alfa** – kolor nadaje CSS (`.mask` + `background: var(--ink)`). Nie wstawiać ich jako `<img>`. Po zmianie logo uruchom `tools/logo-masks.ps1` (współrzędne wycięć są w skrypcie).
- Motyw graficzny: łukowe kadry zdjęć (`.photo.arch`, `--arch`), linia z emblematem jako przerywnik (`.divider`).
- Szkic do porównań: https://claude.ai/artifact/QTXtHeLnmK9uoLAdXrfBeb (wersja z przełącznikiem palet; nie jest źródłem prawdy).

## Treść – zasady

- Oferta skóry pogrupowana **wg problemu** (odwodniona, poszarzała, problematyczna, zwiotczała, przebarwienia, melasma), ścieżki START / ADVANCED / PREMIUM; Diagnostyka 3D + Beauty Plan jako osobna sekcja „od czego zacząć”.
- Ceny jako **„od X zł”** = ceny regularne z Booksy, bez czasowych promocji (−15% itp.). Pełny cennik zostaje na Booksy. Przy zmianach cen edytuj `index.html` (sekcja OFERTA).
- Wszystkie przyciski rezerwacji → profil Booksy:
  `https://booksy.com/pl-pl/339658_amea-holistyczna-przestrzen-piekna-i-harmonii_salon-kosmetyczny_12355_bytom`
  (docelowo można podpiąć linki do konkretnych usług).
- Blok „Rytuały sezonowe” w zakładce Masaże jest sezonowy – podmieniać albo usuwać.
- Opinie i liczba opinii (5.0 / 48) przepisane ręcznie z Booksy.
- Brakujące dane są oznaczone w HTML komentarzami `TODO(...)`; pełna lista w `docs/TODO.md`. Nie wymyślać danych kontaktowych, cen ani godzin – pytać użytkownika.

## Zdjęcia

Obecne zdjęcia są robocze; będzie selekcja lub profesjonalna sesja. Hero: portret właścicielki `renata.webp` (poziomy, kadrowany do 4:5 przez `object-position` w `.hero .photo img`). Lista ujęć w `docs/TODO.md`. Przy podmianie zachowaj `width`/`height` w `<img>` zgodne z plikiem i `loading="lazy"` poza hero.

`joga-grupa.jpg` ma skorygowaną kolorystykę (było mocno pomarańczowe): `tools/color-match.ps1` z referencjami `joga.jpg` + `medytacja-prowadzaca.jpg`, siła `-StrengthL 0.5 -StrengthAB 0.7`. Ten sam skrypt przyda się do ujednolicenia zdjęć z sesji.
