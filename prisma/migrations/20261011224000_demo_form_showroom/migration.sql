-- Public showroom examples belong only to the protected demo tenant.
BEGIN;
UPDATE "WidgetSettings" SET "mapLayout" = 'side'
WHERE id = 'qalt-dedicated-demo-form' AND "companyId" = 'cmtjk5po0000004jzgud1ar9o';

INSERT INTO "WidgetSettings" (
  id, "companyId", name, "formStyle", "headerText", "companyNameText",
  "primaryColor", "mapLayout", "showWeight", "showItemCount", "showExtras",
  "customQuestions", "paymentsEnabled", "disclaimerText"
)
SELECT 'qalt-demo-extended', id, 'Extended Demo', 'extended', 'Plan your delivery',
  'Northline Delivery Co. (Demo)', '#dc2626', 'side', true, true, true,
  '[{"id":"shipment-type","label":"What are you delivering?","type":"single","required":true,"options":["Documents","Retail goods","Furniture"]},{"id":"access-notes","label":"Access or handling instructions","type":"text","required":false,"options":[]}]'::jsonb,
  false, 'Sample courier pricing for demonstration. This is not a real delivery service.'
FROM "Company" WHERE id = 'cmtjk5po0000004jzgud1ar9o'
ON CONFLICT (id) DO NOTHING;

INSERT INTO "WidgetSettings" (
  id, "companyId", name, "formStyle", "headerText", "quickSubtitleText", "companyNameText",
  "primaryColor", "mapLayout", "showVehicles", "vehicleOptions", "paymentsEnabled", "disclaimerText"
)
SELECT 'qalt-demo-vehicles', id, 'Vehicle Options Demo', 'quick', 'Instant Quote',
  'Choose the right vehicle. See your delivery price.', 'Northline Delivery Co. (Demo)',
  '#dc2626', 'side', true,
  '[{"name":"Car","fee":0},{"name":"Cargo Van","fee":25},{"name":"Box Truck","fee":60}]'::jsonb,
  false, 'Sample courier pricing for demonstration. This is not a real delivery service.'
FROM "Company" WHERE id = 'cmtjk5po0000004jzgud1ar9o'
ON CONFLICT (id) DO NOTHING;
COMMIT;
