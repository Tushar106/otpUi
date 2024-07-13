
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function App({ otpLength = 6 }) {
  const [otp, setOtp] = useState(new Array(otpLength).fill(''));
  const ref = useRef([]);

  const handleKeyDown = (e, index) => {
    const key = e.key;
    console.log(key, index)
    const copyOtp = [...otp];
    if (key == "Backspace") {
      if (index - 1 >= 0)
        ref.current[index - 1].focus();
      copyOtp[index] = "";
      setOtp(copyOtp);
      return;
    }
    if (isNaN(key)) {
      return;
    }
    if (index + 1 < copyOtp.length)
      ref.current[index + 1].focus();
    copyOtp[index] = key;
    console.log(copyOtp)
    setOtp(copyOtp);
  }
  // useEffect(() => {
  //   ref.current[0].focus();
  // }, [])
  const notify = () => {
    if (otp.includes("")) {
      toast('Fill the otp!', {
        position: "top-right",
        type: "error"
      });
      return;
    }
    const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
    toast.promise(
      resolveAfter3Sec,
      {
        pending: 'Verifying Otp',
        success: 'Otp verified👌',
        error: 'Promise rejected 🤯'
      }
    )
  }
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col bg-[#85cff9]'>
      <div className='justify-center items-center flex w-[40%] flex-col p-9 rounded-md' style={{
        background: "rgb(159,147,193)",
        background: "linear-gradient(90deg, rgba(159,147,193,1) 25%, rgba(214,251,252,1) 100%)"
      }}>
        <h1 className='text-2xl font-bold text-center'>OTP Template</h1>
        <p className='text-center'>This is a template for OTP verification</p>
        <div className='w-[100%] overflow-hidden mt-4'>
          <div className='flex flex-row flex-nowrap items-center gap-5 justify-center '>
            {otp.map((value, index) => {
              return (
                <input type='text' key={index} ref={(currentInput) => { ref.current[index] = currentInput }} className='border border-black rounded-md  w-1/6 p-2 text-center font-bold' value={value} onKeyDown={(e) => handleKeyDown(e, index)} />
              )
            })}
          </div>
        </div>
        <button onClick={notify} class="mt-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4  rounded w-[50%]">
          Enter
        </button>
      </div>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          closeOnClick
        />
      </div>
    </div>
  )
}

export default App
