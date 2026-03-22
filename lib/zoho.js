const leadsStore = [];

export async function createZohoLead(payload) {
  const baseUrl = process.env.ZOHO_API_BASE_URL;
  const accessToken = process.env.ZOHO_ACCESS_TOKEN;

  if (!baseUrl || !accessToken) {
    return {
      success: true,
      mode: 'mock',
      message: 'Zoho credentials are not configured; lead stored locally.',
    };
  }

  const response = await fetch(`${baseUrl}/crm/v2/Leads`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: [payload] }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Zoho lead creation failed: ${error}`);
  }

  return response.json();
}

export function backupLead(payload) {
  leadsStore.push({ id: String(Date.now()), createdAt: new Date().toISOString(), ...payload });
  return leadsStore.at(-1);
}

export function getBackedUpLeads() {
  return leadsStore;
}
