import React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    id="prefix__Layer_1"
    x={0}
    y={0}
    viewBox="0 0 28 44"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <Path
      d="M17.9 29c-.6-.2-1.3-.3-2.1-.3-1.5 0-3 2.3-5.4 1.8-.4-.1-.7-.2-.9-.3-1.4 2.4-2.8 4.7-3.4 5.8-.2.4 0 1 .4 1.1 1.3.4 4.2.6 7.5.6s6.1-.3 7.4-.6c.5-.1.7-.7.4-1.1-.6-1.3-2.3-4.2-3.9-7z"
    />
    <Path
      d="M25.3 29.9c-.5-.4-1.1-.6-1.7-.4-.2.1-.3.3-.3.6.1.2.3.4.5.3.3-.1.6 0 .8.2.3.2.4.5.4.8 0 .4-.4.8-.8.9-.4.2-.9.1-1.4-.1-.9-.4-1.8-1.4-1.6-2.5.1-.5.4-1 .7-1.6.4-.6.8-1.2.8-2 .2-1.4-.9-2.8-2.2-3-1.2-.2-2.4.7-2.8 1.9-.3-.6-.5-1.1-.5-1.2v-7.7c.9-.5 1.4-1.1 1.4-1.7 0-1.3-2.1-2.3-4.6-2.3-2.3 0-4.6.9-4.6 2.3 0 .7.5 1.2 1.4 1.7V24c0 .1-.3.5-.6 1.2-.3-1.2-1.6-2.2-2.8-2-1.3.2-2.4 1.6-2.2 3 .1.8.5 1.4.8 2 .3.5.6 1 .7 1.6.2 1.1-.7 2.1-1.6 2.5-.5.2-1 .2-1.4.1-.4-.2-.7-.5-.8-.9 0-.3.1-.6.4-.8.3-.2.6-.3.8-.2.2.1.5 0 .5-.3.1-.2 0-.5-.3-.6-.5-.2-1.2-.1-1.7.4-.5.4-.7 1-.7 1.6.1.7.6 1.4 1.4 1.7.3.1.6.2.9.2.4 0 .8-.1 1.1-.2l.6-.3c-.8 1.4-1.5 2.7-1.9 3.4-.1.1-.2.6 0 1s.5.7.9.8c1.7.5 5.3.8 9.2.8s7.4-.3 9.1-.8c.4-.1.7-.4.9-.8.2-.4.1-.8-.1-1.2-.4-.7-1.1-1.9-1.9-3.3.1.1.3.2.5.2.4.1.8.2 1.1.2.3 0 .6-.1.9-.2.7-.3 1.3-.9 1.4-1.7.1-.5-.2-1.1-.7-1.5zm-4.8-3.5c-.2-.1-.5 0-.6.2s-.2.2-.3.3c-.2.1-.4 0-.6-.1-.3-.2-.5-.7-.4-1.2.1-.9 1-1.6 1.9-1.5s1.6 1.1 1.5 2c-.1.6-.4 1.1-.7 1.6-.4.6-.7 1.2-.8 1.9v.3c-.4-.7-.8-1.4-1.1-2 .2 0 .4 0 .6-.1.4-.1.7-.4.9-.8 0-.3-.1-.5-.4-.6zM6 26.1c-.1-.9.6-1.9 1.5-2s1.8.6 1.9 1.5c.1.5-.1 1-.4 1.2-.2.1-.4.1-.6.1-.1 0-.3-.1-.3-.3-.1-.2-.3-.3-.6-.2-.2.1-.3.4-.2.6.1.4.5.7.9.8.2.1.4.1.7.1L7.7 30v-.3c-.1-.7-.5-1.3-.8-1.9-.5-.7-.9-1.2-.9-1.7zm17.3 11c-.1.1-.2.3-.3.3-1.6.5-5.1.8-8.9.8s-7.4-.3-9-.8c-.2 0-.3-.2-.3-.3s-.1-.3 0-.4c.5-.8 6.5-11.7 6.8-12.1.3-.5.2-.8.2-1v-7.7c0-.2-.1-.3-.2-.4-.7-.5-1.4-.6-1.4-1 0-.6 1.7-1.5 3.8-1.5s3.7.8 3.7 1.5c0 .3-.3.7-1.2 1-.2.1-.2.2-.2.4v7.7c0 .6 0 .8.1 1s6.3 11.3 6.8 12.1c.2.1.2.2.1.4z"
    />
    <Circle cx={13.3} cy={27.8} r={1} />
    <Circle cx={14.4} cy={16} r={1} />
    <Circle cx={12.1} cy={9.2} r={2} />
    <Circle cx={15.4} cy={24.1} r={0.5} />
    <Circle cx={14.1} cy={20.6} r={0.5} />
    <Circle cx={15.1} cy={6} r={1} />
  </Svg>
);

export default SvgComponent;
