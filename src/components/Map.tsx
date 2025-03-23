'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Define marker icon options
const markerIconOptions: L.IconOptions = {
  iconUrl: '/marker.svg',
  iconSize: [32, 32] as L.PointTuple,
  iconAnchor: [16, 32] as L.PointTuple,
  popupAnchor: [0, -32] as L.PointTuple,
  // Add fallback icon in case SVG fails to load
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41] as L.PointTuple,
  shadowAnchor: [12, 41] as L.PointTuple
}

export interface MarkerData {
  id: string
  title: string
  location: [number, number]
  articles: Array<{
    title: string
    url: string
    source: string
    date: string
  }>
  externalSources: Array<{
    title: string
    url: string
    source: string
    biasRating?: 'left' | 'center-left' | 'center' | 'center-right' | 'right'
  }>
  socialMedia: Array<{
    platform: string
    handle: string
    url: string
  }>
}

interface MapProps {
  markers: MarkerData[]
  onMarkerClick: (marker: MarkerData) => void
}

export default function Map({ markers, onMarkerClick }: MapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        minZoom: 2,
        maxZoom: 8,
        maxBounds: [[-90, -180], [90, 180]],
        maxBoundsViscosity: 1.0,
        worldCopyJump: true,
        zoomControl: false,
        scrollWheelZoom: 'center', // Center-based zoom with trackpad
        zoomSnap: 0.1, // Smaller snap intervals
        zoomDelta: 0.1, // Smaller zoom steps
        wheelDebounceTime: 100, // Debounce time for smoother zooming
        wheelPxPerZoomLevel: 60, // More sensitive zoom
        center: [20, 0],
        zoom: 2.5
      })

      // Add zoom control to top-right
      L.control.zoom({
        position: 'topright',
        zoomInTitle: 'Zoom in',
        zoomOutTitle: 'Zoom out'
      }).addTo(mapRef.current)

      // Use a custom tile layer with minimal styling
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 8,
        minZoom: 2,
        attribution: '',
        noWrap: true,
        bounds: [[-90, -180], [90, 180]]
      }).addTo(mapRef.current)

      // Fit map to window size
      const fitMapToWindow = () => {
        if (!mapRef.current) return
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const aspectRatio = windowWidth / windowHeight
        let zoom = 2.5

        // Adjust zoom based on screen size and aspect ratio
        if (aspectRatio > 1.8) {
          zoom = 2.7
        } else if (aspectRatio < 1.2) {
          zoom = 2.3
        }

        mapRef.current.setView([20, 0], zoom, { animate: false })
      }

      // Initial fit
      fitMapToWindow()

      // Add event listeners for resize
      window.addEventListener('resize', fitMapToWindow)
      const resizeObserver = new ResizeObserver(() => {
        mapRef.current?.invalidateSize()
        fitMapToWindow()
      })
      
      const mapContainer = document.getElementById('map')
      if (mapContainer) {
        resizeObserver.observe(mapContainer)
      }

      // Cleanup resize listener
      return () => {
        window.removeEventListener('resize', fitMapToWindow)
      }
    }

    // Create marker icon instance
    const markerIcon = L.icon(markerIconOptions)

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Add new markers
    markers.forEach(markerData => {
      const marker = L.marker(markerData.location, { 
        icon: markerIcon,
        title: markerData.title
      })
        .addTo(mapRef.current!)
        .on('click', () => {
          // Calculate offset to account for side panel
          const map = mapRef.current!
          const point = map.latLngToContainerPoint(markerData.location)
          const newPoint = L.point(point.x - 192, point.y) // Offset by half the side panel width
          const newLatLng = map.containerPointToLatLng(newPoint)
          
          // Zoom to marker with offset
          map.flyTo(newLatLng, 7, {
            duration: 1,
            easeLinearity: 0.25
          })
          
          onMarkerClick(markerData)
        })
      markersRef.current.push(marker)
    })

    return () => {
      markersRef.current.forEach(marker => marker.remove())
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [markers, onMarkerClick])

  return (
    <>
      <style jsx global>{`
        .leaflet-container {
          background: #f8f9fa;
          width: 100vw;
          height: 100vh;
        }
        .leaflet-control-attribution {
          display: none;
        }
        #map {
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
        }
        /* Improve zoom controls */
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        }
        .leaflet-control-zoom-in,
        .leaflet-control-zoom-out {
          border: none !important;
          background: white !important;
          color: #2B2B3C !important;
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
          font-size: 18px !important;
          transition: all 0.2s !important;
        }
        .leaflet-control-zoom-in:hover,
        .leaflet-control-zoom-out:hover {
          background: #2B2B3C !important;
          color: white !important;
        }
        /* Style marker tooltips */
        .leaflet-tooltip {
          background: rgba(43, 43, 60, 0.9);
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }
        .leaflet-tooltip-top:before {
          border-top-color: rgba(43, 43, 60, 0.9);
        }
      `}</style>
      <div id="map" />
    </>
  )
} 