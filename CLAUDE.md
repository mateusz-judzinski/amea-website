# AMÉA – strona one-page

Strona dla **AMÉA – Przestrzeń Piękna i Harmonii** (Beauty & Wellbeing, ul. Marszałka Józefa Piłsudskiego 65, 41-902 Bytom; właścicielka Renata Judzińska). Jedna strona: kosmetologia, fizjoterapia, zajęcia ruchowe, masaże i rytuały. Rezerwacje zabiegów przez Booksy, zapisy na zajęcia ruchowe przez Fitssey; strona sama niczego nie rezerwuje.

Komunikacja z użytkownikiem: po polsku. Treść strony: po polsku.

## Stack i uruchamianie

- Czysty statyczny HTML/CSS/JS, **bez build stepu i bez zależności**. Node.js jest na maszynie tylko dla narzędzi (Playwright MCP), strona go nie używa; Pythona brak. Jeśli kiedyś pojawi się potrzeba (np. podstrony, CMS), migracja do Astro jest naturalnym krokiem.
- **Bez testów automatycznych** – decyzja użytkownika. **Playwright MCP** (`.mcp.json`) służy wyłącznie do podglądu: zrzuty całej strony na 1280 px i 375 px, konsola. Wbudowana przeglądarka aplikacji też działa, ale jej zrzuty mają rozmiar panelu.
- Podgląd lokalny: `.claude/launch.json` → konfiguracja `amea` uruchamia `tools/serve.ps1` (serwer statyczny w PowerShellu) na http://localhost:5500. Ręcznie: `powershell -NoProfile -ExecutionPolicy Bypass -File tools/serve.ps1`.

## Struktura

```
index.html                 cała strona (sekcje w kolejności jak w nawigacji)
assets/css/styles.css      style; tokeny kolorów i fontów na górze w :root
assets/js/main.js          menu mobilne, zakładki oferty (ARIA tabs), odsłanianie zdjęć, panel usługi, rok w stopce
assets/img/brand/          logo-original.png + maski: logo-full, logo-word, emblem
assets/img/photos/         zdjęcia robocze (do wymiany po sesji)
tools/serve.ps1            lokalny serwer
tools/logo-masks.ps1       generuje maski logo z logo-original.png
tools/color-match.ps1      dopasowuje kolorystykę zdjęcia do zdjęć referencyjnych
tools/photo-look.ps1       wspólny wygląd zdjęć: balans bieli z neutralnego fragmentu + CLUT, kadr, WebP
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
- Rogi: zdjęcia 8 px (jak dół `--arch`), karty `--radius`. Odstęp nagłówek sekcji → treść: `--head-gap`. `.eyebrow` przyklejony do tytułu. Pas wokół pojedynczej karty (Bon): `.band-tight`. `.card-foot` (cena + link) jest przyklejony do dołu karty, żeby w rzędzie kart ceny stały na jednej linii; sam link bez ceny trzyma się prawej. Dwa przyciski w `.btn-row` na telefonie (≤ 520 px) układają się jeden pod drugim na pełną szerokość.
- Pełny przycisk na hover **ciemnieje** (rozjaśniony karmel daje białemu tekstowi < 4,5:1). `.link` ma podkreślenie z tła; hover rysuje na nim linię espresso.
- Odrzucone przez użytkownika (3.11.2026), nie proponować ponownie: w Przestrzeni nagłówek w dwóch kolumnach i podpisy pod zdjęciami (zostają nagłówek nad galerią i „pigułki” na zdjęciach); w Zajęciach obniżony łuk nachodzący na szerokie zdjęcie (zostają dwa równe łuki obok siebie); w O nas łuk złożony z dwóch zdjęć Beauty | Wellbeing; w Diagnostyce zdjęcie (zostaje sam tekst i kroki).
- O nas: zdjęcie po lewej, bo hero tuż wyżej ma układ tekst | łuk; pierwszy akapit większy jako wstęp. Na telefonie tekst przed zdjęciem.
- Przestrzeń: pionowe zdjęcie w wysokim łuku (`.g-tall`), poziome w szerokich kafelkach (`.g-wide`, 16:9). Każdy kafelek pokazuje inne miejsce: strefa relaksu, gabinety zabiegowe, sala ruchu i medytacji (recepcja z szyldem to ta sama strefa co kanapa, sala z płaskorzeźbą to ta sama sala co ściana z matami). Zdjęcie sali z płaskorzeźbą (`sala-wieczor.jpg`) usunięte 3.11.2026, bo było mocno przerobione przez AI – nie wracać do niego.
- Kontakt: karta trasy `.map-card` to łuk ze zdjęciem szyldu `szyld.jpg` (okrągła tablica wpisana w łuk, kadr `object-position: 0 50%`) z tabliczką adresu; link do Google Maps, bez iframe. Dane kontaktowe jako lista z cienkimi liniami, jak lista zajęć.
- **Panel usługi** (`dialog.sheet#svc`, użytkownik zachwycony – nie zmieniać charakteru): wysuwa się z prawej (telefon: od dołu, prawie cały ekran) nad przyciemnioną ofertą. Kolejność: eyebrow, tytuł, hasło wersalikami w karmelu, „dla kogo”, wybór opcji (wiersze jak `.tiers`, wybrany w karmelowej ramce), obszar/czas (pigułki jak zakładki), „Przebieg zabiegu” (kroki numerowane) albo „O zabiegu”, rozwijane wskazania/przeciwwskazania; na dole stały pasek z wyborem, ceną, czasem i „Wybierz termin”. Klasa listy kroków to `.sheet-steps` (`.steps` należy do Diagnostyki).
- Panele i inne elementy chowamy atrybutem `hidden` (w CSS jest `[hidden] { display: none !important }`, bo reguły `display` w klasach go nadpisywały).
- Szkic do porównań: https://claude.ai/artifact/QTXtHeLnmK9uoLAdXrfBeb (wersja z przełącznikiem palet; nie jest źródłem prawdy).

