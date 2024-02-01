import React, { useState, useRef, useEffect } from "react";
import Table from "../../base-components/Table";
import { ChevronsRight, ChevronsLeft, Pencil, ArrowUpRight, XCircle } from "lucide-react";
import {
  FormInput, FormLabel
} from "../../base-components/Form";
import { Dialog } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import TomSelect from "../../base-components/TomSelect";
import axios from "axios";
import Alert from "../../base-components/Alert";
import Notification from "../../base-components/Notification";
import { NotificationElement } from "../../base-components/Notification";

 
const Index: React.FC = () => {
//Modal start CREATE TAX SLAB
  
  const [headerFooterModalPreview, setHeaderFooterModalPreview] =
    useState(false);

   
    const basicNonStickyNotification = useRef<NotificationElement>();
    const basicNonStickyNotificationToggle = () => {
      // Show notification
      basicNonStickyNotification.current?.showToast();
    };

  const sendButtonRef = useRef(null);
//Modal end

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

  const PaginationChange = (page: number, pageSize: number) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (
    current: number,
    type: string,
    originalElement: React.ReactNode
  ) => {
    if (type === "prev") {
      return <ChevronsLeft />;
    }
    if (type === "next") {
      return <ChevronsRight />;
    }
    return originalElement;
  };
   
  const [TaxAll, setTaxAll] = useState<any[]>([]);

  const API = "http://localhost:8000/api/v1/master/tax"
  const taxSlabAll = async() => {
    // debugger
    // await  fetch('http://localhost:8001/api/v1/tax').then((res)=> res.json()).then((result)=> console.log(result.data))
    try{
        const res = await axios.get(API);
        // console.log("taxslabres",res)
        const taxslab = await res.data;
        setTaxAll(taxslab.data)
    }
    catch(error){
        console.log("error main", error)
    }
  }

  useEffect(()=>{
    taxSlabAll()
  },[])


 console.log("hap",TaxAll)
  
  const [basicModalPreview, setBasicModalPreview] = useState(false)


  //form state for post data
  const [formData, setFormdata] = useState({
     name : '',
     cgst : '',
     sgst : '',
     igst : ''
  })
  const handleInputChange = (e) => {
     const {name, value} = e.target;
     setFormdata({
       ...formData,
       [name] : value
     })
  }


  const [errorhan, setError] = useState([])
  // errorhan.map((elem) => (
     console.log("elafl", errorhan)   

  // ))
  // const [errortoggle, setErrorToggle] = useState(false)


  const handleSubmit = async(e) => {
    
      e.preventDefault();
      try{
         const response = await axios.post('http://localhost:8001/api/v1/master/tax', formData,{
            headers: {
               'Content-Type' : 'application/json',
            }
         })
         setFormdata({
          name : '',
          cgst : '',
          sgst : '',
          igst : ''
        }) 
        basicNonStickyNotification.current?.showToast();
         setHeaderFooterModalPreview(false);
         setError([])
        //  console.log("responseeee", response)
      }
      catch(error){
console.log(error.response.data.errors, "rrrrrrrr");

        setError(error.response.data.errors)
        // setErrorToggle(true)
        
          
      }
      
      
      taxSlabAll()
        
  }


  // Modal update the data
  const [updatedata, setUpdatedata]= useState({
 
  });
  // const [handleupdate, setHandleUpdate] = useState({...updatedata})

  console.log("updateData", updatedata)
  const handleUpdatedata = async (e) => {
     setError([])
    setUpdatedata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // e.preventDefault();
    // try {
    //   const response = await axios.post("https://jsonplaceholder.typicode.com/posts", formData);
    //   console.log("Post created:", response.data);
    // } catch (error) {
    //   console.error("Error creating post:", error);
    // }
  };

  const handleUpdatesubmit = async(e) =>{
    setError([])
      e.preventDefault();
          try {
            const response = await axios.put(`http://localhost:8001/api/v1/master/tax/${updatedata.id}`, updatedata);
            basicNonStickyNotification.current?.showToast();
         setHeaderFooterModalPreview(false);
            console.log("Post created:", response.data);
          } catch (error) {
            setError([])
            console.error("Error creating post:", error);
          }
          // console.log("ahdndle",updatedata)     
    }



    const removeRequired = () =>{
        //  console.log("click remove")
        setError([])
        setFormdata({
          name : '',
          cgst : '',
          sgst : '',
          igst : ''
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
          <div>
            <h1 className="text-3xl font-bold mb-2 text-center">
                Tax Slab
            </h1>
          </div>
          <div>
          <Button as="a" href="#" variant="primary" onClick={(event: React.MouseEvent)=> {
        event.preventDefault();
        setHeaderFooterModalPreview(true);  
        removeRequired()
        }}
        >Create Tax Slab</Button>


              {/* BEGIN: Modal Content */}
<Dialog open={headerFooterModalPreview} onClose={()=> {
    setHeaderFooterModalPreview(false);
    }}
    initialFocus={sendButtonRef}
    >
    <Dialog.Panel className="md:w-6/12 md:top-10">
        <Dialog.Title className="flex flex-row justify-between">
            
               <div>
                 <h2 className="mr-auto text-base font-medium underline"><strong>CREATE TAX SLAB</strong></h2>
               </div>
               <div>
                 <XCircle className="cursor-pointer" onClick={()=> {
                   setHeaderFooterModalPreview(false);
                }}/>
               </div>
        
           
        </Dialog.Title>
        <form onSubmit={handleSubmit}>
           {
                // errorhan.map((elem) => (
                <>      
                  <Dialog.Description>
                      <div className="mt-3">
                        <FormLabel htmlFor="input-state-3">Name</FormLabel>
                        <FormInput name="name" value={formData.name} onChange={handleInputChange} id="input-state-3" type="text" placeholder="Name" />
                        <small style={{color: "red"}}>
                          {errorhan.map(val => {
                            if(val.path === "name")
                              return val.msg
                          })}
                        </small>
                      </div>
                      <div className="mt-6">
                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-4">
                              <FormLabel htmlFor="input-state-3">CGST</FormLabel>
                              <FormInput name="cgst"  value={formData.cgst} onChange={handleInputChange} type="text" placeholder="CGST" aria-label="default input inline 1" />
                              <small style={{color: "red"}}>
                                {errorhan.map(val => {
                                  if(val.path === "cgst")
                                    return val.msg
                                })}
                              </small>
                            </div>
                            <div className="col-span-4">
                                <FormLabel htmlFor="input-state-3">SGST</FormLabel>
                                <FormInput name="sgst"  value={formData.sgst} onChange={handleInputChange} type="text" placeholder="SGST" aria-label="default input inline 2" />                
                                <small style={{color: "red"}}>
                                  {errorhan.map(val => {
                                    if(val.path === "sgst")
                                      return val.msg
                                  })}
                                </small>
                            </div>
                            <div className="col-span-4">
                              <FormLabel htmlFor="input-state-3">IGST</FormLabel>
                              <FormInput name="igst"  value={formData.igst} onChange={handleInputChange} type="text" placeholder="IGST" aria-label="default input inline 3" />
                              <small style={{color: "red"}}>
                                {errorhan.map(val => {
                                  if(val.path === "igst")
                                    return val.msg
                                })}
                              </small> 
                            </div>
                        </div>
                      </div>
    
                  </Dialog.Description>
                  <Dialog.Footer>
                      <Button onClick={() =>showAlert('Data added successfully')} type="submit" className="w-20 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary">
                          Save
                      </Button>
                  </Dialog.Footer>
                </> 
              // ))
           }
        </form>
    </Dialog.Panel>
</Dialog>
{/* END: Modal Content */}
          </div>
      </div>
      <div className="container-fluid mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body p-0">
               
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
                          NAME
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap border">
                          CGST
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap border">
                          SGST
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap border">
                          IGST
                        </Table.Th>
                        <Table.Th className="whitespace-nowrap border">
                           
                        </Table.Th>
                       
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {
                        TaxAll.map((elem)=>(
                           <Table.Tr>
                              <Table.Td className="border text-center">{elem.id}</Table.Td>
                              <Table.Td className="border text-center">{elem.name}</Table.Td>
                              <Table.Td className="border text-right">{elem.cgst}</Table.Td>
                              <Table.Td className="border text-right">{elem.sgst}</Table.Td>
                              <Table.Td className="border text-right">{elem.igst}</Table.Td>
                              <Table.Td className="border">
                                <Pencil className="cursor" as="a" variant="primary" onClick={()=> {
                                    setUpdatedata(elem);
                                    setBasicModalPreview(true)
                                    } }/> 
                              </Table.Td>
                          
                           </Table.Tr>
                        ))
                      }
                       <Dialog open={basicModalPreview} onClose={()=> {
                            setBasicModalPreview(false);
                            }}
                            >
                            <Dialog.Panel className="p-10 text-center">
                            <form className="max-w-md mx-auto" onSubmit={handleUpdatesubmit}>
                            <div className="mt-3 text-start">
              <FormLabel htmlFor="input-state-3">Name</FormLabel>
              <FormInput name="name" id="input-state-3" value={updatedata.name} onChange={handleUpdatedata} type="text" placeholder="Name" />
          
            </div>
            <div className="mt-6 text-start">
               <div className="grid grid-cols-12 gap-2">
                   <div className="col-span-4">
                     <FormLabel htmlFor="input-state-3">CGST</FormLabel>
                     <FormInput name="cgst" value={updatedata.cgst} onChange={handleUpdatedata} type="text" placeholder="CGST" aria-label="default input inline 1" />
                   </div>
                   <div className="col-span-4">
                      <FormLabel htmlFor="input-state-3">SGST</FormLabel>
                      <FormInput name="sgst" value={updatedata.sgst} onChange={handleUpdatedata} type="text" placeholder="SGST" aria-label="default input inline 2" />                
                   </div>
                   <div className="col-span-4">
                     <FormLabel htmlFor="input-state-3">IGST</FormLabel>
                     <FormInput name="igst" value={updatedata.igst} onChange={handleUpdatedata} type="text" placeholder="IGST" aria-label="default input inline 3" />
                   </div>
              </div>
            </div>
            <Dialog.Footer>
            <Button type="submit" onClick={() =>showAlert('Data updated successfully')} className="w-20 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary">
                Update
            </Button>
        </Dialog.Footer>         
                                  </form>     
                            </Dialog.Panel>
                        </Dialog>
                    </Table.Tbody>
                  </Table>
                  
                  
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div>
      </div>
    </div>

    </>
  );
};

export default Index;