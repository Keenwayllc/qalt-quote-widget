import { NextResponse } from "next/server";

// Serves the widget bootstrap script injected into Shopify stores.
// Shopify calls this as a script tag on every storefront page.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const companyId = searchParams.get("companyId");

  if (!companyId) {
    return new NextResponse("/* missing companyId */", {
      headers: { "Content-Type": "application/javascript" },
    });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  const js = `
(function() {
  if (document.getElementById('qalt-widget-container')) return;

  var container = document.createElement('div');
  container.id = 'qalt-widget-container';
  container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:99999;';
  document.body.appendChild(container);

  var btn = document.createElement('button');
  btn.id = 'qalt-widget-btn';
  btn.innerText = 'Get a Delivery Quote';
  btn.style.cssText = [
    'background:#dc2626',
    'color:#fff',
    'border:none',
    'border-radius:12px',
    'padding:14px 22px',
    'font-size:15px',
    'font-weight:800',
    'cursor:pointer',
    'box-shadow:0 4px 24px rgba(220,38,38,0.35)',
    'font-family:system-ui,sans-serif',
    'letter-spacing:-0.01em',
    'transition:transform 0.15s,box-shadow 0.15s',
  ].join(';');

  btn.onmouseover = function() {
    btn.style.transform = 'scale(1.04)';
    btn.style.boxShadow = '0 6px 32px rgba(220,38,38,0.45)';
  };
  btn.onmouseout = function() {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = '0 4px 24px rgba(220,38,38,0.35)';
  };

  var iframe = document.createElement('iframe');
  iframe.src = '${appUrl}/widget/${companyId}';
  iframe.style.cssText = [
    'display:none',
    'position:fixed',
    'bottom:80px',
    'right:24px',
    'width:420px',
    'height:640px',
    'border:none',
    'border-radius:20px',
    'box-shadow:0 20px 60px rgba(0,0,0,0.25)',
    'z-index:99999',
    'background:#fff',
    'transition:opacity 0.2s,transform 0.2s',
    'opacity:0',
    'transform:translateY(12px)',
  ].join(';');
  iframe.title = 'Qalt Delivery Quote';
  iframe.allow = 'payment';

  var open = false;
  btn.onclick = function() {
    open = !open;
    if (open) {
      iframe.style.display = 'block';
      requestAnimationFrame(function() {
        iframe.style.opacity = '1';
        iframe.style.transform = 'translateY(0)';
      });
      btn.innerText = 'Close';
    } else {
      iframe.style.opacity = '0';
      iframe.style.transform = 'translateY(12px)';
      setTimeout(function() { iframe.style.display = 'none'; }, 200);
      btn.innerText = 'Get a Delivery Quote';
    }
  };

  container.appendChild(iframe);
  container.appendChild(btn);
})();
`.trim();

  return new NextResponse(js, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=300",
    },
  });
}
