import React from 'react';
import manifest from '@site/content/visuals.json';
export default function ResearchFigure({id}) {
 const f=manifest.figures.find(item=>item.id===id);
 if(!f)throw new Error(`Unknown research figure: ${id}`);
 const base='https://1200km.com/articles/research/anomaly-visuals/';
 const desktop=base+f.assets.desktop.name, mobile=base+f.assets.mobile.name;
 return <figure className="anomaly-figure" id={`figure-${id}`} data-research-figure={id}>
  <a className="anomaly-figure-image" href={desktop} aria-label={`Open full-size diagram: ${f.title}`}><picture>
   <source media="(max-width: 1100px)" srcSet={mobile} width={f.assets.mobile.width} height={f.assets.mobile.height}/>
   <img src={desktop} width={f.assets.desktop.width} height={f.assets.desktop.height} alt={`${f.title}. ${f.caption} ${f.boundary}`} loading="lazy" decoding="async"/>
  </picture></a>
  <figcaption><strong>Figure {f.number}. {f.title}.</strong> {f.caption}<span className="anomaly-figure-evidence">{f.evidence}</span><span className="anomaly-figure-sources">Sources: {f.sources.map((s,i)=><React.Fragment key={s.url}>{i>0?' · ':''}<a href={s.url}>{s.label}</a></React.Fragment>)}.</span></figcaption>
  <details className="anomaly-figure-transcript"><summary>Text equivalent and full-size diagram</summary>
   <p>{f.boundary}</p>{f.transcript?.map((p,i)=><p key={i}>{p}</p>)}
   {f.steps&&<ol>{f.steps.map((s,i)=><li key={i}><strong>{s.label}.</strong> {s.text}</li>)}</ol>}
   {f.labels&&<p>Illustrated relationship: {f.labels.join(' → ')}. Schematic, not observed incident data.</p>}
   {f.panels&&<ul>{f.panels.map((p,i)=><li key={i}><strong>{p.label}.</strong> {p.text}</li>)}</ul>}
   {f.data&&<pre tabIndex={0} aria-label="Exact data used in this diagram">{JSON.stringify(f.data,null,2)}</pre>}
   <p><a href={desktop}>Open original full-size asset</a>{!f.upload&&<>{' · '}<a href={mobile}>Open narrow-layout SVG</a></>}</p>
  </details>
 </figure>;
}
