import { LeadForm } from '@/components/forms/lead-form';

export function ContactStrip({ vehicles, type = 'contact', title, description }) {
  return (
    <section className="container-shell py-20">
      <LeadForm vehicles={vehicles} type={type} title={title} description={description} />
    </section>
  );
}
