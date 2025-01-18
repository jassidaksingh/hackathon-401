import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Responses = () => {
  const { applicationId } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/responses/${applicationId}/`)
      .then((res) => res.json())
      .then((data) => setResponses(data));
  }, [applicationId]);

  return (
    <div>
      <h1>Responses</h1>
      <Link to="/responses/create">Add New Response</Link>
      <ul>
        {responses.map((response) => (
          <li key={response.id}>
            {response.response_type} on {response.response_date}
            <p>{response.comments}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Responses;
