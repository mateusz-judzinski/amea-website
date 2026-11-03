# AMÉA – do uzupełnienia

Miejsca w kodzie oznaczone są komentarzami `TODO(...)` w `index.html`. Zrobione punkty są na dole pliku.

## Treści od salonu

- [ ] **Stylizacja paznokci** – jest w opisie salonu na Booksy, brak w cenniku: pokazywać? Strefa przy oknie (zdjęcie `strefa-eventowa.jpg`, podpis „Strefa spotkań”) na co dzień to chyba stanowisko do paznokci; od odpowiedzi zależy podpis i opis w sekcji Przestrzeń
- [ ] **Kod widżetu grafiku Fitssey** (opcjonalnie, daje aktualny grafik na stronie). Renata w panelu Fitssey:
  1. Studio → Integracje → Widżety;
  2. skopiować „kod bazowy”;
  3. kliknąć „Generuj kod” przy Grafiku (bez filtrów = wszystkie zajęcia);
  4. przesłać oba fragmenty. Opcjonalnie to samo dla widżetu Cennika.
- [ ] **Zajęcia – pytania do salonu**:
  - „Zajęcia sensualne” są na stronie, ale nie ma ich w grafiku ani cenniku Fitssey – czy są jeszcze prowadzone?
  - Prowadzące z Fitssey (Pati: joga i zdrowy kręgosłup, Karola: pilates) – pokazać je w Zespole?
  - Nagłówek cennika w Fitssey mówi o „kameralnych zajęciach dla mam i dzieci” – to stała oferta do pokazania na stronie?
- [ ] **Zespół**: zdjęcia portretowe Aleksandry i Ani; nazwiska i krótkie bio Katarzyny, Aleksandry i Ani. Ania ma bio na swoim profilu pracownika w Booksy (kosmetolog, rytuały i masaże; podpis na stronie wpisany 3.11.2026). Aleksandry nie ma na liście pracowników Booksy, jest tylko przy usługach makijażu permanentnego
- [ ] **Bon upominkowy**: jak kupić (na miejscu / telefonicznie / online); realizacja przez Booksy jest już opisana
- [ ] **Polityka prywatności** (link w stopce)

## Lista ujęć do sesji zdjęciowej

Jasne, miękkie światło, tony porcelany i karmelu (paleta strony).

| Miejsce na stronie | Ujęcie |
|---|---|
| Przestrzeń – szerokie (pilne, zamiast `strefa-eventowa.jpg`) | Strefa przy oknie w codziennym wyglądzie, bez cateringu, napojów i kieliszków z dnia otwarcia. Wystarczy zdjęcie telefonem w dziennym świetle; kolory dopasuje `tools/color-match.ps1`. Ewentualnie retusz obecnego zdjęcia narzędziem AI (tylko usunięcie, bez dorabiania wyposażenia) |
| Zespół (pion ×2) | Portrety Aleksandry i Ani w jednym stylu; najprościej jak u Katarzyny: przy podświetlonym szyldzie AMÉA, w pionie, cały szyld w kadrze |
| O nas (pion, łuk) | Zabieg w trakcie: dłonie specjalistki, klientka na łóżku |
| Diagnostyka (opcjonalnie) | Analiza skóry 3D: urządzenie, ekran z wynikiem, rozmowa z klientką |
| Przestrzeń – duże (pion) | Sala ruchu: łukowe lustro, pufy, maty, symetrycznie |
| Przestrzeń – szerokie ×2 | Sala z oknem w dziennym świetle; recepcja / strefa spotkań |
| Zajęcia (pion ×2) | Instruktorka w pozycji jogi; prowadząca z misą tybetańską |
| Zajęcia (szerokie) | Grupa podczas zajęć lub warsztatów, naturalne momenty |
| Hero (opcjonalnie) | Pionowa wersja portretu Renaty; obecny `renata.webp` jest poziomy i kadrowany w CSS |
| Detale (zapas) | Kosmetyki, ampułki, ręcznik, roślina – martwa natura |

## Techniczne

- [ ] Domena + hosting (statyczny: Netlify / Cloudflare Pages / GitHub Pages / zwykły FTP)
- [ ] Po domenie: `<link rel="canonical">`, absolutne `og:url` i `og:image`, `sitemap.xml`, `robots.txt`
- [ ] Self-hosting fontów (RODO) zamiast Google Fonts
- [ ] Optymalizacja zdjęć po sesji (WebP/AVIF, ~1600 px dłuższy bok, `srcset`)
- [ ] **Osadzić widżet Fitssey** (gdy przyjdzie kod): w `#zajecia` pod listą zajęć (miejsce oznaczone `TODO(zajęcia)` w `index.html`); skrypt ładowany dopiero przy zbliżeniu do sekcji; styl nadpisany tokenami „Karmel” (Fitssey przyjmuje własny CSS); przyciski „Grafik i zapisy” / „Cennik i karnety” zostają jako fallback; wpis o zewnętrznym skrypcie w polityce prywatności; zrzuty 1280/375 px
- [ ] Ewentualnie linki „Umów” do konkretnych usług na Booksy
- [ ] Analityka? Jeśli tak – baner zgód cookies

## Zrobione

- [x] Zajęcia ruchowe → Fitssey: przyciski w sekcji Zajęcia, karty z „od 50 zł” w zakładce Ruch, stopka oferty z Fitssey, Kontakt, stopka strony, JSON-LD; karta „Zdrowy kręgosłup” (3.11.2026)
- [x] Telefon 791 103 551, e-mail kontakt@amea-beauty.pl, Instagram i Facebook na stronie (3.11.2026)
- [x] Godziny otwarcia pon.–sob. 8:00–21:00, niedziela nieczynne – potwierdzone przez salon (3.11.2026)
- [x] Cała oferta zsynchronizowana z Booksy: Women's Ritual (7), Men's Skin (3), Men's Ritual (3), makijaż permanentny i henna pudrowa (6), pełny cennik zabiegów pojedynczych (3.11.2026)
- [x] Zespół: zdjęcia Renaty (`renata-zespol.webp`) i Katarzyny (`katarzyna-zespol.webp`), Aleksandra dodana do zespołu (3.11.2026)
- [x] Hero: portret Renaty (`renata.webp`)
- [x] Favicon (`favicon.ico` 16–48 px, `favicon-32.png`) + `apple-touch-icon` 180 px: czarny emblemat na białym tle
