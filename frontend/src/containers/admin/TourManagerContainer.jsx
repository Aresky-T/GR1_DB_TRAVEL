import { useEffect, useState } from "react";
import TourManager from "../../components/admin/TourManager";
import { getAllToursApi } from "../../api/admin/tour.api";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/selector";
import { uploadMultipartFile } from "../../api/global/file.api";
import { offLoading } from "../../redux/slices/loading.slice";
import { toast } from "react-hot-toast";

const TourManagerContainer = () => {

    const [tours, setTours] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const account = useSelector(authSelector);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
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
    });

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
    ]

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0
    });

    function setEmptySelectedFiles() {
        setSelectedFiles([]);
    }

    const handleChangeForm = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                scheduleDescription: e,
            }));
        }
    };

    

    const handleSelectionChange = (selection) => {
        console.log(selection);
    }

    const handleFileChange = (e) => {
        
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

        setFormData((prevData) => ({
            ...prevData,
            image1: urls[0],
            image2: urls[1],
            image3: urls[2],
            image4: urls[3]
        }));

        if(urls.length > 0) {
            setSelectedFiles(urls);
        }

        // uploadMultipartFile(formData, account.accessToken, dispatch)
        //     .then(res => {
        //         console.log(res)
        //         dispatch(offLoading());
        //         toast.success("thành công")
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         toast.error("thất bại")
        //         dispatch(offLoading());
        //     })
    }

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        handleClose();
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
                formData={formData}
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