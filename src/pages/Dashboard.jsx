import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
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
      available: { variant: 'success', text: 'Disponibile' },
      occupied: { variant: 'warning', text: 'Occupata' },
      maintenance: { variant: 'error', text: 'Manutenzione' }
    };
    
    const config = statusConfig[status] || statusConfig.available;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  if (propertiesLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-900">Le tue proprietà</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => <LoadingCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-900">Le tue proprietà</h1>
        <div className="text-sm text-gray-600">
          {properties.length} proprietà totali
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Link key={property.id} to={`/property/${property.id}`}>
            <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  {getStatusBadge(property.status)}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {property.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">{property.location}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>{property.rooms} camere</span>
                  <span>Max {property.guests} ospiti</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-900">
                    €{property.pricePerNight}/notte
                  </span>
                  <span className="text-xs text-gray-500">{property.type}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nessuna proprietà</h3>
          <p className="text-gray-600">Inizia aggiungendo la tua prima proprietà.</p>
        </div>
      )}
    </div>
  );
}