// QR Code Generator - Main Application

// State Management
let currentQRData = null;

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const qrForm = document.getElementById('qrForm');
const urlInput = document.getElementById('urlInput');
const qrSize = document.getElementById('qrSize');
const qrResult = document.getElementById('qrResult');
const qrImage = document.getElementById('qrImage');
const qrUrl = document.getElementById('qrUrl');
const qrDate = document.getElementById('qrDate');
const downloadBtn = document.getElementById('downloadBtn');
const historyGrid = document.getElementById('historyGrid');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// QR Code Generation
qrForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const url = urlInput.value.trim();
    const size = qrSize.value;
    
    if (!url) {
        alert('Please enter a valid URL');
        return;
    }
    
    // Validate URL
    try {
        new URL(url);
    } catch (error) {
        alert('Please enter a valid URL (including http:// or https://)');
        return;
    }
    
    // Generate QR Code using free API
    generateQRCode(url, size);
});

function generateQRCode(url, size) {
    // Using QR Server API - Free and no API key required
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
    
    // Update UI
    qrImage.src = qrApiUrl;
    qrUrl.textContent = url;
    
    const now = new Date();
    qrDate.textContent = `Generated on ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
    
    // Show result
    qrResult.style.display = 'block';
    qrResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Store current QR data
    currentQRData = {
        url: url,
        qrUrl: qrApiUrl,
        size: size,
        timestamp: now.toISOString(),
        dateString: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
    };
    
    // Save to localStorage
    saveToHistory(currentQRData);
    
    // Refresh history display
    loadHistory();
}

// Download QR Code
downloadBtn.addEventListener('click', async () => {
    if (!currentQRData) return;
    
    try {
        // Fetch the image
        const response = await fetch(currentQRData.qrUrl);
        const blob = await response.blob();
        
        // Create download link
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        
        // Generate filename
        const filename = `qr-code-${Date.now()}.png`;
        link.download = filename;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        window.URL.revokeObjectURL(downloadUrl);
        
        // Show success message
        showNotification('QR Code downloaded successfully!');
    } catch (error) {
        console.error('Download error:', error);
        alert('Failed to download QR code. Please try again.');
    }
});

// LocalStorage Functions
function saveToHistory(qrData) {
    let history = getHistory();
    
    // Add new entry at the beginning
    history.unshift(qrData);
    
    // Limit history to 20 items
    if (history.length > 20) {
        history = history.slice(0, 20);
    }
    
    // Save to localStorage
    localStorage.setItem('qrHistory', JSON.stringify(history));
}

function getHistory() {
    try {
        const history = localStorage.getItem('qrHistory');
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('Error reading history:', error);
        return [];
    }
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
        localStorage.removeItem('qrHistory');
        loadHistory();
        showNotification('History cleared successfully!');
    }
}

function deleteHistoryItem(index) {
    let history = getHistory();
    history.splice(index, 1);
    localStorage.setItem('qrHistory', JSON.stringify(history));
    loadHistory();
    showNotification('Item deleted successfully!');
}

// Display History
function loadHistory() {
    const history = getHistory();
    
    if (history.length === 0) {
        historyGrid.innerHTML = '<p class="empty-state">No previous sessions yet. Generate your first QR code!</p>';
        return;
    }
    
    historyGrid.innerHTML = '';
    
    history.forEach((item, index) => {
        const historyItem = createHistoryItem(item, index);
        historyGrid.appendChild(historyItem);
    });
}

function createHistoryItem(data, index) {
    const div = document.createElement('div');
    div.className = 'history-item';
    
    div.innerHTML = `
        <img src="${data.qrUrl}" alt="QR Code for ${data.url}">
        <p class="history-item-url">${truncateUrl(data.url, 40)}</p>
        <p class="history-item-date">${data.dateString}</p>
        <div class="history-item-actions">
            <button class="btn btn-secondary" onclick="downloadHistoryItem(${index})">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
            </button>
            <button class="btn btn-clear" onclick="deleteHistoryItem(${index})">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Delete
            </button>
        </div>
    `;
    
    return div;
}

// Download from history
async function downloadHistoryItem(index) {
    const history = getHistory();
    const item = history[index];
    
    if (!item) return;
    
    try {
        const response = await fetch(item.qrUrl);
        const blob = await response.blob();
        
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `qr-code-${Date.now()}.png`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        window.URL.revokeObjectURL(downloadUrl);
        
        showNotification('QR Code downloaded successfully!');
    } catch (error) {
        console.error('Download error:', error);
        alert('Failed to download QR code. Please try again.');
    }
}

// Clear History Button
clearHistoryBtn.addEventListener('click', clearHistory);

// Utility Functions
function truncateUrl(url, maxLength) {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength - 3) + '...';
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #A8DAFF, #7AC5FF);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(168, 218, 255, 0.4);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }, 250);
});
