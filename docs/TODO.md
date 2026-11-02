# AMÉA – do uzupełnienia

Miejsca w kodzie oznaczone są komentarzami `TODO(...)` w `index.html`.

## Treści od salonu

- [ ] **Kontakt**: telefon, e-mail, Instagram / Facebook
- [ ] **Godziny otwarcia** na cały tydzień (z Booksy znamy tylko „dziś 8:00–21:00”)
- [ ] **AMÉA Women's Ritual** – 7 rytuałów: nazwy, opisy, ceny
- [ ] **AMÉ Men's Skin** (3 zabiegi) i **AMÉ Men's Ritual** (3 rytuały): nazwy, opisy, ceny
- [ ] **Makijaż permanentny i henna pudrowa** – 6 usług: nazwy, ceny
- [ ] **Stylizacja paznokci** – jest w opisie salonu na Booksy, brak w cenniku: pokazywać?
- [ ] **Zajęcia**: grafik (dni/godziny), ceny/karnety, sposób zapisów, prowadzące
- [ ] **Zespół**: zdjęcia portretowe Katarzyny i Ani (Renata jest), nazwiska, krótkie bio; specjalizacja Ani
- [ ] **Bon upominkowy**: jak kupić (na miejscu / telefonicznie / online)
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
| Zajęcia (pion ×2) | Instruktorka w pozycji jogi; prowadząca z misą tybetańską |
| Zajęcia (szerokie) | Grupa podczas zajęć lub warsztatów, naturalne momenty |
| Zespół (pion ×3) | Portrety specjalistek w jednym stylu |
| Detale (zapas) | Kosmetyki, ampułki, ręcznik, roślina – martwa natura |

## Techniczne

- [ ] Domena + hosting (statyczny: Netlify / Cloudflare Pages / GitHub Pages / zwykły FTP)
- [ ] Po domenie: `<link rel="canonical">`, absolutne `og:url` i `og:image`, `sitemap.xml`, `robots.txt`
- [ ] Self-hosting fontów (RODO) zamiast Google Fonts
- [ ] Optymalizacja zdjęć po sesji (WebP/AVIF, ~1600 px dłuższy bok, `srcset`)
- [ ] Favicon w kilku rozmiarach + `apple-touch-icon`
- [ ] Ewentualnie linki „Umów” do konkretnych usług na Booksy
- [ ] Analityka? Jeśli tak – baner zgód cookies
