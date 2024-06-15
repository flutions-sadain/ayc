import React, { useRef, useState } from "react";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./resumeupload.css";
import { useNavigate } from "react-router-dom";
import fileImg from "../../assets/images/file.png";

function ResumeUpload() {
  const [file, setfile] = useState([]);
  // const [loading, setloading] = useState(false);
  const linkedin = useRef();
  const fileRef = useRef(null);
  // const user = useSelector(userData);

  const navigate = useNavigate();

  const submit = () => {
    navigate("/newAssessment");
  }

  // const submit = async () => {
  //   let fd = new FormData();
  //   setloading(true);
  //   if (file.length !== 0) {
  //     fd.append("email", user?.email);
  //     for (let i = 0; i < file.length; i++) {
  //       fd.append("files", file[i]);
  //       console.log(file[i]);
  //     }

  //     const data = await fetch(`${url}/uploadFile`, {
  //       method: "POST",
  //       body: fd,
  //     });

  //     const res = await data.text();
  //     const data1 = JSON.parse(res);
  //     console.log(data1["questions"]);
  //     if (data1["questions"].length > 0) {
  //       //setquestions([...questions, ...data1["questions"]]);
  //       setloading(false);
  //     }
  //   } else if (linkedin) {
  //     const body = new FormData();
  //     body.append("key", linkedin);

  //     const data = await fetch(`${url}/linkedin`, {
  //       method: "POST",
  //       body: body,
  //     });
  //     const res = await data.json();
  //     console.log(res);
  //     setloading(false);
  //   }
  // };

  return (
    <div className="resume_box">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        // open={loading}
        // onClick={() => setloading(false)}
      >
        <CircularProgress style={{ color: "orange" }} />
      </Backdrop>
      <div className="resume_box_content">
      <div className="flex flex-wrap-reverse items-center pb-4">
        <div className="text-center flex-grow lg:pl-10 md:pl-8">
          <h1 className="text-xl font-bold">Upload Your Resume</h1>
        </div>
        <div className="ml-auto">
          <a className="flex items-center text-secondary focus:outline-none ml-auto" href="/profileForm">
            Skip
            <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </a>
        </div>
      </div>
        <div className="fileupload">
          <form>
            <input
              type="file"
              hidden
              ref={fileRef}
              onChange={(e) => setfile([...file, ...e.target.files])}
            />
            <div
              className="fileupload_content border-dashed border-2"
              onClick={() => fileRef.current.click()}
            >
              <div className="flex justify-center items-center">
                <img alt="file_Img" src={fileImg} width={50} height={50} />
              </div>
              <div className="fileupload_text">
                <h3>Drag and drop files here</h3>
                <div>Or</div>
                <p className="browse">Browse Files</p>
              </div>
            </div>
          </form>
        </div>
        <Divider className="divider">Or</Divider>
        <div className="linkedin">
          <form>
            <label className="label">Import your Linkedin URL</label>
            <br />
            <div className="relative">

            <input
              ref={linkedin}
              className="linkedin_input"
              placeholder="LinkedIn Link"
            />
            <button className="absolute right-0 top-0 mt-[13px] mr-2 px-3 py-2 rounded-md text-secondary focus:outline-none">
              Paste
            </button>
            </div>
          </form>
        </div>
        <div className="buttons-container mt-5 mb-4">
          <button className="flex items-center text-gray-600 focus:outline-none">
            <span className="flex items-center border-2 border-gray-600 rounded-full px-2 mr-2">
              ?
            </span>
            Help Center
          </button>
          <div className="buttons sm:justify-center">
            <button className="cancel text-secondary">Cancel</button>
            <button className="continue" onClick={submit}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeUpload;
