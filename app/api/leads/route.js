import { backupLead, createZohoLead } from '@/lib/zoho';
import { validateLeadPayload } from '@/lib/validation';

export async function POST(request) {
  try {
    const payload = await request.json();
    const validation = validateLeadPayload(payload);

    if (!validation.isValid) {
      return Response.json({ message: 'Validation failed', errors: validation.errors }, { status: 400 });
    }

    const leadRecord = {
      Last_Name: payload.name,
      Email: payload.email,
      Phone: payload.phone,
      City: payload.city,
      Description: payload.message,
      Lead_Source: `Website - ${payload.type}`,
      Model_Interest: payload.interestedModel,
    };

    const backup = backupLead(payload);
    const zohoResult = await createZohoLead(leadRecord);

    return Response.json({
      success: true,
      message: zohoResult.mode === 'mock' ? 'Lead captured successfully. Zoho is in mock mode until credentials are configured.' : 'Lead captured successfully.',
      backup,
    });
  } catch (error) {
    return Response.json({ message: error.message || 'Lead submission failed' }, { status: 500 });
  }
}
