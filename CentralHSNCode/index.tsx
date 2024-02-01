import React, { useState, useRef, useEffect } from "react";
import Table from "../../base-components/Table";
import { ChevronsRight, ChevronsLeft, Pencil, ArrowUpRight, XCircle } from "lucide-react";
import {
  FormInput,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import axios from "axios";
import Notification from "../../base-components/Notification";
import { NotificationElement } from "../../base-components/Notification";





const Index: React.FC = () => {
  const datatableUsers = [
    {
      id: 1,
      hsncode : 12345
    },
    {
        id: 2,
        hsncode : 12345
    },
    {
        id: 3,
        hsncode : 12345
    },
    {
        id: 4,
        hsncode : 12345
    },
    {
        id: 5,
        hsncode : 12345
    },
    {
        id: 6,
        hsncode : 12345
    }

  ]; // Your data here



  const [perPage, setPerPage] = useState<number>(10);
  const [size, setSize] = useState<number>(perPage);
  const [current, setCurrent] = useState<number>(1);

  const PerPageChange = (value: number) => {
    setSize(value);
    const newPerPage = Math.ceil(datatableUsers.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const getData = (current: number, pageSize: number) => {
    return datatableUsers.slice((current - 1) * pageSize, current * pageSize);
  };

  // Form tom
  const [select, setSelect] = useState("");

  const [hsnAll, setHsnAll] = useState<any[]>([]);

  const API = "http://localhost:8000/api/v1/master/hsn"
  const hsnCode = async() => {
    // debugger
    // await  fetch('http://localhost:8001/api/v1/tax').then((res)=> res.json()).then((result)=> console.log(result.data))
  
     const res = await axios.get(API);
     const hsn = await res.data;
    setHsnAll(hsn.data)
  }

  useEffect(()=>{
      hsnCode()
  },[])


  const [hsn_code, setHsn_code] = useState("");

  const [hsnerror, setHsnError] = useState([])
  const basicNonStickyNotification = useRef<NotificationElement>();
  const basicNonStickyNotificationToggle = () => {
    // Show notification
    basicNonStickyNotification.current?.showToast();
  };

const sendButtonRef = useRef(null);  
 console.log("hsnerror",hsnerror)
  const submitHsn = async() => {
    // event.preventDefault();
   
    await axios.post('http://localhost:8000/api/v1/master/hsn',{
       hsn_code:hsn_code
    }).then((res)=>
    
    {
      if(res){
        basicNonStickyNotification.current?.showToast();

        // alert("Success")
      }
      hsnCode()
      
    })
    
    .catch((err)=>{
      if(err){
        // err.map((elem) => (
        //     console.log(elem)
        // ))
        setHsnError(err.response.data.errors)
        // alert("Please Enter Details")
      }
    })
  }

   // For alert
   const [alert, setAlert] = useState({
    show : false,
    message : ''
  })

  const showAlert = (message) => {
      setAlert({
        show : true,
        message
      })
    
  }

  return (
    <>
     <div>
      <Notification getRef={(el)=> {
        basicNonStickyNotification.current = el;
        }}
        options={{
                    duration: 1000,
          
                  }}
                       className="flex flex-col sm:flex-row"
        >
        {alert.show && <a className="mt-1 font-medium text-primary dark:text-slate-400 sm:mt-0" href="">
             {alert.message}
        </a>}
    </Notification>
    </div>
    <div className="w-full max-w-6xl mx-auto mt-8 p-8 md:p-10 lg:p-12 bg-white rounded-lg shadow-lg">
      
    <div className="flex flex-row justify-between">
          <div className="w-[40%]">
            <h1 className="text-3xl font-bold mb-2 text-start">
                HSN CODE
            </h1>
          </div>
          <div className="w-[50%] flex"> 
             <div>
                <div>
                    
                </div>
                <div>
                  
                </div> 
             </div>
             <div className="flex flex-col">
               <div>
                 <FormInput id="regular-form-1" value={hsn_code} name = "hsn_code" onChange={(e)=> setHsn_code(e.target.value)} className="mr-2" type="text" placeholder="Write HSN Code here......." />
               </div>
               <div>
                   <small style={{color: "red"}}>{hsnerror.map(val => {
                                  if(val.path === "hsn_code")
                                    return val.msg
                                })}</small>
            
               </div>
             </div>
            
            <Button as="a" href="#" className="w-[50%] h-fit" variant="primary" onClick={()=>{submitHsn(), showAlert("Data Updated Successfully")}}>Create HSN Code</Button>
          </div>
      </div>
      <div className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-filter-info">
                  {/* <Pagination
                    className="pagination-data"
                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                    onChange={PaginationChange}
                    total={datatableUsers.length}
                    current={current}
                    pageSize={size}
                    showSizeChanger={false}
                    itemRender={PrevNextArrow}
                    onShowSizeChange={PerPageChange}
                  /> */}
                </div>
                <div className="overflow-x-auto">
                  <Table className="table table-text-small mb-0 border">
                    <Table.Thead
                      variant="dark"
                      className="thead-primary table-sorting bg-primary"
                    >
                      <Table.Tr className="text-center ">
                        <Table.Th className="whitespace-nowrap border">
                          #
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap border">
                          HSN Code
                        </Table.Th>
                        
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {
                        hsnAll.map((elem)=> (
                           <Table.Tr>
                              <Table.Td className="border text-center">{elem.id}</Table.Td>
                              <Table.Td className="border text-right">{elem.hsn_code}</Table.Td>
                           </Table.Tr>
                        ))
                      }
                      {/* {getData(current, size).map((data, index) => (
                        <Table.Tr
                          key={data.id}
                          className={`text-center ${
                            index % 2 === 1 ? "bg-slate-100" : ""
                          } hover:bg-slate-300`}
                        >
                          <Table.Td className="border">{data.id}</Table.Td>
                          
                          <Table.Td className="border">
                            {data.hsncode}
                          </Table.Td>
                          
                        </Table.Tr>
                      ))} */}
                    </Table.Tbody>
                  </Table>
                </div>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Index;