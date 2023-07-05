import striptags from 'striptags'

const yup = require('yup')

/**
 * The `validateString` function is a JavaScript function that uses the `yup` library to validate a
 * string property, ensuring that it is not empty and does not contain only whitespace.
 * @param property - The `property` parameter is a string that represents the name or description of
 * the property being validated. It is used in the error messages to provide more context about the
 * validation failure.
 * @returns a Yup string validation schema.
 */
export const validateString = (property) => {
    return yup.string().required(`Yêu cầu ${property}`)
        .test(`Check ${property}`, `${property} không hợp lệ`, function (value) {
            return value.trim().length > 0
        })
}

export const validateBLogContent = yup.object().shape({
    subTitle: validateString('subTitle'),
    content: validateString('content'),
})

export const validateTouristAttraction = yup.object().shape({
    name: validateString('name'),
    title: validateString('title'),
    imageUrl: validateString('imageUrl'),
    intro: validateString('intro'),
    listContents: yup.array().of(validateBLogContent),
})

export const validateTour = yup.object().shape({
    title: validateString('Tiêu đề'),
    startTime: validateString('Thời gian khởi hành'),
    time: validateString('Tổng thời gian'),
    startAddress: validateString('Địa điểm khởi hành'),
    destinationList: validateString('Danh sách điểm đến'),
    totalSeats: yup.number().min(1, 'Tổng số chỗ phải lớn hơn 0').required("Yêu cầu nhập tổng số chỗ"),
    vehicle: validateString('Danh sách điểm đến'),
    scheduleDescription: yup.string().required(`Required scheduleDescription`)
        .test('Check scheduleDescription', 'Mô tả lịch trình không đúng hợp lệ', function (value) {
            const trimValue = striptags(value).trim();
            return trimValue.length > 0
        }),
    price1: yup.number().min(0, 'Giá cho người lớn phải lớn hơn hoặc bằng 0').required("Yêu cầu nhập giá cho người lớn"),
    price2: yup.number().min(0, 'Giá cho trẻ em phải lớn hơn hoặc bằng 0').required("Yêu cầu nhập giá cho trẻ em"),
    price3: yup.number().min(0, 'Giá cho em bé phải lớn hơn hoặc bằng 0').required("Yêu cầu nhập giá cho em bé"),
})

export const validateTourGuide = yup.object().shape({
    fullName: validateString('fullName'),
    birthDate: yup.date().required('Required birthDate'),
    gender: validateString('gender'),
    phone: validateString('phone'),
    address: validateString('address'),
    avatarUrl: validateString('avatarUrl'),
    description: validateString('description'),
})