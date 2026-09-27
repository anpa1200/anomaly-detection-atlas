import React from 'react';
import cover from '@site/content/cover.json';
export default function ResearchCover(){
 const base='https://1200km.com/articles/research/anomaly-visuals/';
 return <figure className="anomaly-figure" data-research-cover="true"><a href={base+cover.file} aria-label="Open the original full-size research cover"><img src={base+cover.display.file} width={cover.width} height={cover.height} alt={cover.alt} loading="eager" fetchPriority="high" decoding="async"/></a><figcaption>{cover.caption}</figcaption></figure>;
}
