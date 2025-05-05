"use client"

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoMdCloseCircleOutline } from 'react-icons/io';

interface EditUserProps {
  userID: number;
  onClose: () => void;
}

function EditUser({ onClose, userID }: EditUserProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    job_title: "",
    fname: "",
    lname: "",
    group_id: 0,
    role_id: 0
  });

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [jobtitle, setJobTitle] = useState('');
  const [group_id, setGroupid] = useState(0);
  const [role_id, setRoleid] = useState(0);

  const [roles, setRoles] = useState<{ role_id: number; name: string }[]>([]);
  const [groups, setGroups] = useState<{ group_id: number; name: string }[]>([]);

  useEffect(() => {
    if (!userID) return;

    fetch("http://127.0.0.1:8000/users/role")
      .then(response => response.json())
      .then(data => setRoles(data))
      .catch(error => console.error('Error fetching roles', error));

    fetch("http://127.0.0.1:8000/users/groups")
      .then(response => response.json())
      .then(data => setGroups(data))
      .catch(error => console.error('Error fetching groups', error));

    fetch(`http://127.0.0.1:8000/users/user/info/${userID}`)
      .then(response => response.json())
      .then(data => {
        setUserInfo(data);
        setFirstname(data.fname);
        setLastname(data.lname);
        setEmail(data.email);
        setUsername(data.username);
        setJobTitle(data.job_title);
        setGroupid(data.group_id);
        setRoleid(data.role_id);
      })
      .catch(error => console.error('Error fetching user info', error));
  }, [userID]);

  const handleEdit = async () => {
    if (!firstname || !lastname || !email || !group_id || !role_id) {
      setErrorMessage("Please fill in all the required fields");
      return;
    }

    const updatedFields: { [key: string]: unknown } = {};

    if (firstname !== userInfo.fname) updatedFields.fname = firstname;
    if (lastname !== userInfo.lname) updatedFields.lname = lastname;
    if (email !== userInfo.email) updatedFields.email = email;
    if (jobtitle !== userInfo.job_title) updatedFields.job_title = jobtitle;
    if (group_id !== userInfo.group_id) updatedFields.group_id = Number(group_id);
    if (role_id !== userInfo.role_id) updatedFields.role_id = Number(role_id);

    if (Object.keys(updatedFields).length === 0) {
      setErrorMessage("No changes made");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/users/edit/user/${userID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("");
        alert("User updated successfully!");
        onClose();
        window.location.reload();
      } else {
        setErrorMessage(data.detail || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white w-3/5 rounded-lg shadow-lg p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
          <IoMdCloseCircleOutline className="text-2xl" />
        </button>

        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-center mb-8">View User</h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fname">First Name</Label>
              <Input type="text" id="fname" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="lname">Last Name</Label>
              <Input type="text" id="lname" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input type="text" id="username" placeholder="Username" value={username} readOnly />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Password" value="********" disabled />
            </div>
            <div>
              <Label htmlFor="jobtitle">Job Title</Label>
              <Input type="text" id="jobtitle" placeholder="Job Title" value={jobtitle ?? ""} onChange={(e) => setJobTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="group">Groups</Label>
              <select id="group" className="w-full p-2 border rounded" value={group_id} onChange={(e) => setGroupid(Number(e.target.value))}>
                <option>Select Group</option>
                {groups.map((group) => (
                  <option key={group.group_id} value={group.group_id}>{group.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <select id="role" className="w-full p-2 border rounded" value={role_id} onChange={(e) => setRoleid(Number(e.target.value))}>
                <option>Select Role</option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-center font-semibold mt-4">{errorMessage}</div>
          )}

          <div className="flex justify-end mt-16 ">
            <Button className="w-1/3" onClick={handleEdit}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;