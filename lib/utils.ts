import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function exportToExcel(data: any, fileName: string) {
 
  // Créer un workbook et ajouter une feuille de données
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Générer un fichier Excel
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Sauvegarder le fichier
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, `${fileName}.xlsx`);

}