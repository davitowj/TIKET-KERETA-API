"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/helper/client-cookie";
import { axiosInstance } from "@/helper/api";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@/components/Modal";

interface props {
  seatId: number;
}

const Deleteseat = (myprops: props) => {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Pindahkan ke awal agar tidak ada event default yang berjalan

    try {
      const cookie = getCookie("token");

      const response: any = await axiosInstance.delete(
        `/train/wagon/seat/${myprops.seatId}`,
        {
          headers: { Authorization: `Bearer ${cookie}` },
        }
      );

      const message = response.data.message;

      if (!response.data.success) {
        toast.warning(message, {
          containerId: `toastDelete-${myprops.seatId}`,
          type: "warning",
        });
        return;
      }

      toast.success(message, {
        containerId: `toastDelete-${myprops.seatId}`,
        type: "success",
      });

      setTimeout(() => {
        setShow(false);
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        containerId: `toastDelete-${myprops.seatId}`,
        type: "error",
      });
    }
  };

  return (
    <div>
      <ToastContainer containerId={`toastDelete-${myprops.seatId}`} />
      <button
        className="p-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-all duration-200 hover:shadow-lg"
        onClick={openModal}
        title="Hapus Gerbong"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>

      <Modal isShow={show}>
        <div className="w-full">
          <div className="p-6 border-b bg-gradient-to-r from-red-600 to-red-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Konfirmasi Hapus
                </h1>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-600">
              Apakah Anda yakin ingin menghapus Kursi ini?
            </p>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-500 transition-colors duration-200"
            >
              Hapus Kursi
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Deleteseat;