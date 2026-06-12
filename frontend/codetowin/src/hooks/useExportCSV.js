/**
 * Hook pour gérer l'export de données au format CSV.
 */
export function useExportCSV() {
  const exportCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // Ajouter l'en-tête
    csvRows.push(headers.join(','));
    
    // Ajouter les lignes de données
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header] !== null && row[header] !== undefined ? String(row[header]) : '';
        const escaped = value.replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return { exportCSV };
}
