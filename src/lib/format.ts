import { format, parseISO } from 'date-fns';

export const formatNumber = (n: number) => n.toLocaleString('en-IN');

export const formatPct = (n: number, digits = 1) => `${n.toFixed(digits)}%`;

/** "10 September 2026" */
export const formatDate = (iso: string) => format(parseISO(iso), 'dd MMMM yyyy');

/** "11:30 AM" */
export const formatTime = (iso: string) => format(parseISO(iso), 'hh:mm a');

/** "2026-08-12" */
export const formatIsoDate = (iso: string) => format(parseISO(iso), 'yyyy-MM-dd');

/** "10-08-2026" used in filter inputs */
export const formatShortDate = (iso: string) => format(parseISO(iso), 'dd-MM-yyyy');

/** 9198xxxxx210 */
export const maskMsisdn = (msisdn: string) => msisdn.replace(/^(\d{4})\d+(\d{3})$/, '$1xxxxx$2');