## Treść – zasady

- Oferta skóry pogrupowana **wg problemu** (odwodniona, poszarzała, problematyczna, zwiotczała, przebarwienia, melasma), ścieżki START / ADVANCED / PREMIUM; Diagnostyka 3D + Beauty Plan jako osobna sekcja „od czego zacząć”.
- Ceny jako **„od X zł”** = ceny regularne z Booksy, bez czasowych promocji (−15% itp.). Pełny cennik zostaje na Booksy; link do niego jest w `.offer-foot` pod kartami (z dopiskiem o cenach regularnych), nie przy nagłówku. Stopek jest kilka: `data-foot="default"` (Booksy) i `data-foot="<id zakładki>"` dla zakładki z własną (Ruch → Fitssey); `main.js` pokazuje tę dla aktywnej zakładki. Przy zmianach cen edytuj `index.html`: karty w sekcji OFERTA **i** dane panelu `#svc-data`.
- Przyciski rezerwacji ogólnej (hero, Kontakt, stopka oferty) → profil Booksy:
  `https://booksy.com/pl-pl/339658_amea-holistyczna-przestrzen-piekna-i-harmonii_salon-kosmetyczny_12355_bytom`
- **Rezerwacja konkretnej usługi (10.11.2026)**: „Umów” na kartach oferty, kafelki Women's Ritual, wiersze cennika „Zabiegi pojedyncze i technologie” (cały wiersz to link, wąska strzałka „→” zamiast słowa, żeby ceny zostały przy prawej krawędzi) i przyciski w Diagnostyce i Fizjoterapii mają `data-svc` (opcjonalnie `data-lvl` = opcja wybrana z góry) i otwierają panel usługi. „Wybierz termin” to zwykły link `profil?do=open-widget&variantId=<id>` w nowej karcie: Booksy otwiera się od razu na rezerwacji tej usługi i wersji (sprawdzone na komputerze i telefonie). Bez JS link z karty prowadzi na profil. Na naszej stronie **nic z Booksy się nie ładuje**; osadzony widżet Booksy (okienko, iframe) użytkownik odrzucił – „nie różni się od wejścia na Booksy”. Makijaż permanentny (telefonicznie) i zajęcia (Fitssey) nie mają panelu.
- Dane panelu: JSON w `<script type="application/json" id="svc-data">` pod ofertą; `id` wersji = `variantId` z Booksy. Źródło: `https://pl.booksy.com/core/v2/customer_api/businesses/339658/?with_combos=1&with_markdown=1` (ładuje go widżet `https://booksy.com/widget-2021/index.html?id=339658&lang=pl&country=pl`; złapać odpowiedź w Playwright): usługi, wersje z ceną regularną (`price`) i czasem, opisy, przypisane osoby. Teksty w panelu to skrót opisów z Booksy (salon ma je przejrzeć), niczego nie dopisujemy. Wyboru specjalistki w panelu nie ma: Booksy przypisuje Katarzynę (fizjoterapeutkę) m.in. do Clear Skin i Skin Lift – do wyjaśnienia z salonem; klientka może zmienić osobę w Booksy. W fizjoterapii każda karta ma dwie opcje: pierwsza wizyta (diagnostyczna, domyślna) i terapia z Booksy. `"price": null` = brak ceny w Booksy, panel pokazuje „Wycena indywidualna”. Retix C i Green Sea Peel są w Booksy podwójnie: karta Przebarwienia linkuje do wersji z kategorii przebarwień, cennik do wersji z „Zabiegów na twarz” (Green Sea Peel tam 1 h 30 min).
- **Zajęcia ruchowe → Fitssey** (wymaganie klientki): grafik `https://app.fitssey.com/3329969456/frontoffice`, cennik i karnety `…/frontoffice/pricing/classes`. Linki są w sekcji Zajęcia (przyciski), w zakładce Ruch (karty + stopka), w Kontakcie, w stopce strony i w JSON-LD. **Dni i godzin zajęć nie przepisujemy na stronę** – grafik zmienia się w Fitssey i by się rozjeżdżał; strona opisuje rodzaje zajęć. „od 50 zł” na kartach = wejście jednorazowe w Fitssey (karnet x4 180 zł; stan z 3.11.2026). Sprawdzanie: Playwright MCP na grafiku (kilka tygodni) i cenniku. Aktualny grafik na stronie możliwy tylko przez widżet Fitssey (kod z panelu właścicielki, patrz `docs/TODO.md`): osadzić pod `.class-list` w `#zajecia`, skrypt ładować dopiero przy zbliżeniu do sekcji, styl nadpisać tokenami z `:root`, przyciski zostają jako fallback, dopisać zewnętrzny skrypt do polityki prywatności.
- Zakładka Masaże: karty masaży + blok **AMÉA Women's Ritual** (`.mini-cards`; kafelki to linki `data-svc="rytualy" data-lvl="<nr>"`, „Umów” dopisuje CSS). Rytuały sezonowe (np. halloweenowe) dodawać jako osobny blok `.mini-cards` i usuwać, gdy znikną z Booksy.
- Opinie i liczba opinii (5.0 / 49, stan z 3.11.2026; liczba jest w hero i w sekcji Opinie) przepisane ręcznie z Booksy, cytaty **dosłownie** (najwyżej skrócone na granicy zdania).
- Cała oferta, godziny (pon.–sob. 8–21, potwierdzone przez salon) i realizacja bonów zsynchronizowane z Booksy 3.11.2026; 10.11.2026 poprawione ceny, które Booksy zmienił (konsultacja 3D 159 zł, fizjoterapia „wizyta od 150 zł”, borowina/świeca/bańki i drenaż od 180 zł). Odświeżanie: Playwright MCP na profilu Booksy, rozwinąć zwinięte kategorie (część jest domyślnie zamknięta), porównać z `index.html`; szybciej i pełniej z JSON-u Booksy (patrz dane panelu wyżej). Na Booksy w opisie usługi bywa „po umówionym terminie tel” – to informacja o rezerwacji, nie część nazwy.
- Kontakt: tel. **791 103 551** (`tel:+48791103551`), e-mail **kontakt@amea-beauty.pl**, Instagram `beauty_amea`, Facebook `BeautyAmea` (sekcja Kontakt, stopka, JSON-LD). Makijaż permanentny umawia się telefonicznie, więc jego karty mają „Zadzwoń” zamiast „Umów” z Booksy.
- Brakujące dane są oznaczone w HTML komentarzami `TODO(...)`; pełna lista w `docs/TODO.md`. Nie wymyślać danych kontaktowych, cen ani godzin – pytać użytkownika.

