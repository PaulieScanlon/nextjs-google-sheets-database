'use client';

import someAction from './some-action';

export default function Page() {
  return (
    <button className='text-white' onClick={() => someAction('123')}>
      Click Me
    </button>
  );
}
