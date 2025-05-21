# Open In Terminal

A retro-inspired, community-driven web app for sharing and discovering anonymous tech terms, tips, and discussions — all in a nostalgic 90s web terminal style.

![screenshot](docs/screenshot.png)

## Features

- 📝 Post anonymous tech terms, tips, or topics
- 🏷️ Add custom tags and choose categories
- 🗂️ Browse posts with pagination
- 🎨 90s-style retro web design
- 🔍 Search and filter (coming soon)
- 🛠️ Built with Django

## Getting Started

### Prerequisites

- Python 3.8+
- pip
- [Poetry](https://python-poetry.org/) or `pip` for dependency management
- (Optional) virtualenv

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/jajoul/openinterminal.git
    cd openinterminal
    ```

2. **Create and activate a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Apply migrations:**
    ```bash
    python manage.py migrate
    ```

5. **(Optional) Add default categories:**
    ```bash
    python term/add_categories.py
    ```

6. **Run the development server:**
    ```bash
    python manage.py runserver
    ```

7. **Visit the app:**
    - Open [http://localhost:8000/](http://localhost:8000/) in your browser.

## Usage

- Post new terms anonymously from the "📝 New Post" page.
- Add tags by typing them, separated by commas.
- Select a category for your post.
- Browse existing posts on the home page.

## Project Structure

```
openinterminal/
├── manage.py
├── openinterminal/
│   └── settings.py
├── term/
│   ├── models.py
│   ├── views.py
│   ├── templates/
│   │   └── term/
│   │       ├── index.html
│   │       └── post_term.html
│   └── add_categories.py
└── templates/
    └── base.html
```

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

[MIT](LICENSE)

---

Made with ❤️ for retro web fans!