## Zdjęcia

Obecne zdjęcia są robocze; będzie selekcja lub profesjonalna sesja. Hero: portret właścicielki `renata.webp` (poziomy, kadrowany do 4:5 przez `object-position` w `.hero .photo img`). Zespół: osobne zdjęcie `renata-zespol.webp`, przycięte w pliku do 3:4 (do bioder), żeby nie powtarzać portretu z hero. Katarzyna: `katarzyna-zespol.webp`, zdjęcie przy szyldzie AMÉA w całym kadrze (oryginał był 3:4), bo przy ciaśniejszym kadrze łuk ucina literę „A”. Ania: `ania-zespol.webp` przy tym samym szyldzie, kadr tak wysoko, by napis był cały pod sklepieniem łuku. Aleksandra ma na razie pusty łuk z emblematem. Lista ujęć w `docs/TODO.md`. Przy podmianie zachowaj `width`/`height` w `<img>` zgodne z plikiem i `loading="lazy"` poza hero.

`joga-grupa.jpg` ma skorygowaną kolorystykę (było mocno pomarańczowe): `tools/color-match.ps1` z referencjami `joga.jpg` + `medytacja-prowadzaca.jpg`, siła `-StrengthL 0.5 -StrengthAB 0.7`.

Zdjęcia od klientki (3.11.2026, 37 plików z telefonu, przesłane przez WhatsApp: 2048 px, JPEG q70, wszystkie pionowe; część w dwóch wersjach, z ciepłym filtrem i bez – brać neutralne). Na stronę trafiły cztery, każde przez `tools/photo-look.ps1` (wspólny wygląd: biel ciepłego kremu, przygaszone pomarańcze i błękity, miękki kontrast). Źródło i parametry, gdyby trzeba było powtórzyć:
- `strefa-relaksu.webp` ← WA0021: `-Patch 480x200+960+1790 -WB 0.4 -Size 1200x1600` (podłoga w świetle z okna, więc słaba korekta). Wersja z szyldem (WA0037) była sprawdzona w tym łuku 3.11.2026 i użytkownik wolał tę
- `gabinet-mural.webp` ← WA0038: `-Patch 440x140+540+20 -WB 0.65 -Crop 1536x1920+0+64 -Size 1000x1250`
- `sala-joga.webp` ← WA0035: `-Patch 200x400+668+102 -WB 0.6 -Crop 1536x864+0+734 -Size 1440x810` (w galerii jako „Sala ruchu i medytacji”)
- `gabinet-zaslona.webp` ← WA0022: `-Crop 1536x864+0+758 -Size 1440x810` (bez `-Patch`, zdjęcie jest już neutralne)
Pozostałe dobre ujęcia (recepcja z szyldem WA0037, `-Patch 340x200+40+40 -WB 0.8`; sala z łóżkiem do masażu WA0024) są w zapasie. Odrzucone: duplikaty, łazienka i WC, ujęcia z bałaganem na biurku.

