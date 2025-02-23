import { format, parseISO } from 'date-fns'

export function formatDate(date) {
  return date ? format(typeof date === 'string' ? parseISO(date) : date, 'dd/MM/yyyy') : ''
}

export function formatDateTime(date) {
  return date ? format(typeof date === 'string' ? parseISO(date) : date, 'dd/MM/yyyy HH:mm:ss') : ''
}

export function formatTime(date) {
  return date ? format(typeof date === 'string' ? parseISO(date) : date, 'HH:mm') : ''
}
