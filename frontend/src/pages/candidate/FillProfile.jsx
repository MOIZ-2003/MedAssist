import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import Logo from "../../assets/logo-t.png";
import { toast, Toaster } from "react-hot-toast";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from "axios";
import { DotPulse } from "@uiball/loaders";
import { useNavigate } from "react-router-dom";

import { Chip } from "@mui/material";


export default function FillProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [candidateId, setcandidateId] = useState(location.state.candidateId);
    const [password, setpassword] = useState(location.state.candidatepass);
    console.log(candidateId,password);


    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [parsed, setParsed] = useState(null);

    const [skills, setSkills] = useState([]);
    const [current, setCurrent] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [qualification, setQualification] = useState("");
    const [passingYear, setPassingYear] = useState("");
    const [institute, setInstitute] = useState("");
    
    
    const parsePdf = async () => {


        if (file == null) {
            toast.error("File is not selected");
        }
        else {
            setLoading(true);
            let formData = new FormData();
            formData.append("candidateId",candidateId);
            formData.append("resume", file);
            try {
                let res;

                res = await axios.post(
                    `http://localhost:5000/candidate/uploadresume`
                    , formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                )
                toast.success("File sent");

                // if(res.data)
                // {
                //     navigate("/fill-profile");
                // }
                console.log(res.data.slice(0, -1).replaceAll(`'`, `"`).replaceAll("(", "").replaceAll(")", ""));
                let temp =JSON.parse(res.data.slice(0, -1).replaceAll(`'`, `"`).replaceAll("(", "").replaceAll(")", ""));
                setParsed(temp);
                console.log(parsed);
                console.log(temp['Skills']);
                setLoading(false);
                setSkills(temp['Skills']);
                setEmail(temp['Email']);
                setPhone(temp['Phone Number']);
                setName(temp['Name']);
                setQualification(temp['Qualification'][0]);
                setPassingYear(temp['Qualification'][1]);
                setInstitute(temp['Institutes'][0]);

            } catch (ex) {
                console.log(ex);
            }
        }

    }

    const UploadData = async () => {

        if(!email)
        {
            toast.error("Email id is required");
        }
        else if(!phone)
        {
            toast.error("Phone is required");
        }
        else if(!name)
        {
            toast.error("Please enter name");
        }
        else if(!qualification)
        {
            toast.error("Please enter qualification");
        }
        
        else if(!passingYear)
        {
            toast.error("Please enter instit");
        }
        
        else if(!institute)
        {
            toast.error("Please enter institute name");
        }
        else
        {

            let formData = new FormData();
            formData.append("email",email);
            formData.append("password",password);
            formData.append("name",name);
            formData.append("qualification",qualification);
            formData.append("skills",skills);
            formData.append("institute",institute);
            formData.append("passingYear",passingYear);
            formData.append("type","candidate");
            try
            {
              let res;
              
                res = await axios.post(
                  `http://localhost:5000/auth/saveCandidate`
                  ,formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                    }
                );
              

                if(res.data)
                {
                    toast.success("Signed Up");
                    setTimeout(() => {
                        navigate('/');
                      }, 1000);
                }
              

            } catch ( ex )
            {
              console.log( ex );
            }
    
    }

    }
    const removeSkill = (e) =>{
        let temp = skills.filter((ele)=>e!=ele);
        setSkills(temp);
    }
    
    return (

        <div className="bg-gray-50  dark:bg-gray-900">
            <Toaster />
            <NavLink to="/" className="fixed top-10 left-10"><img src={Logo} className="w-auto h-10" /></NavLink>
            <div className='absolute top-1/2 left-1/2 '>
                {loading ? <DotPulse size={40} color='white' /> : ""}
            </div>
            <div className="flex flex-col items-center  px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="flex mb-6 text-3xl mt-12 font-bold text-gray-900 dark:text-white">
                    {parsed == null ? "Upload Your Resume" : "Please Check your details"}
                </div>

                {
                    parsed == null ?
                        file == null ?
                            <div className="flex items-center justify-center w-full mt-20">
                                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 5MB)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                                </label>
                            </div> :
                            <>
                                <div class="flex w-[60%]">
                                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        <PictureAsPdfIcon />
                                    </span>
                                    <input type="text" id="website-admin" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={file.name} disabled />
                                </div>
                                <button type="button" onClick={() => parsePdf()} className="w-20 mt-10 text-gray-900 bg-gray-100 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-100 dark:hover:bg-blue-300 dark:focus:ring-gray-800">Parse</button>

                            </>

                        :

                        <div class="w-full h-full max-h-lg max-w-lg">
                            <div class="flex flex-wrap mt-12 -mx-3 mb-2">
                                <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Email Id
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" defaultValue={parsed['Email'][0]} onChange={(e)=>setEmail(e.target.value)}/>

                                </div>
                                <div class="w-full md:w-1/2 px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                        Phone No
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" defaultValue={parsed['Phone Number'][0]} onChange={(e)=>setPhone(e.target.value)}/>
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-2">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                        Name
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" defaultValue={parsed['Name']} onChange={(e)=>setName(e.target.value)}/>
                                </div>
                            </div>

                            <div class="flex flex-wrap mt-4 -mx-3 mb-2">
                                <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Qualification
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" defaultValue={parsed['Qualification'][0]} onChange={(e)=>setQualification(e.target.value)}/>

                                </div>
                                <div class="w-full md:w-1/2 px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                        Passing Year
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" defaultValue={parsed['Qualification'][1]} onChange={(e)=>setPassingYear(e.target.value)}/>
                                </div>
                            </div>

                            <div class="flex flex-wrap mt-4 -mx-3 mb-2">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Institute
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" defaultValue={parsed['Institutes'][0]} onChange={(e)=>setInstitute(e.target.value)}/>
                                </div>
                            </div>
                            <div class="flex items-center border-b border-teal-500 py-2">
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-l-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Enter Skill..." aria-label="Full name" onChange={(e)=>setCurrent(e.target.value)}/>
                                    <button onClick={()=>setSkills((prev)=> [...prev,current])} class="flex-shrink-0 h-[47px] bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 mb-3 text-white py-1 px-2 rounded-r-lg" type="button">
                                        Add Skill
                                    </button>
                            </div>       
                            <div className="flex flex-wrap justify-center space-x-2 my-2">
                                {skills.map((e) => <Chip onClick={()=>removeSkill(e)} label={e} style={{ color: "black", cursor: "pointer" }} className='text-black mx-1' variant="outlined" size='small' />)}
                            </div>
                            <button type="button" onClick={()=>UploadData()} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                        </div>

                }



            </div>
        </div>
    )
};
