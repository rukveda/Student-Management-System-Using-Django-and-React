import { useEffect, useState } from "react";
import axios from 'axios';

function Student() {
  const [id, setId] = useState('');
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [fee, setFee] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://127.0.0.1:8000/student");
    setStudents(result.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    if (!name || !address || !fee) {
      alert("All fields are required!");
      return;
    }
    try {
      await axios.post("http://127.0.0.1:8000/student", {
        name: name,
        address: address,
        fee: fee
      });
      alert("Student Registration Successfully");
      resetForm();
      Load();
    } catch (err) {
      alert("Student Registration Failed");
    }
  }

  async function editStudent(student) {
    setName(student.name);
    setAddress(student.address);
    setFee(student.fee);
    setId(student.id);
  }

  async function DeleteStudent(id) {
    if (!id) {
      alert("Invalid student ID!");
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:8000/student/${id}`);
      alert("Student deleted Successfully");
      resetForm();
      Load();
    } catch (err) {
      alert("Failed to delete student");
    }
  }

  async function update(event) {
    event.preventDefault();
    if (!name || !address || !fee || !id) {
      alert("All fields are required!");
      return;
    }
    try {
      await axios.put(`http://127.0.0.1:8000/student/${id}`, {
        id: id,
        name: name,
        address: address,
        fee: fee
      });
      alert("Student Updated Successfully");
      resetForm();
      Load();
    } catch (err) {
      alert("Student Update Failed");
    }
  }

  function resetForm() {
    setId("");
    setName("");
    setAddress("");
    setFee("");
  }

  return (
    <div>
      <h1>Student Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <label>Student Name</label>
            <input type="text" className="form-control" id="name"
              value={name}
              onChange={(event) => setName(event.target.value)} />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" className="form-control" id="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)} />
          </div>

          <div className="form-group">
            <label>Fee</label>
            <input type="text" className="form-control" id="fee"
              value={fee}
              onChange={(event) => setFee(event.target.value)} />
          </div>

          <div>
            <button className="btn btn-primary mt-4" onClick={save}>Register</button>
            <button className="btn btn-warning mt-4" onClick={update}>Update</button>
          </div>
        </form>
      </div>

      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Address</th>
            <th scope="col">Fee</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <th scope="row">{student.id}</th>
              <td>{student.name}</td>
              <td>{student.address}</td>
              <td>{student.fee}</td>
              <td>
                <button type="button" className="btn btn-warning" onClick={() => editStudent(student)}>Edit</button>
                <button type="button" className="btn btn-danger" onClick={() => DeleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Student;
