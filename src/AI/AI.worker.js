import run from './AI.impl';

onmessage = (e) => {
  postMessage(run(e.data));
};

export default this;
