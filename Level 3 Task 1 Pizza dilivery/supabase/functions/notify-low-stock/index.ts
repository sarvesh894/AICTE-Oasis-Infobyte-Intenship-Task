import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resendApiKey = Deno.env.get('RESEND_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check for low stock items
    const { data: lowStockItems, error } = await supabase
      .from('inventory')
      .select('*')
      .lte('current_stock', 'threshold_level');

    if (error) {
      throw new Error(`Failed to fetch inventory: ${error.message}`);
    }

    if (!lowStockItems || lowStockItems.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No low stock items found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get admin email from profiles
    const { data: adminProfiles, error: adminError } = await supabase
      .from('profiles')
      .select('full_name, user_id')
      .eq('role', 'admin');

    if (adminError || !adminProfiles || adminProfiles.length === 0) {
      console.log('No admin profiles found');
      return new Response(
        JSON.stringify({ message: 'No admin profiles found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get admin user details from auth.users
    const adminEmails = [];
    for (const profile of adminProfiles) {
      const { data: userData, error: userError } = await supabase.auth.admin.getUserById(profile.user_id);
      if (!userError && userData.user?.email) {
        adminEmails.push(userData.user.email);
      }
    }

    if (adminEmails.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No admin emails found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send email notification if Resend API key is available
    if (resendApiKey) {
      const lowStockList = lowStockItems
        .map(item => `• ${item.item_name}: ${item.current_stock} ${item.unit} (Threshold: ${item.threshold_level} ${item.unit})`)
        .join('\n');

      const emailBody = `
        <h2>🚨 Low Stock Alert - Pizza Craft</h2>
        <p>The following items are running low on stock and need immediate restocking:</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; font-family: monospace;">
          ${lowStockItems.map(item => 
            `<div>• <strong>${item.item_name}</strong>: ${item.current_stock} ${item.unit} (Threshold: ${item.threshold_level} ${item.unit})</div>`
          ).join('')}
        </div>
        <p>Please restock these items as soon as possible to avoid running out of ingredients.</p>
        <p>Best regards,<br>Pizza Craft System</p>
      `;

      for (const adminEmail of adminEmails) {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Pizza Craft <noreply@pizzacraft.com>',
            to: [adminEmail],
            subject: `🚨 Low Stock Alert - ${lowStockItems.length} Item(s) Need Restocking`,
            html: emailBody,
          }),
        });

        if (!emailResponse.ok) {
          const error = await emailResponse.text();
          console.error(`Failed to send email to ${adminEmail}:`, error);
        } else {
          console.log(`Low stock notification sent to ${adminEmail}`);
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        message: `Low stock notification sent for ${lowStockItems.length} items`,
        lowStockItems: lowStockItems.map(item => ({
          name: item.item_name,
          current_stock: item.current_stock,
          threshold: item.threshold_level,
          unit: item.unit
        }))
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in notify-low-stock function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});