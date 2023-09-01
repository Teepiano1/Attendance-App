import { Button } from 'antd';
import React from 'react'
import useFormPost from './useFormPost';

const useColumns = () => {
  const { clockOut } = useFormPost();
  const columns = [
    {
      title: "SN",
      dataIndex: "key",
      key: "1",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "2",
    },
    {
      title: "LGA",
      dataIndex: "lga",
      key: "3",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "4",
    },
    {
      title: "Time In",
      dataIndex: "",
      key: "5",
      render: (_, record) => {
        return (
          <p>
            {record.timeIn}
            {parseInt(record.timeIn?.split(":")[0]) >= 12 ? "pm" : "am"}
          </p>
        );
      },
    },
    {
      title: "Time Out",
      dataIndex: "",
      key: "50",
      render: (_, record) => {
        return (
          <p>
            {record.timeOut ? record.timeOut : "Clocked in"}
            {record.timeOut
              ? parseInt(record.timeOut?.split(":")[0]) >= 12
                ? "pm"
                : "am"
              : null}
          </p>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "6",
      width: "100px",
      render: (_, record) => {
        return (
          <Button
            type="primary"
            onClick={() => clockOut(record)}
            disabled={record.isClockedIn ? false : true}
            className="bg-blue-800 px-5 font-semibold"
          >
            Clock Out
          </Button>
        );
      },
    },
  ];

  return {
    columns
  }
}

export default useColumns