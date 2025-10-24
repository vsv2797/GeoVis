# Visual Geographic Match - Web Application v3.0
## Interactive Visual Similarity Search for Geographic Locations

[![Python](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green.svg)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-production-brightgreen.svg)]()

---

## 🎯 Overview

**Visual Geographic Match** is an AI-powered web application that finds visually similar geographic locations using deep learning and street-level imagery. Upload a photo of a location, and the system will search through thousands of Mapillary street-view images to find the most similar places, displaying results on an interactive map.

### Key Features

✅ **AI-Powered Scene Detection** - CLIP model classifies scene types (gardens, squares, churches, etc.)  
✅ **Visual Similarity Search** - Deep learning embeddings match visual content  
✅ **Real Street-View Images** - Integration with Mapillary API  
✅ **Interactive Leaflet Map** - View results with OpenStreetMap visualization  
✅ **Spatial Filtering** - Search by location and radius  
✅ **Real-Time Processing** - Live progress tracking and feedback  

---

## 🎬 Demo

### How It Works

1. **Upload Image** → Drag and drop or select an image file
2. **Enter Location** → Specify search area (e.g., "Hannover, Germany")
3. **Configure Options** → Set search radius and similarity threshold
4. **Analyze** → System detects scene type and searches Mapillary database
5. **View Results** → Interactive map shows ranked matches with similarity scores
6. **Explore** → Click markers or thumbnails to view full images

### Example Use Cases

- 🏛️ **Find Similar Architecture** - Upload a church photo, find similar religious buildings
- 🌳 **Discover Similar Parks** - Match garden scenes with other green spaces
- 🏙️ **Urban Planning** - Compare city squares and public spaces
- 📸 **Photo Geolocation** - Identify possible locations from unknown photos
- 🎓 **Academic Research** - Study visual similarity in geographic contexts

---

## 🏗️ Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                      Web Browser (User)                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │          Frontend (HTML/JS/Leaflet.js)                 │ │
│  │  - Image upload & preview                              │ │
│  │  - Interactive map visualization                       │ │
│  │  - Result cards & modals                               │ │
│  └────────────────────────────────────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP/REST API
┌───────────────────────────▼─────────────────────────────────┐
│               Backend (Python FastAPI)                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Scene Detector (CLIP)    Feature Extractor (CLIP)    │ │
│  │         ↓                         ↓                     │ │
│  │  Mapillary Client  ←→  Geocoding Service             │ │
│  └────────────────────────────────────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│              External APIs & Services                        │
│  ┌────────────────────┐  ┌──────────────────────────────┐  │
│  │  Mapillary API     │  │  Nominatim (OpenStreetMap)   │  │
│  │  - Street images   │  │  - Geocoding                 │  │
│  │  - Metadata        │  │  - Reverse geocoding         │  │
│  └────────────────────┘  └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- HTML5 & CSS3
- Vanilla JavaScript (ES6+)
- Leaflet.js (map visualization)
- OpenStreetMap tiles

**Backend:**
- Python 3.10+
- FastAPI (web framework)
- PyTorch & Transformers (CLIP model)
- Geopy (geocoding)
- Pillow & OpenCV (image processing)

**APIs:**
- Mapillary Graph API (street-view images)
- Nominatim/OpenStreetMap (geocoding)

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.10 or higher**
- **8GB RAM** (16GB recommended)
- **Internet connection** (for API access)
- **Mapillary API token** (free registration)

### Installation (15 minutes)

#### 1. Clone or Extract Project

```bash
cd visual-geo-match
```

#### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Mac/Linux
# OR
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt
```

#### 3. Get Mapillary API Token

1. Go to https://www.mapillary.com
2. Sign up or log in (free)
3. Navigate to **Dashboard** → **Developers**
4. Click **"Register Application"**
5. Fill in application details:
   - **Name**: Visual Geo Match
   - **Description**: Master's thesis project
6. Copy the **Client Token** (format: `MLY|xxxxx|xxxxx`)

#### 4. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env file
nano .env  # or your preferred editor
```

Add your Mapillary token:
```
MAPILLARY_TOKEN=MLY|your_actual_token_here
USE_GPU=false
HOST=0.0.0.0
PORT=8000
```

