import React, {useState, useEffect} from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import User from './User';

type Users = {
    id: string;
    name: string;
    email: string;
  };

const GET_USERS = gql`
  query Users{
    users {
      data {
        id
        name
        email
      }
    }
  }
`;

const DELETE_USER = gql`
    mutation deleteUser($id: ID!){
        deleteUser(id: $id)
    }
`;

function Users() {
    const listItemStyle: React.CSSProperties = {
        border: '1px solid gray',
        padding: '10px',
        margin: '10px',
        minWidth: '600px',
        maxWidth: '600px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const listStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        listStyle: 'none',
        overflow: 'hidden',
        maxWidth: '100%',
        flexWrap: 'wrap'
    };

    const linkStyle: React.CSSProperties = {
        textDecoration: 'none',
        color: '#333'
    }

    const headerStyle: React.CSSProperties = {
        fontSize: '36px',
        textTransform: 'uppercase'
    }

    const inputStyle: React.CSSProperties = {
        width: '250px',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '16px',
        outline: 'none'
    }

    const [searchQuery, setSearchQuery] = useState('');
    //const [users, setUsers] = useState<Users[]>([]);
    const { loading, error, data, refetch } = useQuery(GET_USERS);
    const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
    const [deleteUser] = useMutation(DELETE_USER, {
        refetchQueries: [{ query: GET_USERS }], 
      });
    

    useEffect(() => {
        if (data && data.users && data.users.data) {
          setFilteredUsers(
            data.users.data.filter((user: Users) =>
              user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        }
    }, [data, searchQuery]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    const handleDeleteUser = async(id: string) => {
        try{
            const { data } = await deleteUser({ variables: { id } });
            if (data.deleteUser === true) {
                console.log('ok');
                //refetch();
                //setUsers(users.filter(user => user.id !== id));
                setFilteredUsers(filteredUsers.filter(user => user.id !== id));
            }
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div>
        <h1 style={headerStyle}>Users</h1>
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users"
            style = {inputStyle}
        />
        <ul style={listStyle}>
            {filteredUsers.map((user: Users) => (
            <li key={user.id}  style={listItemStyle}>
                <Link to={`/user/${user.id}`} style={linkStyle}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </Link>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
            ))}
        </ul>
        </div>
    );
}

export default Users;
