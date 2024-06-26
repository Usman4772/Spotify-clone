"use client"
import React, { useContext } from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { GlobalContext } from '../context';


function AddBtn() {
const {setOpenSongsModel,setShowPlaylsitForm}=useContext(GlobalContext)
  const items = [
    {
      key: '1',
      label: (
        <button className='flex items-center justify-center gap-4' onClick={()=>setOpenSongsModel(true)}>
          Add song <HiOutlinePlusSm/>
        </button>
      ),
    },
    {
      key: '2',
      label: (
        <button className='flex items-center justify-center gap-4' onClick={()=>setShowPlaylsitForm(true)} >
          Add playlist <HiOutlinePlusSm/>
        </button>
      ),
    }
   
  ];
return (
  <Dropdown menu={{ items }} placement="bottomRight" >
        <HiOutlinePlusSm className="text-neutral-400 text-lg hover:text-white transition cursor-pointer"/>
      </Dropdown>
)
    
}

export default AddBtn;