Druga paczka od klientki (5.11.2026, 129 oryginałów z iPhone’a, HEIC 4284×5712 – jakość dużo lepsza niż WhatsApp): selekcja leży u użytkownika w `Downloads\drive-download-20261105T181851Z-1-001` (`wybrane/` 10 zdjęć, `inne-pomieszczenia/` 5 słabych z miejscami, których nie ma na stronie), reszta poszła do Kosza.
- `ania-zespol.webp` ← IMG_9620.JPG: `-Patch 900x250+350+1820 -WB 0.6 -Crop 3375x4500+0+300 -Size 480x640` (neutralny fragment = szara tarcza szyldu pod napisem; biały fartuch w cieniu jest niebieskawy i ocieplałby całość)
- Sprawdzone i odrzucone przez użytkownika 5.11.2026: sala ruchu z prawdziwą płaskorzeźbą (IMG_9721) zamiast ściany z matami w Przestrzeni; strefa relaksu IMG_9695 nie weszła (zostaje WA0021).
- Zapas w `wybrane/`: sala z łóżkiem do masażu (IMG_9657), gabinet z muralem szerzej (IMG_9681), ściana z matami w dzień (IMG_9655, lepszy oryginał `sala-joga`), oryginał Katarzyny (IMG_7619), detale: płaskorzeźba, szyld, świece. `sala-lustro.jpg` nie jest w treści strony, ale to `og:image`.

Na maszynie są **ImageMagick** (`magick`: kadrowanie, WebP/AVIF, wersje do `srcset`) i **ffmpeg** (klatki z wideo). Surowe pliki trzymaj poza repo, do `assets/img/photos/` trafiają tylko gotowe.
