# AI Hackathon: The Game

Платформа для проведення ігрових AI-хакатонів. Складається з трьох мікросервісів:

- **Проєкт 1 (Sessions)** — управління ігровими сесіями, командами, раундами, таймерами
- **Проєкт 2 (Cards)** — каталог карток (8 мастей), рандомізатор, історія
- **Проєкт 3 (Scores & Forms)** — система балів, лідерборд, бейджі, інтерактивні форми (Problem Canvas, Crazy 8s)

## Технології

| Компонент | Технологія |
|-----------|-----------|
| Backend | C# ASP.NET Core Web API (.NET 10) |
| Frontend | React 18 + Vite + Tailwind CSS |
| БД | PostgreSQL 16 |
| WebSocket | SignalR (Проєкт 1) |
| Контейнери | Docker Compose |

## Структура проєкту

```
project_3/
├── docker-compose.yml              # PostgreSQL бази даних
├── project1-sessions/
│   ├── backend/                     # .NET Web API (порт 8081)
│   └── frontend/                    # React + Vite (порт 3001)
├── project2-cards/
│   ├── backend/                     # .NET Web API (порт 8082)
│   └── frontend/                    # React + Vite (порт 3002)
├── project3-scores/
│   ├── backend/                     # .NET Web API (порт 8083)
│   └── frontend/                    # React + Vite (порт 3003)
```