#### 5. Download AI Models (First Run)

```bash
python -c "from transformers import CLIPModel, CLIPProcessor; CLIPModel.from_pretrained('openai/clip-vit-base-patch32'); CLIPProcessor.from_pretrained('openai/clip-vit-base-patch32'); print('✅ Models downloaded!')"
```

**Note:** Downloads ~350MB on first run

#### 6. Start Backend Server

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

**Expected output:**
```
INFO:     Loading CLIP models...
INFO:     Models loaded successfully!
INFO:     Uvicorn running on http://0.0.0.0:8000
```

#### 7. Launch Frontend

**Option A: Direct Open**
```bash
cd ../frontend
open index.html  # Mac
# OR double-click index.html in file explorer
```

**Option B: HTTP Server (Recommended)**
```bash
cd ../frontend
python -m http.server 3000
# Open: http://localhost:3000
```

---

## 📖 User Guide

### Uploading an Image

1. **Drag and Drop**: Drag image file onto upload area
2. **Click to Browse**: Click "Choose File" button
3. **Supported Formats**: JPG, PNG, JPEG
4. **Max Size**: 10MB recommended

### Configuring Search

**Location (Required):**
- Enter city, address, or place name
- Examples: "Hannover, Germany", "Berlin", "Paris, France"

**Advanced Options:**
- **Search Radius**: 1-20 km (default: 5 km)
- **Min Similarity**: 50-95% (default: 70%)
- **Max Results**: 5-50 (default: 10)

### Understanding Results

**Similarity Score:**
- **90-100%** (Green): Very high similarity
- **80-89%** (Yellow-Green): High similarity
- **70-79%** (Orange): Moderate similarity
- **50-69%** (Red): Low similarity

