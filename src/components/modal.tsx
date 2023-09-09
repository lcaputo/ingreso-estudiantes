"use client";

import { Button, Modal } from "flowbite-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { DynamicForm } from "./DynamicForm";

interface Props {
  openModalInput: boolean | undefined;
  toggleModal: () => void;
  headers: any;
}

interface ColumnFields {
  name: string;
  key: string;
}

export default function CustomModal({
  openModalInput,
  toggleModal,
  headers,
}: Props) {
  const fields: any = useRef([]);

  async function mapResponse() {
    const res: any = [];
    await headers.map((header: any) => {
      res.push(header);
    });
    fields.current = res;
  }

  // const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
  //   event.preventDefault();
  //   // const data = new FormData(event.target);
  //   // const object: any = {};
  //   // data.forEach(function (value, key) {
  //   //   object[key] = value;
  //   // });
  //   // const json = JSON.stringify(object);
  //   // console.log(json);
  // };

  const submitRef: any = useRef();


  useEffect(() => {
    mapResponse();
  }, []);

  return (
      <Modal
        className="focus:outline-none"
        show={openModalInput}
        onClose={() => {
          toggleModal()
        }}
      >
        <Modal.Header>Nuevo</Modal.Header>
        <Modal.Body className="px-6 py-4">
          <div className="space-y-6">
            <DynamicForm
              submitRef={submitRef}
              headers={headers}
              toggleModal={toggleModal}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex ms-auto gap-2">
            <Button color="gray" className="font-bold" onClick={toggleModal}>
              Cancelar
            </Button>
            <Button
            className="bg-primary text-white font-bold hover:bg-primary" onClick={() => {
              submitRef.current.requestSubmit();
            }}>Enviar</Button>
          </div>
        </Modal.Footer>
      </Modal>
  );
}
