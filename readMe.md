# 🎨 QR Code Generator

A modern, responsive web application for generating QR codes from URLs. Built with vanilla HTML, CSS, and JavaScript featuring a beautiful pastel design and persistent history storage.

## ✨ Features

- **🚀 Instant QR Code Generation** - Create QR codes in seconds using a free API
- **💾 Persistent History** - LocalStorage integration saves your QR code history
- **📱 Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- **🍔 Hamburger Menu** - Collapsible navigation for mobile devices
- **⬇️ Download Functionality** - Save QR codes as high-quality PNG images
- **🎨 Modern Design** - Beautiful pastel color scheme with smooth animations
- **📄 About Page** - Comprehensive information about features and usage
- **🆓 No API Key Required** - Uses free QR Server API

## 🎯 Demo

Simply open `index.html` in your browser to start generating QR codes!

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, flexbox, and grid
- **Vanilla JavaScript** - No frameworks or libraries required
- **LocalStorage API** - For persistent data storage
- **QR Server API** - Free QR code generation service

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/qr-generator.git
   cd qr-generator
   ```

2. **Open in browser**
   ```bash
   # Simply open the index.html file in your browser
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

3. **Or use a local server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with npx)
   npx http-server
   ```

## 🚀 Usage

### Generating a QR Code

1. Enter a URL in the input field (must include `http://` or `https://`)
2. Click **Generate QR Code** or press **Enter**
3. Your QR code will appear instantly
4. Click **Download QR Code** to save it as a PNG file

### Viewing History

1. Navigate to the **History** section
2. View all your previously generated QR codes
3. Click **View** on any item to regenerate that QR code

### About Section

Learn more about the application features and use cases in the **About** page.

## 🎨 Design Features

### Color Palette
- **Primary**: `#a8d5e2` (Pastel Blue)
- **Secondary**: `#fda7a7` (Pastel Pink)
- **Accent**: `#b4a7d6` (Pastel Purple)
- **Background**: `#fef6f9` (Light Pink)

### Responsive Breakpoints
- **Desktop**: > 768px
- **Mobile**: ≤ 768px

### Animations
- Smooth transitions on buttons and cards
- Hover effects on interactive elements
- Hamburger menu animation
- Section switching transitions

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Privacy

- No data is sent to external servers except for QR code generation
- All history is stored locally in your browser
- No tracking or analytics
- No user accounts or registration required

## 📝 API Information

This application uses the **QR Server API** for generating QR codes:

- **API URL**: `https://api.qrserver.com/v1/create-qr-code/`
- **Free to use**: No API key required
- **Image size**: 300x300 pixels
- **Format**: PNG

### API Parameters
```
size=300x300          # QR code dimensions
data=YOUR_URL         # URL to encode
```

## 🗂️ Project Structure

```
qr-generator/
│
├── index.html        # Main HTML file with embedded CSS and JS
└── README.md         # This file
```

## 💡 Code Highlights

### LocalStorage Implementation
```javascript
const STORAGE_KEY = 'qr_generator_history';

function loadHistoryFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveHistoryToStorage(history) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}
```

### Responsive Navigation
```javascript
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});
```

## 🎯 Use Cases

- **Business Cards** - Link to your website or portfolio
- **Marketing Materials** - Promotional flyers and posters
- **Event Management** - Registration and information pages
- **Restaurant Menus** - Contactless digital menus
- **Social Media** - Quick profile access
- **Education** - Share learning resources

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- LocalStorage has a ~5-10MB limit per domain
- History limited to 10 items to manage storage
- QR codes are limited to URL data (no vCard, WiFi, etc.)

## 🔮 Future Enhancements

- [ ] Custom QR code colors
- [ ] Size selection for QR codes
- [ ] Error correction level options
- [ ] Export history as CSV/JSON
- [ ] Dark mode toggle
- [ ] QR code scanning functionality
- [ ] Support for different QR code types (WiFi, vCard, etc.)
- [ ] Batch QR code generation
- [ ] Custom logo/image in QR code center



## 👨‍💻 Author

Created with ❤️ by Harry Mofoka in collaboration with NexlinkSolutionsza

## 🙏 Acknowledgments

- [QR Server API](https://goqr.me/api/) - Free QR code generation service
- Design inspiration from modern web design trends
- Community feedback and suggestions

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

⭐ **If you find this project useful, please consider giving it a star!** ⭐