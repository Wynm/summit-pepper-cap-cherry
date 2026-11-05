#!/usr/bin/env python3
"""Compose the أفق share card as HTML (exact Arabic, geometric plate)."""
from pathlib import Path

ticks = []
# Bezel between r=252 and r=274, center (600, 315).
import math

cx, cy = 600, 315
for i in range(72):
    deg = i * 5
    rad = math.radians(deg - 90)
    outer = 278 if i % 6 == 0 else 272
    inner = 248 if i % 6 == 0 else 256
    brass = i % 6 == 0
    color = "#C6A56A" if brass else "#2C3832"
    width = 1.6 if brass else 1.0
    x1 = cx + inner * math.cos(rad)
    y1 = cy + inner * math.sin(rad)
    x2 = cx + outer * math.cos(rad)
    y2 = cy + outer * math.sin(rad)
    ticks.append(
        f'<line x1="{x1:.2f}" y1="{y1:.2f}" x2="{x2:.2f}" y2="{y2:.2f}" '
        f'stroke="{color}" stroke-width="{width}" stroke-linecap="butt"/>'
    )

tick_svg = "\n    ".join(ticks)

html = f"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8"/>
<style>
@font-face {{
  font-family: "Plex Semi";
  src: url("fonts/IBMPlexSansArabic-SemiBold.ttf") format("truetype");
  font-weight: 600;
  font-style: normal;
}}
@font-face {{
  font-family: "Plex Med";
  src: url("fonts/IBMPlexSansArabic-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
}}
* {{ box-sizing: border-box; }}
html, body {{
  margin: 0;
  width: 1200px;
  height: 630px;
  background: #101614;
  overflow: hidden;
}}
.stage {{
  position: relative;
  width: 1200px;
  height: 630px;
}}
.plate {{
  position: absolute;
  inset: 0;
}}
.lockup {{
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
}}
.emblem {{ display: block; }}
h1 {{
  margin: 14px 0 0;
  padding: 0 0 34px;
  font-family: "Plex Semi", "DejaVu Sans", sans-serif;
  font-weight: 600;
  font-size: 204px;
  line-height: 0.86;
  color: #F3EEE4;
  letter-spacing: 0;
}}
.rule {{
  width: 132px;
  height: 1px;
  margin-top: 2px;
  background: #C6A56A;
}}
p {{
  margin: 16px 0 0;
  font-family: "Plex Med", "DejaVu Sans", sans-serif;
  font-weight: 500;
  font-size: 32px;
  line-height: 1;
  color: #A39888;
}}
.phases {{
  margin-top: 22px;
  display: block;
}}
</style>
</head>
<body>
<div class="stage">
  <svg class="plate" width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#101614"/>
    <g fill="none" stroke="#2C3832" stroke-width="1.5" stroke-linecap="square">
      <path d="M52 108 V52 H108"/>
      <path d="M1148 108 V52 H1092"/>
      <path d="M52 522 V578 H108"/>
      <path d="M1148 522 V578 H1092"/>
    </g>
    <g fill="none" stroke="#C6A56A" stroke-width="1.25" stroke-linecap="square">
      <path d="M64 96 V64 H96"/>
      <path d="M1136 96 V64 H1104"/>
      <path d="M64 534 V566 H96"/>
      <path d="M1136 534 V566 H1104"/>
    </g>
    <circle cx="600" cy="315" r="274" fill="none" stroke="#2C3832" stroke-width="1.25"/>
    <circle cx="600" cy="315" r="252" fill="none" stroke="#2C3832" stroke-width="1"/>
    {tick_svg}
    <g fill="#C6A56A">
      <circle cx="600" cy="41" r="2.4"/>
      <circle cx="600" cy="589" r="2.4"/>
      <circle cx="326" cy="315" r="2.4"/>
      <circle cx="874" cy="315" r="2.4"/>
    </g>
  </svg>
  <div class="lockup">
    <svg class="emblem" width="132" height="132" viewBox="0 0 132 132" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <mask id="moon">
          <rect width="132" height="132" fill="black"/>
          <circle cx="66" cy="24" r="13.5" fill="white"/>
          <circle cx="73.5" cy="20" r="11.2" fill="black"/>
        </mask>
      </defs>
      <circle cx="66" cy="24" r="13.5" fill="#F3EEE4" mask="url(#moon)"/>
      <g transform="translate(66 82)" fill="none" stroke="#C6A56A" stroke-width="1.7" stroke-linejoin="miter">
        <circle r="42"/>
        <rect x="-27" y="-27" width="54" height="54"/>
        <rect x="-27" y="-27" width="54" height="54" transform="rotate(45)"/>
      </g>
      <circle cx="66" cy="82" r="3" fill="#F3EEE4"/>
    </svg>
    <h1>أفق</h1>
    <div class="rule"></div>
    <p>محترف الليل</p>
    <svg class="phases" width="210" height="22" viewBox="0 0 210 22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <mask id="c1"><rect width="210" height="22" fill="black"/><circle cx="55" cy="11" r="7.2" fill="white"/><circle cx="59.6" cy="9.2" r="6.1" fill="black"/></mask>
        <mask id="g1"><rect width="210" height="22" fill="black"/><circle cx="143" cy="11" r="7.2" fill="white"/><circle cx="151.4" cy="11" r="4.6" fill="black"/></mask>
      </defs>
      <circle cx="11" cy="11" r="7.2" fill="none" stroke="#C6A56A" stroke-width="1.2"/>
      <circle cx="55" cy="11" r="7.2" fill="#F3EEE4" mask="url(#c1)"/>
      <circle cx="99" cy="11" r="7.2" fill="none" stroke="#A39888" stroke-width="1.15"/>
      <path d="M99 3.8 A7.2 7.2 0 0 0 99 18.2 Z" fill="#F3EEE4"/>
      <circle cx="143" cy="11" r="7.2" fill="#F3EEE4" mask="url(#g1)"/>
      <circle cx="187" cy="11" r="7.2" fill="#F3EEE4"/>
    </svg>
  </div>
</div>
</body>
</html>
"""

out = Path("/workspace/.grok/og-card.html")
out.write_text(html, encoding="utf-8")
print("wrote", out, "chars", len(html))
