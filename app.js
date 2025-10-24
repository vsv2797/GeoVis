// Application State
let appState = {
    currentView: 'upload',
    uploadedFile: null,
    semanticFilter: '',
    matchResults: [],
    selectedMatch: null,
    processingProgress: 0,
    map: null,
    markers: [],
    filteredResults: [],
    locationRestricted: false,
    restrictedLocationName: ''
};

// Hannover-specific match data
const hannoverMatches = [
    {
        id: 1,
        rank: 1,
        location: {
            name: "Kröpcke Square",
            lat: 52.3759,
            lng: 9.7395,
            address: "Kröpcke, 30159 Hannover, Germany"
        },
        similarity: 94,
        capturedDate: "2024-09-10",
        photographer: "HannoverMapper"
    },
    {
        id: 2,
        rank: 2,
        location: {
            name: "Herrenhausen Gardens",
            lat: 52.3892,
            lng: 9.6975,
            address: "Herrenhäuser Str., 30419 Hannover, Germany"
        },
        similarity: 91,
        capturedDate: "2024-08-22",
        photographer: "GardenExplorer_HAN"
    },
    {
        id: 3,
        rank: 3,
        location: {
            name: "Marktkirche",
            lat: 52.3717,
            lng: 9.7380,
            address: "Hanns-Lilje-Platz 2, 30159 Hannover, Germany"
        },
        similarity: 89,
        capturedDate: "2024-07-15",
        photographer: "HannoverHistory"
    },
    {
        id: 4,
        rank: 4,
        location: {
            name: "Maschsee Lake Promenade",
            lat: 52.3528,
            lng: 9.7420,
            address: "Maschsee, 30169 Hannover, Germany"
        },
        similarity: 87,
        capturedDate: "2024-06-30",
        photographer: "LakeViews_HAN"
    },
    {
        id: 5,
        rank: 5,
        location: {
            name: "Steintor Square",
            lat: 52.3789,
            lng: 9.7456,
            address: "Steintor, 30167 Hannover, Germany"
        },
        similarity: 85,
        capturedDate: "2024-06-18",
        photographer: "HannoverStreets"
    },
    {
        id: 6,
        rank: 6,
        location: {
            name: "Leineufer Riverside",
            lat: 52.3650,
            lng: 9.7280,
            address: "Am Hohen Ufer, 30159 Hannover, Germany"
        },
        similarity: 83,
        capturedDate: "2024-05-25",
        photographer: "RiverMapper"
    },
    {
        id: 7,
        rank: 7,
        location: {
            name: "Ernst-August-Platz",
            lat: 52.3761,
            lng: 9.7414,
            address: "Ernst-August-Platz, 30159 Hannover, Germany"
        },
        similarity: 81,
        capturedDate: "2024-05-10",
        photographer: "StationViews_HAN"
    },
    {
        id: 8,
        rank: 8,
        location: {
            name: "Leibniz University Campus",
            lat: 52.3833,
            lng: 9.7167,
            address: "Welfengarten 1, 30167 Hannover, Germany"
        },
        similarity: 79,
        capturedDate: "2024-04-20",
        photographer: "CampusMapper"
    },
    {
        id: 9,
        rank: 9,
        location: {
            name: "Linden District",
            lat: 52.3667,
            lng: 9.7167,
            address: "Limmerstraße, 30451 Hannover, Germany"
        },
        similarity: 77,
        capturedDate: "2024-04-05",
        photographer: "LindenExplorer"
    },
    {
        id: 10,
        rank: 10,
        location: {
            name: "List District",
            lat: 52.3883,
            lng: 9.7500,
            address: "Podbielskistraße, 30177 Hannover, Germany"
        },
        similarity: 75,
        capturedDate: "2024-03-28",
        photographer: "ListMapper"
    }
];

