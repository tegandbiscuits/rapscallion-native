import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    id="prefix__Layer_1"
    x={0}
    y={0}
    viewBox="0 0 64 64.3"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <Path
      d="M22 48H12c-.6 0-1 .4-1 1v8c0 .4.2.7.5.9.3.2.7.2 1 0l4.5-2.7 4.5 2.7c.1.1.3.1.5.1s.3 0 .5-.1c.3-.2.5-.5.5-.9v-8c0-.6-.4-1-1-1zm-1 7.2l-3.5-2.1c-.1-.1-.3-.1-.5-.1s-.4 0-.5.1L13 55.2V50h8v5.2zM26 48h18v2H26zM38 52h18v2H38zM27 56h22v2H27zM46 48h2v2h-2zM50 48h2v2h-2zM54 48h2v2h-2zM51 56h2v2h-2zM30 52h4v2h-4zM27 23h5.3l.7 2-.9 2.7c-.1.4 0 .8.2 1l3 3c.2.2.5.3.7.3s.5-.1.7-.3l3-3c.3-.3.4-.7.2-1l-.8-2.7.7-2H45c.6 0 1-.4 1-1v-5c0-5.5-4.5-10-10-10s-10 4.5-10 10v5c0 .6.4 1 1 1zm10.1 2.3l.8 2.4-1.9 1.9-1.9-1.9.8-2.4c.1-.2.1-.4 0-.6l-.5-1.7h3.2l-.6 1.7c0 .2 0 .4.1.6zM44 21H28v-2h16v2zm0-4h-7V9.1c3.9.5 7 3.8 7 7.9zm-9-7.9V17h-7c0-4.1 3.1-7.4 7-7.9z"
    />
    <Path
      d="M61 2H11c-5 0-9 4-9 9v42c0 5 4 9 9 9h50c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1zM22.4 44L12 33.6V14.4L22.4 4h27.2L60 14.4v19.2L49.6 44H22.4zM12 36.4l7.6 7.6H12v-7.6zm48 0V44h-7.6l7.6-7.6zM60 4v7.6L52.4 4H60zm-48 7.6V4h7.6L12 11.6zM4 47.3V11c0-3.5 2.6-6.4 6-6.9v40h-.3c-.2 0-.4.1-.6.1-.1 0-.2.1-.4.1s-.4.1-.6.2c-.1 0-.2.1-.4.1-.2.1-.4.1-.5.2-.1.1-.2.1-.3.2-.2.1-.3.2-.5.3-.1.1-.2.1-.3.2-.2.1-.3.2-.5.4-.1.1-.2.1-.3.2-.2.2-.4.3-.6.5l-.1.1c-.2.1-.4.4-.6.6zM60 60H11c-3.9 0-7-3.1-7-7s3.1-7 7-7h49v14z"
    />
    <Path
      d="M23 34h6v2h-6zM31 34h11v2H31zM44 34h5v2h-5zM26 38h20v2H26z"
    />
  </Svg>
);

export default SvgComponent;
