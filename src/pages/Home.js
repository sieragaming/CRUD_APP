import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState();
  const history = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:5000/user`);
      const user = await res.json();
      setUsers(user);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/user/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedUsers = users.filter((user) => user._id !== id);
        setUsers(updatedUsers);
        history("/",{replace:true});
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className='my-2'>
    <Link to="Add" className='btn btn-success my-2'>
      <i className='fas fa-folder-plus me-2'></i>Tambah user
    </Link>
    <table className="table table-bordered my-2">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Gambar</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td><center><img src={user.avatar} width={100} height={'auto'} alt="" /></center></td>
            <td>
              <Link to={`/edit/${user._id}`} className='btn btn-primary my-2'>
                <i className='fas fa-edit me-2'></i>Edit
              </Link>
              <button onClick={() => handleDelete(user._id)} className='btn btn-danger ms-2'><i className='fas fa-trash me-1'></i>Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
  );
};

export default Home;