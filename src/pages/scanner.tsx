import { useEffect, useRef, useState } from "react";

interface IGuestInfo {
  document_number: string;
  last_name: string;
  second_last_name: string;
  first_name: string;
  middle_name: string;
  gender: string;
  birthday_year: string;
  birthday_month: string;
  birthday_day: string;
  municipality_code: string;
  department_code: string;
  blood_type: string;
}

export const Scanner = () => {
  const [value, setValue] = useState("");

  const [guestInfo, setGuestInfo] = useState<IGuestInfo>({
    document_number: "",
    last_name: "",
    second_last_name: "",
    first_name: "",
    middle_name: "",
    gender: "",
    birthday_year: "",
    birthday_month: "",
    birthday_day: "",
    municipality_code: "",
    department_code: "",
    blood_type: "",
  });

  const referencia = useRef("");

  const black_listed_keys = [
    "Shift",
    "Clear",
    "Dead",
    "Control",
    "Alt",
    "Meta",
    "Enter",
    "CapsLock",
    "Tab",
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Escape",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
  ];

  function handleInput(event: any) {
    if (event.key === "Enter") {
      console.log("enter presionado", referencia.current);
      setValue(referencia.current);
      setGuestInfo({
        document_number: referencia.current.slice(48, 58),
        last_name: referencia.current.slice(58, 80),
        second_last_name: referencia.current.slice(81, 104),
        first_name: referencia.current.slice(104, 127),
        middle_name: referencia.current.slice(127, 150),
        gender: referencia.current.slice(151, 152),
        birthday_year: referencia.current.slice(152, 156),
        birthday_month: referencia.current.slice(156, 158),
        birthday_day: referencia.current.slice(158, 160),
        municipality_code: referencia.current.slice(160, 162),
        department_code: referencia.current.slice(162, 165),
        blood_type: referencia.current.slice(166, 168),
      });
      console.log(guestInfo);
      referencia.current = "";
    }

    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(event.key) || black_listed_keys.includes(event.key) || event.wich === 17 || event.wich === 74 || event.wich === 77) {
      event.preventDefault();
    } else {
      console.log(event);

      referencia.current = referencia.current + event.key;
    }
  }

  useEffect(() => {
    window.addEventListener("keyup", handleInput);

    return () => {
      window.removeEventListener("keyup", handleInput);
    };
  }, []);

  return <input type="text" readOnly value={value} />;

  // const [value, setValue] = useState("");

  // useEffect(() => {
  //     console.log("Scanner ", value);
  // }, [value])

  // useScanDetection({
  //     onComplete: (code: any) => setValue(code.toString()),
  //     minLength: 40 // EAN13

  // });

  // return (
  //     <input
  //         value={value}
  //         type="text"
  //     />
  // )
};
