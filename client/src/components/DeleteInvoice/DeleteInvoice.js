import React from "react";

const DeleteInvoice = ({
  invoiceId,
  showDelete,
  deleteInvoice,
  docId,
  setShowDelete,
}) => {
  return (
    <>
      <div
        className={`overlay max-w-full opacity-70 fixed top-0 bottom-0 left-0 right-0 z-40 h-screen w-full bg-black ${
          showDelete ? "show" : ""
        }`}
      ></div>
      <div
        className={`container section  justify-center ${
          showDelete ? "showDelete" : ""
        }`}
      >
        <div
          className={`container p-10 max-w-md z-50 absolute rounded-lg bg-white h-auto overflow-auto center-delete lg:fixed ${
            showDelete ? "active" : ""
          }`}
        >
          <div className="inner-section bg-white">
            <h3 className="font-bold text-2xl mb-2">Confirm Deletion?</h3>
            <p className="p-color text-xs mb-8">
              Are you sure you want to delete invoice #{invoiceId}? This action
              cannot be undone.
            </p>
            <div className="invoice-top-buttons flex justify-end lg:mt-0">
              <button
                className="ml-0 edit-invoice px-4 py-2 rounded-3xl font-bold flex items-center cursor-pointer"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
              <button
                className="lg:ml-5 ml-0 delete-invoice px-4 py-2 rounded-3xl font-bold flex items-center cursor-pointer"
                data-id={docId}
                onClick={(e) => deleteInvoice(e)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteInvoice;
