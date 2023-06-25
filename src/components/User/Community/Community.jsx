import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi';
import GroupCard from './GroupCard/GroupCard';
import Button from '../Button/Button';

function Community({isTab}) {
    const [showModal, setShowModal] = useState(false);
    const joinedCommunity =[]
    const user ={
        email:'af'
    }
    const communitys = []
  return (
    <div className={`w-full ${isTab ? "px-2 py-0" : "border-x px-5 py- sm:px-8"} border-x px-5 py-3 sm:px-8 border-base-300 `} >
            {/* community user have joinde */}
            {/* {user.id && joinedCommunity.length > 0 ?
                <>
                    <div className='flex justify-between items-center mb-5'>
                        <h1 className='text-xl font-bold sm:text-2xl'>Your Community</h1>
                        {user.email ?
                            <Button onClick={() => { setShowModal(true) }} >
                                <div className="flex justify-center items-center"
                                    data-te-toggle="modal"
                                    data-te-target="#editCourse"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    <BiPlus size={22} /> <span className='ml-4 hidden md:flex'>Create New</span>
                                </div>
                            </Button>
                            : null}
                    </div>
                    {loading ?
                        <Loader />
                        :
                        <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                joinedCommunity.map((community) => (
                                    <GroupCard key={community._id} community={community} joined={true} />
                                ))
                            }
                        </div>
                    }
                </>
                : ""} */}


            {/* list of all community */}
            <div className='pb-16 bg-red-800'>
                <div className='flex justify-between items-center  mb-5'>
                    <h1 className='text-xl font-bold sm:text-2xl'>Explore Community</h1>
                    {joinedCommunity.length == 0 ?
                    <>
                        {user.email ?
                            <Button onClick={() => { setShowModal(true) }} >
                                <div className="flex justify-center items-center"
                                    data-te-toggle="modal"
                                    data-te-target="#editCourse"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    <BiPlus size={22} /> <span className='ml-4 hidden md:flex'>Create New</span>
                                </div>
                            </Button>
                            : null}
                    </>
                    :""}
                </div>

                {communitys.length > 0 ?
                    <div className="my-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <>
                            {communitys.map((community) => (
                                <GroupCard key={community._id} joinedStatus={yourCommunity && yourCommunity.includes(community._id)} community={community} handleJoin={handleJoin} />
                            ))}
                        </>

                    </div>
                    :
                    <div className='mt-16 sm:mt-0 flex-col flex justify-center items-center '>
                        <img className='max-w-[400px] lg:max-w-[600px] ' src="/assets/images/community-empty.gif" alt="" />
                        <h1>No Community found</h1>
                    </div>
                }
            </div>
            {/* {showModal ? <AddCommunityModal loadAllCommunityDetails={loadAllCommunityDetails} loadJoinedCommunity={loadJoinedCommunity} close={() => { setShowModal(false) }} /> : null} */}
        </div>
  )
}

export default Community
