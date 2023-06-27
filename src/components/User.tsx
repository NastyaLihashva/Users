import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import client from '../apollo/client';

const GET_USER = gql`
    query Users($id: ID!){
        user(id: $id){
            id
            name
            username
            email
            address{
                city
                street
            }
            phone
            company{
                name
            }
        }
    }
`;


function User() {
    const userStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '700px',
      margin: '0 auto',
      padding: '20px',
    }
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_USER, {
      variables: { id },
    }, );
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    const user = data.user;
  
    return (
      <div style={userStyle}>
        <h1 style={{textTransform: 'uppercase'}}>Information about User {user.id}</h1>
        <div style={{margin: '20px 0 0 0', width: '500px', borderRadius: '5px', backgroundColor: 'white', fontSize: '24px'}}>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address.city}, {user.address.street}</p>
          <p>Phone: {user.phone}</p>
          <p>Company: {user.company.name}</p>
        </div>
      </div>
    );
}

export default User;