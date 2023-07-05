import { useEffect, useState } from "react";
import AccountManager from "../../../components/admin/Account/AccountManager";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/selector"
import { activateAccountUserApi, getAllAccountsApi, lockAccountUserApi } from "../../../api/admin/account.api";
import { errorAlert, questionAlert, successAlert } from "../../../config/sweetAlertConfig";

const AccountManagerContainer = () => {
    const [accounts, setAccounts] = useState([]);
    const [paginate, setPaginate] = useState({
        size: 10,
        pageNumber: 1,
        sort: 'id,asc'
    })
    const [message, setMessage] = useState('');

    const account = useSelector(authSelector);

    const handleChangeCurrentPage = (page) => {
        setPaginate({
            ...paginate,
            pageNumber: page
        })
    }

    const handleLockAccount = (id) => {
        questionAlert('Yêu cầu xác nhận', "Bạn có chắc chắn muốn thực hiện hành động này", "Khóa", "Hủy bỏ")
            .then(result => {
                if (result.isConfirmed) {
                    lockAccountUserApi(id, account.accessToken)
                        .then(res => {
                            setMessage(message => message + 'success')
                            successAlert("Thành công", `Đã khóa tài khoản có id = ${id} thành công`, 'OK');
                        })
                        .catch(err => {
                            errorAlert("Thất bại", "Khóa tài khoản thất bại", "OK")
                        })
                }
            })
    }

    const handleActivateAccount = (id) => {
        questionAlert('Yêu cầu xác nhận', "Bạn có chắc chắn muốn thực hiện hành động này", "Kích hoạt", "Hủy bỏ")
            .then(result => {
                if (result.isConfirmed) {
                    activateAccountUserApi(id, account.accessToken)
                        .then(res => {
                            setMessage(message => message + 'success')
                            successAlert("Thành công", `Đã kích hoạt tài khoản có id = ${id} thành công`, 'OK');
                        })
                        .catch(err => {
                            errorAlert("Thất bại", "Kích hoạt tài khoản thất bại", "OK")
                        })
                }
            })
    }

    useEffect(() => {
        if (account.accessToken) {
            getAllAccountsApi(account.accessToken, paginate)
                .then(res => {
                    setAccounts(res.data)
                })
        }
    }, [account, message, paginate])

    return (
        <AccountManager
            accounts={accounts}
            handleChangeCurrentPage={handleChangeCurrentPage}
            handleActivateAccount={handleActivateAccount}
            handleLockAccount={handleLockAccount}
            paginate={paginate}
        />
    )
}

export default AccountManagerContainer;