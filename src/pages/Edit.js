import { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams()
  const history = useNavigate();
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  useEffect(() => {
    fetch(`http://localhost:5000/user/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);

      const res = await fetch(`http://localhost:5000/user/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        setData({ name: "", image: "" });
        history("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='mt-2 pt-2'>
      <Link to="/" className='btn btn-warning my-2'>
        <i className='fas fa-arrow-left me-2'></i>Back
      </Link>
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className='mb-2'>Nama Data </label>
                  <input className="form-control" type="text" name="name" value={data.name} onChange={handleChange("name")} />
                </div>
                <div className="mb-3">
                  <label className='mb-2'>Upload Data Gambar </label>
                  <input className="form-control" type="file" accept="image/*" name="image" onChange={handleChange("image")} />
                </div>
              </div>
              <div className="mt-3 mb-0">
                <div className="d-grid"><button className="btn btn-primary btn-block">Submit</button></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditUser;