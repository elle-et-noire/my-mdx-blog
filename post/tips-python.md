---
title: Tips for Python
publish: 2025-05-09
lastUpdate: 2025-05-09
---

## SVGの生成

[svgwrite](https://svgwrite.readthedocs.io/en/latest/)が便利（GitHubレポジトリはなぜかアーカイブされている）。以下はロゴとテキストを出力する例。

```python
import svgwrite
import favicon
from favicon import rodrig, poly_points, star_points
import math

dwg = svgwrite.Drawing("card.svg", size=("1280px", "640px"))

bg = dwg.rect(insert=(0, 0), size=("100%", "100%"), fill="#324e73")
dwg.add(bg)

text = dwg.text("", insert=(0, "17%"))
text.add(dwg.tspan("Week", x=["36%"], dy=["1.2em"]))
text.add(dwg.tspan("l", fill="#99a1af"))
text.add(dwg.tspan("y", fill="black"))
text.add(dwg.tspan("Run Demo", x=["36%"], dy=["1.2em"]))
text.update({
    "font-family": "Segoe UI",
    "font-size": "144px",
    "fill": "black",
    "font-style": "italic",
    "font-weight": "bold"
})
dwg.add(text)

starorig = (120, 160)
ratio = 1.2

R = rodrig([1, 0, 0], math.pi / 7) @ rodrig([0, 1, 0], math.pi / 7)
center1 = (112*ratio+starorig[0], 146*ratio+starorig[1])
outer7 = poly_points(R, n_vertices=7, scale=120*ratio, origin=center1)
inner7 = poly_points(R, n_vertices=7, scale=80*ratio, origin=center1)

center2 = (150*ratio+starorig[0], 110*ratio+starorig[1])
pts_outer4 = [(center2[0] + 140*ratio * x, center2[1] + 140*ratio * y)
              for x, y in star_points(n_vertices=4, r_inner=0.25)]

center3 = (160*ratio+starorig[0], 100*ratio+starorig[1])
pts_inner4 = star_points(n_vertices=4, r_inner=0.16)
pts_inner4 = [(center3[0] + 100*ratio * x, center3[1] + 100*ratio * y)
              for x, y in pts_inner4]

mask = dwg.defs.add(dwg.mask(id="heptaMask"))
mask.add(dwg.rect(insert=(0, 0),
                  size=("100%", "100%"),
                  fill="white"))
mask.add(dwg.polygon(inner7, fill="black"))
mask.add(dwg.polygon(pts_outer4, fill='black'))

dwg.add(dwg.polygon(outer7, fill='white', mask="url(#heptaMask)"))
dwg.add(dwg.polygon(pts_inner4, fill='white'))


dwg.save()
```

上記のコードで生成された`card.svg`をInkscapeでPNGに変換すればカード画像が生成できる。