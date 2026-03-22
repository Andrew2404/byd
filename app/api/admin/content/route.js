import { getAdminSnapshot } from '@/lib/admin-store';

export async function GET() {
  return Response.json(getAdminSnapshot());
}
