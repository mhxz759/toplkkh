"use client";

import { useState, useEffect, useCallback } from "react";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  city: string | null;
  state: string | null;
  loading: boolean;
  error: string | null;
  permissionStatus: "granted" | "denied" | "prompt" | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    address: null,
    city: null,
    state: null,
    loading: false,
    error: null,
    permissionStatus: null,
  });

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
          headers: {
            "Accept-Language": "pt-BR",
          },
        }
      );
      const data = await response.json();
      
      if (data.address) {
        const address = data.display_name;
        const city = data.address.city || data.address.town || data.address.village || data.address.municipality;
        const stateData = data.address.state;
        
        setState((prev) => ({
          ...prev,
          address,
          city,
          state: stateData,
        }));
        
        return { address, city, state: stateData };
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
    return null;
  }, []);

  const requestLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "Geolocalização não suportada pelo navegador",
        loading: false,
      }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const permission = await navigator.permissions.query({ name: "geolocation" });
      setState((prev) => ({ ...prev, permissionStatus: permission.state as "granted" | "denied" | "prompt" }));

      if (permission.state === "denied") {
        setState((prev) => ({
          ...prev,
          error: "Permissão de localização negada. Habilite nas configurações do navegador.",
          loading: false,
        }));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setState((prev) => ({
            ...prev,
            latitude,
            longitude,
            loading: false,
            permissionStatus: "granted",
          }));
          
          await reverseGeocode(latitude, longitude);
        },
        (error) => {
          let errorMessage = "Erro ao obter localização";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Permissão de localização negada";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Localização indisponível";
              break;
            case error.TIMEOUT:
              errorMessage = "Tempo esgotado ao obter localização";
              break;
          }
          setState((prev) => ({
            ...prev,
            error: errorMessage,
            loading: false,
            permissionStatus: error.code === error.PERMISSION_DENIED ? "denied" : prev.permissionStatus,
          }));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Erro ao solicitar permissão de localização",
        loading: false,
      }));
    }
  }, [reverseGeocode]);

  useEffect(() => {
    // Check permission status on mount
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setState((prev) => ({ ...prev, permissionStatus: result.state as "granted" | "denied" | "prompt" }));
        
        // Auto-request if already granted
        if (result.state === "granted") {
          requestLocation();
        }
      });
    }
  }, [requestLocation]);

  return {
    ...state,
    requestLocation,
  };
}
