import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import "./CouponModal.css";

function CouponModal({
  modalIsOpen,
  closeModal,
  afterOpenModal,
  openModal,
  couponCodes,
  handleCouponClick,
  selectedCoupon,
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  var subtitle;

  return (
    <div>
      <div className="App__ApplyCode" onClick={openModal}>
        {selectedCoupon ? "Change coupon" : "Apply Coupon"}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={closeModal}
          style={{
            background: "transparent",
            border: "none",
            color: "#007aff",
            cursor: "pointer",
            position: "absolute",
            top: "10%",
            right: "10%",
          }}
        >
          x
        </button>
        {couponCodes.map((coupon, index) => (
          <div
            onClick={() => handleCouponClick(index)}
            style={{ cursor: "pointer", margin: "16px" }}
          >
            {coupon.name}
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default CouponModal;
