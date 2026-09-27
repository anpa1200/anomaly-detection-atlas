import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
function AccessibleTable(props){return <table {...props} tabIndex={0} aria-label={props['aria-label']||'Reference table; scroll horizontally if needed'}/>;}
export default {...MDXComponents,table:AccessibleTable};
