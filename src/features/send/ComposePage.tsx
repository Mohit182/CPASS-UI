import { useState } from 'react';
import { Bookmark, CircleX, LayoutTemplate, Link2, Plus } from 'lucide-react';
import { Button, Card, FileDropzone, FormField, PillTabs, Select, Textarea } from '@/components/ui';
import { HeroTabs, PhonePreview, RecipientStats, SendActions, SendOptionsBar } from '@/components/patterns';
import { COMPOSE_MODES, SEND_TABS, type ComposeModeKey } from './composeModes';

const SAMPLE_PREVIEW = 'Dear customer, your order {{order_id}} has been confirmed. - GRWTEL';

export function ComposePage({ mode }: { mode: ComposeModeKey }) {
  const cfg = COMPOSE_MODES[mode];
  const [quick, setQuick] = useState('quick');
  const [content, setContent] = useState('');
  const credits = Math.max(1, Math.ceil(content.length / 160));

  return (
    <>
      <HeroTabs items={SEND_TABS} />
      <div className="mb-5">
        <h1 className="font-display text-[28px] font-bold leading-tight text-ink">{cfg.title}</h1>
        <p className="mt-1 text-[15px] text-ink-secondary">{cfg.subtitle}</p>
      </div>

      {/* Campaign meta */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="grid flex-1 grid-cols-[1.3fr_auto_1fr_1fr] items-end gap-3">
            <FormField label="Campaign Name" required>
              <Select options={['default (7487)', 'Diwali Offer Blast', 'OTP – Login Flow']} className="[&>select]:h-10 [&>select]:text-[14px]" />
            </FormField>
            <Button variant="outline" className="h-10 w-10 rounded-lg px-0" aria-label="New campaign">
              <Plus className="h-4 w-4" />
            </Button>
            <FormField label="Template Category">
              <Select options={['Service Implicit', 'Service Explicit', 'Promotional', 'Transactional']} className="[&>select]:h-10 [&>select]:text-[14px]" />
            </FormField>
            <FormField label="Sender ID" required>
              <Select options={['GRWTEL', 'GRWSMS', 'GTOTPS']} className="[&>select]:h-10 [&>select]:text-[14px]" />
            </FormField>
          </div>
          <PillTabs
            className="ml-8 mt-7"
            value={quick}
            onChange={setQuick}
            items={[
              { value: 'quick', label: 'Quick SMS' },
              { value: 'schedule', label: 'View Schedule' },
            ]}
          />
        </div>

        {cfg.recipients === 'textarea' ? (
          <FormField label="Recipients* (New Number on New Line)" className="mt-5 max-w-[820px]">
            <Textarea placeholder="Enter Mobile Number" className="min-h-[130px] bg-surface-page" />
          </FormField>
        ) : (
          <div className="mt-5 grid max-w-[840px] gap-4" style={{ gridTemplateColumns: `repeat(${cfg.columnFields.length}, minmax(0,1fr))` }}>
            {cfg.columnFields.map((f) => (
              <FormField key={f} label={f} required>
                <Select options={[]} placeholder=" " className="[&>select]:h-10" />
              </FormField>
            ))}
          </div>
        )}
      </Card>

      {/* Upload + recipient stats */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[3fr_1fr]">
        <Card className="p-6">
          <FileDropzone />
        </Card>
        <RecipientStats />
      </div>

      {/* Content + phone preview */}
      {cfg.content && (
        <Card className="mt-5 grid gap-6 p-6 xl:grid-cols-[3fr_1fr]">
          <div>
            <FormField label="Content">
              <div className="overflow-hidden rounded-lg border border-line">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter SMS Content Here"
                  className="block min-h-[130px] w-full resize-y border-0 px-3 py-2.5 text-[13px] text-ink placeholder:text-ink-faint focus:outline-none"
                />
                <div className="flex items-center gap-6 border-t border-line bg-surface-muted px-3 py-2 text-[12px] text-ink-secondary">
                  <button type="button" className="inline-flex items-center gap-1.5 hover:text-ink">
                    <LayoutTemplate className="h-4 w-4" /> Insert Template
                  </button>
                  <button type="button" className="inline-flex items-center gap-1.5 hover:text-ink">
                    <Link2 className="h-4 w-4" /> Insert URL
                  </button>
                  <button type="button" onClick={() => setContent('')} className="ml-auto inline-flex items-center gap-1 text-[11px] hover:text-ink">
                    <CircleX className="h-3.5 w-3.5" /> Clear
                  </button>
                </div>
              </div>
            </FormField>
            <div className="mt-3 flex items-center justify-between text-[12px]">
              <span className="text-ink">
                {content.length} character {credits} SMS Credits
              </span>
              <button type="button" className="inline-flex items-center gap-1 text-[11px] text-ink-secondary hover:text-ink">
                <Bookmark className="h-3.5 w-3.5" /> Save as Template
              </button>
            </div>
          </div>
          <PhonePreview message={content || SAMPLE_PREVIEW} />
        </Card>
      )}

      <SendOptionsBar className="mt-5" options={cfg.options} actions={cfg.content ? undefined : <SendActions />} />
      {cfg.content && (
        <div className="mt-5 flex justify-end gap-2">
          <SendActions />
        </div>
      )}
    </>
  );
}
export default ComposePage;
