#!/usr/bin/env python3
"""
Generate placeholder screenshots for the README using Pillow.
Produces PNG images that represent the NexCampus UI.

Usage:
    python3 install/generate_screenshots.py
"""

import os, sys
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'screenshots')
os.makedirs(OUT, exist_ok=True)

W, H = 800, 500

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def draw_ui(name, elements):
    img = Image.new('RGB', (W, H), hex_to_rgb('#0b0f14'))
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 14)
        small = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 11)
        mono = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf', 11)
    except:
        font = ImageFont.load_default()
        small = font
        mono = font

    for el in elements:
        t = el.get('type', 'rect')
        x, y = el['x'], el['y']
        if t in ('text', 'title'):
            f = font if t == 'title' else small
            draw.text((x, y), el['text'], fill=hex_to_rgb(el['fill']), font=f)
        elif t == 'rect':
            w, h = el['w'], el['h']
            draw.rectangle([x, y, x+w, y+h], fill=hex_to_rgb(el['fill']), outline=hex_to_rgb(el.get('border', el['fill'])))
        elif t == 'circle':
            r = el.get('r', el.get('w', 10))
            if el.get('fill') == 'none':
                draw.ellipse([x-r, y-r, x+r, y+r], outline=hex_to_rgb(el.get('border', '#ffffff')))
            else:
                draw.ellipse([x-r, y-r, x+r, y+r], fill=hex_to_rgb(el['fill']))
        elif t == 'line':
            draw.line([x, y, el['w'], el['h']], fill=hex_to_rgb(el['fill']), width=el.get('width', 1))

    path = os.path.join(OUT, name)
    img.save(path)
    sz = os.path.getsize(path)
    print(f'{name}: {sz // 1024} KB')
    return img

# === Home ===
draw_ui('home.png', [
    {'type':'rect', 'x':0, 'y':0, 'w':200, 'h':500, 'fill':'#111820'},
    {'type':'text', 'x':20, 'y':20, 'text':'NEXCAMPUS', 'fill':'#4fc3f7'},
    {'type':'text', 'x':20, 'y':40, 'text':'v2.3.1', 'fill':'#5a6a84'},
    {'type':'rect', 'x':20, 'y':70, 'w':160, 'h':30, 'fill':'#0b0f14', 'border':'#4fc3f7'},
    {'type':'text', 'x':40, 'y':77, 'text':'HOME', 'fill':'#4fc3f7'},
    {'type':'rect', 'x':20, 'y':105, 'w':160, 'h':30, 'fill':'#0b0f14', 'border':'#1a2436'},
    {'type':'text', 'x':35, 'y':112, 'text':'STUDY LAB', 'fill':'#5a6a84'},
    {'type':'rect', 'x':20, 'y':140, 'w':160, 'h':30, 'fill':'#0b0f14', 'border':'#1a2436'},
    {'type':'text', 'x':35, 'y':147, 'text':'CODE LAB', 'fill':'#ffb74d'},
    {'type':'rect', 'x':20, 'y':175, 'w':160, 'h':30, 'fill':'#0b0f14', 'border':'#1a2436'},
    {'type':'text', 'x':30, 'y':182, 'text':'TEXT TOOLS', 'fill':'#5a6a84'},
    {'type':'rect', 'x':20, 'y':210, 'w':160, 'h':30, 'fill':'#0b0f14', 'border':'#1a2436'},
    {'type':'text', 'x':40, 'y':217, 'text':'ABOUT', 'fill':'#5a6a84'},
    {'type':'title', 'x':240, 'y':60, 'text':'Hey there.', 'fill':'#d4dcec'},
    {'type':'title', 'x':240, 'y':90, 'text':'NexCampus v2.3.1', 'fill':'#5a6a84'},
    {'type':'rect', 'x':240, 'y':130, 'w':120, 'h':60, 'fill':'#111820', 'border':'#1a2436'},
    {'type':'text', 'x':285, 'y':140, 'text':'v2.3.1', 'fill':'#4fc3f7'},
    {'type':'text', 'x':270, 'y':165, 'text':'Version', 'fill':'#5a6a84'},
    {'type':'rect', 'x':375, 'y':130, 'w':120, 'h':60, 'fill':'#111820', 'border':'#1a2436'},
    {'type':'text', 'x':415, 'y':140, 'text':'0', 'fill':'#4fc3f7'},
    {'type':'text', 'x':393, 'y':165, 'text':'Internet Required', 'fill':'#5a6a84'},
    {'type':'rect', 'x':510, 'y':130, 'w':120, 'h':60, 'fill':'#111820', 'border':'#1a2436'},
    {'type':'text', 'x':555, 'y':140, 'text':'∞', 'fill':'#4fc3f7'},
    {'type':'text', 'x':538, 'y':165, 'text':'Possibilities', 'fill':'#5a6a84'},
    {'type':'text', 'x':240, 'y':220, 'text':'Every student deserves free tools to learn,', 'fill':'#5a6a84'},
    {'type':'text', 'x':240, 'y':238, 'text':'build, and create — no internet required.', 'fill':'#5a6a84'},
    {'type':'rect', 'x':0, 'y':470, 'w':800, 'h':30, 'fill':'#111820'},
    {'type':'text', 'x':10, 'y':478, 'text':'NexCampus v2.3.1 · Made by Shahid Singh · NexCore™ Systems and Technologies · 2026', 'fill':'#5a6a84'},
])

