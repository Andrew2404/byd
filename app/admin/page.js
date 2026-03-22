import { PageShell } from '@/components/layout/page-shell';
import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { getAdminSnapshot } from '@/lib/admin-store';
import { resolveLocale } from '@/lib/i18n';

export default function AdminPage({ searchParams }) {
  const locale = resolveLocale(searchParams);
  const snapshot = getAdminSnapshot();

  return (
    <PageShell locale={locale} path="/admin">
      <AdminDashboard snapshot={snapshot} />
    </PageShell>
  );
}
