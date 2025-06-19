import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { LoadingSpinner } from "../components/ui/loading";
import { useStore } from "../store/useStore";
import { generateReport, fetchProperty } from "../../lib/fakeApi";

export default function Report() {
  const { id } = useParams();
  const { addNotification } = useStore();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadReportData();
  }, [id, selectedMonth, selectedYear]);

  async function loadReportData() {
    setLoading(true);
    try {
      const [propertyData, report] = await Promise.all([
        fetchProperty(id),
        generateReport(parseInt(id), selectedMonth, selectedYear)
      ]);
      setProperty(propertyData);
      setReportData(report);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Errore',
        message: 'Impossibile generare il report'
      });
    } finally {
      setLoading(false);
    }
  }

  function handleDownloadPDF() {
    addNotification({
      type: 'info',
      title: 'Download in corso',
      message: 'Il report PDF verrà scaricato a breve'
    });
    // Qui implementeresti la generazione PDF reale
  }

  function handleSendEmail() {
    addNotification({
      type: 'success',
      title: 'Email inviata',
      message: 'Il report è stato inviato via email'
    });
  }

  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Report {property?.name}
          </h1>
          <p className="text-gray-600">
            {monthNames[selectedMonth - 1]} {selectedYear}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link to={`/property/${id}`}>
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Torna alla proprietà
            </Button>
          </Link>
          <Button onClick={handleDownloadPDF} className="bg-blue-900 hover:bg-blue-800">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Scarica PDF
          </Button>
          <Button variant="outline" onClick={handleSendEmail}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Invia via Email
          </Button>
        </div>
      </div>

      {/* Filtri periodo */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Seleziona Periodo</h2>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mese</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {monthNames.map((month, index) => (
                  <option key={index} value={index + 1}>{month}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Anno</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiche principali */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 13a2 2 0 002 2h8a2 2 0 002-2L16 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Prenotazioni</p>
                <p className="text-2xl font-bold text-gray-900">{reportData?.totalBookings || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ricavi</p>
                <p className="text-2xl font-bold text-gray-900">€{reportData?.totalRevenue || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tasso Occupazione</p>
                <p className="text-2xl font-bold text-gray-900">{reportData?.occupancyRate || 0}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Soggiorno Medio</p>
                <p className="text-2xl font-bold text-gray-900">{reportData?.averageStay || 0} giorni</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ospiti principali */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Ospiti del Mese</h2>
        </CardHeader>
        <CardContent>
          {reportData?.topGuests?.length > 0 ? (
            <div className="space-y-3">
              {reportData.topGuests.map((guest, index) => (
                <div key={guest.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{guest.guest}</p>
                      <p className="text-sm text-gray-600">{guest.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">€{guest.totalPrice}</p>
                    <p className="text-sm text-gray-600">{guest.guests} ospiti</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Nessun ospite nel periodo selezionato</p>
          )}
        </CardContent>
      </Card>

      {/* Anteprima report */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Anteprima Report PDF</h2>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Report {property?.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {monthNames[selectedMonth - 1]} {selectedYear}
              </p>
              <p className="text-sm text-gray-500">
                Il report PDF includerà tutte le statistiche, grafici dettagliati e l'elenco completo delle prenotazioni del periodo selezionato.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}