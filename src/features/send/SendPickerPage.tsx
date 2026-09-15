import { Braces, Languages, MessageSquareMore, MessageSquareText } from 'lucide-react';
import { PageHeader } from '@/components/layout';
import { HeroIllustration, OptionPicker } from '@/components/patterns';

export function SendPickerPage() {
  return (
    <>
      <PageHeader back="/dashboard" title="Create a new SMS" subtitle="Choose a message mode, verify DLT mapping, then send or schedule." />
      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <OptionPicker
          items={[
            { to: '/send/campaign', title: 'Campaign SMS', subtitle: 'Send a standard message using an approved English template.', icon: <MessageSquareText />, tone: 'orange' },
            { to: '/send/unicode', title: 'Unicode Campaign', subtitle: 'Send Hindi, regional, or mixed-language customer messages.', icon: <Languages />, tone: 'info' },
            { to: '/send/dynamic', title: 'Dynamic Campaign', subtitle: 'Personalize one template with variables for every recipient.', icon: <Braces />, tone: 'success' },
            { to: '/send/multi-dynamic', title: 'Multi Dynamic Campaign', subtitle: 'Map several templates and datasets in a single upload.', icon: <MessageSquareMore />, tone: 'danger' },
          ]}
        />
        <HeroIllustration />
      </div>
    </>
  );
}
export default SendPickerPage;
