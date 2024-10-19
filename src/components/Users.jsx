import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Users = () => {
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                isMounted && setUsers(response?.data?.map(user => user.username));
            } catch (error) {
                if (error.name === "CanceledError") {
                    console.log("Request canceled", error.message);
                } else {
                    console.log(error, 'Users Error');
                    navigate('/login', { state: { from: location }, replace: true });
                }
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [])

    return (
        <article>
            <br />
            <h3>Users List</h3>
            {users?.length ?
                <ul>
                    {users.map((user, i) => <li key={i}  >{user}</li>)}
                </ul>
                : <p>No users to display</p>
            }
        </article>
    )
}

export default Users