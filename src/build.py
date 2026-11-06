import pathlib
d = pathlib.Path(__file__).parent
t = (d / 'template.html').read_text()
css = (d / 'style.css').read_text()
js = '\n'.join((d / f).read_text() for f in ['core.js', 'zoom.js', 'learn.js', 'lab.js', 'games.js', 'quiz.js', 'main.js'])
out = t.replace('/*__CSS__*/', css).replace('/*__JS__*/', js)

(d.parent / "index.html").write_text(out)
print(len(out), 'bytes')
