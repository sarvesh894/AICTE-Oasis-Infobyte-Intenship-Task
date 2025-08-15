-- Set up cron job to check low stock every hour and send notifications
SELECT cron.schedule(
  'low-stock-notification',
  '0 * * * *', -- Every hour at minute 0
  $$
  SELECT net.http_post(
    url := 'https://zbdnkfqxxsdutdujjupp.supabase.co/functions/v1/notify-low-stock',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiZG5rZnF4eHNkdXRkdWpqdXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NTAxNTUsImV4cCI6MjA3MDIyNjE1NX0.BnUs4_Qxpn_pQiGo_lPPzNKqlBWFCE3Qyl3TnSMSXyc"}'::jsonb,
    body := '{"scheduled": true}'::jsonb
  );
  $$
);