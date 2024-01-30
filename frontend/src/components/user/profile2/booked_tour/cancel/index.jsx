import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { PiSealWarningFill } from "react-icons/pi";
import { OPTIONS } from "..";

const CancelBookedTourRequest = ({ type, isShow, bookedTour, hiddenModal }) => {
  const [reason, setReason] = useState("");
  const isActive = type === OPTIONS.CANCEL_BOOKED_TOUR && isShow;

  const handleChange = (event) => {
    setReason(event.target.value);
  };

  const handleHiddenModal = () => {
    setReason("");
    hiddenModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`${OPTIONS.CANCEL_BOOKED_TOUR} modal-container ${isActive ? "active" : ""}`}>
      <div className="modal">
        <div className="modal-close">
          <button onClick={handleHiddenModal}>
            <IoCloseOutline />
          </button>
        </div>
        <header className="modal__header">
          <strong>
            <span className="icon">
              <PiSealWarningFill />
            </span>
            Yêu cầu hủy tour
          </strong>
        </header>
        <div className="modal__main scroll-container">
          <h2 className="modal-title">
            <span>#</span> Tour:{" "}
            <u style={{ color: "#000" }}>
              <i>{bookedTour?.tourTitle ?? "Không xác định"}</i>
            </u>
          </h2>
          <h2 className="modal-title">
            <span>#</span> Hãy cho chúng tôi biết lý do tại sao bạn muốn hủy
            tour này?
          </h2>
          <div className="modal__body-main">
            <form onSubmit={handleSubmit}>
              <div>
                <textarea
                  name="reason"
                  rows="10"
                  spellCheck={false}
                  placeholder="Vui lòng điền lý do ở đây..."
                  value={reason}
                  onChange={handleChange}
                ></textarea>
              </div>
            </form>
          </div>
        </div>
        <div className="modal__footer">
          <div className="buttons-area">
            <button
              type="button"
              className="profile-form__btn cancel"
              onClick={handleHiddenModal}
            >
              Hủy
            </button>
            <button type="submit" className="profile-btn submit">
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelBookedTourRequest;
