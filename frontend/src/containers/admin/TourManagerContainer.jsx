import { useEffect, useState } from "react";
import TourManager from "../../components/admin/TourManager";
import { createTourApi, getAllToursApi } from "../../api/admin/tour.api";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/selector";
import { uploadMultipartFileApi } from "../../api/global/file.api";
import { offLoading } from "../../redux/slices/loading.slice";
import { toast } from "react-hot-toast";

const initialTour = {
    title: '',
    startTime: '',
    time: '',
    startAddress: '',
    destinationList: '',
    availableSeats: 0,
    totalSeats: 0,
    vehicle: '',
    scheduleDescription: '',
    price1: 0,
    price2: 0,
    price3: 0,
    tourGuide: 0,
}

const TourManagerContainer = () => {

    const [tours, setTours] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [formDataImage, setFormDataImage] = useState();
    const account = useSelector(authSelector);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [tourForm, setTourForm] = useState(initialTour);

    const rows = [...tours].map(tour => {
        return {
            id: tour.id,
            title: tour.title,
            startTime: tour.startTime,
            time: tour.time,
            availableSeats: tour.availableSeats,
            totalSeats: tour.totalSeats,
            vehicle: tour.vehicle
        }
    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'title', width: 250 },
        { field: 'time', headerName: 'Total Time', width: 150 },
        { field: 'availableSeats', headerName: 'Available Seats', width: 150 },
        { field: 'totalSeats', headerName: 'Total Seats', width: 150 },
        { field: 'vehicle', headerName: 'Vehicle', width: 150 },
        {
            field: 'action',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => {
                return <button className="tour-detail-btn">xem</button>
            }
        }
    ]

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0
    });

    function setEmptySelectedFiles() {
        setSelectedFiles([]);
    }

    function handleChangeForm(e) {
        if (e.target) {
            const { name, value } = e.target;
            setTourForm((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            setTourForm((prevData) => ({
                ...prevData,
                scheduleDescription: e,
            }));
        }
    };

    function handleSelectionChange(selection) {
        console.log(selection);
    }

    function handleFileChange(e) {

        const formData = new FormData();
        const files = e.target.files;

        if (files.length !== 4) {
            alert('Bạn phải chọn đủ 4 file ảnh');
            e.target.value = null;
            return;
        }

        let urls = [];

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
            const url = URL.createObjectURL(files[i]);
            urls.push(url);
        }

        if (urls.length === 4) {
            setSelectedFiles(urls);
            setFormDataImage(formData);
        }
    }

    function resetTourForm() {
        setTourForm(initialTour);
    }

    function handleOpen() {
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (tourForm.scheduleDescription === "<p><br></p>") {
            alert("Bạn chưa điền mô tả lịch trình!");
            return;
        }

        if (selectedFiles.length < 1) {
            alert("Bạn chưa chọn file ảnh!");
            return;
        }

        uploadMultipartFileApi(formDataImage, account.accessToken, dispatch)
            .then(res => {
                const tour = {
                    title: tourForm.title,
                    image1: res.data[0],
                    image2: res.data[1],
                    image3: res.data[2],
                    image4: res.data[3],
                    startTime: tourForm.startTime,
                    time: tourForm.time,
                    startAddress: tourForm.startAddress,
                    destinationList: tourForm.destinationList,
                    availableSeats: Number(tourForm.totalSeats),
                    totalSeats: Number(tourForm.totalSeats),
                    vehicle: tourForm.vehicle,
                    scheduleDescription: tourForm.scheduleDescription,
                    price1: Number(tourForm.price1),
                    price2: Number(tourForm.price2),
                    price3: Number(tourForm.price3),
                };

                return tour;
            })
            .then((tour) => {
                createTourApi(tour, account.accessToken)
                    .then(res => {
                        dispatch(offLoading());
                        toast.success("thành công");
                        resetTourForm();
                        handleClose();
                    })
                    .catch(err => {
                        console.log(err)
                        toast.error("thất bại")
                        dispatch(offLoading());
                        handleClose();
                    })
            })
            .catch(err => {
                toast.error("thất bại")
                dispatch(offLoading());
            })
    };

    useEffect(() => {
        getAllToursApi()
            .then(res => {
                const tours = res.data;
                setTours(tours)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <TourManager
                columns={columns}
                isOpen={isOpen}
                tourForm={tourForm}
                handleChangeForm={handleChangeForm}
                handleSubmit={handleSubmit}
                handleSelectionChange={handleSelectionChange}
                handleFileChange={handleFileChange}
                handleOpen={handleOpen}
                handleClose={handleClose}
                paginationModel={paginationModel}
                rows={rows}
                setPaginationModel={setPaginationModel}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                setEmptySelectedFiles={setEmptySelectedFiles}
            />
        </>
    )
}

export default TourManagerContainer;