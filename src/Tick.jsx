import { useMemo } from 'react';
import Lottie from "lottie-react";

import animationData from './assets/animation_lno4ssya.json';

function TickMark() {

  return (
    <div className='fullScreenLoaderWrapper'>
      <Lottie animationData={animationData} />
    </div>
  );
}
export default TickMark
