import { Button, Card, Table } from "antd";
import React, { useState } from "react";
import useFetchData from "./hooks/useFetchData";
import FormModal from "./formModal";
import { endPoints } from "./endpoints";
import useColumns from "./hooks/useColumns";
import Search from "antd/es/input/Search";

const App = () => {
  // state to control the visibility state of the form modal
  const [open, setOpen] = useState(false);

  const { columns } = useColumns();

  // import your custom hook here
  const { data, loading } = useFetchData(endPoints.getAllStudentClockedIn);

  //state for the search box
  const [searchTerm, setSearchTerm] = useState("");

  function teepiano(sentence){
    let change = sentence.split(" ").map(word =>(
      word[0].toUpperCase() + word.slice(1)
    ))
    return change.join(" ")
  }

  console.log(teepiano("my name is tolulope"));

  const dataSource = Array.isArray(data)
    ? data.map((x, index) => {
      return {
        ...x,
        key: index + 1,
      };
    })
    : [];

  return (
    <div className="min-h-[100svh]">
      <FormModal open={open} setOpen={setOpen} />
      <header className="h-[4rem] outline outline-1 outline-[#c4c4c4] text-3xl flex items-center justify-center font-bold">
        STUDENT REGISTER
      </header>
      <main className="p-10">
        <div className="flex items-center justify-end">
          <Button
            type="primary"
            className="bg-blue-800 px-5 font-semibold"
            onClick={() => setOpen(true)}
          >
            Clock In
          </Button>
        </div>
        <Card className="mt-[2.5rem!important]">
          <Search placeholder="Search Records" className="w-[20rem]" onChange={(e)=>setSearchTerm(e.target.value.toLowerCase())}></Search>
          {console.log(searchTerm)}
          <Table
            bordered
            loading={loading}
            columns={columns}
            dataSource={dataSource.filter((names)=> {
              return names.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            })}
          />
        </Card>
      </main>
    </div>
  );
};

export default App;
