import { useState } from "react";
import "../assets/css/entry.css";
import { VITE_API_URL } from "../config";
import toast from "react-hot-toast";

export function Entry() {
  const [value, setValue] = useState("");
  const limit = 10;


  function EntryPerson() {
    fetch(`${VITE_API_URL}/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "person": {
          "document": parseInt(value)
        }
      }),
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Entrada")
          setValue('')
        } else {
          toast.error("Error")
        }
      }).catch(() => {
        toast.error("Error")
      });
    return;
  }

  const handleNameChange = (value: any) => {
    setValue(value.slice(0, limit));
  };
  return (
    <>
      <div className="screen">
        <div className="keyboard">
          <div className="display">
            <input
              type="text"
              value={value}
              className="w-96 text-4xl bg-transparent tracking-[10px] select-auto focus:outline-none border-gray-300 rounded-xl text-center text-gray-600"
            />
          </div>
          <button className="key" onClick={() => handleNameChange(value + "1")}>
            1
          </button>
          <button className="key" onClick={() => handleNameChange(value + "2")}>
            2
          </button>
          <button className="key" onClick={() => handleNameChange(value + "3")}>
            3
          </button>
          <button className="key" onClick={() => handleNameChange(value + "4")}>
            4
          </button>
          <button className="key" onClick={() => handleNameChange(value + "5")}>
            5
          </button>
          <button className="key" onClick={() => handleNameChange(value + "6")}>
            6
          </button>
          <button className="key" onClick={() => handleNameChange(value + "7")}>
            7
          </button>
          <button className="key" onClick={() => handleNameChange(value + "8")}>
            8
          </button>
          <button className="key" onClick={() => handleNameChange(value + "9")}>
            9
          </button>
          <button
            className="key"
            onClick={() => handleNameChange(value.slice(0, -1))}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_203_28)">
                <path d="M29.7915 24.5351L27.6178 26.7088L22.0832 21.1742L16.5486 26.7088L14.3749 24.5351L19.9095 19.0005L14.3749 13.4659L16.5486 11.2922L22.0832 16.8267L27.6178 11.2922L29.7915 13.4659L24.257 19.0005L29.7915 24.5351ZM34.4165 5.12549C35.2343 5.12549 36.0186 5.45034 36.5968 6.02858C37.175 6.60681 37.4999 7.39107 37.4999 8.20882V29.7922C37.4999 30.6099 37.175 31.3942 36.5968 31.9724C36.0186 32.5506 35.2343 32.8755 34.4165 32.8755H11.2915C10.2278 32.8755 9.39529 32.3205 8.84029 31.5034L0.499878 19.0005L8.84029 6.48216C9.39529 5.66507 10.2278 5.12549 11.2915 5.12549H34.4165ZM34.4165 8.20882H11.2915L4.01488 19.0005L11.2915 29.7922H34.4165V8.20882Z" />
              </g>
              <defs>
                <clipPath id="clip0_203_28">
                  <rect
                    width="37"
                    height="37"
                    fill="white"
                    transform="translate(0.499878 0.500488)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button className="key" onClick={() => handleNameChange(value + "0")}>
            0
          </button>
          <button className="key" type="button" onClick={() => EntryPerson()}>
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M29.7917 5.12549H8.20833C6.49708 5.12549 5.125 6.49757 5.125 8.20882V14.3755H8.20833V8.20882H29.7917V29.7922H8.20833V23.6255H5.125V29.7922C5.125 30.6099 5.44985 31.3942 6.02809 31.9724C6.60632 32.5506 7.39058 32.8755 8.20833 32.8755H29.7917C30.6094 32.8755 31.3937 32.5506 31.9719 31.9724C32.5501 31.3942 32.875 30.6099 32.875 29.7922V8.20882C32.875 6.49757 31.4875 5.12549 29.7917 5.12549ZM16.04 24.5197L18.2292 26.7088L25.9375 19.0005L18.2292 11.2922L16.04 13.4659L20.0329 17.4588H5.125V20.5422H20.0329L16.04 24.5197Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