# === Study Lab ===
draw_ui('studylab.png', [
    {'type':'rect', 'x':0, 'y':0, 'w':800, 'h':500, 'fill':'#0b0f14'},
    {'type':'text', 'x':15, 'y':15, 'text':'Notes    Q&A    Quiz    Flashcards    Timer    Diff    Dictionary    ★ Solar System', 'fill':'#4fc3f7'},
    {'type':'rect', 'x':15, 'y':45, 'w':180, 'h':440, 'fill':'#111820', 'border':'#1a2436'},
    {'type':'text', 'x':25, 'y':55, 'text':'Sources', 'fill':'#5a6a84'},
    {'type':'rect', 'x':25, 'y':75, 'w':160, 'h':60, 'fill':'#0b0f14', 'border':'#1a2436'},
    {'type':'text', 'x':35, 'y':85, 'text':'Upload .txt, .md, .pdf', 'fill':'#5a6a84'},
    {'type':'rect', 'x':35, 'y':105, 'w':60, 'h':22, 'fill':'#111820', 'border':'#4fc3f7'},
    {'type':'text', 'x':45, 'y':108, 'text':'Upload', 'fill':'#4fc3f7'},
    {'type':'text', 'x':25, 'y':150, 'text':'document1.txt', 'fill':'#d4dcec'},
    {'type':'text', 'x':25, 'y':168, 'text':'document2.txt', 'fill':'#d4dcec'},
    {'type':'text', 'x':25, 'y':186, 'text':'document3.txt', 'fill':'#d4dcec'},
    {'type':'text', 'x':25, 'y':420, 'text':'3 documents    Clear All', 'fill':'#5a6a84'},
    {'type':'rect', 'x':210, 'y':45, 'w':570, 'h':100, 'fill':'#111820', 'border':'#1a2436'},
    {'type':'text', 'x':220, 'y':55, 'text':'Notes — Rich Text Editor', 'fill':'#26c6da'},
    {'type':'text', 'x':220, 'y':75, 'text':'B I U S | H1 H2 | Font Size | Styles', 'fill':'#5a6a84'},
    {'type':'text', 'x':220, 'y':95, 'text':'Start typing your notes here...', 'fill':'#5a6a84'},
    {'type':'rect', 'x':210, 'y':160, 'w':570, 'h':280, 'fill':'#0b0f14', 'border':'#1a2436'},
    {'type':'text', 'x':220, 'y':170, 'text':'[Rich text content appears here]', 'fill':'#5a6a84'},
    {'type':'rect', 'x':0, 'y':470, 'w':800, 'h':30, 'fill':'#111820'},
    {'type':'text', 'x':10, 'y':478, 'text':'0 words · 0 chars · 0 paras · ~1 min read', 'fill':'#5a6a84'},
])