// Global match data
const globalMatches = [
    {
        id: 1,
        rank: 1,
        location: {
            name: "Gothic Quarter, Barcelona",
            lat: 41.3851,
            lng: 2.1734,
            address: "Carrer del Bisbe, Barcelona, Spain"
        },
        similarity: 95,
        capturedDate: "2024-06-15",
        photographer: "MapillaryUser_Barcelona"
    },
    {
        id: 2,
        rank: 2,
        location: {
            name: "Mission District, San Francisco",
            lat: 37.7749,
            lng: -122.4194,
            address: "Valencia Street, San Francisco, CA, USA"
        },
        similarity: 92,
        capturedDate: "2024-05-22",
        photographer: "SF_Explorer"
    },
    {
        id: 3,
        rank: 3,
        location: {
            name: "Shibuya Crossing, Tokyo",
            lat: 35.6762,
            lng: 139.6503,
            address: "Shibuya City, Tokyo, Japan"
        },
        similarity: 89,
        capturedDate: "2024-07-10",
        photographer: "TokyoMapper"
    },
    {
        id: 4,
        rank: 4,
        location: {
            name: "Camden Town, London",
            lat: 51.5074,
            lng: -0.1278,
            address: "Camden High Street, London, UK"
        },
        similarity: 87,
        capturedDate: "2024-04-18",
        photographer: "LondonViews"
    },
    {
        id: 5,
        rank: 5,
        location: {
            name: "The Rocks, Sydney",
            lat: -33.8688,
            lng: 151.2093,
            address: "George Street, Sydney, Australia"
        },
        similarity: 85,
        capturedDate: "2024-03-25",
        photographer: "AussieMapper"
    },
    {
        id: 6,
        rank: 6,
        location: {
            name: "Kreuzberg, Berlin",
            lat: 52.5200,
            lng: 13.4050,
            address: "Oranienstraße, Berlin, Germany"
        },
        similarity: 83,
        capturedDate: "2024-06-30",
        photographer: "BerlinStreets"
    },
    {
        id: 7,
        rank: 7,
        location: {
            name: "Le Marais, Paris",
            lat: 48.8566,
            lng: 2.3522,
            address: "Rue des Rosiers, Paris, France"
        },
        similarity: 81,
        capturedDate: "2024-05-05",
        photographer: "ParisPhoto"
    },
    {
        id: 8,
        rank: 8,
        location: {
            name: "Colaba, Mumbai",
            lat: 19.0760,
            lng: 72.8777,
            address: "Colaba Causeway, Mumbai, India"
        },
        similarity: 78,
        capturedDate: "2024-02-14",
        photographer: "MumbaiExplorer"
    },
    {
        id: 9,
        rank: 9,
        location: {
            name: "Vila Madalena, São Paulo",
            lat: -23.5505,
            lng: -46.6333,
            address: "Rua Harmonia, São Paulo, Brazil"
        },
        similarity: 76,
        capturedDate: "2024-01-20",
        photographer: "SPMapper"
    },
    {
        id: 10,
        rank: 10,
        location: {
            name: "Bo-Kaap, Cape Town",
            lat: -33.9249,
            lng: 18.4241,
            address: "Wale Street, Cape Town, South Africa"
        },
        similarity: 74,
        capturedDate: "2024-08-08",
        photographer: "CapeTownViews"
    }
];

// Processing messages
const processingMessages = {
    no_filter: [
        { stage: 25, message: "Extracting visual features using CLIP model..." },
        { stage: 50, message: "Searching global Mapillary imagery database..." },
        { stage: 75, message: "Computing similarity scores across worldwide locations..." },
        { stage: 100, message: "Preparing interactive map with global results..." }
    ],
    with_filter: [
        { stage: 15, message: "Geocoding location using Nominatim..." },
        { stage: 35, message: "Extracting visual features using CLIP model..." },
        { stage: 60, message: "Searching Mapillary database within specified region..." },
        { stage: 85, message: "Computing similarity scores for local matches..." },
        { stage: 100, message: "Preparing map centered on your location..." }
    ]
};