## Вимоги

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (для PostgreSQL)
- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js 18+](https://nodejs.org/) (для React фронтендів)

## Швидкий старт

### 1. Клонувати репозиторій

```bash
git clone https://github.com/iobradovuch/HackathonGame.git
cd HackathonGame
```

### 2. Запустити бази даних (Docker)

```bash
docker-compose up -d
```

Це створить три PostgreSQL бази:
- `hackathon_sessions` на порту **5435**
- `hackathon_cards` на порту **5434**
- `hackathon_scores` на порту **5436**

Перевірити, що контейнери працюють:
```bash
docker ps
```

### 3. Запустити Backend (Проєкт 1 — Sessions)

```bash
cd project1-sessions/backend/HackathonGame.SessionService
dotnet restore
dotnet ef database update    # Застосувати міграції
dotnet run --urls http://localhost:8081
```

Swagger UI: http://localhost:8081/swagger

### 4. Запустити Backend (Проєкт 2 — Cards)

В іншому терміналі:
```bash
cd project2-cards/backend/HackathonGame.CardsService
dotnet restore
dotnet ef database update    # Застосувати міграції
dotnet run --urls http://localhost:8082
```

Swagger UI: http://localhost:8082/swagger

### 5. Запустити Frontend (Проєкт 1)

В іншому терміналі:
```bash
cd project1-sessions/frontend
npm install
npm run dev
```

Відкрити: http://localhost:3001

### 6. Запустити Frontend (Проєкт 2)

В іншому терміналі:
```bash
cd project2-cards/frontend
npm install
npm run dev
```

Відкрити: http://localhost:3002

### 7. Запустити Backend (Проєкт 3 — Scores & Forms)

В іншому терміналі:
```bash
cd project3-scores/backend/HackathonGame.ScoresService
dotnet restore
dotnet ef database update    # Застосувати міграції
dotnet run --urls http://localhost:8083
```

Swagger UI: http://localhost:8083/swagger

### 8. Запустити Frontend (Проєкт 3)

В іншому терміналі:
```bash
cd project3-scores/frontend
npm install
npm run dev
```

Відкрити: http://localhost:3003

## API Endpoints

### Проєкт 1 — Sessions (порт 8081)

| Метод | URL | Опис |
|-------|-----|------|
| POST | `/api/sessions` | Створити сесію |
| GET | `/api/sessions/{code}` | Отримати сесію |
| GET | `/api/sessions/{code}/state` | Поточний стан |
| PUT | `/api/sessions/{code}/status` | Змінити статус |
| DELETE | `/api/sessions/{code}` | Видалити сесію |
| POST | `/api/sessions/{code}/teams` | Зареєструвати команду |
| GET | `/api/sessions/{code}/teams` | Список команд |
| GET | `/api/sessions/{code}/teams/{id}` | Отримати команду |
| DELETE | `/api/sessions/{code}/teams/{id}` | Видалити команду |
| PUT | `/api/sessions/{code}/teams/{id}/track` | Вибрати трек |
| PUT | `/api/sessions/{code}/teams/{id}/tokens` | Оновити токени |
| POST | `/api/sessions/{code}/rounds/start` | Старт раунду |
| POST | `/api/sessions/{code}/rounds/pause` | Пауза раунду |
| POST | `/api/sessions/{code}/rounds/next` | Наступний раунд |
| PUT | `/api/sessions/{code}/rounds/time` | Додати/зменшити час |

### Проєкт 2 — Cards (порт 8082)

| Метод | URL | Опис |
|-------|-----|------|
| GET | `/api/cards` | Всі картки |
| GET | `/api/cards/suits/{suit}` | Картки по масті |
| GET | `/api/cards/{id}` | Одна картка |
| POST | `/api/cards` | Створити картку |
| PUT | `/api/cards/{id}` | Оновити картку |
| DELETE | `/api/cards/{id}` | Видалити картку |
| POST | `/api/randomizer/draw` | Витягнути випадкову картку |
| POST | `/api/randomizer/draw-multi` | Витягнути кілька карток |
| GET | `/api/history/session/{sessionId}` | Історія сесії |
| GET | `/api/history/team/{sessionId}/{teamId}` | Історія команди |
| GET | `/api/history/export/{sessionId}` | Експорт CSV |

### Проєкт 3 — Scores & Forms (порт 8083)

#### Бали (Scores)

| Метод | URL | Опис |
|-------|-----|------|
| GET | `/api/scores/{sessionId}` | Лідерборд сесії |
| GET | `/api/scores/{sessionId}/team/{teamId}` | Бали команди |
| POST | `/api/scores/{sessionId}/team/{teamId}` | Нарахувати бали |
| GET | `/api/scores/{sessionId}/history` | Історія нарахувань |
| GET | `/api/scores/{sessionId}/team/{teamId}/history` | Історія команди |

#### Форми (Forms)

| Метод | URL | Опис |
|-------|-----|------|
| POST | `/api/forms/{sessionId}/team/{teamId}` | Зберегти форму |
| GET | `/api/forms/{sessionId}/team/{teamId}` | Форми команди |
| GET | `/api/forms/{sessionId}/team/{teamId}/{type}` | Конкретна форма |
| PUT | `/api/forms/{id}` | Оновити форму |
| GET | `/api/forms/{sessionId}` | Всі форми сесії |

#### Бейджі (Badges)

| Метод | URL | Опис |
|-------|-----|------|
| GET | `/api/badges/types` | Типи бейджів |
| GET | `/api/badges/{sessionId}` | Бейджі сесії |
| POST | `/api/badges/{sessionId}/team/{teamId}` | Видати бейдж |

#### Експорт (Export)

| Метод | URL | Опис |
|-------|-----|------|
| GET | `/api/export/{sessionId}/history/csv` | Експорт історії CSV |
| GET | `/api/export/{sessionId}/leaderboard/csv` | Експорт лідерборду CSV |

## Типи бейджів

| Тип | Іконка | Назва | Бонусні бали |
|-----|--------|-------|-------------|
| innovator | 💡 | Інноватор | +10 |
| speedster | ⚡ | Швидкісний | +5 |
| presenter | 🎤 | Презентатор | +10 |
| teamwork | 🤝 | Командна робота | +5 |
| problem_solver | 🧩 | Вирішувач проблем | +10 |
| creative | 🎨 | Креативний | +10 |
| survivor | 🛡️ | Вижилець | +15 |
| mvp | 🏆 | MVP | +20 |

## Масті карток

| Масть | Назва UA | Колір |
|-------|----------|-------|
| chains | Ланцюги | Синій |
| virus | Вірус | Зелений |
| wheel | Колесо | Жовтий |
| bolt | Блискавка | Фіолетовий |
| eye | Око | Бірюзовий |
| mask | Маска | Червоний |
| spiral | Спіраль | Рожевий |
| alert | Тривога | Помаранчевий |

## Порти

| Сервіс | Порт |
|--------|------|
| PostgreSQL (Sessions) | 5435 |
| PostgreSQL (Cards) | 5434 |
| PostgreSQL (Scores) | 5436 |
| Backend Sessions | 8081 |
| Backend Cards | 8082 |
| Backend Scores | 8083 |
| Frontend Sessions | 3001 |
| Frontend Cards | 3002 |
| Frontend Scores | 3003 |

## Зупинити сервіси

Бази даних:
```bash
docker-compose down
```

Щоб видалити дані БД:
```bash
docker-compose down -v
```