# === Solar System ===
draw_ui('solarsystem.png', [
    {'type':'rect', 'x':0, 'y':0, 'w':800, 'h':500, 'fill':'#05080f'},
    {'type':'text', 'x':15, 'y':15, 'text':'Interactive Solar System — Scroll to zoom · Drag to pan · Click any planet', 'fill':'#5a6a84'},
    {'type':'rect', 'x':15, 'y':35, 'w':540, 'h':350, 'fill':'#05080f', 'border':'#1a2436'},
    # Sun
    {'type':'circle', 'x':285, 'y':210, 'r':20, 'fill':'#fffbe6'},
    {'type':'circle', 'x':285, 'y':210, 'r':45, 'fill':'#ff8c00'},
    # Orbits
    {'type':'circle', 'x':285, 'y':210, 'r':50, 'fill':'none', 'border':'#ffffff'},
    {'type':'circle', 'x':285, 'y':210, 'r':90, 'fill':'none', 'border':'#ffffff'},
    {'type':'circle', 'x':285, 'y':210, 'r':140, 'fill':'none', 'border':'#ffffff'},
    # Planets
    {'type':'circle', 'x':325, 'y':210, 'r':4, 'fill':'#b5b5b5'},  # Mercury
    {'type':'circle', 'x':285, 'y':275, 'r':7, 'fill':'#e8cda0'},  # Venus
    {'type':'circle', 'x':220, 'y':210, 'r':8, 'fill':'#4fc3f7'},  # Earth
    {'type':'circle', 'x':335, 'y':145, 'r':6, 'fill':'#e57373'},  # Mars
    {'type':'circle', 'x':195, 'y':295, 'r':12, 'fill':'#d4a574'}, # Jupiter
    {'type':'circle', 'x':420, 'y':285, 'r':10, 'fill':'#f0d58c'}, # Saturn
    {'type':'circle', 'x':430, 'y':95, 'r':8, 'fill':'#7ec8e3'},  # Uranus
    {'type':'circle', 'x':140, 'y':180, 'r':8, 'fill':'#4a6db5'}, # Neptune
    # Labels
    {'type':'text', 'x':335, 'y':235, 'text':'Mercury', 'fill':'#ffffff'},
    {'type':'text', 'x':255, 'y':292, 'text':'Venus', 'fill':'#ffffff'},
    {'type':'text', 'x':195, 'y':208, 'text':'Earth', 'fill':'#ffffff'},
    # Controls
    {'type':'rect', 'x':15, 'y':395, 'w':540, 'h':30, 'fill':'#111820'},
    {'type':'text', 'x':20, 'y':413, 'text':'Speed: 1×  |  Pause  |  Zoom: 100%  |  [+] [-] [Reset]  |  Next Fact', 'fill':'#5a6a84'},
    {'type':'text', 'x':380, 'y':413, 'text':'💡 Saturn\'s rings span 280,000 km...', 'fill':'#26c6da'},
    # Info panel
    {'type':'rect', 'x':565, 'y':35, 'w':220, 'h':390, 'fill':'#111820', 'border':'#1a2436'},
    {'type':'text', 'x':575, 'y':50, 'text':'PLANET INFO', 'fill':'#5a6a84'},
    {'type':'text', 'x':575, 'y':75, 'text':'Earth', 'fill':'#4fc3f7'},
    {'type':'rect', 'x':575, 'y':95, 'w':200, 'h':22, 'fill':'#0b0f14', 'border':'#4fc3f7'},
    {'type':'text', 'x':580, 'y':100, 'text':'Overview', 'fill':'#4fc3f7'},
    {'type':'text', 'x':640, 'y':100, 'text':'Orbit', 'fill':'#5a6a84'},
    {'type':'text', 'x':690, 'y':100, 'text':'Atmo', 'fill':'#5a6a84'},
    {'type':'text', 'x':735, 'y':100, 'text':'Missions', 'fill':'#5a6a84'},
    {'type':'text', 'x':575, 'y':130, 'text':'Type: Terrestrial', 'fill':'#d4dcec'},
    {'type':'text', 'x':575, 'y':148, 'text':'Diameter: 12,756 km', 'fill':'#d4dcec'},
    {'type':'text', 'x':575, 'y':166, 'text':'Mass: 1 (reference)', 'fill':'#d4dcec'},
    {'type':'text', 'x':575, 'y':184, 'text':'Gravity: 9.81 m/s²', 'fill':'#d4dcec'},
    {'type':'text', 'x':575, 'y':202, 'text':'Density: 5.51 g/cm³', 'fill':'#d4dcec'},
    {'type':'text', 'x':575, 'y':220, 'text':'Avg Temp: -89 to 57°C', 'fill':'#d4dcec'},
    {'type':'text', 'x':575, 'y':250, 'text':'💡 Earth is the only known planet', 'fill':'#26c6da'},
    {'type':'text', 'x':575, 'y':268, 'text':'   with liquid water and life!', 'fill':'#26c6da'},
])

