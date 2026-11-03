# AMÉA – do uzupełnienia

Miejsca w kodzie oznaczone są komentarzami `TODO(...)` w `index.html`.

## Treści od salonu

- [ ] **Kontakt**: e-mail (telefon 791 103 551, Instagram i Facebook są już na stronie, 3.11.2026)
- [ ] **Godziny otwarcia**: wpisane z Booksy (pon.–sob. 8:00–21:00, niedz. nieczynne) – potwierdzić, czy to godziny salonu, a nie tylko kalendarza
- [x] **AMÉA Women's Ritual** – 7 rytuałów z Booksy wpisane (3.11.2026)
- [x] **AMÉ Men's Skin** (3) i **AMÉ Men's Ritual** (3) – wpisane z Booksy (3.11.2026)
- [x] **Makijaż permanentny i henna pudrowa** – 6 usług z Booksy wpisane (3.11.2026)
- [ ] **Rytuały sezonowe**: halloweenowe zniknęły z Booksy i ze strony; przy kolejnej akcji dodać blok `.mini-cards` w zakładce Masaże
- [ ] **Stylizacja paznokci** – jest w opisie salonu na Booksy, brak w cenniku: pokazywać? Strefa przy oknie (zdjęcie `strefa-eventowa.jpg`, podpis „Strefa spotkań”) na co dzień to chyba stanowisko do paznokci; od odpowiedzi zależy podpis i opis w sekcji Przestrzeń
- [ ] **Zajęcia**: grafik (dni/godziny), ceny/karnety, sposób zapisów, prowadzące
- [ ] **Zespół**: zdjęcia portretowe Katarzyny, Aleksandry i Ani (Renata jest), nazwiska, krótkie bio. Ania ma bio na swoim profilu pracownika w Booksy (kosmetolog, rytuały i masaże; podpis na stronie wpisany 3.11.2026). Aleksandry nie ma na liście pracowników Booksy, jest tylko przy usługach makijażu permanentnego
- [ ] **Bon upominkowy**: jak kupić (na miejscu / telefonicznie / online); realizacja przez Booksy jest już opisana
- [ ] **Polityka prywatności** (link w stopce)

## Lista ujęć do sesji zdjęciowej

Jasne, miękkie światło, tony porcelany i karmelu (paleta strony).

| Miejsce na stronie | Ujęcie |
|---|---|
| Hero (pion, łuk) | ~~Portret właścicielki~~ – jest (`renata.webp`); z sesji ewentualnie wersja pionowa |
| O nas (pion, łuk) | Zabieg w trakcie: dłonie specjalistki, klientka na łóżku |
| Diagnostyka (opcjonalnie) | Analiza skóry 3D: urządzenie, ekran z wynikiem, rozmowa z klientką |
| Przestrzeń – duże (pion) | Sala ruchu: łukowe lustro, pufy, maty, symetrycznie |
| Przestrzeń – szerokie ×2 | Sala z oknem w dziennym świetle; recepcja / strefa spotkań |
| Przestrzeń – szerokie (pilne, zamiast `strefa-eventowa.jpg`) | Strefa przy oknie w codziennym wyglądzie, bez cateringu, napojów i kieliszków z dnia otwarcia. Wystarczy zdjęcie telefonem w dziennym świetle; kolory dopasuje `tools/color-match.ps1`. Ewentualnie retusz obecnego zdjęcia narzędziem AI (tylko usunięcie, bez dorabiania wyposażenia) |
| Zajęcia (pion ×2) | Instruktorka w pozycji jogi; prowadząca z misą tybetańską |
| Zajęcia (szerokie) | Grupa podczas zajęć lub warsztatów, naturalne momenty |
| Zespół (pion ×3) | Portrety specjalistek w jednym stylu |
| Detale (zapas) | Kosmetyki, ampułki, ręcznik, roślina – martwa natura |

## Techniczne

- [ ] Domena + hosting (statyczny: Netlify / Cloudflare Pages / GitHub Pages / zwykły FTP)
- [ ] Po domenie: `<link rel="canonical">`, absolutne `og:url` i `og:image`, `sitemap.xml`, `robots.txt`
- [ ] Self-hosting fontów (RODO) zamiast Google Fonts
- [ ] Optymalizacja zdjęć po sesji (WebP/AVIF, ~1600 px dłuższy bok, `srcset`)
- [x] Favicon (`favicon.ico` 16–48 px, `favicon-32.png`) + `apple-touch-icon` 180 px: czarny emblemat na białym tle
- [ ] Ewentualnie linki „Umów” do konkretnych usług na Booksy
- [ ] Analityka? Jeśli tak – baner zgód cookies
