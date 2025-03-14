"use client";
import Modal from "@/components/Modal";
import { axiosInstance } from "@/helper/api";
import { getCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface props {
  wagonId: number;
  id: number;
}

const Addseat = (myprops: props) => {
  const [show, setShow] = useState<boolean>(false);
  const [seatNumber, setSeatNumber] = useState<string>("");
  const router = useRouter();

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const cookie = getCookie("token");
      const response: any = await axiosInstance.post(
        `/train/wagon/seat`,
        {
          seat_number: seatNumber,
          wagon_id: myprops.wagonId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      if (response.data.success === false) {
        toast(response.data.message, {
          containerId: `toastAddSeat-${myprops.id}`,
          type: "warning",
        });
        setSeatNumber("");
        setShow(false);
      }

      setShow(false);
      toast("Gerbong Kereta Berhasil Ditambahkan", {
        containerId: `toastAddSeat-${myprops.id}`,
        type: "success",
      });
      setSeatNumber("");
      setTimeout(() => router.refresh(), 1000);
    } catch (error) {
      console.log(error);
      toast("Something Went Wrong", {
        containerId: `toastAddSeat-${myprops.id}`,
        type: "error",
      });
    }
  };

  return (
    <>
      <ToastContainer containerId={`toastAddSeat-${myprops.id}`} />
      <button
        className="size-24 rounded-lg flex items-center justify-center bg-green-700 text-white font-bold text-2xl cursor-pointer"
        onClick={() => setShow(true)}
      >
        &#43;
      </button>
      <Modal isShow={show}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full p-6 border-b bg-gradient-to-r from-sky-600 to-sky-700">
            <h1 className="text-xl font-semibold text-white">Tambah Kursi</h1>
            <p className="text-sm text-sky-100 mt-1">
              Pastikan data terisi dengan benar
            </p>
          </div>

          <div className="w-full p-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Seat Number
              </label>
              <div className="relative rounded-lg border border-gray-300 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                <input
                  type="text"
                  id="name"
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value)}
                  required
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="w-full px-6 py-4 bg-gray-50 border-t flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => closeModal()}
              className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-500 transition-colors duration-200"
            >
              Simpan
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Addseat;