// DOM Elements
const elements = {
    // Views
    uploadView: document.getElementById('uploadView'),
    processingView: document.getElementById('processingView'),
    resultsView: document.getElementById('resultsView'),
    
    // Upload elements
    uploadZone: document.getElementById('uploadZone'),
    fileInput: document.getElementById('fileInput'),
    filePreview: document.getElementById('filePreview'),
    previewMedia: document.getElementById('previewMedia'),
    fileName: document.getElementById('fileName'),
    fileSize: document.getElementById('fileSize'),
    locationInput: document.getElementById('locationInput'),
    analyzeBtn: document.getElementById('analyzeBtn'),
    
    // Processing elements
    processingMessage: document.getElementById('processingMessage'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    
    // Results elements
    newSearchBtn: document.getElementById('newSearchBtn'),
    aboutDemoBtn: document.getElementById('aboutDemoBtn'),
    resultsTitle: document.getElementById('resultsTitle'),
    locationRestriction: document.getElementById('locationRestriction'),
    similaritySlider: document.getElementById('similaritySlider'),
    similarityValue: document.getElementById('similarityValue'),
    resultsList: document.getElementById('resultsList'),
    
    // Modal elements
    imageModal: document.getElementById('imageModal'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalClose: document.getElementById('modalClose'),
    navPrev: document.getElementById('navPrev'),
    navNext: document.getElementById('navNext'),
    modalImage: document.getElementById('modalImage'),
    modalLocation: document.getElementById('modalLocation'),
    modalSimilarity: document.getElementById('modalSimilarity'),
    modalDate: document.getElementById('modalDate'),
    modalPhotographer: document.getElementById('modalPhotographer'),
    modalCoordinates: document.getElementById('modalCoordinates'),
    
    // Prototype demo modal
    prototypeDemoModal: document.getElementById('prototypeDemoModal'),
    demoModalOverlay: document.getElementById('demoModalOverlay'),
    demoModalClose: document.getElementById('demoModalClose'),
    
    // No results modal
    noResultsModal: document.getElementById('noResultsModal'),
    noResultsOverlay: document.getElementById('noResultsOverlay'),
    noResultsClose: document.getElementById('noResultsClose'),
    noResultsLocation: document.getElementById('noResultsLocation'),
    tryAnotherSearch: document.getElementById('tryAnotherSearch'),
    
    // Info panel (kept for backward compatibility)
    infoBtn: document.getElementById('infoBtn'),
    infoPanel: document.getElementById('infoPanel'),
    infoClose: document.getElementById('infoClose')
};

// Initialize application
function init() {
    setupEventListeners();
    showView('upload');
}

// Event Listeners
function setupEventListeners() {
    // File upload events
    elements.uploadZone.addEventListener('click', () => elements.fileInput.click());
    elements.uploadZone.addEventListener('dragover', handleDragOver);
    elements.uploadZone.addEventListener('dragleave', handleDragLeave);
    elements.uploadZone.addEventListener('drop', handleDrop);
    elements.fileInput.addEventListener('change', handleFileSelect);
    
    // Form events
    elements.locationInput.addEventListener('input', handleLocationInput);
    elements.analyzeBtn.addEventListener('click', handleAnalyze);
    elements.newSearchBtn.addEventListener('click', handleNewSearch);
    elements.aboutDemoBtn.addEventListener('click', showPrototypeDemoModal);
    
    // Results events
    elements.similaritySlider.addEventListener('input', handleSimilarityFilter);
    
    // Modal events
    elements.modalOverlay.addEventListener('click', closeModal);
    elements.modalClose.addEventListener('click', closeModal);
    elements.navPrev.addEventListener('click', () => navigateModal(-1));
    elements.navNext.addEventListener('click', () => navigateModal(1));
    
    // Prototype demo modal events
    elements.demoModalOverlay.addEventListener('click', closePrototypeDemoModal);
    elements.demoModalClose.addEventListener('click', closePrototypeDemoModal);
    
    // No results modal events
    elements.noResultsOverlay.addEventListener('click', closeNoResultsModal);
    elements.noResultsClose.addEventListener('click', closeNoResultsModal);
    elements.tryAnotherSearch.addEventListener('click', handleNewSearch);
    
    // Info panel events (kept for backward compatibility)
    if (elements.infoBtn) elements.infoBtn.addEventListener('click', toggleInfoPanel);
    if (elements.infoClose) elements.infoClose.addEventListener('click', toggleInfoPanel);
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyPress);
}

// File handling
function handleDragOver(e) {
    e.preventDefault();
    elements.uploadZone.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    elements.uploadZone.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    elements.uploadZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/webm'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image (JPG, PNG) or video (MP4, WebM) file.');
        return;
    }
    
    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
        alert('File size must be less than 50MB.');
        return;
    }
    
    appState.uploadedFile = file;
    showFilePreview(file);
    elements.analyzeBtn.disabled = false;
}

function showFilePreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        elements.previewMedia.innerHTML = '';
        
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = e.target.result;
            elements.previewMedia.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = e.target.result;
            video.controls = true;
            elements.previewMedia.appendChild(video);
        }
        
        elements.fileName.textContent = file.name;
        elements.fileSize.textContent = formatFileSize(file.size);
        elements.filePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function handleLocationInput(e) {
    appState.semanticFilter = e.target.value;
}

// New search functionality
function handleNewSearch() {
    // Reset all application state
    appState.uploadedFile = null;
    appState.semanticFilter = '';
    appState.matchResults = [];
    appState.selectedMatch = null;
    appState.processingProgress = 0;
    appState.filteredResults = [];
    appState.locationRestricted = false;
    appState.restrictedLocationName = '';
    
    // Clear map if it exists
    if (appState.map) {
        appState.markers.forEach(marker => appState.map.removeLayer(marker));
        appState.markers = [];
    }
    
    // Close any open modals
    closePrototypeDemoModal();
    closeNoResultsModal();
    
    // Return to upload view
    showView('upload');
}

// Analysis processing
function handleAnalyze() {
    if (!appState.uploadedFile) return;
    
    showView('processing');
    simulateProcessing();
}

function simulateProcessing() {
    let progress = 0;
    let messageIndex = 0;
    
    // Determine which set of messages to use
    const messages = appState.semanticFilter.trim() ? processingMessages.with_filter : processingMessages.no_filter;
    
    // Add location restriction info if filter is provided
    if (appState.semanticFilter.trim()) {
        const processingContainer = elements.processingMessage.parentNode;
        let locationInfo = processingContainer.querySelector('.processing-location-info');
        if (!locationInfo) {
            locationInfo = document.createElement('div');
            locationInfo.className = 'processing-location-info';
            processingContainer.appendChild(locationInfo);
        }
        locationInfo.innerHTML = `<p>Restricting search to: ${appState.semanticFilter}</p>`;
    }
    
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random increment between 5-20
        if (progress > 100) progress = 100;
        
        // Update progress bar
        elements.progressFill.style.width = `${progress}%`;
        elements.progressText.textContent = `${Math.round(progress)}%`;
        
        // Update message based on progress
        for (let i = 0; i < messages.length; i++) {
            if (progress >= messages[i].stage && i > messageIndex) {
                elements.processingMessage.textContent = messages[i].message;
                messageIndex = i;
                break;
            }
        }
        
        // Complete processing
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                showResults();
            }, 500);
        }
    }, 200);
}

// Location-based filtering logic
function filterMatchesByLocation(semanticFilter) {
    const filter = semanticFilter.toLowerCase().trim();
    
    if (filter.includes('hannover') || filter.includes('hanover')) {
        appState.locationRestricted = true;
        appState.restrictedLocationName = 'Hannover, Germany';
        return hannoverMatches;
    } else if (filter === '') {
        appState.locationRestricted = false;
        appState.restrictedLocationName = '';
        return globalMatches;
    } else {
        // Other location entered - no data available
        return [];
    }
}

// Results display
function showResults() {
    const filteredMatches = filterMatchesByLocation(appState.semanticFilter);
    
    if (filteredMatches.length === 0 && appState.semanticFilter.trim() !== '') {
        // Show no results modal
        showNoResultsModal(appState.semanticFilter.trim());
        return;
    }
    
    appState.matchResults = filteredMatches;
    appState.filteredResults = [...appState.matchResults];
    
    showView('results');
    updateLocationRestrictionInfo();
    initializeMap();
    renderResults();
    applyFilters();
}

// Update location restriction info
function updateLocationRestrictionInfo() {
    if (appState.locationRestricted && appState.restrictedLocationName) {
        elements.locationRestriction.textContent = `Results restricted to: ${appState.restrictedLocationName}`;
        elements.locationRestriction.classList.remove('hidden');
    } else {
        elements.locationRestriction.classList.add('hidden');
    }
}

function initializeMap() {
    if (appState.map) {
        appState.map.remove();
    }
    
    appState.map = L.map('map').setView([20, 0], 2);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(appState.map);
    
    addMarkersToMap();
}

