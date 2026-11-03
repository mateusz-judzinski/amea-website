# AMÉA – do uzupełnienia

Miejsca w kodzie oznaczone są komentarzami `TODO(...)` w `index.html`. Zrobione punkty są na dole pliku.

## Treści od salonu

- [ ] **Stylizacja paznokci** – jest w opisie salonu na Booksy, brak w cenniku: pokazywać? (Strefa przy oknie ze starego zdjęcia `strefa-eventowa.jpg` to jednak biurko konsultacji z analizatorem 3D, nie stanowisko do paznokci – widać na zdjęciach od klientki.) Na zdjęciach jest też kącik z fotelem i misą do stóp za zasłoną: czy to pedicure / rytuały stóp i czy pokazać?
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

Jasne, miękkie światło, tony porcelany i karmelu (paleta strony). Na stronie są już zdjęcia od klientki z telefonu (O nas, trzy w Przestrzeni); sesja może je zastąpić, ale nie jest już pilna.

Wskazówki, gdy klientka robi kolejne zdjęcia telefonem (z jej paczki z 3.11.2026):
- przesyłać oryginały (Dysk, AirDrop, e-mail jako plik), nie przez WhatsApp – zmniejsza do 2048 px i mocno kompresuje;
- robić też zdjęcia **poziome**: szerokie kafelki w Przestrzeni i Zajęciach są 16:9, a wszystkie zdjęcia z paczki są pionowe;
- obiektyw 1×, nie szeroki 0,5× (krzywi pionowe linie); telefon trzymać prosto, na wysokości klatki piersiowej;
- jedno światło: dzienne albo lampy, bez mieszania niebieskiego okna z żółtymi lampami; bez filtrów i trybu „ciepły”;
- przed zdjęciem posprzątać: płaszcze z wieszaka przy kanapie, butelki i drukarkę z biurka, torebki z komody.

| Miejsce na stronie | Ujęcie |
|---|---|
| Zespół (pion ×2) | Portrety Aleksandry i Ani w jednym stylu; najprościej jak u Katarzyny: przy podświetlonym szyldzie AMÉA, w pionie, cały szyld w kadrze |
| O nas (pion, łuk) | Zabieg w trakcie: dłonie specjalistki, klientka na łóżku (teraz: gabinet z muralem bez ludzi) |
| Przestrzeń – szerokie (poziomo) | Strefa relaksu przy oknie, bez płaszcza na wieszaku; sala ruchu w dziennym świetle |
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

- [x] Zdjęcia od klientki (37 plików, 3.11.2026): wybrane 4, wspólny wygląd przez `tools/photo-look.ps1`. O nas: gabinet z muralem; Przestrzeń: strefa relaksu w łuku, gabinet za zasłoną i sala ruchu (ściana z matami) – trzy różne miejsca zamiast zdjęć z cateringiem (`strefa-eventowa.jpg`), drugiego ujęcia lustra (`sala-jogi.jpg`) i sali przerobionej przez AI (`sala-wieczor.jpg`). Usunięte z repo: `gabinet.jpg`, `sala-jogi.jpg`, `strefa-eventowa.jpg`, `sala-wieczor.jpg`
- [x] Zajęcia ruchowe → Fitssey: przyciski w sekcji Zajęcia, karty z „od 50 zł” w zakładce Ruch, stopka oferty z Fitssey, Kontakt, stopka strony, JSON-LD; karta „Zdrowy kręgosłup” (3.11.2026)
- [x] Telefon 791 103 551, e-mail kontakt@amea-beauty.pl, Instagram i Facebook na stronie (3.11.2026)
- [x] Godziny otwarcia pon.–sob. 8:00–21:00, niedziela nieczynne – potwierdzone przez salon (3.11.2026)
- [x] Cała oferta zsynchronizowana z Booksy: Women's Ritual (7), Men's Skin (3), Men's Ritual (3), makijaż permanentny i henna pudrowa (6), pełny cennik zabiegów pojedynczych (3.11.2026)
- [x] Zespół: zdjęcia Renaty (`renata-zespol.webp`) i Katarzyny (`katarzyna-zespol.webp`), Aleksandra dodana do zespołu (3.11.2026)
- [x] Hero: portret Renaty (`renata.webp`)
- [x] Favicon (`favicon.ico` 16–48 px, `favicon-32.png`) + `apple-touch-icon` 180 px: czarny emblemat na białym tle
