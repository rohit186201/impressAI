import React, { useEffect, useState } from "react";
import InputHandler from "./commonInput";
import SimpleTable from "./simpleTable";
import { Modal, Form, Input, Button } from "antd";
import initiateDB from "../db/initDB";

const { addUser, getUsers, editUser, deleteUser } = initiateDB();
const { confirm } = Modal;

function MainComponent(props) {
  const [userState, setUserState] = useState({ users: [] });
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const users = await getUsers();
    setUserState({ users });
  };

  const handleAddUser = async ({ name, email }) => {
    await addUser({ name, email });
    fetchUsers(); // Refresh the list after adding a user
  };

  const handleEditUser = async (values) => {
    await editUser(editingUser.id, values);
    setEditingUser(null);
    setIsModalVisible(false);
    fetchUsers(); // Refresh the list after editing a user
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchUsers(); // Refresh the list after deleting a user
  };

  const showEditModal = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDeleteUser(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  return (
    <div id="main-container-wrapper">
      <InputHandler onSubmit={handleAddUser} />
      <SimpleTable
        dataSource={userState.users}
        onEdit={showEditModal}
        onDelete={showDeleteConfirm}
      />
      {isModalVisible && (
        <Modal
          title="Edit User"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            initialValues={editingUser}
            onFinish={handleEditUser}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input the email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default MainComponent;
