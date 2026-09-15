import { Braces, MessageSquareMore, MessageSquareText, Languages } from 'lucide-react';
import type { HeroTabItem } from '@/components/patterns';
import type { SendOption } from '@/components/patterns/SendPatterns';

export type ComposeModeKey = 'campaign' | 'unicode' | 'dynamic' | 'multi-dynamic';

export interface ComposeMode {
  key: ComposeModeKey;
  title: string;
  subtitle: string;
  /** Free-text recipients textarea (Campaign / Unicode) vs column selects (Dynamic modes). */
  recipients: 'textarea' | 'columns';
  columnFields: string[];
  /** Content editor + phone preview shown. */
  content: boolean;
  options: SendOption[];
}

const base: SendOption[] = [
  { key: 'dedupe', label: 'Remove Duplicate Numbers', info: true, defaultChecked: true },
  { key: 'invalid', label: 'Remove Invalid Numbers', info: true, defaultChecked: true },
  { key: 'multipart', label: 'Allow Multi Part SMS', info: true },
];

export const COMPOSE_MODES: Record<ComposeModeKey, ComposeMode> = {
  campaign: {
    key: 'campaign',
    title: 'Campaign SMS',
    subtitle: 'Send a standard message using an approved English template.',
    recipients: 'textarea',
    columnFields: [],
    content: true,
    options: [...base, { key: 'flash', label: 'Send as Flash SMS', info: true }, { key: 'schedule', label: 'Schedule SMS' }, { key: 'dnd', label: 'Scrub DND' }, { key: 'recurrence', label: 'Recurrence' }],
  },
  unicode: {
    key: 'unicode',
    title: 'Unicode Campaign',
    subtitle: 'Send a standard message using an approved English template.',
    recipients: 'textarea',
    columnFields: [],
    content: true,
    options: [...base, { key: 'flash', label: 'Send as Flash SMS', info: true }, { key: 'schedule', label: 'Schedule SMS' }, { key: 'dnd', label: 'Scrub DND' }, { key: 'recurrence', label: 'Recurrence' }, { key: 'unicode', label: 'Allow Unicode', info: true }],
  },
  dynamic: {
    key: 'dynamic',
    title: 'Dynamic Campaign',
    subtitle: 'Send a standard message using an approved English template.',
    recipients: 'columns',
    columnFields: ['Select Recipient Column'],
    content: true,
    options: [...base, { key: 'flash', label: 'Send as Flash SMS', info: true }, { key: 'schedule', label: 'Schedule SMS' }, { key: 'dnd', label: 'Scrub DND' }, { key: 'recurrence', label: 'Recurrence' }, { key: 'unicode', label: 'Allow Unicode', info: true }],
  },
  'multi-dynamic': {
    key: 'multi-dynamic',
    title: 'Multi Dynamic Campaign',
    subtitle: 'Send a standard message using an approved English template.',
    recipients: 'columns',
    columnFields: ['Select Recipient Column', 'Select Template Content Column', 'Select Template ID Column'],
    content: false,
    options: [...base, { key: 'dnd', label: 'Scrub DND' }, { key: 'shorten', label: 'Shortern URL', info: true }, { key: 'schedule', label: 'Schedule SMS' }],
  },
};

export const SEND_TABS: HeroTabItem[] = [
  { to: '/send/campaign', title: 'Campaign SMS', subtitle: 'Create and Send', icon: <MessageSquareText />, tone: 'orange' },
  { to: '/send/unicode', title: 'Unicode Campaign', subtitle: 'Send Unicode SMS', icon: <Languages />, tone: 'info' },
  { to: '/send/dynamic', title: 'Dynamic Campaign', subtitle: 'Send Dynamic SMS', icon: <Braces />, tone: 'success' },
  { to: '/send/multi-dynamic', title: 'Multi Dynamic Campaign', subtitle: 'Send Multi Dynamic', icon: <MessageSquareMore />, tone: 'danger' },
];