**Result Cards Show:**
- Rank number (#1, #2, etc.)
- Similarity percentage with visual bar
- Location name and address
- GPS coordinates
- Capture date
- Distance from query location

**Interactive Map:**
- Numbered markers for each result
- Color-coded by similarity score
- Click marker → popup with thumbnail
- Click thumbnail → full-screen image
- Auto-zoom to fit all results

### Viewing Images

**Full-Screen Modal:**
- Click any thumbnail or "View Image" button
- Navigate with arrow keys or on-screen arrows
- Press ESC or click X to close
- Shows complete metadata

---

## 🔬 How It Works

### Processing Pipeline

**Step 1: Scene Detection (200ms)**
```
User Image → CLIP Model → Scene Classification
Result: "garden" (91% confidence)
```

**Step 2: Spatial Query (500ms)**
```
Location Input → Geocoding → Bounding Box
Result: 52.37°N, 9.73°E ± 5km
```

**Step 3: Image Retrieval (2s)**
```
Mapillary API Query → Filter by Bbox → Download Metadata
Result: 85 street-view images found
```

**Step 4: Feature Extraction (15-30s)**
```
For each image:
  Download → CLIP Encoding → 512-dim Embedding
Result: Vector representations of all images
```

**Step 5: Similarity Computation (1s)**
```
Query Embedding ⊗ Candidate Embeddings → Cosine Similarity
Result: Ranked list with similarity scores
```

**Step 6: Geocoding & Display (500ms)**
```
Coordinates → Reverse Geocode → Location Names
Result: Formatted results with addresses
```

**Total Time:** ~20-35 seconds per query

### AI Models

**CLIP (Contrastive Language-Image Pre-training)**
- **Model**: openai/clip-vit-base-patch32
- **Architecture**: Vision Transformer
- **Embedding Size**: 512 dimensions
- **Training**: 400M image-text pairs
- **Purpose**: Scene classification & visual similarity

---

## 🛠️ Configuration

### Backend Configuration

Edit `backend/config.py`:

```python
class Config:
    # Mapillary API
    MAPILLARY_TOKEN = os.getenv("MAPILLARY_TOKEN", "")
    
    # CLIP Model
    CLIP_MODEL_NAME = "openai/clip-vit-base-patch32"
    
    # Device (CPU or GPU)
    DEVICE = "cpu"  # Set to "cuda" for GPU
    
    # Scene Types
    SCENE_TYPES = {
        "garden": [...],
        "square": [...],
        "church": [...],
        # Add more as needed
    }
    
    # API Limits
    MAX_MAPILLARY_IMAGES = 100
    MAX_RESULTS_DEFAULT = 10
    DEFAULT_RADIUS_KM = 5.0
```

### Frontend Configuration

Edit `frontend/index.html` (line ~50):

```javascript
const API_BASE_URL = 'http://localhost:8000';  // Backend URL
```

For deployed backend:
```javascript
const API_BASE_URL = 'https://your-backend.herokuapp.com';
```

---

## 📊 API Documentation

### Endpoints

**GET /**
```
Returns API information and status
```

**GET /health**
```bash
curl http://localhost:8000/health

Response:
{
  "status": "healthy",
  "mapillary_token_set": true
}
```

**POST /api/match**
```bash
curl -X POST "http://localhost:8000/api/match" \
  -F "image=@photo.jpg" \
  -F "location=Hannover, Germany" \
  -F "radius_km=5" \
  -F "min_similarity=70" \
  -F "max_results=10"

Response:
{
  "matches": [
    {
      "image_id": "abc123",
      "similarity": 92.5,
      "location": {
        "name": "Herrenhausen Gardens",
        "lat": 52.3892,
        "lng": 9.6975
      },
      "image_url": "https://...",
      "captured_at": "2024-06-15",
      "scene_type": "garden"
    }
  ],
  "query_info": {
    "detected_scene": "garden",
    "scene_confidence": 91.2,
    "mapillary_images_searched": 85,
    "matches_found": 8
  }
}
```

**Interactive Documentation:**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 🧪 Testing

### Manual Testing

**Test 1: Health Check**
```bash
curl http://localhost:8000/health
```

**Test 2: Scene Detection**
```bash
curl -X POST "http://localhost:8000/api/match" \
  -F "image=@test_garden.jpg" \
  -F "location=Hannover, Germany"
```

**Test 3: Full Pipeline**
1. Open frontend in browser
2. Upload test image
3. Enter "Hannover, Germany"
4. Click "Find Similar Locations"
5. Verify results appear on map

### Test Images

Place test images in `examples/test_images/`:
- `garden.jpg` - Garden scene (should match parks)
- `square.jpg` - Urban square (should match plazas)
- `church.jpg` - Religious building (should match churches)

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: "MAPILLARY_TOKEN not set"**
```bash
# Check .env file exists
cat backend/.env

# Verify token format (should start with MLY|)
# Restart server after editing .env
```

**Problem: "Port 8000 already in use"**
```bash
# Find and kill process on port 8000
lsof -ti:8000 | xargs kill -9

# OR use different port
uvicorn app:app --port 8001
```

**Problem: "Module not found"**
```bash
# Verify virtual environment is activated
which python  # Should show venv/bin/python

# Reinstall dependencies
pip install -r requirements.txt
```

**Problem: Out of memory**
```python
# Edit backend/app.py line 150
# Reduce from [:50] to [:20]
for idx, img_data in enumerate(mapillary_images[:20]):
```

### Frontend Issues

**Problem: "Backend not available"**
- Verify backend is running: `curl http://localhost:8000/health`
- Check API_BASE_URL in frontend code
- Check browser console for errors

**Problem: CORS errors**
- Serve frontend via HTTP server (not file://)
- Backend has CORS enabled for all origins

**Problem: Images not loading**
- Check internet connection
- Verify Mapillary token is valid
- Check browser console for errors

### API Issues

**Problem: "No Mapillary images found"**
- Try different location (major cities have more coverage)
- Increase search radius
- Check Mapillary coverage: https://www.mapillary.com/app

**Problem: Rate limiting**
- Free tier: 50,000 requests/month
- Wait or upgrade Mapillary plan
- Reduce max_results parameter

---

## ⚡ Performance Optimization

### Backend

**GPU Acceleration:**
```python
# Edit config.py
DEVICE = "cuda"  # Requires NVIDIA GPU + CUDA

# Install GPU version of PyTorch
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

**Reduce Processing Time:**
```python
# app.py - Reduce images processed
for idx, img_data in enumerate(mapillary_images[:20]):  # Was [:50]
```

**Caching (Advanced):**
```python
# Add Redis caching for embeddings
# See optimized-hybrid-system.pdf for implementation
```

### Frontend

**Optimize Images:**
- Resize uploaded images before sending (max 1024px)
- Compress to JPEG quality 85%

**Lazy Loading:**
- Results load progressively
- Images load on demand

---

## 📚 Documentation

### Included Documents

1. **README.md** (this file) - Main documentation
2. **backend/README.md** - Backend API details
3. **docs/QUICKSTART.md** - Quick setup guide
4. **PACKAGE_README.txt** - ZIP package info

### Additional Resources (PDFs)

- **Architecture Guide** [239] - System design (17 pages)
- **Implementation Plan** [240] - Development roadmap (9 pages)
- **Setup Guide** [244] - Complete deployment (10 pages)
- **Optimized System** [245] - Performance optimization (12 pages)
- **Backend Guide** [256] - Detailed backend setup (16 pages)

---

## 🎓 Academic Context

### Master's Thesis Project

**Institution:** Leibniz University Hannover  
**Program:** M.Sc. Geodesy and Geoinformatics  
**Focus Area:** Remote Sensing & Geoinformatics  
**Year:** 2025  

### Research Contributions

1. **Visual Similarity in Geographic Context**
   - Novel application of CLIP for location matching
   - Integration of computer vision with geospatial data

2. **Open Data Integration**
   - Mapillary street-level imagery
   - OpenStreetMap geocoding

3. **Real-Time Processing Pipeline**
   - Efficient workflow for image retrieval
   - Spatial filtering and vector similarity

4. **Interactive Visualization**
   - User-friendly web interface
   - Map-based result presentation

### Publications & Presentations

**Thesis Defense:** [Date TBD]  
**GitHub Repository:** https://github.com/[username]/visual-geo-match  
**Demo Video:** [Link TBD]  

---

## 🤝 Contributing

This is an academic project. For suggestions or issues:

1. Open an issue on GitHub
2. Provide detailed description
3. Include screenshots/logs if applicable

---

## 📝 License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

---

## 🙏 Acknowledgments

### Technologies
- **OpenAI CLIP** - Visual-semantic embeddings
- **Mapillary** - Street-level imagery database
- **OpenStreetMap** - Geographic data and geocoding
- **FastAPI** - Modern Python web framework
- **Leaflet.js** - Interactive map library

### Institution
- **Leibniz University Hannover** - Academic support
- **Institute of Geodesy** - Research facilities
- **Geoinformatics Department** - Guidance and resources

### Open Source Community
- PyTorch and Hugging Face teams
- OpenStreetMap contributors
- Mapillary community

---

## 📧 Contact & Support

**For Technical Issues:**
- Check documentation in `docs/` folder
- Read troubleshooting section above
- Open GitHub issue

**For Academic Inquiries:**
- Contact: [Your email]
- Institution: Leibniz University Hannover
- Program: M.Sc. Geodesy and Geoinformatics

---

## 📈 Project Status

**Version:** 3.0 (Production Release)  
**Status:** ✅ Active Development  
**Last Updated:** October 2025  

### Roadmap

- [x] Core functionality (CLIP + Mapillary)
- [x] Interactive web interface
- [x] Real-time processing
- [x] Documentation
- [ ] Video upload support
- [ ] Batch processing
- [ ] Mobile app version
- [ ] Database caching (optimized version)

---

## 🌟 Features Highlight

| Feature | Status | Description |
|---------|--------|-------------|
| Scene Detection | ✅ Working | CLIP-based classification |
| Visual Similarity | ✅ Working | Embedding-based matching |
| Mapillary Integration | ✅ Working | Real street-view images |
| Interactive Map | ✅ Working | Leaflet with OSM tiles |
| Geocoding | ✅ Working | Nominatim integration |
| Real-time Progress | ✅ Working | Live status updates |
| Responsive Design | ✅ Working | Mobile-friendly UI |
| API Documentation | ✅ Working | Swagger UI at /docs |
| Error Handling | ✅ Working | Graceful failure modes |
| GPU Support | ⚠️ Optional | CUDA acceleration |

---

**Built with ❤️ for geoinformatics research**

*Visual Geographic Match v3.0 - Powered by AI and Open Data*
