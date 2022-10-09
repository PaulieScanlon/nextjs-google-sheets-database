import React, { useState } from 'react';

const Page = () => {
  const [response, setResponse] = useState(null);

  const handlePost = async () => {
    try {
      const response = await fetch('/api/some-endpoint?name=Paul');
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  return (
    <div>
      <button onClick={handlePost}>Post</button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};

export default Page;