# === Code Lab ===
draw_ui('codelab.png', [
    {'type':'rect', 'x':0, 'y':0, 'w':800, 'h':500, 'fill':'#0b0f14'},
    # Sidebar
    {'type':'rect', 'x':0, 'y':0, 'w':250, 'h':500, 'fill':'#111820'},
    {'type':'text', 'x':15, 'y':15, 'text':'Guides', 'fill':'#4fc3f7'},
    {'type':'text', 'x':85, 'y':15, 'text':'Dictionary', 'fill':'#5a6a84'},
    {'type':'text', 'x':170, 'y':15, 'text':'Projects', 'fill':'#5a6a84'},
    {'type':'rect', 'x':10, 'y':30, 'w':230, 'h':2, 'fill':'#4fc3f7'},
    # Guide list
    {'type':'text', 'x':15, 'y':50, 'text':'Python Basics', 'fill':'#d4dcec'},
    {'type':'text', 'x':15, 'y':68, 'text':'Variables & Types', 'fill':'#d4dcec'},
    {'type':'text', 'x':15, 'y':86, 'text':'Strings & Formatting', 'fill':'#d4dcec'},
    {'type':'text', 'x':15, 'y':104, 'text':'Lists & Loops', 'fill':'#d4dcec'},
    {'type':'text', 'x':15, 'y':122, 'text':'Dictionaries & Sets', 'fill':'#d4dcec'},
    {'type':'text', 'x':15, 'y':140, 'text':'Functions & Scope', 'fill':'#d4dcec'},
    # Main area - editor
    {'type':'rect', 'x':260, 'y':5, 'w':530, 'h':30, 'fill':'#111820'},
    {'type':'text', 'x':270, 'y':14, 'text':'Python', 'fill':'#5a6a84'},
    {'type':'text', 'x':330, 'y':14, 'text':'▶ Run', 'fill':'#26c6da'},
    {'type':'text', 'x':380, 'y':14, 'text':'[Cancel]', 'fill':'#ffb74d'},
    {'type':'text', 'x':440, 'y':14, 'text':'Clear  Copy  Format', 'fill':'#5a6a84'},
    {'type':'text', 'x':700, 'y':14, 'text':'Python', 'fill':'#5a6a84'},
    # Editor
    {'type':'rect', 'x':260, 'y':38, 'w':530, 'h':200, 'fill':'#0b0f14', 'border':'#1a2436'},
    {'type':'text', 'x':268, 'y':48, 'text':'1', 'fill':'#5a6a84'},
    {'type':'text', 'x':278, 'y':48, 'text':'print("Hello, NexCampus!")', 'fill':'#d4dcec'},
    {'type':'text', 'x':268, 'y':68, 'text':'2', 'fill':'#5a6a84'},
    {'type':'text', 'x':278, 'y':68, 'text':"name = input(\"What's your name? \")", 'fill':'#d4dcec'},
    {'type':'text', 'x':268, 'y':88, 'text':'3', 'fill':'#5a6a84'},
    {'type':'text', 'x':278, 'y':88, 'text':'print(f"Nice to meet you, {name}!")', 'fill':'#d4dcec'},
    # Snippets bar
    {'type':'text', 'x':268, 'y':248, 'text':'def  class  for  if  try  list[]  f""', 'fill':'#5a6a84'},
    # Output
    {'type':'rect', 'x':260, 'y':268, 'w':530, 'h':80, 'fill':'#111820', 'border':'#1a2436'},
    {'type':'text', 'x':268, 'y':278, 'text':'▸ stdout', 'fill':'#26c6da'},
    {'type':'text', 'x':268, 'y':296, 'text':'Hello, NexCampus!', 'fill':'#d4dcec'},
    {'type':'text', 'x':268, 'y':314, 'text':"Nice to meet you, Alice!", 'fill':'#d4dcec'},
])

print(f'All screenshots saved to {OUT}/')
print('Update README to reference them.')
