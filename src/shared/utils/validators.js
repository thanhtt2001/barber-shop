/**
 * Các quy tắc validate cho React Hook Form.
 */

/**
 * Validate số điện thoại Việt Nam (10 chữ số, bắt đầu bằng 0).
 */
export const phoneValidation = {
  required: "Vui lòng nhập số điện thoại",
  pattern: {
    value: /^(0[3|5|7|8|9])[0-9]{8}$/,
    message: "Số điện thoại không hợp lệ (phải 10 số, bắt đầu bằng 0)",
  },
};

/**
 * Validate họ tên.
 */
export const fullNameValidation = {
  required: "Vui lòng nhập họ và tên",
  minLength: {
    value: 2,
    message: "Tên phải có ít nhất 2 ký tự",
  },
  maxLength: {
    value: 60,
    message: "Tên không được quá 60 ký tự",
  },
  pattern: {
    value: /^[a-zA-ZÀ-ỹ\s]+$/u,
    message: "Tên chỉ được chứa chữ cái và khoảng trắng",
  },
};

/**
 * Validate email (tùy chọn).
 */
export const emailValidation = {
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Địa chỉ email không hợp lệ",
  },
};

/**
 * Validate ngày đặt lịch.
 */
export const dateValidation = {
  required: "Vui lòng chọn ngày",
  validate: (value) => {
    const selected = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) return "Ngày đặt lịch không thể là ngày trong quá khứ";
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    if (selected > maxDate) return "Chỉ có thể đặt lịch trước tối đa 30 ngày";
    return true;
  },
};

/**
 * Validate giờ đặt lịch.
 */
export const timeValidation = {
  required: "Vui lòng chọn giờ",
};

/**
 * Validate chọn dịch vụ.
 */
export const serviceValidation = {
  required: "Vui lòng chọn dịch vụ",
};

/**
 * Validate chọn cơ sở.
 */
export const branchValidation = {
  required: "Vui lòng chọn cơ sở",
};

/**
 * Validate ghi chú (tùy chọn).
 */
export const noteValidation = {
  maxLength: {
    value: 200,
    message: "Ghi chú không được quá 200 ký tự",
  },
};
