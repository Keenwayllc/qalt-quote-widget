"use client";

import { useEffect } from "react";

const LOGO_ACCEPT = ".png,.svg,image/png,image/svg+xml";

function isAllowedLogo(file: File): boolean {
  const name = file.name.toLowerCase();
  const byExtension = name.endsWith(".png") || name.endsWith(".svg");
  const byMime = file.type === "image/png" || file.type === "image/svg+xml" || file.type === "";
  return byExtension && byMime;
}

export default function LogoUploadPolicy() {
  useEffect(() => {
    const findLogoInput = (): HTMLInputElement | null => {
      const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('input[type="file"]'));
      return inputs.find((input) => {
        let node: HTMLElement | null = input.parentElement;
        for (let i = 0; i < 6 && node; i += 1, node = node.parentElement) {
          if ((node.textContent || "").includes("Company Logo")) return true;
        }
        return false;
      }) ?? null;
    };

    const applyPolicy = () => {
      const input = findLogoInput();
      if (!input) return;
      input.accept = LOGO_ACCEPT;
      input.setAttribute("aria-describedby", "qalt-logo-upload-guidance");
    };

    const onChangeCapture = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement) || target.type !== "file") return;

      const logoInput = findLogoInput();
      if (!logoInput || target !== logoInput) return;

      const file = target.files?.[0];
      if (!file || isAllowedLogo(file)) return;

      event.stopImmediatePropagation();
      target.value = "";
      window.alert("Logo files must be PNG or SVG. A transparent background is recommended.");
    };

    applyPolicy();
    const observer = new MutationObserver(applyPolicy);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("change", onChangeCapture, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("change", onChangeCapture, true);
    };
  }, []);

  return (
    <p
      id="qalt-logo-upload-guidance"
      className="mx-4 sm:mx-8 pt-5 mb-5 text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400"
    >
      Logo files: PNG or SVG only. Transparent background recommended. SVG uploads are safely converted to PNG before they are served.
    </p>
  );
}