function addMarkersToMap() {
    // Clear existing markers
    appState.markers.forEach(marker => appState.map.removeLayer(marker));
    appState.markers = [];
    
    appState.filteredResults.forEach((match, index) => {
        const marker = createCustomMarker(match, index + 1);
        marker.addTo(appState.map);
        appState.markers.push(marker);
        
        // Add popup
        const popupContent = createPopupContent(match);
        marker.bindPopup(popupContent);
        
        // Add click handler for result card focus
        marker.on('click', () => {
            scrollToResultCard(match.id);
        });
    });
    
    // Fit map to show all markers
    if (appState.markers.length > 0) {
        const group = new L.featureGroup(appState.markers);
        if (appState.locationRestricted) {
            // For Hannover, center more tightly
            appState.map.fitBounds(group.getBounds().pad(0.05));
        } else {
            // For global results, use more padding
            appState.map.fitBounds(group.getBounds().pad(0.1));
        }
    }
}

function createCustomMarker(match, number) {
    // Use blue markers for Hannover results, color-coded for global results
    const color = appState.locationRestricted ? '#2563eb' : getSimilarityColor(match.similarity);
    const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background: ${color}; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${number}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
    
    return L.marker([match.location.lat, match.location.lng], { icon });
}

function getSimilarityColor(similarity) {
    if (similarity >= 90) return '#10b981'; // Green
    if (similarity >= 80) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
}

function createPopupContent(match) {
    return `
        <div style="min-width: 200px;">
            <div style="width: 100%; height: 100px; background: linear-gradient(45deg, #60a5fa 0%, #34d399 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; font-weight: 500; color: white;">
                ${match.location.name}
            </div>
            <h4 style="margin: 0 0 4px 0; font-size: 14px;">${match.location.name}</h4>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">${match.location.address}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 600; color: #10b981;">${match.similarity}% match</span>
                <button onclick="openImageModal(${match.id})" style="background: #2563eb; color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 12px; cursor: pointer;">View Full</button>
            </div>
        </div>
    `;
}

function renderResults() {
    elements.resultsList.innerHTML = '';
    
    appState.filteredResults.forEach((match, index) => {
        const resultCard = createResultCard(match, index + 1);
        elements.resultsList.appendChild(resultCard);
    });
    
    updateResultsTitle();
}

