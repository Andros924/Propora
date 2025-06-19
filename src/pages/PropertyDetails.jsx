import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { LoadingSpinner } from "../components/ui/loading";
import { useStore } from "../store/useStore";
import { fetchProperty, fetchBookings, updateBookingStatus } from "../../lib/fakeApi";

export default function PropertyDetails() {
  const { id } = useParams();
  const { 
    currentProperty, 
    currentPropertyBookings, 
    propertyLoading,
    setCurrentProperty, 
    setCurrentPropertyBookings, 
    setPropertyLoading,
    addNotification 
  } = useStore();

  const [updatingBooking, setUpdatingBooking] = useState(null);

  useEffect(() => {
    loadPropertyData();
  }, [id]);

  async function loadPropertyData() {
    setPropertyLoading(true);
    try {
      const [property, bookings] = await Promise.all([
        fetchProperty(id),
        fetchBookings(parseInt(id))
      ]);
      setCurrentProperty(property);
      setCurrentPropertyBookings(bookings);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Errore',
        message: 'Impossibile caricare i dati della proprietà'
      });
    } finally {
      setPropertyLoading(false);
    }
  }

  async function handleStatusUpdate(bookingId, newStatus) {
    setUpdatingBooking(bookingId);
    try {
      await updateBookingStatus(bookingId, newStatus);
      
      // Aggiorna lo stato locale
      const updatedBookings = currentPropertyBookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      );
      setCurrentPropertyBookings(updatedBookings);
      
      addNotification({
        type: 'success',
        title: 'Stato aggiornato',
        message: `Prenotazione ${newStatus === 'checked-in' ? 'check-in' : 'check-out'} completato`
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Errore',
        message: 'Impossibile aggiornare lo stato della prenotazione'
      });
    } finally {
      setUpdatingBooking(null);
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { variant: 'info', text: 'Confermata' },
      'checked-in': { variant: 'success', text: 'Check-in' },
      'checked-out': { variant: 'default', text: 'Check-out' },
      pending: { variant: 'warning', text: 'In attesa' },
      cancelled: { variant: 'error', text: 'Cancellata' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (propertyLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentProperty) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Proprietà non trovata</h2>
        <Link to="/dashboard" className="text-blue-600 hover:text-blue-500">
          Torna alla dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header proprietà */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="aspect-video relative">
          <img
            src={currentProperty.image}
            alt={currentProperty.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{currentProperty.name}</h1>
            <p className="text-lg opacity-90">{currentProperty.location}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-900">{currentProperty.rooms}</div>
              <div className="text-sm text-gray-600">Camere</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">{currentProperty.guests}</div>
              <div className="text-sm text-gray-600">Ospiti max</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">€{currentProperty.pricePerNight}</div>
              <div className="text-sm text-gray-600">Per notte</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">{currentPropertyBookings.length}</div>
              <div className="text-sm text-gray-600">Prenotazioni</div>
            </div>
          </div>
        </div>
      </div>

      {/* Azioni rapide */}
      <div className="flex flex-wrap gap-4">
        <Link to={`/report/${id}`}>
          <Button className="bg-blue-900 hover:bg-blue-800">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Visualizza Report
          </Button>
        </Link>
        <Button variant="outline">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 13a2 2 0 002 2h8a2 2 0 002-2L16 7" />
          </svg>
          Gestisci Calendario
        </Button>
      </div>

      {/* Lista prenotazioni */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Prenotazioni Attive</h2>
        </CardHeader>
        <CardContent>
          {currentPropertyBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 13a2 2 0 002 2h8a2 2 0 002-2L16 7" />
              </svg>
              Nessuna prenotazione attiva
            </div>
          ) : (
            <div className="space-y-4">
              {currentPropertyBookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.guest}</h3>
                      <p className="text-sm text-gray-600">{booking.email}</p>
                      <p className="text-sm text-gray-600">{booking.phone}</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(booking.status)}
                      <p className="text-sm font-semibold text-gray-900 mt-1">€{booking.totalPrice}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Check-in</p>
                      <p className="font-medium">{formatDate(booking.checkIn)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Check-out</p>
                      <p className="font-medium">{formatDate(booking.checkOut)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Ospiti</p>
                      <p className="font-medium">{booking.guests} persone</p>
                    </div>
                  </div>

                  {/* Azioni prenotazione */}
                  <div className="flex gap-2">
                    {booking.status === 'confirmed' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(booking.id, 'checked-in')}
                        disabled={updatingBooking === booking.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {updatingBooking === booking.id ? (
                          <LoadingSpinner size="sm" className="mr-2" />
                        ) : (
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        Check-in
                      </Button>
                    )}
                    {booking.status === 'checked-in' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(booking.id, 'checked-out')}
                        disabled={updatingBooking === booking.id}
                      >
                        {updatingBooking === booking.id ? (
                          <LoadingSpinner size="sm" className="mr-2" />
                        ) : (
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        )}
                        Check-out
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}