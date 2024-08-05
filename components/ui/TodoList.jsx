import React from 'react';
import { IoShareSocialOutline } from 'react-icons/io5';
import { useCopyToClipboard } from 'usehooks-ts';
import { IoSearchOutline } from 'react-icons/io5';
export default function TodoList({ sharedUserFullName = "", ownerUserId="", loading=false, todoListData }) {
  
  const [copiedText, copy] = useCopyToClipboard();
  const handleCopy = () => {
    const shareLink = `${"todoList공유할 링크"}/share/${ownerUserId}`
    copy(shareLink)
    .then(()=>{
      window.alert(`공유링크 복사완료 \n${shareLink}`)
    })
    .catch((error)=>{
      console.error("실패", error);
    })
  };
  
  return (
    <section className=' min-h-[70vh] bg-[aqua] '>
      <div className=' w-full max-w-[800px] p-[20px] mx-auto '>
        <article className=' flex flex-row justify-between items-center '>
          <div className=' font-bold text-[32px]'>
            {sharedUserFullName && <div>{sharedUserFullName}</div>}
            things to do:
            </div>
          {ownerUserId && (
            <div 
              onClick={() => handleCopy()}
              className=' font-bold text-[32px] flex flex-row items-center cursor-pointer'>
              Share
              <IoShareSocialOutline />
            </div>
          )}
        </article>
        <article className=' flex flex-col sm:flex-row gap-4 mt-8'>
          <div className=' flex flex-1 h-[60px]'>
            <input className='p-4 flex-1 bg-[#fff] border border-black rounded-l-2xl font-bold' type="text" />
            <div flex justify-center items-center bg-black rounded-r-2xl cursor-pointer>
              <IoSearchOutline size={40} color='#fff'/>
            </div>
            <div className='h-[60px] w-[200px] flex justify-center items-center bg-[#7EBB95] border 
            border-black rounded-2xl font-bold cursor-pointer text-[20px]'> 
            </div>
          </div>
        </article>
        <div>
          {todoListData?.length >= 1 ? (
            <ul>
              
            </ul>
          ) }
        </div>
      </div>
      </section>
  );
}
