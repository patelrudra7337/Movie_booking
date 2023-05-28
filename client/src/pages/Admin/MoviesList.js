import React, { useEffect } from 'react'
import Button from "../../components/Button"
import MovieForm from "./MovieForm";
import { message, Table } from 'antd'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { DeleteMovie, GetAllMovies } from '../../apicalls/movies';

function MoviesList() {

    const [movies, setMovies] = React.useState([]);
    const [showMovieFormModal, setShowMovieFormModal] = React.useState(false);
    const [selectedMovie, setSelectedMovie] = React.useState(null);
    const [formType, setFormType] = React.useState("add");
    const dispatch = useDispatch();
    const getData = async () => {

        try {
            dispatch(ShowLoading());
            const response = await GetAllMovies();
            if (response.success) {
                message.success(response.message);
            }
            else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }

    }

    const handleDelete = async (movieId) => {
        try {
            dispatch(ShowLoading());
            const response = await DeleteMovie(movieId);
            if (response.success) {
                message.success(response.message);
            }
            else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }


    const columns = [
        {
            title: "Name",
            dataIndex: "title",
        },
        {
            title: "Poster",
            dataIndex: "poster",
            render: (text, record) => {
                return (
                    <img src={record.poster} alt="poster" style={{ width: '60', height: '60' }} className='br-1' />
                )
            }


        },

        {
            title: "Description",
            dataIndex: "description",

        },
        {
            title: "Duration",
            dataIndex: "duration",


        },
        {
            title: "Genre",
            dataIndex: "genre",
        },
        {
            title: "Language",
            dataIndex: "language",

        },
        {
            title: "Release date",
            dataIndex: "release_date",
            render: (text, record) => {
                return moment(record.release_date).format("DD-MM-YYYY")
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <div className='flex gap-1'>
                        <i className='ri-delete-bin-line bg-delete'
                            onClick={() => { handleDelete(record._id) }}></i>
                        <i className='ri-pencil-line bg-warning'
                            onClick={() => {
                                setSelectedMovie(record);
                                setFormType("edit");
                                setShowMovieFormModal(true);


                            }} ></i>
                    </div>
                );
            }
        }
    ]

    useEffect(() => {
        getData();
    }, []);


    return (
        <div>
            <div className='flex justify-end mb-1'>
                <Button
                    title="Add Movie"
                    variant="outlined"

                    onClick={() => {
                        setShowMovieFormModal(true);
                        setFormType("add");
                    }}
                />
            </div>

            <Table columns={columns} dataSource={movies} />


            {showMovieFormModal && <MovieForm
                showMovieFormModal={showMovieFormModal}
                setShowMovieFormModal={setShowMovieFormModal}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                formType={formType}
                getData={getData}
            />}


        </div>
    )
}

export default MoviesList