function createResultCard(match, displayRank) {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
        <div class="result-card-content">
            <div class="result-header">
                <div class="result-rank">${displayRank}</div>
                <div class="result-similarity">${match.similarity}%</div>
            </div>
            <div class="result-thumbnail" onclick="openImageModal(${match.id})">
                ${match.location.name}
            </div>
            <div class="result-location">
                <h4>${match.location.name}</h4>
                <p class="result-address">${match.location.address}</p>
            </div>
            <div class="result-similarity-bar">
                <div class="similarity-fill ${getSimilarityClass(match.similarity)}" style="width: ${match.similarity}%;"></div>
            </div>
            <div class="result-actions">
                <button class="btn btn--secondary btn-small" onclick="focusOnMap(${match.id})">View on Map</button>
                <button class="btn btn--primary btn-small" onclick="openImageModal(${match.id})">View Image</button>
            </div>
        </div>
    `;
    
    return card;
}

function getSimilarityClass(similarity) {
    if (similarity >= 90) return 'similarity-high';
    if (similarity >= 80) return 'similarity-medium';
    return 'similarity-low';
}

// Modal functionality for prototype demo
function showPrototypeDemoModal() {
    elements.prototypeDemoModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closePrototypeDemoModal() {
    elements.prototypeDemoModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Modal functionality for no results
function showNoResultsModal(location) {
    elements.noResultsLocation.textContent = `No matches found for '${location}'`;
    elements.noResultsModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeNoResultsModal() {
    elements.noResultsModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Global functions for onclick handlers
window.openImageModal = function(matchId) {
    const match = appState.matchResults.find(m => m.id === matchId);
    if (match) {
        appState.selectedMatch = match;
        showImageModal(match);
    }
};

window.focusOnMap = function(matchId) {
    const match = appState.filteredResults.find(m => m.id === matchId);
    if (match) {
        appState.map.setView([match.location.lat, match.location.lng], 12);
        // Open popup for this marker
        const markerIndex = appState.filteredResults.findIndex(m => m.id === matchId);
        if (appState.markers[markerIndex]) {
            appState.markers[markerIndex].openPopup();
        }
    }
};

// Filtering
function handleSimilarityFilter(e) {
    const minSimilarity = parseInt(e.target.value);
    elements.similarityValue.textContent = minSimilarity;
    applyFilters();
}

function applyFilters() {
    const minSimilarity = parseInt(elements.similaritySlider.value);
    
    appState.filteredResults = appState.matchResults.filter(match => 
        match.similarity >= minSimilarity
    );
    
    renderResults();
    addMarkersToMap();
}

function updateResultsTitle() {
    const count = appState.filteredResults.length;
    elements.resultsTitle.textContent = `Found ${count} similar location${count !== 1 ? 's' : ''}`;
}

// Modal functionality
function showImageModal(match) {
    elements.modalImage.innerHTML = `
        <div style="width: 100%; height: 100%; background: linear-gradient(45deg, #3b82f6 0%, #10b981 100%); display: flex; align-items: center; justify-content: center; font-weight: 500; color: white; font-size: 18px;">
            Street View: ${match.location.name}
        </div>
    `;
    
    elements.modalLocation.textContent = match.location.name;
    elements.modalSimilarity.textContent = `${match.similarity}% Match`;
    elements.modalDate.textContent = `Captured: ${match.capturedDate}`;
    elements.modalPhotographer.textContent = `By: ${match.photographer}`;
    elements.modalCoordinates.textContent = `${match.location.lat.toFixed(4)}, ${match.location.lng.toFixed(4)}`;
    
    elements.imageModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    elements.imageModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function navigateModal(direction) {
    if (!appState.selectedMatch) return;
    
    const currentIndex = appState.filteredResults.findIndex(m => m.id === appState.selectedMatch.id);
    let newIndex = currentIndex + direction;
    
    if (newIndex < 0) newIndex = appState.filteredResults.length - 1;
    if (newIndex >= appState.filteredResults.length) newIndex = 0;
    
    const newMatch = appState.filteredResults[newIndex];
    appState.selectedMatch = newMatch;
    showImageModal(newMatch);
}

// Helper functions
function scrollToResultCard(matchId) {
    const cards = elements.resultsList.querySelectorAll('.result-card');
    const matchIndex = appState.filteredResults.findIndex(m => m.id === matchId);
    if (matchIndex >= 0 && cards[matchIndex]) {
        cards[matchIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        cards[matchIndex].style.transform = 'translateY(-2px)';
        setTimeout(() => {
            cards[matchIndex].style.transform = '';
        }, 300);
    }
}

function showView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected view
    const targetView = document.getElementById(`${viewName}View`);
    if (targetView) {
        targetView.classList.add('active');
    }
    
    appState.currentView = viewName;
    
    // Reset form if going back to upload
    if (viewName === 'upload') {
        resetUploadForm();
    }
}

function resetUploadForm() {
    appState.uploadedFile = null;
    appState.semanticFilter = '';
    appState.locationRestricted = false;
    appState.restrictedLocationName = '';
    elements.fileInput.value = '';
    elements.locationInput.value = '';
    elements.filePreview.classList.add('hidden');
    elements.analyzeBtn.disabled = true;
    elements.progressFill.style.width = '0%';
    elements.progressText.textContent = '0%';
    elements.processingMessage.textContent = 'Preparing analysis...';
    
    // Remove any processing location info
    const locationInfo = document.querySelector('.processing-location-info');
    if (locationInfo) {
        locationInfo.remove();
    }
}

function toggleInfoPanel() {
    elements.infoPanel.classList.toggle('active');
}

function handleKeyPress(e) {
    if (e.key === 'Escape') {
        if (!elements.imageModal.classList.contains('hidden')) {
            closeModal();
        } else if (!elements.prototypeDemoModal.classList.contains('hidden')) {
            closePrototypeDemoModal();
        } else if (!elements.noResultsModal.classList.contains('hidden')) {
            closeNoResultsModal();
        } else if (elements.infoPanel && elements.infoPanel.classList.contains('active')) {
            toggleInfoPanel();
        }
    }
    
    if (!elements.imageModal.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') {
            navigateModal(-1);
        } else if (e.key === 'ArrowRight') {
            navigateModal(1);
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);