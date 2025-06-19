import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { LoadingCard } from "../components/ui/loading";
import { useStore } from "../store/useStore";
import { fetchProperties } from "../../lib/fakeApi";

export default function Dashboard() {
  const { 
    properties, 
    propertiesLoading, 
    setProperties, 
    setPropertiesLoading,
    addNotification 
  } = useStore();

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    setPropertiesLoading(true);
    try {
      const data = await fetchProperties();
      setProperties(data);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Errore',
        message: 'Impossibile caricare le proprietà'
      });
    } finally {
      setPropertiesLoading(false);
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { variant: 'success', text: 'Disponibile', icon: '✓' },
      occupied: { variant: 'warning', text: 'Occupata', icon: '👥' },
      maintenance: { variant: 'error', text: 'Manutenzione', icon: '🔧' }
    };
    
    const config = statusConfig[status] || statusConfig.available;
    return (
      <Badge variant={config.variant} className="font-semibold">
        <span className="mr-1">{config.icon}</span>
        {config.text}
      </Badge>
    );
  };

  const totalRevenue = properties.reduce((sum, prop) => sum + (prop.pricePerNight * 15), 0);
  const availableProperties = properties.filter(p => p.status === 'available').length;
  const occupiedProperties = properties.filter(p => p.status === 'occupied').length;

  if (propertiesLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded-lg w-64 mb-2"></div>
            <div className="h-4 bg-neutral-200 rounded w-48"></div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => <LoadingCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with stats */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-6 lg:space-y-0">
        <div className="animate-slide-down">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent mb-2">
            Le tue proprietà
          </h1>
          <p className="text-lg text-neutral-600">Gestisci e monitora i tuoi immobili turistici</p>
        </div>
        
        <div className="flex flex-wrap gap-4 animate-slide-down">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-2xl shadow-soft">
            <div className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</div>
            <div className="text-sm opacity-90">Ricavi mensili stimati</div>
          </div>
          <div className="bg-gradient-to-r from-success-500 to-success-600 text-white px-6 py-3 rounded-2xl shadow-soft">
            <div className="text-2xl font-bold">{availableProperties}</div>
            <div className="text-sm opacity-90">Disponibili</div>
          </div>
          <div className="bg-gradient-to-r from-warning-500 to-warning-600 text-white px-6 py-3 rounded-2xl shadow-soft">
            <div className="text-2xl font-bold">{occupiedProperties}</div>
            <div className="text-sm opacity-90">Occupate</div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-4 animate-fade-in">
        <Button variant="primary" size="lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Aggiungi Proprietà
        </Button>
        <Button variant="outline" size="lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Report Globale
        </Button>
        <Button variant="outline" size="lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 13a2 2 0 002 2h8a2 2 0 002-2L16 7" />
          </svg>
          Calendario Generale
        </Button>
      </div>

      {/* Properties grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <Link key={property.id} to={`/property/${property.id}`} className="group">
            <Card hover className="overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  {getStatusBadge(property.status)}
                </div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">Visualizza dettagli →</p>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors duration-200">
                    {property.name}
                  </h3>
                </div>
                <div className="flex items-center text-neutral-600 mt-1">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium">{property.location}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-neutral-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
                    </svg>
                    <span className="text-sm font-medium">{property.rooms} camere</span>
                  </div>
                  <div className="flex items-center text-neutral-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <span className="text-sm font-medium">{property.guests} ospiti</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                      €{property.pricePerNight}
                    </span>
                    <span className="text-neutral-500 text-sm ml-1">/notte</span>
                  </div>
                  <Badge variant="secondary" size="sm" className="font-medium">
                    {property.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">Nessuna proprietà</h3>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            Inizia aggiungendo la tua prima proprietà per gestire prenotazioni e monitorare i ricavi.
          </p>
          <Button variant="primary" size="lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Aggiungi Prima Proprietà
          </Button>
        </div>
      )}
    </div>
  );
}