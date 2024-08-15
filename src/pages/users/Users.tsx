import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query
const GET_ALL_NODES = gql`
  query GetAllNodes {
    getAllNodes {
      uuid
      labels
      properties {
        key
        value
      }
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery(GET_ALL_NODES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>All Nodes</h2>
      {data.getAllNodes.map((node: any) => (
        <div key={node.uuid} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
          <h3>Node UUID: {node.uuid}</h3>
          <p>Labels: {node.labels.join(', ')}</p>
          <div>
            <h4>Properties:</h4>
            <ul>
              {node.properties.map((property: any, index: number) => (
                <li key={index}>
                  {property.key}: {property.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
