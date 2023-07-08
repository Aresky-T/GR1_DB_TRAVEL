import React from 'react'
import { GrStatusGoodSmall } from 'react-icons/gr'
import CustomPaginate from '../../pagination/CustomPaginate'

const AccountManager = ({ accounts, paginate, handleChangeCurrentPage, handleActivateAccount, handleLockAccount }) => {
    return (
        <div className='admin-main account-manager-container'>
            <h1>Danh sách tài khoản</h1>
            <section className="admin-main__body">
                <table className='admin-main__body__table account-manager__table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className='admin-table-head__status'>Status</th>
                            <th>Thời gian tạo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.content?.map(account => (
                            <tr className='admin-table-row' key={account.id}>
                                <td>{account.id}</td>
                                <td>{account.username}</td>
                                <td>{account.email}</td>
                                <td>{account.role}</td>
                                <td className='admin-table-data__status'>
                                    <span><GrStatusGoodSmall
                                        size={15}
                                        color={account.status === "ACTIVE" ? "var(--fourth-color)" : "red"}
                                    /></span>
                                    <span>{account.status}</span>
                                </td>
                                <td>{new Date(account.createdTime).toLocaleString()}</td>
                                <td className='admin-table-data__action'>
                                    {account.role === "USER" && <>
                                        {account.status === "BLOCKED" ?
                                            <button className='action--active-acc'
                                                onClick={() => {
                                                    handleActivateAccount(account.id)
                                                }}
                                            >Activate</button>
                                            :
                                            <button className='action--lock-acc'
                                                onClick={() => {
                                                    handleLockAccount(account.id)
                                                }}
                                            >Lock</button>}
                                    </>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <CustomPaginate
                    currentPage={paginate.pageNumber}
                    totalPages={accounts.totalPages}
                    setCurrentPage={handleChangeCurrentPage}
                />
            </section>
        </div>
    )
}

export default AccountManager