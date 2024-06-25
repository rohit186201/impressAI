import React from "react";
import { Table, Button } from "antd";

const SimpleTable = ({ dataSource, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
          <Button type="link" onClick={() => onDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "20px", width:'60%', marginLeft:'20%' }}>
      {dataSource.length ? (
        <Table dataSource={dataSource} columns={columns} rowKey="id" />
      ) : (
        <div>No user data</div>
      )}
    </div>
  );
};

export default SimpleTable;
