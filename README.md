# VS DANCE StudioS — нова начална зона

Функционален прототип на нова Hero секция и секция „Открий подходящата
тренировка“ за [vs.dance](https://vs.dance).

**Live preview:** _(ще бъде добавен след деплоя)_

---

## Обхват

Репото съдържа **само прототипа** — Hero секцията и секцията „Открий
подходящата тренировка“, в desktop и mobile версия. Останалата част от сайта,
backend, база данни и форма за регистрация не са част от задачата.

Анализът на съществуващия сайт и концепцията с wireframe се предават като
отделен **PDF документ**.

## Стартиране

Изисква **Node.js 22+** (проектът съдържа `.nvmrc`).

```bash
nvm use          # или ръчно Node 22+
npm install
npm run dev      # http://localhost:3000
```

### Production build

Статичен export — `npm run build` генерира готова за деплой папка `out/`,
без Node сървър по време на изпълнение.

```bash
npm run build
npx serve out      # локален preview на статичния export
```

### Тестове

```bash
npx playwright install chromium   # еднократно
npm test                          # e2e, достъпност, визуални снимки
npm run test:report               # отваря HTML отчета
```

---

## Технологии

| Технология                                        | Версия          | Роля                                                            |
| ------------------------------------------------- | --------------- | --------------------------------------------------------------- |
| [Next.js](https://nextjs.org)                     | 15 (App Router) | React Server Components — Hero-то се доставя без client-side JS |
| [React](https://react.dev)                        | 19              | UI слой                                                         |
| [TypeScript](https://www.typescriptlang.org)      | 5.7             | типова безопасност, вкл. за `dataLayer` събитията               |
| [Tailwind CSS](https://tailwindcss.com)           | 4               | CSS-first конфигурация върху design tokens                      |
| [Playwright](https://playwright.dev)              | 1.5x            | e2e, достъпност и визуални тестове                              |
| [axe-core](https://github.com/dequelabs/axe-core) | 4.x             | автоматизирана WCAG 2.1 AA проверка                             |

### Външни ресурси и лицензи

| Ресурс                    | Източник                                                  | Лиценз                                                            |
| ------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| Снимки и текстове         | vs.dance — оригиналният сайт на клиента                   | използвани по условие на задачата                                 |
| Шрифт — Oswald (headline) | [Google Fonts](https://fonts.google.com/specimen/Oswald)  | SIL OFL 1.1, потвърдена поддръжка на кирилица                     |
| Шрифт — PT Sans (body)    | [Google Fonts](https://fonts.google.com/specimen/PT+Sans) | SIL OFL 1.1, изграден двуезично (латиница + кирилица) от ParaType |

Не са използвани снимки на танцьори или други лица от външни източници.

---

## Структура

```
.
├── public/         # оптимизирани статични асети (AVIF/WebP + srcset)
├── src/
│   ├── app/        # Next.js App Router
│   ├── components/ # Hero, ClassFinder
│   └── lib/        # design tokens, типизиран dataLayer слой
└── tests/          # Playwright — e2e, a11y, визуални снимки
```
