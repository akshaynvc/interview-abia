import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
type UserList = {
  id: string;
  name: string;
};
const UserManagement = () => {
  const [userList, setUserList] = useState<any>(() => {
    const savedUsers = localStorage.getItem("userList");
    if (savedUsers) {
      return JSON.parse(savedUsers);
    } else {
      return [];
    }
  });
  const [user, setUser] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(userList));
  }, [userList]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user !== "") {
      setUserList([
        ...userList,
        {
          id: userList.length + 1,
          name: user.trim(),
        },
      ]);
    }
    setUser("");
  };

  const handleEditing = (e: any) => {
    setCurrentUser({
      ...currentUser,
      name: e.target.value,
    });
  };
  const handleUpdateUser = (id: any, updateUser: any) => {
    const updatedItem = userList.map((e: any) => {
      return e.id === id ? updateUser : e;
    });
    setIsEditing(false);
    setUserList(updatedItem);
  };

  const handleEditForm = (e: FormEvent<HTMLFormElement>, id: any) => {
    e.preventDefault();
    handleUpdateUser(id, currentUser);
  };

  const HandleEditClick = (user: any) => {
    setIsEditing(true);
    setCurrentUser({ ...user });
  };
  const deleteUSer = (id: string) => {
    const filteredArray = userList.filter((e: UserList) => e.id !== id);
    setUserList(filteredArray);
  };
  return (
    <Fragment>
      {isEditing ? (
        <Box
          component={"form"}
          onSubmit={(e) => handleEditForm(e, currentUser?.id)}
        >
          <TextField
            label="Edit User"
            type="text"
            placeholder="Edit User"
            value={currentUser?.name}
            onChange={handleEditing}
          />
          <Button type="submit">Update</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{ display: "flex", width: "80%", margin: "1rem" }}
          >
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              placeholder="User"
              value={user}
              onChange={(e: any) => setUser(e.target.value)}
            />
            <Button
              size="medium"
              variant="outlined"
              type="submit"
              sx={{ marginLeft: ".5rem" }}
            >
              ADD
            </Button>
          </Box>
          <Box component={"ul"}>
            {userList?.map((e: UserList, i: number) => (
              <Box key={e.name} sx={{ padding: "1rem" }}>
                <Box component={"li"}>
                  {e.name}
                  <Button
                    variant="outlined"
                    sx={{ margin: "0 1rem" }}
                    onClick={() => HandleEditClick(e)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ margin: "0 1rem" }}
                    onClick={() => deleteUSer(e.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default UserManagement;
