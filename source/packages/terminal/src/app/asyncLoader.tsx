import Loading from '@infra-weigh/loading';
import * as React from 'react';

export default (props: any) => {
  if (props.error) {
    return (
      <h3>
        Could not load content. <button onClick={props.retry}>Retry</button>
      </h3>
    );
  } else if (props.timedOut) {
    return (
      <h2>
        Taking longer than expected...{' '}
        <button onClick={props.retry}>Retry</button>
      </h2>
    );
  } else if (props.pastDelay) {
    return <Loading open={true} setOpen={() => null} />;
  } else {
    return null;
  }
};
