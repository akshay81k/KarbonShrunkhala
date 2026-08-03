import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import * as turf from "@turf/turf";
import {
  Search,
  Upload,
  RotateCcw,
  Check,
  Maximize2,
  Trash2,
  Edit3,
  FileCode,
  MapPin,
  Loader2,
  Sparkles,
} from "lucide-react";

/**
 * MapBoundarySelector — Interactive Satellite Map & Boundary Selection Tool
 *
 * Features:
 * - Esri World Imagery High-Res Satellite Base Layer
 * - OpenStreetMap Nominatim Location Search Bar
 * - GeoJSON Upload & Map Rendering
 * - Leaflet Geoman Interactive Drawing, Vertex Editing, Resizing & Dragging
 * - Automatic Turf.js Area Calculation in Hectares
 * - Clean modern toolbar matching KarbonShrunkhala design
 */
export function MapBoundarySelector({ initialGeoJSON, onBoundaryChange, onAreaChange }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const drawnItemsRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [calculatedArea, setCalculatedArea] = useState(0);
  const [boundaryGeoJSON, setBoundaryGeoJSON] = useState(initialGeoJSON || null);
  const [isEditing, setIsEditing] = useState(false);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Default center: Sundarbans Delta, West Bengal (21.94, 88.9)
    const map = L.map(mapContainerRef.current, {
      center: [21.94, 88.9],
      zoom: 11,
      zoomControl: false,
    });

    // Add Esri World Imagery Satellite Tile Layer
    const satelliteLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        maxZoom: 18,
      }
    ).addTo(map);

    // Add Reference Label Overlay Layer
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 18 }
    ).addTo(map);

    // Add Zoom Control to Top-Right
    L.control.zoom({ position: "topright" }).addTo(map);

    // FeatureGroup to store drawn layer
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    drawnItemsRef.current = drawnItems;
    mapRef.current = map;

    // Initialize Leaflet Geoman Drawing Controls
    map.pm.addControls({
      position: "topleft",
      drawMarker: false,
      drawCircleMarker: false,
      drawPolyline: false,
      drawRectangle: true,
      drawPolygon: true,
      drawCircle: false,
      editMode: true,
      dragMode: true,
      cutPolygon: false,
      removalMode: true,
    });

    // Set styling for drawn polygons
    map.pm.setGlobalOptions({
      pathOptions: {
        color: "#22A06B",
        fillColor: "#22A06B",
        fillOpacity: 0.35,
        weight: 3,
      },
    });

    // Handle Create Event (when user finishes drawing polygon)
    map.on("pm:create", (e) => {
      drawnItems.clearLayers(); // Keep single primary boundary polygon
      const layer = e.layer;
      drawnItems.addLayer(layer);
      updateBoundaryFromLayers(drawnItems);
    });

    // Handle Edit/Remove/Drag events
    map.on("pm:remove", () => {
      updateBoundaryFromLayers(drawnItems);
    });

    map.on("pm:globaleditmodetoggled", (e) => {
      setIsEditing(e.enabled);
      if (!e.enabled) {
        updateBoundaryFromLayers(drawnItems);
      }
    });

    // If initial GeoJSON is provided, render it on map
    if (initialGeoJSON) {
      renderGeoJSONOnMap(initialGeoJSON, map, drawnItems);
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update GeoJSON state & area calculation from drawn layers
  const updateBoundaryFromLayers = (drawnItems) => {
    const geojson = drawnItems.toGeoJSON();

    if (!geojson || !geojson.features || geojson.features.length === 0) {
      setBoundaryGeoJSON(null);
      setCalculatedArea(0);
      if (onBoundaryChange) onBoundaryChange(null);
      if (onAreaChange) onAreaChange(0);
      return;
    }

    setBoundaryGeoJSON(geojson);
    if (onBoundaryChange) onBoundaryChange(geojson);

    // Calculate Area in Hectares using Turf.js
    try {
      const areaInSqMeters = turf.area(geojson);
      const areaInHectares = parseFloat((areaInSqMeters / 10000).toFixed(2));
      setCalculatedArea(areaInHectares);
      if (onAreaChange) onAreaChange(areaInHectares);
    } catch (err) {
      console.warn("Turf area calculation error:", err);
    }
  };

  // Render GeoJSON object on map
  const renderGeoJSONOnMap = (geojson, map = mapRef.current, drawnItems = drawnItemsRef.current) => {
    if (!map || !drawnItems) return;
    drawnItems.clearLayers();

    try {
      const geoLayer = L.geoJSON(geojson, {
        style: {
          color: "#22A06B",
          fillColor: "#22A06B",
          fillOpacity: 0.35,
          weight: 3,
        },
      });

      geoLayer.eachLayer((layer) => {
        drawnItems.addLayer(layer);
      });

      map.fitBounds(drawnItems.getBounds(), { padding: [50, 50] });
      updateBoundaryFromLayers(drawnItems);
    } catch (err) {
      console.error("Failed to render GeoJSON on map:", err);
    }
  };

  // Handle GeoJSON File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        renderGeoJSONOnMap(parsed);
      } catch (err) {
        alert("Invalid GeoJSON file format. Please upload a valid JSON/GeoJSON file.");
      }
    };
    reader.readAsText(file);
  };

  // Handle Location Search (Nominatim)
  const handleSearch = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery + ", India"
        )}`
      );
      const data = await res.json();
      setSearchResults(data);

      if (data && data.length > 0) {
        const first = data[0];
        const lat = parseFloat(first.lat);
        const lon = parseFloat(first.lon);

        if (mapRef.current) {
          mapRef.current.setView([lat, lon], 13);
        }
      }
    } catch (err) {
      console.error("Location search failed:", err);
    } finally {
      setSearching(false);
    }
  };

  // Handle Reset / Clear Boundary
  const handleReset = () => {
    if (drawnItemsRef.current) {
      drawnItemsRef.current.clearLayers();
    }
    setBoundaryGeoJSON(null);
    setCalculatedArea(0);
    if (onBoundaryChange) onBoundaryChange(null);
    if (onAreaChange) onAreaChange(0);
  };

  // Enable/Disable Draw Mode
  const toggleDrawMode = () => {
    if (!mapRef.current) return;
    if (mapRef.current.pm.globalDrawModeEnabled()) {
      mapRef.current.pm.disableDraw();
    } else {
      mapRef.current.pm.enableDraw("Polygon", {
        snappingOption: true,
      });
    }
  };

  // Enable/Disable Edit Mode
  const toggleEditMode = () => {
    if (!mapRef.current) return;
    mapRef.current.pm.toggleGlobalEditMode();
  };

  return (
    <div className="space-y-3">
      
      {/* Top Bar: Search Bar & Area Indicator Badge */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full sm:w-96 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:border-emerald-600 focus-within:bg-white transition">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search district, bay, or wetland (e.g. Pichavaram, Sundarbans)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch(e);
              }
            }}
            className="w-full bg-transparent border-none outline-none text-xs text-slate-800"
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={searching}
            className="px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-bold hover:bg-slate-800 transition cursor-pointer"
          >
            {searching ? <Loader2 className="w-3 h-3 animate-spin" /> : "Search"}
          </button>
        </div>

        {/* Calculated Area Indicator Badge */}
        <div className="flex items-center gap-2 text-xs font-bold">
          <div className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Calculated Area:</span>
            <span className="font-heading text-sm font-extrabold text-emerald-700 font-mono">
              {calculatedArea > 0 ? `${calculatedArea} Ha` : "0.00 Ha"}
            </span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        
        {/* Leaflet Map Target */}
        <div ref={mapContainerRef} className="w-full h-[420px] z-10" />

        {/* Floating Custom Action Toolbar (Bottom Center) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-slate-900/90 backdrop-blur-md text-white px-3 py-2 rounded-2xl border border-slate-700 shadow-2xl flex items-center gap-2">
          
          <button
            type="button"
            onClick={toggleDrawMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Draw Boundary
          </button>

          <button
            type="button"
            onClick={toggleEditMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              isEditing ? "bg-amber-500 text-slate-950 font-extrabold" : "bg-slate-800 hover:bg-slate-700 text-slate-200"
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            {isEditing ? "Done Editing" : "Edit Vertices"}
          </button>

          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            Upload GeoJSON
            <input
              type="file"
              accept=".json,.geojson"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <div className="w-px h-5 bg-slate-700" />

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-rose-500/20 text-rose-400 text-xs font-bold transition cursor-pointer"
            title="Reset Boundary"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
