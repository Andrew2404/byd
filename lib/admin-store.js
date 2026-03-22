import { blogPosts, homepageContent, vehicles } from '@/data/site';
import { getBackedUpLeads } from '@/lib/zoho';

const adminContent = {
  blogPosts,
  homepageContent,
  vehicles,
};

export function getAdminSnapshot() {
  return {
    ...adminContent,
    leads: getBackedUpLeads(),
  };
}

export function updateAdminSection(section, payload) {
  adminContent[section] = payload;
  return adminContent[section];
}
